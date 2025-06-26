import React from 'react';

const WhatsAppBotIcon: React.FC<{ size?: number | string }>
 = ({ size = 38 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#25D366"/>
    <g filter="url(#glow)">
      <path d="M34.5 25.5c-.45-.3-2.55-1.2-3-1.5s-.75-.3-1.05.15c-.3.45-1.2 1.5-1.5 1.8-.3.3-.6.3-1.05.15-.45-.3-1.8-.6-3.45-1.95-1.2-1.05-1.95-2.25-2.25-2.7-.3-.45 0-.75.15-1.05.15-.15.3-.45.45-.75.15-.3.15-.6 0-.9s-1.05-2.55-1.35-3.45c-.3-.9-.6-.75-1.05-.75h-.9c-.3 0-.75.15-1.05.45-.3.3-1.5 1.5-1.5 3.75s1.5 4.35 1.65 4.65c.15.3 3.15 4.8 7.8 6.45 1.05.3 1.8.45 2.4.3.75-.15 2.25-.9 2.55-1.8.3-.9.3-1.65.15-1.8z" fill="#fff"/>
    </g>
    <ellipse cx="24" cy="38" rx="7" ry="2.5" fill="#128C7E" opacity="0.18"/>
    <g>
      <circle cx="36" cy="14" r="4" fill="#fff"/>
      <text x="36" y="17" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill="#25D366">BOT</text>
    </g>
    <defs>
      <filter id="glow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  </svg>
);

export default WhatsAppBotIcon;
