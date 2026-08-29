import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/posts";
import PostDetailContent from "./PostDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  return {
    title: post ? `${post.title} | Blog @byalcantar` : "Artículo | Juan Alcántar",
    description: post?.excerpt || "Artículo técnico en el blog personal de Juan Alcántar.",
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <PostDetailContent slug={slug} />;
}
