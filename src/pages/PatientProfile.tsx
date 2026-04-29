import { useParams, useNavigate } from 'react-router-dom';
import { usePatientStore } from '@/store/patientStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, User, Activity, Calendar, Phone, Mail, MapPin } from 'lucide-react';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Patient Not Found</h2>
        <Button onClick={() => navigate('/patients')}>Back to Directory</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/patients')}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Patient Profile</h2>
          <p className="text-slate-500">Detailed medical records and history.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="p-6 text-center">
            <img 
              src={patient.avatarUrl} 
              alt={patient.name} 
              className="w-32 h-32 rounded-full mx-auto border-4 border-slate-100 shadow-sm mb-4"
            />
            <h3 className="text-xl font-bold text-slate-900">{patient.name}</h3>
            <p className="text-blue-600 font-medium mb-4">{patient.id}</p>
            
            <div className="space-y-3 text-sm text-left border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3 text-slate-600">
                <User className="h-4 w-4 shrink-0" />
                <span>{patient.age} years old • {patient.gender}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{patient.contact}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{patient.name.split(' ')[0].toLowerCase()}@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>123 Health Ave, Medical City</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clinical Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-sm text-slate-500 font-medium mb-1">Primary Condition</p>
                  <p className="text-lg font-bold text-slate-900">{patient.condition}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-sm text-slate-500 font-medium mb-1">Admission Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${
                    patient.status === 'Critical' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                    patient.status === 'Stable' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                    'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {patient.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Recent Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                  <p className="font-bold text-slate-900">Last Visit</p>
                  <p className="text-sm text-blue-600 mb-1">{patient.lastVisit}</p>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    Routine checkup for {patient.condition}. Vitals are stable. Prescribed continuation of current medication.
                  </p>
                </div>
                <div className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute w-3 h-3 bg-slate-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                  <p className="font-bold text-slate-900">Initial Admission</p>
                  <p className="text-sm text-slate-500 mb-1">{patient.admissionDate}</p>
                  <p className="text-sm text-slate-600">
                    Patient admitted for observation regarding {patient.condition}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
