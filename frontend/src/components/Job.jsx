import React from "react";
import { Button } from "./ui/button";
import { BookmarkCheck } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import comapnyLogo from "../assets/novem-logo.jpg";
import { Badge } from "./ui/badge";
const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
      <div className="flex  items-center justify-between">
        <p className="text-sm text-gray-500">2 Days ago</p>
        <Button variant='outline' className="rounded-full" size="icon">
          <BookmarkCheck />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={comapnyLogo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-md text-lg ">Novem Controls</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>
      <div className="">
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur beatae unde cumque adipisci officia at veritatis nemo
          omnis dolores.
        </p>
      </div>
          <div className="flex items-center gap-2 mt-4">
             <Badge className={'text-blue-700 font-bold'} variant='ghost'>12 Positions</Badge>
                     <Badge className={'text-[#F83002] font-bold'} variant='ghost'>Part Time</Badge>
                     <Badge className={'text-[#7209B7] font-bold'} variant='ghost'>24 LPA</Badge>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <Button variant='outline'>Details</Button>
            <Button className='bg-[#7209B7]'>Save for Later</Button>
          </div>
       </div>
  );
};

export default Job;
