import express from 'express'
import { connectDB } from './config/db'
import authRouter from './router/user.router'
import blogRouter from './router/blog.router';
import 'dotenv/config'
import cors from 'cors'

const port = 5045
const app = express()
app.use(express.json())
app.use(cors())

connectDB()
app.use('/api/v1/user',authRouter)
app.use('/api/v1/blog',blogRouter)

app.listen(port,()=>{
    console.log(`srever is ${port}`)
})