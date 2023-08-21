import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'], // an array where the first ele is true & then the actual message
        required: [true, 'Email is required!'],
    },

    username: {
        type: String,
        required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
        match: [/^(?=.{1,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 1-30 alphanumeric letters and be unique!"]
    },

    image: {
        type: String,
    }
});

// check if the model is there for the 'User'. Only if it is not there, create a new model for that 'User'
const User = models.User || model("User", UserSchema);

export default User;
