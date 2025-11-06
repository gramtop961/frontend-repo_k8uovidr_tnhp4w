import { useState, useEffect } from 'react';

const leagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'MLS', 'Eredivisie', 'Primeira Liga'];
const countries = ['England', 'Spain', 'Italy', 'Germany', 'France', 'USA', 'Netherlands', 'Portugal', 'Brazil', 'Argentina'];
const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Umbro', 'Kappa', 'Hummel', 'Macron'];
const types = ['Home', 'Away', 'Third'];

export default function FiltersBar({ filters, setFilters }) {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const now = new Date().getFullYear();
    const start = 2000;
    const arr = [];
    for (let y = now; y >= start; y--) arr.push(y);
    setYears(arr);
  }, []);

  const set = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="w-full border-b border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <select value={filters.year} onChange={(e) => set('year', e.target.value)} className="h-10 px-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select value={filters.type} onChange={(e) => set('type', e.target.value)} className="h-10 px-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
          <option value="">Kit</option>
          {types.map((t) => (
            <option key={t} value={t.toLowerCase()}>{t}</option>
          ))}
        </select>
        <select value={filters.league} onChange={(e) => set('league', e.target.value)} className="h-10 px-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
          <option value="">League</option>
          {leagues.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select value={filters.country} onChange={(e) => set('country', e.target.value)} className="h-10 px-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
          <option value="">Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={filters.brand} onChange={(e) => set('brand', e.target.value)} className="h-10 px-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
          <option value="">Brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <input
          value={filters.color}
          onChange={(e) => set('color', e.target.value)}
          placeholder="Color"
          className="h-10 px-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
        />
      </div>
    </div>
  );
}
