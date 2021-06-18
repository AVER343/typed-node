import express ,{Request,Response} from 'express'
// import set_API_NAME from '../../../middleware/setAPIName_checkpermission'
import HandleResponse from '../../../utils/handleResponse'
// import { API_NAMES } from '../../../utils/roles'
const Logout = express.Router()
Logout.post('/users/logout',
        // set_API_NAME(API_NAMES.LOGOUT),
        async(req:Request,res:Response)=>{
           try{
               await res.clearCookie('JWT')
              return HandleResponse(res,'Successfully logged out !','success')
           }
           catch(e:any){
            return HandleResponse(res,e.message||'Something went wrong !','error')
        }
    })
    export default Logout