'use client';

import { LoginForm } from '@/components/login-form';
import AutoCarousel from '@/components/module/sign-in/auto-carousel';
import { Combine } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link href='/login' className='flex items-center gap-2 font-medium'>
            <div className='flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <Combine className='size-4' />
            </div>
            2K26 Automation
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block'>
        <AutoCarousel />
      </div>
    </div>
  );
}
