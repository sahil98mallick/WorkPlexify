import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import './App.css';
import './Main.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Components/AuthPages/Login';
import Register from './Components/AuthPages/Register';
import UserDashboard from './Components/User/UserDashboard';
import ClientDetails from './Components/User/ClientsPages/ClientDetails';
import Writers from './Components/User/WriterPages/Writers';
import AddTaskDetails from './Components/User/UserTaskManager/AddTaskDetails';
import ViewTaskDetails from './Components/User/UserTaskManager/ViewTaskDetails';
import Profile from './Components/User/ProfileManager/Profile';
import TotalReports from './Components/User/Reports/TotalReports';
import MonthlyReports from './Components/User/Reports/MonthlyReports';
import MonthlyClientReports from './Components/User/Reports/MonthlyClientReports';
import CreateInvoice from './Components/User/InvoicePages/CreateInvoice';
import ViewInvoice from './Components/User/InvoicePages/ViewInvoice';
import PrintInvoiceDetails from './Components/User/InvoicePages/PrintInvoiceDetails';
import ViewSingleTaskDetails from './Components/User/UserTaskManager/ViewSingleTaskDetails';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AllWriterDetailManage from './Components/Admin/Writers/AllWriterDetailManage';
import AllUserDetailsManage from './Components/Admin/Users/AllUserDetailsManage';
import AllTaskDetailsManage from './Components/Admin/Tasks/AllTaskDetailsManage';
import AllInvoiceDetailsManage from './Components/Admin/Invoices/AllInvoiceDetailsManage';
import AllClientManage from './Components/Admin/Clients/AllClientManage';
import ResetPassword from './Components/AuthPages/ResetPassword';
import UpdateProfile from './Components/User/ProfileManager/UpdateProfile';
import AdminProfile from './Components/Admin/AdminProfile/AdminProfile';
import UpdateAdminprofile from './Components/Admin/AdminProfile/UpdateAdminprofile';
import { useAuth } from './Components/AuthManager/AuthManager';
import SearchJobDetails from './Components/User/SearchJobDetails/SearchJobDetails';

function App() {
  const [auth, setauth] = useAuth()
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("authenticate") || sessionStorage.getItem("authenticate");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/" />
    );
  }

  const PublicRoute = [
    // {
    //   path: "/",
    //   components: <Login />
    // },
    {
      path: "/",
      components: auth?.token ? <Navigate to="/profile" /> : <Login />
    },
    {
      path: "/register",
      components: auth?.token ? <Navigate to="/profile" /> : <Register />
    },
    {
      path: "/resetpassword",
      components: <ResetPassword />
    }
  ]

  const ProtectedRoute = [
    {
      path: "/userdashboard",
      components: <UserDashboard />
    },
    {
      path: "/clientdetails",
      components: <ClientDetails />
    },
    {
      path: "/writers",
      components: <Writers />
    },
    {
      path: "/addtaskdetails",
      components: <AddTaskDetails />
    },
    {
      path: "/viewtaskdetails",
      components: <ViewTaskDetails />
    },
    {
      path: "/search/:searchQuery",
      components: <SearchJobDetails />
    },
    {
      path: "/singletaskdetails/:id",
      components: <ViewSingleTaskDetails />
    },
    {
      path: "/profile",
      components: <Profile />
    },
    {
      path: "/updateprofile",
      components: <UpdateProfile />
    },
    {
      path: "/totalreports",
      components: <TotalReports />
    },
    {
      path: "/monthlyreports",
      components: <MonthlyReports />
    },
    {
      path: "/monthlyclientreports",
      components: <MonthlyClientReports />
    },
    {
      path: "/createinvoice",
      components: <CreateInvoice />
    },
    {
      path: "/viewinvoice",
      components: <ViewInvoice />
    },
    {
      path: "/printinvoicedetails/:id",
      components: <PrintInvoiceDetails />
    },
    {
      path: "/Admindashboard",
      components: <AdminDashboard />
    },
    {
      path: "/adminprofile",
      components: <AdminProfile />
    },
    {
      path: "/updateadminprofile",
      components: <UpdateAdminprofile />
    },
    {
      path: "/allwriterdetailmanage",
      components: <AllWriterDetailManage />
    },
    {
      path: "/alluserdetailmanage",
      components: <AllUserDetailsManage />
    },
    {
      path: "/alltaskdetailmanage",
      components: <AllTaskDetailsManage />
    },
    {
      path: "/allinvoicedetailmanage",
      components: <AllInvoiceDetailsManage />
    },
    {
      path: "/allclientdetailmanage",
      components: <AllClientManage />
    }
  ]
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000} />
      <Router>
        <Routes>
          {/* Public Route */}
          {
            PublicRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={item.components} />
                </>
              )
            })
          }
          {/* Private Route */}
          {
            ProtectedRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={<PrivateRoute>{item.components}</PrivateRoute>} />
                </>
              )
            })
          }
          {/* <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/userdashboard' element={<UserDashboard />} />
          <Route path='/clientdetails' element={<ClientDetails />} />
          <Route path='/writers' element={<Writers />} />
          <Route path='/addtaskdetails' element={<AddTaskDetails />} />
          <Route path='/viewtaskdetails' element={<ViewTaskDetails />} />
          <Route path='/singletaskdetails/:id' element={<ViewSingleTaskDetails />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/updateprofile' element={<UpdateProfile />} />
          <Route path='/totalreports' element={<TotalReports />} />
          <Route path='/monthlyreports' element={<MonthlyReports />} />
          <Route path='/monthlyclientreports' element={<MonthlyClientReports />} />
          <Route path='/createinvoice' element={<CreateInvoice />} />
          <Route path='/viewinvoice' element={<ViewInvoice />} />
          <Route path='/printinvoicedetails/:id' element={<PrintInvoiceDetails />} /> */}

          {/* =============================Admin Section=============================== */}
          {/* <Route path='/Admindashboard' element={<AdminDashboard />} />
          <Route path='/adminprofile' element={<AdminProfile />} />
          <Route path='/updateadminprofile' element={<UpdateAdminprofile />} />
          <Route path='/allwriterdetailmanage' element={<AllWriterDetailManage />} />
          <Route path='/alluserdetailmanage' element={<AllUserDetailsManage />} />
          <Route path='/alltaskdetailmanage' element={<AllTaskDetailsManage />} />
          <Route path='/allinvoicedetailmanage' element={<AllInvoiceDetailsManage />} />
          <Route path='/allclientdetailmanage' element={<AllClientManage />} /> */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
