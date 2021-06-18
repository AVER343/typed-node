import express ,{Request,Response} from 'express'
import {body,validationResult} from 'express-validator'
// import set_API_NAME from '../../../middleware/setAPIName_checkpermission'
import User from '../../../orm/user'
// import { BULL_QUEUES } from '../../../services'
import HandleResponse from '../../../utils/handleResponse'
// import { API_NAMES } from '../../../utils/roles'
const Signup = express.Router()
Signup.post('*/signup',
        body('username').isEmail().withMessage(('Invalid email !')),
        body('password').isLength({min:5}).withMessage(('Invalid password !')),
        body('confirm_password').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password');
            }
            return true;
          }),
        async(req:Request,res:Response)=>{
           try{
                let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),'error')
                }
                let user  =await User.findOne(req.body)
                if(user)
                {
                return HandleResponse(res,'User already exists !','error')
                }
                //user doesnt exist ,then save (creates new)
                let new_user = new User(req.body)
                await new_user.save()
                let OTP = await User.getOTP(req.body.username!)
                User.sendEmail({email:req.body.username,OTP:OTP},undefined,new_user.getUser().id)
            return HandleResponse(res,'Successfully signed up !','success')
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !','error')
           }
    })
    export default Signup