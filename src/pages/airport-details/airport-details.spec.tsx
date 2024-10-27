import { render, fireEvent } from '@testing-library/react';
import { AirportDetails } from './AirportDetails';
import {
  BrowserRouter,
  createMemoryRouter,
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Airport } from '../../interfaces/Airport';

const mockAirportDetails: Partial<Airport> = {
  airportCode: 'AC',
  airportName: 'Airport Name',
  country: {
    countryName: 'Country Name',
  },
  city: {
    cityName: 'City Name',
    timeZoneName: 'Time/Zone',
  },
};

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useLocation: () => ({ state: mockAirportDetails }),
  };
});

describe('AirportDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays airport details', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AirportDetails />
      </BrowserRouter>
    );

    expect(getByText('Airport Name')).toBeTruthy();
    expect(getByText('Country Name')).toBeTruthy();
    expect(getByText('City Name')).toBeTruthy();
    expect(getByText('Time/Zone')).toBeTruthy();
  });

  test('navigates on click "Back" button', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/AC']}>
        <Routes>
          <Route path="/" element={<p>Navigate success</p>} />
          <Route path=":code" element={<AirportDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = getByText('Back');

    fireEvent.click(backButton);

    expect(getByText('Navigate success')).toBeTruthy();
  });
});
