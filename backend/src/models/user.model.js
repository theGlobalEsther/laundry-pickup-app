import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      minlength: [10, "Phone number is too short"],
      maxlength: [12, "Phone number is too long"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["customer", "staff", "delivery_agent", "admin"],
      default: "customer",
    },

    address: {
      street: String,
      city: String,
      state: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true 
 }
);

const User = mongoose.model("User", userSchema);
export default User;
