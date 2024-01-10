import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-site h-screen bg-no-repeat flex justify-center items-center">
      <SignUp />;
    </div>
  )

};