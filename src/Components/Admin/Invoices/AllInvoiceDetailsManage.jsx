import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { toast } from 'react-toastify'
import { adminallinvoices, deleteinvoices } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'

const AllInvoiceDetailsManage = () => {
  const [invoices, setinvoices] = useState([]);
  const fetchinvoices = async () => {
    try {
      const response = await adminallinvoices();
      setinvoices(response?.data?.invoiceData)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchinvoices()
  }, [])

  // Delete Invoices
  const deleteinvoicerecord = async (id) => {
    try {
      const deletedata = await deleteinvoices(id);
      if (deletedata.data.success) {
        toast.success(deletedata.data.message)
        fetchinvoices();
      } else {
        toast.error(deletedata.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      fetchinvoices()
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} className='restable'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Invoice No</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Invoice Date</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>User Name</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Total Amounts</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Status</TableCell>
                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  invoices?.map((item, key) => {
                    return (
                      <>
                        <TableRow
                          key={1}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                          <TableCell align='center'>{item?.invoiceID}</TableCell>
                          <TableCell align="center">{item?.invoiceDate?.slice(0, 10)}</TableCell>
                          <TableCell align="center">{item?.userId}</TableCell>
                          <TableCell align="center">{item?.totalAmount}</TableCell>
                          <TableCell align="center">{item?.invoiceStatus}</TableCell>
                          <TableCell align="center">
                            <button onClick={() => { deleteinvoicerecord(item?._id) }} className='btn btn-danger'><i class="bi bi-archive-fill"></i></button>
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

export default AllInvoiceDetailsManage