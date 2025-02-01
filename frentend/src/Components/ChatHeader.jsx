import { X } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";
import { useChatStore } from "../Store/UseChatStore"

const ChatHeader = () => {
    const {selectedUser , setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();


  return (
    <div className="p-3 border-b border-base-300">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* avatar image */}
                <div className="avatar">
                    <div className="size-10 rounded-full relative">
                        <img src={selectedUser.ProfilePic || "/avatar.png"} alt={selectedUser.fullName} />
                    </div>
                </div>

                {/* user info */}
                <div>
                    <h3 className="font-medium">{selectedUser.fullName}</h3>
                    <p className="text-sm text-base-content/70">
                      {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
                    </p>
                </div>
            </div>

            {/* close button */}
            <button onClick={() => setSelectedUser(null)}>
                <X />
            </button>
        </div>
    </div>
  );
};

export default ChatHeader