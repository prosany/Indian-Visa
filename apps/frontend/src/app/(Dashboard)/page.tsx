'use client';

import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function Page() {
  const [hasChrome, setHasChrome] = useState<boolean>(false);

  useEffect(() => {
    setHasChrome(!!window.chrome);
  }, []);

  const handleExtensionCheck = async () => {
    try {
      chrome.runtime.sendMessage(
        process.env.NEXT_PUBLIC_EXTENSION_ID,
        { action: 'isExtensionInstalled' },
        (response) => {
          console.log('isExtensionInstalled', response);
        },
      );
    } catch (error) {
      console.error('Error checking extension installation:', error);
    }
  };

  const getCaptchaFromExtension = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!hasChrome) {
        return reject('Chrome runtime not available');
      }

      window.chrome.runtime.sendMessage(
        process.env.NEXT_PUBLIC_EXTENSION_ID!,
        { action: 'getCaptcha' },
        (response) => {
          if (window.chrome.runtime.lastError) {
            reject(window.chrome.runtime.lastError.message);
          } else {
            resolve(response?.value || null);
          }
        },
      );
    });
  };

  const handleGetCaptcha = async () => {
    try {
      const value = await getCaptchaFromExtension();

      console.log('Captcha:', value);

      if (!value) {
        console.warn('Captcha not found or timeout');
      }
    } catch (error) {
      console.error('Extension error:', error);
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-vertical:h-4 data-vertical:self-auto'
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='aspect-video rounded-xl bg-muted/50' />
            <div className='aspect-video rounded-xl bg-muted/50' />
            <div className='aspect-video rounded-xl bg-muted/50' />
          </div>
          <div className='min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min' />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
