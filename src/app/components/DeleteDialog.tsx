/**
 * DeleteDialog Component
 * Confirmation dialog for deleting job applications
 */

// Props interface for the DeleteDialog component
interface DeleteDialogProps {
  isOpen: boolean;       // Controls if dialog is visible
  onClose: () => void;   // A function to call when the dialog is closed
  onConfirm: () => void; // A function to call when confirming the delete
}

export default function DeleteDialog({ isOpen, onClose, onConfirm }: DeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-900/90 text-gray-100 p-6 rounded">
        <p className="mb-4">Are you sure you want to delete this application?</p>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded text-black cursor-pointer">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer">Delete</button>
        </div>
      </div>
    </div>
  );
}