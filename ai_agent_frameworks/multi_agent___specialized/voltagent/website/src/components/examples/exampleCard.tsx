import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import React from "react";

interface ExampleCardProps {
  example: {
    id: number;
    slug: string;
    title: string;
    description: string;
  };
}

export const ExampleCard = ({ example }: ExampleCardProps) => {
  return (
    <Link to={`/examples/agents/${example.slug}/`} className="no-underline">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative border-solid bg-gradient-to-br from-emerald-500/20 via-slate-900/70 to-slate-900/30 border-emerald-500/20 border rounded-xl overflow-hidden transition-all duration-300 h-full hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-600/20 cursor-pointer shadow-2xl shadow-emerald-600/20"
      >
        {/* Glow effects */}
        <div className="absolute -top-12 -right-8 h-32 w-32 rounded-full bg-emerald-500/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-5 h-24 w-24 rounded-full bg-emerald-400/20 blur-[100px] pointer-events-none" />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d992]/0 to-[#00d992]/0 group-hover:from-[#00d992]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

        <div className="p-7 relative z-10 flex flex-col h-full">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d992] transition-colors duration-300">
            {example.title}
          </h3>

          <p className="text-gray-400 text-[15px] leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-0 flex-grow">
            {example.description}
          </p>

          <div className="flex justify-end">
            <span className="text-[#00d992] text-lg font-medium transition-all duration-300 group-hover:text-[#00ffaa] group-hover:scale-110 inline-block group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
