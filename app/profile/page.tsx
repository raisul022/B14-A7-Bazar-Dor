"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleUpdateProfile(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      setSuccess("");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        setError(
          result.error.message || "Could not update your profile.",
        );
        return;
      }

      setSuccess("Your profile has been updated successfully.");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError(result.error.message || "Logout failed.");
        setLoggingOut(false);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Logout failed. Please try again.");
      setLoggingOut(false);
    }
  }

  if (isPending || !session || !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f7faf7] px-4">
        <div className="flex items-center gap-3 text-sm text-[#52705a]">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading your profile...
        </div>
      </main>
    );
  }

  const initial = (user.name || user.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#f7faf7] px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#52705a] transition hover:text-[#176b3a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#398052]">
            Account Settings
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#183b26] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#66776b] sm:text-base">
            Manage your BazarDor account information and keep your
            profile up to date.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.4fr]">
          <section className="h-fit rounded-3xl border border-[#e2ebe3] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e2f3e6] text-3xl font-bold text-[#176b3a]">
                {initial}
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#183b26]">
                {user.name || "BazarDor User"}
              </h2>

              <p className="mt-2 break-all text-sm text-[#718076]">
                {user.email}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eaf7ed] px-4 py-2 text-xs font-semibold text-[#267444]">
                <ShieldCheck className="h-4 w-4" />
                Registered Account
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-[#edf1ed] pt-6">
              <div className="flex items-start gap-3">
                <UserRound className="mt-0.5 h-5 w-5 text-[#398052]" />
                <div className="min-w-0">
                  <p className="text-xs text-[#718076]">Full Name</p>
                  <p className="mt-1 break-words text-sm font-medium text-[#253d2d]">
                    {user.name || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-[#398052]" />
                <div className="min-w-0">
                  <p className="text-xs text-[#718076]">
                    Email Address
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-[#253d2d]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#e2ebe3] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#183b26]">
              Edit Profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#718076]">
              Update your display name. Your email address is used as
              your account identifier.
            </p>

            <form onSubmit={handleUpdateProfile} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-semibold text-[#304a37]"
                >
                  Full Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name || user.name || ""}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-[#dce7de] bg-[#fbfdfb] px-4 py-3 text-sm text-[#183b26] outline-none transition placeholder:text-[#a0aca3] focus:border-[#398052] focus:ring-4 focus:ring-[#398052]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-semibold text-[#304a37]"
                >
                  Email Address
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#e5ebe6] bg-[#f3f6f3] px-4 py-3 text-sm text-[#718076] outline-none"
                />

                <p className="mt-2 text-xs text-[#829087]">
                  Email editing is not available here.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={saving || !(name || user.name || "").trim()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b3a] px-5 py-3 font-semibold text-white transition hover:bg-[#10552d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {saving ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>

            <div className="mt-9 border-t border-[#edf1ed] pt-6">
              <h3 className="font-semibold text-[#183b26]">
                Sign Out
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#718076]">
                Sign out of your BazarDor account on this device.
              </p>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                {loggingOut ? "Signing out..." : "Logout"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}