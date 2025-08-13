'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { JobApplication } from './lib/types';
import JobList from './components/JobList';
import JobModal from './components/JobModal';
import DeleteDialog from './components/DeleteDialog';
import Image from "next/image";

export default function Home() {
  // NextAuth session hook
  const { data: session, status } = useSession();

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
  // Search filter state
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch applications when component first loads
  useEffect(() => {
    if (session) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [session]);

  // Fetches all applications from the API and updates the state
  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications', {
        credentials: 'include' // Add this line
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data); 
      
      // Make sure data is an array before setting it
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        console.error('API returned non-array data:', data);
        setApplications([]);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setApplications([]); // Set empty array on error
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

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading while checking authentication status
  if (status === "loading") {
    return (
      <div className="h-screen overflow-hidden text-gray-200 bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // Show login page if user is not authenticated
  if (!session) {
    return (
      <div className="h-screen py-8 overflow-hidden flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-900/90 rounded-lg shadow p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-100 mb-2 flex items-center orbitron">
              <Image src="/favicon.png" width={32} height={32} alt="Job Rocket logo" />
              Job Rocket
            </h1>
            <p className="text-gray-200 mb-6">Sign in to track your job applications</p>
            
            <div className="space-y-4">
              <button
                onClick={() => signIn('google')}
                className="w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
              >
                Sign in with Google
              </button>
              
              <button
                onClick={() => signIn('github')}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
              >
                Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-auto py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          {/* Desktop layout - shows on medium screens and up */}
          <div className="hidden md:flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-100 flex items-center orbitron">
                <Image src="/favicon.png" width={32} height={32} alt="Job Rocket logo" />
                Job Rocket
              </h1>
              <p className="text-gray-200 mt-2">Get ready for lift off, track your job applications and their status!</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-200">Greetings, {session.user?.name || session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
              >
                Eject
              </button>
            </div>
          </div>
          
          {/* Mobile layout - shows on small screens */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-100 flex items-center">
                <Image src="/favicon.png" width={32} height={32} alt="Job Rocket logo" />
                Job Rocket
              </h1>
              <button
                onClick={() => signOut()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium text-md cursor-pointer"
              >
                Eject
              </button>
            </div>
            <p className="text-gray-200 text-md mb-2">Track your applications and their status</p>
            <p className="text-gray-200 text-md">Greetings, {session.user?.name || session.user?.email}</p>
          </div>
        </div>
        {/* Add New Application Button */}
        <div className="mb-6">
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-medium cursor-pointer shadow"
          >
            Add New Application
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300 text-gray-300"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-200 mt-2">
              Showing {filteredApplications.length} of {applications.length} applications
            </p>
          )}
        </div>

        {/* Main Content Area, shows loading or applications list */}
        {loading ? (
          <div className="text-center py-8 text-gray-200">Loading...</div>
        ) : (
          <JobList
            applications={filteredApplications}
            onEdit={handleEdit}
            onDelete={handleDelete}
            allApplicationsCount={applications.length}
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