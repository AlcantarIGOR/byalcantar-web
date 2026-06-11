import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroBackground, AmbientGlow } from "@/components/Background";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { marked } from "marked";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: `${post.title} | Blog byalcantar.dev`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Juan Alcántar"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Parse Markdown to HTML
  const htmlContent = await marked.parse(post.content);

  return (
    <main className="bg-[#080809] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* Header section with post metadata */}
      <section className="relative pt-36 pb-8 px-6 overflow-hidden">
        <HeroBackground />
        
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-mono text-white/40 hover:text-[#a3e635] transition-colors mb-10 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            VOLVER AL BLOG
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#a3e635]/10 border border-[#a3e635]/25 text-[#a3e635]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
            {post.title}
          </h1>

          {/* Date and Read Time */}
          <div className="flex flex-wrap items-center gap-5 text-sm font-mono text-white/40 border-b border-white/[0.06] pb-8">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 py-8 relative">
        <AmbientGlow />
        <article className="max-w-3xl mx-auto relative z-10">
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </section>

      <div className="h-24" />
      <Footer />
    </main>
  );
}
