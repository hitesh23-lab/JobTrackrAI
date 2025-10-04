import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  company: text("company").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  salary: text("salary"),
  jobUrl: text("job_url"),
  status: text("status").notNull().default("applied"),
  appliedDate: timestamp("applied_date").notNull().defaultNow(),
  notes: text("notes"),
  googleSheetsId: text("google_sheets_id"),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  appliedDate: true,
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export const emails = pgTable("emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull(),
  gmailId: text("gmail_id").notNull(),
  from: text("from").notNull(),
  subject: text("subject").notNull(),
  preview: text("preview").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  isImportant: text("is_important").notNull().default("false"),
});

export const insertEmailSchema = createInsertSchema(emails).omit({
  id: true,
});

export type InsertEmail = z.infer<typeof insertEmailSchema>;
export type Email = typeof emails.$inferSelect;

export const profile = pgTable("profile", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  summary: text("summary").notNull(),
  resumeUrl: text("resume_url"),
});

export const insertProfileSchema = createInsertSchema(profile).omit({
  id: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profile.$inferSelect;
