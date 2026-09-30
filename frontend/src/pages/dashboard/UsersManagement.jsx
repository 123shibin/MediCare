import { useState } from "react";

import {
  Search,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";

import { Badge } from "../../components/badge";

import {
  useStaffUsers,
  useCreateStaff,
} from "../../api/userManagementApi";

import { useQueryClient } from "@tanstack/react-query";


export default function UsersManagement() {

  // ======================================================
  // LOCAL UI STATE
  // ======================================================

  const [searchQuery, setSearchQuery] =
    useState("");

  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState(null);


  const [formData, setFormData] = useState({

    name: "",

    email: "",

    role: "Caregiver",

    status: "Active",

  });


  // ======================================================
  // REACT QUERY
  // ======================================================

  const queryClient = useQueryClient();


  // GET USERS

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useStaffUsers();


  // CREATE USER

  const createStaffMutation =
    useCreateStaff();


  // ======================================================
  // OPEN DIALOG
  // ======================================================

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

        name: "",

        email: "",

        role: "Caregiver",

        status: "Active",

      });
    }


    setIsDialogOpen(true);
  };


  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = (e) => {

    e.preventDefault();


    // --------------------------------------------------
    // EDIT
    // --------------------------------------------------

    if (editingUser) {

      // We will connect PUT API here later.

      console.log(
        "Edit user:",
        editingUser.id
      );

      return;
    }


    // --------------------------------------------------
    // CREATE
    // --------------------------------------------------

    const staffData = {

      name: formData.name,

      email: formData.email,

      role: formData.role,

      status: formData.status,

    };


    createStaffMutation.mutate(
      staffData,

      {

        // ============================================
        // SUCCESS
        // ============================================

        onSuccess: async (data) => {

          console.log(
            "Staff created successfully:",
            data
          );


          // ==========================================
          // REFRESH USERS FROM DATABASE
          // ==========================================

          await queryClient.invalidateQueries({

            queryKey: ["staffUsers"],

          });


          // ==========================================
          // CLOSE DIALOG
          // ==========================================

          setIsDialogOpen(false);


          // ==========================================
          // RESET FORM
          // ==========================================

          setFormData({

            name: "",

            email: "",

            role: "Caregiver",

            status: "Active",

          });


          // DEVELOPMENT ONLY

          if (data?.temporaryPassword) {

            console.log(
              "Temporary password:",
              data.temporaryPassword
            );
          }
        },


        // ============================================
        // ERROR
        // ============================================

        onError: (error) => {

          const message =
            error.response?.data?.message ||
            error.message ||
            "Failed to create staff account";


          alert(message);
        },

      }
    );
  };


  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = (userId) => {

    if (
      window.confirm(
        "Are you sure you want to delete this user?"
      )
    ) {

      // DELETE API will be connected later.

      console.log(
        "Delete user:",
        userId
      );
    }
  };


  // ======================================================
  // FILTER
  // ======================================================

  const filteredUsers =
    users.filter((user) => {

      const search =
        searchQuery.toLowerCase();


      return (

        user.name
          ?.toLowerCase()
          .includes(search)

        ||

        user.email
          ?.toLowerCase()
          .includes(search)

      );
    });


  // ======================================================
  // LOADING
  // ======================================================

  if (isLoading) {

    return (

      <div className="page-container">

        <div className="content-card">

          <p>
            Loading users...
          </p>

        </div>

      </div>
    );
  }


  // ======================================================
  // ERROR
  // ======================================================

  if (isError) {

    return (

      <div className="page-container">

        <div className="content-card">

          <p>
            Failed to load users.
          </p>

          <p>
            {error?.response?.data?.message ||
             error?.message}
          </p>

        </div>

      </div>
    );
  }


  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="page-container">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Users Management
          </h1>

          <p className="page-description">
            Manage supervisors and caregivers
            in the system
          </p>

        </div>


        <button
          className="btn-primary"
          onClick={() =>
            handleOpenDialog()
          }
        >

          <UserPlus size={20} />

          Add User

        </button>

      </div>



      {/* =================================================
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

            placeholder=
              "Search users by name or email..."

            value={searchQuery}

            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }

            className="search-input"

          />

        </div>



        {/* =================================================
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


            {/* ============================================
                NO USERS
            ============================================ */}

            {filteredUsers.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={6}
                  className="text-center"
                >

                  {searchQuery
                    ? "No users found"
                    : "No staff users created yet"
                  }

                </TableCell>

              </TableRow>


            ) : (


              /* =========================================
                 USERS
              ========================================= */

              filteredUsers.map((user) => (

                <TableRow
                  key={user.id}
                >


                  <TableCell
                    className="font-medium"
                  >

                    {user.name}

                  </TableCell>


                  <TableCell>

                    {user.email}

                  </TableCell>


                  <TableCell>

                    <Badge
                      variant={
                        user.role === "Supervisor"
                          ? "default"
                          : "secondary"
                      }
                    >

                      {user.role}

                    </Badge>

                  </TableCell>


                  <TableCell>

                    <Badge
                      variant={
                        user.status === "Active"
                          ? "default"
                          : "outline"
                      }
                    >

                      {user.status}

                    </Badge>

                  </TableCell>


                  <TableCell>

                    {user.patients ?? 0}

                  </TableCell>


                  <TableCell
                    className="text-right"
                  >

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

                        className=
                          "btn-icon btn-danger"

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



      {/* =================================================
          CREATE / EDIT DIALOG
      ================================================= */}

      <Dialog
        open={isDialogOpen}
        onOpenChange={
          setIsDialogOpen
        }
      >

        <DialogContent>

          <DialogHeader>

            <DialogTitle>

              {editingUser
                ? "Edit User"
                : "Add New User"
              }

            </DialogTitle>


            <DialogDescription>

              {editingUser

                ? "Update user information and role assignment"

                : "Create a new staff account. A temporary password will be generated automatically and sent to the email address."

              }

            </DialogDescription>

          </DialogHeader>



          <form
            onSubmit={handleSubmit}
          >

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



            <DialogFooter>


              <button

                type="button"

                className="btn-secondary"

                onClick={() =>
                  setIsDialogOpen(false)
                }

              >

                Cancel

              </button>


              <button

                type="submit"

                className="btn-primary"

                disabled={
                  createStaffMutation.isPending
                }

              >

                {createStaffMutation.isPending

                  ? "Creating..."

                  : editingUser
                    ? "Update User"
                    : "Create User"

                }

              </button>


            </DialogFooter>

          </form>

        </DialogContent>

      </Dialog>

    </div>
  );
}