import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Send
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      

      {/* Main Footer Content */}
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Exclusive</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted online marketplace for premium products. 
              We deliver quality and excellence in every purchase.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>123 Commerce Street, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+20 100 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>support@exclusive.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Categories", href: "/categories" },
                { label: "Brands", href: "/brands" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              {[
                { label: "My Account", href: "/profile" },
                { label: "My Orders", href: "/allorders" },
                { label: "Wishlist", href: "/wishlist" },
                { label: "Shopping Cart", href: "/cart" },
                { label: "Help Center", href: "/help" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            
            {/* Social Media Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="space-y-2 pt-4">
              <h4 className="text-sm font-medium text-gray-300">Legal</h4>
              <ul className="space-y-1">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Return Policy", href: "/returns" },
                  { label: "Shipping Info", href: "/shipping" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-xs"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex gap-2">
                {["VISA", "MC", "PayPal"].map((method) => (
                  <div
                    key={method}
                    className="w-12 h-8 bg-white rounded flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-gray-800">
                      {method}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © 2025 Exclusive. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Ziad Ahmed
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}