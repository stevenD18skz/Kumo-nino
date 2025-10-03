"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = (role: "client" | "internal" | "admin") => {
    // aquí llamarías a tu API real para validar credenciales
    Cookies.set("token", "fake-token", { path: "/" });
    Cookies.set("role", role, { path: "/" });

    if (role === "admin") {
      router.replace("/admin/dashboard");
    } else if (role === "internal") {
      router.replace("/internal/dashboard");
    } else {
      router.replace("/client/dashboard");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center  w-full text-[#302F2C]">
      <div>
        <Image
          src="/image_login.png"
          alt="image login"
          width={1600}
          height={400}
          priority
          className="h-screen  object-cover hidden md:block"
        />
      </div>

      <div className="bg-[#F6F1E9] flex flex-col justify-center items-center  h-screen px-4">
        <Image src="/logo.png" alt="logo kumo-nino" width={150} height={150} />
        <h1 className="text-8xl">Sing in </h1>
        <h2 className="text-2xl">To continue for Kumi-nino</h2>

        <div className="border border-black/10 p-8 rounded-lg mt-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="border border-black/10 p-3 rounded-lg w-96"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-black/10 p-3 rounded-lg w-96"
              required
            />
            <button
              type="submit"
              className="bg-[#302F2C] text-[#7FA087] p-3 rounded-lg mt-4 hover:bg-[#1C1B19] transition-colors"
            >
              Sing In
            </button>

            {[
              { role: "client", label: "Entrar como Cliente" },
              { role: "internal", label: "Entrar como Director" },
              { role: "admin", label: "Entrar como Admin" },
            ].map(({ role, label }) => (
              <button
                key={role}
                onClick={() =>
                  handleLogin(role as "client" | "internal" | "admin")
                }
                className="bg-[#302F2C] text-white p-3 rounded-lg mt-4 hover:bg-[#5f637f] transition-colors"
              >
                {label}
              </button>
            ))}
          </form>
          <p className="mt-4 text-sm">
            No registered yet?{" "}
            <Link href="/register" className="text-[#7FA087] hover:underline">
              create an account
            </Link>
          </p>
          <form />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
