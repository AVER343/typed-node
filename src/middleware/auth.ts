import jwt from 'jsonwebtoken'
import HandleResponse, { Messages } from '../utils/handleResponse'
import User from '../orm/user'
import { hasKey} from '../utils/utisl'

let authentication =async(req:any,res:any,next:any)=>{
   try{
       if(!req.header('Authorization'))
       {
        throw new Error(Messages.UNAUTHENTICATED)
       }
        const token = req.header('Authorization').replace('Bearer ','')
        let verified_user = await jwt.verify(token,`process.env.JWT_SECRET`)
        if(!verified_user)
            {
                throw new Error('Verification failed . Please login again.')
            }
        let user = await User.findOne({email:hasKey(verified_user,'email')})
        if(!user)
            {
                throw new Error('User does not exist !')
            }
        if(!user.getUser()['user_verified'])
        {
            throw new Error('User has not yet been verified !')
        }
        req.user = user.getUser()
        return next()
   }
   catch(e:any)
   {
      return HandleResponse(res,e.message,{type:'error',statusCode:400})
   }
}
export default authentication