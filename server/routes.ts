import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApplicationSchema, insertEmailSchema, insertProfileSchema } from "@shared/schema";
import { fetchRecentEmails, analyzeEmailForStatus } from "./services/gmail-service";
import { syncApplicationToSheets, updateApplicationInSheets } from "./services/sheets-service";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/applications/:id", async (req, res) => {
    try {
      const application = await storage.getApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      
      const spreadsheetId = await syncApplicationToSheets(application);
      const updatedApplication = await storage.updateApplication(application.id, {
        googleSheetsId: spreadsheetId,
      });

      res.json(updatedApplication);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/applications/:id", async (req, res) => {
    try {
      const application = await storage.updateApplication(req.params.id, req.body);
      
      if (application.googleSheetsId) {
        await updateApplicationInSheets(application);
      }
      
      res.json(application);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/applications/:id", async (req, res) => {
    try {
      await storage.deleteApplication(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/applications/:id/emails", async (req, res) => {
    try {
      const emails = await storage.getEmailsByApplication(req.params.id);
      res.json(emails);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/applications/:id/sync-emails", async (req, res) => {
    try {
      const application = await storage.getApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      const emails = await fetchRecentEmails(application.id, application.company);
      
      for (const email of emails) {
        const newStatus = await analyzeEmailForStatus(email.content, email.subject);
        if (newStatus && newStatus !== application.status) {
          await storage.updateApplication(application.id, { status: newStatus });
          if (application.googleSheetsId) {
            const updatedApp = await storage.getApplication(application.id);
            if (updatedApp) {
              await updateApplicationInSheets(updatedApp);
            }
          }
          break;
        }
      }

      const updatedEmails = await storage.getEmailsByApplication(application.id);
      res.json(updatedEmails);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/emails", async (req, res) => {
    try {
      const validatedData = insertEmailSchema.parse(req.body);
      const email = await storage.createEmail(validatedData);
      res.json(email);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/emails/:id", async (req, res) => {
    try {
      const email = await storage.updateEmail(req.params.id, req.body);
      res.json(email);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      res.json(profile);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const validatedData = insertProfileSchema.parse(req.body);
      const profile = await storage.createProfile(validatedData);
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/profile/:id", async (req, res) => {
    try {
      const profile = await storage.updateProfile(req.params.id, req.body);
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const applications = await storage.getApplications();
      
      const totalApplied = applications.length;
      const active = applications.filter(a => !['rejected', 'withdrawn', 'offer'].includes(a.status)).length;
      const interviews = applications.filter(a => a.status === 'interview').length;
      const responseRate = totalApplied > 0 
        ? Math.round((applications.filter(a => a.status !== 'applied').length / totalApplied) * 100)
        : 0;

      res.json({
        totalApplied,
        active,
        interviews,
        responseRate: `${responseRate}%`,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
