import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error ,setError] = useState("")
  const [pending, setPending] = useState(false);
  
  const onPasswordSingUp = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
      }
    setPending(true);
    signIn("password", {name, email, password, flow: "signUp" })
      .catch(() => {
      setError("Someting went wrong")
    })
      .finally(() => {
        setPending(false)
    })
  }
  // LOGIN WITH GOOGLE AND GITHUB
  const handlerSigninProvider = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };
  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Signup to continue</CardTitle>
        <CardDescription>
          Use Your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSingUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            type="text"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            // type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            // type="password"
            required
          />

          <Button
            className="w-full"
            variant="default"
            size="lg"
            disabled={pending}
            type="submit"
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-2.5">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handlerSigninProvider("google")}
            disabled={pending}
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handlerSigninProvider("github")}
            disabled={pending}
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account ?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            SignIn
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
