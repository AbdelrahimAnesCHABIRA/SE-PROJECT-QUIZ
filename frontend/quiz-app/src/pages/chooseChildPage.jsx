import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChildCard } from "../components/ChildCard";
import Button from "../components/Button"; // Assuming you have a reusable button component
import { checkUserSession } from "../controllers/authUtils";
import { AddChildModal } from "../components/AddChildModal";

const ChooseChildPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user_id from session
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const userId = await checkUserSession(navigate);
        const response = await fetch(`api/Child?userId=${userId}`);
        if(response.ok){
          setChildren(await response.json());
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching children:", err);
        setError("Failed to load children. Please try again.");
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const handleChildSelect = async (childId) => {
    try{
      await axios.post('/api/Child/chooseChild', { childId: childId });
      // Navigate to the next page with the selected child's ID
      navigate(`/child/${childId}`);
    }catch(err){
      console.error("Error saving child ID to session:", err);
      setError("Failed to save child. Please try again.");
    }
  };

  const handleDeleteChild = async (child) => {
    try {
      await axios.delete(`/api/children/${child.id}`);
      setChildren((prev) => prev.filter((c) => c.id !== child.id));
    } catch (err) {
      console.error("Error deleting child:", err);
      setError("Failed to delete child. Please try again.");
    }
  };

  const handleAddChild = () => {
    setIsOpen(true);
  }

  const handleCloseAddChild = ()=> {
    setIsOpen(false);
  }

  const handleCreateChild = (name, image, year)=>{
    console.log('attempt to create a child: ' + name);
  }

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">اختر ملف طفلك</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {children.map((child) => (
          <ChildCard
            key={child._id}
            Child={child}
            onClick={() => handleChildSelect(child._id)}
            onDelete={handleDeleteChild}
          />
        ))}
      </div>
      <div className="mt-8">
        <Button onClick={handleAddChild} fullWidth>
          أضف طفلاً جديداً
        </Button>
      </div>
      <AddChildModal
        isOpen={isOpen}
        onClose={handleCloseAddChild}
        onAdd={handleCreateChild}
      />
    </div>
  );
};

export default ChooseChildPage;
