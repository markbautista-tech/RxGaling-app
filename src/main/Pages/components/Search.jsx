import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { BiSearchAlt } from "react-icons/bi";

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="relative w-full max-w-md">
        <div className="hidden lg:flex items-center justify-end gap-2 rounded-md px-3 py-2">
          <Input
            type="search"
            placeholder="Search..."
            className="w-[300px] bg-transparent focus:outline-none shadow-sm"
          />
          <BiSearchAlt className="w-6 h-6" />
        </div>
        <div className="flex lg:hidden items-center gap-2 rounded-md bg-background">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md text-muted-foreground"
              >
                <BiSearchAlt className="w-6 h-6" />
                <span className="sr-only">Search</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full pt-10">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-transparent focus:outline-none"
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
