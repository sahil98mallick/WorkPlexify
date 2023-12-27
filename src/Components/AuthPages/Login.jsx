import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthManager/AuthManager';
import { loginfunction } from '../../APIManager/ApiManager';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';

const Login = () => {
    const [auth, setauth] = useAuth();
    const [isLoading, setisloading] = useState(false)
    const navigate = useNavigate();
    const encryptAndSaveToLocalStorage = (key, data) => {
        try {
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'sahilworkplexify').toString();
            localStorage.setItem(key, encryptedData);
        } catch (error) {
            console.error('Error encrypting and saving to localStorage:', error);
        }
    };
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        setisloading(true);
        try {
            const response = await loginfunction(data);
            console.log(response);
            const logindt = response.data;
            if (logindt.success) {
                if (logindt.user.userType === "User" && logindt.user.activestatus === true) {
                    Swal.fire({
                        icon: 'success',
                        title: logindt.message,
                        timer: 1000,
                        showConfirmButton: false,
                    }).then(() => {
                        setauth({
                            ...auth,
                            user: logindt.user,
                            token: logindt.token,
                        });
                        encryptAndSaveToLocalStorage('authenticate', logindt);
                        navigate('/userdashboard');
                    });
                } else if (logindt.user.userType === "Admin" && logindt.user.activestatus === true) {
                    Swal.fire({
                        icon: 'success',
                        title: logindt.message,
                        timer: 1000,
                        showConfirmButton: false,
                    }).then(() => {
                        setauth({
                            ...auth,
                            user: logindt.user,
                            token: logindt.token,
                        });
                        encryptAndSaveToLocalStorage('authenticate', logindt);
                        navigate('/Admindashboard');
                    });
                } else if (logindt.user.activestatus === false) {
                    toast.error("Your account is blocked....Please Contact Your Administration");
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: logindt.message,
                    timer: 2000,
                    showConfirmButton: false,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.message,
                timer: 3000,
                showConfirmButton: false,
            })
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
                                                <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                                <p class="text-center small">Enter your Email & password to login</p>
                                            </div>

                                            <form class="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                                                <div class="col-12">
                                                    <label for="yourUsername" class="form-label">Email Address</label>
                                                    <div class="input-group has-validation">
                                                        <input type="text" class="form-control" id="yourUsername" {...register("email", { required: true })} />
                                                    </div>
                                                    {errors.email?.type === "required" && <p>Email is Required</p>}
                                                </div>
                                                <div class="col-12">
                                                    <label for="yourPassword" class="form-label">Password</label>
                                                    <input type="password" class="form-control" id="yourPassword"  {...register("password", { required: true })} />
                                                    {errors.password?.type === "required" && <p>Password is Required</p>}
                                                </div>
                                                <div class="col-12">
                                                    <button class="btn btn-primary w-100" type="submit">
                                                        {isLoading ? <CircularProgress size={20} style={{ color: "black" }} /> : <>Login</>}
                                                    </button>
                                                </div>
                                                <div class="col-12" style={{ display: "flex", justifyContent: "space-evenly", }}>
                                                    <p class="small mb-0"><Link to='/register'>Create an account</Link></p>
                                                    <p class="small mb-0"><Link to='/resetpassword'>Reset Password</Link></p>
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

export default Login