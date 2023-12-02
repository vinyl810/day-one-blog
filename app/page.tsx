import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Libre_Barcode_128_Text as LibreBarcode } from 'next/font/google';
import fs from 'fs';
import matter from 'gray-matter';
import FloatingHeader from '@/components/FloatingHeader';
import style from './style.module.css';

const libreBarcode = LibreBarcode({ subsets: ['latin'], weight: ['400'] });
const voidMatter = {
  title: '무제',
  date: '2000.04.27',
};

export default async function Home() {
  const files = fs.readdirSync(`${process.env.MD_PATH}`);
  const parsedFiles = files.map((fileName) => {
    const file = fs.readFileSync(`${process.env.MD_PATH}/${fileName}`);
    const { data: metaData } = matter(file);
    return { slug: fileName.replaceAll(`.${process.env.MD_EXT}`, ''), metaData };
  });

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
          <div className={style.about}>
            about me
          </div>
        </div>
        <div className={style['posts-header']}>recent posts</div>
        <div className={style.posts}>
          {parsedFiles.map((file) => (
            <Link
              className={style['post-item']}
              key={file.slug}
              href={`${process.env.POST_PATH}/${file.slug}`}
            >
              <div className={style['post-cover-container']}>
                {file.metaData.coverImage
                  && (
                    <Image
                      src={file.metaData.coverImage}
                      alt="cover"
                      className={style['post-cover']}
                      fill
                    />
                  )}
              </div>
              {file.metaData.title ?? voidMatter.title}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
