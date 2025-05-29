import React from 'react';
import {SvgXml} from 'react-native-svg';

export function ProfileActiveSvg({
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
<g clip-path="url(#clip0_5_2134)">
<circle cx="12" cy="12" r="11.25" stroke="#171725" stroke-width="1.5"/>
<path d="M20 20C18.1519 16.9586 15.2557 15 12 15C8.74425 15 5.84812 16.9586 4 20" stroke="#171725" stroke-width="1.5"/>
<rect x="7.75" y="3.75" width="8.5" height="8.5" rx="4.25" stroke="#171725" stroke-width="1.5"/>
</g>
<defs>
<clipPath id="clip0_5_2134">
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
