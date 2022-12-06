import { z } from "zod";

export const regsterSchema = z.object({
    body:z.object({
        username:z.string({required_error:'username is required'})
        .min(2,'more than 2')
        .max(17,'must be less than 15'),
        password:z.string({required_error:'password is required'})
        .min(3,'more than 3')
        .max(12,"less than 12"),
        email:z.string({required_error:'email is required'})
        .email('Please enter a valid email')
    })
})

export const loginSchema = z.object({
    body:z.object({
        username:z.string({required_error:"username is required"})
        .min(3,'more than 3'),
        password:z.string({required_error:'password is required'})
    })
})