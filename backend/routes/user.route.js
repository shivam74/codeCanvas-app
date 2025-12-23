import { Router } from "express";

const router=Router();

router.get("/test",(req,res)=>{
    res.status(200).json({user_router:"shivam"})
})

export default router;