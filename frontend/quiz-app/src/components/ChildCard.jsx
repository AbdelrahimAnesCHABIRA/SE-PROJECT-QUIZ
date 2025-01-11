import React from "react";

import { CircularProgress } from "./CircularProgress";
import { GraduationCap, Trash2 } from "lucide-react";

export const ChildCard = ({ Child, onDelete, onClick }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(Child);
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative select-none " 
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src={Child.imageUrl}
          alt={Child.firstName}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-red-500 transition-colors duration-200 group/delete"
        >
          <Trash2
            size={18}
            className="text-white group-hover/delete:text-white transition-colors"
          />
        </button>
        <div className="absolute bottom-4  right-2 z-20">
          <h3 className="text-xl font-bold text-white mb-1 select-none text-right">
            {Child.firstName} {Child.lastName}
          </h3>
          <div className="flex justify-end items-center w-[100%] text-white/90 text-sm select-none">
          {Child.studyLevel}
          <GraduationCap size={16} className="ml-2 " />
            
          </div>
        </div>
      </div>
    </div>
  );
};
