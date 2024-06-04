'use client'

import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/loading';
const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const redirectToCorrectPage = async () => {
      const session = await getSession();
      if (session && session.user.email) {
        router.replace('/');
        setShowContent(true);
      } else {
        router.replace('/signup');
      }
      setTimeout(() => setLoading(false), 2160);
    };

    redirectToCorrectPage();
  }, [router]);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ redirect: false, callbackUrl: '/' });
    router.replace('/signup');
  };

  if (loading) {
    return <LoadingSpinner />; 
  }

  if (showContent) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <ThemeSwitcher />
      </div>
    );
  }

  return null;
};

export default Page;
