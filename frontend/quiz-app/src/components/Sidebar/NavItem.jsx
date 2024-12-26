import { NavLink } from 'react-router-dom';

export const NavItem = ({ id, icon: Icon, label, isActive, onClick }) => (
  <NavLink
    to={`/${id}`}
    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors ${
      isActive ? 'bg-blue-50 text-primary' : ''
    }`}
    onClick={() => onClick(id)}
  >
    <Icon className="text-xl" />
    <span>{label}</span>
  </NavLink>
);