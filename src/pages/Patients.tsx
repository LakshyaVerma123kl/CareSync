import { usePatientStore } from '@/store/patientStore';
import { Card, CardContent } from '@/components/ui/Card';
import { LayoutGrid, List as ListIcon, Search, MoreVertical, Calendar } from 'lucide-react';
import type { Patient } from '@/types';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  const navigate = useNavigate();
  const { viewMode, setViewMode, searchQuery, setSearchQuery, filteredPatients } = usePatientStore();
  const patients = filteredPatients();

  const StatusBadge = ({ status }: { status: Patient['status'] }) => {
    const colors = {
      Critical: 'bg-rose-100 text-rose-700 border-rose-200',
      Stable: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Discharged: 'bg-slate-100 text-slate-700 border-slate-200'
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Patient Directory</h2>
          <p className="text-slate-500">Manage and view all registered patients.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <Card 
              key={patient.id} 
              className="hover:shadow-md transition-shadow group cursor-pointer"
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <img src={patient.avatarUrl} alt={patient.name} className="h-16 w-16 rounded-full border-2 border-slate-100" />
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{patient.name}</h3>
                  <p className="text-sm text-slate-500">{patient.id} • {patient.age} yrs • {patient.gender}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Condition</span>
                    <span className="font-medium text-slate-900">{patient.condition}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Status</span>
                    <StatusBadge status={patient.status} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Patient Info</th>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Condition</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Visit</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={patient.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
                        <div>
                          <p className="font-medium text-slate-900">{patient.name}</p>
                          <p className="text-xs text-slate-500">{patient.age} yrs • {patient.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{patient.id}</td>
                    <td className="px-6 py-4 font-medium">{patient.condition}</td>
                    <td className="px-6 py-4"><StatusBadge status={patient.status} /></td>
                    <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {patient.lastVisit}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/patients/${patient.id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {patients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No patients found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Patients;
