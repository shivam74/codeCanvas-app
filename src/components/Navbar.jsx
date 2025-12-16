import { useState } from "react"
import IKImage from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const Navbar = ()=>{
    const [open,setOpen]=useState(false);
    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            {/*LOGO*/}
            <Link to ="/" className="flex items-center justify-between gap-4 text-2xl font-bold">
                <IKImage src="/logo.png" alt = "app logo" w={32} h={32}></IKImage>
                <span>lamalog </span>
            </Link>
            {/*Mobile Menu*/}
            <div className="md:hidden">
                {/* MOBILE BUTTON */}
                <div className="cursor-pointer text-4xl" onClick={()=>setOpen((prev)=>!prev)}>
                    {open? "X" : "☰"}
                </div>
                {/* MOBILE LINK LIST */}
                <div className={`w-full h-screen flex flex-col items-center gap-8 justify-center font-medium text-lg absolute top-16  transition-all ease-in-out ${open ? "left-0" : "left-[100%]"}`} >
                    <Link to ="/">Home</Link>
                    <Link to ="/">Trending</Link>
                    <Link to ="/">Most Popular</Link>
                    <Link to ="/">About</Link>
                    <SignedOut>
                        <Link to ="/login">
                            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                </div>
            </div>
            {/*Desktop Menu*/}
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <Link to ="/">Home</Link>
                <Link to ="/">Trending</Link>
                <Link to ="/">Most Popular</Link>
                <Link to ="/">About</Link>
                <SignedOut>
                    <Link to ="/login">
                        <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar