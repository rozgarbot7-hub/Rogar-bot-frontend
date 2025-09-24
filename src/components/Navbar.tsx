"use client";

import Link from "next/link";
import { useState } from "react";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" className="flex items-center">
    <img src="/logo.png" alt="Rozgar Bot" className="h-20 w-24 mr-2" />
  </Link>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-emerald-600">
            Home
          </Link>
          <Link href="/jobs" className="text-gray-700 hover:text-emerald-600">
            Jobs
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-emerald-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-emerald-600">
            Contact
          </Link>

          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-700 font-medium hover:text-emerald-600"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 bg-gray-50 p-4 rounded-lg shadow">
          <Link
            href="/"
            className="block text-gray-700 hover:text-emerald-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="block text-gray-700 hover:text-emerald-600"
            onClick={() => setIsOpen(false)}
          >
            Jobs
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-emerald-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-emerald-600"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <SignedIn>
            <Link
              href="/dashboard"
              className="block text-gray-700 font-medium hover:text-emerald-600"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
