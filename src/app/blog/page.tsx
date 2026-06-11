import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog — Juan Alcántar | Bitácora de Inteligencia Artificial y Sistemas",
  description: "Notas técnicas, reflexiones y guías sobre desarrollo de software, Inteligencia Artificial aplicada, automatización y el día a día construyendo ONYX Inc.",
};

export default function BlogPage() {
  const posts = getBlogPosts();
  return <BlogContent initialPosts={posts} />;
}
