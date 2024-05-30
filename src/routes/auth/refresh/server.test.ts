import { describe, it, expect, vi } from 'vitest';
import { COOKIE_SESSION_NAME } from '../constants';
import { POST } from './+server';

vi.mock('@sveltejs/kit', () => ({
  json: vi.fn((data) => data),
}));

describe('POST function', () => {
  it('should set the cookie if token is provided', async () => {
    const mE = {
      request: {
        json: vi.fn().mockResolvedValue({
          [COOKIE_SESSION_NAME]: 'test-token',
        }),
      },
      cookies: {
        set: vi.fn(),
        delete: vi.fn(),
      },
    };

    const response = await POST(mE);

    expect(mE.request.json).toHaveBeenCalled();
    expect(mE.cookies.set).toHaveBeenCalledWith(COOKIE_SESSION_NAME, 'test-token', { path: '/' });
    expect(mE.cookies.delete).not.toHaveBeenCalled();
    expect(response).toEqual({ ok: true });
  });

  it('should delete the cookie if token is not provided', async () => {
    const mE = {
      request: {
        json: vi.fn().mockResolvedValue({}),
      },
      cookies: {
        set: vi.fn(),
        delete: vi.fn(),
      },
    };

    const response = await POST(mE);

    expect(mE.request.json).toHaveBeenCalled();
    expect(mE.cookies.set).not.toHaveBeenCalled();
    expect(mE.cookies.delete).toHaveBeenCalledWith(COOKIE_SESSION_NAME, { path: '/' });
    expect(response).toEqual({ ok: true });
  });
});
