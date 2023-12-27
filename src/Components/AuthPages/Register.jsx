import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { registeruser } from '../../APIManager/ApiManager';
import { CircularProgress } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false)
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    data.userType = "User"
    data.activestatus = true;
    setisloading(true)
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('userType', data.userType);
      formData.append('activestatus', data.activestatus);
      formData.append('Image', data.Image[0]);
      const response = await registeruser(formData)
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setisloading(false)
    }
  }
  return (
    <>
      <main>
        <div class="container">
          <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-5">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="pt-2 pb-2">
                        <div class="d-flex justify-content-center py-2">
                          <a class="logo d-flex align-items-center w-auto">
                            <img src="assets/img/academiacrafterlogo2.png" />
                            <span class="d-none d-lg-block">Work Plexify</span>
                          </a>
                        </div>
                        <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                        <p class="text-center small">Enter your personal details to create account</p>
                      </div>

                      <form class="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div class="col-12">
                          <label for="yourName" class="form-label">Your Name</label>
                          <input type="text" class="form-control"
                            {...register("name", { required: true })} />
                        </div>
                        {errors.name?.type === "required" && <p>Name is Required</p>}

                        <div class="col-12">
                          <label for="yourEmail" class="form-label">Your Email</label>
                          <input type="email" class="form-control"
                            {...register("email", { required: true })} />
                        </div>
                        {errors.email?.type === "required" && <p>Email is Required</p>}
                        <div class="col-12">
                          <label for="yourUsername" class="form-label">Phone</label>
                          <div class="input-group has-validation">
                            <input type="number" class="form-control"
                              {...register("phone", { required: true })} />
                          </div>
                          {errors.phone?.type === "required" && <p>Phone is Required</p>}
                        </div>

                        <div class="col-12">
                          <label for="yourPassword" class="form-label">Password</label>
                          <input type="password" class="form-control"
                            {...register("password", { required: true })} />
                        </div>
                        {errors.password?.type === "required" && <p>Password is Required</p>}
                        <div class="col-12">
                          <label for="yourPassword" class="form-label">Profile Image</label>
                          <input type="file" class="form-control"
                            {...register("Image", { required: true })} accept="image/*" />
                        </div>
                        {errors.Image?.type === "required" && <p>Image is Required</p>}
                        <div class="col-12">
                          <button class="btn btn-primary w-100" type="submit">{isloading ? (<><CircularProgress size={20} style={{ color: "black" }} /></>) : 'Create Account'}</button>
                        </div>
                        <div class="col-12">
                          <p class="small mb-0">Already have an account? <Link to='/'>Log in</Link></p>
                        </div>
                      </form>

                    </div>
                  </div>
                  <div class="credits">
                    Designed by <a href="#">Sahil Mallick</a>
                  </div>

                </div>
              </div>
            </div>

          </section>

        </div>
      </main>
    </>
  )
}

export default Register