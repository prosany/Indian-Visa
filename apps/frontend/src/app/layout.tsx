import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { publicSans } from '@/assets/fonts';
import CoreProviderLayout from '@/layouts/CoreProviderLayout';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'QNET - Intelligent Date Selection for Indian Visa!',
  description:
    'QNET is an intelligent date assignment tool designed to help Indian visa applicants secure their appointments. By analyzing historical data and current trends, QNET predicts the best dates for visa appointments, increasing the chances of securing a slot. With its user-friendly interface and accurate predictions, QNET is the ultimate solution for anyone looking to navigate the complex process of Indian visa applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn('h-full', 'antialiased', 'font-sans', publicSans.variable)}
    >
      <body className='min-h-full flex flex-col'>
        <CoreProviderLayout>{children}</CoreProviderLayout>
        <Toaster />
      </body>
    </html>
  );
}
