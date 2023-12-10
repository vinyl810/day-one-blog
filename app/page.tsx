import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Libre_Barcode_128_Text as LibreBarcode } from 'next/font/google';
import readMarkdown from '@/lib/readMarkdown';
import style from './style.module.css';

const libreBarcode = LibreBarcode({ subsets: ['latin'], weight: ['400'] });

export default async function Home() {
  const frontMatter = readMarkdown().readFrontMatter();

  return (
    <main className={style.main}>
      <div className={style.intro}>
        <span className={`${libreBarcode.className} ${style['intro-logo']}`}>
          DAY ONE AT WORK
        </span>
        <div className={style.menu}>
          <Link href="/" className={style['menu-item']}>all posts</Link>
          <Link href="/about" className={style['menu-item']}>about me</Link>
        </div>
      </div>
      <div className={style.posts}>
        {frontMatter?.map?.((file) => (
          <Link
            className={style['post-item']}
            key={file.slug}
            href={`${process.env.POST_PATH}/${file.slug}`}
          >
            <div className={style['post-cover-container']}>
              {file.frontMatter.coverImage
                  && (
                    <Image
                      src={file.frontMatter.coverImage}
                      alt="cover"
                      className={style['post-cover']}
                      fill
                    />
                  )}
            </div>
            <div className={style['post-title']}>{file.frontMatter.title}</div>
            <div className={style['post-excerpt']}>{file.frontMatter.excerpt}</div>
            <small>{(new Date(file.frontMatter.date)).toLocaleDateString()}</small>
          </Link>
        ))}
      </div>
    </main>
  );
}
