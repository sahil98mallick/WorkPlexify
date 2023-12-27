import React, { useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { updateprofile } from '../../../APIManager/ApiManager';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../AuthManager/AuthManager';

const UpdateAdminprofile = () => {
    const [auth, setauth] = useAuth()
    const navigate = useNavigate();
    const [isloading, setisloading] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        data.userType = auth?.user?.userType
        data.name = auth?.user?.name
        data.activestatus = auth?.user?.activestatus
        data.email = auth?.user?.email
        console.log(data);
        setisloading(true)
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('email', data.email);
            formData.append('userType', data.userType);
            formData.append('activestatus', data.activestatus);
            formData.append('Image', data.Image[0]);
            const response = await updateprofile(auth?.user?._id, formData)
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/adminprofile")
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
            <Navbar />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>Update Profile</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/Admindashboard'>Home</Link></li>
                            <li class="breadcrumb-item">Users</li>
                            <li class="breadcrumb-item active"><Link to='/adminprofile'>Profile</Link></li>
                        </ol>
                    </nav>
                </div>
                {/* Main Section */}
                <section class="section profile">
                    <center><h1>Update Your Profile</h1></center>
                    <form class="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div class="col-12">
                            <label for="yourName" class="form-label">Your Name</label>
                            <input type="text" class="form-control"
                                value={auth?.user?.name} disabled />
                        </div>
                        {errors.name?.type === "required" && <p>Name is Required</p>}

                        <div class="col-12">
                            <label for="yourEmail" class="form-label">Your Email</label>
                            <input type="email" class="form-control"
                                value={auth?.user?.email} disabled />
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
                            <label class="form-label">Profile Image</label>
                            <input type="file" class="form-control"
                                {...register("Image", { required: true })} accept="image/*" />
                        </div>
                        {errors.Image?.type === "required" && <p>Image is Required</p>}
                        <div class="col-12">
                            <button class="btn btn-primary w-100" type="submit">{isloading ? (<><CircularProgress size={20} style={{ color: "black" }} /></>) : 'Submit'}</button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}

export default UpdateAdminprofile