"use client";

import { useSession, signIn } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../actions/register";
import Navbar from "../components/Navbar.jsx";
import { redirect } from "next/navigation";
import React from "react";

import Link from "next/link";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formdata = new FormData(form);

    const r = await register({
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
      name: formdata.get("name") as string,
    });

    ref.current?.reset();

    if (r?.error) {
      setError(r.error);
      return;
    } else {
      const res = await signIn("credentials", {
        email: formdata.get("email") as string,
        password: formdata.get("password") as string,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error as string);
      } else {
        return router.push("/");
      }

      return router.push("/login");
    }
  };

  const { status } = useSession();

  const showSession = () => {
    if (status === "authenticated") {
      return router.push("/");
    } else if (status === "loading") {
      return (
        <>
          <Navbar />
          <section className="flex items-center justify-center absolute top-0 left-0 w-screen h-screen">
            <span className="text-[#888] text-sm mt-7">Loading...</span>
          </section>
        </>
      );
    } else {
      return (
        <section>
          <Navbar />
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-lg">
            <div className="w-full flex justify-center">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
                Register
              </h2>
            </div>
            <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block p-3 w-full text-sm bg-background border border-primary shadow-sm focus:ring-primary focus:border-primary rounded-lg"
                  placeholder="john123"
                  pattern="^[a-z0-9]{3,20}$"
                  minLength={3}
                  maxLength={20}
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity(
                      "Username must be 3-20 characters long and must contain url-friendly characters."
                    );
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity("");
                    target.value = target.value.toLowerCase();
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  className="shadow-sm bg-background border border-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="lorem@ipsum.net"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block p-3 w-full text-sm bg-background border border-primary rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                  minLength={6}
                  maxLength={20}
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity(
                      "Password must be between 6 and 20 characters."
                    );
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity("");
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="relative top-5 p-3 w-full text-sm rounded-lg bg-secondary text-background border border-accent shadow-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Sign Up!
              </button>
              <Link
                className="unselectable relative top-4 lg:top-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-sm"
                href="/login"
              >
                Existing account? Click here to log in!
              </Link>
              {error && (
                <div className="unselectable relative top-4 lg:top-8 font-light text-center text-red-600 dark:text-red-700 sm:text-sm">
                  {error}
                </div>
              )}
            </form>
          </div>
        </section>
      );
    }
  };

  return showSession();
}
