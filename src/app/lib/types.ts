/*
Type definitions for the Job Application Tracker
Contains all TypeScript interfaces and types used throughout the application
 */

// Statuses for Job Application
export type JobApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted';

// This represents a single Job Application object
export type JobApplication = {
  id: string;
  company: string;
  role: string;
  status: JobApplicationStatus;
  dateApplied: string;
  notes?: string;
};

// This is the input type for creating new applications, id is auto-generated
export type JobApplicationInput = Omit<JobApplication, 'id'>;