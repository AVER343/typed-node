import { User_Interface } from "../interfaces/user";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Server from "../server";
import { BULL_QUEUES } from "../services";
import { QUEUE_TYPE } from "../services/bull/utils/queue-names";
import { randomNumber } from "../utils/utisl";
import { ROLES } from "../utils/roles";
const hasKey = (obj:any,key:string)=>{
    return obj && obj[key]
}
class User{
    static pool = Server.pool;
    private user:User_Interface;
    constructor(user:User_Interface){
        this.user = user;
    }
    public getUser(){
        return this.user
    }
    static  async findOne(user:User_Interface){
        let query=`SELECT username,created_time,id,modified_time,user_verified,USER_ROLE_TYPE_ID FROM USERS `;
        let args:string[]= []
        let argumentsCanBeSearched= ['username'] // Add the keys that you want the unique columns for.
        argumentsCanBeSearched.forEach((e)=>{
            if(hasKey(user,e))
            {
                if(args.length==0)
                {
                    query = query + ' WHERE '
                }
                else{
                    query = ' or '
                }
                args.push(hasKey(user,e))
                query = query + (e).toString() +`= $${args.length}` ;
            }
        })
        query = query + ' LIMIT 1 ;'
       let result =  await User.pool.query(query,args)
        return result.rows[0] 
                ? new User(result.rows[0])
                : null 
    }
    public async setJWT(){
            const JWT = await jwt.sign(this.user,'process.env.JWT_SECRET');
            this.user.jwt = JWT;
            return JWT
    }
    public async save(){
       try{
            const user = await User.findOne(this.user)
            if(!user)
            {
                await this.createUser(this.user);

                await this.deleteFields()

            }
            else{
               await this.updateUser(this.user)
               await this.deleteFields()
            }
       }
       catch(e:any){
            throw new Error(e.message)
       }
    }
    public async deleteFields(){
        try{
            let onlyFields = ['username','created_time','id','modified_time','user_verified','user_role_type_id']
            let new_obj:any = {}
            onlyFields.forEach((e)=>{
                new_obj[e]=hasKey(this.user,e)
            })
            this.user = new_obj
        }
        catch(e:any){
             throw new Error(e.message)
        }
     }
    public  async createUser(user:User_Interface){
       try{
            let encryptedPassword = await bcrypt.hash(user.password!,8)
            let saved_user = await User.pool.query(`INSERT INTO 
                                                    USERS(username,password,created_time,modified_time,user_role_type_id) 
                                                    VALUES($1,$2,now(),now(),(SELECT id from USER_ROLE_TYPE WHERE user_role= $3)) returning *`,
                                                    [user.username,encryptedPassword,ROLES.DEFAULT])
            this.user = new User(saved_user.rows[0]).getUser()
       }
       catch(e:any){
            throw new Error(e)
       }
    }  
    public async updateUser(user:User_Interface){
        // let canUpdateUserInfo =['password'] 
        let updated_user 
        if(user.password)
        {
            user.password = await bcrypt.hash(user.password!,process.env.HASH_PASSWORD!)
            updated_user = await User.pool.query(`UPDATE USERS 
                                                SET password = $2
                                                WHERE id = $1 
                                                returning *`,[user.id,user.password])
           delete updated_user.rows[0]['password']
            this.user={}
           this.user = (new User(updated_user.rows[0])).getUser()
        }
       
    }
    static async sendEmail(data:{email:string,OTP:string},priority:number|undefined=3,user_id:number|null=null){
        let queue_type:QUEUE_TYPE= `SEND_EMAIL_HIGH_PRIORITY`
        await Server.pool.query('BEGIN')
        //    let addedActiveJobsInQueue =  await Server.pool.query('INSERT INTO QUEUE_ACTIVE(type,data,user_id) VALUES($1, $2::JSONB, $3) returning id;',
        //                                     [queue_type,{email},user_id]  )
         let saved_job=  await Server.pool.query('INSERT INTO JOB_TABLE(type,data,user_id) VALUES($1, $2::JSONB, $3) returning id;',
                                        [queue_type,data,user_id]  )
        await Server.pool.query('COMMIT');
        BULL_QUEUES.publisher(queue_type,data,{priority,jobId:saved_job.rows[0]['id']})
    }
    static async getOTP(username:string){
        try{
            let OTP = randomNumber(6)
            await Server.pool.query('BEGIN')
            await Server.pool.query('INSERT INTO USER_OTP(OTP,username) VALUES($1,$2);',[OTP,username])
            await Server.pool.query('COMMIT')
            return OTP
        }
        catch(e:any){
            throw new Error(e.message||'Something went wrong with OTP !')
        }
    }
}
export default User