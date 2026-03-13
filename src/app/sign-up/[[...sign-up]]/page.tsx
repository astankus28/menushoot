import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#C4622D",
            colorText: "#3D2B1F",
            colorBackground: "#FDF9F3",
            borderRadius: "4px",
          },
        }}
        afterSignUpUrl="/app"
        signInUrl="/sign-in"
      />
    </div>
  );
}
