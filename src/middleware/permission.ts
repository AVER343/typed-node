import { Response ,Request, NextFunction} from "express";
// import Server from "../server";
import HandleResponse from "../utils/handleResponse";
import { ROLES } from "../utils/roles";
const hasPermission=(roles:ROLES[]=[])=>{

    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authorize based on user role
        (req:Request,res:Response,next:NextFunction) => 
        {
            if(roles.includes(ROLES.ADMIN))
                {
                    return HandleResponse(res,'UNAUTHORIZED ! Contact admin for permissions !','error')
                }
            // authentication and authorization successful
           return next();
        }
    ];
}
export default hasPermission