import { Quote } from "../components/Quote"
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@abuzerexe/yapify-common";
// import axios from "axios";
import { LabelledInput } from "../components/Label";
import { Button } from "../components/Button";

export const Signin = () => {

    const navigate = useNavigate();
    const [SigninInputs, setSigninInputs] = useState<SigninInput>({
        email: "",
        password: ""
    });

    // async function sendRequest() {
    //     try {
    //         const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/signup`, SigninInputs);
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
                                Login to Yapify.
                            </div>
                            <div className="text-slate-500 text-center pt-2 pr-3">
                                 Don't have an account?
                                <Link className="pl-2 underline" to="/signup">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                        <div className="pt-6">
                            <LabelledInput label="Email" placeholder="johndoe@gmail.com" onChange={(e) => {
                                setSigninInputs({
                                    ...SigninInputs,
                                    email: e.target.value
                                })
                            }} />
                            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                                setSigninInputs({
                                    ...SigninInputs,
                                    password: e.target.value
                                })
                            }} />
                            <Button label="Sign in"/>
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
