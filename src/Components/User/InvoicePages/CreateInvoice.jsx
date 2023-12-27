import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '../../AuthManager/AuthManager'
import { allclients, createinvoices } from '../../../APIManager/ApiManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import Swal from 'sweetalert2'

const CreateInvoice = () => {
  const [auth,] = useAuth()
  console.log("Users id", auth?.user?._id);
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

  // Create Invoice Function here
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  const onSubmit = async (data) => {
    console.log("Users id", auth?.user?._id);
    data.userId = auth?.user?._id
    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);
    console.log(data);
    try {
      const response = await createinvoices(data)
      if (response.data.success) {
        // toast.success(response.data.message)
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        })
        navigate('/viewinvoice')
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
          <h1>Invoice Management</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/userdashboard'>Home</Link></li>
              <li class="breadcrumb-item active">Invoice</li>
            </ol>
          </nav>
        </div>
        <center><h2 style={{ color: "black", fontFamily: "Times" }}>Create your Invoice Here</h2></center>
        <section class="section dashboard">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Fill All the Details</h5>
              <form class="row g-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-4">
                  <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="State"
                      {...register("clientName", { required: true })}>
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
                  </div>
                  {errors.clientName?.type === "required" && <p>Client Name is Required</p>}
                </div>
                <div class="col-md-4">
                  <div class="form-floating">
                    <input type="date" class="form-control" placeholder="Start Date"
                      {...register("startDate", { required: true })} />
                    <label for="floatingEmail">Invoice Start Date</label>
                  </div>
                  {errors.startDate?.type === "required" && <p>Start Date is Required</p>}
                </div>
                <div class="col-md-4">
                  <div class="form-floating">
                    <input type="date" class="form-control" placeholder="End Date"
                      {...register("endDate", { required: true })} />
                    <label for="floatingEmail">Invoice End Date</label>
                  </div>
                  {errors.endDate?.type === "required" && <p>End Date is Required</p>}
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

export default CreateInvoice