/**
 * JobModal Component
 * Modal form for adding new applications or editing existing ones
 */
import { useState, useEffect } from 'react';
import { JobApplication } from '../lib/types';

interface JobModalProps {
  isOpen: boolean;                      // Controls whether modal is visible
  onClose: () => void;                  // Function to close modal
  editingApp?: JobApplication | null;   // This checks if we're editing or adding new application
  onSave: () => void;                   // Callback to refresh application list after save
}

export default function JobModal({ isOpen, onClose, editingApp, onSave }: JobModalProps) {
  // Form state to track user input for each field
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('APPLIED');
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().split('T')[0]);

  // Runs when modal is open or editingApp changes

  useEffect(() => {
    if (editingApp) {
      // Editing Mode, fill form with existing application info
      setCompany(editingApp.company);
      setRole(editingApp.role);
      setStatus(editingApp.status);
      setDateApplied(new Date(editingApp.dateApplied).toISOString().split('T')[0]);
    } else {
      // Add Mode, reset form to defaults
      setCompany('');
      setRole('');
      setStatus('APPLIED');
      setDateApplied(new Date().toISOString().split('T')[0]);
    }
  }, [editingApp, isOpen]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data to send to API
    const data = { company, role, status, dateApplied };

    // Find API endpoint and HTTP method
    const url = editingApp ? `/api/applications/${editingApp.id}` : '/api/applications';
    const method = editingApp ? 'PUT' : 'POST';

    // Send request to API with authentication
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onSave();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4">      <div className="bg-white p-6 rounded max-w-md w-full">
        <h2 className="text-xl mb-4">{editingApp ? 'Edit' : 'Add'} Application</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded cursor-pointer"
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="ACCEPTED">Accepted</option>
          </select>
          
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            className="w-full p-2 border rounded cursor-pointer"
            required
          />
          
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}