import express ,{Request,Response} from 'express'
import {body,validationResult} from 'express-validator'
import User from '../../../orm/user'
import HandleResponse from '../../../utils/handleResponse'
// import { ROLES } from '../../../utils/roles'

const Login = express.Router()
Login.post('/users/login',
        body('email').isEmail().withMessage(('Invalid email !')),
        body('password').isLength({min:5}).withMessage(('Invalid password !')),
        async(req:Request,res:Response)=>{
           try{
                let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),'error')
                }
                let user  = (await User.findOne(req.body))
                if(!user)
                {
                    return HandleResponse(res,'User does not exist !','error')
                }
                if(!user.getUser()['user_verified'])
                {
                    return HandleResponse(res,'Email has not yet been verified !','error')
                }
                let JWT = await user.setJWT()
                // console.log()
              return res.cookie('JWT',JWT,{maxAge:120*60*1000}).send(user.getUser())
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !','error')
        }
    })
    export default Login