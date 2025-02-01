import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";
import SignUppage from "./Pages/SignUppage";

import { Navigate, Route , Routes } from "react-router-dom";
import { useAuthStore } from "./Store/useAuthStore";
import { useThemeStore } from "./Store/UseThemeStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";


const App = () => {
  const {authUser , checkAuth , ischekingAuth ,onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

  console.log("this is online users :",onlineUsers);
  
  useEffect(() =>{
    checkAuth();
  },[checkAuth]);

  
 if( ischekingAuth && !authUser ) return(
   <div className="flex items-center justify-center h-screen">
     <Loader className="size-10  animate-spin"/>
   </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
         <Route path="/" element={authUser ? <Homepage/> : <Navigate to="/login"/>} />
         <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to="/" />} />
         <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/> } />
         <Route path="/settings" element={<SettingsPage/>} />
         <Route path="/signup" element={!authUser ?<SignUppage/> : <Navigate to="/" />} />
      </Routes>

      {/* toaster for ot alert massage */}
      <Toaster />
    </div>
  )
}

export default App