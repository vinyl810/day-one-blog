import React from 'react';
import Image from 'next/image';
import readMarkdown from '@/lib/readMarkdown';
import NotFound from '@/components/server/NotFound';
import HighlightCode from '@/components/client/HighlightCode';
import Markdown from 'react-markdown';
import style from './style.module.css';

const { readContent } = readMarkdown();

export default function Page({ params }: { params: { slug: string } }) {
  const { 
    data: {title, category, coverImage, date},
    content
  } = readContent(params.slug) ?? { data: {}, content: '' };
  console.log(title);

  return content
    ? (
      <div className={style['markdown-wrapper']}>
        <h1>{title ?? ''}</h1>
        <div className={style.date}>{(new Date(date ?? ''))?.toLocaleDateString()}</div>
        <div className={style['category-wrapper']}>
          {category?.map((cat, i) => (
            <div className={style.category} key={i}>{cat}</div>
          ))}
        </div>
        <div
          className={style['cover-image']}
        >
          <Image
            src={coverImage ?? ''}
            fill
            alt="coverImage"
          />
        </div>
        <Markdown>
          {content ?? ''}
        </Markdown>
        <HighlightCode />
      </div>
    )
    : <NotFound />;
}
