"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function LoginFormAdmin() {
  const session = useSession();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session.data?.user.role == "admin") {
      router.push("/admin-pamplabua-51nsugjabxhy/catalog");
    }
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    if (!login || !password) {
      toast.error("Всі поля важливі!");
      setLoading(false);
      return;
    }

    await signOut({ redirect: false });

    const result = await signIn("admin-login", {
      login,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Невірний логін або пароль");
      setLoading(false);
    } else {
      toast.success("Вхід успішний");
      router.push("/admin-pamplabua-51nsugjabxhy");
      router.refresh();
    }
  };

  return (
    <form
      className="max-w-sm mx-auto p-6 bg-white/80 backdrop-blur rounded-lg shadow-md"
      aria-label="Login form for admin panel"
      onSubmit={handleLogin}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Admin Login</h2>

      <label className="block text-sm mb-2">
        <span className="sr-only">Login</span>
        <input
          type="text"
          placeholder="Логин"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </label>

      <label className="block text-sm mb-4">
        <span className="sr-only">Password</span>
        <input
          type="password"
          placeholder="Пароль"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="w-full py-2 rounded bg-gray-800 text-white font-medium hover:opacity-95"
      >
        Війти
      </button>
    </form>
  );
}
