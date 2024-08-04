import { AppButton } from "@/helpers/ui";

const Home = () => {
  return (
    <div className="container mx-auto">
      <h2>Hello Home</h2>
      <div className="flex gap-5 items-center">
        {" "}
        <AppButton /> <AppButton btnType="btn_danger" />
      </div>
    </div>
  );
};

export default Home;
