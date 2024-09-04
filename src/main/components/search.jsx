import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BiSearchAlt } from "react-icons/bi";

const SearchBar = () => {
  return (
    <>
      <div className="flex items-center w-full max-w-md rounded-md bg-card shadow-sm">
        <Input
          type="search"
          placeholder="Search..."
          className="flex-1 rounded-l-md border-0 focus:ring-0"
        />
        <Button variant="ghost" size="icon" className="rounded-r-md">
          <BiSearchAlt className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </>
  );
};

export default SearchBar;
