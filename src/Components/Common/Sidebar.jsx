import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthManager/AuthManager';
import { toast } from 'react-toastify';

const Sidebar = () => {

    // Main Function Start Here
    const [auth, setauth] = useAuth();
    const navigate = useNavigate()
    // Logout Function
    const logoutfunction = () => {
        toast.warn("Logout Successfully...")
        setauth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem("authenticate");
        navigate("/")
    }

    return (
        <>
            {/* <!-- ======= Sidebar ======= --> */}
            <aside id="sidebar" class="sidebar">
                <center><h2 style={{ color: "green", fontFamily: "Times", fontWeight: "600" }}>Work Plexify</h2></center>
                <ul class="sidebar-nav" id="sidebar-nav">
                    <li class="nav-item">
                        {
                            auth?.user?.userType === "Admin" ? (
                                <><Link class="nav-link" to='/Admindashboard'>
                                    <i class="bi bi-grid"></i>
                                    <span>Dashboard</span>
                                </Link></>
                            ) : (
                                <><Link class="nav-link" to='/userdashboard'>
                                    <i class="bi bi-grid"></i>
                                    <span>Dashboard</span>
                                </Link></>
                            )
                        }
                    </li>
                    {/* <!-- End Dashboard Nav --> */}
                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-person-fill"></i><span>Clients</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                {
                                    auth?.user?.userType === "Admin" ? (
                                        <>
                                            <Link to='/allclientdetailmanage'>
                                                <i class="bi bi-circle"></i><span>Clients</span>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to='/clientdetails'>
                                                <i class="bi bi-circle"></i><span>Clients</span>
                                            </Link>
                                        </>
                                    )
                                }
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Components Nav --> */}
                    {
                        auth?.user?.userType === "Admin" ? (
                            <>
                                <li class="nav-item">
                                    <a class="nav-link collapsed" data-bs-target="#components-users" data-bs-toggle="collapse" href="#">
                                        <i class="bi bi-person-fill"></i><span>Users</span><i class="bi bi-chevron-down ms-auto"></i>
                                    </a>
                                    <ul id="components-users" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                                        <li>
                                            <Link to='/alluserdetailmanage'>
                                                <i class="bi bi-circle"></i><span>Users</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : null
                    }


                    {/* Writers */}
                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#components-writer" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-person-fill"></i><span>Writers</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-writer" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                {
                                    auth?.user?.userType === "Admin" ? (
                                        <>
                                            <Link to='/allwriterdetailmanage'>
                                                <i class="bi bi-circle"></i><span>Writers</span>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to='/writers'>
                                                <i class="bi bi-circle"></i><span>Writers</span>
                                            </Link>
                                        </>
                                    )
                                }
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Components Nav --> */}

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-journal-text"></i><span>Jobs</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            {
                                auth?.user?.userType === "Admin" ? (
                                    <><li>
                                        <Link to='/alltaskdetailmanage'>
                                            <i class="bi bi-circle"></i><span>Jobs</span>
                                        </Link>
                                    </li></>
                                ) : (
                                    <><li>
                                        <Link to='/addtaskdetails'>
                                            <i class="bi bi-circle"></i><span>Add Tasks</span>
                                        </Link>
                                        <Link to='/viewtaskdetails'>
                                            <i class="bi bi-circle"></i><span>Tasks Details</span>
                                        </Link>
                                        <Link>
                                            <i class="bi bi-circle"></i><span>Active Tasks</span>
                                        </Link>
                                        <Link>
                                            <i class="bi bi-circle"></i><span>Completed Tasks</span>
                                        </Link>
                                    </li></>
                                )
                            }
                        </ul>
                    </li>
                    {/* <!-- End Forms Nav --> */}
                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-receipt"></i><span>Invoice</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            {
                                auth?.user?.userType === "Admin" ? (
                                    <><li>
                                        <Link to='/allinvoicedetailmanage'>
                                            <i class="bi bi-circle"></i><span>Invoice</span>
                                        </Link>
                                    </li>
                                        <li>
                                        </li></>
                                ) : (
                                    <><li>
                                        <Link to='/createinvoice'>
                                            <i class="bi bi-circle"></i><span>Create Invoice</span>
                                        </Link>
                                    </li>
                                        <li>
                                            <Link to='/viewinvoice'>
                                                <i class="bi bi-circle"></i><span>View Invoice</span>
                                            </Link>
                                        </li>
                                        <li>
                                        </li></>
                                )
                            }
                        </ul>
                    </li>
                    {/* <!-- End Charts Nav --> */}

                    <li class="nav-heading">Extra Pages</li>

                    <li class="nav-item">
                        {
                            auth?.user?.userType === "Admin" ? (
                                <> <Link to='/adminprofile' class="nav-link collapsed" >
                                    <i class="bi bi-people-fill"></i>
                                    <span>Profile</span>
                                </Link></>
                            ) : (
                                <> <Link to='/profile' class="nav-link collapsed" >
                                    <i class="bi bi-people-fill"></i>
                                    <span>Profile</span>
                                </Link></>
                            )
                        }
                    </li>
                    {/* <!-- End Profile Page Nav --> */}
                    <li class="nav-heading"></li>
                    <li class="nav-item">
                        <a onClick={logoutfunction} class="nav-link collapsed" >
                            <i class="bi bi-box-arrow-right"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>

            </aside>
            {/* <!-- End Sidebar--> */}
        </>
    )
}

export default Sidebar