import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    vin: {
        type: String,
        required: true
    },
    vehiclePhoto: {
        type: [String],
        required: true,
        validate: {
          validator: function(value) {
            return value.length === 2;
          },
          message: 'Vehicle must have exactly 2 photos.'
        }
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    engineNumber: {
        type: String,
        required: true,
        unique: true,
    },
    manufacutureData: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ['Truck', 'Bus', 'Car', 'Motercycle'],
        required: true,
    },
    fuelType: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric', "Petrol"],
        required: true
    },
    vehiclePurchaseProof: {
        type: String,
        required: true
    },
    licencePlate: {
        type: String,
        unique: true,
    }
},
{
    timestamps: true,
})

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);