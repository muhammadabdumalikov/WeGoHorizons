export interface RoutePoint {
  /** Type of the point in the route */
  type: 'location' | 'destination' | 'transport';
  /** Name of the location or destination */
  title: string;
  /** Type of transport (only for transport type points) */
  transport_type?: string;
  /** Duration of transport or activity */
  duration?: string;
  /** Activities available at this point (for destinations) */
  activities?: string;
  /** Optional coordinates for mapping */
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Includes {
  title: string;
  included: boolean;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  organizer_title: string;
  organizer_phone: string;
  organizer_logo: string;
  price: number;
  rating: number;
  reviews_count: number;
  duration: string;
  group_size: string;
  location: string;
  start_location: string;
  end_location: string;
  categoryName?: string;
  files: Array<{
    url: string;
    type: string;
  }>;
  includes: Includes[];
  route_json?: Array<RoutePoint>;
  // reviews: Array<{
  //   id: number;
  //   user_name: string;
  //   rating: number;
  //   comment: string;
  //   date: string;
  //   user_image: string;
  // }>;
}