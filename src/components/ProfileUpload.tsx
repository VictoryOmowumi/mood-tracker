// components/ProfileUpload.tsx
"use client";

import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

export function ProfileUpload() {
  const { currentUser, uploadProfilePicture } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    // Validate file
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      return;
    }

    if (!file.type.match(/image.(jpeg|jpg|png|gif)$/)) {
      setError("Only JPG, PNG, or GIF images are allowed");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      await uploadProfilePicture(file);
    } catch (err) {
      setError("Failed to upload profile picture");
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex md:flex-row flex-col md:items-center gap-4">
      <Avatar className="w-40 md:w-48 rounded-2xl h-40 md:h-48  border border-border">
        <AvatarImage 
          src={currentUser?.photoURL || ""} 
          alt={currentUser?.displayName || "User"} 
        />
        <AvatarFallback className="text-4xl font-medium rounded-2xl bg-background">
          {currentUser?.displayName?.[0].toUpperCase() || "U"}   {currentUser?.displayName?.[1].toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <Button 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Change Profile Picture"
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleUpload}
            className="hidden"
            disabled={isUploading}
          />
        </Button>
        <p className="text-xs text-muted-foreground">
          JPG, PNG, or GIF (max 2MB)
        </p>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}