import { Quote } from "../components/Quote"
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@abuzerexe/yapify-common";
// import axios from "axios";
import { LabelledInput } from "../components/Label";
import { Button } from "../components/Button";

export const Signup = () => {

    const navigate = useNavigate();
    const [SignupInputs, setSignupInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    // async function sendRequest() {
    //     try {
    //         const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/signup`, SignupInputs);
    //         navigate("/signin");
    //     } catch(e) {
    //         alert("Error while signing up")
    //         // alert the user here that the request failed
    //     }

    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-screen flex justify-center flex-col">
                <div className="flex justify-center">
                    <div>
                        <div className="px-10">
                            <div className="text-4xl font-extrabold ">
                                Create an account
                            </div>
                            <div className="text-slate-500 text-center pt-2">
                                Already have an account?
                                <Link className="pl-2 underline" to="/signin">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                        <div className="pt-6">
                            <LabelledInput label="Name" placeholder="John Doe..." onChange={(e) => {
                                setSignupInputs({
                                    ...SignupInputs,
                                    name: e.target.value
                                })
                            }} /> 
                            <LabelledInput label="Email" placeholder="johndoe@gmail.com" onChange={(e) => {
                                setSignupInputs({
                                    ...SignupInputs,
                                    email: e.target.value
                                })
                            }} />
                            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                                setSignupInputs({
                                    ...SignupInputs,
                                    password: e.target.value
                                })
                            }} />
                            <Button label="Sign up"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
        </div>
}
