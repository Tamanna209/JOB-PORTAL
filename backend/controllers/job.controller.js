import { Job } from "../models/job.model.js";


//code to created job
export const postJob= async(req, res)=>{
    try {
       const {title, description, requirements, salary, location, jobType, experience, position, companyId}=req.body; 

        const userId= req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position  || !companyId){
            return res.status(400).json({
                msg:'Something is missing , fill all details',
                success:false
            })
        };

        const job= await Job.create({
            title,
            description, 
            requirements: requirements.split(","), 
            salary:Number(salary),
            location, 
            jobType, 
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
        })

     return res.status(201).json({
        msg:'New job created succesfully',
        job,
        success:true
     });

    } catch (error) {
        console.log(error);
        
    }
}


//get all jobs

export const getAllJobs= async(req, res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query={
            $or:[
                { title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        };

        const jobs=await Job.find(query).populate({
            path:"company"
        }).populate({path:"created_by"}).sort({createdAt:-1})
         if(!jobs){
            return res.status(404).josn({
                msg:'Job not found',
                success:false
            })
         }
         return res.status(200).json({
            msg:'',
            jobs,
            success:true
         })
    } catch (error) {
        console.log(error);
        
    }
};


//get a job for  student/user
export const getJobById = async(req, res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                msg:'Job noot found',
                success:false
            })
        };

        return res.status(200).json({
            msg:'',
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
};


//for admin now/recruiter
export const getAdminJObs = async(req, res)=>{
    try {
        const adminId= req.id;
        const jobs=await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                msg:'Job not found',
                success:false
            })
        };

        return res.status(200).json({
            msg:'',
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}