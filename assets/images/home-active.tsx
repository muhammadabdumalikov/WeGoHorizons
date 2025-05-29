import React from 'react';
import {SvgXml} from 'react-native-svg';

export function HomeActiveSvg({
  width,
  height,
  color,
}: {
  width?: any;
  height?: any;
  color?: string;
}) {
  const Svg = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="16" cy="16" r="10" fill="#FEBD2F"/>
<g clip-path="url(#clip0_5_705)">
<path d="M5.62801 19.347C4.58262 18.4878 3.72748 17.4205 3.11702 16.2129C2.50655 15.0052 2.1541 13.6838 2.08211 12.3325C2.01012 10.9813 2.22015 9.62988 2.69884 8.36423C3.17753 7.09857 3.9144 5.94641 4.86259 4.98102C5.81077 4.01563 6.9495 3.25816 8.20634 2.75678C9.46318 2.25541 10.8106 2.02112 12.1629 2.0688C13.5152 2.11649 14.8428 2.44511 16.0612 3.03377C17.2796 3.62242 18.3622 4.45822 19.24 5.488" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.567 11.5859C21.598 12.9165 21.3563 14.2393 20.8567 15.4729C20.3572 16.7066 19.6104 17.8249 18.6623 18.759C17.7143 19.6931 16.585 20.4232 15.3441 20.9044C14.1032 21.3856 12.777 21.6077 11.447 21.5569" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.14701 16.2729C1.21301 19.2879 0.463013 21.7159 1.40501 22.6589C3.03601 24.2899 9.11701 20.8519 14.988 14.9819C20.859 9.1119 24.3 3.0299 22.665 1.3999C21.726 0.460895 19.286 1.2289 16.288 3.1449" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.945 9.56396C13.9805 9.56396 14.82 8.7245 14.82 7.68896C14.82 6.65343 13.9805 5.81396 12.945 5.81396C11.9095 5.81396 11.07 6.65343 11.07 7.68896C11.07 8.7245 11.9095 9.56396 12.945 9.56396Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.78299 8.14696C3.29699 8.03699 3.82837 8.0363 4.34265 8.14493C4.85693 8.25357 5.34263 8.46911 5.76824 8.77758C6.19385 9.08604 6.54985 9.48053 6.81316 9.93546C7.07647 10.3904 7.2412 10.8956 7.29666 11.4183C7.35212 11.941 7.29708 12.4695 7.1351 12.9696C6.97312 13.4696 6.70783 13.93 6.35643 14.3209C6.00503 14.7118 5.57538 15.0245 5.09535 15.2387C4.61531 15.4528 4.09562 15.5636 3.56999 15.564C3.3005 15.5541 3.03259 15.5183 2.76999 15.457" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_5_705">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`;
  const Component = () => (
    <SvgXml xml={Svg} width={width} height={height} color={color} />
  );

  return <Component />;
}
