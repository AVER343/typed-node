import express from 'express'
import AdminRouter from './admin-routes'
import UserRouter from './user-routes'

const RouterConfig = express.Router()

RouterConfig.all('/users/*',UserRouter)
RouterConfig.all('/admin/*',AdminRouter)
export default RouterConfig