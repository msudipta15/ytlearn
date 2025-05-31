"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function SigninButton() {
  const route = useRouter();
  return (
    <Button onClick={() => route.push("/")} variant={"secondary"} size={"lg"}>
      Sign in
    </Button>
  );
}
