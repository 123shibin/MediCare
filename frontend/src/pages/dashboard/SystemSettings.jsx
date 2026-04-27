import { useState } from 'react';
import { Save, Bell, Shield, Database, Mail, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/tabs';
import { Switch } from '../../components/switch';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    criticalAlerts: true,
    dailyReports: true,
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    allowMultipleSessions: false,
    backupFrequency: 'daily',
    retentionPeriod: '365',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-description">Configure system-wide preferences and security</p>
        </div>
        <button className="btn-primary" onClick={handleSave}>
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <Tabs defaultValue="notifications" className="settings-tabs">
        <TabsList>
          <TabsTrigger value="notifications">
            <Bell size={16} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield size={16} />
            Security
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database size={16} />
            Database
          </TabsTrigger>
          <TabsTrigger value="general">
            <Globe size={16} />
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <div className="content-card">
            <div className="settings-section">
              <h3 className="section-title">Notification Preferences</h3>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Email Notifications</div>
                    <div className="setting-description">Receive alerts and updates via email</div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleToggle('emailNotifications')}
                  />
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">SMS Notifications</div>
                    <div className="setting-description">Receive critical alerts via SMS</div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={() => handleToggle('smsNotifications')}
                  />
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Critical Patient Alerts</div>
                    <div className="setting-description">Immediate notifications for critical patient status</div>
                  </div>
                  <Switch
                    checked={settings.criticalAlerts}
                    onCheckedChange={() => handleToggle('criticalAlerts')}
                  />
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Daily Reports</div>
                    <div className="setting-description">Automated daily summary reports</div>
                  </div>
                  <Switch
                    checked={settings.dailyReports}
                    onCheckedChange={() => handleToggle('dailyReports')}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="content-card">
            <div className="settings-section">
              <h3 className="section-title">Security Settings</h3>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Two-Factor Authentication</div>
                    <div className="setting-description">Require 2FA for all user logins</div>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={() => handleToggle('twoFactorAuth')}
                  />
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Session Timeout (minutes)</div>
                    <div className="setting-description">Auto-logout after inactivity</div>
                  </div>
                  <select
                    className="setting-select"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Password Expiry (days)</div>
                    <div className="setting-description">Force password change interval</div>
                  </div>
                  <select
                    className="setting-select"
                    value={settings.passwordExpiry}
                    onChange={(e) => handleChange('passwordExpiry', e.target.value)}
                  >
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="never">Never</option>
                  </select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Allow Multiple Sessions</div>
                    <div className="setting-description">Users can login from multiple devices</div>
                  </div>
                  <Switch
                    checked={settings.allowMultipleSessions}
                    onCheckedChange={() => handleToggle('allowMultipleSessions')}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="database">
          <div className="content-card">
            <div className="settings-section">
              <h3 className="section-title">Database & Backup</h3>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Backup Frequency</div>
                    <div className="setting-description">Automated backup schedule</div>
                  </div>
                  <select
                    className="setting-select"
                    value={settings.backupFrequency}
                    onChange={(e) => handleChange('backupFrequency', e.target.value)}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Data Retention (days)</div>
                    <div className="setting-description">How long to keep archived data</div>
                  </div>
                  <select
                    className="setting-select"
                    value={settings.retentionPeriod}
                    onChange={(e) => handleChange('retentionPeriod', e.target.value)}
                  >
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="general">
          <div className="content-card">
            <div className="settings-section">
              <h3 className="section-title">General Settings</h3>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Timezone</div>
                    <div className="setting-description">System default timezone</div>
                  </div>
                  <select
                    className="setting-select"
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Date Format</div>
                    <div className="setting-description">How dates are displayed</div>
                  </div>
                  <select
                    className="setting-select"
                    value={settings.dateFormat}
                    onChange={(e) => handleChange('dateFormat', e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Language</div>
                    <div className="setting-description">System interface language</div>
                  </div>
                  <select
                    className="setting-select"
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
