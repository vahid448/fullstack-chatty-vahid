import {create} from "zustand";
import { axiosInstance } from "../Axios/Axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "vahidp" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set , get) => ({
    authUser:null,

    isSiginUp:false,
    isLoginIn:false,
    isUpdatinProfile:false,
    ischekingAuth:true,
    onlineUsers:[],
    socket:null,
    
    checkAuth:async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data});

            get().connectSocket();
        } catch (error) {
            console.log("error in cheauth:" , error);   
            set({authUser:null})
        } finally{
            set({ischekingAuth:false})
        }
    },


    signup: async (data) => {       
        set({isSiginUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup" , data);
            set({authUser: res.data});
            toast.success("Account created successfully");
           
            get().connectSocket();
        } catch (error) {
            toast.error(error);
        } finally {
            set({ isSiginUp : false})
        }
    },


    login: async (data) => {
     set({ isLoginIn:true })
     try {
        const res =await axiosInstance.post("/auth/login" , data);
        set({authUser:res.data});
        toast.success("logged in successfully");

        get().connectSocket();
     } catch (error) {
        toast.error(error.response.data.message);

     } finally{
        set({isLoginIn:false});
     }
    },


    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("logged out successsfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);

        }
    },


    updateProfile: async (data) => { 
     set({isUpdatinProfile:true});
     try {
        const res = await axiosInstance.put("/auth/update-profile" , data);
        set({authUser:res.data});
        toast.success("profile updated successfully");
     } catch (error) {
        console.log("error in update profile:" , error);
        toast.error(error.response.data.message);
     } finally{
        set({isUpdatinProfile:false});
     }
    },

    
    connectSocket: () => {
      const {authUser} = get();

      if(!authUser || get().socket?.connected) return;

      const socket = io(BASE_URL , {
        query: {
            userId: authUser._id,
        }
      });
      socket.connect()

      set({socket:socket});
      socket.on("getOnlineUsers" , (userIds) => {
        set({onlineUsers:userIds});
      })
    },


    disconnectSocket: () => {
     if(get().socket?.connected) get().socket.disconnect();
    },

}))