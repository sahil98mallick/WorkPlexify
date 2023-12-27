import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../AuthManager/AuthManager'
import { allclients, allinvoices, deleteinvoices } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'

const ViewInvoice = () => {
    const [auth,] = useAuth()
    console.log("Users id", auth?.user?._id);
    const [invoices, setinvoices] = useState([]);
    const fetchinvoicesdetails = async () => {
        try {
            if (auth && auth.user && auth.user._id) {
                const response = await allinvoices(auth.user._id);
                setinvoices(response?.data?.invoiceData.sort((a, b) => new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime()));
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchinvoicesdetails()
    }, [auth?.user?._id])

    // Delete Invoices
    const deleteinvoicerecord = async (id) => {
        try {
            const deletedata = await deleteinvoices(id);
            if (deletedata.data.success) {
                toast.success(deletedata.data.message)
                fetchinvoicesdetails();
            } else {
                toast.error(deletedata.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            fetchinvoicesdetails()
        }
    }
    console.log(invoices);

    // Client Details APi calling
    const [clients, setclients] = useState([]);

    const fetchclientsdetails = async () => {
        try {
            if (auth && auth.user && auth.user._id) {
                const response = await allclients(auth.user._id);
                setclients(response?.data?.clientData);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchclientsdetails()
    }, [auth?.user?._id])

    const getClientName = (clientId) => {
        const client = clients.find((client) => client?.client === clientId);
        return client ? client?.name : 'Unknown Client';
    };

    const getUserName = (userid) => {

    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Invoice Management</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/userdashboard'>Home</Link></li>
                            <li class="breadcrumb-item active">Invoice</li>
                        </ol>
                    </nav>
                </div>
                <section class="section dashboard">
                    <div class="card">
                        {
                            invoices?.length > 0 ? (
                                <>
                                    <center><h2 style={{ color: "black", fontFamily: "Times" }}>View your Invoice Here</h2></center>
                                    <div class="card-body">
                                        <h5 class="card-title">All Your Invoice Details</h5>
                                        <TableContainer>
                                            <Table sx={{ minWidth: "100%" }} className='restable'>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Client Name</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Invoice Date</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Total Amount</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>invoiceStatus</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Manage Task</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <>
                                                        {
                                                            invoices?.map((item, key) => {
                                                                return (
                                                                    <>
                                                                        <TableRow
                                                                            key={key + 1}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >

                                                                            <TableCell align='center'>{getClientName(item?.clientname)}</TableCell>
                                                                            <TableCell align='center'>{item?.invoiceDate?.slice(0, 10)}</TableCell>
                                                                            <TableCell align='center'>{item?.totalAmount}</TableCell>
                                                                            <TableCell align='center'>{item?.invoiceStatus}</TableCell>
                                                                            <TableCell align='center'>
                                                                                <div style={{ margin: "0 auto", width: "100px", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: "5px" }}>
                                                                                    <Link to={`/printinvoicedetails/${item?._id}`} className='btn btn-primary'>
                                                                                        <i class="bi bi-eye-fill"></i>
                                                                                    </Link>
                                                                                    <button className='btn btn-danger' onClick={() => { deleteinvoicerecord(item?._id) }}>
                                                                                        <i class="bi bi-archive-fill"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>No Invoice Generated From your Accounts</h2>
                                </>
                            )
                        }
                    </div>
                </section >

            </main >
        </>
    )
}

export default ViewInvoice