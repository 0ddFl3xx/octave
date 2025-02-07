import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen py-28">
        <SignUp />
      </div>
    </>
  );
};
export default Page;
