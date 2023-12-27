import axios from "axios";

const baseURL = "https://workplexifyserver.onrender.com";

// Register
export const registeruser = async (data) => {
    return axios.post(`${baseURL}/users/userregister`, data)
}
// Login
export const loginfunction = async (data) => {
    return await axios.post(`${baseURL}/users/login`, data);
}
// Reset Password
export const resetpasswordfunction = async (data) => {
    return await axios.put(`${baseURL}/users/resetpassword`, data);
}
// Change Password from Accounts
export const changepasswordfunction = async (data) => {
    return await axios.put(`${baseURL}/users/changepasswordfromaccount`, data);
}
// Update Profile Image
export const updateprofileimage = async (id, data) => {
    return await axios.put(`${baseURL}/users/updateuserimage/${id}`, data);
}
// Update Profile
export const updateprofile = async (id, data) => {
    return await axios.put(`${baseURL}/users/updateuserdetail/${id}`, data);
}
// All Register users
export const allregusers = async () => {
    return await axios.get(`${baseURL}/users/allusers`);
}

// All Writers by UserID
export const allusers = async (userid) => {
    return await axios.get(`${baseURL}/writers/writersbyuserid/${userid}`);
}

export const updateuseractivestatus = async (id, data) => {
    return axios.put(`${baseURL}/users/updateuseractivestatus/${id}`, data);
}


// ============================= Client Details Manage================================

export const allclients = async (userid) => {
    return await axios.get(`${baseURL}/clients/clientsbyuserid/${userid}`);
}
export const addclients = async (data) => {
    return await axios.post(`${baseURL}/clients/addclients`, data);
}
export const deleteclients = async (id) => {
    return await axios.delete(`${baseURL}/clients/deleteclient/${id}`);
}


// ============================= Job Details Manage================================

export const alljobs = async (userid) => {
    return await axios.get(`${baseURL}/jobdetails/jobsbyuserid/${userid}`)
}
export const addjobs = async (data) => {
    return await axios.post(`${baseURL}/jobdetails/addjobdetails`, data);
}

export const updatejobactivestatus = async (id, data) => {
    return axios.put(`${baseURL}/jobdetails/updatejobstatus/${id}`, data);
}

export const deletetask = async (id) => {
    return axios.delete(`${baseURL}/jobdetails/deletejob/${id}`);
}

export const findsingletaskbyid = async (id) => {
    return axios.get(`${baseURL}/jobdetails/singlejob/${id}`);
}


// ============================= Invoice Details Manage================================
export const allinvoices = async (userid) => {
    return await axios.get(`${baseURL}/invoice/allinvoicebyuser/${userid}`);
}
export const createinvoices = async (data) => {
    return await axios.post(`${baseURL}/invoice/generateinvoice`, data);
}
export const deleteinvoices = async (id) => {
    return axios.delete(`${baseURL}/invoice/deleteclientinvoice/${id}`);
}

export const singleinvoices = async (id) => {
    return await axios.get(`${baseURL}/invoice/singleclientinvoice/${id}`);
}

// ============================= Writer Details Manage================================

export const allwriters = async (userid) => {
    return await axios.get(`${baseURL}/writers/writersbyuserid/${userid}`);
}
export const addwriters = async (data) => {
    return await axios.post(`${baseURL}/writers/addwriters`, data);
}
export const deletewriters = async (id) => {
    return await axios.delete(`${baseURL}/writers/deletewriter/${id}`);
}



// ============================= Admin Section Details Manage================================

export const adminallusers = async () => {
    return await axios.get(`${baseURL}/users/allusers`);
}

export const adminallusersactivestatus = async (id) => {
    return await axios.get(`${baseURL}/users/updateuseractivestatus/${id}`);
}

export const adminallusersdelete = async (id) => {
    return await axios.delete(`${baseURL}/users/deleteuser/${id}`);
}


export const adminallclients = async () => {
    return await axios.get(`${baseURL}/clients/allclients`);
}
export const adminallinvoices = async () => {
    return await axios.get(`${baseURL}/invoice/allinvoice`);
}
export const adminalljobs = async () => {
    return await axios.get(`${baseURL}/jobdetails/alljobs`);
}