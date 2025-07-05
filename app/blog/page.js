export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Title from 'antd/es/typography/Title';
import BlogPosts from './BlogPosts';
import { Flex } from 'antd';

export const metadata = {
  title: 'Your Website with an AI Blog',
  description: 'Get the latest tips, tricks, and insights from the NextBlog team. Start growing your SEO today.',
};


async function getPosts() {
  const response = await fetch(`https://nextblog.ai/api/blog/${process.env.NEXTBLOG_PROJECT_ID}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXTBLOG_API_KEY}`,
    },
  });
  const data = await response.json();
  return data.blogs;
}


export default async function BlogListPage() {
  const posts = await getPosts();
  return (
    <Flex vertical gap={16} align="center" justify="center" style={{ padding: 24 }}>
      <Title>Your Website with an AI Blog</Title>
      <BlogPosts posts={posts} />
    </Flex>
  );
}
