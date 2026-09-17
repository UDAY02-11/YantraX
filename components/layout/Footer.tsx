'use client';

import * as React from 'react';
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { SITE_NAME, SUPPORT_EMAIL, CONTACT_PHONE, FOOTER_LINKS } from '@/lib/constants';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const paymentMethods = ['VISA', 'Mastercard', 'RuPay', 'UPI', 'Paytm', 'COD'];

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
                {SITE_NAME}
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Your one-stop shop for robotics, electronics, IoT and STEM supplies. Build something amazing.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4" /> {SUPPORT_EMAIL}
              </a>
              <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4" /> {CONTACT_PHONE}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Bengaluru, India
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-foreground">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-foreground">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Help</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-foreground">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Learn</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.learn.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-foreground">{link.label}</a>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-foreground">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded border bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
