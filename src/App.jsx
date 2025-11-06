import { useMemo, useState } from 'react';
import Header from './components/Header';
import FiltersBar from './components/FiltersBar';
import KitsGrid from './components/KitsGrid';
import CompareDrawer from './components/CompareDrawer';
import FavoritesBar from './components/FavoritesBar';

// Demo dataset shared with FavoritesBar (import from KitsGrid file would cause circular ref for demo).
const demoKits = [
  {
    id: 'barca-2010-home',
    club: 'FC Barcelona',
    league: 'La Liga',
    country: 'Spain',
    season: 2010,
    type: 'home',
    brand: 'Nike',
    colors: ['blue', 'red'],
    sponsor: 'Qatar Foundation',
    imgFront: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    imgBack: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=800&auto=format&fit=crop',
    description: 'Classic blaugrana stripes with yellow trim. Won La Liga under Guardiola.'
  },
  {
    id: 'milan-2007-home',
    club: 'AC Milan',
    league: 'Serie A',
    country: 'Italy',
    season: 2007,
    type: 'home',
    brand: 'Adidas',
    colors: ['red', 'black'],
    sponsor: 'bwin',
    imgFront: 'https://images.unsplash.com/photo-1614186510857-154a0c1f6d81?q=80&w=800&auto=format&fit=crop',
    imgBack: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    description: 'Rossoneri stripes from Champions League winning era.'
  },
  {
    id: 'arsenal-2006-away',
    club: 'Arsenal',
    league: 'Premier League',
    country: 'England',
    season: 2006,
    type: 'away',
    brand: 'Nike',
    colors: ['gold', 'red'],
    sponsor: 'O2',
    imgFront: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=800&auto=format&fit=crop',
    imgBack: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    description: 'Highbury farewell season gold away kit.'
  },
  {
    id: 'juve-2019-third',
    club: 'Juventus',
    league: 'Serie A',
    country: 'Italy',
    season: 2019,
    type: 'third',
    brand: 'Adidas',
    colors: ['white', 'pink'],
    sponsor: 'Jeep',
    imgFront: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    imgBack: 'https://images.unsplash.com/photo-1614186510857-154a0c1f6d81?q=80&w=800&auto=format&fit=crop',
    description: 'Modern minimalist design with salmon accents.'
  },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ year: '', type: '', league: '', country: '', brand: '', color: '' });
  const [favorites, setFavorites] = useState(() => new Set(JSON.parse(localStorage.getItem('favorites') || '[]')));
  const [compare, setCompare] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const favoritesCount = favorites.size;
  const compareCount = compare.length;

  const onToggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem('favorites', JSON.stringify([...next]));
      return next;
    });
  };

  const onToggleCompare = (id) => {
    setCompare((prev) => {
      let next = [...prev];
      if (next.includes(id)) next = next.filter((x) => x !== id);
      else if (next.length < 2) next.push(id);
      if (next.length === 2) setDrawerOpen(true);
      return next;
    });
  };

  const compareItems = useMemo(() => demoKits.filter(k => compare.includes(k.id)), [compare]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-neutral-950 dark:to-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Header query={query} setQuery={setQuery} favoritesCount={favoritesCount} compareCount={compareCount} />
      <FiltersBar filters={filters} setFilters={setFilters} />
      <KitsGrid
        query={query}
        filters={filters}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
        onToggleCompare={onToggleCompare}
        compare={compare}
      />
      <FavoritesBar favorites={favorites} kits={demoKits} onRemove={(id) => onToggleFavorite(id)} />
      <CompareDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} items={compareItems} />
      <footer className="py-10 text-center text-sm text-muted-foreground">Demo data shown. Expandable with club, season, and league databases.</footer>
    </div>
  );
}
