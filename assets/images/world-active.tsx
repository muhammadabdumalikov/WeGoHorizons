import React from 'react';
import {SvgXml} from 'react-native-svg';

export function WorldActiveSvg({
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
<g clip-path="url(#clip0_5_952)">
<path d="M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25Z" stroke="#171725" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.07902 15.75C7.30697 15.75 7.53192 15.698 7.73678 15.598C7.94164 15.498 8.12101 15.3527 8.26128 15.173C8.40154 14.9933 8.499 14.784 8.54626 14.561C8.59352 14.338 8.58934 14.1071 8.53402 13.886L7.78402 10.886C7.70286 10.5615 7.51558 10.2735 7.25196 10.0677C6.98833 9.86185 6.66348 9.75004 6.32902 9.75H0.976019C0.562396 11.7819 0.718579 13.8885 1.42731 15.8372C2.13604 17.7858 3.36972 19.5006 4.99202 20.792L6.00002 15.75H7.07902Z" stroke="#171725" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.985 5.25H16.921C16.5865 5.25004 16.2617 5.36185 15.998 5.56768C15.7344 5.77351 15.5471 6.06154 15.466 6.386L14.716 9.386C14.6607 9.60714 14.6565 9.83798 14.7037 10.061C14.751 10.284 14.8485 10.4933 14.9887 10.673C15.129 10.8527 15.3084 10.998 15.5132 11.098C15.7181 11.198 15.943 11.25 16.171 11.25H17.75L18.541 16C18.5994 16.3502 18.7803 16.6684 19.0513 16.8978C19.3223 17.1273 19.6659 17.2531 20.021 17.253H21.946C22.9449 15.3688 23.3851 13.2387 23.2148 11.1129C23.0446 8.98715 22.271 6.95418 20.985 5.253V5.25Z" stroke="#171725" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_5_952">
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
