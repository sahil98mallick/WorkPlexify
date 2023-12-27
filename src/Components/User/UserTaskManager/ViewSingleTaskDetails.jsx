import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { allclients, allwriters, findsingletaskbyid } from '../../../APIManager/ApiManager'
import { useAuth } from '../../AuthManager/AuthManager'

const ViewSingleTaskDetails = () => {
  const [auth,] = useAuth()
  const { id } = useParams();
  const [singletask, setsingletask] = useState({});
  const fetchsingledetails = async () => {
    const response = await findsingletaskbyid(id)
    setsingletask(response?.data?.finddata)
  }
  useEffect(() => {
    fetchsingledetails()
  }, [id])

  // Clients API calling
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

  console.log(singletask);

  const getClientName = (clientId) => {
    const client = clients.find((client) => client?._id === clientId);
    return client ? client?.name : 'Unknown Client';
  };


  // Write api calling
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

  const getWriterName = (writerId) => {
    const writer = writers.find((writer) => writer?._id === writerId);
    return writer ? writer?.name : 'Unknown Writer';
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main">

        <div class="pagetitle">
          <h1>Job Descriptions</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/userdashboard'>Home</Link></li>
              <li class="breadcrumb-item active"><Link to='/viewtaskdetails'>Job Details</Link></li>
            </ol>
          </nav>
        </div>
        <section class="section profile">
          <div class="row">
            <div class="col-xl-12">
              <div class="card">
                <div class="card-body pt-3">
                  <center><h3 style={{ fontFamily: "Times" }}>Overview of Job ID: <Link>{singletask?.jobid}</Link></h3></center>
                  <div class="tab-content pt-2">
                    <div class="tab-pane fade show active profile-overview" id="profile-overview">
                      <h5 class="card-title">Task Descriptions</h5>
                      <p class="small fst-italic">
                        {singletask?.jobdetails}
                      </p>

                      <center><h5 class="card-title">Task Details</h5></center>
                      <div class="row">
                        <div class="col-lg-3 col-md-4 label ">Writer Name</div>
                        <div class="col-lg-9 col-md-8">{getWriterName(singletask?.writername)}</div>
                      </div>
                      <div class="row">
                        <div class="col-lg-3 col-md-4 label">Client Name</div>
                        <div class="col-lg-9 col-md-8">{getClientName(singletask?.clientname)}</div>
                      </div>
                      <div class="row">
                        <div class="col-lg-3 col-md-4 label">Start Date</div>
                        <div class="col-lg-9 col-md-8">{singletask?.startdate?.slice(0, 10)}</div>
                      </div>
                      <div class="row">
                        <div class="col-lg-3 col-md-4 label">End Date</div>
                        <div class="col-lg-9 col-md-8">{singletask?.enddate?.slice(0, 10)}</div>
                      </div>
                      <div class="row">
                        <div class="col-lg-3 col-md-4 label">Actual Price</div>
                        <div class="col-lg-9 col-md-8">{singletask?.actualprice}</div>
                      </div>

                      <div class="row">
                        <div class="col-lg-3 col-md-4 label">Writer Price</div>
                        <div class="col-lg-9 col-md-8">{singletask?.writeprice}</div>
                      </div>

                      <div class="row">
                        <div class="col-lg-3 col-md-4 label">Task Status</div>
                        <div class="col-lg-9 col-md-8">{singletask?.jobstatus ? (<><p style={{ color: "red" }}>On-Going</p></>) : (<><p style={{ color: "green", fontSize: "20px", fontWeight: "600" }}>Completed</p></>)}</div>
                      </div>

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

export default ViewSingleTaskDetails