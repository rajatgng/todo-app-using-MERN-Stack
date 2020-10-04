import {ITodo} from "../types"
import {model, Schema} from "mongoose"

const todoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: Boolean,
            required: true,
        },
    },
    {timestamps: true}
)

todoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


export default model<ITodo>("Todo", todoSchema)