import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, Activity, HeartPulse, Clock } from 'lucide-react';

const stats = [
  { title: 'Total Patients', value: '1,482', icon: Users, change: '+12%', color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Active Admissions', value: '156', icon: HeartPulse, change: '-2%', color: 'text-rose-600', bg: 'bg-rose-100' },
  { title: 'Critical condition', value: '24', icon: Activity, change: '+4%', color: 'text-amber-600', bg: 'bg-amber-100' },
  { title: 'Avg. Wait Time', value: '14 min', icon: Clock, change: '-18%', color: 'text-emerald-600', bg: 'bg-emerald-100' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500">Monitor hospital metrics and active patients.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                </div>
                <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={stat.change.startsWith('+') ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>
                  {stat.change}
                </span>
                <span className="text-slate-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Patient discharged: Room 30{i}</p>
                    <p className="text-xs text-slate-500">Dr. Smith • {i * 10} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '09:00 AM', name: 'Sophia Chen', type: 'Checkup' },
                { time: '10:30 AM', name: 'Marcus Sterling', type: 'Follow-up' },
                { time: '11:15 AM', name: 'Aisha Rahman', type: 'Consultation' },
              ].map((apt, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded shadow-sm text-xs font-bold text-slate-700">
                      {apt.time.split(' ')[0]}<br/>
                      <span className="text-slate-400 font-normal">{apt.time.split(' ')[1]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{apt.name}</p>
                      <p className="text-xs text-slate-500">{apt.type}</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                    {apt.name.charAt(0)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
