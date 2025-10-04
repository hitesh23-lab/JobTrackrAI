import { 
  type Application, 
  type InsertApplication,
  type Email,
  type InsertEmail,
  type Profile,
  type InsertProfile 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getApplications(): Promise<Application[]>;
  getApplication(id: string): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: string, application: Partial<Application>): Promise<Application>;
  deleteApplication(id: string): Promise<void>;
  
  getEmailsByApplication(applicationId: string): Promise<Email[]>;
  getEmail(id: string): Promise<Email | undefined>;
  createEmail(email: InsertEmail): Promise<Email>;
  updateEmail(id: string, email: Partial<Email>): Promise<Email>;
  
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: string, profile: Partial<Profile>): Promise<Profile>;
}

export class MemStorage implements IStorage {
  private applications: Map<string, Application>;
  private emails: Map<string, Email>;
  private profiles: Map<string, Profile>;

  constructor() {
    this.applications = new Map();
    this.emails = new Map();
    this.profiles = new Map();
    
    const defaultProfile: Profile = {
      id: randomUUID(),
      fullName: "John Doe",
      email: "john.doe@example.com",
      title: "Java Fullstack Lead Engineer (11 years)",
      location: "San Francisco, CA",
      summary: "Experienced Java Fullstack Lead Engineer with 11 years of expertise in designing and implementing scalable enterprise applications.",
      resumeUrl: null,
      googleSheetsId: null,
    };
    this.profiles.set(defaultProfile.id, defaultProfile);
  }

  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values()).sort((a, b) => 
      new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    );
  }

  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const application: Application = {
      ...insertApplication,
      id,
      appliedDate: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application> {
    const application = this.applications.get(id);
    if (!application) {
      throw new Error("Application not found");
    }
    const updated = { ...application, ...updates };
    this.applications.set(id, updated);
    return updated;
  }

  async deleteApplication(id: string): Promise<void> {
    this.applications.delete(id);
  }

  async getEmailsByApplication(applicationId: string): Promise<Email[]> {
    return Array.from(this.emails.values())
      .filter(email => email.applicationId === applicationId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getEmail(id: string): Promise<Email | undefined> {
    return this.emails.get(id);
  }

  async createEmail(insertEmail: InsertEmail): Promise<Email> {
    const id = randomUUID();
    const email: Email = {
      ...insertEmail,
      id,
    };
    this.emails.set(id, email);
    return email;
  }

  async updateEmail(id: string, updates: Partial<Email>): Promise<Email> {
    const email = this.emails.get(id);
    if (!email) {
      throw new Error("Email not found");
    }
    const updated = { ...email, ...updates };
    this.emails.set(id, updated);
    return updated;
  }

  async getProfile(): Promise<Profile | undefined> {
    return Array.from(this.profiles.values())[0];
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = randomUUID();
    const profile: Profile = {
      ...insertProfile,
      id,
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile> {
    const profile = this.profiles.get(id);
    if (!profile) {
      throw new Error("Profile not found");
    }
    const updated = { ...profile, ...updates };
    this.profiles.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
