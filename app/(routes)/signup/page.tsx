"use client";
import { SignUpForm } from "@/app/components/SignUpForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";

export default function Page() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (user) router.push("/profile");
  return <SignUpForm />;
}
