"use client";

import { Layout, Typography, Flex, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  return (
    <AntHeader
      style={{
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(10px)",
        padding: "0 20px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{ height: "100%", maxWidth: 1200, margin: "0 auto" }}
      >
        <Flex gap={24} align="center">
          <Link href="/">
            <Flex align="center" gap={6}>
              <Image
                src="/logo.svg"
                alt="NextJs AI Blog"
                width={34}
                height={34}
              />
              <Title level={4} style={{ margin: 0, whiteSpace: "nowrap" }}>
                NextJS AI Blog
              </Title>
            </Flex>
          </Link>
          <Menu
            mode="horizontal"
            theme="light"
            style={{
              background: "transparent",
              borderBottom: "none",
              width: "50vw",
            }}
            overflowedIndicator={<MenuOutlined />}
            selectable={false}
            items={[
              {
                key: "docs",
                label: (
                  <Link
                    href="https://nextblog.ai/docs"
                    target="_blank"
                    style={{ fontSize: 16, color: "inherit" }}
                  >
                    Docs
                  </Link>
                ),
              },
              {
                key: "blog",
                label: (
                  <Link href="/blog" style={{ fontSize: 16, color: "inherit" }}>
                    Blog
                  </Link>
                ),
              },
            ]}
          />
        </Flex>
      </Flex>
    </AntHeader>
  );
}
