import { AiOutlineHome, AiOutlineBook, AiOutlineBarChart, AiOutlineTeam } from 'react-icons/ai';
import { IoServerOutline } from 'react-icons/io5';
import { BsRobot } from 'react-icons/bs';

export const menuItems = [
  { id: 'explorer', icon: AiOutlineHome, translationKey: 'sidebar.menu.explorer' },
  { id: 'archive', icon: AiOutlineBook, translationKey: 'sidebar.menu.archive' },
  { id: 'rapports', icon: AiOutlineBarChart, translationKey: 'sidebar.menu.reports' },
  { id: 'classes', icon: AiOutlineTeam, translationKey: 'sidebar.menu.classes' },
  { id: 'hebergements', icon: IoServerOutline, translationKey: 'sidebar.menu.hosting' },
  { id: 'quizizz-ai', icon: BsRobot, translationKey: 'sidebar.menu.ai' }
];