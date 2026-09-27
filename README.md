# AI Trip Planner

Next.js travel planning demo. Enter places, choose a day count, and get an itinerary with Google Maps search links. Screenshot uploads are previewed locally and are not transmitted.

Run `pnpm install`, `pnpm --filter ai-trip-planner dev`, and open `http://127.0.0.1:3010`. Run `pnpm --filter ai-trip-planner test` for itinerary logic.

The supplied prompt requires image understanding through OpenAI and route optimization with a Maps API. No API credentials are configured here, so those features are not active. Current grouping is based on manually entered city labels, not geocoded distances. Do not rely on it for travel times, opening hours, or bookings.
