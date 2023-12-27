import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { toast } from 'react-toastify'
import { useAuth } from '../../AuthManager/AuthManager'
import { addjobs, allclients, alljobs, allusers, updatejobactivestatus } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { workingprogress } from '../../../CustomFunctions/WorkingProgress'


const SearchJobDetails = () => {
    const { searchQuery } = useParams();
    const [auth] = useAuth();
    const [task, settask] = useState([]);
    const fetchtaskdetails = async () => {
        try {
            if (auth && auth?.user && auth?.user?._id) {
                const response = await alljobs(auth?.user?._id);
                settask(response.data.jobData)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchtaskdetails()
    }, [auth?.user?._id])

    // Clients Details
    const [clients, setclients] = useState([]);
    const fetchclientsdetails = async () => {
        try {
            if (auth && auth.user && auth.user._id) {
                const response = await allclients(auth?.user?._id);
                setclients(response?.data?.clientData);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchclientsdetails()
    }, [auth?.user?._id])

    // All Writer Details
    const [writer, setwriter] = useState([]);
    const fetchwriter = async () => {
        try {
            if (auth && auth?.user && auth?.user?._id) {
                const response = await allusers(auth?.user?._id);
                setwriter(response.data.writerData)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchwriter()
    }, [auth?.user?._id])

    // Fetch the Client Name here
    const getClientName = (clientId) => {
        const client = clients.find((c) => c._id === clientId);
        return client ? client.name : 'Unknown Client';
    };
    const getWriterName = (userId) => {
        const writerData = writer.find((user) => user._id === userId);
        return writerData ? writerData.name : 'Unknown Writer';
    };

    // Function to update employee active status
    const handleStatusChange = async (taskiId, newStatus) => {
        try {
            const data = { jobstatus: newStatus };

            const response = await updatejobactivestatus(taskiId, data);
            if (response.status === 200) {
                toast.success(response.data.message)
                const updatedtask = task.map(item => {
                    if (item._id === taskiId) {
                        return { ...item, jobstatus: newStatus };
                    }
                    return item;
                });
                settask(updatedtask);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredjobs = task.filter((task) => {
        const searchQueryLower = searchQuery.toLowerCase();
        const titleLower = task.title?.toLowerCase() || '';
        const actualprice = task.actualprice?.toLowerCase() || '';
        const writerprice = task.writeprice?.toLowerCase() || '';
        const jobdetails = task.jobdetails?.toLowerCase() || '';
        const jobid = task.jobid?.toLowerCase() || '';

        return (
            titleLower.includes(searchQueryLower) ||
            actualprice.includes(searchQueryLower) ||
            writerprice.includes(searchQueryLower) ||
            jobdetails.includes(searchQueryLower) ||
            jobid.includes(searchQueryLower)
        );
    });

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Job Search Records</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link>Home</Link></li>
                            <li class="breadcrumb-item active">Job Search Records</li>
                        </ol>
                    </nav>
                </div>
                {
                    auth?.user?.userType === "Admin" ? (
                        <>
                            <section class="section dashboard">
                                <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>Search Functionality is not Avialable for Admin</h2>
                            </section>
                        </>
                    ) : (
                        <>
                            <section class="section dashboard">
                                {
                                    filteredjobs?.length > 0 ? (
                                        <>
                                            <TableContainer>
                                                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align='center' style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Job ID</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Client Name</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Start Date</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>End Date</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Writer</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Job Status</TableCell>
                                                            <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Manage Task</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            filteredjobs?.map((item, key) => {
                                                                return (
                                                                    <>
                                                                        <TableRow
                                                                            key={1}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell align='center'><Link to={`/singletaskdetails/${item?._id}`}>{item.jobid}</Link></TableCell>
                                                                            <TableCell align="center">{getClientName(item.clientname)}</TableCell>
                                                                            <TableCell align="center">{item.startdate?.slice(0, 10)}</TableCell>
                                                                            <TableCell align="center">{item.enddate?.slice(0, 10)}</TableCell>
                                                                            <TableCell align="center">{getWriterName(item.writername)}</TableCell>
                                                                            <TableCell align="center">
                                                                                <span
                                                                                    style={{
                                                                                        color: item.jobstatus ? 'green' : 'red',
                                                                                        fontWeight: 'bold',
                                                                                    }}
                                                                                >
                                                                                    {item.jobstatus ? "Onging" : "Completed"}
                                                                                </span>
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: "5px" }}>
                                                                                    <Button variant='conatined' size='small'
                                                                                        onClick={() => handleStatusChange(item._id, !item.jobstatus)}
                                                                                        style={{
                                                                                            background: item.jobstatus ? 'red' : 'green',
                                                                                            color: "white", fontFamily: "Times"
                                                                                        }} >
                                                                                        {item.jobstatus ? "Finished" : "Start Again"}
                                                                                    </Button>
                                                                                    <Link to={`/singletaskdetails/${item?._id}`} className='btn btn-primary' size='small' variant='contained'><i class="bi bi-eye-fill"></i></Link>
                                                                                    <button className='btn btn-success' size='small' variant='contained' onClick={workingprogress}><i class="bi bi-pen-fill"></i></button>
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
                                        </>
                                    ) : (
                                        <>
                                            <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>No Tasks Details Added in Your Account</h2>
                                        </>
                                    )
                                }
                            </section>
                        </>
                    )
                }

            </main>
        </>
    )
}

export default SearchJobDetails

