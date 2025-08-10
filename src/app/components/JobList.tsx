/*
JobList Component
Displays all job applications in a responsive table
*/

import { JobApplication } from '../lib/types';

// Props interface for the DeleteDialog component
interface JobListProps {
  applications: JobApplication[];
  onEdit: (app: JobApplication) => void;
  onDelete: (id: string) => void;
}

// A helper function to get color of status for applications
const getStatusColor = (status: string) => {
  const colors = {
    APPLIED: 'bg-blue-100 text-blue-800',
    INTERVIEW: 'bg-yellow-100 text-yellow-800', 
    OFFER: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    ACCEPTED: 'bg-purple-100 text-purple-800',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default function JobList({ applications, onEdit, onDelete, allApplicationsCount = 0, }: JobListProps & { allApplicationsCount?: number }) {
  if (applications.length === 0) {
    return (
    <div className="p-4 text-center text-gray-200">
      <span role="img" aria-label="rocket">🚀</span> 
      Houston, we&#39;ve got a problem. 
      {allApplicationsCount === 0 ? (
        <span> No jobs applied to yet.</span>
      ) : (
        <span></span>
      )}
      </div>
    );
  }

  return (
    <div className="bg-gray-900/60 rounded-lg shadow overflow-hidden">
      {/* Desktop table view - hidden on mobile */}
      <div className="hidden sm:block">
        <table className="min-w-full">
          <thead className="bg-gray-900/90 text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Company</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-700">
                <td className="px-4 py-3 text-sm font-medium text-gray-200 max-w-44 truncate">{app.company}</td>
                <td className="px-4 py-3 text-sm text-gray-300 max-w-44 truncate">{app.role}</td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  {String(app.dateApplied).split('T')[0]}
                </td>
                <td className="px-4 py-3 text-sm space-x-2">
                  <button onClick={() => onEdit(app)} className="text-blue-600 hover:text-blue-700 cursor-pointer">
                    Edit
                  </button>
                  <button onClick={() => onDelete(app.id)} className="text-red-600 hover:text-red-700 cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view - shown only on mobile */}
      <div className="sm:hidden">
        {applications.map((app) => (
          <div key={app.id} className="p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-200 text-sm max-w-44 truncate">{app.company}</h3>
                <p className="text-sm text-gray-300 max-w-44 truncate">{app.role}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(app.status)}`}>
                {app.status}
              </span>
            </div>
            
            <p className="text-xs text-gray-300 mb-3">
              Applied: {String(app.dateApplied).split('T')[0]}
            </p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => onEdit(app)} 
                className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(app.id)} 
                className="text-red-600 hover:text-red-700 text-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}