import express ,{Request,Response} from 'express'
import HandleResponse from '../../../utils/handleResponse'
const Logout = express.Router()
Logout.post('/users/logout',
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