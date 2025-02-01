import { Camera, Mail, User } from "lucide-react"
import { useAuthStore } from "../Store/useAuthStore"
import { useState } from "react"

const ProfilePage = () => {
  const { updateProfile , isUpdatinProfile , authUser } = useAuthStore()
  const [selectedImage , setSelectedImage] = useState(null);

  // handle submit function
  const handleSubmitProfile = (e) => {
   const file = e.target.files[0];
   if(!file) return ;

   const reder = new FileReader();

   reder.readAsDataURL(file);
   
   reder.onload = async () => {
    const selectImage = reder.result;
    setSelectedImage(selectImage);
    await updateProfile ({ProfilePic : selectImage});
   }
  };


  return (
    <div className="h-auto pt-20">
      <div className="max-w-2xl mx-auto p-4 py-4">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
          <h1 className="text 2xl font-semibold">Profile</h1>
          <p className="mt-3">Your profile information</p>
        </div>

        {/* profile upload section */}

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
          <img 
            src={selectedImage || authUser.ProfilePic || "/avatar.png"} 
            alt="profile"
            className="size-32 rounded-full object-cover border-4"
          />
            <label
               className={`
                absolute bottom-0 right-0
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer
                transition-all duration-200
                ${isUpdatinProfile ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <Camera className="w=5 h-5 text-base-200" />
              <input 
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleSubmitProfile}
                disabled={isUpdatinProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatinProfile ? "updating..." : "click the camera icon for to update your photo"}
          </p>
        </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
               <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-4" />
                 Full Name
               </div>
               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser.fullname}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-4" />
                Email Addrass
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser.email}</p>
            </div>
          </div>

          <div className="mt-3 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage