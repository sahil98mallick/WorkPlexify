import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { adminalljobs } from '../../APIManager/ApiManager';
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';

const AdminDashboard = () => {
  const [alljobs, setalljobs] = useState([]);
  const fetchjobdetails = async () => {
    const response = await adminalljobs();
    setalljobs(response?.data?.jobData)
  }
  useEffect(() => {
    fetchjobdetails()
  }, [])
  const calculateTotalPriceByMonth = () => {
    const monthlyTotal = {};
    alljobs.forEach((job) => {
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


  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main">

        <div class="pagetitle">
          <h1>Admin Dashboard</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/Admindashboard'>Home</Link></li>
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
                      <h5 class="card-title">Writers</h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-cart"></i>
                        </div>
                        <div class="ps-3">
                          <h6>145</h6>
                          <span class="text-success small pt-1 fw-bold">12%</span> <span
                            class="text-muted small pt-2 ps-1">increase</span>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="col-xxl-4 col-md-6">
                  <div class="card info-card revenue-card">
                    <div class="card-body">
                      <h5 class="card-title">Total Jobs</h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div class="ps-3">
                          <h6>$3,264</h6>
                          <span class="text-success small pt-1 fw-bold">8%</span> <span
                            class="text-muted small pt-2 ps-1">increase</span>

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
                          <h6>1244</h6>
                          <span class="text-danger small pt-1 fw-bold">12%</span> <span
                            class="text-muted small pt-2 ps-1">decrease</span>

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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data}
                  margin={{ left: 10, right: 10 }}
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

export default AdminDashboard