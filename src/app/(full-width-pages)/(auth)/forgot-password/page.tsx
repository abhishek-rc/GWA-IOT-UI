

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Caroma Smart Command",
  description: "Forgot your password for Caroma Smart Command",
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
