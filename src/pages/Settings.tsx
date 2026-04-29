import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Shield, Bell } from 'lucide-react';

const Settings = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500">Manage your profile and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-2">
          <nav className="flex flex-col space-y-1">
            <button className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
              <User className="h-4 w-4" /> Profile
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
              <Shield className="h-4 w-4" /> Security
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
              <Bell className="h-4 w-4" /> Notifications
            </button>
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                  {/* @ts-ignore */}
                  {user?.email?.charAt(0).toUpperCase() || 'D'}
                </div>
                <div>
                  <Button variant="outline" className="text-sm h-9">Change Avatar</Button>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Input label="First Name" defaultValue="Admin" />
                </div>
                <div className="space-y-1">
                  <Input label="Last Name" defaultValue="" />
                </div>
              </div>
              <div className="space-y-1">
                <Input 
                  label="Email Address" 
                  type="email" 
                  // @ts-ignore
                  defaultValue={user?.email || 'admin@caresync.com'} 
                  disabled 
                />
                <p className="text-xs text-slate-500 mt-1">Your email cannot be changed directly from here.</p>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
