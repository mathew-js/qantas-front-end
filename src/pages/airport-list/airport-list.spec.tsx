import { render, fireEvent } from '@testing-library/react';
import * as FetchDataHook from '../../hooks/useFetchData';
import { AirportList } from './AirportList';
import { Airport } from '../../interfaces/Airport';
import { BrowserRouter } from 'react-router-dom';

const mockAirports: Partial<Airport>[] = Array.from({ length: 30 }, (_, i) => ({
  airportCode: `Airport Code ${i}`,
  airportName: `Airport ${i}`,
  country: { countryCode: `Country Code ${i}`, countryName: `Country ${i}` },
}));

describe('AirportList', () => {
  const useFetchDataSpy = vi.spyOn(FetchDataHook, 'useFetchData');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays loading state when data is loading', () => {
    useFetchDataSpy.mockReturnValue({
      loading: true,
      data: null,
    });

    const { getByText, getByTestId } = render(<AirportList />);

    expect(getByTestId('partial-loading').children.length).toBe(20);
    expect(getByText('Searching...')).toBeTruthy();
  });

  test('displays fetched airport data', () => {
    useFetchDataSpy.mockReturnValue({
      loading: false,
      data: mockAirports,
    });

    const { getByText } = render(
      <BrowserRouter>
        <AirportList />
      </BrowserRouter>
    );

    expect(getByText(`${mockAirports.length} airports found.`)).toBeTruthy();
    mockAirports.slice(0, 20).forEach((airport) => {
      expect(getByText(airport.airportName)).toBeTruthy();
      expect(getByText(airport.country?.countryName)).toBeTruthy();
    });
  });

  test('displays an error message when data fetching fails', () => {
    useFetchDataSpy.mockReturnValue({
      loading: false,
      data: null,
    });

    const { getByText } = render(
      <BrowserRouter>
        <AirportList />
      </BrowserRouter>
    );

    expect(getByText('Failed to fetch airport data.')).toBeTruthy();
  });

  test('loads more airports when "See more" button is clicked', () => {
    useFetchDataSpy.mockReturnValue({
      loading: false,
      data: mockAirports,
    });

    const { getAllByText, getByText } = render(
      <BrowserRouter>
        <AirportList />
      </BrowserRouter>
    );

    expect(getAllByText('Airport:')).toHaveLength(20);

    const seeMoreButton = getByText('See more');
    fireEvent.click(seeMoreButton);

    expect(getAllByText('Airport:')).toHaveLength(30);
  });
});
