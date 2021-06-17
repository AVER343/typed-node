import express, { Router } from 'express'
import { Pool } from 'pg';
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import Bull from 'bull'
import pool from './db/database-connection';
import { BULL_QUEUES } from './services';
// import { job } from './interfaces/user';
import { sendMail } from './utils/send_email';
import { QUEUES } from './services/bull/utils/queue-names';
// import { QUEUE_NAME } from './services/bull/utils/queue-names';
class Server{
    private app;
    static PORT:number;
    static pool:Pool= pool;
    constructor(PORT:number)
        {
            Server.pool = pool
            this.app = express()
            this.confiureServices()
            this.configureServer()
            this.startServices()
            Server.PORT = PORT
        }
    public useRoutes(router:Router){
        this.app.use(router)
    }
    start(){
        this.app.listen(Server.PORT,()=>{
            console.log(`Server running at ${Server.PORT}`)
        })
    }
    private configureServer(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cookieParser())
        this.app.use(cors({credentials:true,origin:true}))
        this.app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Credentials', `true`);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            })
    }
    private confiureServices(){
        new BULL_QUEUES()
    }
    private async startServices(){
        //add types to database
       await Promise.all(QUEUES.map(e=>{
                Server.pool.query('INSERT INTO QUEUE_TYPES("type",priority) VALUES($1,$2);',
                        [e.queue_name,e.queue_priority]).catch(e=>{})
            }))
        //setup listeners for corresponding types
        BULL_QUEUES.listener(`SEND_EMAIL_HIGH_PRIORITY`,async(job:any)=>{
            const data:{email:string} = job.data
            await sendMail(data.email,{subject:'',text:`<h1>MY NAME</h1>`})
        })
        BULL_QUEUES.completion(`SEND_EMAIL_HIGH_PRIORITY`,async(job)=>{
          try{
            await Server.pool.query('BEGIN')
            await  Server.pool.query('UPDATE JOB_TABLE SET completed = true where id =$1::bigint',[job.id])
            // await  Server.pool.query('DELETE FROM QUEUE_ACTIVE where id =$1::bigint',[job.id])
            await Server.pool.query('COMMIT')
            job.remove()
          }
          catch(e){
              console.log(e)
          }
        })
    }
}
export default Server