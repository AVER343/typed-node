import {Response } from 'express'
import { ValidationError } from 'express-validator'
import { ResponseType } from '../interfaces/response'
export enum Messages{
   UNAUTHORIZED = 'User has not yet been authorized.Contact admin .',
   USER_NOT_EXIST = 'User does not exist .',
   LOGGED_OUT = 'Successfully logged out !',
   EMAIL_NOT_VERIFIED ='Email has not yet been verified !',
   SIGNED_UP='Successfully signed up !',
   USERNAME_TAKEN='Username already taken !',
   WRONG_OR_EXPIRED_OTP ='Invalid OTP or OTP expired !',
   EMAIL_ALREADY_IN_USE= 'You already have an account with us !',
   OTP_SENT='OTP has been sent to your email',
   UNAUTHENTICATED='Unauthenticated ! ',
   USER_UPDATED_USING_OTP='Updated user !',
   USER_VERIFIED='Verified user !'
}
const HandleResponse=(res:Response,messages:Messages|ValidationError[],type:ResponseType|null)=>{
   ///handling express validators
   if(typeof messages ==='object')
   {
      let message
      for(message in messages)
      {
         return res.send({messages:messages.map((e:ValidationError)=>({message:e.msg,type}))})
      }
   }
   return res.send({messages:[{message:messages,type}]})
}
export default HandleResponse