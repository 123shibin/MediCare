import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Activity, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/tabs';

export default function ReportsAnalytics() {
  const admissionsData = [
    { id: 1, month: 'Jan', admissions: 12, discharges: 8 },
    { id: 2, month: 'Feb', admissions: 15, discharges: 10 },
    { id: 3, month: 'Mar', admissions: 18, discharges: 14 },
    { id: 4, month: 'Apr', admissions: 10, discharges: 12 },
  ];

  const vitalsData = [
    { id: 1, date: 'Apr 17', avgBP: 128, avgHR: 75, avgO2: 97 },
    { id: 2, date: 'Apr 18', avgBP: 130, avgHR: 76, avgO2: 96 },
    { id: 3, date: 'Apr 19', avgBP: 125, avgHR: 74, avgO2: 97 },
    { id: 4, date: 'Apr 20', avgBP: 132, avgHR: 77, avgO2: 96 },
    { id: 5, date: 'Apr 21', avgBP: 127, avgHR: 73, avgO2: 98 },
    { id: 6, date: 'Apr 22', avgBP: 129, avgHR: 75, avgO2: 97 },
    { id: 7, date: 'Apr 23', avgBP: 131, avgHR: 76, avgO2: 96 },
  ];

  const summaryStats = [
    {
      title: 'Total Admissions',
      value: '55',
      change: '+12%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Active Patients',
      value: '42',
      change: '+8%',
      icon: Activity,
      trend: 'up',
    },
    {
      title: 'Critical Cases',
      value: '3',
      change: '-25%',
      icon: AlertTriangle,
      trend: 'down',
    },
    {
      title: 'Avg Recovery Time',
      value: '14.5 days',
      change: '-5%',
      icon: TrendingUp,
      trend: 'down',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-description">System-wide insights and trends</p>
        </div>
      </div>

      <div className="stats-grid">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card-large">
              <div className="stat-header">
                <div className={`stat-icon ${stat.trend}`}>
                  <Icon size={24} />
                </div>
                <span className={`stat-change ${stat.trend}`}>{stat.change}</span>
              </div>
              <div className="stat-content">
                <div className="stat-value-large">{stat.value}</div>
                <div className="stat-label">{stat.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      <Tabs defaultValue="admissions" className="reports-tabs">
        <TabsList>
          <TabsTrigger value="admissions">Admissions & Discharges</TabsTrigger>
          <TabsTrigger value="vitals">Vitals Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="admissions">
          <div className="content-card">
            <div className="chart-header">
              <h3 className="chart-title">Monthly Admissions & Discharges</h3>
              <p className="chart-description">Tracking patient flow over the past 4 months</p>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={admissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="admissions" fill="#3b82f6" name="Admissions" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="discharges" fill="#10b981" name="Discharges" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vitals">
          <div className="content-card">
            <div className="chart-header">
              <h3 className="chart-title">Average Vital Signs - Last 7 Days</h3>
              <p className="chart-description">System-wide average vitals monitoring</p>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={vitalsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="avgBP" stroke="#3b82f6" name="Avg Blood Pressure" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="avgHR" stroke="#10b981" name="Avg Heart Rate" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="avgO2" stroke="#f59e0b" name="Avg Oxygen %" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
