import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { toast } from 'react-toastify'
import { adminallusers, adminallusersdelete, updateuseractivestatus } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'

const AllUserDetailsManage = () => {
  const [clients, setclients] = useState([]);
  const fetchregisterusers = async () => {
    try {
      const response = await adminallusers();
      setclients(response?.data?.usersData)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchregisterusers()
  }, [])
  // Delete Invoices
  const deleteregusers = async (id) => {
    try {
      const deletedata = await adminallusersdelete(id);
      if (deletedata?.data?.success) {
        toast.success(deletedata?.data?.message)
        fetchregisterusers();
      } else {
        toast.error(deletedata?.data?.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      fetchregisterusers()
    }
  }
  // Function to update employee active status
  const handleStatusChange = async (taskiId, newStatus) => {
    try {
      const data = { activestatus: newStatus };

      const response = await updateuseractivestatus(taskiId, data);
      if (response.status === 200) {
        toast.success(response.data.message)
        const updatedtask = clients.map(item => {
          if (item._id === taskiId) {
            return { ...item, activestatus: newStatus };
          }
          return item;
        });
        setclients(updatedtask);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Users Details</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/Admindashboard'>Home</Link></li>
              <li class="breadcrumb-item active">Users</li>
            </ol>
          </nav>
        </div>
        <section class="section dashboard">
          {/* Table Design */}
          <h5 class="card-title" style={{ margin: "0 auto" }}>All Client Details Table</h5>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} className='restable'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Image</TableCell>
                  <TableCell align='center' style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Type</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Name</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Email</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Phone</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Account Status</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  clients?.map((item, key) => {
                    return (
                      <>
                        <TableRow
                          key={1}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                          <TableCell align='center'><img src={item?.Image} alt="Imageset" style={{ width: "50px", height: "50px" }} /></TableCell>
                          <TableCell align="center">{item?.userType}</TableCell>
                          <TableCell align="center">{item?.name}</TableCell>
                          <TableCell align="center">{item?.email}</TableCell>
                          <TableCell align="center">{item?.phone}</TableCell>
                          <TableCell align="center">
                            <span
                              style={{
                                color: item.activestatus ? 'green' : 'red',
                                fontWeight: 'bold',
                              }}
                            >
                              {item.activestatus ? "Active" : "In-Active"}
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: "5px" }}>
                              <Button variant='conatined' size='small'
                                onClick={() => handleStatusChange(item._id, !item.activestatus)}
                                style={{
                                  background: item.activestatus ? 'red' : 'green',
                                  color: "white", fontFamily: "Times"
                                }} >
                                {item.activestatus ? "In-Active" : "Active"}
                              </Button>
                              <button onClick={() => { deleteregusers(item?._id) }} className='btn btn-danger'><i class="bi bi-archive-fill"></i></button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>

        </section>
      </main>
    </>
  )
}

export default AllUserDetailsManage