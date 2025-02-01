import { useEffect, useRef } from "react";
import { useChatStore } from "../Store/UseChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skelton/MessageSkeleton";
import { useAuthStore } from "../Store/useAuthStore";
import { formatMessageTime } from "../Axios/Utils";

const ChatContainer = () => {
  const {messages , getMessages , isMessagesLoading , selectedUser , subscribeToMessages , unSubscribeFromMessages} = useChatStore();
  const {authUser} = useAuthStore();
  const messageEndRef = useRef(null);


  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()

    return () => unSubscribeFromMessages()
  } , [selectedUser._id , getMessages , subscribeToMessages , unSubscribeFromMessages]);
 
  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({ behavior : "smooth"});
    }
  },[messages]);

  console.log("this is image url" , messages.image);
  

  if(isMessagesLoading) return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader  />
        <MessageSkeleton />
        <MessageInput />
      </div>

  )

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* messages section  */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
             <div 
               key={message._id}
               className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
               ref={messageEndRef}
               >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img 
                     src={message.senderId === authUser._id 
                      ? authUser.ProfilePic || "/avatar.png" :
                        selectedUser.ProfilePic || "/avatar.png" 
                     }
                     alt="ProfilePic"
                  />
                </div>
             </div>
             <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
             </div>
             <div className="chat-bubble flex flex-col">
              {message.image && (
                <img 
                  src={message.image}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />  
              )}
              {message.text && <p>{message.text}</p>}
             </div>
         </div>  
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer