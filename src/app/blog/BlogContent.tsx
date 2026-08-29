"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home as HomeIcon, 
  Search, 
  Tag, 
  Clock, 
  ArrowUpRight, 
  BookOpen,
  Sparkles
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { BLOG_POSTS, BlogPost } from "@/data/posts";

const CATEGORIES = ["Todas", "IA & Agentes", "Arquitectura", "Frontend", "Casos de Estudio"] as const;

export default function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "Todas" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#191919] text-[#f7facf] font-sans flex flex-col md:flex-row">
      
      {/* LEFT COLUMN: SIDEBAR */}
      <Sidebar />

      {/* RIGHT COLUMN: MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto bg-[#191919]">
        
        {/* Status Bar Banner */}
        <div className="bg-[#a3e635] text-black text-[11px] font-mono tracking-widest font-semibold text-center py-2 uppercase border-b border-[#2c2c2c] shrink-0">
          Blog & Notas · Construyendo en público desde Jalisco
        </div>

        {/* Top Local Navigation Bar */}
        <header className="flex items-center justify-between border-b border-[#2c2c2c] px-6 py-4 sticky top-0 bg-[#191919]/90 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-2 text-[13px] font-mono text-white/90">
            <Link href="/" className="hover:text-white transition flex items-center gap-1.5">
              <HomeIcon size={14} className="text-[#a3e635]" />
              <span>Home</span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#9b9b9b]">Blog</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-mono text-[#a3e635]">
            <BookOpen size={14} />
            <span>{BLOG_POSTS.length} Artículos</span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-6 md:p-10 max-w-5xl space-y-10">
          
          {/* Header Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222222] border border-[#2c2c2c] text-[11px] font-mono text-[#a3e635]">
              <Sparkles size={12} />
              <span>Bitácora Técnica @byalcantar</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Blog & Notas
            </h1>
            <p className="text-[#9b9b9b] text-[15px] md:text-[16px] max-w-2xl leading-relaxed">
              Reflexiones sobre Inteligencia Artificial, arquitectura de software, experiencia de desarrollo y el aprendizaje continuo mientras construyo herramientas reales y ONYX Inc. desde Jalisco.
            </p>
          </div>

          {/* Controls Bar: Search & Category Filter */}
          <div className="space-y-4 pt-2">
            
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9b9b9b]" />
              <input
                type="text"
                placeholder="Buscar por palabra clave o tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-white placeholder-[#9b9b9b]/60 focus:outline-none focus:border-[#a3e635] transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#a3e635] text-black font-semibold shadow-md"
                        : "bg-[#1e1e1e] border border-[#2c2c2c] text-[#9b9b9b] hover:text-white hover:border-[#3c3c3c]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Posts Grid */}
          <div className="space-y-6 pt-2">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative bg-[#1e1e1e]/60 border border-[#2c2c2c] hover:border-[#a3e635]/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#a3e635]/5"
                >
                  <Link href={`/blog/${post.slug}`} className="block space-y-4">
                    
                    {/* Meta info header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono text-[#9b9b9b]">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded bg-[#2a2a2a] text-[#a3e635] font-semibold border border-[#383838]">
                          {post.category}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#9b9b9b]/70">
                        <Clock size={13} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title & Arrow */}
                    <div className="space-y-2">
                      <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#a3e635] transition-colors flex items-center justify-between gap-4 font-sans tracking-tight">
                        <span>{post.title}</span>
                        <ArrowUpRight size={20} className="shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#a3e635]" />
                      </h2>
                      <p className="text-[#9b9b9b] text-[14px] md:text-[15px] leading-relaxed line-clamp-3 font-sans">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Tags footer */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#2c2c2c]/40">
                      <Tag size={12} className="text-[#9b9b9b]/40" />
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-mono text-[#9b9b9b]/70 bg-[#141414] px-2 py-0.5 rounded border border-[#262626]">
                          #{tag}
                        </span>
                      ))}
                    </div>

                  </Link>
                </article>
              ))
            ) : (
              <div className="text-center py-16 bg-[#1e1e1e]/30 border border-[#2c2c2c] rounded-2xl space-y-3">
                <BookOpen size={28} className="mx-auto text-[#9b9b9b]/50" />
                <p className="text-white font-medium">No se encontraron artículos</p>
                <p className="text-[#9b9b9b] text-xs font-mono">Intenta con otra búsqueda o cambia la categoría seleccionada.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </main>
  );
}
