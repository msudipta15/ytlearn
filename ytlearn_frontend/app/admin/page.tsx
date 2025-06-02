import { SigninForm } from "@/components/admin/signinform";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";

export default function AdminHome() {
  return (
    <BackgroundLines>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center text-black items-center">
          <h1 className="text-4xl font-bold mb-4">YT Learn Admin</h1>

          <p className="text-lg font-medium">
            Manage your videos and topics with ease
          </p>
          <br />
        </div>
        <div className="w-[350px]">
          <SigninForm />
        </div>
      </div>
    </BackgroundLines>
  );
}
