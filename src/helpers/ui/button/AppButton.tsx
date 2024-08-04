import { Check } from "react-feather";
import { Loader } from "@/helpers/ui/custom-svg";
import { ButtonTypes, IAppButtonProps } from "@/helpers/ui/button/helper/types";

const AppButton = ({
  Icon = Check,
  btnType = "btn_primary",
  title = "Save",
  disabled = false,
  loader = "",
  loaderText = "Loading...",
  callBack = () => {},
  customClass = "",
  options: { iconClasses = "w-5 h-5" } = {},
}: IAppButtonProps) => {
  const btnContent = () => (
    <>
      <span className="text-sm font-medium mt-1">
        {loader ? (
          <div className="pt-1">
            <Loader />
          </div>
        ) : (
          <Icon className={iconClasses} />
        )}
      </span>
      <span className="pl-1 pt-1 text-sm font-medium">
        {loader ? loaderText : title}
      </span>
    </>
  );

  const btnTypes: { [key in ButtonTypes]: JSX.Element } = {
    btn_primary: (
      <button
        type="button"
        className={` ${
          customClass || ""
        } flex px-6 justify-center items-center mb-2 text-sm font-medium rounded-lg h-10 focus:outline-none text-white disabled:bg-primary disabled:opacity-50 bg-primary hover:bg-purple-700`}
        onClick={callBack}
        disabled={disabled}
      >
        {btnContent()}
      </button>
    ),
    btn_secondary: (
      <button
        tabIndex={0}
        type="button"
        className={`${
          customClass || ""
        } flex w-full md:w-max px-7 justify-center items-center mb-2 text-sm font-medium h-10 text-center text-white bg-gray-deep disabled:opacity-50 focus:outline-none bg-none rounded-lg border border-light`}
        onClick={callBack}
        disabled={disabled}
      >
        {btnContent()}
      </button>
    ),
    btn_danger: (
      <button
        tabIndex={0}
        type="button"
        className={`${
          customClass || ""
        } flex w-full md:w-max px-7 justify-center items-center mb-2 text-sm font-medium h-10 text-center text-white bg-danger disabled:opacity-50 focus:outline-none bg-none rounded-lg hover:bg-red-500`}
        onClick={callBack}
        disabled={disabled}
      >
        {btnContent()}
      </button>
    ),
  };

  return <div className="">{btnTypes[btnType]}</div>;
};

export default AppButton;
