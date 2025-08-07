/**
 * DeleteDialog Component
 * Confirmation dialog for deleting job applications
 */

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({ isOpen, onClose, onConfirm }: DeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded">
        <p className="mb-4">Are you sure you want to delete this application?</p>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}