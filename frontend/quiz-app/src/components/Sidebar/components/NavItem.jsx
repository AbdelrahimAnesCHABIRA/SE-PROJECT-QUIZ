import { NavLink } from 'react-router-dom';
import { StarAnimation } from './StarAnimation';

export const NavItem = ({ id, icon: Icon, translationKey, isActive, onClick, isAI, isCollapsed }) => (
  <div className="relative group">
    <NavLink
      to={`/${id}`}
      className={`relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 overflow-hidden
        ${isCollapsed ? 'justify-center' : ''}
        ${isActive 
          ? isAI 
            ? 'bg-gradient-to-l from-blue-600 to-purple-600 text-white shadow-lg' 
            : 'bg-blue-50 text-primary' 
          : 'text-gray-500 hover:bg-gray-50'
        }
        ${isAI && !isActive && 'hover:bg-gradient-to-l hover:from-blue-600 hover:to-purple-600 hover:text-white '}
      `}
      onClick={() => onClick(id)}
    >
      <Icon className={`text-xl ${isAI ? 'relative z-10' : ''}`} />
      {!isCollapsed && <span className={`${isAI ? 'relative z-10' : ''}`}>{translationKey}</span>}
      {isAI && <div className="absolute inset-0 opacity-30"><StarAnimation /></div>}
    </NavLink>
    
    {isCollapsed && (
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded 
        opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {translationKey}
      </div>
    )}
  </div>
);