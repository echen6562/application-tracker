/*
API routes for job applications
Handles GET (list all) and POST (create new) operations
*/

import { NextRequest, NextResponse } from 'next/server';
import { getApplications, createApplication } from '../../lib/data';
import { JobApplicationInput } from '../../lib/types';

// GET /api/applications | Get all job applications
export async function GET() {
  try {
    const applications = await getApplications();
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST /api/applications | Create new job application
export async function POST(request: NextRequest) {
  try {
    const body: JobApplicationInput = await request.json();
    
    // Convert dateApplied string to Date object
    const applicationData = {
      ...body,
      dateApplied: new Date(body.dateApplied)
    };
    
    const newApplication = await createApplication(applicationData);
    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}