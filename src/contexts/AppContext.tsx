"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import type { Language, Theme } from "@/types/adhkar";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  playAudio: (url: string) => void;
  stopAudio: () => void;
  playingUrl: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize with defaults to avoid hydration mismatch
  const [language, setLanguageState] = useState<Language>("ar");
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    const savedLang = localStorage.getItem("adhkar-lang") as Language;
    // eslint-disable-next-line
    if (savedLang) setLanguageState(savedLang);

    const savedTheme = localStorage.getItem("adhkar-theme") as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    }
    setMounted(true);
  }, []);

  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("adhkar-lang", lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("adhkar-theme", t);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, mounted]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setPlayingUrl(null);
  }, []);

  const playAudio = useCallback(
    (url: string) => {
      // Pause current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // If clicking the same audio, just stop it (toggle off)
      if (playingUrl === url) {
        setPlayingUrl(null);
        audioRef.current = null;
        return;
      }

      const audio = new Audio(url);

      // Cleanup when audio finishes naturally
      audio.onended = () => {
        setPlayingUrl(null);
        audioRef.current = null;
      };

      // Play with error handling for race conditions (AbortError)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Ignore AbortError which happens when pausing while loading
          if (error.name === "AbortError") return;
          console.error("Audio playback failed:", error);
          // Reset state if playback failed
          setPlayingUrl(null);
          audioRef.current = null;
        });
      }

      audioRef.current = audio;
      setPlayingUrl(url);
    },
    [playingUrl],
  );

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        playAudio,
        stopAudio,
        playingUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
