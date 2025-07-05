"use client";


import Link from "next/link";
import { Flex, Typography, Button } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  return (
    <Flex vertical gap={16} align="center" justify="center" style={{ padding: 24 }}>
      <Title level={1}>Your Website with an AI Blog</Title>
      <Text>
        Get Daily SEO-Optimized Blog Posts That Attract Customers on Autopilot
      </Text>
      <Link href="https://nextblog.ai/docs">
        <Button size="large">
          Read the Docs
        </Button>
      </Link>
      <Link href="/blog">
        <Button type="primary" size="large">
          Read Your Blog
        </Button>
      </Link>
    </Flex>
  );
}
