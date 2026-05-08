import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
  
    firstName: {
      type: String,
      trim: true,
    },
    mobNumber: {
      type: String,
     
    },
    gender: {
      type: String,
     
      enum: ["Male", "Female"],
    },
    address: {
      type: String,
     
      trim: true,
    },
    age: {
      type:String,
    
    },
   
    roomNum: {
      type: String,
    
    },
    appDate: {
      type: Date,
    
    },
    time: {
      type: String,
     
    },
    healthIssue: {
      type: String,
    
      trim: true,
    },

    
    bookingStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

  
    doctorNote: {
      type: String,
      default: "",
      trim: true,
    },
    medicines: [
      {
        name: {
          type: String,
          trim: true,
        },
        dosage: {
          type: String,
          trim: true,
        },
      },
    ],
    followUp: {
      type: String,
      default: "",
      trim: true,
    },
    
reportSent: {
  type: Boolean,
  default: false,
},
  },
  { timestamps: true }
);

const AppointmentofDoctor = mongoose.model("Doctor-appointment", appointmentSchema);

export default AppointmentofDoctor;