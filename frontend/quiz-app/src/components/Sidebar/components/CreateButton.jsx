import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const CreateButton = ({ isCollapsed }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate('/create');
  }
  
  return (
    <button 
    onClick={() => handleCreateClick()}
      className={`bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors
        ${isCollapsed 
          ? 'w-10 h-10 flex items-center justify-center text-xl' 
          : 'w-full py-3 px-4 text-base'
        }`}
    >
      {isCollapsed ? '+' : `+ ${t('sidebar.create')}`}
    </button>
  );
};