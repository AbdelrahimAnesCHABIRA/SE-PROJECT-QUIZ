import { useLocation } from 'react-router-dom';
import { menuItems } from '../menuItems';
import { useTranslation } from 'react-i18next';
import { NavItem } from './NavItem';

export const SidebarNav = ({ isCollapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-3">
      {menuItems.map((item) => (
        <NavItem
          key={item.id}
          id={item.id}
          icon={item.icon}
          translationKey={t(item.translationKey)}
          isActive={location.pathname === `/${item.id}` || (location.pathname === '/' && item.id === 'explorer')}
          isAI={item.id === 'quizizz-ai'}
          isCollapsed={isCollapsed}
        />
      ))}
    </nav>
  );
};