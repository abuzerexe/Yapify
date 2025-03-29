import { Quote } from "../components/Quote";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  SignupInput } from "@abuzerexe/yapify-common";
import {  toast } from "react-hot-toast";
import { LabelledInput } from "../components/Label";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export const Signup = () => {
  const navigate = useNavigate();

  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const { mutate: signUp, isPending, isError, isSuccess } = useAuth({
    route: "/user/signup",
  });

  const handleSignup = () => {
    signUp(signupInputs, {
      onSuccess: (data) => {
        toast.success("Signed up successfully!",{
          style: {
            border: '1px solid rgb(5, 110, 5)',
            padding: '16px',
          }});
        navigate("/signin");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Error while signing up.",{
          style: {
            border: '1px solid rgb(202, 16, 16)',
            padding: '16px'
          }});
      }
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-screen flex justify-center flex-col">
          <div className="flex justify-center">
            <div>
              <div className="px-10">
                <div className="text-4xl font-extrabold"> Create an account</div>
                <div className="text-slate-500 text-center pt-2 pr-3">
                Already have an account?
                  <Link className="pl-2 underline" to="/signin">
                    Sign in
                  </Link>
                </div>
              </div>
              <div className="pt-6">
              <LabelledInput label="Name" placeholder="John Doe..." onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        name: e.target.value
                    })
                }} /> 
                <LabelledInput
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => {
                    setSignupInputs({
                      ...signupInputs,
                      email: e.target.value,
                    });
                  }}
                />
                <LabelledInput
                  label="Password"
                  type="password"
                  placeholder="123456"
                  onChange={(e) => {
                    setSignupInputs({
                      ...signupInputs,
                      password: e.target.value,
                    });
                  }}
                />
                <Button
                  onClick={handleSignup}
                  label={isPending ? "Signing up..." : "Sign up"}
                  status = {isPending}
                />

              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};





