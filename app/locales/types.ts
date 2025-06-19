// Type definitions for translation keys
export interface TranslationKeys {
  common: {
    search: string;
    apply: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    loading: string;
    error: string;
    success: string;
    retry: string;
    ok: string;
    yes: string;
    no: string;
  };
  navigation: {
    home: string;
    search: string;
    favorites: string;
    profile: string;
    settings: string;
  };
  search: {
    placeholder: string;
    dateRange: string;
    selectDates: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    adults: string;
    children: string;
    infants: string;
    rooms: string;
    filters: string;
    priceRange: string;
    sortBy: string;
    distance: string;
    rating: string;
  };
  hotel: {
    bookNow: string;
    viewDetails: string;
    perNight: string;
    amenities: string;
    reviews: string;
    location: string;
    description: string;
    photos: string;
    map: string;
  };
  travel: {
    destinations: string;
    popular: string;
    trending: string;
    nearby: string;
    recommendations: string;
    explore: string;
    discover: string;
    plan: string;
    book: string;
  };
  profile: {
    myTrips: string;
    bookings: string;
    favorites: string;
    settings: string;
    language: string;
    currency: string;
    notifications: string;
    help: string;
    about: string;
    logout: string;
  };
  errors: {
    networkError: string;
    serverError: string;
    notFound: string;
    unauthorized: string;
    forbidden: string;
  };
}

// Helper type for nested keys
export type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends Record<string, any>
  ? `${K}.${NestedKeyOf<T[K]>}` | K
  : K;
}[keyof T & string];

// Type for all possible translation keys
export type TranslationKey = NestedKeyOf<TranslationKeys>; 