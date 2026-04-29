import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', admissions: 400, discharges: 240 },
  { name: 'Feb', admissions: 300, discharges: 139 },
  { name: 'Mar', admissions: 200, discharges: 980 },
  { name: 'Apr', admissions: 278, discharges: 390 },
  { name: 'May', admissions: 189, discharges: 480 },
  { name: 'Jun', admissions: 239, discharges: 380 },
];

const waitTimeData = [
  { time: '08:00', wait: 15 },
  { time: '10:00', wait: 25 },
  { time: '12:00', wait: 45 },
  { time: '14:00', wait: 30 },
  { time: '16:00', wait: 20 },
  { time: '18:00', wait: 10 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Hospital Analytics</h2>
        <p className="text-slate-500">Detailed insights into patient flow and hospital performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Admissions vs Discharges (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="admissions" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Admissions" />
                  <Bar dataKey="discharges" fill="#10b981" radius={[4, 4, 0, 0]} name="Discharges" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Wait Time (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waitTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Line type="monotone" dataKey="wait" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} name="Wait Time (mins)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
