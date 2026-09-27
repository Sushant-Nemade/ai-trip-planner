export type Place = { name: string; city: string; notes: string };
export function buildItinerary(places: Place[], days: number): { day: number; places: Place[] }[];
export function mapsUrl(place: Place): string;
