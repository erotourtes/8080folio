import { describe, it, expect, vi } from 'vitest';
import { redirect } from '@sveltejs/kit';
import { load } from './+layout.server';

vi.mock('@sveltejs/kit', () => ({
  redirect: vi.fn().mockImplementation(() => {
    const error = new Error('Redirect');
    // eslint-disable-next-line
    (error as any).status = 303;
    // eslint-disable-next-line
    (error as any).location = '/auth';
    throw error;
  }),
}));

describe('load', () => {
  it('should redirect to /auth if user is not present', async () => {
    const mockEvent = { locals: { user: null } };

    try {
      await load(mockEvent);
    } catch (error) {
      console.log('Error here');
      expect(error).toHaveProperty('status', 303);
      expect(error).toHaveProperty('location', '/auth');
    }

    expect(redirect).toHaveBeenCalledWith(303, '/auth');
  });

  it('should return user if user is present', async () => {
    const mockUser = { id: '123', name: 'John Doe' };
    const mockEvent = {
      locals: {
        user: mockUser,
      },
    };

    const result = await load(mockEvent);

    expect(result).toEqual({ user: mockUser });
  });
});
