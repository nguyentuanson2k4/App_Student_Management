import { SigninForm } from "@/components/SigninForm";

const SignInPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center p-6 md:p-10 bg-muted bg-gradient-purple">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SigninForm />
      </div>
    </div>
  );
};

export default SignInPage;
