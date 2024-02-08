import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home/Home"
import ContactUs from "./Pages/ContactUs/ContactUs"
import Resrvation from "./Pages/Resrvation/Resrvation"
import Gallery from "./Pages/Gallery/Gallery"
import Login from "./Pages/login-signup/Login"
import Signup from "./Pages/login-signup/Signup"
import ResetPassword from "./Pages/ResetPassword/ResetPassword"
import ResetRequest from "./Pages/ResetPassword/ResetRequest"
import ProfileEdit from "./Pages/Profile/ProfileEdit"
import DateRange from "./Components/DateRange/DateRange"

const SharedRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/reservation" element={<Resrvation />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/reset-request" element={<ResetRequest />} />
      <Route path="/profile" element={<ProfileEdit />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dateRange" element={<DateRange />} />

    </Routes>
  )
}

export default SharedRoutes