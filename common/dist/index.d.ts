import z from "zod";
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export declare const deleteBlogInput: z.ZodObject<{
    blogId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    blogId: string;
}, {
    blogId: string;
}>;
export type SigninInput = z.infer<typeof signinInput>;
export type SignupInput = z.infer<typeof signupInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type DeleteBlogInput = z.infer<typeof deleteBlogInput>;
