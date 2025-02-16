import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const applyJob= async(req, res)=>{
    try {
        const userId= req.id;
        const jobId= req.params.id;
         
        if(!jobId){
            return res.status(400).json({
                msg:'Job id is reuired',
                success:false
            })
        };
        //check if the user already applied or not
        const exisitingApplication= await Application.findOne({job:jobId, applicant:userId});
        if(exisitingApplication){
            return res.status(400).json({
                msg:'You have already applied for this job',
                success:false
            })
        };
        //check if the jobs exist 
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                msg:'Job not found',
                success:false
            })
        };
        //create a new application
        const newApplication=await Application.create({
            job:jobId,
            applicant:userId
        })
        job.application.push(newApplication._id);
        await job.save();
        return res.json({
            msg:'Job Aplied succesfully',
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }

    
};



//see/get all applied applicants
export const getAppliedJobs=async(req, res)=>{
    try {
        const userId= req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',  //tihs name us  be same in the job.model key name "if comoany then give it, and if company2 then give it this
                options:{sort:{createdAt:-1}}
            }      
        }); //give in ascendign order

        if(!application){
            return res.status(404).json({
                msg:'No application',
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
};



//get all applicants for admins/recruiters
export const getApplicants= async(req, res)=>{
  try {
    const jobid=req.params.id;
    const job=await Job.findById(jobid).populate({
        path:'application',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'applicant'
        }
    });
    if(!job){
        return res.status(404).json({
            msg:'Job not found',
            success:false
        })
    };
    return res.status(200).json({
        job,
        success:true
    })
  } catch (error) {
    console.log(error);
    
  }
}

//update status
export const updateStatus=async(req, res)=>{
    try {
        const {status}=req.body;
        const applicationId= req.params.id;
        if(!status){
            return res.status(400).json({
                msg:'Status is required',
                success:false
            })
        }
        //find the application by applicant id
        const application=await Application.findOne({_id:applicationId});

        if(!application){
            return res.status(404).json({
                msg:'application not found',
                success:false
            })
        };
        //update  the status
        application.status= status.toLowerCase();
        await application.save();

        return res.status(200).json({
            msg:'Status updated succefully',
            success:true
        });

    } catch (error) {
        console.log(error);
        
    }
}