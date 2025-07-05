'use client';

import { Card, Col, Flex, Pagination, Row, Typography, Empty } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const { Text, Title } = Typography;

export default function BlogPosts({ posts }) {
  const postsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);


  console.log('currentPosts', currentPosts);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Flex vertical gap={24} align="center" justify="center">
      {currentPosts && currentPosts?.length > 0 ? (
      <Row gutter={[16, 16]}>
        {currentPosts?.map((post) => (
          <Col xs={24} md={12} xl={8} key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <Card
                hoverable
                cover={
                  <img
                    src={post.cover_image_url || 'https://nextblog.ai/OG.png'}
                    alt={post.title || 'NextBlog Blog Post'}
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                }
              >
                <Title level={4} style={{ margin: 0 }}>
                  {post.title}
                </Title>
                <Text type="secondary">
                  {new Date(post.updated_at || post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
                </Text>
                <Typography.Paragraph
                  type="secondary"
                  style={{
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                  ellipsis={{
                    rows: 3,
                  }}
                >
                  {post.description}
                </Typography.Paragraph>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      ) : (
        <Flex vertical gap={16} align="center" justify="center">
          <Empty description="No posts found. Make sure you have set your .env variables correctly." />
          <Text>
            <a href="https://nextblog.ai/docs" target="_blank">
              Learn how to set up your .env variables
            </a>
          </Text>
        </Flex>
      )}

      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={posts?.length}
        pageSize={postsPerPage}
        style={{ marginTop: 24, textAlign: 'center' }}
        showSizeChanger={false}
      />
    </Flex>
  );
}
