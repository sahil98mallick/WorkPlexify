import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthManager/AuthManager'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Tooltip } from '@mui/material'
import { allclients, alljobs, allwriters } from '../../APIManager/ApiManager'
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'

const UserDashboard = () => {
    const [auth, setauth] = useAuth();
    const [alljob, setalljob] = useState([]);
    const fetchtaskdetails = async () => {
        try {
            if (auth && auth?.user && auth?.user?._id) {
                const response = await alljobs(auth?.user?._id);
                setalljob(response.data.jobData)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchtaskdetails()
    }, [auth?.user?._id])
    const calculateTotalPriceByMonth = () => {
        const monthlyTotal = {};
        alljob.forEach((job) => {
            const date = new Date(job.startdate);
            const formattedDate = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(date);
            const key = formattedDate;
            const totalPrice = monthlyTotal[key] || 0;
            monthlyTotal[key] = totalPrice + parseFloat(job.actualprice);
        });

        return Object.entries(monthlyTotal).map(([key, totalPrice], index) => ({
            month: key,
            totalPrice,
            color: getMonthColor(index),
        }));
    };
    const getMonthColor = (index) => {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#e67e22', '#d35400', '#c0392b', '#7f8c8d', '#16a085'];
        return colors[index % colors.length];
    };
    const data = calculateTotalPriceByMonth();
    // Counts Total Writers, total jobs, Total Clinets
    console.log("Users id", auth?.user?._id);
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
    const [writers, setwriters] = useState([]);
    const fetchwritersdetails = async () => {
        try {
            if (auth && auth.user && auth.user._id) {
                const response = await allwriters(auth.user._id);
                setwriters(response?.data?.writerData);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchwritersdetails()
    }, [auth?.user?._id])
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">

                <div class="pagetitle">
                    <h1>User Dashboard - {auth?.user?.name}</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/userdashboard'>Home</Link></li>
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>

                <section class="section dashboard">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row">
                                <div class="col-xxl-4 col-md-6">
                                    <div class="card info-card sales-card">
                                        <div class="card-body">
                                            <h5 class="card-title">Total Jobs</h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-list-task"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>{alljob?.length > 0 ? (<>{alljob.length}</>) : ("0")}</h6>
                                                    <span class="text-danger small pt-1 fw-bold"><Link to='/viewtaskdetails'>Click Here to View</Link></span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-xxl-4 col-md-6">
                                    <div class="card info-card revenue-card">
                                        <div class="card-body">
                                            <h5 class="card-title">Total Writers</h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-person-badge-fill"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>{writers?.length > 0 ? (<>{writers.length}</>) : ("0")}</h6>
                                                    <span class="text-danger small pt-1 fw-bold"><Link to='/writers'>Click Here to View</Link></span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-xxl-4 col-xl-12">

                                    <div class="card info-card customers-card">
                                        <div class="card-body">
                                            <h5 class="card-title">Total Clients</h5>

                                            <div class="d-flex align-items-center">
                                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i class="bi bi-people"></i>
                                                </div>
                                                <div class="ps-3">
                                                    <h6>{clients?.length > 0 ? (<>{clients.length}</>) : ("0")}</h6>
                                                    <span class="text-danger small pt-1 fw-bold"><Link to='/clientdetails'>Click Here to View</Link></span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div>
                        <div id='totalPriceByMonth' className="chart-container">
                            <ResponsiveContainer width="100%" height={350} style={{ background: "#f6f9ff", border: '0px solid #000' }}>
                                <BarChart
                                    data={data}
                                    margin={{ top: 30, left: 5, right: 10 }}
                                >
                                    <Bar dataKey="totalPrice" name="Total Price" label={{ position: 'top' }}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}

export default UserDashboard