export interface Airport {
  airportCode: string;
  internationalAirport: boolean;
  domesticAirport: boolean;
  regionalAirport: boolean;
  onlineIndicator: boolean;
  eticketableAirport: boolean;
  location: {
    aboveSeaLevel: number;
    latitude: number;
    latitudeRadius: number;
    longitude: number;
    longitudeRadius: number;
    latitudeDirection: string;
    longitudeDirection: string;
  };
  airportName: string;
  city: {
    cityCode: string;
    cityName: string;
    timeZoneName: string;
  };
  state?: {
    regionCode: string;
    regionName: string;
  };
  country: {
    countryCode: string;
    countryName: string;
  };
  region: {
    regionCode: string;
    regionName: string;
  };
}
