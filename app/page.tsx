import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import style from './style.module.css';

export default async function Home() {
  const files = fs.readdirSync(`${process.env.MD_PATH}`);
  const parsedFiles = files.map((fileName) => {
    const file = fs.readFileSync(`${process.env.MD_PATH}/${fileName}`);
    const { data: metaData } = matter(file);
    return { slug: fileName.replaceAll(`.${process.env.MD_EXT}`, ''), metaData };
  });

  return (
    <main className={style.main}>
      <div>
        {parsedFiles.map((file) => (
          <div key={file.slug}>
            <Link href={`${process.env.POST_PATH}/${file.slug}`}>
              {file.metaData.title}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
