"use client";
import { HOME_ROUTE, LOGIN_ROUTE, BALLOT_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { AuthContext } from "@/provider/AuthProvider";
import { auth } from "@/util/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const { user }: any = AuthContext();
    const router = useRouter();
    const logOut = () => {
        signOut(auth).then((response) => {
            router.push(LOGIN_ROUTE);
        }).catch((e) => {
            console.log("Logout Catch ", e.message)
        })
    }

    return (
        <header className="h-20 z-10 bg-white fixed top-0 w-full flex px-10  border shadow-lg text-white">
            <nav className="w-full mx-auto flex justify-between items-center px-2 text-blue-800 font-poppins text-xl">
                <Link href={HOME_ROUTE} className="text-4xl font-poppins text-blue-800 flex items-center gap-3">
                    <img
                        src="https://s3.amazonaws.com/logos.brandpa.com/uploads/83d1cd5c90679971289a8ef992879bd6/Choiceelection.png"
                        className="mx-auto h-20 w-auto" />
                    ChoiceElection</Link>
                <ul className="flex gap-4">
                    {!user?.isLogin &&
                        <>
                            <Link href={LOGIN_ROUTE}><li><button className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded-md border border-blue-500">Login</button></li></Link>
                            <Link href={REGISTER_ROUTE}><li><button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md border border-blue-500">Register</button></li></Link>
                        </>
                    }
                    {user?.isLogin &&
                        <>
                            <Link href={BALLOT_ROUTE} className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"><li>Vote Here</li></Link>
                            <li className=" cursor-pointer border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white" onClick={logOut}>Logout</li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;