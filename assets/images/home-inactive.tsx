import React from 'react';
import {SvgXml} from 'react-native-svg';

export function HomeInactiveSvg({
  width,
  height,
  color,
}: {
  width?: any;
  height?: any;
  color?: string;
}) {
  const Svg = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_944)">
<path d="M5.62795 19.347C4.58256 18.4878 3.72742 17.4205 3.11695 16.2129C2.50649 15.0052 2.15404 13.6838 2.08205 12.3325C2.01005 10.9813 2.22008 9.62988 2.69878 8.36423C3.17747 7.09857 3.91434 5.94641 4.86253 4.98102C5.81071 4.01563 6.94944 3.25816 8.20628 2.75678C9.46312 2.25541 10.8106 2.02112 12.1629 2.0688C13.5152 2.11649 14.8428 2.44511 16.0612 3.03377C17.2796 3.62242 18.3621 4.45822 19.24 5.488" stroke="#CDD2DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.567 11.5859C21.598 12.9165 21.3563 14.2393 20.8567 15.4729C20.3572 16.7066 19.6104 17.8249 18.6623 18.759C17.7143 19.6931 16.585 20.4232 15.3441 20.9044C14.1032 21.3856 12.777 21.6077 11.447 21.5569" stroke="#CDD2DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.14704 16.2729C1.21304 19.2879 0.463044 21.7159 1.40504 22.6589C3.03604 24.2899 9.11704 20.8519 14.988 14.9819C20.859 9.1119 24.3 3.0299 22.665 1.3999C21.726 0.460895 19.286 1.2289 16.288 3.1449" stroke="#CDD2DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.9449 9.56396C13.9805 9.56396 14.8199 8.7245 14.8199 7.68896C14.8199 6.65343 13.9805 5.81396 12.9449 5.81396C11.9094 5.81396 11.0699 6.65343 11.0699 7.68896C11.0699 8.7245 11.9094 9.56396 12.9449 9.56396Z" stroke="#CDD2DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.78302 8.14696C3.29702 8.03699 3.8284 8.0363 4.34268 8.14493C4.85696 8.25357 5.34266 8.46911 5.76827 8.77758C6.19388 9.08604 6.54988 9.48053 6.81319 9.93546C7.0765 10.3904 7.24123 10.8956 7.29669 11.4183C7.35215 11.941 7.29711 12.4695 7.13513 12.9696C6.97316 13.4696 6.70786 13.93 6.35646 14.3209C6.00506 14.7118 5.57541 15.0245 5.09538 15.2387C4.61534 15.4528 4.09565 15.5636 3.57002 15.564C3.30053 15.5541 3.03262 15.5183 2.77002 15.457" stroke="#CDD2DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_5_944">
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
