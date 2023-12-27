import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '../../AuthManager/AuthManager'
import { addjobs, allclients, allusers } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import Swal from 'sweetalert2'

const AddTaskDetails = () => {
  // Client Details
  const [auth,] = useAuth()
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
  // 
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const navigate = useNavigate()
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
        navigate("/viewtaskdetails")
        console.log(response);
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
              <li class="breadcrumb-item active">Jobs</li>
            </ol>
          </nav>
        </div>
        <br />
        <center><h1 style={{ color: "black", fontFamily: "Times" }}>Add Job Details</h1></center>
        <section class="section dashboard">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Fill All the Details</h5>
              <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="floatingName" placeholder="Job Id"
                      {...register("jobid", { required: true })} />
                    <label for="floatingName">Job Id</label>
                  </div>
                </div>
                {errors.jobid?.type === "required" && <p>Job Id is Required</p>}
                <div class="col-md-3">
                  <div class="form-floating">
                    <input type="date" class="form-control" placeholder="Start End"
                      {...register("startdate", { required: true })} />
                    <label for="floatingEmail">Start Date</label>
                  </div>
                  {errors.startdate?.type === "required" && <p>Select Start Date</p>}
                </div>
                <div class="col-md-3">
                  <div class="form-floating">
                    <input type="date" class="form-control" placeholder="Start End"
                      {...register("enddate", { required: true })} />
                    <label for="floatingEmail">End Date</label>
                    {errors.enddate?.type === "required" && <p>Select End Date</p>}
                  </div>
                </div>
                <div class="col-md-3">
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
                <div class="col-md-3">
                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="floatingCity" placeholder="City"
                        {...register("actualprice", { required: true })} />
                      <label for="floatingCity">Total Price</label>
                      {errors.actualprice?.type === "required" && <p>Total price is Required</p>}
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
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
                <div class="col-md-3">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="floatingZip" placeholder="Writer Price"
                      {...register("writeprice", { required: true })} />
                    <label for="floatingZip">Writer Price</label>
                    {errors.writeprice?.type === "required" && <p>Writer Price is Required</p>}
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-floating">
                    <textarea class="form-control" placeholder="Address" id="floatingTextarea" style={{ height: "100px" }}
                      {...register("jobdetails", { required: true })} />
                    <label for="floatingTextarea">Job Details</label>
                    {errors.jobdetails?.type === "required" && <p>Job Details is Required</p>}
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section >

      </main >
    </>
  )
}

export default AddTaskDetails