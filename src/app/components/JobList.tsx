/*
JobList Component
Displays all job applications in a responsive table
*/

import { JobApplication } from '../lib/types';

interface JobListProps {
  applications: JobApplication[];
  onEdit: (app: JobApplication) => void;
  onDelete: (id: string) => void;
}

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

export default function JobList({ applications, onEdit, onDelete }: JobListProps) {
  if (applications.length === 0) {
    return <div className="p-4 text-center">No applications yet. Add one!</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop table view - hidden on mobile */}
      <div className="hidden sm:block">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Company</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Role</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{app.company}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{app.role}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                    </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(app.dateApplied).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm space-x-2">
                  <button onClick={() => onEdit(app)} className="text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button onClick={() => onDelete(app.id)} className="text-red-600 hover:text-red-800">
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
                <h3 className="font-medium text-gray-900 text-sm">{app.company}</h3>
                <p className="text-sm text-gray-600">{app.role}</p>
              </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(app.status)}`}>
                {app.status}
                </span>
            </div>
            
            <p className="text-xs text-gray-500 mb-3">
              Applied: {new Date(app.dateApplied).toLocaleDateString()}
            </p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => onEdit(app)} 
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(app.id)} 
                className="text-red-600 hover:text-red-800 text-sm"
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