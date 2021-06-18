import express ,{NextFunction, Response} from 'express'
import authentication from '../../../middleware/auth'
import set_API_NAME from '../../../middleware/setAPIName_checkpermission'
import HandleResponse from '../../../utils/handleResponse'
import { API_NAMES } from '../../../utils/roles'
const Me = express.Router()
Me.post('*/me',
          authentication,
          set_API_NAME(API_NAMES.ME),
        async(req:any,res:Response,Next:NextFunction)=>{
           try{ 
                return res.send(req.user)
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !','error')
           }
    })
    export default Me