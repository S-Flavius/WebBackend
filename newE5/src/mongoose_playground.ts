import { Schema, model, connect, disconnect } from "mongoose";
import { UserType } from "./schemes/user.schema";
import bcrypt from 'bcrypt';

const userSchema = new Schema<UserType>({
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true }
});

const User = model<UserType>('User', userSchema);

run().catch(err => console.log(err)).finally(async () => await disconnect());

async function run() {
    await connect('mongodb://fsecheli:fsecheliP@ux5:27017/fsecheli');

    // let userObject: UserType = {
    //     email: "papst@vatikan.va",
    //     firstname: "Franziskus",
    //     lastname: "Bergoglio",
    //     password: await bcrypt.hash('Amen', 10)
    // };

    // const user = new User(userObject);
    // await user.save();

    // console.log(user.email);

    let papst = await User.findOne({ "firstname": "Franziskus" });

    console.log(papst?.email);


    disconnect;
};
