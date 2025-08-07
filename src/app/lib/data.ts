/*
Database operations for job applications using Prisma ORM
Provides CRUD operations with SQLite persistence
*/

import { PrismaClient } from '../../generated/prisma';
import { JobApplication, JobApplicationInput } from './types';

// Initialize Prisma client
const prisma = new PrismaClient();

// Method to get all job applications sorted by creation date
export const getApplications = async (): Promise<JobApplication[]> => {
  return await prisma.jobApplication.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

// Async method for creating a new job application
export const createApplication = async (data: JobApplicationInput): Promise<JobApplication> => {
  return await prisma.jobApplication.create({
    data
  });
};

// Async method for updating existing job application by ID
export const updateApplication = async (
  id: string, 
  data: Partial<JobApplicationInput>
): Promise<JobApplication | null> => {
  try {
    return await prisma.jobApplication.update({
      where: { id },
      data
    });
  } catch (error) {
    return null; // If ID is not valid
  }
};

// Async method for deleting existing job application by ID
export const deleteApplication = async (id: string): Promise<boolean> => {
  try {
    await prisma.jobApplication.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false; // If ID is not valid
  }
};

// Async method for getting a specific job application by ID
export const getApplicationById = async (id: string): Promise<JobApplication | null> => {
  return await prisma.jobApplication.findUnique({
    where: { id }
  });
};