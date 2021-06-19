import jwt from 'jsonwebtoken'
import HandleResponse, { Messages } from '../utils/handleResponse'
import User from '../orm/user'
import { hasKey} from '../utils/utisl'

let authentication =async(req:any,res:any,next:any)=>{
   try{
       if(!req.cookies.JWT)
       {
            return HandleResponse(res,Messages.UNAUTHENTICATED,'error')
       }
        const JWT = req.cookies.JWT 
        let verified_user = await jwt.verify(JWT,`process.env.JWT_SECRET`)
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
      return HandleResponse(res,e.message,'error')
   }
}
export default authentication