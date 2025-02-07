import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen py-28">
        <SignIn />
      </div>
    </>
  );
};
export default Page;
