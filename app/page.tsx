'use client'

import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import  ThemeSwitcher  from '@/components/ThemeSwitcher';
import { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/loading';
import Link from "next/link";
import { Menu, Search, CircleUser, Package2, CircleArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Logo } from '@/components/logo';
import MovieCardList from "@/components/MovieCardList";

const movies = [
  {
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },{
    image: "https://m.media-amazon.com/images/M/MV5BNjBmYzFmODktNDIyZC00NWFmLTk2NTctYmZiY2E2OTA2OTc0XkEyXkFqcGc@._V1_QL75_UX280_CR0,0,280,414_.jpg",
    title: "Sample Play 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut libero ac leo gravida facilisis.",
    rating: "9.0/10"
  },];
const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [clownHornAudio, setClownHornAudio] = useState<HTMLAudioElement | null>(null);
  const [userSession, setUserSession] = useState<Session | null>(null);  

  const initializeAudio = () => {
    const audioFiles = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'];
    const randomIndex = Math.floor(Math.random() * audioFiles.length);

    const audioElement = new Audio(audioFiles[randomIndex]);
    audioElement.load();
  
    // Save the audio element to the state
    setClownHornAudio(audioElement);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUserSession(session);
      
      if (!session || !session.user.email) {
        router.replace('/login');
        
      } else {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  useEffect(() => {
    initializeAudio();
  }, []);
  
  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
    router.replace('/login');
  };
  
  const playClownHorn = () => {
    if (clownHornAudio) {
      clownHornAudio.play();
    } else {
      console.error('Clown horn audio element not initialized');
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }

  // Define the default profile picture path
  const defaultProfilePicture = '/logo.png';

  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo className="h-6 w-15" />
          </Link>
          {/* Add other links here */}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Logo className="h-6 w-6" />
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 justify-center w-full">
          <form className="relative flex items-center justify-center w-full">
            <div className="relative flex items-center w-full max-w-md">
              <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search For Movies or Series.."
                className="[&::-webkit-search-cancel-button]:hidden pl-10 pr-10 py-2 w-full text-center"
              />
              <Button 
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 w-10"
              >
                <CircleArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
        <div>
          {userSession && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  {userSession.user.image ? (
                    <img
                      src={userSession.user.image}
                      alt="Profile"
                      className="rounded-full"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={defaultProfilePicture}
                      alt="Profile"
                      className="rounded-full"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={playClownHorn}>Hi, {userSession.user.name || (userSession.user.email && userSession.user.email.split('@')[0]) || 'User'}!</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                  <ThemeSwitcher info='yes'/>  
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>   
      <main className='' >
        <style jsx>{`
          .shadow-green {
            box-shadow: 0 4px 6px -1px rgba(225, 29, 72, 0.5), 0 2px 4px -1px rgba(225, 29, 72, 0.06);
          }
        `}</style>
        <div className="rounded-lg shadow-green shadow-lg p-2 mb-4">
          <div className="flex w-full items-center justify-center">
            <div className="flex gap-5">
              <select className="bg-background p-1 rounded-md">
                <option value="genre">Type</option>
                {/* Add genre options here */}
              </select>
              <select className="bg-background p-1 rounded-md">
                <option value="year">Year</option>
                {/* Add year options here */}
              </select>
              <select className="bg-background p-1 rounded-md">
                <option value="genre">Genre</option>
                {/* Add genre options here */}
              </select>
              <select className="bg-background p-1 rounded-md">
                <option value="language">Language</option>
                {/* Add language options here */}
              </select>
            </div>
          </div>
        </div>
        <div id='moviecontent' className='' >
        <MovieCardList movies={movies} />
        </div>
        <ThemeSwitcher info='no' />
      </main>
    </div>
  );
};

export default Page;
