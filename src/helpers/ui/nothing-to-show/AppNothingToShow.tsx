import { AppSpinner } from "@/helpers/ui";

const AppNothingToShow = ({ loading = false, spinnerClass = "py-64" }) => {
  if (loading) {
    return (
      <div className={spinnerClass}>
        <AppSpinner />
      </div>
    );
  }
  return (
    <div className="p-8">
      <div className="w-full mt-8 text-center">
        <h6 className="text-regular text-capitalize leading-6">
          We did not find anything to show here!
        </h6>
      </div>
    </div>
  );
};

export default AppNothingToShow;
