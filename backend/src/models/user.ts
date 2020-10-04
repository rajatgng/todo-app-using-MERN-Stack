import {IUser} from "../types"
import {model, Schema} from "mongoose"

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
)

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.isAdmin;
    }
});

export default model<IUser>("User", userSchema)