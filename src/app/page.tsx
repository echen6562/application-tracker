'use client';

import { useState, useEffect } from 'react';
import { JobApplication } from './lib/types';
import JobList from './components/JobList';
import JobModal from './components/JobModal';
import DeleteDialog from './components/DeleteDialog';

export default function Home() {
  // State for storing all Job Applications fetched from the database
  const [applications, setApplications] = useState<JobApplication[]>([]);
  // This controls whether the add/edit modal is visible
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Stores the application being edited (null is adding, an object is editing)
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);
  // Stores ID of application being deleted, for the confirmation dialog
  const [deletingId, setDeletingId] = useState<string | null>(null);
  // Loading state for initial data fetch
  const [loading, setLoading] = useState(true);

  // Fetch applications when component first loads
  useEffect(() => {
    fetchApplications();
  }, []);

  // Fetches all applications from the API and updates the state
  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Opens modal for adding new application
  const handleAdd = () => {
    setEditingApp(null); // Clears any editing data
    setIsModalOpen(true);
  };

  // Opens modal for editing existing application
  const handleEdit = (app: JobApplication) => {
    setEditingApp(app); // Set application to edit
    setIsModalOpen(true);
  };

  // Handles deletion process by opening confirmation dialog
  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  // Handles actually deleting the application after user confirms
  const confirmDelete = async () => {
    if (!deletingId) return;
    
    try {
      // Calling DELETE API endpoint
      await fetch(`/api/applications/${deletingId}`, {
        method: 'DELETE',
      });
      // Remove from local state
      setApplications(apps => apps.filter(app => app.id !== deletingId));
    } catch (error) {
      console.error('Failed to delete application:', error);
    } finally {
      setDeletingId(null); // Close the dialog
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Application Tracker</h1>
          <p className="text-gray-600 mt-2">Track your job applications and their status</p>
        </div>

        {/* Add New Application Button */}
        <div className="mb-6">
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
          >
            Add New Application
          </button>
        </div>

        {/* Main Content Area, shows loading or applications list */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <JobList
            applications={applications}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Add/Edit Modal, only renders when isModalOpen is true */}
        <JobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingApp={editingApp}
          onSave={fetchApplications}
        />

        {/* Delete Confirmation Dialog, only renders when deletingId exists */}
        <DeleteDialog
          isOpen={!!deletingId}
          onClose={() => setDeletingId(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}