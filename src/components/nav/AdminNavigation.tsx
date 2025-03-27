import Logo from "../Logo";
import NavItems from "./NavItems";
import NavMenu from "./NavMenu";

export default function AdminNavigation() {

    return (
        <div className="flex flex-col items-center h-full px-6 bg-gray-800 text-gray-200 py-2">
            <div className="flex items-center justify-center w-full">
                <Logo />
            </div>
            <div className="hidden md:flex md:flex-col mt">
                <NavItems />
            </div>
            <div className="md:hidden">
                <NavMenu />
            </div>
        </div>
    );
}