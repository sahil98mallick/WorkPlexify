import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '../../AuthManager/AuthManager'
import { addwriters, allwriters, deletewriters } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import Swal from 'sweetalert2'
import { workingprogress } from '../../../CustomFunctions/WorkingProgress'

const Writers = () => {
  const [auth] = useAuth()
  console.log("Users id", auth?.user?._id);
  const [writers, setwriters] = useState([]);
  const fetchwritersdetails = async () => {
    try {
      if (auth && auth.user && auth.user._id) {
        const response = await allwriters(auth.user._id);
        setwriters(response?.data?.writerData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchwritersdetails()
  }, [auth?.user?._id])

  // Add Client Details
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    data.activestatus = "true"
    data.userID = auth?.user?._id
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('activestatus', data.activestatus);
      formData.append('userID', data.userID);
      formData.append('Image', data.Image[0]);
      const response = await addwriters(formData)
      const clinetdata = response?.data
      if (clinetdata) {
        //toast.success(clinetdata.message)
        Swal.fire({
          icon: 'success',
          title: clinetdata?.message,
          text: clinetdata?.message,
          timer: 2000,
          showConfirmButton: false,
        })
        fetchwritersdetails();
        setValue("name", "");
        setValue("phone", "");
        setValue("email", "");
        setValue("Image", "");
      } else {
        toast.error(clinetdata.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Delete Clients
  // const deletewriterrecord = async (id) => {
  //   try {
  //     const deletedata = await deletewriters(id);
  //     if (deletedata.data.success) {
  //       // toast.success(deletedata.data.message);
  //       Swal.fire({
  //         icon: 'success',
  //         title: deletedata?.data?.message,
  //         text: deletedata?.data?.message,
  //         timer: 2000,
  //         showConfirmButton: false,
  //       })
  //       fetchwritersdetails();
  //     } else {
  //       toast.error(deletedata.data.message)
  //     }
  //   } catch (error) {
  //     toast.error(error.message)
  //   } finally {
  //     fetchwritersdetails()
  //   }
  // }
  // Delete Clients
  const deletewriterrecord = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this writer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const deletedata = await deletewriters(id);
        if (deletedata.data.success) {
          Swal.fire({
            icon: 'success',
            title: deletedata?.data?.message,
            text: deletedata?.data?.message,
            timer: 2000,
            showConfirmButton: false,
          });
          fetchwritersdetails();
        } else {
          toast.error(deletedata.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      fetchwritersdetails();
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main">

        <div class="pagetitle">
          <h1>Writers Details</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/userdashboard'>Home</Link></li>
              <li class="breadcrumb-item active">Writers</li>
            </ol>
          </nav>
        </div>
        <section class="section dashboard">
          {/* Add Clients Details Conunts */}
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-xxl-8 col-md-12">
                  <div class="card info-card sales-card">
                    {/* Table Design */}
                    {
                      writers?.length > 0 ? (
                        <>
                          <h5 class="card-title" style={{ margin: "0 auto" }}>All Writer Details Table</h5>
                          <TableContainer>
                            <Table sx={{ minWidth: "100%" }} className='restable'>
                              <TableHead>
                                <TableRow>
                                  <TableCell align='center' style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Image</TableCell>
                                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Writer Name</TableCell>
                                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Email</TableCell>
                                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Phone</TableCell>
                                  <TableCell align="center" style={{ fontFamily: "Times", fontSize: "18px", fontWeight: "700" }}>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>

                                {
                                  writers?.map((item, key) => {
                                    return (
                                      <>
                                        <TableRow
                                          key={1}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                          <TableCell align='center'><img src={item?.Image} alt="ClientImage" style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></TableCell>
                                          <TableCell align="center">{item?.name}</TableCell>
                                          <TableCell align="center">{item?.email}</TableCell>
                                          <TableCell align="center">{item?.phone}</TableCell>
                                          <TableCell align="center">
                                            <button className='btn btn-primary' onClick={workingprogress}><i class="bi bi-pen-fill"></i></button>&nbsp;
                                            <button onClick={() => { deletewriterrecord(item?._id) }} className='btn btn-danger'><i class="bi bi-archive-fill"></i></button>
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
                          <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>No Writers Added in Your Account</h2>
                        </>
                      )
                    }

                  </div>
                </div>
                <div class="col-xxl-4 col-xl-12">
                  <div class="card info-card customers-card">
                    <div class="card-body">
                      <h5 class="card-title">Add Client Details</h5>
                      <form class="row g-3" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div class="col-md-12">
                          <label for="inputName5" class="form-label">Writer Name</label>
                          <input type="text" class="form-control" id="inputName5"
                            {...register("name", { required: true })} />
                        </div>
                        {errors.name?.type === "required" && <p>Name is Required</p>}
                        <div class="col-md-12">
                          <label for="inputName5" class="form-label">Writer Phone</label>
                          <input type="text" class="form-control" id="inputName5"
                            {...register("phone", { required: true })} />
                        </div>
                        {errors.phone?.type === "required" && <p>Phone is Required</p>}
                        <div class="col-md-12">
                          <label for="inputName5" class="form-label">Writer Email</label>
                          <input type="text" class="form-control" id="inputName5"
                            {...register("email", { required: true })} />
                        </div>
                        {errors.email?.type === "required" && <p>Email is Required</p>}
                        <div class="col-md-12">
                          <label for="inputName5" class="form-label">Select  Image</label>
                          <input type="file" class="form-control" id="inputName5"
                            {...register("Image", { required: true })} accept="image/*" />
                        </div>
                        {errors.Image?.type === "required" && <p>Image is Required</p>}
                        <div class="text-center">
                          <button type="submit" class="btn btn-warning">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default Writers