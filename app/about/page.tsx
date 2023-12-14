import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { readAboutContent } from '@/lib/readMarkdown';
import NotFound from '@/components/server/NotFound';
import Markdown from 'react-markdown';
import style from './style.module.css';
import '@/style/codeHighlight.css';

export default function Page() {
  const content = readAboutContent();
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
