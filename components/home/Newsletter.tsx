'use client';

import * as React from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { newsletterService } from '@/services/newsletterService';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Newsletter() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    const result = await newsletterService.subscribe(email.trim());
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  };

  return (
    <section className="container-page py-8">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-10 sm:px-12 sm:py-14">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-xl text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Stay Updated
          </h2>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            Get product launches, project ideas and exclusive offers delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Enter your email address"
              className="border-0 bg-white/95 text-foreground placeholder:text-muted-foreground focus-visible:ring-white"
              aria-label="Email address"
              required
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              variant="secondary"
              className="shrink-0 bg-white text-primary hover:bg-white/90"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>

          {status === 'success' && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-white">
              <CheckCircle2 className="h-4 w-4" />
              {message}
            </div>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-200">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
