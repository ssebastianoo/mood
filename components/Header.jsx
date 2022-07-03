import Account from "./Account";
import Link from "next/link";

export default function Header() {
    return (
        <div className="bg-purple-light w-full h-[8vh] flex items-center text-xl">
            <div className="mx-5">
                <Account />
            </div>
            <div>
                <Link href="/stats">
                    <a>Stats</a>
                </Link>
            </div>
        </div>
    );
}
