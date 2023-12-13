import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface FrontMatter {
  title: string
  excerpt: string
  coverImage: string
  date: string
  category: Array<string>
}

const contentsPath = path.join(process.cwd(), 'contents', 'posts');

const fillEmptyMatter = (frontMatter: FrontMatter) => {
  const {
    title = 'No Title',
    excerpt = 'No Excerpt',
    coverImage = 'https://picsum.photos/200/300',
    date = new Date(Date.now()).toUTCString(),
    category = [],
  } = frontMatter;

  return {
    title,
    excerpt,
    coverImage,
    date,
    category,
  };
};

export const readAboutContent = () => {
  const about = path.join(process.cwd(), 'contents', 'about', 'about.md');
  const file = fs.readFileSync(about);
  const { content } = matter(file);
  return content;
};

export const readFrontMatterByCategory = (category?: string) => {
  const files = fs.readdirSync(contentsPath);
  const parsedFiles = files.map((fileName) => {
    const file = fs.readFileSync(path.join(contentsPath, fileName));
    const { data } = matter(file);
    /* unsafe assertion for metaData */
    const frontMatter = fillEmptyMatter(<FrontMatter>data);
    return {
      slug: fileName.replaceAll(`.${process.env.MD_EXT}`, '').replaceAll(' ', '-'),
      frontMatter,
    };
  });

  parsedFiles?.sort?.(
    (a, b) => (new Date(b.frontMatter.date)).getTime()
      - (new Date(a.frontMatter.date)).getTime(),
  );

  const categoryFilteredFiles = category && category.length
    ? parsedFiles.filter((x) => x.frontMatter.category.includes(category))
    : parsedFiles;

  return categoryFilteredFiles;
};

export const readMarkdownContent = (slug: string) => {
  const parsedSlug = slug.replaceAll('-', ' ');
  const parsedPath = path.join(contentsPath, `${parsedSlug}.${process.env.MD_EXT}`);
  if (fs.existsSync(parsedPath)) {
    const file = fs.readFileSync(parsedPath);
    const { data, content } = matter(file);
    /* unsafe assertion for metaData */
    return { data: fillEmptyMatter(<FrontMatter>data), content };
  }
  return null;
};
