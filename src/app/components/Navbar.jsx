"use client";

import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navigation({ color = "#fff" }) {
  const navbarRef = useRef(null);
  const wrapperRef = useRef(null);
  const barsIconRef = useRef(null);
  const closeIconRef = useRef(null);

  const { data: session, status } = useSession();

  function openWrapper() {
    wrapperRef.current.style.display = "flex";
    closeIconRef.current.style.display = "flex";
    barsIconRef.current.style.display = "none";
    navbarRef.current.style.zIndex = "3";
  }

  function closeWrapper() {
    wrapperRef.current.style.display = "none";
    closeIconRef.current.style.display = "none";
    barsIconRef.current.style.display = "flex";
  }

  function resizeWindow() {
    const windowWidth = window.innerWidth;
    wrapperRef.current.style.display = "none";
    closeIconRef.current.style.display = "none";
    barsIconRef.current.style.display = windowWidth >= 992 ? "none" : "flex";
  }

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    resizeWindow();
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const authLink = () => {
    if (status === "loading") {
      return <span className="relative mr-[3.6rem]">Loading...</span>;
    }
    if (session) {
      return (
        <span
          className="relative mr-[3.6rem] cursor-pointer"
          style={{ color }}
          onClick={() => signOut()}
        >
          Sign Out
        </span>
      );
    }
    return (
      <Link href="/login" className="relative mr-[3.6rem]" style={{ color }}>
        Login
      </Link>
    );
  };

  return (
    <>
      <section>
        <header
          className={`relative pt-[2rem] pr-0 pb-[2rem] pl-0 text-[${color}]`}
        >
          <div
            className="fixed flex flex-wrap justify-between w-[100%] items-center z-[100]"
            ref={navbarRef}
          >
            <div className="text-2xl ml-[3rem]">
              <Link href="/" className="mo:text-[2.5rem]" style={{ color }}>
                GoDoc
              </Link>
            </div>
            <ul className="relative flex gap-12 mo:hidden items-center">
              <li>
                <Link href="/about" className="relative" style={{ color }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="relative" style={{ color }}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="relative" style={{ color }}>
                  Contact
                </Link>
              </li>
              <li>{authLink()}</li>
            </ul>
            <FontAwesomeIcon
              icon={faBars}
              id="bars"
              onClick={openWrapper}
              ref={barsIconRef}
              className="cursor-pointer mr-[4rem] hidden mo:block mo:text-5xl"
              style={{ color }}
            />

            <FontAwesomeIcon
              icon={faXmark}
              onClick={closeWrapper}
              ref={closeIconRef}
              className="hidden text-[3.3rem] border-4 rounded-2xl mr-12"
              style={{ color }}
            />
          </div>
        </header>
        <div
          ref={wrapperRef}
          className="hidden flex-col top-[0%] fixed w-[100%] h-screen p-13-percent backdrop-blur-[15px] text-center items-center z-[1]"
        >
          <ul className="gap-8 flex flex-col">
            <li>
              <Link href="/about" className="text-[2.3rem]" style={{ color }}>
                About
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="text-[2.3rem]"
                style={{ color }}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[2.3rem]" style={{ color }}>
                Contact
              </Link>
            </li>
            <li className="text-[2.3rem]">{authLink()}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
