import { LibraryBig, Plus, House, Search } from "lucide-react";

const MobileNav = () => {
  return (
    <>
      <div className="mx-4 pb-2">
        <div className="flex justify-between">
          <div className="flex flex-col items-center text-sm text-blue-500">
            <House className="size-6 " />
            Home
          </div>
          <div className="flex flex-col items-center text-sm">
            <Search className="size-6" />
            Search
          </div>
          <div className="flex flex-col items-center text-sm">
            <LibraryBig className="size-6" />
            Your library
          </div>
          <div className="flex flex-col items-center text-sm">
            <Plus className="size-6" />
            Create
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
