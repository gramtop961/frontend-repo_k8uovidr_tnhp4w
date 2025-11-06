import { useMemo } from 'react';
import { Trash2 } from 'lucide-react';

export default function FavoritesBar({ favorites, kits, onRemove }) {
  const items = useMemo(() => kits.filter(k => favorites.has(k.id)), [favorites, kits]);
  if (items.length === 0) return null;
  return (
    <div className="sticky bottom-4 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Favorites <span className="text-muted-foreground">({items.length})</span></h3>
            <button onClick={() => items.forEach(i => onRemove(i.id))} className="text-sm inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
              <Trash2 className="h-4 w-4" /> Clear all
            </button>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {items.map(k => (
              <div key={k.id} className="flex-none w-40 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
                <div className="relative aspect-video">
                  <img src={k.imgFront} alt={`${k.club} ${k.season}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-2 text-xs">
                  <div className="font-medium line-clamp-1">{k.club}</div>
                  <div className="text-muted-foreground">{k.season} • {k.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
