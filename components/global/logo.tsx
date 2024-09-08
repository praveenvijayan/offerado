"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Logo() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure the component is mounted before checking the theme
    setMounted(true);
  }, []);

  if (!mounted) {
    // Don't render the logo until the theme is determined
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === "dark" ? (
        <Image src="/logo-white.svg" width={100} height={100} alt="Offerado" />
      ) : (
        <Image src="/logo-dark.svg" width={100} height={100} alt="Offerado" />
      )}
    </>
  );
}
