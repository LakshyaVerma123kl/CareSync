import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, LogOut, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { auth, isMockEnv } from '@/config/firebase';
import { cn } from '@/utils/cn';

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const { isSidebarOpen, setSidebarOpen, isDesktopSidebarCollapsed, toggleDesktopSidebar } = useUIStore();

  const handleLogout = async () => {
    if (!isMockEnv) {
      await auth.signOut();
    }
    logout();
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: Activity },
  ];

  return (
    <aside className={cn(
      "bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none",
      isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0",
      isDesktopSidebarCollapsed ? "lg:w-20" : "lg:w-64",
      "w-64" // Default mobile width
    )}>
      <div className={cn("p-6 flex items-center justify-between", isDesktopSidebarCollapsed && "lg:justify-center lg:px-0")}>
        <h1 className={cn("font-bold text-blue-400 tracking-tight flex items-center gap-2", 
          isDesktopSidebarCollapsed ? "lg:text-xs lg:flex-col lg:gap-1" : "text-2xl"
        )}>
          <Activity className="h-6 w-6 shrink-0" />
          <span className={cn(isDesktopSidebarCollapsed && "lg:hidden")}>CareSync</span>
        </h1>
        <button 
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white",
              isDesktopSidebarCollapsed && "lg:justify-center lg:px-0"
            )}
            title={isDesktopSidebarCollapsed ? item.name : undefined}
          >
            <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", 
              isDesktopSidebarCollapsed && "lg:h-6 lg:w-6")} />
            <span className={cn("font-medium", isDesktopSidebarCollapsed && "lg:hidden")}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={toggleDesktopSidebar}
          className="w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all hidden lg:flex"
          title={isDesktopSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isDesktopSidebarCollapsed ? <ChevronRight className="h-5 w-5 shrink-0 mx-auto" /> : <ChevronLeft className="h-5 w-5 shrink-0" />}
          <span className={cn("font-medium", isDesktopSidebarCollapsed && "lg:hidden")}>
            Collapse
          </span>
        </button>
        <button 
          onClick={handleLogout}
          className={cn("w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all group",
            isDesktopSidebarCollapsed && "lg:justify-center lg:px-0"
          )}
          title={isDesktopSidebarCollapsed ? "Sign Out" : undefined}
        >
          <LogOut className={cn("h-5 w-5 shrink-0 group-hover:-translate-x-1 transition-transform",
            isDesktopSidebarCollapsed && "lg:h-6 lg:w-6 lg:group-hover:translate-x-0"
          )} />
          <span className={cn("font-medium", isDesktopSidebarCollapsed && "lg:hidden")}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
