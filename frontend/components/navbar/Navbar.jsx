"use client";

import Link from "next/link";
import Image from "next/image";
import elyteLogo from "@/public/elyte.svg";
import {useState } from "react";

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const openNavbar = () => {
        setNavbarOpen(true);
    }

    const closeNavbar = () => {
        setNavbarOpen(false);
    }

    return (
        <>
            <nav className="z-100 w-full flex flex-col items-center">
                {/* login register bar */}
                <div className="flex bg-black text-sm font-sans flex-wrap justify-between items-center mx-auto max-w-screen-xl py-2 px-10 text-white w-full">
                  <div>
                    <p>Get 20% off your first order</p>
                  </div>
                  <div>
                    <Link href={"/login"} className="no-underline text-white hover:text-gray-400">Login /</Link>
                    <Link href={"/register"} className="no-underline text-white hover:text-gray-400"> Register</Link>
                  </div>
                </div>

                {/* nab bar */}
                <div className="container flex flex-wrap justify-between text-lg font-sans px-5 py-6">
                  <div>
                    <Image src={elyteLogo} alt="elyte-logo"></Image>
                  </div>

                  <div id="navbar-default" className="hidden lg:flex space-x-8">
                    <Link className="no-underline text-black hover:text-gray-300" href={"/"}> Home </Link>
                    <Link className="no-underline text-black hover:text-gray-300" href={"/products"}> Products </Link>
                    <Link className="no-underline text-black hover:text-gray-300" href={"/categories"}> Categories </Link>
                    <Link className="no-underline text-black hover:text-gray-300" href={"/about"}> About Us </Link>
                    <Link className="no-underline text-black hover:text-gray-300" href={"/contact"}> Contact Us </Link>
                  </div>

                  <div className="flex flex-wrap relative">
                    
                    {
                        navbarOpen && (
                            <div className="fixed inset-0 bg-opacity-90 bg-white p-10">
                                <div className="flex justify-end p-4">
                                    <button onClick={closeNavbar}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Link className="no-underline text-black hover:text-gray-300" onClick={closeNavbar} href={"/"}> Home </Link>
                                    <Link className="no-underline text-black hover:text-gray-300" onClick={closeNavbar} href={"/products"}> Products </Link>
                                    <Link className="no-underline text-black hover:text-gray-300" onClick={closeNavbar} href={"/categories"}> Categories </Link>
                                    <Link className="no-underline text-black hover:text-gray-300" onClick={closeNavbar} href={"/about"}> About Us </Link>
                                    <Link className="no-underline text-black hover:text-gray-300" onClick={closeNavbar} href={"/contact"}> Contact Us </Link>
                                </div>
                            </div>
                        )
                    }

                    {
                      !navbarOpen && (
                          <div className="flex flex-wrap justify-end">
                              <button className="pr-5 lg:hidden" onClick={openNavbar}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                  </svg>
                              </button>
                              <Link className="pr-5 pt-1.5" href={"/wishlist"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                              </Link>
                              <Link className="pt-1.5" href={"/cart"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                              </Link>
                          </div>
                      )
                    }
                  </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;