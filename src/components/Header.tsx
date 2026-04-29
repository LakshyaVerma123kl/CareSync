import { useState } from 'react';
import { Bell, Search, User, Menu, LogOut, Settings } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { auth, isMockEnv } from '@/config/firebase';
import { cn } from '@/utils/cn';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { toggleSidebar } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!isMockEnv) {
      await auth.signOut();
    }
    logout();
  };

  const triggerPushNotification = () => {
    toast.info('Requesting push notification...', { description: 'Check your OS notification center' });
    if ('serviceWorker' in navigator && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('Patient Alert', {
              body: 'Critical vitals recorded for Marcus Sterling (PAT-1002).',
              icon: '/vite.svg',
              tag: 'patient-alert',
            });
          });
        } else {
          toast.error('Please enable notifications to see this feature.');
        }
      });
    } else {
      toast.error('Your browser does not support Service Worker Notifications.');
    }
    setShowNotifications(false);
  };

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Critical Vitals Alert', message: 'Marcus Sterling (PAT-1002)', time: '2 mins ago', unread: true },
    { id: 2, title: 'Lab Results Ready', message: 'Sophia Chen (PAT-1003)', time: '1 hour ago', unread: false },
    { id: 3, title: 'System Maintenance', message: 'Scheduled down-time at 2AM', time: '5 hours ago', unread: false },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    toast.success('All notifications marked as read');
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const hasUnread = notifications.some(n => n.unread);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 lg:hidden text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients, doctors, or reports..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell className="h-5 w-5" />
            {hasUnread && <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>}
          </button>
          
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="fixed top-16 left-4 right-4 sm:absolute sm:top-auto sm:left-auto sm:right-0 sm:mt-2 sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden transform sm:origin-top-right">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-semibold text-slate-900">Notifications</h3>
                  {hasUnread && (
                    <button onClick={markAllRead} className="text-xs text-blue-600 font-medium hover:underline">Mark all read</button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markAsRead(n.id)}
                      className={cn("p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer", n.unread && "bg-blue-50/50")}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className={cn("text-sm font-medium", n.unread ? "text-slate-900" : "text-slate-700")}>{n.title}</p>
                        {n.unread && <span className="h-2 w-2 bg-blue-600 rounded-full mt-1.5" />}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{n.message}</p>
                      <p className="text-xs text-slate-400 font-medium">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-100 bg-slate-50">
                  <button 
                    onClick={triggerPushNotification}
                    className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Test OS Push Notification
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-full pr-3 transition-colors focus:ring-2 focus:ring-blue-100 outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              {/* @ts-ignore */}
              {user?.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block truncate max-w-[120px]">
              {/* @ts-ignore */}
              {user?.email ? user.email.split('@')[0] : 'Dr. Admin'}
            </span>
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="fixed top-16 right-4 sm:absolute sm:top-auto sm:right-0 sm:mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 py-2 sm:origin-top-right">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {/* @ts-ignore */}
                    {user?.email || 'Dr. Admin'}
                  </p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { navigate('/settings'); setShowProfile(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" /> Account Settings
                  </button>
                </div>
                <div className="border-t border-slate-100 py-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
