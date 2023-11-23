import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import React from 'react';

export default async function Home() {
  const files = fs.readdirSync('./contents/posts');
  const parsedFiles = files.map((fileName) => {
    const { data: metaData } = matter(fs.readFileSync(`./contents/posts/${fileName}`));
    return { slug: fileName.replaceAll('.md', ''), metaData };
  });

  return (
    <main>
      <div>
        {parsedFiles.map((file) => (
          <div key={file.slug}>
            <Link href={file.slug}>{file.metaData.title}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
