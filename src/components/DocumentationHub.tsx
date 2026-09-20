import React, { useState } from 'react';
import { documentationArticles } from '../config/airaConfig';
import { DocArticle } from '../types';
import {
  BookOpen,
  Search,
  ChevronRight,
  Clock,
  ArrowRight,
  FolderOpen,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const DocumentationHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<DocArticle>(documentationArticles[0]);

  const categories = [
    'All',
    'Getting Started',
    'Using AIRA',
    'Device Actions',
    'Troubleshooting',
    'Updates'
  ];

  const filteredArticles = documentationArticles.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="docs" className="py-24 relative overflow-hidden bg-[#07080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Documentation Hub
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Official guides, architectural overviews, troubleshooting manuals, and configuration docs for AIRA on Android.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides & articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Two-Column Docs Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
          {/* Left Column: Article Index */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-white/10 text-slate-400 text-xs">
                No matching articles found for "{searchQuery}".
              </div>
            ) : (
              filteredArticles.map((article) => {
                const isSelected = selectedArticle.id === article.id;
                return (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/40 hover:bg-slate-900/70 border-white/[0.06] hover:border-white/15'
                    }`}
                  >
                    <div className="space-y-1 truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="text-slate-600 text-[10px]">•</span>
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {article.readTime}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white truncate">
                        {article.title}
                      </h4>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Active Article Reading Pane */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="rounded-3xl bg-[#080B15] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Article Header */}
              <div className="pb-6 border-b border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selectedArticle.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white font-['Syne',sans-serif]">
                  {selectedArticle.title}
                </h3>
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
                {selectedArticle.content.map((paragraph, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>

              {/* Document Quick Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="font-mono text-slate-500">
                  Document ID: {selectedArticle.id}
                </span>
                <a
                  href="#faq"
                  className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                >
                  <span>Have questions? Check FAQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
