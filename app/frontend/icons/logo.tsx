import React from 'react';

type LogoParms = {
  height: number;
  width: number;
  fill: string;
};

export function Logo({ height, width, fill }: LogoParms) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 25">
      {/* width={width} height={height} */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.34.024c.127.004.242.012.343.025.262.033.223.268.163.619-1.463 8.726-2.11 18.128 3.047 22.623.054.05.129.155.104.194-.025.038-.177.018-.24.014C21.22 23.34 10.98 19.27 11.415 1.802c.007-.28.045-.408.46-.53C13.258.87 17.64.085 19.853.025h.486ZM3.977 8.82c.242-.17 2.981-1.52 5.5-2.42.504-.161.501.36.525.498 2.353 13.408 8.105 15.095 9.723 16.421.217.145-.061.198-.337.185C7.758 23.542 4.257 12.847 3.613 9.34c-.06-.323.122-.348.364-.519Zm-3.72 8.506c.595-.73 2.33-2.193 3.052-2.672.219-.145.377.19.57.647.78 1.672 1.943 3.43 3.085 4.589 2.284 2.314 4.781 3.198 4.909 3.3.194.16.193.286-.18.3C3.79 23.784.56 20.046.021 17.88c-.058-.235-.007-.26.234-.554Z"
        fill={fill}
      />
      <defs>
        <linearGradient id="a" x1="12.001" y1=".024" x2="12.001" y2="23.508" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7E9E2" />
          <stop offset="1" stopColor="#DADEF1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
