import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface FrontMatter {
  title: string
  excerpt: string
  coverImage: string
  date: string
  category: string
}

const contentsPath = path.join(process.cwd(), 'contents', 'posts');

const fillEmptyMatter = (frontMatter: FrontMatter) => {
  const {
    title = 'No Title',
    excerpt = 'No Excerpt',
    coverImage = 'https://picsum.photos/200/300',
    date = new Date(Date.now()),
    category = 'No Category',
  } = frontMatter;

  return {
    title,
    excerpt,
    coverImage,
    date,
    category,
  };
};

export const readFrontMatter = () => {
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
  console.log('parsedFiles', parsedFiles);
  return parsedFiles?.toSorted?.(
    (a, b) => new Date(b.frontMatter.date).getTime()
      - new Date(a.frontMatter.date).getTime(),
  );
};

export default function readMarkdown() {
  console.log('readdirSync', process.env.MD_EXT, fs.readdirSync(contentsPath));

  const readContent = (slug: string) => {
    const parsedSlug = slug.replaceAll('-', ' ');
    if (fs.existsSync(`${contentsPath}/${parsedSlug}.${process.env.MD_EXT}`)) {
      const file = fs.readFileSync(
        `${contentsPath}/${parsedSlug}.${process.env.MD_EXT}`,
      );
      return matter(file).content;
    }
    return null;
  };

  return {
    readFrontMatter,
    readContent,
  };
}
