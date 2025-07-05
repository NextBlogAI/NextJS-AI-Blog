export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";

import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";

import { Anchor, Breadcrumb, Button, Col, Flex, Row } from "antd";
import { MarkdownRender } from "@/components/MarkdownRender";

import {
  HomeOutlined,
  LinkedinFilled,
  RightOutlined,
  XOutlined,
} from "@ant-design/icons";
import { unstable_cache } from "next/cache";
import "./BlogPostPage.css";

async function getPostRow(slug) {
  return await unstable_cache(
    async () => {
      const response = await fetch(
        `https://nextblog.ai/api/blog/${process.env.NEXTBLOG_PROJECT_ID}/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXTBLOG_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      return data.blog;
    },
    [`post-${slug}`],
    {
      revalidate: 60,
      tags: [`post-${slug}`],
    }
  )();
}

// Helper function to generate ID from heading text (same as in MarkdownPreviewNoModal)
function generateId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostRow(slug);

  return {
    title: post.title,
    description: post.description || "",
    openGraph: {
      title: post.title,
      description: post.description || "",
      images: [post.cover_image_url || "https://nextblog.ai/OG.webp"],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostRow(slug);

  const anchorItems = [];
  if (post.markdown) {
    const lines = post.markdown.split("\n");
    lines.forEach((line, index) => {
      if (line.startsWith("## ")) {
        const title = line.replace(/^#{1,3}\s+/, "");
        const id = generateId(title);
        anchorItems.push({
          key: id,
          href: `#${id}`,
          title: title,
          replace: true,
        });
      }
    });
  }

  return (
    <Flex
      vertical
      gap={16}
      align="center"
      justify="center"
      style={{ padding: 24 }}
    >
      <Flex vertical gap={24} align="center">
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            {
              title: <HomeOutlined />,
              href: "/",
            },
            {
              title: (
                <>
                  <span>Blog</span>
                </>
              ),
              href: "/blog",
            },
            {
              title: (
                <Text ellipsis={{ tooltip: post.title }}>
                  {post.title.length > 70
                    ? post.title.slice(0, 70) + "..."
                    : post.title}
                </Text>
              ),
            },
          ]}
        />
        <Title
          level={1}
          id="blog-title"
          style={{ textAlign: "center", maxWidth: 800 }}
        >
          {post.title}
        </Title>
        <Text
          type="secondary"
          style={{ textAlign: "center", maxWidth: 800, fontSize: 20 }}
        >
          {post.description || ""}
        </Text>
        <Text type="secondary" style={{ marginBottom: 24 }}>
          {new Date(post.updated_at || post.created_at).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            }
          )}
        </Text>
        {post.cover_image_url ? (
          <img
            src={post.cover_image_url || "https://nextblog.ai/OG.webp"}
            alt={post.title || "NextBlog The Ultimate SEO Automation Tool"}
            width={800}
            height={400}
            style={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: 24,
              marginBottom: 24,
              marginTop: 24,
            }}
          />
        ) : (
          <Link href="/">
            <img
              src={post.cover_image_url || "https://nextblog.ai/OG.webp"}
              alt={post.title || "NextBlog The Ultimate SEO Automation Tool"}
              width={800}
              height={400}
              style={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 24,
                marginBottom: 24,
                marginTop: 24,
              }}
            />
          </Link>
        )}
      </Flex>
      <Row gutter={{ xs: 0, lg: 90 }} style={{ width: "100%", marginTop: 60 }}>
        <Col xs={0} lg={8}>
          {anchorItems.length > 0 && (
            <Flex vertical gap={16} style={{ position: "sticky", top: 100 }}>
              <Title level={5}>Table of Contents</Title>
              <Anchor
                items={[
                  {
                    key: post.id,
                    href: `#blog-title`,
                    title: post.title,
                    replace: true,
                  },
                  ...anchorItems,
                ]}
                style={{
                  maxWidth: 360,
                  maxHeight: "min(70vh, calc(100vh - 240px))",
                  overflow: "auto",
                  position: "relative",
                }}
                affix={false}
                className="table-of-contents"
                targetOffset={80}
              />
              <Flex vertical gap={8}>
                <Flex gap={8}>
                  <Link
                    href={`https://x.com/intent/tweet?url=${encodeURIComponent(
                      process.env.NEXT_PUBLIC_APP_URL + "/blog/" + slug
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="default"
                      shape="circle"
                      icon={<XOutlined />}
                    />
                  </Link>
                  <Link
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      process.env.NEXT_PUBLIC_APP_URL + "/blog/" + slug
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="default"
                      shape="circle"
                      icon={<LinkedinFilled />}
                    />
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Col>
        <Col xs={24} lg={16} className="markdown-preview">
          <MarkdownRender content={post.markdown} />
        </Col>
      </Row>
      <Flex
        justify="center"
        align="center"
        vertical
        gap={24}
        style={{ marginTop: 90, marginBottom: 60 }}
      >
        <Title level={2} align="center">
          Grow your website traffic <span className="gradientText">FAST</span>{" "}
          with NextBlog
        </Title>
        <Text align="center" style={{ maxWidth: 800, fontSize: 20 }}>
          Stop wasting your time and start growing with the best SEO automation
          tool.
        </Text>
        <Link href="https://nextblog.ai">
          <Button type="primary" size="large">
            Get started for free
          </Button>
        </Link>
        <Link href="https://nextblog.ai">
          <img
            src="https://nextblog.ai/OG.webp"
            alt="NextBlog The Ultimate SEO Automation Tool"
            width={800}
            height={400}
            style={{
              alignSelf: "center",
              borderRadius: 24,
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Link>
      </Flex>
    </Flex>
  );
}
