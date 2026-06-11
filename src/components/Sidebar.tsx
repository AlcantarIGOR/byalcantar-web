"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ArrowUpRight, 
  Mail, 
  Instagram,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Code2,
  Clock,
  User,
  Activity,
  Gamepad2,
  Github
} from "lucide-react";

interface SidebarProps {
  activeLog?: string;
  onProjectClick?: (id: string) => void;
}

export default function Sidebar({ activeLog, onProjectClick }: SidebarProps) {
  const pathname = usePathname();

  const handleProjectClick = (id: string, e: React.MouseEvent) => {
    if (onProjectClick) {
      e.preventDefault();
      onProjectClick(id);
    }
  };

  const eduProjects = [
    { label: "MoodleSync", id: "moodlesync", icon: <GraduationCap size={15} /> }
  ];

  const apsProjects = [
    { label: "ONYX Digital System", id: "onyx-digital-system", icon: <Briefcase size={15} /> },
    { label: "ONYX Launch / Pro", id: "onyx-launch-pro", icon: <Code2 size={15} /> },
    { label: "ONYX Care", id: "onyx-care", icon: <Activity size={15} /> }
  ];

  const renderProjectItem = (proj: { label: string; id: string; icon: React.ReactNode }) => {
    const isActive = activeLog === proj.id;
    const href = `/projects/${proj.id}`;

    return (
      <li key={proj.id}>
        <Link
          href={href}
          className={`w-full text-left text-[13.5px] font-medium transition py-1 flex items-center justify-between group ${
            isActive ? "text-white font-semibold" : "text-[#9b9b9b] hover:text-white"
          }`}
        >
          <div className="flex items-center min-w-0">
            <span className={`mr-2.5 shrink-0 transition ${isActive ? "text-white" : "text-[#9b9b9b]/70 group-hover:text-white"}`}>
              {proj.icon}
            </span>
            <span className="truncate">{proj.label}</span>
          </div>
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shrink-0 ml-2" />}
        </Link>
      </li>
    );
  };

  return (
    <aside className="w-full md:w-[260px] lg:w-[285px] md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-[#2c2c2c] bg-[#191919] flex flex-col justify-between shrink-0 p-6 z-20">
      <div className="space-y-8">
        
        {/* Brand Logo & Name */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 font-sans font-bold text-[16px] text-white tracking-tight hover:opacity-85 transition">
            <div className="w-6 h-6 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center font-serif text-[12px] text-[#a3e635] font-semibold italic">
              A
            </div>
            <span>Juan Alcántar</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-6">
          
          {/* About Link (with avatar next to it) */}
          <div>
            <Link
              href="/about"
              className={`flex items-center text-[13.5px] font-medium transition py-1 ${
                pathname === "/about" ? "text-white font-semibold" : "text-[#9b9b9b] hover:text-white"
              }`}
            >
              <div className="w-[18px] h-[18px] rounded-full overflow-hidden relative border border-[#2c2c2c] bg-[#222222] mr-2 shrink-0">
                <Image src="/avatar_juan.png" alt="Juan Alcántar" fill className="object-contain" />
              </div>
              <span>About</span>
            </Link>
          </div>

          {/* EDU Section */}
          <div className="space-y-2">
            <span className="block text-[10px] font-mono uppercase tracking-[0.12em] text-[#9b9b9b]/55 font-bold">
              EDU
            </span>
            <ul className="space-y-1">
              {eduProjects.map(renderProjectItem)}
            </ul>
          </div>

          {/* APS Section */}
          <div className="space-y-2">
            <span className="block text-[10px] font-mono uppercase tracking-[0.12em] text-[#9b9b9b]/55 font-bold">
              APS
            </span>
            <ul className="space-y-1">
              {apsProjects.map(renderProjectItem)}
            </ul>
          </div>

          {/* Design Engineering Section */}
          <div className="space-y-2">
            <span className="block text-[10px] font-mono uppercase tracking-[0.12em] text-[#9b9b9b]/55 font-bold">
              Design Engineering
            </span>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/projects"
                  className="flex items-center justify-between text-[13.5px] font-medium text-[#9b9b9b] hover:text-white transition py-1 group"
                >
                  <div className="flex items-center min-w-0">
                    <FlaskConical size={15} className="mr-2.5 shrink-0 text-[#9b9b9b]/70 group-hover:text-white transition" />
                    <span className="truncate">Interface Lab</span>
                  </div>
                  <ArrowUpRight size={14} className="text-[#9b9b9b]/40 group-hover:text-white transition shrink-0 ml-2" />
                </Link>
              </li>
              <li>
                <Link
                  href="/onyx"
                  className="flex items-center justify-between text-[13.5px] font-medium text-[#9b9b9b] hover:text-white transition py-1 group"
                >
                  <div className="flex items-center min-w-0">
                    <Briefcase size={15} className="mr-2.5 shrink-0 text-[#9b9b9b]/70 group-hover:text-white transition" />
                    <span className="truncate">ONYX Inc.</span>
                  </div>
                  <ArrowUpRight size={14} className="text-[#9b9b9b]/40 group-hover:text-white transition shrink-0 ml-2" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-2">
            <span className="block text-[10px] font-mono uppercase tracking-[0.12em] text-[#9b9b9b]/55 font-bold">
              Contact
            </span>
            <ul className="space-y-1">
              {[
                { 
                  label: "Email", 
                  href: "mailto:founder@onyxinc.dev", 
                  icon: <Mail size={15} /> 
                },
                { 
                  label: "LinkedIn", 
                  href: "https://www.linkedin.com/in/juan-alcantar-flores-929816298/", 
                  icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="mr-2.5 shrink-0 text-[#9b9b9b]/70 group-hover:text-white transition"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> 
                },
                { 
                  label: "GitHub", 
                  href: "https://github.com/AlcantarIGOR", 
                  icon: <Github size={15} /> 
                },
                { 
                  label: "X (Twitter)", 
                  href: "https://x.com/Alc_Juan164", 
                  icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="mr-2.5 shrink-0 text-[#9b9b9b]/70 group-hover:text-white transition"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> 
                },
                { 
                  label: "Instagram", 
                  href: "https://www.instagram.com/its.alc4ntar_/", 
                  icon: <Instagram size={15} /> 
                },
                { 
                  label: "Discord", 
                  href: "https://discord.dog/alcantarxp", 
                  icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="mr-2.5 shrink-0 text-[#9b9b9b]/70 group-hover:text-white transition"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011 19.82 19.82 0 0 0 12.04 0 .073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/></svg> 
                },
                { 
                  label: "WhatsApp", 
                  href: "https://wa.me/523340865087", 
                  icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="mr-2.5 shrink-0 text-[#9b9b9b]/70 group-hover:text-white transition"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.167 1.455 4.793 1.456 5.253 0 9.526-4.272 9.53-9.53.002-2.546-.99-4.94-2.793-6.744a9.458 9.458 0 0 0-6.737-2.793c-5.254 0-9.527 4.273-9.53 9.531-.001 1.734.453 3.424 1.316 4.924L1.722 21.84l4.925-1.292zm11.38-7.5c-.294-.146-1.736-.856-2.005-.954-.269-.098-.465-.147-.66.147-.196.294-.759.954-.93 1.15-.172.196-.344.22-.638.073-.293-.146-1.24-.457-2.362-1.458-.872-.778-1.46-1.74-1.63-2.034-.173-.294-.018-.453.129-.597.132-.13.294-.343.44-.515.148-.171.197-.293.294-.49.098-.195.049-.366-.024-.513-.074-.147-.66-1.59-.905-2.178-.238-.574-.48-.496-.66-.505-.17-.008-.367-.01-.565-.01-.197 0-.52.074-.792.368-.272.294-1.04 1.016-1.04 2.478 0 1.462 1.063 2.875 1.21 3.07.147.196 2.093 3.197 5.071 4.484.708.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.736-.71 1.98-1.396.244-.686.244-1.273.171-1.396-.073-.122-.269-.195-.563-.342z"/></svg> 
                }
              ].map((cont) => (
                <li key={cont.label}>
                  <a
                    href={cont.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[13.5px] font-medium text-[#9b9b9b] hover:text-white transition py-1 group"
                  >
                    <div className="flex items-center min-w-0">
                      <span className="mr-2.5 shrink-0 text-[#9b9b9b]/70 group-hover:text-white transition">
                        {cont.icon}
                      </span>
                      <span className="truncate">{cont.label}</span>
                    </div>
                    <ArrowUpRight size={14} className="text-[#9b9b9b]/40 group-hover:text-white transition shrink-0 ml-2" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </nav>
      </div>

      {/* Copyright bottom */}
      <div className="pt-8 border-t border-[#2c2c2c] md:border-t-0 mt-6 md:mt-0">
        <p className="text-[11px] font-mono text-[#9b9b9b]/40">
          &copy; Juan Alcántar, 2026
        </p>
      </div>
    </aside>
  );
}
