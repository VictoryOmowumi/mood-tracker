"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchJournalProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchJournal({ value, onChange, className }: SearchJournalProps) {
  return (
    <div className={`relative w-full  ${className || ""}`}>
      <Input
        placeholder="Search entries..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-8 shadow-none border-border"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 p-0"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}