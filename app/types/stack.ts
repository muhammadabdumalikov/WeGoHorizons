import { Tour } from './tour';

export type RootStackParamList = {
  'splash-screen': undefined;
  'onboarding-screen': undefined;
  'tour-details-screen': { tour: Tour };
  'tab-navigator': undefined;
  'gallery-carousel-screen': undefined;
  'search-screen': undefined;
  'all-tours-screen': { title?: string; categoryId?: string };
};
