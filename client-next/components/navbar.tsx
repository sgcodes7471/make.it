// import Link from "next/link";
import { LogOut } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signIn, signOut } from "../auth";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 font-work-sans fixed top-0">
            <nav className="flex justify-between items-center">
                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <form action={async () => {
                                "use server";
                                await signOut({ "redirectTo": "/" });
                            }}>
                                <button 
                                type={'submit'}
                                className="text-white font-bold cursor-pointer">
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>
                        </>
                    ) : (
                        <form
                        action={async () => {
                            "use server"
                            await signIn("github")
                        }}
                        >
                            <button 
                            type="submit" 
                            className="text-white font-bold cursor-pointer">
                                Signin with GitHub
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;