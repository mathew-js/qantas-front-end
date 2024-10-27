import { renderHook, waitFor } from '@testing-library/react';
import { useFetchData } from './useFetchData';
import { Airport } from '../interfaces/Airport';

const mockAirports: Partial<Airport>[] = Array.from({ length: 30 }, (_, i) => ({
  airportCode: `Airport Code ${i}`,
  airportName: `Airport ${i}`,
  country: { countryCode: `Country Code ${i}`, countryName: `Country ${i}` },
}));

describe('useFetchData', () => {
  const fetchSpy = vi.spyOn(window, 'fetch');

  it('should fetch data', async () => {
    const mockResolveValue = {
      ok: true,
      json: () => new Promise((resolve) => resolve(mockAirports)),
    };
    fetchSpy.mockReturnValue(mockResolveValue as Response);

    const { result } = renderHook(() => useFetchData(''));

    expect(result.current.loading).toEqual(true);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockAirports);

      expect(result.current.loading).toEqual(false);
    });
  });

  test('handles network error correctly', async () => {
    const mockResolveValue = {
      ok: false,
      status: 404,
    };
    fetchSpy.mockReturnValue(mockResolveValue as Response);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useFetchData(''));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('HTTP status: 404')
      );

      consoleSpy.mockRestore();
    });
  });
});
