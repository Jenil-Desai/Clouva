import { Button } from '@/components/ui/button';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';

export default async function Navbar() {
  const headersList = await headers();
  const userEmail = headersList.get('x-user-email');
  const userFirstName = headersList.get('x-user-fname');
  const userLastName = headersList.get('x-user-lname');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground flex items-center">
              Clouva
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {userEmail ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>{userFirstName![0] + userLastName![0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={"/transfer"}>Transfer</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/sign-out"}>Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant={"default"} className="border-primary/50 text-secondary hover:bg-primary/10 hover:border-primary">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant={"secondary"} className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
