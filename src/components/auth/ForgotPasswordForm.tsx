"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    setError(emailError);

    if (!emailError) {
      // In a real app, this would call an API to send the reset link
      setIsSubmitted(true);
      // Alert for demo purposes
      alert(`Reset link would be sent to: ${email}`);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Your Password?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {"Enter the email address linked to your account, and we'll send you a link to reset your password."}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-4 mb-6 text-sm text-success-700 bg-success-100 rounded-lg dark:bg-success-200/10 dark:text-success-500">
              {"If an account exists with that email, we've sent a password reset link. Please check your inbox."}
              <div className="mt-4">
                <Link href="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error}
                    hint={error}
                  />
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit">
                    Send Reset Link
                  </Button>
                </div>
                <div className="text-center">
                  <Link
                    href="/signin"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    {"Back to Sign In"}
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
