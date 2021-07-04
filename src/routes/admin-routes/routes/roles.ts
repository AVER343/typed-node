import express ,{ Request,Response} from 'express'
import {body,validationResult} from 'express-validator'
import authentication from '../../../middleware/auth'
import set_API_NAME from '../../../middleware/setAPIName_checkpermission'
import User from '../../../orm/user'
import Server from '../../../server'
import HandleResponse, { Messages } from '../../../utils/handleResponse'
import { API_NAMES, ROLES } from '../../../utils/roles'

const Roles = express.Router()
Roles.post('*/roles',
        authentication,
        set_API_NAME(API_NAMES.POST_ROLE),
        body('email').isEmail().withMessage(('Invalid email !')),
        body('user_role').isString().custom((value:string, { req }) => {
            if (!Object.keys(ROLES).includes(value.toUpperCase())) {
              throw new Error('Role doesnt exist !');
            }
            return true;
          }),
        async(req:Request,res:Response)=>{
        try{
                let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),{type:'error',statusCode:400})
                }
            let {email,user_role}:{email:string,user_role:string} = req.body
            let user = await User.findOne({email})
            if(!user)
            {
                return HandleResponse(res,Messages.USER_NOT_EXIST,{type:'error',statusCode:400})
            }
            await Server.pool.query(`UPDATE USERS 
                                     SET user_role_type_id=(SELECT id FROM USER_ROLE_TYPE WHERE user_role=$2) 
                                     WHERE id=$1`,
                                [user.getUser()['id'],user_role.toUpperCase()])
            user = await User.findOne({email})
            return res.send(user?.getUser())
        }
        catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !',{type:'error',statusCode:400})
        }
        })
Roles.get('*/roles',
        authentication,
        set_API_NAME(API_NAMES.GET_ROLE),
        async (req:Request,res:Response)=>{
            try{
                let result = validationResult(req)
                if(!result.isEmpty())
                {
                    return HandleResponse(res,result.array(),{type:'error',statusCode:400})
                }
                let roles = await Server.pool.query('SELECT * FROM USER_ROLE_TYPE; ')
                return res.send(roles)
            }
            catch(e:any){
                return HandleResponse(res,e.message,{type:'error',statusCode:400})
            }
        })
    export default Roles