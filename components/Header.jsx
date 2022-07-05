import Account from "./Account";
import Link from "next/link";

export default function Header() {
    return (
        <div className="bg-purple-light w-full h-[8vh] flex items-center text-xl">
            <div className="mx-3">
                <Account />
            </div>
            <div className="mx-3">
                <Link href="/">
                    <a>Home</a>
                </Link>
            </div>
            <div className="mx-3">
                <Link href="/stats">
                    <a>Stats</a>
                </Link>
            </div>
        </div>
    );
}
