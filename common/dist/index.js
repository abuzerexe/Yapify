"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogInput = exports.updateBlogInput = exports.createBlogInput = exports.signupInput = exports.signinInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Enter a Valid Email." }).min(3, { message: 'Must have at least 3 character' }).max(20, { message: 'Username cannot have more than 20 character' }).trim().toLowerCase(),
    password: zod_1.default.string().min(3, { message: 'Must have at least 3 character' }).max(30, { message: 'Password cannot have more than 30 character' })
        // .regex(passwordValidation, {message: 'Your password is not valid',})
        .trim(),
    name: zod_1.default.string().min(1, { message: 'Must have at least 1 character' }).trim()
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(3, { message: 'Must have at least 3 character' }),
    content: zod_1.default.string().min(3, { message: 'Must have at least 3 character' })
});
exports.updateBlogInput = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional()
});
exports.deleteBlogInput = zod_1.default.object({
    blogId: zod_1.default.string()
});
