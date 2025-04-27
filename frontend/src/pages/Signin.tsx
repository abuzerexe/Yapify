"use client"

import { Quote } from "../components/Quote"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { SigninInput } from "@abuzerexe/yapify-common"
import { toast } from "react-hot-toast"
import { LabelledInput } from "../components/Label"
import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../context/ThemeContext"

export const Signin = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  const [signinInputs, setSigninInputs] = useState<SigninInput>({
    email: "",
    password: "",
  })

  const { mutate: signIn, isPending } = useAuth({
    route: "/user/signin",
  })

  const handleSignIn = () => {
    signIn(signinInputs, {
      onSuccess: (data) => {
        toast.success("Signed in successfully!", {
          style: {
            border: "1px solid rgb(5, 110, 5)",
            padding: "16px",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
          },
        })
        localStorage.setItem("token", data.token)
        navigate("/blogs")
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Error while signing in.", {
          style: {
            border: "1px solid rgb(202, 16, 16)",
            padding: "16px",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
          },
        })
      },
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-screen flex justify-center flex-col">
          <div className="flex justify-center">
            <div className="w-full max-w-md px-6">
              <div className="px-4 sm:px-10">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Login to Yapify
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-center pt-2 pr-13">
                  Don't have an account?
                  <Link className="pl-2 text-emerald-600 dark:text-emerald-400 hover:underline" to="/signup">
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
                    })
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
                    })
                  }}
                />
                <Button width="mt-4 w-full text-sm px-5 py-2.5 me-2 mb-2" onClick={handleSignIn} label={isPending ? "Signing in..." : "Sign in"} status={isPending} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  )
}
