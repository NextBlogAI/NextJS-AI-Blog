export const runtime = "edge";

import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";

import "./globals.css";

import { Layout, ConfigProvider } from "antd";
import Header from "@/components/Header";

export const metadata = {
  title: "Your Website with an AI Blog",
  description:
    "nextblog.ai is a platform that allows you to create blog posts with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00A1FF",
              borderRadius: 8,
              fontSize: 16,
            },
          }}
        >
          <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
            <Header />
            <main style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              {children}
            </main>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
