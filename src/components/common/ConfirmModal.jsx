// A specific popup for confirmation.

// Example:

// Delete Product?

// Are you sure?

// Cancel    Confirm
import Modal from "./Modal";

export default function ConfirmModal({
  open,
  title = "Confirm Action",
  message,
  onConfirm,
  onClose,
}) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p className="text-sm leading-6 text-gray-600">{message}</p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}