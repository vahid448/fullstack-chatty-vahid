import { useState } from "react";
import { MessagesSquare, User, Mail, EyeOff, Eye, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import ImagePattern from "../Components/ImagePattern";
import toast from "react-hot-toast";
import { useAuthStore } from "../Store/useAuthStore";

const SignUppage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const {signup , isSigningUp} = useAuthStore();



  // validation function
  const validateForm = () => {
    if(!formData.fullname.trim()) return toast.error("full name is sequired");
    if(!formData.email.trim()) return toast.error("email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password) return toast.error("password is required");
    if(formData.password.length < 6 ) return toast.error("password must be at least 6 characters");

    return true;
     }


  // handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const succuess = validateForm();
    if(succuess === true) signup(formData)

  };



  return (
    <div className="min-h-screen grid lg:grid-cols-2 mt-7">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12  rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessagesSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Started With Your Free Account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="form-contro m-0" style={{ margin:0 }}>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="vahid"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-contro mt-0"style={{ margin:0 }}>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-contro mt-0" style={{ margin:0 }}>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="•••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-base-content/40" />
                  ) : (
                    <Eye className="w-5 h-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin " />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

   <div className="text-center">
      <p className="text-base-content/60">
        Already have an account ? {" "}
        <Link to="/login" className="link link-primary">
          Sign in
        </Link>
      </p>
    </div>

   </div>
  </div>

{/* right section */}
   
   <ImagePattern 
    title="join our community"
    subtitle="Connect with friends, share moments, and stay be happy"
   />
  
    </div>
  );
};

export default SignUppage;
