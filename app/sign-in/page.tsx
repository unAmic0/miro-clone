import { SignIn } from "@clerk/nextjs";

export default () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};
