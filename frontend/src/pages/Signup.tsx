"use client"

import { Quote } from "../components/Quote"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { SignupInput } from "@abuzerexe/yapify-common"
import { LabelledInput } from "../components/Label"
import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"
import { useToast } from "../context/ToastContext"
import { Authbar } from "../components/Authbar"

export const Signup = () => {
  const navigate = useNavigate()

  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  })

  const { mutate: signUp, isPending } = useAuth({
    route: "/user/signup",
  })

  const { toast } = useToast()

  const handleSignup = () => {
    signUp(signupInputs, {
      onSuccess: () => {
        toast("Signed up successfully!", "success")
        navigate("/signin")
      },
      onError: (error: any) => {
        toast(error.response?.data?.message || "Error while signing up.", "error")
      },
    })
  }

  return (
    <div>
      <Authbar/>
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-screen flex justify-center flex-col">
          <div className="flex justify-center">
            <div className="w-full max-w-md px-6">
              <div className="px-4 sm:px-10">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Create an account
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-center pt-2 pr-3">
                  Already have an account?
                  <Link className="pl-2 text-emerald-600 dark:text-emerald-400 hover:underline" to="/signin">
                    Sign in
                  </Link>
                </div>
              </div>
              <div className="pt-6">
                <LabelledInput
                  label="Name"
                  placeholder="John Doe..."
                  onChange={(e) => {
                    setSignupInputs({
                      ...signupInputs,
                      name: e.target.value,
                    })
                  }}
                />
                <LabelledInput
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => {
                    setSignupInputs({
                      ...signupInputs,
                      email: e.target.value,
                    })
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
                    })
                  }}
                />
                <div className="">

                <Button width="mt-4 w-full text-sm px-5 py-2.5 me-2 mb-2" variant="primary" size="md" onClick={handleSignup} label={isPending ? "Signing up..." : "Sign up"} status={isPending} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
    </div>
  )
}
