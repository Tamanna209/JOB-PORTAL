import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/Constant";
import { toast } from "sonner";
import axios  from "axios";

const Signup = () => {
  const [input, setInput]=useState({
    fullName:"",
    email:'',
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });

  const navigate=useNavigate();
  const changeEventHandler= (e)=>{
    setInput({...input, [e.target.name]:e.target.value})
  }

  const changeFileHandler=(e)=>{
     setInput({...input, file:e.target.files?.[0]})
  }
  const submitHandler=async(e)=>{
   e.preventDefault();
  //  console.log(input);
  const formData=new FormData();
  formData.append("fullName", input.fullName);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("password", input.password);
  formData.append("role", input.role);
  if(input.file){
    formData.append("file", input.file)
  }
  try {
    const res=await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
    });
    console.log("before toasting");
    console.log(res.data.success);
    if(res.data.success){
      navigate("/login");
      console.log("got it ")
       toast.success(res.data.message);
    }
    console.log("after toasting");
  } catch (error) {
    console.log(error);
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred");
    }
}

  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" value={input.fullName} name="fullName" onChange={changeEventHandler} placeholder="Tamanna" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" value={input.email}  name="email" onChange={changeEventHandler} placeholder="tamanna@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="+91 xxxx xxx" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="****" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className='flex items-center gap-4 my-5' >
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='student' checked={input.role === 'student'} onChange={changeEventHandler} id='r1'/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                 <Input type='radio' name='role' value='recruiter'  checked={input.role === 'recruiter'} onChange={changeEventHandler} id='r2'/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input type='file' onChange={changeFileHandler} accept='image/*' className='cursor-pointer'/>
            </div>
          </div>
          <Button type='submit' className='w-full my-4 cursor-pointer'>Signup</Button>
          <span className="text-sm">Already have an Account ? <Link to='/login' className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
