/*
Database operations for job applications using Prisma ORM
Provides CRUD operations with SQLite persistence
*/

import { PrismaClient } from '../../generated/prisma';
import { JobApplication, JobApplicationInput } from './types';

// Initialize Prisma client
const prisma = new PrismaClient();

// Method to get all job applications for a specific user sorted by creation date
export const getApplications = async (userId: string): Promise<JobApplication[]> => {
  return await prisma.jobApplication.findMany({
    where: { userId }, // Filter by user ID
    orderBy: { createdAt: 'desc' }
  });
};

// Async method for creating a new job application
export const createApplication = async (data: JobApplicationInput & { userId: string }): Promise<JobApplication> => {
  return await prisma.jobApplication.create({
    data
  });
};

// Async method for updating existing job application by ID (user-owned only)
export const updateApplication = async (
  id: string, 
  userId: string,
  data: Partial<JobApplicationInput>
): Promise<JobApplication | null> => {
  try {
    return await prisma.jobApplication.update({
      where: { 
        id,
        userId // Ensure user owns this application
      },
      data
    });
  } catch (_error) {
    return null; // If ID is not valid or user doesn't own the application
  }
};

// Async method for deleting existing job application by ID (user-owned only)
export const deleteApplication = async (id: string, userId: string): Promise<boolean> => {
  try {
    await prisma.jobApplication.delete({
      where: { 
        id,
        userId // Ensure user owns this application
      }
    });
    return true;
  } catch (_error) {
    return false; // If ID is not valid or user doesn't own the application
  }
};

// Async method for getting a specific job application by ID (user-owned only)
export const getApplicationById = async (id: string, userId: string): Promise<JobApplication | null> => {
  return await prisma.jobApplication.findFirst({
    where: { 
      id,
      userId // Ensure user owns this application
    }
  });
};