import { useState } from 'react';
import { Search, Eye, UserCheck, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/table';
import { Badge } from '../../components/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/dialog';

export default function PatientsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const patients = [
    {
      id: 1,
      name: 'Robert Thompson',
      age: 72,
      diagnosis: 'Hypertension',
      caregiver: 'Michael Chen',
      supervisor: 'Dr. Sarah Johnson',
      admissionDate: '2026-03-15',
      status: 'Stable',
      lastVitals: {
        bloodPressure: '130/85',
        heartRate: '75 bpm',
        temperature: '98.6°F',
        oxygen: '97%',
      },
    },
    {
      id: 2,
      name: 'Margaret Davis',
      age: 68,
      diagnosis: 'Diabetes Type 2',
      caregiver: 'Emily Rodriguez',
      supervisor: 'Dr. Sarah Johnson',
      admissionDate: '2026-04-01',
      status: 'Monitoring',
      lastVitals: {
        bloodPressure: '125/80',
        heartRate: '72 bpm',
        temperature: '98.4°F',
        oxygen: '98%',
      },
    },
    {
      id: 3,
      name: 'William Garcia',
      age: 81,
      diagnosis: 'Heart Disease',
      caregiver: 'Lisa Anderson',
      supervisor: 'Dr. Sarah Johnson',
      admissionDate: '2026-02-20',
      status: 'Critical',
      lastVitals: {
        bloodPressure: '145/95',
        heartRate: '88 bpm',
        temperature: '99.1°F',
        oxygen: '94%',
      },
    },
    {
      id: 4,
      name: 'Dorothy Martinez',
      age: 75,
      diagnosis: 'Arthritis',
      caregiver: 'Michael Chen',
      supervisor: 'Dr. Sarah Johnson',
      admissionDate: '2026-03-28',
      status: 'Stable',
      lastVitals: {
        bloodPressure: '128/82',
        heartRate: '70 bpm',
        temperature: '98.5°F',
        oxygen: '97%',
      },
    },
    {
      id: 5,
      name: 'Charles Wilson',
      age: 79,
      diagnosis: 'COPD',
      caregiver: 'Emily Rodriguez',
      supervisor: 'Dr. Sarah Johnson',
      admissionDate: '2026-04-10',
      status: 'Monitoring',
      lastVitals: {
        bloodPressure: '132/86',
        heartRate: '78 bpm',
        temperature: '98.7°F',
        oxygen: '95%',
      },
    },
  ];

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsViewDialogOpen(true);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Stable':
        return 'default';
      case 'Monitoring':
        return 'secondary';
      case 'Critical':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Patients Overview</h1>
          <p className="page-description">View and monitor all patients in the system</p>
        </div>
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">{patients.length}</div>
            <div className="stat-label">Total Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{patients.filter(p => p.status === 'Stable').length}</div>
            <div className="stat-label">Stable</div>
          </div>
          <div className="stat-card critical">
            <div className="stat-value">{patients.filter(p => p.status === 'Critical').length}</div>
            <div className="stat-label">Critical</div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search patients by name or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Caregiver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Admission Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.diagnosis}</TableCell>
                <TableCell>{patient.caregiver}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(patient.status)}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>{patient.admissionDate}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="btn-icon"
                    onClick={() => handleViewPatient(patient)}
                  >
                    <Eye size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
            <DialogDescription>Overview of patient information and vitals</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="patient-details">
              <div className="detail-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedPatient.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Age:</span>
                    <span className="detail-value">{selectedPatient.age} years</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Diagnosis:</span>
                    <span className="detail-value">{selectedPatient.diagnosis}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <Badge variant={getStatusVariant(selectedPatient.status)}>
                      {selectedPatient.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3 className="section-title">Care Team</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Caregiver:</span>
                    <span className="detail-value">{selectedPatient.caregiver}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Supervisor:</span>
                    <span className="detail-value">{selectedPatient.supervisor}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Admission Date:</span>
                    <span className="detail-value">{selectedPatient.admissionDate}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3 className="section-title">Latest Vitals</h3>
                <div className="vitals-grid">
                  <div className="vital-card">
                    <div className="vital-label">Blood Pressure</div>
                    <div className="vital-value">{selectedPatient.lastVitals.bloodPressure}</div>
                  </div>
                  <div className="vital-card">
                    <div className="vital-label">Heart Rate</div>
                    <div className="vital-value">{selectedPatient.lastVitals.heartRate}</div>
                  </div>
                  <div className="vital-card">
                    <div className="vital-label">Temperature</div>
                    <div className="vital-value">{selectedPatient.lastVitals.temperature}</div>
                  </div>
                  <div className="vital-card">
                    <div className="vital-label">Oxygen Level</div>
                    <div className="vital-value">{selectedPatient.lastVitals.oxygen}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
