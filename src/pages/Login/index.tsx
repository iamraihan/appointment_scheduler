import { useState } from "react";
import { LogIn } from "react-feather";
import { auth } from "@/configs/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AppButton } from "@/helpers/ui";
import { useNavigate } from "react-router-dom";

interface IMutationData {
  email?: string;
  password?: string;
}

type MutationField = "email" | "password";

const Login = () => {
  const [mutationData, setMutationData] = useState<IMutationData>({});
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isDisabled = !mutationData.email || !mutationData.password;

  const handleChange = (type: MutationField, value: string) => {
    setMutationData((prevData) => ({ ...prevData, [type]: value }));
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoggingIn(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        mutationData.email || "",
        mutationData.password || ""
      );

      // Successfully logged in
      const user = userCredential.user;
      console.log("Logged in user:", user);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        // If the user doesn't exist, prompt them to sign up
        setError("No account found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        console.error("Error logging in:", error.code, error.message);
        setError(`Login failed: ${error.message}`);
      }
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <div className="space-y-5">
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="email"
          placeholder="Email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="password"
          placeholder="Password"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <AppButton
          Icon={LogIn}
          title="Login"
          disabled={isDisabled}
          callBack={handleLogin}
          loader={loggingIn}
          loaderText="Logging in..."
        />
      </div>
    </div>
  );
};

export default Login;
