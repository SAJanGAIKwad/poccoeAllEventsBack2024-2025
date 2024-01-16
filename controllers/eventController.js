import Event from "../Models/event.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createEvent = asyncHandler(async (req,res)=>{

    // const organizer = req.user.id;

   const {title,description,date,location} = req.body;

   if(!title || !description ||  !location ){
       console.log("Please fill all the details!!");
       throw new Error("Please fill all the details!!");
   }

   const newEvent= new Event({
       title,
       description,
    //    category,
       date,
       location,
    //    organizer,
    //    image
   });

   try{
       await newEvent.save();

       res.status(201).json(
           {
               _id: newEvent._id,
               title: newEvent.title,
               description: newEvent.description,
               category: newEvent.category,
               date: newEvent.date,
               location: newEvent.location,
               organizer: newEvent.organizer,
               image: newEvent.image
           });

   } catch(error){
       res.status(400)
       console.log("invalid data")
       throw new Error("Invalid Data!")
   }
});





const getAllEvents = asyncHandler(async (req,res)=>{
    const events = await Event.find({});
    res.json(events);
});

export {getAllEvents,createEvent};
