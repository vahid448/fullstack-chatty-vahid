import { useRef, useState } from "react";
import { useChatStore } from "../Store/UseChatStore"
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text , setText] = useState("");
  const [imagePreview , setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const {sendMessages} = useChatStore();

  // handle image funcion

  const hadleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
        toast.error("please select an image file");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        setImagePreview(reader.result); 
    };

    reader.readAsDataURL(file); 
};



 const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

console.log("the is imagePreview " , imagePreview);


  const hadleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    
    try {
      const imageUrl = imagePreview; 
      await sendMessages({
        text: text.trim(),
        image: imageUrl,
      });
  
     
      // clear form

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };
  
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
           <div className="relative">
        <img src={imagePreview} alt="preview"
         className="w-20 h-20 object-cover rounded-lg border border-zinc-700"/>
         <button 
          onClick={removeImage}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
          type="button"
         >
          <X  className="size-3"/>
         </button>
      </div>
    </div>
  )}
     

     {/* message inputs section */}
      
      <form onSubmit={hadleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input 
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input 
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={hadleImageChange}
            aria-label="Upload an image"
          />

          {/* button */}

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                        ${imagePreview ? "text-emerald-500" : "text-zinc-400" }`}
            onClick={() => fileInputRef.current?.click()}
          >
          <Image size={20} />  
          </button>                                     
        </div>

        {/* send button */}
        
        <button
          type="submit"
          className="btn btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
       <Send size={22}  />
      </button>
    </form>
</div>
   ) 
  }

export default MessageInput