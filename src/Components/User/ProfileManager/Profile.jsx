import React, { useState } from 'react'
import { useAuth } from '../../AuthManager/AuthManager'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { changepasswordfunction, updateprofileimage } from '../../../APIManager/ApiManager'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


const Profile = () => {
    const [showFileInput, setShowFileInput] = useState(false);
    const [auth, setauth] = useAuth();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        data.email = auth?.user?.email
        try {
            const response = await changepasswordfunction(data)
            if (response.data) {
                // toast.success(response.data.message)
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    text: response.data.message,
                    timer: 2000,
                    showConfirmButton: false,
                })
                setValue("currentPassword", "")
                setValue("newPassword", "")
            } else {
                // toast.error(response.data.message)
                Swal.fire({
                    icon: 'error',
                    title: response.data.message,
                    text: response.data.message,
                    timer: 2000,
                    showConfirmButton: true,
                })
            }
        } catch (error) {
            // toast.error(error.message)
            Swal.fire({
                icon: 'warning',
                title: error.message,
                text: error.message,
                timer: 2000,
                showConfirmButton: true,
            })
        }
    }
    const handleShowFileInput = () => {
        setShowFileInput(true);
    };
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/userdashboard'>Home</Link></li>
                            <li class="breadcrumb-item active"><Link to='/profile'>Profile</Link></li>
                        </ol>
                    </nav>
                </div>
                <section class="section profile">
                    <div class="row">
                        <div class="col-xl-4">

                            <div class="card">
                                <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                    <img src={auth?.user?.Image} alt="Profile" className='profileimage' />
                                    <h2>{auth?.user?.name}</h2>
                                    <h3>Web Designer</h3>
                                    <div class="social-links mt-2">
                                        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                                        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                                        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                                        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                                    </div><br />
                                    <Link to='/updateprofile' className='btn btn-warning btn-sm'>Update Profile Details</Link>
                                </div>
                            </div>

                        </div>

                        <div class="col-xl-8">
                            <div class="card">
                                <div class="card-body pt-3">
                                    <ul class="nav nav-tabs nav-tabs-bordered">

                                        <li class="nav-item">
                                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                        </li>

                                        <li class="nav-item">
                                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                        </li>

                                    </ul>
                                    <div class="tab-content pt-2">

                                        <div class="tab-pane fade show active profile-overview" id="profile-overview">
                                            <h5 class="card-title">About</h5>
                                            <p class="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p>

                                            <h5 class="card-title">Profile Details</h5>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label ">Full Name</div>
                                                <div class="col-lg-9 col-md-8">{auth?.user?.name}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label">Company</div>
                                                <div class="col-lg-9 col-md-8">Academia Crafter</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label">Job</div>
                                                <div class="col-lg-9 col-md-8">Web Designer</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label">Role</div>
                                                <div class="col-lg-9 col-md-8">{auth?.user?.userType}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label">Address</div>
                                                <div class="col-lg-9 col-md-8">A108 Adam Street, New York, NY 535022</div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label">Phone</div>
                                                <div class="col-lg-9 col-md-8">{auth?.user?.phone}</div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 label">Email</div>
                                                <div class="col-lg-9 col-md-8">{auth?.user?.email}</div>
                                            </div>

                                        </div>

                                        {/* Password Manager */}
                                        <div class="tab-pane fade pt-3" id="profile-change-password">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div>
                                                    <div class="row mb-3">
                                                        <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Email</label>
                                                        <div class="col-md-8 col-lg-5">
                                                            <input type="text" class="form-control" value={auth?.user?.email} disabled />
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3">
                                                        <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                        <div class="col-md-8 col-lg-5">
                                                            <input type="password" class="form-control"
                                                                {...register("currentPassword", { required: true })} />
                                                        </div>
                                                        {errors.currentPassword?.type === "required" && <p>Current Password is Required</p>}
                                                    </div>

                                                    <div class="row mb-3">
                                                        <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                                                        <div class="col-md-8 col-lg-5">
                                                            <input type="password" class="form-control"
                                                                {...register("newPassword", { required: true })} />
                                                        </div>
                                                        {errors.newPassword?.type === "required" && <p>New Password is Required</p>}
                                                    </div>

                                                    <div class="text-center">
                                                        <button type="submit" class="btn btn-primary">Change Password</button>
                                                    </div>
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

export default Profile