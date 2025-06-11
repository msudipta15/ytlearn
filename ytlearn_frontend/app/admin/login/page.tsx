import { SigninForm } from "@/components/admin/signinform";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function AdminHome() {
  return (
    <BackgroundLines>
      <div className="absolute inset-0 z-0 w-full h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center text-black items-center">
          <h1 className="text-4xl font-bold mb-4">YT Learn</h1>

          <p className="text-lg font-medium">Make your Youtube learning Easy</p>
          <br />
        </div>
        <div className="w-[350px]">
          <SigninForm />
        </div>
      </div>
    </BackgroundLines>
  );
}
