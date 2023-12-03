import fs from 'fs';
import matter from 'gray-matter';

interface FrontMatter {
  title: string
  excerpt: string
  coverImage: string
  date: string
  category: string
}

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

export default function readMarkdown() {
  const readFrontMatter = () => {
    const files = fs.readdirSync(`${process.env.MD_PATH}`);
    const parsedFiles = files.map((fileName) => {
      const file = fs.readFileSync(`${process.env.MD_PATH}/${fileName}`);
      const { data } = matter(file);
      /* unsafe assertion for metaData */
      const frontMatter = fillEmptyMatter(<FrontMatter>data);
      return {
        slug: fileName.replaceAll(`.${process.env.MD_EXT}`, '').replaceAll(' ', '-'),
        frontMatter,
      };
    });
    return parsedFiles.toSorted(
      (a, b) => new Date(b.frontMatter.date).getTime()
        - new Date(a.frontMatter.date).getTime(),
    );
  };

  const readContent = (slug: string) => {
    const parsedSlug = slug.replaceAll('-', ' ');
    if (fs.existsSync(`${process.env.MD_PATH}/${parsedSlug}.${process.env.MD_EXT}`)) {
      const file = fs.readFileSync(
        `${process.env.MD_PATH}/${parsedSlug}.${process.env.MD_EXT}`,
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
