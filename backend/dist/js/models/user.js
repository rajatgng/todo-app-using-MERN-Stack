"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.isAdmin;
    }
});
exports.default = mongoose_1.model("User", userSchema);
