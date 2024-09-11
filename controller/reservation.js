import ErrorHandler from "../error/error.js";

import { Reservation} from "../models/reservationSchema.js";

export const sendReservation= async(req,res,next)=>{
    const {firstName,lastName,email,phone,date,time}= req.body;
    if (!firstName||!lastName || !email || !phone || !date ||!time){
        return next(new ErrorHandler("Please Fill full reservation Form!",400));
    
    }
    try{
        await Reservation.create({firstName,lastName,email,phone,date,time});
        res.status(200).json({
            success: true,
            message: "Reservation Sent Successfully"
        });

    } catch (error){
        if(error.name === "Validation Error"){
         const validationErrors =object.values(error.errors).map(
            (err) => err.message
         );
         return next(new ErrorHandler(validationErrors.join(" , "),400));
        }

        return next(error);

    }
}