/*
API routes for job applications
Handles GET (list all) and POST (create new) operations
*/

import { NextRequest, NextResponse } from 'next/server';
import { getApplications, createApplication } from '../../lib/data';
import { JobApplicationInput } from '../../lib/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';

// GET /api/applications | Get all job applications for the authenticated user
export async function GET() {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get applications filtered by user ID
    const applications = await getApplications(session.user.id);
    return NextResponse.json(applications);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST /api/applications | Create new job application for the authenticated user
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const body: Omit<JobApplicationInput, 'userId'> = await request.json();
    
    // Convert dateApplied string to Date object and add user ID from session
    const applicationData = {
      ...body,
      dateApplied: new Date(body.dateApplied),
      userId: session.user.id // Add user ID from authenticated session
    };
    
    // Create the application in the database
    const newApplication = await createApplication(applicationData);
    return NextResponse.json(newApplication, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}