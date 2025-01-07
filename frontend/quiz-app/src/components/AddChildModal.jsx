import React, { useState } from "react";
import { X, User, Calendar, Upload,Image  } from "lucide-react";

const STUDY_YEARS = [
  "الاولى إبتدائي",
  "الثانية إبتدائي",
  "الثالثة إبتدائي",
  "الرابعة إبتدائي",
  "الخامسة إبتدائي",

];

export const AddChildModal = ({ isOpen, onClose, onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [year, setYear] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && image && year) {
      onAdd(firstName,lastName, image, year);
      setFirstName("");
      setLastName("");
      setImage(null);
      setPreview("");
      setYear("1st Grade");
      onClose();
    } else {
      console.error("All fields are required");
    }
  };

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
              أضف طفل جديد
            </h2>
            
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="flex justify-end items-center text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="mr-2" />
                اسم الطفل
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border text-right border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="ادخل اسم الطفل"
                required
              />
            </div>
            <div>
              <label className="flex justify-end items-center text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="mr-2" />
                اسم الطفل
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border text-right border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="ادخل اسم الطفل"
                required
              />
            </div>
            <div>
              <label className="flex justify-end items-center text-sm font-medium text-gray-700 mb-2">
                <Image size={16} className="mr-2" />
                صورة الطفل
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="flex items-center hover:text-gray-950  justify-center w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2   transition-shadow">
                  <Upload size={20} className="text-gray-400 " />
                </div>
              </div>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-lg border"
                />
              )}
            </div>

            <div>
              <label className="flex justify-end items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="mr-2" />
                السنة الدراسية
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full  px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              >
                {STUDY_YEARS.map((y) => (
                  <option key={y} value={y} className="text-right">
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              الغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              أضف الطفل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
