import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Divider } from '@mui/material'
import { useAuth } from '../../AuthManager/AuthManager';
import { allclients, alljobs, singleinvoices } from '../../../APIManager/ApiManager';
import Navbar from '../../Common/Navbar';
import Sidebar from '../../Common/Sidebar';

const PrintInvoiceDetails = () => {
  const { id } = useParams();
  const [auth, setauth] = useAuth();
  const [singleinvoice, setsingleinvoice] = useState({});
  const [allJobs, setAllJobs] = useState([]);
  const [clients, setclients] = useState([]);

  const fetchinvoicedetails = async () => {
    try {
      const response = await singleinvoices(id);
      setsingleinvoice(response?.data?.finddata);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllJobs = async () => {
    try {
      if (auth && auth.user && auth.user._id) {
        const response = await alljobs(auth.user._id);
        setAllJobs(response.data.jobData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchclientsdetails = async () => {
    try {
      if (auth && auth.user && auth.user._id) {
        const response = await allclients(auth.user._id);
        setclients(response?.data?.clientData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchinvoicedetails();
    fetchAllJobs();
    fetchclientsdetails();
  }, [id, auth?.user?._id]);

  const getClientName = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  const matchingJobsDetails = singleinvoice.jobs
    ? allJobs.filter((job) => singleinvoice.jobs.includes(job._id))
    : [];

  const handlePrint = () => {
    const pageTitle = document.querySelector('.pagetitle');
    if (pageTitle) {
      pageTitle.style.display = 'none';
    }
    window.print();
    if (pageTitle) {
      pageTitle.style.display = 'block';
    }
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main print-page">
        <div class="pagetitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: "wrap" }}>
          <div>
            <h1>Invoice Management</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to='/userdashboard'>Home</Link></li>
                <li class="breadcrumb-item active">Invoice</li>
              </ol>
            </nav>
          </div>
          <div style={{ background: "whitesmoke", display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "300px" }}>
            <button className='btn btn-primary' onClick={handlePrint}>Print</button>
            <button className='btn btn-secondary'>Download</button>
            <button className='btn btn-warning'>Mail</button>
          </div>
        </div>

        <section className="section dashboard">

          <div className="invoice-container" style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ddd',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            backgroundColor: '#ffffff',
            color: '#333',
            borderRadius: '8px'
          }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2534/2534203.png"
              alt="Company Logo"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                maxWidth: '120px',
                height: '100px',
                borderRadius: "20px"
              }}
            />

            <div className="invoice-header" style={{
              borderBottom: '2px solid #4CAF50',
              paddingBottom: '20px',
              marginBottom: '30px',
              position: 'relative',
              color: '#333'
            }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>Work Plexify</h2>
              <p style={{ margin: '0' }}>Invoice No. {singleinvoice?.invoiceID}</p>
              <p style={{ margin: '0' }}>Date: {singleinvoice?.invoiceDate?.slice(0, 10)}
                <br />Created Time: {singleinvoice?.invoiceDate?.slice(11)}</p>
            </div>

            <div className="invoice-body">
              <div className="billed-to" style={{ marginBottom: '20px' }}>
                <strong>BILLED TO:</strong>
                <p style={{ margin: '0' }}>{getClientName(singleinvoice.client)}</p>
                <p style={{ margin: '0' }}>9933935760</p>
                <p style={{ margin: '0' }}>Kolkata</p>
              </div>

              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '20px',
                textAlign: 'left'
              }}>
                <thead>
                  <tr>
                    <th style={{ padding: '10px', backgroundColor: '#f2f2f2' }}>Job ID</th>
                    <th style={{ padding: '10px', backgroundColor: '#f2f2f2' }}>Quantity</th>
                    <th style={{ padding: '10px', backgroundColor: '#f2f2f2' }}>Start Date</th>
                    <th style={{ padding: '10px', backgroundColor: '#f2f2f2' }}>End Date</th>
                    <th style={{ padding: '10px', backgroundColor: '#f2f2f2' }}>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    matchingJobsDetails?.map((item, key) => {
                      return (
                        <tr>
                          <td style={{ padding: '10px', wordBreak: 'break-word' }}>{item?.jobid}</td>
                          <td style={{ padding: '10px' }}>1</td>
                          <td style={{ padding: '10px' }}>{item?.startdate?.slice(0, 10)}</td>
                          <td style={{ padding: '10px' }}>{item?.enddate?.slice(0, 10)}</td>
                          <td style={{ padding: '10px', textAlign: 'right' }}>{item?.actualprice}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

              <div className="total-calculation" style={{
                textAlign: 'right'
              }}>
                <p style={{ margin: '0' }}>Previous Due: 0 </p>
                <Divider /><br />
                <h3 style={{ margin: '0', color: '#4CAF50', boxShadow: "-13px -5px 15px -3px rgba(0,0,0,0.1)" }}>Total: {singleinvoice?.totalAmount}</h3>
              </div>
            </div>

            <div className="invoice-footer" style={{
              borderTop: '2px solid #4CAF50',
              paddingTop: '20px',
              marginTop: '20px',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0' }}>Thank you!</h4>
            </div>
          </div>

        </section>

      </main>
    </>
  )
}

export default PrintInvoiceDetails