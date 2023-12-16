import React from 'react';
import Image from 'next/image';
import { readMarkdownContent } from '@/lib/readMarkdown';
import NotFound from '@/components/server/NotFound';
import HighlightCode from '@/components/client/HighlightCode';
import Markdown from 'react-markdown';
import style from './style.module.css';

export default function Page({ params }: { params: { slug: string } }) {
  const {
    data: {
      title, category, coverImage, date,
    },
    content,
  } = readMarkdownContent(params.slug) ?? { data: {}, content: '' };

  return content
    ? (
      <div className={style['markdown-wrapper']}>
        <h1>{title ?? ''}</h1>
        <div className={style.date}>{(new Date(date ?? ''))?.toLocaleDateString()}</div>
        <div className={style['category-wrapper']}>
          {category?.map((cat) => (
            <div className={style.category} key={cat}>{cat}</div>
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
        <div className={style['related-title']}>related posts</div>
        <div className={style.related}>
          <div className={style['related-card']}>
            <div className={style['related-card-title']}>title</div>
            <div className={style['related-card-exercpt']}>exercpt</div>
          </div>
          <div className={style['related-card']}>
            <div className={style['related-card-title']}>title</div>
            <div className={style['related-card-exercpt']}>exercpt</div>
          </div>
          <div className={style['related-card']}>
            <div className={style['related-card-title']}>title</div>
            <div className={style['related-card-exercpt']}>exercpt</div>
          </div>
        </div>
      </div>
    )
    : <NotFound />;
}
