import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Libre_Barcode_128_Text as LibreBarcode } from 'next/font/google';
import FloatingHeader from '@/components/FloatingHeader';
import readMarkdown from '@/lib/readMarkdown';
import style from './style.module.css';

const libreBarcode = LibreBarcode({ subsets: ['latin'], weight: ['400'] });
const { readFrontMatter } = readMarkdown();

export default async function Home() {
  const frontMatter = readFrontMatter();

  return (
    <>
      <FloatingHeader />
      <header className={`${style.header}`}>
        <span className={`${libreBarcode.className} ${style['header-logo']}`}>
          DAY ONE AT WORK
        </span>
        <Image src="/github-mark.png" alt="github-logo" height="25" width="25" />
      </header>
      <main className={style.main}>
        <div className={style.intro}>
          <span className={`${libreBarcode.className} ${style['intro-logo']}`}>
            DAY ONE AT WORK
          </span>
          <div className={style.menu}>
            <div className={style.about}>all posts</div>
            <div className={style.about}>about me</div>
            <div className={style.about}>categories</div>
          </div>
        </div>
        {/* <div className={style['posts-header']}>recent posts</div> */}
        <div className={style.posts}>
          {frontMatter.map((file) => (
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
              {file.frontMatter.title}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
