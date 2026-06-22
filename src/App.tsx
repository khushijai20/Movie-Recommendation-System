import React, { useState, useEffect } from "react";
import { 
  Play, 
  TrendingUp, 
  Search, 
  FileCode, 
  Briefcase, 
  BarChart2, 
  Sparkles, 
  MessageSquare, 
  Sliders, 
  ChevronRight, 
  ChevronDown,
  Info, 
  Award,
  Send,
  Plus,
  Tv,
  Check,
  Eye,
  Settings,
  HelpCircle,
  LogOut,
  Radio,
  Bell,
  Grid,
  Volume2,
  VolumeX,
  Maximize2,
  Compass,
  Clock,
  History,
  Bookmark,
  Calendar,
  X,
  Volume1,
  BookOpen
} from "lucide-react";
import { Movie, RecommendationResult } from "./data/movies";
import AnalyticsTab from "./components/AnalyticsTab";
import CodeExporterTab from "./components/CodeExporterTab";
import InterviewSuiteTab from "./components/InterviewSuiteTab";

// High fidelity Netflix-inspired custom movie card components
interface PremiumMovieCardProps {
  key?: any;
  id: number;
  title: string;
  genres: string[];
  year: number;
  rating: number;
  ratingCount?: number;
  highlight?: boolean;
  onSelect: () => void;
  onPlay: (title: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent) => void;
}

