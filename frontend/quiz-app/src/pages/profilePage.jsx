import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/User/profile', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('هل أنت متأكد أنك تريد تسجيل الخروج؟')) {
      try {
        const response = await fetch('http://localhost:5000/api/User/logout', {
          method: 'POST',
          credentials: 'include'
        });
        if (response.ok) {
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      {/* Navbar should be positioned at the top */}
      <Navbar />
      
      {/* Profile content container */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            الملف الشخصي
          </h1>
          
          {user && (
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  الاسم الأول:
                </label>
                <p className="bg-gray-50 rounded-lg p-3 text-gray-800">
                  {user.firstName}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  اسم العائلة:
                </label>
                <p className="bg-gray-50 rounded-lg p-3 text-gray-800">
                  {user.lastName}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  البريد الإلكتروني:
                </label>
                <p className="bg-gray-50 rounded-lg p-3 text-gray-800">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              onClick={() => navigate('/chooseChild')}
            >
              تغيير الطفل
            </button>

            <button 
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
