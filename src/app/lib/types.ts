/*
Type definitions for the Job Application Tracker
Contains all TypeScript interfaces and types used throughout the application
 */

// Import Prisma-generated types
import { JobApplication as PrismaJobApplication, Status } from '@prisma/client';

// Exporting Prisma types for easier imports
export type JobApplicationStatus = Status;
export type JobApplication = PrismaJobApplication;

// This is the input type for creating new applications, id is auto-generated
export type JobApplicationInput = {
  company: string;
  role: string;
  status: JobApplicationStatus;
  dateApplied: Date;
};