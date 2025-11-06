import { useEffect, useState } from 'react';
import { Search, Sun, Moon, Heart, SlidersHorizontal } from 'lucide-react';

export default function Header({ query, setQuery, favoritesCount, compareCount }) {
  const [theme, setTheme] = useState('light');
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 bg-white/80 dark:bg-black/30 border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white grid place-items-center font-black">FK</div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">All Season Football Kits Explorer</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Browse kits by club, season, league, type, and brand
            </p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="hidden lg:flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/5 dark:bg-white/5">
            <Heart className="h-4 w-4 text-rose-500" />
            <span className="tabular-nums">{favoritesCount}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/5 dark:bg-white/5">
            <SlidersHorizontal className="h-4 w-4 text-emerald-500" />
            <span className="tabular-nums">{compareCount}</span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-24 h-12 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            placeholder="Search by club, league, country, sponsor, brand, color or notes..."
          />
          <button
            onClick={() => setShowTips((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
          >
            Tips
          </button>
        </div>
        {showTips && (
          <div className="mt-2 text-xs text-muted-foreground">
            Try: "Barcelona 2010", "Premier League home", "Adidas red", "Italy 2006".
          </div>
        )}
      </div>
    </header>
  );
}
