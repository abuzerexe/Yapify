"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogInput = exports.updateBlogInput = exports.createBlogInput = exports.signupInput = exports.signinInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid Email" }),
    password: zod_1.default.string().min(3, { message: 'Invalid Password Length' })
});
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Enter a Valid Email." }).min(3, { message: 'Email must have at least 3 characters.' }).max(20, { message: 'Email cannot have more than 20 characters.' }).trim().toLowerCase(),
    password: zod_1.default.string().min(3, { message: 'Password must have at least 3 characters.' }).max(30, { message: 'Password cannot have more than 30 characters.' }).trim(),
    name: zod_1.default.string().min(1, { message: 'Name must have at least 1 characters.' }).trim()
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(3, { message: 'Title must have at least 3 characters.' }),
    content: zod_1.default.string().min(3, { message: 'Content must have at least 3 characters.' })
});
exports.updateBlogInput = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional()
});
exports.deleteBlogInput = zod_1.default.object({
    blogId: zod_1.default.string()
});
