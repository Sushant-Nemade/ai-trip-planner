import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { buildItinerary, mapsUrl } from '../lib/plan.mjs';
test('builds bounded itinerary and safe maps URL', () => {
  const days = buildItinerary([{ name: 'Museum', city: 'Berlin' }], 2);
  assert.equal(days.length, 2);
  assert.match(mapsUrl({ name: 'Museum', city: 'Berlin' }), /Museum%20Berlin/);
});
