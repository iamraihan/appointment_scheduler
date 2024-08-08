import { useState, useEffect } from "react";
import { LogIn } from "react-feather";
import { auth } from "@/configs/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { AppButton } from "@/helpers/ui";

interface IMutationData {
  user_name?: string;
  password?: string;
}

type MutationField = "user_name" | "password";

const SignUp = () => {
  // state
  const [mutationData, setMutationData] = useState<IMutationData>({});
  const [applying, setApplying] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // disabled
  const isDisabled = !mutationData.user_name || !mutationData.password;

  // change handler
  const handleChange = (type: MutationField, value: string) => {
    setMutationData((prevData) => ({ ...prevData, [type]: value }));
  };

  // apply
  const handleApply = async () => {
    setApplying(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        mutationData.user_name || "",
        mutationData.password || ""
      );

      setUser(userCredential.user); // Store the user in state
      console.log("Logged in user:", userCredential.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error logging in:", error.code, error.message);
    } finally {
      setApplying(false);
    }
  };

  // Check for user on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in, set user state
        console.log("User is already logged in:", currentUser);
      } else {
        setUser(null); // No user is logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          {/* Add more user details or logout button here if needed */}
        </div>
      ) : (
        <div className="space-y-5">
          <input
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="email"
            placeholder="Username"
            onChange={(e) => handleChange("user_name", e.target.value)}
          />
          <input
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <AppButton
            Icon={LogIn}
            title="Login"
            disabled={isDisabled}
            callBack={handleApply}
            loader={applying}
            loaderText="Logging in..."
          />
        </div>
      )}
    </div>
  );
};

export default SignUp;
