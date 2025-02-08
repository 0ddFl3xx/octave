import { LibraryBig, House, Search } from "lucide-react";

const MobileNav = () => {
  return (
    <>
      <div className="mx-4 pb-2">
        <div className="flex justify-between">
          <div className="flex flex-col items-center text-xs text-blue-500">
            <House className="size-6 " />
            Home
          </div>
          <div className="flex flex-col items-center text-xs text-zinc-400">
            <Search className="size-6" />
            Search
          </div>
          <div className="flex flex-col items-center text-xs text-zinc-400">
            <LibraryBig className="size-6" />
            Your library
          </div>
          <div className="flex flex-col items-center text-xs text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 text-zinc-400"
              fill="#868D98"
              viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
            </svg>
            Create
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
