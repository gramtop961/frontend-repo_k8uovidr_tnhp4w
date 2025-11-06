import { X } from 'lucide-react';

export default function CompareDrawer({ open, onClose, items }) {
  if (!open) return null;
  const [a, b] = items;
  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-neutral-900 border-t border-black/10 dark:border-white/10 rounded-t-2xl shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Compare Kits</h2>
            <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-md hover:bg-black/5 dark:hover:bg-white/5">
              <X className="h-5 w-5" />
            </button>
          </div>
          {items.length < 2 ? (
            <p className="text-sm text-muted-foreground mt-2">Select two kits to compare.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {[a, b].map((k, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={k.imgFront} alt={`${k.club} ${k.season} ${k.type} front`} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                      <div className="text-sm font-medium">{k.club} • {k.season} • {k.type}</div>
                    </div>
                  </div>
                  <div className="p-4 text-sm">
                    <div><span className="text-muted-foreground">Brand:</span> {k.brand}</div>
                    <div><span className="text-muted-foreground">Sponsor:</span> {k.sponsor}</div>
                    <div><span className="text-muted-foreground">Colors:</span> {k.colors.join(', ')}</div>
                    <p className="mt-2 text-muted-foreground">{k.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
