import fs from 'fs';
import matter from 'gray-matter';
import React from 'react';
import Markdown from 'react-markdown';

export default function Page({ params }: { params: { slug: string } }) {
  const { content } = matter(fs.readFileSync(`./contents/posts/${params.slug}.md`));
  return <Markdown>{content}</Markdown>;
}
