"use client";
import { SignInForm } from "@/app/components/SignInForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (user) router.push("/profile");
  return <SignInForm />;
}
