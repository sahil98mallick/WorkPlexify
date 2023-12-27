import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthManager/AuthManager';
import { resetpasswordfunction } from '../../APIManager/ApiManager';

const ResetPassword = () => {
    const [auth, setauth] = useAuth();
    const [isLoading, setisloading] = useState(false)
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        setisloading(true);
        try {
            const response = await resetpasswordfunction(data);
            // console.log(response);
            const resetpassworddt = response?.data;
            if (resetpassworddt?.success) {
                toast.success(resetpassworddt.message)
                navigate('/')
            } else {
                toast.error(resetpassworddt.message)
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setisloading(false);
        }
    };
    return (
        <>
            <main>
                <div class="container">

                    <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div class="d-flex justify-content-center py-4">
                                        <a class="logo d-flex align-items-center w-auto">
                                            <img src="assets/img/academiacrafterlogo2.png" alt="Lgo" />
                                            <span class="d-none d-lg-block">Work Plexify</span>
                                        </a>
                                    </div>

                                    <div class="card mb-3">

                                        <div class="card-body">

                                            <div class="pt-4 pb-2">
                                                <h5 class="card-title text-center pb-0 fs-4">Reset Your Passwprd Here</h5>
                                                <p class="text-center small">Enter your Email & password to login</p>
                                            </div>

                                            <form class="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                                                <div class="col-12">
                                                    <label for="yourUsername" class="form-label">Email Address</label>
                                                    <div class="input-group has-validation">
                                                        <input type="text" class="form-control" {...register("email", { required: true })} />
                                                    </div>
                                                    {errors.email?.type === "required" && <p>Email is Required</p>}
                                                </div>
                                                <div class="col-12">
                                                    <label for="yourUsername" class="form-label">Phone</label>
                                                    <div class="input-group has-validation">
                                                        <input type="number" class="form-control" {...register("phone", { required: true })} />
                                                    </div>
                                                    {errors.phone?.type === "required" && <p>Phone is Required</p>}
                                                </div>
                                                <div class="col-12">
                                                    <label for="yourPassword" class="form-label">Password</label>
                                                    <input type="password" class="form-control" id="yourPassword"  {...register("newPassword", { required: true })} />
                                                    {errors.newPassword?.type === "required" && <p>New Password is Required</p>}
                                                </div>
                                                <div class="col-12">
                                                    <button class="btn btn-primary w-100" type="submit">Reset</button>
                                                </div>
                                                <div class="col-12" style={{ display: "flex", justifyContent: "space-evenly", }}>
                                                    <p class="small mb-0"><Link to='/register'>Create an account</Link></p>
                                                    <p class="small mb-0"><Link to='/'>Login Here</Link></p>
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

export default ResetPassword