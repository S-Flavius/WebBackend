import { connect, disconnect, model, Schema } from "mongoose";
import { userSchema, UserType } from "../schemes/user.schema";

const userSchema = new Schema<UserType>({
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true }
});


const User = model<UserType>('User', userSchema);

export async function addToDb(userObject: UserType) {
    await connect("mongodb://fsecheli:fsecheliP@ux5:27017/fsecheli");
    await new User(userObject).save();
    disconnect;

    return "User added";
}

export async function removeUser(userObject: UserType) {
    await connect("mongodb://fsecheli:fsecheliP@ux5:27017/fsecheli");
    await User.findOne(userObject).remove();
    disconnect;

    return "removed";
}

export async function getUser(userObject: UserType) {
    await connect("mongodb://fsecheli:fsecheliP@ux5:27017/fsecheli");
    let user = await User.findOne(userObject);
    disconnect;

    return user;
}

export async function getUsers(): Promise<UserType[]> {
    await connect("mongodb://fsecheli:fsecheliP@ux5:27017/fsecheli");
    let users = await User.find({});
    disconnect;

    return users;
}
