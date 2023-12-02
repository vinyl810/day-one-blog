import React from 'react';
import Markdown from 'react-markdown';
import NotFound from '@/components/NotFound';
import readMarkdown from '@/lib/readMarkdown';

const { readContent } = readMarkdown();

export default function Page({ params }: { params: { slug: string } }) {
  const content = readContent(params.slug);
  return content ? <Markdown>{content}</Markdown> : <NotFound />;
}
