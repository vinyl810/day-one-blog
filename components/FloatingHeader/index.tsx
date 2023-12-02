'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Libre_Barcode_128_Text as LibreBarcode } from 'next/font/google';
import style from './style.module.css';
import windowScrollControl from './windowScrollControl';

const libreBarcode = LibreBarcode({ subsets: ['latin'], weight: ['400'] });
// eslint-disable-next-line react-hooks/rules-of-hooks
const { onScrollY } = windowScrollControl();

export default function FloatingHeader() {
  const [height, setHeight] = useState(-70);

  const onScroll = () => onScrollY(height, setHeight);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <div className={`${style.header}`} style={{ marginTop: height }}>
      <span className={`${libreBarcode.className} ${style['header-logo']}`}>
        DAY ONE AT WORK
      </span>
      <Image src="/github-mark.png" alt="github-logo" height="25" width="25" />
    </div>
  );
}
