"use client";

import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    }

    if (res?.ok) {
      return router.push("/");
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
        <>
          <Navbar />
          <section>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-lg">
              <div className="w-full flex justify-center">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
                  Login
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  Login!
                </button>
                <Link
                  className="unselectable relative top-4 lg:top-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-sm"
                  href="/register"
                >
                  Dont have an account yet? Join us now!
                </Link>
                {error && (
                  <div className="unselectable relative top-4 lg:top-8 font-light text-center text-red-600 dark:text-red-700 sm:text-sm">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </section>
        </>
      );
    }
  };
  return showSession();
}
