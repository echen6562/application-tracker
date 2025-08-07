/*
API routes for individual job applications
Handles PUT (update) and DELETE operations
*/

import { NextRequest, NextResponse } from 'next/server';
import { updateApplication, deleteApplication } from '../../../lib/data';
import { JobApplicationInput } from '../../../lib/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';

// PUT /api/applications/[id] | Update a specific job application by ID for a user
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: Partial<JobApplicationInput> = await request.json();
    
    // Convert dateApplied string to Date object if present
    const updateData = {
      ...body,
      ...(body.dateApplied && { dateApplied: new Date(body.dateApplied) })
    };
    
    // Update application
    const updatedApplication = await updateApplication(params.id, session.user.id, updateData);
    
    if (!updatedApplication) {
      return NextResponse.json(
        { error: 'Application not found or unauthorized' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedApplication);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE /api/applications/[id] | Delete a specific job application by ID for a user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete application
    const success = await deleteApplication(params.id, session.user.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Application not found or unauthorized' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}