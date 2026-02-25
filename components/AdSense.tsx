'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  className?: string;
  style?: React.CSSProperties;
  slot: string;
  format?: string;
  responsive?: boolean;
}

const AdSense = ({
  className = '',
  style = { display: 'block' },
  slot,
  format = 'auto',
  responsive = true,
}: AdSenseProps) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-XXXXXXXXXX"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};

export default AdSense;