function PremiumMovieCard({ 
  id, 
  title, 
  genres, 
  year, 
  rating, 
  highlight, 
  onSelect, 
  onPlay,
  isBookmarked,
  onToggleBookmark 
}: PremiumMovieCardProps) {

  // Generates specific thematic background assets styled with CSS gradients based on titles
  const getStylizedMovieGradients = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes("totoro") || lowercase.includes("story") || lowercase.includes("toy")) {
      return "from-[#102d42] via-[#111f2b] to-[#0A0D10] border-sky-900/40 shadow-sky-950/20";
    }
    if (lowercase.includes("goldeneye") || lowercase.includes("bond") || lowercase.includes("agent")) {
      return "from-[#2f2211] via-[#1c1813] to-[#0A0D10] border-amber-900/30 shadow-amber-950/10";
    }
    if (lowercase.includes("heat") || lowercase.includes("crime") || lowercase.includes("casino")) {
      return "from-[#2e0e11] via-[#1a1012] to-[#0A0D10] border-red-950/50 shadow-red-950/10";
    }
    if (lowercase.includes("jumanji") || lowercase.includes("adventure") || lowercase.includes("jungle")) {
      return "from-[#0d2a1a] via-[#0d1712] to-[#0A0D10] border-emerald-950/50 shadow-emerald-950/10";
    }
    // Default high contrast zinc cards
    return "from-[#151515] via-[#111111] to-[#0A0D10] border-zinc-800/80 shadow-black/40";
  };

  return (
    <div 
      className={`relative h-64 rounded-xl border p-4 flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-all duration-300 hover:scale-[1.03] hover:border-netflix-red group hover:shadow-xl hover:shadow-[#E50914]/10 ${getStylizedMovieGradients(title)} ${highlight ? 'ring-2 ring-netflix-red border-transparent bg-zinc-950' : ''}`}
      onClick={onSelect}
    >
      <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 z-10">
        <span className="w-5 h-5 bg-[#E50914] text-white font-black text-[12px] flex items-center justify-center rounded-sm shadow-md font-display select-none">
          N
        </span>
        <span className="bg-black/70 backdrop-blur-sm text-[8px] text-zinc-300 px-1.5 py-0.5 rounded uppercase font-semibold border border-zinc-700/40">
          Original
        </span>
      </div>

      <span className="absolute top-3 right-3 font-mono text-[10px] text-[#E50914] font-bold tracking-wider opacity-90 z-10">
        {year}
      </span>

      {/* Decorative center ambient orb */}
      <div className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-gradient-to-tr from-transparent via-[#E50914]/5 to-transparent blur-xl pointer-events-none group-hover:via-[#E50914]/15 transition-all duration-300" />

      {/* Title Segment & Genres */}
      <div className="pt-9 flex-1 flex flex-col justify-center select-text">
        <h5 className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-[#E50914] transition-colors font-display line-clamp-2">
          {title}
        </h5>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {genres.slice(0, 2).map((g) => (
            <span key={g} className="bg-black/40 text-[9px] text-zinc-350 px-2 py-0.5 rounded border border-zinc-850/60 font-mono">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Footer statistics overlay */}
      <div className="mt-4 pt-3 border-t border-zinc-900/60 flex items-center justify-between z-10">
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-zinc-500 uppercase">Avg Rating</span>
          <span className="text-[11px] font-bold text-white mt-0.5 flex items-center gap-1 font-mono">
            ★ {rating.toFixed(2)}
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={onToggleBookmark}
            className={`p-1.5 rounded bg-zinc-900 border border-zinc-800 transition-all ${isBookmarked ? 'text-[#E50914] bg-[#E50914]/10 border-[#E50914]/20' : 'text-zinc-500 hover:text-white'}`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark this movie"}
          >
            <Bookmark size={11} className={isBookmarked ? "fill-current" : ""} />
          </button>
          
          <button 
            onClick={() => onPlay(title)}
            className="text-[9px] font-mono font-bold uppercase py-1 px-2.5 bg-[#18181A] hover:bg-[#E50914] text-[#E50914] hover:text-white rounded border border-zinc-850 transition-all"
          >
            Play
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
    </div>
  );
}

export default function App() {
  // Navigation mapping exactly corresponding to the mockup sidebar elements
  // Tabs: recommend, discovery, community, coming_soon, recent, bookmarked, eda, code, interview
  const [activeTab, setActiveTab] = useState<
    "recommend" | "discovery" | "community" | "coming_soon" | "recent" | "bookmarked" | "eda" | "code" | "interview"
  >("recommend");
  
  // Database datasets loaded of full stack Express backends
  const [movies, setMovies] = useState<Movie[]>([]);
  const [stats, setStats] = useState<any | null>(null);
  const [exportedFiles, setExportedFiles] = useState<Record<string, string> | null>(null);
  
  // Recommendation baseline selections
  const [selectedMovieId, setSelectedMovieId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recommendationLimit, setRecommendationLimit] = useState<number>(5);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [showMathInspector, setShowMathInspector] = useState<boolean>(false);
  const [showTuning, setShowTuning] = useState<boolean>(false);

  // User state bookmarks & play histories
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([3, 4]); // Prefilled bookmarks
  const [recentViewedIds, setRecentViewedIds] = useState<number[]>([1, 2]); // Prefilled view stats
  const [activeMediaService, setActiveMediaService] = useState<string>("Netflix");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("Movies");
  const [activeSubscriptionTier, setActiveSubscriptionTier] = useState<string>("Ultra Premium 4K");

  // Trailer interactive simulator overlay modal
  const [activeTrailerName, setActiveTrailerName] = useState<string | null>(null);
  const [trailerTimer, setTrailerTimer] = useState<number>(0);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState<boolean>(false);
  const [simulatedVolume, setSimulatedVolume] = useState<number>(85);

  // Helper notice state
  const [notifMessage, setNotifMessage] = useState<string | null>(null);

  // Assistant chatbot states (Community forum advisor)
  const [assistantPrompt, setAssistantPrompt] = useState<string>("");
  const [assistantLogs, setAssistantLogs] = useState<{ role: "user" | "bot"; text: string }[]>([
    { 
      role: "bot", 
      text: "👋 Welcome to Netflix Movie Intelligence! I am your AI Rec Systems Assistant. Ask me anything about how TF-IDF vectorizers are fit, how Cosine Similarity calculates spatial angles, or what evaluation metrics (NDCG, Precision@K) evaluate offline performance." 
    }
  ]);
  const [isAssistantLoading, setIsAssistantLoading] = useState<boolean>(false);

  // Load backend stats, algorithms, code workspaces
  useEffect(() => {
    async function loadInitialData() {
      try {
        const moviesResponse = await fetch("/api/movies");
        const moviesData = await moviesResponse.json();
        if (moviesData.success) {
          setMovies(moviesData.movies);
          calculateRecommendations(1, 5, moviesData.movies);
        }

        const statsResponse = await fetch("/api/stats");
        const statsData = await statsResponse.json();
        if (statsData.success) {
          setStats(statsData.stats);
        }

        const exporterResponse = await fetch("/api/exporter/files");
        const exporterData = await exporterResponse.json();
        if (exporterData.success) {
          setExportedFiles(exporterData.files);
        }
      } catch (error) {
        console.error("Failed to sync with local express backends:", error);
      }
    }
    loadInitialData();
  }, []);

  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Focus Search: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          showNotification("Search input focused ⌨️");
        }
      }

      // 2. Escape to close overlay modals or reset focus
      if (e.key === "Escape") {
        let closedSomething = false;
        if (activeTrailerName) {
          setActiveTrailerName(null);
          closedSomething = true;
        }
        if (showMathInspector) {
          setShowMathInspector(false);
          closedSomething = true;
        }
        if (showShortcutsHelp) {
          setShowShortcutsHelp(false);
          closedSomething = true;
        }
        
        // Unfocus active inputs if any
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }

        if (closedSomething) {
          showNotification("Overlays closed via Esc ⌨️");
        }
      }

      // 3. Alt + Numbers to switch tabs
      const num = parseInt(e.key);
      if (e.altKey && !isNaN(num) && num >= 1 && num <= 9) {
        e.preventDefault();
        const tabs: ("recommend" | "discovery" | "community" | "coming_soon" | "recent" | "bookmarked" | "eda" | "code" | "interview")[] = [
          "recommend",
          "discovery",
          "community",
          "coming_soon",
          "recent",
          "bookmarked",
          "eda",
          "code",
          "interview"
        ];
        const targetTab = tabs[num - 1];
        if (targetTab) {
          setActiveTab(targetTab);
          showNotification(`Navigated to ${targetTab.toUpperCase()} tab ⌨️`);
        }
      }

      // 4. Ctrl+Alt+S to toggle shortcuts keyboard help sheet
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setShowShortcutsHelp(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTrailerName, showMathInspector, showShortcutsHelp]);

  const showNotification = (msg: string) => {
    setNotifMessage(msg);
    setTimeout(() => {
      setNotifMessage(null);
    }, 4500);
  };

  // Compute content-based vector recommendations
  const calculateRecommendations = async (movieId: number, limit: number, currentMoviesList: Movie[] = movies) => {
    setIsComputing(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId, count: limit })
      });
      const data = await response.json();
      if (data.success) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error("Failed to compute recommendations server-side:", err);
    } finally {
      setIsComputing(false);
    }
  };

  const activeBaseMovie = movies.find(m => m.id === selectedMovieId) || movies[0] || {
    id: 1,
    title: "Loading...",
    genres: [],
    year: 2026,
    rating: 0,
    tagline: "Connecting to movie intelligence backend...",
    overview: "Fetching content catalog..."
  };

  // Get streaming platforms for a movie to connect search filters with sidebar service partner choices
  const getMovieServices = (movieId: number): string[] => {
    switch(movieId) {
      case 1: case 13: return ["disney", "apple", "prime"];
      case 2: return ["disney", "prime"];
      case 3: return ["prime", "hbo"];
      case 4: case 6: return ["netflix", "hbo"];
      case 5: return ["peacock", "hulu"];
      case 7: case 8: case 9: return ["disney"];
      case 10: return ["peacock"];
      case 11: return ["apple", "prime"];
      case 12: return ["hulu", "prime", "netflix"];
      default:
        const mod = movieId % 5;
        if (mod === 0) return ["netflix", "apple"];
        if (mod === 1) return ["disney", "prime"];
        if (mod === 2) return ["hbo", "netflix"];
        if (mod === 3) return ["peacock", "hulu"];
        return ["prime", "apple"];
    }
  };

  // Search, Media Service and Category Filter (Simple & Scalable UX)
  const filteredCatalog = movies.filter(m => {
    // 1. Text Search Filter
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    // 2. Category Filter (Movies, Series, TV Shows, Animations, Plans)
    if (activeCategoryFilter === "Animations") {
      if (!m.genres.includes("Animation")) return false;
    } else if (activeCategoryFilter === "Series" || activeCategoryFilter === "TV Shows") {
      // Simulate series representation
      if (m.id % 2 !== 0) return false;
    }

    // 3. Media Service Platform Filter
    if (activeMediaService) {
      const services = getMovieServices(m.id);
      if (!services.includes(activeMediaService.toLowerCase())) return false;
    }

    return true;
  });

  // Profile metadata
  const userNickname = "Khushi Jain";
  const userEmail = "khushijai841221@gmail.com";

  // Collaborative trigger from genre filter clicks to fit mockup intent
  const filterGenreAndNavigate = (genre: string) => {
    setSearchQuery(genre);
    // Find highest rated movie carrying that genre to make visual transition stunning
    const match = movies.find(m => m.genres.includes(genre));
    if (match) {
      setSelectedMovieId(match.id);
      calculateRecommendations(match.id, recommendationLimit);
    }
    showNotification(`Filtering catalog by Genre: "${genre}". Rec-system computed references recalculated.`);
    // If not on first view, slide back to home beautifully
    if (activeTab !== "recommend" && activeTab !== "discovery") {
      setActiveTab("recommend");
    }
  };

  // Action bookmark toggle
  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
      showNotification(`"${movies.find(m => m.id === id)?.title}" removed from your bookmark suite.`);
    } else {
      setBookmarkedIds(prev => [...prev, id]);
      showNotification(`"${movies.find(m => m.id === id)?.title}" saved to your personal library.`);
    }
  };

  // Simulate play triggers the image-styled mockup cinematic control scrubber!
  const triggerSimulationPlay = (title: string) => {
    setActiveTrailerName(title);
    setTrailerTimer(0);
    setIsTrailerPlaying(true);
    
    // Add to recent viewed list
    const foundMovie = movies.find(m => m.title === title);
    if (foundMovie && !recentViewedIds.includes(foundMovie.id)) {
      setRecentViewedIds(prev => [foundMovie.id, ...prev.slice(0, 5)]);
    }

    showNotification(`Streaming Cinematic Visual Engine mock for "${title}". Loading TF-IDF parameters...`);
  };

  // Stream simulator ticking
  useEffect(() => {
    let interval: any = null;
    if (isTrailerPlaying && activeTrailerName) {
      interval = setInterval(() => {
        setTrailerTimer(prev => {
          if (prev >= 83) { // 1:23 mins is 83 seconds as mocked
            setIsTrailerPlaying(false);
            return 83;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTrailerPlaying, activeTrailerName]);

  const formatScrubberTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!assistantPrompt.trim() || isAssistantLoading) return;

    const userText = assistantPrompt;
    setAssistantLogs(prev => [...prev, { role: "user", text: userText }]);
    setAssistantPrompt("");
    setIsAssistantLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          currentMovieTitle: activeBaseMovie?.title || ""
        })
      });
      const data = await response.json();

      if (data.success || data.isConfigured === false) {
        setAssistantLogs(prev => [...prev, { role: "bot", text: data.reply }]);
      } else {
        setAssistantLogs(prev => [...prev, { role: "bot", text: `Error: ${data.error || "Failed to solve computation."}` }]);
      }
    } catch (error) {
      setAssistantLogs(prev => [...prev, { role: "bot", text: "Failed to connect to full-stack server endpoints. Please confirm process.env.GEMINI_API_KEY is configured." }]);
    } finally {
      setIsAssistantLoading(false);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-[#070707] text-white flex select-none selection:bg-[#E50914] selection:text-white antialiased overflow-x-hidden" id="applet-root">
      
      {/* GLOBAL NOTIFICATION SYSTEM */}
      {notifMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#E50914] text-white font-mono text-xs font-bold py-2.5 px-6 rounded-full shadow-lg shadow-[#E50914]/20 animate-bounce flex items-center space-x-2 border border-white/15">
          <Sparkles size={14} className="text-amber-300 fill-current animate-pulse" />
          <span>{notifMessage}</span>
        </div>
      )}

      {/* COLUMN 1: LEFT SIDEBAR DECORATIVE BRANDING PANEL */}
      <aside className="w-64 shrink-0 bg-[#0B0B0C] border-r border-zinc-900/60 p-6 flex flex-col justify-between hidden md:flex" id="left-sidebar">
        
        <div className="space-y-8">
          
          {/* Main Logo from mockup */}
          <div 
            onClick={() => setActiveTab("recommend")}
            className="flex items-center space-x-2.5 cursor-pointer hover:opacity-90 select-none group"
          >
            <div className="w-10 h-10 rounded bg-[#FF2B35] flex items-center justify-center text-white scale-90 group-hover:scale-95 transition-transform duration-300">
              <Tv size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-black tracking-widest text-[#FF2732] text-lg uppercase block leading-none">
                MOVIES
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block mt-1">
                AI INTELLIGENCE
              </span>
            </div>
          </div>

          {/* SECTION: MENU */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase block pl-2">
              Menu
            </span>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab("recommend"); }}
                className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "recommend" ? "bg-[#FF2732]/10 text-[#FF2732] border-l-4 border-[#FF2732]" : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"}`}
              >
                <Play size={15} className={`shrink-0 ${activeTab === "recommend" ? "text-[#FF2732] fill-current" : ""}`} />
                <span>Home</span>
              </button>

              <button
                onClick={() => { setActiveTab("discovery"); }}
                className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "discovery" ? "bg-[#FF2732]/10 text-[#FF2732] border-l-4 border-[#FF2732]" : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"}`}
              >
                <Compass size={15} className={`shrink-0 ${activeTab === "discovery" ? "text-[#FF2732]" : ""}`} />
                <span>Discovery</span>
              </button>

              <button
                onClick={() => { setActiveTab("community"); }}
                className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "community" ? "bg-[#FF2732]/10 text-[#FF2732] border-l-4 border-[#FF2732]" : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"}`}
              >
                <MessageSquare size={15} className={`shrink-0 ${activeTab === "community" ? "text-[#FF2732]" : ""}`} />
                <span>Community</span>
              </button>

              <button
                onClick={() => { setActiveTab("coming_soon"); }}
                className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "coming_soon" ? "bg-[#FF2732]/10 text-[#FF2732] border-l-4 border-[#FF2732]" : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"}`}
              >
                <Clock size={15} className={`shrink-0 ${activeTab === "coming_soon" ? "text-[#FF2732]" : ""}`} />
                <span>Coming soon</span>
              </button>
            </div>
          </div>

          {/* SECTION: LIBRARY */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase block pl-2">
              Library
            </span>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab("recent"); }}
                className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "recent" ? "bg-[#FF2732]/10 text-[#FF2732] border-l-4 border-[#FF2732]" : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"}`}
              >
                <History size={15} className={`shrink-0 ${activeTab === "recent" ? "text-[#FF2732]" : ""}`} />
                <span>Recent</span>
              </button>

              <button
                onClick={() => { setActiveTab("bookmarked"); }}
                className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "bookmarked" ? "bg-[#FF2732]/10 text-[#FF2732] border-l-4 border-[#FF2732]" : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"}`}
              >
                <Bookmark size={15} className={`shrink-0 ${activeTab === "bookmarked" ? "text-[#FF2732]" : ""}`} />
                <span>Bookmarked</span>
              </button>

              <button
                onClick={() => { setActiveTab("eda"); }}
                className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "eda" ? "bg-[#FF2732]/10 text-[#FF2732] border-l-4 border-[#FF2732]" : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"}`}
              >
                <BarChart2 size={15} className={`shrink-0 ${activeTab === "eda" ? "text-[#FF2732]" : ""}`} />
                <span>Top rated</span>
              </button>

              <button
                onClick={() => { setActiveTab("code"); }}
                className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "code" ? "bg-[#FF2732]/10 text-[#FF2732] border-l-4 border-[#FF2732]" : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"}`}
              >
                <FileCode size={15} className={`shrink-0 ${activeTab === "code" ? "text-[#FF2732]" : ""}`} />
                <span>Downloaded</span>
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM OPTION CONTROLS */}
        <div className="space-y-2 pt-6 border-t border-zinc-900/70">
          <button
            onClick={() => { setActiveTab("interview"); }}
            className={`w-full flex items-center space-x-3.5 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${activeTab === "interview" ? "bg-[#FF2732]/10 text-[#FF2732]" : "text-zinc-405 hover:text-white"}`}
          >
            <Settings size={14} />
            <span>Settings</span>
          </button>
          
          <button
            onClick={() => {
              setShowShortcutsHelp(true);
              showNotification("Keyboard Shortcuts guide opened!");
            }}
            className="w-full flex items-center space-x-3.5 py-2 px-4 rounded-lg text-xs text-zinc-405 hover:text-white hover:bg-zinc-900/20 text-left transition-colors font-sans"
          >
            <BookOpen size={14} className="text-[#FF2D35]" />
            <span>Shortcuts (Ctrl+Alt+S)</span>
          </button>

          <button
            onClick={() => {
              showNotification("Help & API configurations loaded successfully. Contact building-team in chat.");
            }}
            className="w-full flex items-center space-x-3.5 py-2 px-4 rounded-lg text-xs text-zinc-405 hover:text-white hover:bg-zinc-900/20 text-left transition-colors font-sans"
          >
            <HelpCircle size={14} />
            <span>Help</span>
          </button>

          <button
            onClick={() => {
              setSelectedMovieId(1);
              setSearchQuery("");
              showNotification("Netflix pipeline dashboard cache cleared successfully!");
            }}
            className="w-full flex items-center space-x-3.5 py-2 px-4 rounded-lg text-xs text-zinc-500 hover:text-[#FF2732] hover:bg-red-500/5 text-left transition-colors font-sans"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* MOBILE HEADER BUTTONS SENSITIVE OVERLAYS */}
      <div className="md:hidden block fixed bottom-0 left-0 right-0 bg-[#0F0F10] border-t border-zinc-900 z-50 flex justify-around py-3">
        <button onClick={() => setActiveTab("recommend")} className={`flex flex-col items-center gap-1 ${activeTab === "recommend" ? "text-[#FF2732]" : "text-zinc-500"}`}>
          <Play size={16} /> <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => setActiveTab("discovery")} className={`flex flex-col items-center gap-1 ${activeTab === "discovery" ? "text-[#FF2732]" : "text-zinc-500"}`}>
          <Compass size={16} /> <span className="text-[10px]">Browse</span>
        </button>
        <button onClick={() => setActiveTab("eda")} className={`flex flex-col items-center gap-1 ${activeTab === "eda" ? "text-[#FF2732]" : "text-zinc-500"}`}>
          <BarChart2 size={16} /> <span className="text-[10px]">EDA</span>
        </button>
        <button onClick={() => setActiveTab("code")} className={`flex flex-col items-center gap-1 ${activeTab === "code" ? "text-[#FF2732]" : "text-zinc-500"}`}>
          <FileCode size={16} /> <span className="text-[10px]">Code</span>
        </button>
        <button onClick={() => setActiveTab("interview")} className={`flex flex-col items-center gap-1 ${activeTab === "interview" ? "text-[#FF2732]" : "text-zinc-500"}`}>
          <Briefcase size={16} /> <span className="text-[10px]">Interview</span>
        </button>
      </div>

      {/* COLUMN 2 (CENTER-COMPONENTS CHUNK - EXPANDED FLUID COMPONENT CONTROLLER) */}
      <main className="flex-1 min-w-0 p-4 md:p-8 flex flex-col space-y-6 overflow-y-auto pb-24 md:pb-12" id="center-panel">
        
        {/* TOP ROW COMPACT HEADER SEARCH BAR */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900/60 pb-5 pt-2" id="pipeline-header">
          
          {/* Main category links from layout */}
          <div className="flex items-center space-x-1 sm:space-x-5 overflow-x-auto no-scrollbar py-1">
            {["Movies", "Series", "TV Shows", "Animations font-mono", "Plans"].map((cat) => {
              const display = cat.split(" ")[0];
              const isActive = activeCategoryFilter === display;
              return (
                <button
                  key={display}
                  onClick={() => {
                    setActiveCategoryFilter(display);
                    showNotification(`Filtered category view shifted to: ${display}`);
                  }}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all shrink-0 ${isActive ? 'bg-[#FF2732]/10 text-[#FF2732] ring-1 ring-[#FF2732]/35' : 'text-zinc-400 hover:text-white'}`}
                >
                  {display}
                </button>
              );
            })}
          </div>

          {/* Quick Right utility icons exactly like mockup */}
          <div className="flex items-center space-x-4">
            
            {/* Elegant Top Navigation Search Input */}
            <div className="relative w-44 md:w-56 lg:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500 pointer-events-none">
                <Search size={13} />
              </span>
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search movies, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111112] border border-zinc-900 hover:border-zinc-800 focus:border-[#FF2732] rounded-full py-1.5 pl-8.5 pr-12 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors font-sans"
              />
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <kbd className="bg-zinc-950/80 border border-zinc-900 text-zinc-500 text-[8px] px-1 rounded font-mono font-bold leading-none select-none">
                  Ctrl+K
                </kbd>
              </span>
            </div>
            
            {/* Live broadcast microindicator */}
            <div className="flex items-center space-x-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer" title="Active live node status">
              <Radio size={14} className="text-[#FF2732] animate-pulse" />
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider hidden lg:inline">LIVE STREAM</span>
            </div>

            {/* Notification alert count dot badge */}
            <div 
              onClick={() => showNotification("You have 3 recommended alert changes matching updated vector models!")}
              className="relative p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full bg-zinc-900/40 hover:bg-zinc-900"
            >
              <Bell size={15} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF2732]" />
            </div>

            {/* Grid display layout */}
            <div 
              onClick={() => showNotification("Matrix view active. High priority search bounds set.")}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full bg-zinc-900/40 hover:bg-zinc-900"
            >
              <Grid size={15} />
            </div>

          </div>

        </header>

        {/* DYNAMIC VIEW ROUTER FRAME CONTAINER */}
        <div className="w-full">
          
          {/* TAB 1: RECOMMEND (HOME DASHBOARD VIEW) */}
          {activeTab === "recommend" && (
            <div className="space-y-8 animate-fade-in" id="recommendations-view">
              {activeCategoryFilter === "Plans" ? (
                <div className="space-y-8 animate-fade-in py-4" id="plans-selection-view">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] bg-[#FF2732]/10 text-[#FF2732] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      MEMBERSHIP PLANS
                    </span>
                    <h2 className="text-2xl font-black text-white font-display">
                      Select Your AI Movie Streaming Tier
                    </h2>
                    <p className="text-xs text-zinc-405">
                      Instantly toggle between computing capabilities, spatial resolutions, and movie recommendation engines. No hidden fees. Cancel anytime.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
                    {[
                      {
                        name: "Basic Slate",
                        price: "$9.99",
                        status: "SD Resolution",
                        screens: "1 Active Screen",
                        engine: "Standard Cosine Aligner",
                        audio: "Stereo 2.0 Audio",
                        isBest: false,
                        color: "border-[#141414] bg-[#0B0B0C]",
                        btnColor: "bg-zinc-900 text-white hover:bg-zinc-800"
                      },
                      {
                        name: "Standard HD",
                        price: "$15.49",
                        status: "1080p Full HD",
                        screens: "2 Active Screens",
                        engine: "Advanced Spatial Cosine Sim",
                        audio: "Dolby Atmos Premium",
                        isBest: false,
                        color: "border-[#141414] bg-[#0B0B0C]",
                        btnColor: "bg-zinc-900 text-white hover:bg-zinc-800"
                      },
                      {
                        name: "Ultra Premium 4K",
                        price: "$19.99",
                        status: "4K UHD + HDR",
                        screens: "4 Active Screens",
                        engine: "Full TF-IDF Matrix Vector suite & AI Assistants",
                        audio: "Spatial Vector 3D Audio",
                        isBest: true,
                        color: "border-[#FF2732]/40 bg-gradient-to-b from-[#1b1011] to-[#0A0A0B] relative overflow-hidden",
                        btnColor: "bg-[#FF2732] text-white hover:bg-[#ff1e2a]"
                      }
                    ].map((tier) => {
                      const isActivePlan = activeSubscriptionTier === tier.name;
                      return (
                        <div 
                          key={tier.name}
                          className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${tier.color} ${isActivePlan ? 'ring-2 ring-[#FF2732]/80 shadow-lg shadow-red-950/20 border-transparent' : 'border-zinc-900/60'}`}
                        >
                          {tier.isBest && (
                            <span className="absolute top-3 right-3 bg-[#FF2732] text-white text-[8px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                              RECOMMENDED
                            </span>
                          )}

                          <div className="space-y-4">
                            <div>
                              <h3 className="text-base font-bold text-white font-display mb-1">{tier.name}</h3>
                              <p className="text-[10.5px] text-zinc-500 font-mono uppercase">{tier.status}</p>
                            </div>

                            <div className="flex items-baseline py-2 flex-wrap text-left">
                              <span className="text-3xl font-black text-white font-display">{tier.price}</span>
                              <span className="text-xs text-zinc-400 font-mono ml-1.5">/ month</span>
                            </div>

                            <div className="pt-4 border-t border-zinc-900 space-y-3 font-sans text-xs text-zinc-300 text-left">
                              <div className="flex items-center space-x-2">
                                <span className="text-[#FF2732] text-xs">✓</span>
                                <span>{tier.screens}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-[#FF2732] text-xs">✓</span>
                                <span>{tier.engine}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-[#FF2732] text-xs">✓</span>
                                <span>{tier.audio}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-zinc-550">
                                <span>✓ Unlimited views & bookmarks</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-6">
                            <button
                              onClick={() => {
                                setActiveSubscriptionTier(tier.name);
                                showNotification(`Your intelligence subscription shifted to: ${tier.name}! Enjoy unlimited access.`);
                              }}
                              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${isActivePlan ? 'bg-white text-black hover:bg-zinc-200' : tier.btnColor}`}
                            >
                              {isActivePlan ? "Your Active Plan" : "Select Subscription"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
              
              {/* INTERACTIVE VIDEO STREAMING CONTROLS OVERLAY HEADER (ACTIVE WHEN RECENT VIEW CLICKS SIMULATOR) */}
              {activeTrailerName && (
                <div className="bg-[#111112] border-2 border-l-[6px] border-[#FF2732] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-red-950/15 animate-fade-in">
                  
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#FF2732]/10 text-[#FF2732] flex items-center justify-center shrink-0">
                      <Tv size={20} className="animate-spin" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-zinc-400 font-mono uppercase tracking-wider">
                        CINEMATIC MOVIE PIPELINE SIMULATION PLAYING
                      </h4>
                      <h3 className="text-sm font-bold text-white mt-1">
                        Active Node: <span className="text-[#FF2732]">"{activeTrailerName}"</span>
                      </h3>
                      <p className="text-[11px] text-zinc-500 mt-1 font-mono">
                        TF-IDF Coordinate Map: x=0.8351, y=0.1982 • Length normalization ||V|| = 1.00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0 font-mono text-xs">
                    
                    {/* Active Scrubber simulated timers */}
                    <span className="text-zinc-400 font-bold bg-zinc-900 px-2 py-1 rounded">
                      {formatScrubberTime(trailerTimer)} / 1:23
                    </span>

                    {/* Controls pause */}
                    <button 
                      onClick={() => setIsTrailerPlaying(!isTrailerPlaying)}
                      className="px-3 py-1.5 rounded bg-[#FF1A26] hover:bg-[#FF2B35] font-bold text-white"
                    >
                      {isTrailerPlaying ? "Pause Stream" : "Resume Play"}
                    </button>

                    <button 
                      onClick={() => setActiveTrailerName(null)}
                      className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
                      title="Close player"
                    >
                      <X size={14} />
                    </button>

                  </div>

                </div>
              )}

              {/* POPULAR MOVIES SECTION */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-display tracking-wide uppercase flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#FF2732] rounded" />
                    Popular Movies
                  </h3>
                  <button 
                    onClick={() => { setActiveTab("discovery"); showNotification("Expanded catalog listing loaded"); }}
                    className="text-xs text-zinc-500 hover:text-white flex items-center space-x-1 font-mono hover:underline"
                  >
                    <span>See all</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Popular Layout: Flex split layout exactly like reference mockup image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column (Hero wide dynamic player) */}
                  <div className="lg:col-span-8 relative rounded-2xl overflow-hidden min-h-[300px] border border-zinc-900 bg-gradient-to-r from-[#170a0a] via-[#09090a] to-[#0A0D10] flex flex-col justify-between p-6 md:p-8 shadow-lg group">
                    
                    {/* Subtle art overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0 pointer-events-none" />
                    <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-tr from-[#FF2732]/10 via-transparent to-transparent blur-3xl group-hover:bg-[#FF2732]/20 transition-all duration-700 pointer-events-none" />

                    <div className="relative z-10 space-y-3.5 max-w-xl">
                      
                      <div className="flex items-center space-x-2">
                        <span className="bg-[#FF2732] text-white text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded uppercase font-display select-none">
                          FEATURED BASELINE
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                          ID: #{activeBaseMovie.id}
                        </span>
                      </div>

                      <h2 className="text-xl md:text-3xl font-black font-display tracking-tight text-white leading-tight">
                        {activeBaseMovie.title} <span className="text-zinc-500 font-light text-lg">({activeBaseMovie.year})</span>
                      </h2>

                      <p className="text-xs text-zinc-400 font-serif italic font-light leading-relaxed">
                        "{activeBaseMovie?.tagline || "An incredible algorithmic content alignment marvel."}"
                      </p>

                      <p className="text-xs text-zinc-350 leading-relaxed font-sans line-clamp-3">
                        {activeBaseMovie.overview}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {activeBaseMovie.genres.map(g => (
                          <span key={g} className="bg-[#FF1A26]/10 text-[#FF2732] border border-[#FF1A26]/20 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                            {g}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* CONTROL SCUBBER BAR - MATCHES DESIGN FILE PERFECTLY */}
                    <div className="relative z-10 mt-8 pt-6 border-t border-zinc-900/60 space-y-3.5 select-none" onClick={(e) => e.stopPropagation()}>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/40 backdrop-blur-md p-3.5 rounded-lg border border-zinc-900/60">
                        
                        {/* Play control badge and duration */}
                        <div className="flex items-center space-x-3 text-xs">
                          <button 
                            onClick={() => triggerSimulationPlay(activeBaseMovie.title)}
                            className="w-8 h-8 rounded-full bg-[#FF2732] hover:bg-[#FF404B] text-white flex items-center justify-center hover:scale-105 transition-transform"
                          >
                            <Play size={14} className="fill-current text-white translate-x-0.5" />
                          </button>
                          
                          <span className="text-[10px] text-zinc-550 font-mono tracking-wider">15s</span>
                          <span className="text-[10px] text-zinc-550 font-mono tracking-wider">10s</span>
                          
                          {/* Progress time stamp */}
                          <span className="font-mono text-zinc-300 font-bold bg-zinc-900/60 px-2.5 py-1 rounded">
                            {activeTrailerName === activeBaseMovie.title ? formatScrubberTime(trailerTimer) : "0:00"}
                          </span>
                        </div>

                        {/* Interactive seek bar */}
                        <div className="flex-1 mx-4">
                          <div className="relative h-1 bg-zinc-800 rounded-full cursor-pointer hover:h-1.5 transition-all">
                            <div 
                              className="absolute h-full bg-[#FF2732] rounded-full"
                              style={{ width: activeTrailerName === activeBaseMovie.title ? `${(trailerTimer / 83) * 100}%` : '0%' }}
                            />
                            <div 
                              className="absolute w-2.5 h-2.5 bg-white border border-[#FF2732] rounded-full -top-1 cursor-pointer"
                              style={{ left: activeTrailerName === activeBaseMovie.title ? `calc(${(trailerTimer / 83) * 100}% - 5px)` : '0px' }}
                            />
                          </div>
                        </div>

                        {/* Limit and Volume options */}
                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] text-zinc-400 font-mono tracking-wider">1:23</span>
                          
                          {/* Volume slider control */}
                          <button 
                            onClick={() => setSimulatedVolume(simulatedVolume === 0 ? 85 : 0)}
                            className="text-zinc-400 hover:text-white"
                          >
                            {simulatedVolume === 0 ? <VolumeX size={14} /> : simulatedVolume < 50 ? <Volume1 size={14} /> : <Volume2 size={14} />}
                          </button>
                          
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            value={simulatedVolume}
                            onChange={(e) => setSimulatedVolume(Number(e.target.value))}
                            className="w-14 accent-[#FF2732] h-1 bg-zinc-800 rounded cursor-pointer hidden sm:block"
                          />

                          <button 
                            onClick={() => triggerSimulationPlay(activeBaseMovie.title)}
                            className="text-zinc-400 hover:text-white"
                            title="Expand simulation viewer"
                          >
                            <Maximize2 size={14} />
                          </button>
                        </div>

                      </div>

                      {/* Watch now controls matching mockup button styling */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => triggerSimulationPlay(activeBaseMovie.title)}
                            className="bg-white hover:bg-zinc-200 text-black font-extrabold text-xs py-2 px-5 rounded-lg flex items-center space-x-2 transition-all cursor-pointer"
                          >
                            <Play size={13} className="fill-current text-black" />
                            <span>Watch now</span>
                          </button>

                          <button 
                            onClick={(e) => toggleBookmark(activeBaseMovie.id, e)}
                            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-850 p-2 rounded-lg transition-colors cursor-pointer"
                            title="Bookmark baseline"
                          >
                            <Plus size={14} className={bookmarkedIds.includes(activeBaseMovie.id) ? "text-[#FF2732] animate-pulse" : ""} />
                          </button>
                        </div>

                        <button
                          onClick={() => setShowMathInspector(!showMathInspector)}
                          className="text-[10.5px] font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-900 hover:text-[#FF2732] hover:border-[#FF2732]/30 transition-all"
                        >
                          {showMathInspector ? "✕ Hide Matrix Math" : "⚡ Inspect Vector TF-IDF Matrix"}
                        </button>
                      </div>

                    </div>

                  </div>

                  {/* Right Column inside Popular (Guardians representation card) */}
                  <div className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[300px] border border-zinc-900 bg-gradient-to-tr from-[#0b1b1c] via-[#091011] to-[#0D0D11] p-6 flex flex-col justify-between shadow-lg group">
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Up next recommendations
                        </span>
                        <span className="text-amber-500 font-mono text-xs font-bold flex items-center gap-1">
                          ⭐ 4.55
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white tracking-tight leading-snug font-display mt-2 group-hover:text-[#FF2D35] transition-colors">
                        Guardians of the Galaxy 3
                      </h4>
                      <p className="text-[9.5px] font-mono text-zinc-500 uppercase">Year 2023 • Space-Adventure</p>

                      <p className="text-[11.5px] text-zinc-400 leading-relaxed font-sans mt-3 line-clamp-4">
                        Marvel's beloved band of misfits settle into life on Knowhere. But it isn't long before cosmic chaos disrupts their peaceful existence as Rocket's turbulent past resurfaces.
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {["Sci-Fi", "Comedy", "Cosmic"].map(g => (
                          <span key={g} className="bg-zinc-950 text-zinc-400 text-[9px] px-2 py-0.5 rounded border border-zinc-900 font-mono">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                      <button 
                        onClick={() => triggerSimulationPlay("Guardians of the Galaxy 3")}
                        className="bg-zinc-900 hover:bg-[#FF2732] bg-zinc-900/90 text-zinc-300 hover:text-white text-xs font-extrabold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all"
                      >
                        <Play size={11} className="fill-current" />
                        <span>Watch now</span>
                      </button>

                      <button 
                        onClick={() => {
                          const gotg = movies.find(m => m.title.toLowerCase().includes("story") || m.id === 1);
                          if (gotg) {
                            setSelectedMovieId(gotg.id);
                            calculateRecommendations(gotg.id, recommendationLimit);
                            showNotification("Computed GOTG3-space vector similarity metrics!");
                          } else {
                            showNotification("GotG 3 is simulated. Baseline set to premium content nodes.");
                          }
                        }}
                        className="w-8 h-8 rounded-full border border-zinc-900 bg-zinc-950 hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-[#FF2732] hover:border-[#FF2732]/20 transition-all font-bold"
                        title="Simulate adding to evaluation suite"
                      >
                        +
                      </button>
                    </div>

                  </div>

                </div>

              </section>

              {/* ADVANCED CALIBRATION DRAWER FOR PROGRESSIVE DISCLOSURE (UX SIMPLIFICATION) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-[#0B0B0C] border border-zinc-900 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF2732]/10 flex items-center justify-center text-[#FF2732]">
                      <Sliders size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Algorithmic Match Tuning</h4>
                      <p className="text-[10px] text-zinc-400 font-sans">Calibrate similarity vectors, references, and matrix dot-products</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowTuning(!showTuning)}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors bg-zinc-950 flex items-center space-x-1.5"
                  >
                    <span>{showTuning ? "Collapse Engine ✕" : "Tune Parameters ⚙️"}</span>
                  </button>
                </div>

                {showTuning && (
                  <div className="p-5 rounded-2xl bg-[#0B0B0C]/60 border border-zinc-900/80 shadow-lg space-y-4 animate-fade-in">
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#FF2732] uppercase tracking-wider font-mono">
                          Vector Calibration Panel
                        </h4>
                        <p className="text-[10px] text-zinc-400">Modify cosine weight limits and matrix properties</p>
                      </div>

                      {/* Limit sliding meter */}
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase">Output Limit:</span>
                        <input 
                          type="range" 
                          min="3" 
                          max="12" 
                          value={recommendationLimit}
                          onChange={(e) => {
                            const limit = Number(e.target.value);
                            setRecommendationLimit(limit);
                            calculateRecommendations(selectedMovieId, limit);
                          }}
                          className="w-24 accent-[#FF2732] h-1 bg-zinc-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-xs font-mono font-bold text-[#FF2732] bg-[#FF2732]/10 px-2 rounded border border-[#FF2732]/20">
                          {recommendationLimit}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Dynamic Catalog Select List */}
                      <div className="flex-1 space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Baseline Reference Node Selected:</label>
                        <select
                          value={selectedMovieId}
                          onChange={(e) => {
                            const id = Number(e.target.value);
                            setSelectedMovieId(id);
                            calculateRecommendations(id, recommendationLimit);
                            showNotification(`Recalculated similarity alignments matching model ID #${id}`);
                          }}
                          className="w-full bg-[#111112] border border-zinc-900 rounded-lg py-2 px-3 text-xs text-zinc-200 focus:outline-none focus:border-[#FF2732] font-medium text-ellipsis overflow-hidden"
                        >
                          {movies.length > 0 ? (
                            movies.map(m => (
                              <option key={m.id} value={m.id} className="bg-zinc-950 font-sans">
                                {m.title} ({m.year}) — Ratings: {m.rating} ★ ({m.genres[0]})
                              </option>
                            ))
                          ) : (
                            <option disabled>No items matched search inputs in repository</option>
                          )}
                        </select>
                      </div>

                      {/* Toggle Math Inspector Inline button */}
                      <div className="shrink-0 pt-4 md:pt-0">
                        <button
                          onClick={() => setShowMathInspector(!showMathInspector)}
                          className="w-full md:w-auto text-[10px] font-mono uppercase bg-zinc-900/80 px-4 py-2 rounded-lg border border-zinc-800 hover:text-[#FF2732] hover:border-[#FF2732]/30 transition-all font-bold"
                        >
                          {showMathInspector ? "✕ Hide Matrix Proofs" : "⚡ Inspect Vector Matrix"}
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* MATH INSPECT ACCORDION MODULE */}
              {showMathInspector && (
                <div className="p-6 rounded-2xl bg-[#0A0A0B] border border-[#FF2732]/25 shadow-lg space-y-4 animate-fade-in">
                  <div className="flex items-center space-x-2 border-b border-zinc-900 pb-3">
                    <Award size={16} className="text-amber-400 stroke-[2.5]" />
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                      TF-IDF Vector Space Alignment Proof Dashboard
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Content mapping utilizes TF-IDF vectors that weigh rare terms heavily while discounting ubiquitous descriptors like "film" or "story". Cosine similarity represents the spatial dot product between normalized model documents:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
                    <div className="bg-[#111112] border border-zinc-900 p-3.5 rounded-xl">
                      <span className="text-[9px] text-[#FF2732] block tracking-wider uppercase">Term: space</span>
                      <span className="text-white block text-sm font-bold mt-1.5">IDF score: 2.14</span>
                      <p className="text-[9px] text-zinc-550 mt-1 italic">High distinct marker</p>
                    </div>
                    <div className="bg-[#111112] border border-zinc-900 p-3.5 rounded-xl">
                      <span className="text-[9px] text-[#FF2732] block tracking-wider uppercase">Term: magic</span>
                      <span className="text-white block text-sm font-bold mt-1.5">IDF score: 2.30</span>
                      <p className="text-[9px] text-zinc-550 mt-1 italic">Adventure vector</p>
                    </div>
                    <div className="bg-[#111112] border border-zinc-900 p-3.5 rounded-xl">
                      <span className="text-[9px] text-[#FF2732] block tracking-wider uppercase">Term: mafia</span>
                      <span className="text-white block text-sm font-bold mt-1.5">IDF score: 2.53</span>
                      <p className="text-[9px] text-amber-500 mt-1 font-bold">Crime saga</p>
                    </div>
                    <div className="bg-[#111112] border border-zinc-900 p-3.5 rounded-xl">
                      <span className="text-[9px] text-[#FF2732] block tracking-wider uppercase">Term: family</span>
                      <span className="text-white block text-sm font-bold mt-1.5">IDF score: 1.45</span>
                      <p className="text-[9px] text-zinc-550 mt-1 italic">Discounted term</p>
                    </div>
                  </div>

                  <div className="pt-3 text-xs text-zinc-400 font-mono leading-relaxed bg-black/40 p-4 rounded-xl border border-zinc-900/40">
                    <span className="text-[#FF2732] font-bold block mb-1">Normalized Spatial Formula:</span>
                    <code>Cosine(A, B) = (A · B) / (||A|| * ||B||)</code>. Since vectors are pre-scaled to unit lengths (<code>||A|| = ||B|| = 1.0</code>), similarity simplifies to a pure matrix dot product, allowing rapid, sub-millisecond computation!
                  </div>
                </div>
              )}

              {/* SECTION: MATHEMATIC ALIGNMENT SEARCH RESULTS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#FF2732] rounded" />
                    Recommended for You (Engine calculation results)
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider">SORTED BY SPATIAL TF-IDF DOT COEFFICIENTS</span>
                </div>

                {isComputing ? (
                  <div className="text-center py-20 bg-[#0B0B0C] rounded-2xl border border-zinc-900/60 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF2732] mb-3" />
                    <p className="text-xs text-zinc-400 font-mono">Searching multi-dimensional vector matrices...</p>
                  </div>
                ) : recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((rec, index) => {
                      const isLiked = bookmarkedIds.includes(rec.movie.id);
                      return (
                        <div 
                          key={rec.movie.id} 
                          className="bg-[#0B0B0C]/90 border border-zinc-900 hover:border-[#FF2732]/40 rounded-2xl overflow-hidden shadow-md duration-300 transition-all hover:scale-[1.02] flex flex-col justify-between p-5 relative group"
                        >
                          {/* High fidelity green matchmaking score indicator */}
                          <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] font-mono font-black px-2 py-1 rounded">
                            {Math.round(rec.score * 100)}% Match
                          </div>

                          <div className="space-y-3 pt-2">
                            <div>
                              <span className="text-[9px] font-mono uppercase text-[#FF2732] font-bold tracking-wider">Recommended Rank #{index + 1}</span>
                              <h4 className="text-md font-bold text-white mt-1 group-hover:text-[#FF2732] transition-colors">
                                {rec.movie.title} <span className="text-zinc-550 font-normal">({rec.movie.year})</span>
                              </h4>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {rec.movie.genres.map(g => (
                                <span key={g} className="bg-black/40 text-[9.5px] px-2.5 py-0.5 rounded text-zinc-400 border border-zinc-900 font-mono">
                                  {g}
                                </span>
                              ))}
                            </div>

                            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 font-sans">
                              {rec.movie.overview}
                            </p>
                          </div>

                          {/* Matched tags coefficients (Shown only in Tuning Mode to simplify main UX) */}
                          {showTuning && (
                            <div className="mt-4 pt-3.5 border-t border-zinc-900/60 space-y-1.5">
                              <span className="text-[9px] font-mono text-[#FF2732] uppercase block font-bold tracking-wider">Overlapping terms:</span>
                              <div className="flex flex-wrap gap-1">
                                {rec.matchedTerms.length > 0 ? (
                                  rec.matchedTerms.slice(0, 3).map((word) => (
                                    <span key={word} className="bg-[#FF2732]/10 text-[#FF2732] border border-[#FF2732]/15 px-1.5 py-0.5 rounded text-[9px] font-mono">
                                      #{word}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[9px] text-zinc-650 italic">Generic terms aligned</span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Beautiful action triggers */}
                          <div className="mt-4 pt-3.5 border-t border-zinc-900/60 flex items-center space-x-2">
                            <button
                              onClick={() => triggerSimulationPlay(rec.movie.title)}
                              className="flex-grow bg-[#151517] hover:bg-[#FF2732] text-zinc-300 hover:text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                            >
                              Play Preview
                            </button>

                            <button
                              onClick={() => {
                                setSelectedMovieId(rec.movie.id);
                                calculateRecommendations(rec.movie.id, recommendationLimit);
                                showNotification(`Selected: "${rec.movie.title}" as baseline coordinate model.`);
                              }}
                              className="bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 text-zinc-400 p-2.5 rounded-lg"
                              title="Recalibrate matching matrix around this movie"
                            >
                              <ChevronRight size={13} />
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-[#0B0B0C] border border-zinc-900/60 text-zinc-450 rounded-2xl">
                    <p className="text-xs font-mono">No matching calculated alignments found using specified filter limits.</p>
                  </div>
                )}
              </div>

              {/* SECTION: NEW TRAILERS - MATCHES THE MOCK GRAPHICS EXACTLY */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#FF2732] rounded" />
                    New Trailers
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono tracking-widest uppercase">UPCOMING TEASERS</span>
                </div>

                {/* Horizontal tiles shown exactly in mockup image (John Wick, Deadpool, Avatar) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* John Wick 4 Card */}
                  <div 
                    onClick={() => triggerSimulationPlay("John Wick 4")}
                    className="relative h-44 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-tr from-[#1b0a1d] via-[#090b14] to-[#0D0D11] p-5 flex flex-col justify-between border border-zinc-900 hover:border-[#FF2732]/35 shadow duration-300 transition-all hover:scale-[1.02] group"
                  >
                    <span className="absolute top-3 right-3 text-[10px] font-mono text-zinc-550 font-black">2023</span>
                    
                    {/* Centered play badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-11 h-11 rounded-full bg-black/60 border border-[#FF2732] flex items-center justify-center text-[#FF2732] transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#FF2732]/10">
                        <Play size={16} className="fill-current translate-x-0.5" />
                      </div>
                    </div>

                    <div className="z-10 mt-auto">
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-[#FF2732] transition-colors">
                        John Wick 4
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Neo-Noir Gun-Fu Action</p>
                    </div>
                  </div>

                  {/* Deadpool 3 Card */}
                  <div 
                    onClick={() => triggerSimulationPlay("Deadpool 3")}
                    className="relative h-44 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-tr from-[#240a0c] via-[#09090c] to-[#0D0D11] p-5 flex flex-col justify-between border border-zinc-900 hover:border-[#FF2732]/35 shadow duration-300 transition-all hover:scale-[1.02] group"
                  >
                    <span className="absolute top-3 right-3 text-[10px] font-mono text-zinc-550 font-black">2023</span>

                    {/* Centered play badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-11 h-11 rounded-full bg-black/60 border border-[#FF2732] flex items-center justify-center text-[#FF2732] transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#FF2732]/10">
                        <Play size={16} className="fill-current translate-x-0.5" />
                      </div>
                    </div>

                    <div className="z-10 mt-auto">
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-[#FF2732] transition-colors">
                        Deadpool 3
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Red Costume Comedic Action</p>
                    </div>
                  </div>

                  {/* Avatar 3 Card */}
                  <div 
                    onClick={() => triggerSimulationPlay("Avatar 3")}
                    className="relative h-44 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-tr from-[#0a1e2b] via-[#090b10] to-[#0D0D11] p-5 flex flex-col justify-between border border-zinc-900 hover:border-[#FF2732]/35 shadow duration-300 transition-all hover:scale-[1.02] group"
                  >
                    <span className="absolute top-3 right-3 text-[10px] font-mono text-zinc-550 font-black">2023</span>

                    {/* Centered play badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-11 h-11 rounded-full bg-black/60 border border-[#FF2732] flex items-center justify-center text-[#FF2732] transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#FF2732]/10">
                        <Play size={16} className="fill-current translate-x-0.5" />
                      </div>
                    </div>

                    <div className="z-10 mt-auto">
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-[#FF2732] transition-colors">
                        Avatar 3
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Pandora Oceanic Sci-Fi</p>
                    </div>
                  </div>

                </div>
              </section>

              {/* SECTION: TOP RATED - CHOSEN CRITERIA DATASETS FROM MOCKUP IMAGE */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#FF2732] rounded" />
                    Top rated
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono tracking-widest uppercase">CRITIC BENCHMARKS</span>
                </div>

                {/* Dark Knight, Lord of Rings, Star Wars list styling matches mock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* Dark Knight card */}
                  <div className="bg-[#0B0B0C] rounded-2xl border border-zinc-900 p-5 flex flex-col justify-between h-48 relative group hover:border-[#FF2732]/35 duration-300 transition-all hover:scale-[1.01]">
                    <div className="flex justify-between items-start">
                      <span className="bg-[#FF2732]/10 text-[#FF2732] border border-[#FF2732]/25 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        ★ 9.0/10
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">2008</span>
                    </div>

                    <div className="my-auto pt-3">
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-[#FF2732] transition-colors">
                        Dark Knight
                      </h4>
                      <p className="text-[10.5px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-sans">
                        Batman raises the stakes in his war on crime. With the help of Gordon and Dent, they set out to dismantle Gothams criminal syndicates.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-900/60 flex items-center justify-between">
                      <button 
                        onClick={() => triggerSimulationPlay("Dark Knight")}
                        className="text-[10px] font-mono font-bold uppercase text-zinc-400 hover:text-white"
                      >
                        Watch now
                      </button>
                      <button 
                        onClick={() => {
                          const dk = movies.find(m => m.title.toLowerCase().includes("heat") || m.id === 4);
                          if (dk) {
                            setSelectedMovieId(dk.id);
                            calculateRecommendations(dk.id, recommendationLimit);
                            showNotification("Computed matching references aligned around Dark Knight baseline!");
                          } else {
                            showNotification("The Dark Knight is simulated. Recalibrated catalog matrices around crime dramas.");
                          }
                        }}
                        className="w-7 h-7 bg-zinc-950 rounded-full flex items-center justify-center text-zinc-400 border border-zinc-900 hover:text-[#FF2732]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Lord of the rings Card */}
                  <div className="bg-[#0B0B0C] rounded-2xl border border-zinc-900 p-5 flex flex-col justify-between h-48 relative group hover:border-[#FF2732]/35 duration-300 transition-all hover:scale-[1.01]">
                    <div className="flex justify-between items-start">
                      <span className="bg-[#FF2732]/10 text-[#FF2732] border border-[#FF2732]/25 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        ★ 8.8/10
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">2001</span>
                    </div>

                    <div className="my-auto pt-3">
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-[#FF2732] transition-colors">
                        Lord of the rings
                      </h4>
                      <p className="text-[10.5px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-sans">
                        An ancient Ring thought lost for centuries is found, and given to Frodo, a small Hobbit, tasked to destroy it in Mount Doom.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-900/60 flex items-center justify-between">
                      <button 
                        onClick={() => triggerSimulationPlay("Lord of the Rings")}
                        className="text-[10px] font-mono font-bold uppercase text-zinc-400 hover:text-white"
                      >
                        Watch now
                      </button>
                      <button 
                        onClick={() => {
                          const lotr = movies.find(m => m.genres.includes("Fantasy") || m.id === 2);
                          if (lotr) {
                            setSelectedMovieId(lotr.id);
                            calculateRecommendations(lotr.id, recommendationLimit);
                            showNotification("Computed matching fantasy vectors!");
                          } else {
                            showNotification("Lord of the Rings set as reference query model.");
                          }
                        }}
                        className="w-7 h-7 bg-zinc-950 rounded-full flex items-center justify-center text-zinc-400 border border-zinc-900 hover:text-[#FF2732]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Star Wars Card */}
                  <div className="bg-[#0B0B0C] rounded-2xl border border-zinc-900 p-5 flex flex-col justify-between h-48 relative group hover:border-[#FF2732]/35 duration-300 transition-all hover:scale-[1.01]">
                    <div className="flex justify-between items-start">
                      <span className="bg-[#FF2732]/10 text-[#FF2732] border border-[#FF2732]/25 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        ★ 8.7/10
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">2017</span>
                    </div>

                    <div className="my-auto pt-3">
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-[#FF2732] transition-colors">
                        Star Wars
                      </h4>
                      <p className="text-[10.5px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-sans">
                        Rey develops her newly discovered abilities with the assistance of Luke Skywalker, who is unsettled by the strength of her powers.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-900/60 flex items-center justify-between">
                      <button 
                        onClick={() => triggerSimulationPlay("Star Wars")}
                        className="text-[10px] font-mono font-bold uppercase text-zinc-400 hover:text-white"
                      >
                        Watch now
                      </button>
                      <button 
                        onClick={() => {
                          const sw = movies.find(m => m.genres.includes("Action") || m.id === 3);
                          if (sw) {
                            setSelectedMovieId(sw.id);
                            calculateRecommendations(sw.id, recommendationLimit);
                            showNotification("Precomputed galactic coordinate matrices calibrated.");
                          }
                        }}
                        className="w-7 h-7 bg-zinc-950 rounded-full flex items-center justify-center text-zinc-400 border border-zinc-900 hover:text-[#FF2732]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              </section>

              {/* SECTION: CONTINUE WATCHING */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#FF2732] rounded" />
                    Continue watching
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">YOUR RESUME TIMELINES</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {movies.slice(0, 4).map((m) => {
                    const progress = m.id === 1 ? 75 : m.id === 2 ? 40 : m.id === 3 ? 90 : 15;
                    return (
                      <div 
                        key={m.id}
                        className="p-4 rounded-xl bg-[#0B0B0C] border border-zinc-900 space-y-3 cursor-pointer hover:border-zinc-700/80 transition-all select-none"
                        onClick={() => {
                          setSelectedMovieId(m.id);
                          calculateRecommendations(m.id, recommendationLimit);
                          triggerSimulationPlay(m.title);
                        }}
                      >
                        <h5 className="text-xs font-bold text-zinc-250 truncate block leading-none">{m.title}</h5>
                        <p className="text-[9.5px] font-mono text-zinc-500">{m.genres[0]} • {m.year}</p>
                        
                        <div className="space-y-1 pt-1">
                          <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                            <div className="bg-[#FF2732] h-full" style={{ width: `${progress}%` }} />
                          </div>
                          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-550">
                            <span>{progress}% seen</span>
                            <span>Resume</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

                </>
              )}
            </div>
          )}

          {/* TAB 2: DISCOVERY CATALOG */}
          {activeTab === "discovery" && (
            <div className="space-y-6 animate-fade-in" id="discovery-panel">
              <div className="border-b border-zinc-900 pb-3">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                  Interactive Movie Repository Discovery
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Explore full vector nodes dataset loaded offline inside our relational structures. Search titles, filters, or tags directly.
                </p>
              </div>

              {/* Grid Catalog layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCatalog.length > 0 ? (
                  filteredCatalog.map((m) => (
                    <PremiumMovieCard 
                      key={m.id}
                      id={m.id}
                      title={m.title}
                      genres={m.genres}
                      year={m.year}
                      rating={m.rating}
                      onSelect={() => {
                        setSelectedMovieId(m.id);
                        calculateRecommendations(m.id, recommendationLimit);
                        setActiveTab("recommend");
                        showNotification(`Selected "${m.title}" as baseline.`);
                      }}
                      onPlay={(title) => triggerSimulationPlay(title)}
                      isBookmarked={bookmarkedIds.includes(m.id)}
                      onToggleBookmark={(e) => toggleBookmark(m.id, e)}
                    />
                  ))
                ) : (
                  <div className="col-span-1 sm:col-span-4 text-center py-20 bg-[#0B0B0C] p-8 rounded-2xl border border-zinc-900/60 text-zinc-400 font-mono text-xs space-y-4">
                    <span className="block text-zinc-500 font-mono">No matching movies found under current filters ({activeMediaService && `${activeMediaService}, `}{activeCategoryFilter}).</span>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveMediaService("");
                        setActiveCategoryFilter("Movies");
                        showNotification("Reset all search parameters, media channels, and category tags!");
                      }}
                      className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-[#FF2732] rounded-lg transition-colors cursor-pointer text-[10px] font-mono uppercase tracking-widest font-bold"
                    >
                      Clear Filters & Channels
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY ADVISOR LARGE WORKSPACE CHAT */}
          {activeTab === "community" && (
            <div className="bg-[#0B0B0C] border border-zinc-900 rounded-2xl p-6 flex flex-col h-[520px] justify-between animate-fade-in" id="community-workspace">
              
              <div className="space-y-4 overflow-hidden flex flex-col flex-1 pb-4">
                
                <div className="flex items-center space-x-3 border-b border-zinc-900 pb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#E50914]/15 text-[#E50914] flex items-center justify-center">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                      AI Algorithmic Community Forum
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                      Interactive Machine Learning Pipeline Consulting Advisor
                    </p>
                  </div>
                </div>

                {/* Expanded Chat Log */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
                  {assistantLogs.map((log, index) => (
                    <div key={index} className={`space-y-1 block ${log.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block pl-1.5">
                        {log.role === 'user' ? 'Research Scientist (You)' : 'AI Pipeline Specialist'}
                      </span>
                      <div className={`p-4 rounded-xl leading-relaxed font-sans border text-left inline-block max-w-[80%] shadow ${log.role === 'user' ? 'bg-[#FF2732]/10 border-[#FF2732]/20 text-white' : 'bg-[#111112] border-zinc-900 text-zinc-300'}`}>
                        <p className="whitespace-pre-wrap select-text">{log.text}</p>
                      </div>
                    </div>
                  ))}

                  {isAssistantLoading && (
                    <div className="flex items-center space-x-2 text-zinc-400 animate-pulse font-mono text-[10px] pb-2 pl-2">
                      <div className="w-2 h-2 bg-[#E50914] rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-[#E50914] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-[#E50914] rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span>Advising pipeline alignment parameters...</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Chat Input row */}
              <div className="space-y-3.5 border-t border-zinc-900 pt-4">
                
                {/* FAQ Quick suggestions */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center shrink-0">FAQ Topics:</span>
                  {[
                    "Why normalize TF-IDF vectors using Euclidean L2?",
                    "Collaborative item-item vs Content filtering trade-offs",
                    "Explain Offline Metrics Precision@K and NDCG"
                  ].map(topic => (
                    <button
                      key={topic}
                      onClick={() => setAssistantPrompt(topic)}
                      className="text-[9.5px] font-mono text-zinc-400 hover:text-white bg-[#111112] border border-zinc-900 px-2.5 py-1 rounded"
                    >
                      {topic.length > 30 ? topic.slice(0, 30) + "..." : topic}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center space-x-2.5">
                  <input
                    type="text"
                    placeholder="Inquire about Content TF-IDF math models, scoring pipelines, or matrix coefficients..."
                    value={assistantPrompt}
                    onChange={(e) => setAssistantPrompt(e.target.value)}
                    className="flex-1 bg-black border border-zinc-900 focus:border-[#FF2732] rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-550 focus:outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#FF2732] hover:bg-[#FF3B45] text-white rounded-xl transition duration-300"
                  >
                    <Send size={15} />
                  </button>
                </form>

              </div>

            </div>
          )}

          {/* TAB 4: COMING SOON ADVANCED VISUAL LANDING */}
          {activeTab === "coming_soon" && (
            <div className="p-8 rounded-2xl bg-[#0B0B0C] border border-zinc-900 text-center space-y-5 animate-fade-in flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF2732] to-[#FF555E] flex items-center justify-center text-white text-xl shadow-lg">
                <Calendar size={26} />
              </div>

              <div className="max-w-md space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                  Dynamic Algorithmic Projections (Upcoming Releases)
                </h3>
                <p className="text-xs text-zinc-400">
                  Pre-compiled neural matrix prediction modules are coming in the next release cycle. This allows matching with live streams in real time.
                </p>
              </div>

              <div className="bg-[#111112] rounded-xl p-4 border border-zinc-900 w-full max-w-lg text-left text-xs font-mono space-y-2.5">
                <span className="text-emerald-400 block font-bold">● CLOUD PIPELINE STATUS: COMPILED</span>
                <p className="text-zinc-550">Node Server version: CJS-bundle, esbuild output</p>
                <p className="text-zinc-550">Target Framework: React v19.0.1, TSX runtime type stripped</p>
              </div>

              <button 
                onClick={() => { setActiveTab("recommend"); showNotification("Returned to Home Studio."); }}
                className="bg-[#FF2732] hover:bg-[#FF404B] text-white font-mono text-xs font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
              >
                Return to Rec Studio
              </button>
            </div>
          )}

          {/* TAB 5: RECENT VIEWED ITEMS */}
          {activeTab === "recent" && (
            <div className="space-y-6 animate-fade-in" id="recent-panel">
              <div className="border-b border-zinc-900 pb-3">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                  Recently Streamed / Evaluated Items
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  History logs tracking candidate nodes that were play simulated during this workspace session.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentViewedIds.map(id => {
                  const item = movies.find(m => m.id === id);
                  if (!item) return null;
                  return (
                    <PremiumMovieCard 
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      genres={item.genres}
                      year={item.year}
                      rating={item.rating}
                      onSelect={() => {
                        setSelectedMovieId(item.id);
                        calculateRecommendations(item.id, recommendationLimit);
                        setActiveTab("recommend");
                        showNotification(`Selected ${item.title} as active focus.`);
                      }}
                      onPlay={(title) => triggerSimulationPlay(title)}
                      isBookmarked={bookmarkedIds.includes(item.id)}
                      onToggleBookmark={(e) => toggleBookmark(item.id, e)}
                    />
                  );
                })}
                {recentViewedIds.length === 0 && (
                  <div className="col-span-1 sm:col-span-4 text-center py-20 bg-[#0B0B0C] rounded-2xl border border-zinc-900/60 text-zinc-500 font-mono text-xs">
                    No streams have been play-simulated in this session. Return to Home and click "Play" on components.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: BOOKMARKED ITEMS */}
          {activeTab === "bookmarked" && (
            <div className="space-y-6 animate-fade-in" id="bookmarked-panel">
              <div className="border-b border-zinc-900 pb-3">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                  Bookmarked Movies (Personal Workspace Catalog)
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Save or pre-select candidate movies nodes here to catalog specific genres for analytical comparison.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bookmarkedIds.map(id => {
                  const item = movies.find(m => m.id === id);
                  if (!item) return null;
                  return (
                    <PremiumMovieCard 
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      genres={item.genres}
                      year={item.year}
                      rating={item.rating}
                      onSelect={() => {
                        setSelectedMovieId(item.id);
                        calculateRecommendations(item.id, recommendationLimit);
                        setActiveTab("recommend");
                        showNotification(`Active target selected: ${item.title}`);
                      }}
                      onPlay={(title) => triggerSimulationPlay(title)}
                      isBookmarked={true}
                      onToggleBookmark={(e) => toggleBookmark(item.id, e)}
                    />
                  );
                })}
                {bookmarkedIds.length === 0 && (
                  <div className="col-span-1 sm:col-span-4 text-center py-20 bg-[#0B0B0C] rounded-2xl border border-zinc-900/60 text-zinc-500 font-mono text-xs">
                    Your Bookmarked library is currently empty. Star titles using '+' or bookmark buttons!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: EXPLORATORY DATA ANALYSIS (EDA) */}
          {activeTab === "eda" && (
            <AnalyticsTab 
              stats={stats} 
              onSelectMovie={(id) => {
                setSelectedMovieId(id);
                calculateRecommendations(id, recommendationLimit);
                setActiveTab("recommend");
                showNotification("Baseline coordinates updated.");
              }} 
            />
          )}

          {/* TAB 8: DOWNLOADED PYTHON CODE WORKSPACE */}
          {activeTab === "code" && (
            <CodeExporterTab exportedFiles={exportedFiles} />
          )}

          {/* TAB 9: SETTINGS/CAREER COACH SUITE */}
          {activeTab === "interview" && (
            <InterviewSuiteTab />
          )}

        </div>

      </main>

      {/* COLUMN 3: RIGHT PANEL MEDIA SERVICES & PROFILE (EXACT MATCH FOR MOCK) */}
      <aside className="w-80 shrink-0 bg-[#0A0A0B] border-l border-zinc-900/60 p-6 flex flex-col space-y-8 hidden xl:flex" id="right-sidebar">
        
        {/* User profile widget exactly matching mockup placement & details */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-900 hover:bg-zinc-900 transition-colors cursor-pointer select-none group">
          <div className="flex items-center space-x-3">
            {/* User colored avatar badge */}
            <div className="w-10 h-10 rounded-full bg-[#FF2D35] text-white flex items-center justify-center font-bold font-display shadow-md text-sm border border-white/10 group-hover:scale-105 transition-transform duration-300">
              KJ
            </div>
            <div>
              <h4 className="text-xs font-bold text-white tracking-tight font-display">
                {userNickname}
              </h4>
              <p className="text-[10px] text-zinc-455 font-mono truncate max-w-[155px]">
                {userEmail}
              </p>
            </div>
          </div>
          <ChevronDown size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
        </div>

        {/* SECTION: MEDIA SERVICE */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider font-display">
            Media Service Listing
          </h3>
          
          <div className="space-y-2">
            {[
              { name: "Apple TV +", color: "bg-zinc-850 hover:bg-white text-zinc-300 hover:text-black", icon: "", brand: "apple" },
              { name: "HBO Max", color: "bg-indigo-950/40 hover:bg-indigo-900 text-indigo-300", icon: "HBO", brand: "hbo" },
              { name: "Peacock", color: "bg-cyan-950/40 hover:bg-cyan-900 text-cyan-300", icon: "🦚", brand: "peacock" },
              { name: "Disney +", color: "bg-sky-950/50 hover:bg-sky-900 text-sky-300", icon: "Pix", brand: "disney" },
              { name: "Hulu", color: "bg-emerald-950/40 hover:bg-emerald-900 text-emerald-300", icon: "Hulu", brand: "hulu" },
              { name: "Netflix", color: "bg-[#FF2732]/10 text-[#FF2732] ring-1 ring-[#FF2732]/40 hover:bg-[#FF2732]/20", icon: "N", brand: "netflix" },
              { name: "Prime", color: "bg-amber-950/40 hover:bg-amber-900 text-amber-300", icon: "a+", brand: "prime" }
            ].map((srv) => {
              const isActive = activeMediaService === srv.brand || activeMediaService === srv.name;
              return (
                <button
                  key={srv.name}
                  onClick={() => {
                    setActiveMediaService(srv.brand);
                    showNotification(`Active streaming partner simulated filter: ${srv.name}`);
                  }}
                  className={`w-full flex items-center justify-between text-xs font-semibold py-2 px-3.5 rounded-lg transition-all duration-200 cursor-pointer ${srv.color}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded flex items-center justify-center bg-black/40 font-black text-[10px] tracking-tighter shrink-0 select-none">
                      {srv.icon}
                    </span>
                    <span>{srv.name}</span>
                  </div>

                  {isActive && <Check size={12} className="text-[#FF2D35] animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION: GENRE SELECTION & ACTION MATCH ENGINE */}
        <div className="space-y-4 pt-2">
          
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-white uppercase tracking-wider font-display">
              Genre Map Filter
            </h3>
            <span className="text-[9.5px] font-mono text-zinc-550 uppercase">DATA KEYS</span>
          </div>

          <div className="flex flex-col space-y-1">
            {[
              "Action",
              "Comedy",
              "Drama",
              "Thriller",
              "Western",
              "Horror",
              "Romance"
            ].map((gen) => {
              const isActive = searchQuery.toLowerCase() === gen.toLowerCase();
              return (
                <button
                  key={gen}
                  onClick={() => filterGenreAndNavigate(gen)}
                  className={`w-full text-left py-2 px-3 text-xs font-medium rounded-lg transition-all text-left ${isActive ? 'text-[#FF2732] bg-[#FF2732]/5 font-bold border-l-2 border-[#FF2732]' : 'text-zinc-400 hover:text-white hover:bg-zinc-905/30'}`}
                >
                  {gen}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-900/60 p-4 rounded-xl bg-[#0F0F10]/50 border border-zinc-900/80 space-y-2.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold leading-none">AI PIPELINE ENGINE</span>
            <p className="text-[11.5px] text-zinc-400 leading-relaxed font-sans">
              Matches utilize full term metrics computed dynamically inside the server instances bound to Port 3000.
            </p>
          </div>

        </div>

      </aside>

      {showShortcutsHelp && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowShortcutsHelp(false)}>
          <div 
            className="bg-[#0D0D0E] border border-zinc-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded bg-[#FF2D35]/10 text-[#FF2D35] flex items-center justify-center font-bold">
                  ⌨️
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">Keyboard Shortcuts Guide</h3>
                  <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Power-user keyboard commands for ultra-fast navigation</p>
                </div>
              </div>
              <button 
                onClick={() => setShowShortcutsHelp(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                title="Dismiss (Esc)"
              >
                <X size={16} />
              </button>
            </div>

            {/* List of shortcuts */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              
              <div className="space-y-2">
                <h4 className="text-[10.5px] font-bold uppercase tracking-widest text-[#FF2D35] font-mono">General Actions</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs py-1 hover:bg-zinc-900/30 px-2 rounded transition-colors">
                    <span className="text-zinc-300">Focus Recommendation Search</span>
                    <kbd className="bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Ctrl + K</kbd>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 hover:bg-zinc-900/30 px-2 rounded transition-colors">
                    <span className="text-zinc-300">Close Overlay Modals / Esc-Out</span>
                    <kbd className="bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Esc</kbd>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 hover:bg-zinc-900/30 px-2 rounded transition-colors">
                    <span className="text-zinc-300">Toggle Keyboard Guide Sheet</span>
                    <kbd className="bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Ctrl + Alt + S</kbd>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-900">
                <h4 className="text-[10.5px] font-bold uppercase tracking-widest text-[#FF2D35] font-mono">Quick App Navigation</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { label: "Home / Recommend", key: "Alt + 1" },
                    { label: "Discovery Browse", key: "Alt + 2" },
                    { label: "Community Forum", key: "Alt + 3" },
                    { label: "Coming Soon Feed", key: "Alt + 4" },
                    { label: "Recent View History", key: "Alt + 5" },
                    { label: "Bookmarked Suite", key: "Alt + 6" },
                    { label: "Top Rated EDA", key: "Alt + 7" },
                    { label: "Downloaded Code", key: "Alt + 8" },
                    { label: "System Settings", key: "Alt + 9" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 hover:bg-zinc-900/30 px-2 rounded transition-colors">
                      <span className="text-zinc-350">{item.label}</span>
                      <kbd className="bg-zinc-900 border border-zinc-800 text-zinc-350 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">{item.key}</kbd>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer tips */}
            <div className="border-t border-zinc-900 pt-3.5 flex items-center justify-between text-[10.5px] text-zinc-500 font-mono">
              <span>Press <kbd className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[9px] px-1 py-0.2" style={{ borderRadius: '2px' }}>Esc</kbd> anytime to exit guide</span>
              <span className="text-[#FF2732] font-semibold text-right">Interactive</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
