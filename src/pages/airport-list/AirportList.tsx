import { useFetchData } from '../../hooks/useFetchData';
import { AIRPORT_API_URL } from '../../constants/ApiUrls';
import { Airport } from '../../interfaces/Airport';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MAX_ITEMS = 20;

export function AirportList() {
  const airports = useFetchData<Airport[]>(AIRPORT_API_URL);

  const [groupedAirports, setGroupedAirports] = useState<Airport[]>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!airports.data) return;

    setGroupedAirports(airports.data.slice(0, MAX_ITEMS * page));
  }, [airports.data, page]);

  if (!airports.loading && !airports.data)
    return <p className="h4">Failed to fetch airport data.</p>;

  return (
    <>
      <ul className="list-unstyled card">
        <div className="bg-dark text-white rounded-top p-3">
          <h1 className="h2">Airports</h1>
          <p className="mb-0">
            {airports.data
              ? `${airports.data.length} airports found.`
              : 'Searching...'}
          </p>
        </div>

        {airports.loading && (
          <div data-testid="partial-loading">
            {[...Array(20).keys()].map((i) => (
              <div
                key={i}
                className="d-block border-bottom border-tertiary p-3 bg-light-hover"
              >
                <p className="placeholder-glow mb-0">
                  <span className="placeholder col-6"></span>
                </p>
                <p className="placeholder-glow mb-0">
                  <span className="placeholder col-4"></span>
                </p>
              </div>
            ))}
          </div>
        )}

        {groupedAirports?.length && (
          <>
            {groupedAirports.map((airport) => (
              <Link
                to={`/${airport.airportCode}`}
                key={airport.airportCode}
                state={airport}
                className="d-block border-bottom border-tertiary p-3 bg-light-hover"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-0">
                      <span className="fw-medium">Airport:</span>{' '}
                      <span>{airport.airportName}</span>
                    </p>
                    <p className="mb-0">
                      <span className="fw-medium">Country:</span>{' '}
                      <span>{airport.country.countryName}</span>
                    </p>
                  </div>
                  <div className="d-flex gap-2 px-2">
                    <span className="fw-medium">See details</span>
                    <span className="chevron right"></span>
                  </div>
                </div>
              </Link>
            ))}

            {groupedAirports.length < airports.data?.length && (
              <button
                onClick={() => setPage(page + 1)}
                className="btn bg-light-hover"
              >
                See more
              </button>
            )}
          </>
        )}
      </ul>
    </>
  );
}
