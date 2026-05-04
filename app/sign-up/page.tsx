import { SignUp } from "@clerk/nextjs";

export default () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};
