'use client';

import { useEffect, useState } from 'react';

const Home = () => {
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
    <div>
      <h1 className='text-xl font-semibold'>
        BlackSignal - Intelligent Date Assignment for Indian Visa!
      </h1>
      {hasChrome ? (
        <p className='mt-4 text-lg'>
          Chrome is detected! You can use the extension to get notified about
          available visa appointment dates.
        </p>
      ) : (
        <p className='mt-4 text-lg text-red-500'>
          Chrome is not detected. Please use Google Chrome to access the
          extension features.
        </p>
      )}

      <button
        onClick={handleExtensionCheck}
        className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Check Extension Installation
      </button>
      <button
        onClick={handleGetCaptcha}
        className='mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
      >
        Get Captcha
      </button>
    </div>
  );
};

export default Home;
