import express from 'express' 
import { loginHandler , regsterHandler } from '../controller/user.controller'
import validate from '../middelware/validate'
import { loginSchema, regsterSchema } from '../zodSchema/user.zodSchema'

const router = express.Router()

router.post('/regster',validate(regsterSchema),regsterHandler)
router.post('/login',validate(loginSchema),loginHandler)
export default router