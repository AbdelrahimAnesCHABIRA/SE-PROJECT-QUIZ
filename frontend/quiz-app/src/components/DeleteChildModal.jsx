import React from "react";
import { X } from "lucide-react";

export const DeleteChildModal = ({ isOpen, onClose, onDelete, studentToDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              تأكيد الحذف
            </h2>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed text-right">
            هل أنت متأكد أنك تريد حذف
            <span className="font-semibold text-gray-900">
              {" "}{studentToDelete.name}
            </span >
            ؟ لا يمكن التراجع عن هذا الإجراء
          </p>
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-white  rounded-lg bg-red-500 transition-colors"
            >
              الغاء
            </button>
            <button
              type="button"
              onClick={() => onDelete(studentToDelete)}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg  transition-colors"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
