"use client";

import ReactMarkdown from "react-markdown";

import { Typography, Divider, List } from "antd";
import Link from "next/link";
const { Text, Title, Paragraph } = Typography;

// Helper function to generate ID from heading text
function generateId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function MarkdownRender({ content }) {
  return (
    <>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            return (
              <Text code className={className} {...props}>
                {children}
              </Text>
            );
          },
          h1({ children }) {
            const id = generateId(String(children));
            return (
              <Title level={1} id={id}>
                {children}
              </Title>
            );
          },
          h2({ children }) {
            const id = generateId(String(children));
            return (
              <Title level={2} id={id}>
                {children}
              </Title>
            );
          },
          h3({ children }) {
            const id = generateId(String(children));
            return (
              <Title level={3} id={id}>
                {children}
              </Title>
            );
          },
          h4({ children }) {
            const id = generateId(String(children));
            return (
              <Title level={4} id={id}>
                {children}
              </Title>
            );
          },
          h5({ children }) {
            const id = generateId(String(children));
            return (
              <Title level={5} id={id}>
                {children}
              </Title>
            );
          },
          h6({ children }) {
            const id = generateId(String(children));
            return (
              <Title level={6} id={id}>
                {children}
              </Title>
            );
          },
          p({ children }) {
            return <Paragraph>{children}</Paragraph>;
          },
          ul({ children }) {
            return (
              <List size="small" split={false}>
                {children}
              </List>
            );
          },
          ol({ children }) {
            return (
              <List size="small" split={false}>
                {children}
              </List>
            );
          },
          li({ children }) {
            return <List.Item>- {children}</List.Item>;
          },
          a({ children, href }) {
            return <Link href={href}>{children}</Link>;
          },
          hr({ children }) {
            return <Divider />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </>
  );
}
