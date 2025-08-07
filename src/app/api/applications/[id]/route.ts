/*
API routes for individual job applications
Handles PUT (update) and DELETE operations
*/

import { NextRequest, NextResponse } from 'next/server';
import { updateApplication, deleteApplication } from '../../../lib/data';
import { JobApplicationInput } from '../../../lib/types';

// PUT /api/applications/[id] | Update a specific job application by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: Partial<JobApplicationInput> = await request.json();
    
    // Convert dateApplied string to Date object if present
    const updateData = {
      ...body,
      ...(body.dateApplied && { dateApplied: new Date(body.dateApplied) })
    };
    
    const updatedApplication = await updateApplication(params.id, updateData);
    
    if (!updatedApplication) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedApplication);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE /api/applications/[id] | Delete a specific job application by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteApplication(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}