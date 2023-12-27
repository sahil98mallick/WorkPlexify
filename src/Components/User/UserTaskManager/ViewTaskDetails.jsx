import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { toast } from 'react-toastify'
import { useAuth } from '../../AuthManager/AuthManager'
import { addjobs, allclients, alljobs, allusers, deletetask, updatejobactivestatus } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import Swal from 'sweetalert2'
import { workingprogress } from '../../../CustomFunctions/WorkingProgress'
import { useForm } from 'react-hook-form'


const ViewTaskDetails = () => {
    const [auth] = useAuth();
    const [task, settask] = useState([]);
    const fetchtaskdetails = async () => {
        try {
            if (auth && auth?.user && auth?.user?._id) {
                const response = await alljobs(auth?.user?._id);
                settask(response?.data?.jobData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
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
                setwriter(response?.data?.writerData)
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

    // Function to update task active status
    const handleStatusChange = async (taskiId, newStatus) => {
        try {
            const data = { jobstatus: newStatus };

            const response = await updatejobactivestatus(taskiId, data);
            if (response.status === 200) {
                toast.success(response?.data?.message)
                const updatedtask = task.map(item => {
                    if (item._id === taskiId) {
                        return { ...item, jobstatus: newStatus };
                    }
                    return item;
                });
                settask(updatedtask);
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Delete task  Details Function
    const deletetaskdetails = async (id) => {
        try {
            const deletedata = await deletetask(id);
            if (deletedata?.data?.success) {
                // toast.success(deletedata.data.message)
                Swal.fire({
                    icon: 'success',
                    title: deletedata?.data?.message,
                    text: deletedata?.data?.message,
                    timer: 2000,
                    showConfirmButton: false,
                })
                fetchtaskdetails()
            } else {
                // toast.error(deletedata.data.message)
                Swal.fire({
                    icon: 'error',
                    title: deletedata.data.message,
                    text: deletedata.data.message,
                    timer: 2000,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            // toast.error(error.message)
            Swal.fire({
                icon: 'warning',
                title: error.message,
                text: error.message,
                timer: 2000,
                showConfirmButton: false,
            })
        }
    }

    // Add New Jobs
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = async (data) => {
        data.userID = auth?.user?._id
        data.jobstatus = "true"
        console.log(data);
        try {
            const response = await addjobs(data)
            if (response.data.success) {
                // toast.success(response.data.message)
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    text: response.data.message,
                    timer: 2000,
                    showConfirmButton: false,
                })
                // console.log(response);
                fetchtaskdetails()
            } else {
                // toast.error(response.data.message)
                Swal.fire({
                    icon: 'error',
                    title: response.data.message,
                    text: response.data.message,
                    timer: 2000,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            // toast.error(error.message)
            Swal.fire({
                icon: 'warning',
                title: error.message,
                text: error.message,
                timer: 2000,
                showConfirmButton: false,
            })
        }
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Job Records</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/userdashboard'>Home</Link></li>
                            <li class="breadcrumb-item active">Job</li>
                        </ol>
                    </nav>
                </div>
                <section class="section dashboard">
                    <div>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-secondary' style={{ marginLeft: "10px" }}>Add New</button>
                    </div><br />
                    {
                        task?.length > 0 ? (
                            <>
                                <TableContainer>
                                    <Table sx={{ minWidth: "100%" }} className='restable'>
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
                                                task?.map((item, key) => {
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
                                                                        <button onClick={() => { deletetaskdetails(item._id) }} className='btn btn-danger' size='small' variant='contained'><i class="bi bi-archive-fill"></i></button>
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

            </main>

            {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered custom-modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Fill All The Job Details Properly</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div class="col-md-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="floatingName" placeholder="Job Id"
                                            {...register("jobid", { required: true })} />
                                        <label for="floatingName">Job Id</label>
                                    </div>
                                </div>
                                {errors.jobid?.type === "required" && <p>Job Id is Required</p>}
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="date" class="form-control" placeholder="Start End"
                                            {...register("startdate", { required: true })} />
                                        <label for="floatingEmail">Start Date</label>
                                    </div>
                                    {errors.startdate?.type === "required" && <p>Select Start Date</p>}
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="date" class="form-control" placeholder="Start End"
                                            {...register("enddate", { required: true })} />
                                        <label for="floatingEmail">End Date</label>
                                        {errors.enddate?.type === "required" && <p>Select End Date</p>}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <select class="form-select" id="floatingSelect" aria-label="State"
                                            {...register("clientname", { required: true })}>
                                            <option selected>Select Client Name</option>
                                            {
                                                clients?.map((item, key) => {
                                                    return (
                                                        <>
                                                            <option value={item?._id}>{item?.name}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label for="floatingSelect">Client Name</label>
                                        {errors.clientname?.type === "required" && <p>Client Name is Required</p>}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <select class="form-select" id="floatingSelect" aria-label="State"
                                            {...register("writername", { required: true })}>
                                            <option selected>Select Writer Name</option>
                                            {
                                                writer?.map((item, key) => {
                                                    return (
                                                        <>
                                                            <option value={item?._id}>{item?.name}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label for="floatingSelect">Writer Name</label>
                                        {errors.writername?.type === "required" && <p>Writer Name is Required</p>}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="col-md-12">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="floatingCity" placeholder="City"
                                                {...register("actualprice", { required: true })} />
                                            <label for="floatingCity">Actual Price</label>
                                            {errors.actualprice?.type === "required" && <p>Actual price is Required</p>}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="floatingZip" placeholder="Writer Price"
                                            {...register("writeprice", { required: true })} />
                                        <label for="floatingZip">Writer Price</label>
                                        {errors.writeprice?.type === "required" && <p>Writer Price is Required</p>}
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-floating">
                                        <textarea class="form-control" placeholder="Address" id="floatingTextarea" style={{ height: "200px" }}
                                            {...register("jobdetails", { required: true })} />
                                        <label for="floatingTextarea">Job Details</label>
                                        {errors.jobdetails?.type === "required" && <p>Job Details is Required</p>}
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Exit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTaskDetails

