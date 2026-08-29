"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home as HomeIcon, 
  ArrowLeft, 
  Clock, 
  Check, 
  Copy, 
  Tag, 
  BookOpen, 
  Share2,
  ArrowRight
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { BLOG_POSTS } from "@/data/posts";

interface PostDetailContentProps {
  slug: string;
}

export default function PostDetailContent({ slug }: PostDetailContentProps) {
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex >= 0 && currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : BLOG_POSTS[0];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <main className="min-h-screen bg-[#191919] text-white flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
          <Link href="/blog" className="px-4 py-2 bg-[#a3e635] text-black font-semibold rounded-lg">
            Volver al Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#191919] text-[#f7facf] font-sans flex flex-col md:flex-row">
      
      {/* LEFT COLUMN: SIDEBAR */}
      <Sidebar />

      {/* RIGHT COLUMN: MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto bg-[#191919]">
        
        {/* Status Bar Banner */}
        <div className="bg-[#a3e635] text-black text-[11px] font-mono tracking-widest font-semibold text-center py-2 uppercase border-b border-[#2c2c2c] shrink-0">
          Disponible para proyectos · Bitácora técnica @byalcantar
        </div>

        {/* Top Local Navigation Bar */}
        <header className="flex items-center justify-between border-b border-[#2c2c2c] px-6 py-4 sticky top-0 bg-[#191919]/90 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-2 text-[13px] font-mono text-white/90">
            <Link href="/" className="hover:text-white transition flex items-center gap-1.5">
              <HomeIcon size={14} className="text-[#a3e635]" />
              <span>Home</span>
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/blog" className="hover:text-white transition">
              <span>Blog</span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#9b9b9b] truncate max-w-[140px] sm:max-w-none">{post.title}</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-[12px] font-mono text-[#9b9b9b] hover:text-white transition border border-[#2c2c2c] rounded-lg px-3 py-1 bg-[#222222]/40 shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[#a3e635]" />
                <span className="text-white">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Compartir</span>
              </>
            )}
          </button>
        </header>

        {/* Main Article Body */}
        <article className="p-6 md:p-12 max-w-4xl mx-auto space-y-8 w-full">
          
          {/* Back link */}
          <div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] font-mono text-[#9b9b9b] hover:text-[#a3e635] transition-colors">
              <ArrowLeft size={14} />
              <span>Volver a todos los artículos</span>
            </Link>
          </div>

          {/* Header */}
          <header className="space-y-4 border-b border-[#2c2c2c] pb-8">
            <div className="flex flex-wrap items-center gap-3 text-[12px] font-mono">
              <span className="px-3 py-1 rounded bg-[#2a2a2a] text-[#a3e635] font-semibold border border-[#383838]">
                {post.category}
              </span>
              <span className="text-[#9b9b9b]">{post.date}</span>
              <span className="text-[#9b9b9b]/40">•</span>
              <div className="flex items-center gap-1 text-[#9b9b9b]">
                <Clock size={13} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-[16px] md:text-[18px] text-[#9b9b9b] leading-relaxed font-sans font-normal italic">
              {post.excerpt}
            </p>
          </header>

          {/* Render Article Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-[15px] md:text-[16px] text-white/90 leading-relaxed font-sans">
            {post.content.split("\n\n").map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight pt-4 border-t border-[#2c2c2c]/40">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              if (trimmed.startsWith("#### ")) {
                return (
                  <h4 key={idx} className="text-lg font-bold text-[#a3e635] font-sans pt-2">
                    {trimmed.replace("#### ", "")}
                  </h4>
                );
              }

              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote key={idx} className="border-l-2 border-[#a3e635] pl-4 py-2 my-4 bg-[#1e1e1e]/60 rounded-r-lg text-white/90 font-serif italic text-[16px]">
                    {trimmed.replace("> ", "")}
                  </blockquote>
                );
              }

              if (trimmed.startsWith("```")) {
                const codeLines = trimmed.split("\n").slice(1, -1).join("\n");
                return (
                  <div key={idx} className="bg-[#141414] border border-[#2c2c2c] rounded-xl p-4 font-mono text-[13px] text-[#a3e635] overflow-x-auto my-4 shadow-inner">
                    <pre><code>{codeLines}</code></pre>
                  </div>
                );
              }

              return (
                <p key={idx} className="text-[#f5f5f7]/90 leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Article Footer & Tags */}
          <footer className="pt-8 border-t border-[#2c2c2c] space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={14} className="text-[#9b9b9b]" />
              {post.tags.map((tag) => (
                <span key={tag} className="text-[12px] font-mono text-[#9b9b9b] bg-[#1e1e1e] px-3 py-1 rounded-md border border-[#2c2c2c]">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author info box */}
            <div className="bg-[#1e1e1e]/80 border border-[#2c2c2c] rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden relative bg-[#222222] border border-[#2c2c2c] shrink-0">
                <img src="/avatar_juan.png" alt="Juan Alcántar" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h4 className="text-white font-bold text-[15px]">Juan Alcántar (@byalcantar)</h4>
                <p className="text-[#9b9b9b] text-[13px]">Estudiante de Ingeniería en IA (ITCG) & Fundador de ONYX Inc. Construyendo desde Jalisco.</p>
              </div>
            </div>

            {/* Next post recommendation */}
            {nextPost && nextPost.slug !== post.slug && (
              <div className="pt-4">
                <Link 
                  href={`/blog/${nextPost.slug}`}
                  className="group flex items-center justify-between p-5 bg-[#1e1e1e]/40 border border-[#2c2c2c] hover:border-[#a3e635]/50 rounded-xl transition-all"
                >
                  <div>
                    <span className="text-[11px] font-mono text-[#9b9b9b] uppercase tracking-wider block mb-1">Siguiente Lectura</span>
                    <h5 className="text-white font-bold group-hover:text-[#a3e635] transition-colors">{nextPost.title}</h5>
                  </div>
                  <ArrowRight size={18} className="text-[#a3e635] group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
                </Link>
              </div>
            )}
          </footer>

        </article>

      </div>

    </main>
  );
}
