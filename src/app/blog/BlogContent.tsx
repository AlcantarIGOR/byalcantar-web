"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Search, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { HeroBackground, AmbientGlow } from "@/components/Background";
import { BlogPost } from "@/lib/blog";

interface BlogContentProps {
  initialPosts: BlogPost[];
}

export default function BlogContent({ initialPosts }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [initialPosts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [initialPosts, searchQuery, selectedTag]);

  return (
    <main className="bg-[#080809] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-40 pb-12 px-6 overflow-hidden">
        <HeroBackground />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionLabel>Bitácora</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(42px,6vw,78px)] font-extrabold text-white tracking-tight leading-[1.03] mb-6"
          >
            Notas & <em className="text-[#a3e635] font-display italic">Aprendizajes</em>
            <br />
            <span className="text-white/60">— construyendo al aire libre.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/55 text-lg max-w-2xl"
          >
            Reflexiones técnicas sobre Inteligencia Artificial aplicada, automatización 
            de procesos tradicionales y lecciones aprendidas levantando ONYX Inc.
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-6 mb-12 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center py-6 border-y border-white/[0.06]">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white/[0.03] border border-white/[0.08] hover:border-white/20 focus:border-[#a3e635]/40 focus:ring-1 focus:ring-[#a3e635]/25 rounded-full pl-10 pr-4 text-[13.5px] text-white placeholder-white/30 outline-none transition"
            />
          </div>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedTag(null)}
              className={`h-9 px-4 rounded-full text-xs font-mono transition ${
                selectedTag === null
                  ? "bg-[#a3e635] text-black font-semibold"
                  : "bg-white/[0.04] text-white/60 border border-white/10 hover:border-white/20"
              }`}
            >
              Todos
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`h-9 px-4 rounded-full text-xs font-mono transition ${
                  selectedTag === tag
                    ? "bg-[#a3e635] text-black font-semibold"
                    : "bg-white/[0.04] text-white/60 border border-white/10 hover:border-white/20"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className="px-6 py-8 relative">
        <AmbientGlow />
        <div className="max-w-4xl mx-auto relative z-10">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-white/[0.08] rounded-2xl">
              <BookOpen className="mx-auto text-white/20 mb-4" size={36} />
              <h3 className="text-white/60 font-semibold text-lg mb-1">No se encontraron artículos</h3>
              <p className="text-white/30 text-sm">Prueba ajustando los filtros o el término de búsqueda.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group relative bg-[#111114] border border-white/[0.07] hover:border-[#a3e635]/25 rounded-2xl p-6 md:p-8 transition-all"
                >
                  <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" />
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/40 mb-4">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#a3e635] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-white/55 text-[14.5px] leading-relaxed mb-6">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.05] text-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#a3e635] group-hover:translate-x-0.5 transition-transform">
                      Leer artículo <ArrowUpRight size={14} />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer Year spacing */}
      <div className="h-16" />
      <Footer />
    </main>
  );
}
