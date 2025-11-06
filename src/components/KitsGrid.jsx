import { useMemo } from 'react';
import { Heart, Scale } from 'lucide-react';

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

export default function KitsGrid({ query, filters, onToggleFavorite, favorites, onToggleCompare, compare }) {
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demoKits.filter((k) => {
      const matchesQuery = !q || [k.club, k.league, k.country, k.brand, k.sponsor, k.description].some((v) => v.toLowerCase().includes(q)) || String(k.season).includes(q) || k.colors.some((c) => c.includes(q));
      const byYear = !filters.year || String(k.season) === String(filters.year);
      const byType = !filters.type || k.type === filters.type;
      const byLeague = !filters.league || k.league === filters.league;
      const byCountry = !filters.country || k.country === filters.country;
      const byBrand = !filters.brand || k.brand === filters.brand;
      const byColor = !filters.color || k.colors.some((c) => c.toLowerCase().includes(filters.color.toLowerCase()));
      return matchesQuery && byYear && byType && byLeague && byCountry && byBrand && byColor;
    });
  }, [query, filters]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((k) => (
          <article key={k.id} className="group rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={k.imgFront} alt={`${k.club} ${k.season} ${k.type} front`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <img src={k.imgBack} alt={`${k.club} ${k.season} ${k.type} back`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => onToggleFavorite(k.id)}
                className={`absolute top-3 left-3 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md backdrop-blur border ${favorites.has(k.id) ? 'bg-rose-500/90 text-white border-rose-600/60' : 'bg-black/30 text-white/90 border-white/20'}`}
              >
                <Heart className="h-4 w-4" /> {favorites.has(k.id) ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={() => onToggleCompare(k.id)}
                className={`absolute top-3 right-3 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md backdrop-blur border ${compare.includes(k.id) ? 'bg-emerald-500/90 text-white border-emerald-600/60' : 'bg-black/30 text-white/90 border-white/20'}`}
              >
                <Scale className="h-4 w-4" /> Compare
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold leading-tight">{k.club} <span className="text-muted-foreground font-normal">{k.season} • {k.type[0].toUpperCase()+k.type.slice(1)}</span></h3>
                <span className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/10">{k.brand}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{k.description}</p>
              <div className="mt-3 text-xs text-muted-foreground">Sponsor: {k.sponsor} • Colors: {k.colors.join(', ')}</div>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && (
        <div className="text-center text-muted-foreground py-16">No kits match your filters yet.</div>
      )}
    </section>
  );
}
