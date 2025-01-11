import { useNavigate } from 'react-router-dom';
import { FaBrain } from 'react-icons/fa';
import { useUser } from '../hooks/useUser';

const  Navbar = () => {
  const navigate = useNavigate();
  const { user, userLoading } = useUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/explorer')}>
            <FaBrain className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-2xl font-bold text-gray-800">تعلم</span>
          </div>
          
          {!userLoading && user && (
            <div 
              className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => navigate('/profile')}
            >
              <span className="text-lg font-medium text-gray-700">
                {user.firstName} {user.lastName}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar