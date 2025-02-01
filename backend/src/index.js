import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import authroute from './Routes/auth.route.js';
import messageRoutes from "./Routes/message.route.js";
import {app , server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
}));



app.use("/api/auth" , authroute);
app.use("/api/messages" , messageRoutes);

if(process.env.NODE_ENV === "vahidp"){
   app.use(express.static(path.join(__dirname, "../frentend/dist")));
   
   app.get("*" , (req, res) => {
    res.sendFile(path.join(__dirname , "../frentend" , "dist" , "index.html"));
   })
}


server.listen(PORT , ()=> {
    console.log(`the server is running in this  port ${PORT}`)
    connectDB()
});