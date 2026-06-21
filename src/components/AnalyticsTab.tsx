import React, { useState } from "react";
import { GenreCount, Movie } from "../data/movies";
import { Play, TrendingUp, Calendar, Hash, ThumbsUp, Sparkles } from "lucide-react";

interface AnalyticsTabProps {
  stats: {
    totalMovies: number;
    genreCounts: GenreCount[];
    ratingDistribution: { range: string; count: number }[];
    popularMovies: Movie[];
    averageYear: number;
    averageRating: number;
  } | null;
  onSelectMovie: (id: number) => void;
}

export default function AnalyticsTab({ stats, onSelectMovie }: AnalyticsTabProps) {
  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState<string | null>(null);

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E50914] mb-4" />
        <p className="font-mono text-xs">Analyzing Movie Database stats...</p>
      </div>
    );
  }

  // Find max genre count for scaling representation
  const maxGenreCount = Math.max(...stats.genreCounts.map(g => g.count));
  // Find max rating count
  const maxRatingCount = Math.max(...stats.ratingDistribution.map(r => r.count));

  return (
    <div className="space-y-8 animate-fade-in" id="analytics-tab-container">
      {/* Overview Cards styled with a dark, minimalist Netflix vibe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#181818] border border-zinc-800/80 p-5 rounded-lg flex items-center space-x-4 shadow-md transition-all hover:border-zinc-700">
          <div className="p-3 bg-[#E50914]/10 text-[#E50914] rounded-lg">
            <Hash size={22} />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-mono">Catalog Count</span>
            <span className="text-xl font-bold text-white font-display">{stats.totalMovies} Classics</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">MovieLens Curator Sample</span>
          </div>
        </div>

        <div className="bg-[#181818] border border-zinc-800/80 p-5 rounded-lg flex items-center space-x-4 shadow-md transition-all hover:border-zinc-700">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
            <Sparkles size={22} />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-mono">Average Rating</span>
            <span className="text-xl font-bold text-white font-display">{stats.averageRating} ★</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">High-Value Target Threshold</span>
          </div>
        </div>

        <div className="bg-[#181818] border border-zinc-800/80 p-5 rounded-lg flex items-center space-x-4 shadow-md transition-all hover:border-zinc-700">
          <div className="p-3 bg-[#E50914]/10 text-[#E50914] rounded-lg">
            <Calendar size={22} />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-mono">Mean Release Year</span>
            <span className="text-xl font-bold text-white font-display">{stats.averageYear}</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Industrial Era Span</span>
          </div>
        </div>

        <div className="bg-[#181818] border border-zinc-800/80 p-5 rounded-lg flex items-center space-x-4 shadow-md transition-all hover:border-zinc-700">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <TrendingUp size={22} />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-mono">Total rating logs</span>
            <span className="text-xl font-bold text-white font-display">
              {stats.popularMovies.reduce((acc, m) => acc + m.ratingCount, 0).toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Aggregated User Metadata</span>
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Genre Frequency Horizontal Bar Chart */}
        <div className="bg-[#181818] border border-zinc-800/80 p-6 rounded-xl shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
              <span className="w-1 h-4 bg-[#E50914] rounded block" />
              Genre Matrix representation
            </h3>
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Interactive Distribution</span>
          </div>
          <p className="text-xs text-zinc-400">
            Counts of movies carrying each tags attribute. Multi-genres are counted separately to preserve weight distribution.
          </p>

          <div className="space-y-3 pt-2">
            {stats.genreCounts.map((g) => {
              const percentage = (g.count / maxGenreCount) * 100;
              const isHovered = hoveredGenre === g.genre;
              return (
                <div 
                  key={g.genre} 
                  className="space-y-1 group"
                  onMouseEnter={() => setHoveredGenre(g.genre)}
                  onMouseLeave={() => setHoveredGenre(null)}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-300 font-semibold group-hover:text-[#E50914] transition-colors">
                      {g.genre}
                    </span>
                    <span className="text-zinc-500">
                      {g.count} titles <span className="text-zinc-600">({Math.round((g.count / stats.totalMovies) * 100)}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-[#111111] h-2.5 rounded-full overflow-hidden border border-zinc-805/40">
                    <div 
                      className="bg-gradient-to-r from-[#B00710] to-[#E50914] group-hover:from-[#E50914] group-hover:to-[#FF1A26] h-full rounded-full transition-all duration-350 shadow-inner"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rating Distribution Vertical Chart */}
        <div className="bg-[#181818] border border-zinc-800/80 p-6 rounded-xl shadow-md space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
                <span className="w-1 h-4 bg-[#E50914] rounded block" />
                Score Density cluster histograms
              </h3>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Bin Distribution</span>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Visualizes average user score distributions. A density cluster around 4.0 demonstrates high benchmark significance.
            </p>

            {/* Custom SVG Column Bar Chart with nice red colors */}
            <div className="relative h-60 w-full flex items-end justify-between pt-6 border-b border-zinc-800 px-4">
              {stats.ratingDistribution.map((r) => {
                const heightPercentage = (r.count / maxRatingCount) * 90; // scale
                const isHovered = hoveredRating === r.range;
                return (
                  <div 
                    key={r.range} 
                    className="flex flex-col items-center flex-1 group"
                    onMouseEnter={() => setHoveredRating(r.range)}
                    onMouseLeave={() => setHoveredRating(null)}
                  >
                    {/* Tooltip value */}
                    <div className={`absolute top-0 bg-[#2F2F2F] text-white border border-zinc-700 text-[10px] font-mono py-1 px-2 rounded transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      {r.count} titles in {r.range} range
                    </div>

                    {/* Bar */}
                    <div className="w-10 bg-[#111111] border border-zinc-800/50 rounded-t-sm overflow-hidden flex items-end h-44 relative">
                      <div 
                        className="w-full bg-gradient-to-t from-[#B00710] to-[#E50914] rounded-t-sm group-hover:to-[#FF1A26] transition-all duration-350 shadow-md"
                        style={{ height: `${heightPercentage}%` }}
                      >
                        <div className="w-full h-0.5 bg-white/10" />
                      </div>
                    </div>

                    {/* Label */}
                    <span className="text-[10px] font-mono text-zinc-400 mt-2 block tracking-tighter">
                      ★ {r.range}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#141414] p-4 border border-zinc-800 rounded-lg space-y-2">
            <span className="text-xs font-semibold text-[#E50914] flex items-center gap-1 font-mono uppercase tracking-wider">
              <ThumbsUp size={13} /> statistical inference
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              The density is concentrated due to high rating thresholds on standard reference datasets, preserving content recommendation reliability for content-based models.
            </p>
          </div>

        </div>

      </div>

      {/* Popular Movies Table view */}
      <div className="bg-[#181818] border border-zinc-800/80 p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
          <span className="w-1 h-4 bg-[#E50914] rounded block" />
          Prevalent classic titles (Ranked by data logging volume)
        </h3>
        <p className="text-xs text-zinc-400">
          Ranked lists of titles with highest data volume inside the catalog. Select any movie node to inject into vector similarity checks.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-mono text-zinc-400 uppercase">
                <th className="py-3 px-4">Title & Year</th>
                <th className="py-3 px-4">Genres</th>
                <th className="py-3 px-4 text-center">Average Stars</th>
                <th className="py-3 px-4 text-right">Ratings Volume</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-xs text-zinc-300">
              {stats.popularMovies.map((movie) => (
                <tr key={movie.id} className="hover:bg-zinc-800/40 transition-colors group">
                  <td className="py-3 px-4 font-semibold text-white">
                    {movie.title} <span className="text-zinc-500 font-normal">({movie.year})</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {movie.genres.map(g => (
                        <span key={g} className="bg-zinc-900 text-[10px] text-zinc-400 py-0.5 px-2 rounded border border-zinc-800">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-mono">
                    <span className="text-amber-500 font-bold">{movie.rating.toFixed(2)} ★</span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-zinc-400 font-medium">
                    {movie.ratingCount.toLocaleString()} times rated
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => onSelectMovie(movie.id)}
                      className="inline-flex items-center space-x-1.5 text-xs text-[#E50914] hover:text-white border border-[#E50914]/20 hover:border-[#E50914] bg-[#E50914]/5 hover:bg-[#E50914] py-1 px-3 rounded transition-all font-mono tracking-tight"
                    >
                      <Play size={10} className="fill-current text-[#E50914] group-hover:text-white" />
                      <span>Set Baseline</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
