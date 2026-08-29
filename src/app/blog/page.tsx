import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog & Notas | Juan Alcántar",
  description: "Pensamientos, arquitecturas e ideas sobre Inteligencia Artificial, ingeniería de software y creación de productos desde Jalisco.",
};

export default function BlogPage() {
  return <BlogContent />;
}
