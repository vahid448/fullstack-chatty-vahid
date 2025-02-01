import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId , io} from "../lib/socket.js";
import Message from "../Models/message.model.js";
import User from "../Models/user.model.js";

export const getUsersForSidebar = async (req , res) =>{
 try{
  const loggedInuserId = req.user._id;
  const filterdUsers = await User.find({_id: {$ne : loggedInuserId}}).select("-password");
  res.status(200).json(filterdUsers);
  
 }catch(err){

  console.log("error in getUsersforsidebar is :" , err.message);
  res.status(500).json({message:"internal server error"})
  
 }
}


export const getMassages = async (req , res) => {
    try {
      const { id:userToChatId } = req.params
      const myId = req.user._id;
      
      const messages = await Message.find({
        $or:[
            {senderId:myId , reciverId:userToChatId},
            {senderId:userToChatId , reciverId:myId}
        ]
      })

      res.status(200).json(messages)
    } catch (error) {
      console.log("error in getMassage controller :" ,error.message);
      res.status(500).json({error:"internal server error"});  
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ error: "Message or image is required." });
        }

        

        if (image) {
            // Check if image is a valid file type
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];  
            const imageType = image && image.type ? image.type : '';

            if (!validImageTypes.includes(imageType)) {
                return res.status(400).json({ error: 'Invalid image type. Only jpeg, png, and gif are allowed.' });
            }

            try {
                if (image.startsWith('http')) {
                    imageUrl = image;  
                } else {
                    const uploadResponse = await cloudinary.uploader.upload(image, {
                        folder: "messages",
                        resource_type: "image"
                    });
                    
                }
            } catch (uploadError) {
                console.error("Cloudinary error:", uploadError.message);
                return res.status(400).json({ error: "Image upload failed." });
            }
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: image,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(reciverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessages controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
