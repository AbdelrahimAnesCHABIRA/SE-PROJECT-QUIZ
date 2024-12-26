import { Logo } from './Logo';
import { CreateButton } from './CreateButton';

export const SidebarHeader = ({ isCollapsed }) => (
  <div className="p-4 flex flex-col items-center">
    {!isCollapsed && <Logo />}
    <CreateButton isCollapsed={isCollapsed} />
  </div>
);