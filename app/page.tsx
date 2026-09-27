'use client';
import { useMemo, useState } from 'react';
import { buildItinerary, mapsUrl } from '../lib/plan.mjs';
type Place = { name: string; city: string; notes: string };
const sample: Place[] = [{ name: 'Museum Island', city: 'Berlin', notes: 'Art and architecture' }, { name: 'East Side Gallery', city: 'Berlin', notes: 'Outdoor murals' }, { name: 'Sanssouci Palace', city: 'Potsdam', notes: 'Half-day trip' }];
export default function Page() {
  const [places, setPlaces] = useState<Place[]>(sample);
  const [draft, setDraft] = useState<Place>({ name: '', city: '', notes: '' });
  const [days, setDays] = useState(2);
  const [image, setImage] = useState<string | null>(null);
  const itinerary = useMemo(() => buildItinerary(places, days), [places, days]);
  function add() { if (!draft.name.trim()) return; setPlaces([...places, draft]); setDraft({ name: '', city: '', notes: '' }); }
  function upload(file?: File) { if (!file) return; if (file.size > 5 * 1024 * 1024) return; const reader = new FileReader(); reader.onload = () => setImage(String(reader.result)); reader.readAsDataURL(file); }
  return <main><div className="eyebrow">TRAVEL PLANNING · INTERACTIVE DEMO</div><header><h1>AI Trip Planner</h1><p>Collect places and shape a day-by-day trip. This preview uses manual place entry; image extraction awaits a vision API key.</p></header>
    <section><h2>Add a place</h2><div className="grid"><label>Place<input type="text" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></label><label>City<input type="text" value={draft.city} onChange={e => setDraft({ ...draft, city: e.target.value })} /></label><label>Notes<input type="text" value={draft.notes} onChange={e => setDraft({ ...draft, notes: e.target.value })} /></label></div><div className="row"><button onClick={add}>Add place</button><label>Days<input type="number" min="1" max="14" value={days} onChange={e => setDays(Number(e.target.value))} /></label></div></section>
    <section><h2>Screenshot reference</h2><input type="file" accept="image/*" onChange={e => upload(e.target.files?.[0])} />{image && <p><img src={image} alt="Selected travel reference" style={{ maxWidth: '100%', maxHeight: 240 }} /></p>}<p className="muted">Image stays in this browser. Automatic OCR and vision extraction are not active in the demo.</p></section>
    <section><h2>Itinerary</h2><div className="grid">{itinerary.map(day => <article key={day.day}><span className="pill">Day {day.day}</span>{day.places.length ? day.places.map(place => <div key={`${place.city}-${place.name}`}><h3>{place.name}</h3><p>{place.city} · {place.notes}</p><a href={mapsUrl(place)} target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div>) : <p className="muted">Open day</p>}</article>)}</div></section><footer>Routes are grouped from entered city labels. Travel times and opening hours are not checked; verify before booking.</footer></main>;
}
