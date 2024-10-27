import { Link, useLocation } from 'react-router-dom';
import { Airport } from '../../interfaces/Airport';

export function AirportDetails() {
  const location = useLocation();
  const details = location.state as Airport;

  return (
    <div className="card">
      <div className="p-3 bg-dark text-white">
        <h1 className="h2">Airport Details</h1>
      </div>
      <div className="p-3">
        <p>
          <span className="fw-medium">Airport:</span> {details.airportName}
        </p>
        <p>
          <span className="fw-medium">Country:</span>{' '}
          {details.country.countryName}
        </p>
        <p>
          <span className="fw-medium">City:</span> {details.city.cityName}
        </p>
        <p>
          <span className="fw-medium">Timezone:</span>{' '}
          {details.city.timeZoneName}
        </p>

        <Link to="/" className="btn btn-dark">
          Back
        </Link>
      </div>
    </div>
  );
}
