import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import NotFound from '@/components/NotFound';

export default function Page({ params }: { params: { slug: string } }) {
  if (fs.existsSync(`${process.env.MD_PATH}/${params.slug}.${process.env.MD_EXT}`)) {
    const file = fs.readFileSync(
      `${process.env.MD_PATH}/${params.slug}.${process.env.MD_EXT}`,
    );
    const { content } = matter(file);
    return <Markdown>{content}</Markdown>;
  }
  return <NotFound />;
}
