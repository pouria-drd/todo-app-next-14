"use server";

import connectDB from "@/lib/mongodb";

import bcrypt from "bcryptjs";
import User from "@/models/User";

export const register = async (values: any) => {
    const { username, password } = values;

    try {
        await connectDB();

        const userFound = await User.findOne({ username });

        if (userFound) {
            return {
                error: "User with this username already exists!",
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await user.save();
    } catch (e) {
        console.log(e);
    }
};
