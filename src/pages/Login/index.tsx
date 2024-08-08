import { AppButton } from "@/helpers/ui";
import { useState } from "react";
import { LogIn } from "react-feather";

interface IMutationData {
  user_name?: string;
  password?: string;
}
type MutationField = "user_name" | "password";

const Login = () => {
  // state
  const [mutationData, setMutationData] = useState<IMutationData>({});
  const [applying, setApplying] = useState(false);

  const isDisabled = !mutationData.user_name || !mutationData.password;

  //   change handler
  const handleChange = (type: MutationField, value: string) => {
    console.log("type: ", type);
    setMutationData((prevData) => ({ ...prevData, [type]: value })); // to get data previous state current state data
  };

  const handleApply = () => {
    setApplying(true);
    // api call
  };
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <div className="space-y-5">
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
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
    </div>
  );
};

export default Login;
