const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },

    deliveryAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pickupStatus: {
      type: String,
      enum: ["pending", "picked_up"],
      default: "pending",
    },

    deliveryStatus: {
      type: String,
      enum: ["pending", "out_for_delivery", "delivered"],
      default: "pending",
    },

    pickedUpAt: {
      type: Date,
    },

    deliveredAt: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);