import { Company } from "../models/company.model.js";

export const registerCompany = async(req, res)=>{
    try {
         const {companyName}= req.body;

         if(!companyName){
            return res.status(400).json({
                msg:'Company name is required'
        ,
        success:false
            })
         };

         let company = await Company.findOne({name:companyName})

         if(company){
            return res.status(400).json({
                msg:'You cannot register same company',
                success:false
            })
         };
         company= await Company.create({
            name:companyName,
            userId:req.id
         });
         return res.status(201).json({
            msg:'Company registred successfully',
            company,
            success:true
         })
    } catch (error) {
     console.log(error);
        
    }
}


//get alll companies

export const getCompany= async(req, res)=>{
    try {
         const userId = req.id;  //logged in user id
         const companies= await Company.find({userId});

         if(!companies){
            return res.status(400).json({
                msg:'Companies not found',
                success:false
            })
         };

         return res.status(200).json({
            msg:'Companies list get succefully',
            companies,
            success:false
         });
    } catch (error) {
       console.log(error);
        
    }
}

//get company By Id
export const getCompanyById = async (req, res) => {
    try {
        const companyId= req.params.id;
        const company= await Company.findById(companyId);

        if(!company){
            return res.status(400).json({
                msg:'Company not found',
                success:false
            })
        };
        return res.status(200).json({
            msg:'Company got succefully',
            company,
            success:true
        })
    } catch(error) {
        console.log(error);
        
    }
};

//update info of company

export const updateCompany = async(req, res)=>{
    try {
        const {name , description ,website , location}= req.body;
        //  const {file}=req.file;
         //idahr cloudanary

         const updateData={name , description ,website , location};


        let company;

       const  userFound= await Company.findById(req.params.id);

       if(userFound.userId == req.id){
        company= await Company.findByIdAndUpdate(req.params.id , updateData, {new:true});  
       }
    
         if(!company){
            return res.status(404).json({
                msg:'Company not found',
                success:false
            })
         };

         return res.status(200).json({
            msg:'Company information updated',
            company, 
            success:true
         })
    } catch (error) {
        console.log(error);
        
    }
}