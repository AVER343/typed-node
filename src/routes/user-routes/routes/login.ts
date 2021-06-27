import express ,{Request,Response} from 'express'
import {body,validationResult} from 'express-validator'
import User from '../../../orm/user'
import HandleResponse, { Messages } from '../../../utils/handleResponse'
// import { ROLES } from '../../../utils/roles'

const Login = express.Router()
Login.post('*/login',
        body('email').isEmail().withMessage(('Invalid email !')),
        body('password').isLength({min:5}).withMessage(('Invalid password !')),
        async(req:Request,res:Response)=>{
           try{
                let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),{type:'error',statusCode:400})
                }
                let user  = (await User.findOne(req.body))
                if(!user)
                {
                    return HandleResponse(res,Messages.USER_NOT_EXIST,{type:'error',statusCode:400})
                }
                if(!user.getUser()['user_verified'])
                {
                    return HandleResponse(res,Messages.EMAIL_NOT_VERIFIED,{type:'error',statusCode:400})
                }
                let JWT = await user.setJWT()
                // console.log()
              return res.cookie('JWT',JWT,{maxAge:120*60*1000}).send(user.getUser())
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
        }
    })
    export default Login