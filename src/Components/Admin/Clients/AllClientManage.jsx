import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminallclients, deleteclients } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'

const AllClientManage = () => {
  const [clients, setclients] = useState([]);
  const fetchclients = async () => {
    try {
      const response = await adminallclients();
      setclients(response?.data?.clientData)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchclients()
  }, [])

  // Delete Clients
  const deleteclientrecord = async (id) => {
    try {
      const deletedata = await deleteclients(id);
      if (deletedata.data.success) {
        toast.success(deletedata.data.message)
        fetchclients();
      } else {
        toast.error(deletedata.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      fetchclients()
    }
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Client Details</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/Admindashboard'>Home</Link></li>
              <li class="breadcrumb-item active">Clients</li>
            </ol>
          </nav>
        </div>
        <section class="section dashboard">

          {/* Table Design */}
          <h5 class="card-title" style={{ margin: "0 auto" }}>All Client Details Table</h5>
          <div>
            <table className='restable'>
              <thead>
                <tr>
                  <th align='center' style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Image</th>
                  <th align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Client Name</th>
                  <th align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>User Name</th>
                  <th align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Email</th>
                  <th align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Phone</th>
                  <th align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Status</th>
                  <th align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  clients?.map((item, key) => {
                    return (
                      <>
                        <tr
                          key={1}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                          <td align='center'><img src={item?.Image} alt="ClientImage" style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></td>
                          <td align="center">{item?.name}</td>
                          <td align="center">{item?.userID}</td>
                          <td align="center">{item?.email}</td>
                          <td align="center">{item?.phone}</td>
                          <td align="center">{item?.activestatus ? ("Active") : ("In-Active")}</td>
                          <td align="center">
                            <button onClick={() => { deleteclientrecord(item?._id) }} className='btn btn-danger'><i class="bi bi-archive-fill"></i></button>
                          </td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </section>
      </main>
    </>
  )
}

export default AllClientManage