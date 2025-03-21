import jwt from 'jsonwebtoken';

const isAuthenticated= async(req, res, next)=>{
    try{
      const token=req.cookies.token;

      if(!token){
        return res.status(401).json({
            msg:'User not Authenticated, Please login first',
            success:false
        })
      };
      const decode = await jwt.verify(token , process.env.SECRET_KEY);
      if(!decode){
        return res.status(401).json({
            msg:'Invalid token',
            success:false
        })
      };

      req.id= decode.userId;
      next();
    }catch(err){
        console.log(err);
        
    }
}

export default isAuthenticated; 