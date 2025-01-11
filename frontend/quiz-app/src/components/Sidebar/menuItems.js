import { AiOutlineHome, AiOutlineBook, AiOutlineBarChart, AiOutlineTeam } from 'react-icons/ai';
import { IoServerOutline } from 'react-icons/io5';
import { BsRobot } from 'react-icons/bs';

export const menuItems = [
  { id: 'explorer', icon: AiOutlineHome, translationKey: 'sidebar.menu.explorer' },
  { id: 'archive', icon: AiOutlineBook, translationKey: 'sidebar.menu.archive' },
  { id: 'rapports', icon: AiOutlineBarChart, translationKey: 'sidebar.menu.reports' },
  { id: 'quizizz-ai', icon: BsRobot, translationKey: 'sidebar.menu.ai' }
];