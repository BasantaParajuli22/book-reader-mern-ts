"use client"
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Novel {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string[];
  status: string;
  coverImage: string;
  readCount: number;
  createdAt: string;
  updatedAt: string;
  latestChapters: { chapterNumber: number; createdAt: string }[];
}

// export default function Home() {
  
  export default function Home() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchNovels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books"); // Assuming backend runs on port 5000
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNovels(data.data);
      } catch (error) {
        console.error("Failed to fetch novels:", error);
      }
    };

    fetchNovels();
  }, []);
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome{user ? `, ${user.username}` : ""} to BookReader</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover thousands of novels across multiple genres. Read, bookmark, and enjoy your favorite stories.
        </p>
      </section>

      {/* Novels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {novels.map((novel) => (
          <Card key={novel._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="relative w-full h-[200px] mb-4">
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  fill
                  className="object-cover rounded-t-xl"
                  priority
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{novel.title}</CardTitle>
                  <CardDescription>by {novel.author}</CardDescription>
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <HeartIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{novel.description}</p>
              <div className="flex gap-2 flex-wrap mb-3">
                {novel.genre.map((g) => (
                  <span
                    key={g}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{novel.latestChapters.length} Chapters</span>
                <span>{novel.status}</span>
              </div>
            </CardContent>

            <CardFooter className="justify-between border-t">
              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <HeartIcon className="h-4 w-4" /> {novel.readCount}
                </span>
                <span className="flex items-center gap-1">
                  <BookmarkIcon className="h-4 w-4" /> 0
                </span>
              </div>
              <Button>
                Start Reading
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Icon components
function HeartIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

function BookmarkIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </svg>
  );
}

function ArrowRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
