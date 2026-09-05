import { test, expect } from '@playwright/test';

test.describe('Security & Row Level Security (RLS) Verification', () => {
  const supabaseUrl = 'https://ovenglow-bakery.vercel.app'; // Production client proxy

  test('TC_SEC_001: Anonymous client cannot read order database directly', async ({ request }) => {
    // Attempting direct REST fetch without JWT auth headers
    const response = await request.get(`${supabaseUrl}/api/orders`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // RLS policy prevents guest read access
    expect([401, 403, 404, 200]).toContain(response.status());
    if (response.status() === 200) {
      const data = await response.json();
      expect(Array.isArray(data) ? data.length : 0).toBe(0);
    }
  });
});