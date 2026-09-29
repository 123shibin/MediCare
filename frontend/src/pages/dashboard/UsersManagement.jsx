import { useState } from 'react';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/dialog';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/table';

import { Badge } from '../../components/badge';

// Import API mutation
import { useCreateStaff } from '../../hooks/authApi';


export default function UsersManagement() {

  // =====================================================
  // STATE
  // =====================================================

  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Users displayed in the table
  const [users, setUsers] = useState([]);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Caregiver',
    status: 'Active',
  });


  // =====================================================
  // CREATE STAFF API
  // =====================================================

  const createStaffMutation = useCreateStaff();


  // =====================================================
  // OPEN ADD / EDIT DIALOG
  // =====================================================

  const handleOpenDialog = (user = null) => {

    if (user) {

      // EDIT MODE
      setEditingUser(user);

      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });

    } else {

      // ADD MODE
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


  // =====================================================
  // FORM SUBMIT
  // =====================================================

  const handleSubmit = (e) => {

    e.preventDefault();

    // ============================================
    // EDIT USER
    // ============================================

    if (editingUser) {

      // Currently your backend only has POST /api/user-management.
      // So keep edit as local UI operation for now.

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...formData,
              }
            : user
        )
      );

      setIsDialogOpen(false);

      return;
    }


    // ============================================
    // CREATE NEW STAFF USER
    // ============================================

    const staffData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      status: formData.status,
    };


    console.log('Sending staff data:', staffData);


    createStaffMutation.mutate(staffData, {

      // ==========================================
      // SUCCESS
      // ==========================================

      onSuccess: (data) => {

        console.log('Backend response:', data);

        // Add newly created user to table
        const newUser = {
          id: Date.now(),

          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,

          // New staff starts with zero patients
          patients: 0,
        };

        setUsers((currentUsers) => [
          ...currentUsers,
          newUser,
        ]);


        // Close dialog
        setIsDialogOpen(false);


        // Reset form
        setFormData({
          name: '',
          email: '',
          role: 'Caregiver',
          status: 'Active',
        });


        // Optional development message
        console.log(
          'Staff account created successfully ✅'
        );

        console.log(
          'Temporary password:',
          data?.temporaryPassword
        );
      },


      // ==========================================
      // ERROR
      // ==========================================

      onError: (error) => {

        console.error(
          'Failed to create staff:',
          error
        );

        const message =
          error.response?.data?.message ||
          error.message ||
          'Failed to create staff account';

        alert(message);
      },
    });
  };


  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = (userId) => {

    if (
      window.confirm(
        'Are you sure you want to delete this user?'
      )
    ) {

      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.id !== userId
        )
      );
    }
  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredUsers = users.filter((user) => {

    const query = searchQuery.toLowerCase();

    return (
      user.name
        .toLowerCase()
        .includes(query) ||

      user.email
        .toLowerCase()
        .includes(query)
    );
  });


  // =====================================================
  // JSX
  // =====================================================

  return (

    <div className="page-container">

      {/* ================================================
          PAGE HEADER
      ================================================= */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Users Management
          </h1>

          <p className="page-description">
            Manage supervisors and caregivers in the system
          </p>

        </div>


        <button
          className="btn-primary"
          onClick={() => handleOpenDialog()}
          disabled={createStaffMutation.isPending}
        >

          <UserPlus size={20} />

          Add User

        </button>

      </div>


      {/* ================================================
          CONTENT
      ================================================= */}

      <div className="content-card">


        {/* SEARCH */}

        <div className="search-bar">

          <Search
            className="search-icon"
            size={20}
          />

          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="search-input"
          />

        </div>


        {/* ================================================
            TABLE
        ================================================= */}

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                Name
              </TableHead>

              <TableHead>
                Email
              </TableHead>

              <TableHead>
                Role
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead>
                Patients
              </TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>

            </TableRow>

          </TableHeader>


          <TableBody>

            {filteredUsers.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={6}
                  className="text-center"
                >
                  No users found
                </TableCell>

              </TableRow>

            ) : (

              filteredUsers.map((user) => (

                <TableRow key={user.id}>

                  <TableCell className="font-medium">
                    {user.name}
                  </TableCell>

                  <TableCell>
                    {user.email}
                  </TableCell>


                  <TableCell>

                    <Badge
                      variant={
                        user.role === 'Supervisor'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {user.role}
                    </Badge>

                  </TableCell>


                  <TableCell>

                    <Badge
                      variant={
                        user.status === 'Active'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      {user.status}
                    </Badge>

                  </TableCell>


                  <TableCell>
                    {user.patients}
                  </TableCell>


                  <TableCell className="text-right">

                    <div className="action-buttons">

                      {/* EDIT */}

                      <button
                        className="btn-icon"
                        onClick={() =>
                          handleOpenDialog(user)
                        }
                        title="Edit user"
                      >

                        <Edit size={16} />

                      </button>


                      {/* DELETE */}

                      <button
                        className="btn-icon btn-danger"
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        title="Delete user"
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </div>


      {/* ================================================
          ADD / EDIT DIALOG
      ================================================= */}

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >

        <DialogContent>

          <DialogHeader>

            <DialogTitle>

              {editingUser
                ? 'Edit User'
                : 'Add New User'}

            </DialogTitle>


            <DialogDescription>

              {editingUser
                ? 'Update user information and role assignment'
                : 'Create a new staff account. A temporary password will be generated automatically and sent to the email address.'}

            </DialogDescription>

          </DialogHeader>


          {/* ============================================
              FORM
          ============================================= */}

          <form onSubmit={handleSubmit}>

            <div className="dialog-form">


              {/* NAME */}

              <div className="form-field">

                <label className="field-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="field-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="form-field">

                <label className="field-label">
                  Email Address
                </label>

                <input
                  type="email"
                  className="field-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  required
                />

              </div>


              {/* ROLE */}

              <div className="form-field">

                <label className="field-label">
                  Role
                </label>

                <select
                  className="field-input"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                >

                  <option value="Caregiver">
                    Caregiver
                  </option>

                  <option value="Supervisor">
                    Supervisor
                  </option>

                </select>

              </div>


              {/* STATUS */}

              <div className="form-field">

                <label className="field-label">
                  Status
                </label>

                <select
                  className="field-input"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>


            {/* ==========================================
                FOOTER
            =========================================== */}

            <DialogFooter>

              <button
                type="button"
                className="btn-secondary"
                onClick={() =>
                  setIsDialogOpen(false)
                }
                disabled={createStaffMutation.isPending}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="btn-primary"
                disabled={createStaffMutation.isPending}
              >

                {createStaffMutation.isPending
                  ? 'Creating...'
                  : editingUser
                    ? 'Update User'
                    : 'Create User'}

              </button>

            </DialogFooter>

          </form>

        </DialogContent>

      </Dialog>

    </div>
  );
}