import { useState } from 'react';
import { Search, Plus, Edit, Trash2, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/table';
import { Badge } from '../../components/badge';

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@medicare.com', role: 'Supervisor', status: 'Active', patients: 12 },
    { id: 2, name: 'Michael Chen', email: 'michael.c@medicare.com', role: 'Caregiver', status: 'Active', patients: 8 },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@medicare.com', role: 'Caregiver', status: 'Active', patients: 15 },
    { id: 4, name: 'Dr. James Wilson', email: 'james.w@medicare.com', role: 'Supervisor', status: 'Inactive', patients: 0 },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@medicare.com', role: 'Caregiver', status: 'Active', patients: 10 },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Caregiver',
    status: 'Active',
  });

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'Caregiver',
        status: 'Active',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser = {
        id: users.length + 1,
        ...formData,
        patients: 0,
      };
      setUsers([...users, newUser]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Users Management</h1>
          <p className="page-description">Manage supervisors and caregivers in the system</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenDialog()}>
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      <div className="content-card">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Patients</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'Supervisor' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'default' : 'outline'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.patients}</TableCell>
                <TableCell className="text-right">
                  <div className="action-buttons">
                    <button
                      className="btn-icon"
                      onClick={() => handleOpenDialog(user)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Update user information and role assignment' : 'Create a new user account and assign their role'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="dialog-form">
              <div className="form-field">
                <label className="field-label">Full Name</label>
                <input
                  type="text"
                  className="field-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">Email Address</label>
                <input
                  type="email"
                  className="field-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">Role</label>
                <select
                  className="field-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Caregiver">Caregiver</option>
                  <option value="Supervisor">Supervisor</option>
                </select>
              </div>
              <div className="form-field">
                <label className="field-label">Status</label>
                <select
                  className="field-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <button type="button" className="btn-secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
