'use client';

import { Truck, ShieldCheck, BadgeCheck, RotateCcw, Headphones } from 'lucide-react';

const benefits = [
  { icon: Truck, title: 'Fast Delivery', description: 'Free shipping on eligible orders above ₹499' },
  { icon: ShieldCheck, title: 'Secure Payments', description: '100% secure transactions with SSL encryption' },
  { icon: BadgeCheck, title: 'Quality Products', description: 'Genuine components from trusted brands only' },
  { icon: RotateCcw, title: 'Easy Returns', description: '7-day hassle-free return policy on all items' },
  { icon: Headphones, title: 'Expert Support', description: 'Technical help from real engineers, not bots' },
];

export function BenefitsSection() {
  return (
    <section className="container-page py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <benefit.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">{benefit.title}</h3>
            <p className="text-xs text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
