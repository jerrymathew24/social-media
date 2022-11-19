import  Express  from "express";

const router = Express.Router()

router.get('/', async(req, res)=>{res.send("Auth Route")})

export default router