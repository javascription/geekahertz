import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: [true, "Username is required!"],
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ],
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    }
}, { timestamps: true });

const User = (mongoose.models.User as mongoose.Model<UserDocument>) || mongoose.model<UserDocument>('User', userSchema);
export default User;
