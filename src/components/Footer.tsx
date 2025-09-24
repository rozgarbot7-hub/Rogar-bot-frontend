"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-emerald-50 to-white text-gray-700 py-12 px-6 mt-0.5 border-t border-emerald-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-bold text-emerald-700 mb-3">Contact</h4>
          <p className="flex items-center gap-2 text-gray-600">
            <Mail className="w-5 h-5 text-emerald-600" />
            <a
              href="mailto:support@rozgarbot.com"
              className="hover:underline hover:text-emerald-700 transition-colors"
            >
              support@rozgarbot.com
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold text-emerald-700 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="hover:text-emerald-600 transition-colors">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-600 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-600 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-12 border-t border-gray-200 pt-6">
        © {new Date().getFullYear()} Rozgar Bot. All rights reserved.
      </div>
    </footer>
  );
}
