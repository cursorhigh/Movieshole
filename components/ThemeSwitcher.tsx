"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <Button variant="outline" size="icon" onClick={handleThemeChange}>
      {theme === "light" ? (
        <>
          <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Dark Mode</span>
        </>
      )}
    </Button>
  )
}
