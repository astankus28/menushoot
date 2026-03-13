import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#C4622D",
            colorText: "#3D2B1F",
            colorBackground: "#FDF9F3",
            borderRadius: "4px",
          },
        }}
        afterSignInUrl="/app"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
