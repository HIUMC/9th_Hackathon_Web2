import { Link, useLocation } from 'react-router-dom';
import Active_SettingIcon from '../assets/icons/icon_active_setting.svg?react'
import Active_CalendarIcon from '../assets/icons/icon_active_calendar.svg?react'
import Active_GraphIcon from '../assets/icons/icon_active_graph.svg?react'
import InActive_SettingIcon from '../assets/icons/icon_inactive_setting.svg?react'
import InActive_CalendarIcon from '../assets/icons/icon_inactive_calendar.svg?react'
import InActive_GraphIcon from '../assets/icons/icon_inactive_graph.svg?react'


const SideBar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      label: '달력',
      activeIcon: (
        <Active_CalendarIcon />
      ),
      inactiveIcon: (
        <InActive_CalendarIcon />
      ),
    },
    {
      path: '/monthly-data',
      label: '월별 통계',
      activeIcon: (
        <Active_GraphIcon />
      ),
      inactiveIcon: (
        <InActive_GraphIcon />
      ),
    },
    {
      path: '/settings',
      label: '설정',
      activeIcon: (
        <Active_SettingIcon />
      ),
      inactiveIcon: (
        <InActive_SettingIcon />
      ),
    }
  ];

  return (
    <aside className="w-[235px] shrink-0 bg-white border-r border-gray-200 font-sans min-h-screen">
      <nav className="w-full pt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className='w-full'>
                <Link
                  to={item.path}
                  className={`
                    flex items-center self-stretch gap-2 py-4 pl-6 
                    text-[18px] transition-colors duration-200
                    ${isActive
                      ? 'bg-200 text-[#202227] font-semibold'
                      : 'bg-white text-600 font-normal hover:bg-100 hover:text-800'}`
                    }
                >
                  {/* 상태에 따라 다른 아이콘 렌더링 */}
                  <span className="w-5 h-5 flex items-center justify-center">
                    {isActive ? item.activeIcon : item.inactiveIcon}
                  </span>
                  
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;