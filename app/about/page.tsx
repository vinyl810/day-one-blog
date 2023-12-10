import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { readAboutMarkdown } from '@/lib/readMarkdown';
import NotFound from '@/components/server/NotFound';
import Markdown from 'react-markdown';
import style from './style.module.css';
import '@/components/client/HighlightCode/style.css';

export default function Page() {
  const content = readAboutMarkdown();
  return content
    ? (
      <div className={style['markdown-wrapper']}>
        <Markdown>
          {content}
        </Markdown>
        <div className={style['links-wrapper']}>
          <Link href={process.env.GITHUB_LINK ?? ''}>
            <Image src="/github-mark.png" alt="github" width="50" height="50" />
          </Link>
        </div>
      </div>
    )
    : <NotFound />;
}
