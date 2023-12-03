'use client';

import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import './style.css';

export default function HighlightCode() {
  useEffect(() => {
    Prism.highlightAll();
  });

  return <div />;
}
