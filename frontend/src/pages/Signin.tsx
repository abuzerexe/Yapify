import { Quote } from "../components/Quote";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  SigninInput } from "@abuzerexe/yapify-common";
import {  toast } from "react-hot-toast";
import { LabelledInput } from "../components/Label";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";



export const Signin = () => {
  const navigate = useNavigate();

  const [signinInputs, setSigninInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const { mutate: signIn, isPending, isError, isSuccess } = useAuth({
    route: "/user/signin",
  });

  const handleSignIn = () => {
    signIn(signinInputs, {
      onSuccess: (data) => {
        toast.success("Signed in successfully!",{
            style: {
              border: '1px solid rgb(5, 110, 5)',
              padding: '16px',
            }});
            console.log(data.token)
        localStorage.setItem("token",data.token)
        navigate("/blogs");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Error while signing in.",{
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
                <div className="text-4xl font-extrabold">Login to Yapify.</div>
                <div className="text-slate-500 text-center pt-2 pr-3">
                  Don't have an account?
                  <Link className="pl-2 underline" to="/signup">
                    Sign up
                  </Link>
                </div>
              </div>
              <div className="pt-6">
                <LabelledInput
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => {
                    setSigninInputs({
                      ...signinInputs,
                      email: e.target.value,
                    });
                  }}
                />
                <LabelledInput
                  label="Password"
                  type="password"
                  placeholder="123456"
                  onChange={(e) => {
                    setSigninInputs({
                      ...signinInputs,
                      password: e.target.value,
                    });
                  }}
                />
                <Button
                  onClick={handleSignIn}
                  label={isPending ? "Signing in..." : "Sign in"}
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
