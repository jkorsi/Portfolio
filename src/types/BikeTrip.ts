interface BikeTrip {
  tripId: number;
  departureStation: string;
  returnStation: string;
  departureTime: Date;
  returnTime: string;
  durationInSec: number;
  durationInMin?: number;
  distanceInMeters: number;
  distanceInKm?: number;
}
