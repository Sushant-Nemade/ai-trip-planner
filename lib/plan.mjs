export function buildItinerary(places, days) {
  const count = Math.max(1, Math.min(14, Number(days) || 1));
  const clean = places.map(p => ({ name: String(p.name ?? '').trim(), city: String(p.city ?? '').trim(), notes: String(p.notes ?? '').trim() })).filter(p => p.name);
  const buckets = Array.from({ length: count }, (_, index) => ({ day: index + 1, places: [] }));
  const grouped = new Map();
  for (const place of clean) { const key = place.city.toLowerCase() || 'other'; const list = grouped.get(key) ?? []; list.push(place); grouped.set(key, list); }
  const clusters = [...grouped.values()].sort((a, b) => b.length - a.length);
  let i = 0;
  for (const cluster of clusters) for (const place of cluster) { buckets[i % count].places.push(place); i++; }
  return buckets;
}
export function mapsUrl(place) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${place.city}`.trim())}`; }
