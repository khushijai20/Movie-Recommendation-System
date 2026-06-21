import React, { useState } from "react";
import { Copy, Check, BadgeHelp, Award, BookOpen, Sparkles } from "lucide-react";

export default function InterviewSuiteTab() {
  const [copiedResume, setCopiedResume] = useState<string | null>(null);

  const roles = [
    {
      title: "Senior Data Scientist & ML Engineer Accomplishments",
      bullets: [
        "Architected an end-to-end Content-Based Movie Recommendation Engine using Python, Scikit-Learn, and Streamlit, achieving automated personalized predictions based on complex metadata.",
        "Engineered visual textual pipelines using TF-IDF (Term Frequency - Inverse Document Frequency) and L2 Euclidean Vector Normalization across a database of 10,000+ tags, optimizing recommendation matches with Cosine Pairwise Similarity scoring.",
        "Engineered real-time Exploratory Data Analysis (EDA) dashboard modules generating descriptive histograms for ranking densities and ratings distributions with Pandas, Seaborn, and Matplotlib.",
        "Serialized complex numerical model matrices using hierarchical Pickle (.pkl) streams, achieving 15ms sub-second response times for instant user similarity calculation inside active web frames."
      ]
    },
    {
      title: "Data Analyst & Business Intelligence Accomplishments",
      bullets: [
        "Developed interactive Web Dashboard tracking MovieLens rating patterns, genre densities, and movie release clusters with Streamlit and Pandas.",
        "Cleaned and streamlined un-structured multi-tag movie genre indices; removed duplicated logs and handled missing fields to preserve transactional statistical validity.",
        "Executed multivariate analysis for genre representation using multi-segmented grouping and aggregating metrics to uncover key audience taste preferences."
      ]
    }
  ];

  const handleCopyResume = (roleIndex: number, textArr: string[]) => {
    const text = textArr.join("\n• ");
    navigator.clipboard.writeText("• " + text);
    setCopiedResume(`role-${roleIndex}`);
    setTimeout(() => setCopiedResume(null), 2000);
  };

  const interviewQuestions = [
    {
      q: "Explain how TF-IDF works and why it is chosen for content representations.",
      a: "TF-IDF stands for Term Frequency-Inverse Document Frequency. It determines how relevant a word is to a document relative to a corpus of documents. Term Frequency (TF) counts the frequency of a word in a movie's description/genres. Inverse Document Frequency (IDF) discounts common words (like 'the', 'and', 'movie') that appear in many files by calculating log(Total Documents / Documents containing Word). This highlights rare keywords (like 'dinosaurs', 'vader', 'space') that are statistically unique identifiers, helping the cosine similarity algorithm match movies accurately without being biased by generic terms."
    },
    {
      q: "Explain Cosine Similarity mathematically. Why normalize vectors with L2 norm?",
      a: "Cosine Similarity calculates the cosine of the angle between two multi-dimensional vectors: similarity = (A · B) / (||A|| * ||B||). It ranges from -1.0 to 1.0 (or 0.0 to 1.0 for positive term counts). Applying L2 Normalization (Euclidean scaling) beforehand divides each vector by its square-root sum of squares, bringing its magnitude to exactly 1.0. This makes the denominator (||A|| * ||B||) equal to 1.0, enabling the cosine similarity to be computed as a simple dot product, which is incredibly fast."
    },
    {
      q: "What is the 'Cold Start Problem' and how does Content-Based Filtering resolve it?",
      a: "In Collaborative Filtering (which uses user behavior/ratings history), a new movie cannot be recommended until many users have rated it, and a new user cannot get recommendations until they have rated several movies. This is the Cold Start Problem. Content-Based Filtering resolves the movie cold start easily: new movies are recommended immediately using their text metadata, genres, and synopsis, without requiring any ratings history."
    },
    {
      q: "What are the core limitations of a Content-Based Recommendation System?",
      a: "Content-Based filtering has three major limitations: (1) Over-specialization (the filter bubble): it only recommends movies similar to what the user has already seen, never introducing serendipitous or surprising discoveries (e.g., suggesting only Star Wars to sci-fi fans, missing out on comedies they might enjoy; resolved using theme-weighted mixing). (2) Feature dependence: models depend entirely on rich, clean descriptions; if keywords are missing or poor, recommendations degrade. (3) No collaborative feedback: it cannot capture raw human emotions, popularity trends, or quality values unless ratings statistics are factored in."
    },
    {
      q: "How can you evaluate the performance of a Recommendation System?",
      a: "Recommendation systems can be evaluated using offline metrics or online metrics. For offline quantitative evaluation: (1) Rating Error: mean absolute error (MAE) or root mean squared error (RMSE). (2) Ranking/Precision: Precision@K stands for the percentage of recommended movies that are actually relevant, Recall@K stands for the proportion of total relevant movies recommended, and Mean Average Precision (MAP) balances both. (3) Diversity: NDCG (Normalized Discounted Cumulative Gain) evaluates the quality of user ranking preferences, and Entropy evaluates catalog coverage. Online, you can execute A/B testing on user click-through rate (CTR) or average streaming hours."
    },
    {
      q: "Why serialize models to Pickle files? What are security risks associated with Pickle?",
      a: "We serialize the trained movie lists and similarity matrix to Pickle (.pkl) files so that we do not have to load the database, preprocess text, and run the TF-IDF vectorizer / cosine similarity on every user request. This saves CPU time, especially on Streamlit, allowing the app to reload instantly. The security risk is that pickle files can execute arbitrary Python code during deserialization ('RCE' vulnerability). You should never load untrusted .pkl files from external sources; always train them in-house using secure files."
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in" id="interview-suite-container">
      
      {/* RESUME CARD BUILDERS */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
          <Award className="text-[#E50914]" size={18} />
          Data Science Portfolio Impact Bullets
        </h3>
        <p className="text-xs text-zinc-400">
          Tailored accomplishments with professional metrics, action verbs, and model parameters. Use these highlights directly to boost your resume and portfolios.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, idx) => (
            <div key={idx} className="bg-[#181818] border border-zinc-800 rounded-lg p-5 space-y-4 flex flex-col justify-between hover:border-zinc-700 transition">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#E50914] block tracking-wider uppercase">
                  {role.title}
                </span>
                <ul className="space-y-2 text-xs leading-relaxed list-disc pl-4 text-zinc-300">
                  {role.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="hover:text-white transition-colors">{b}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleCopyResume(idx, role.bullets)}
                className="w-full inline-flex items-center justify-center space-x-2 bg-black hover:bg-[#E50914] border border-[#E50914]/20 hover:border-[#E50914] text-zinc-300 hover:text-white py-2 px-4 rounded font-mono text-xs transition-all mt-4"
              >
                {copiedResume === `role-${idx}` ? (
                  <>
                    <Check size={14} className="text-white animate-pulse" />
                    <span className="text-white font-bold">Bullets Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Bullets for Resume</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* INTERVIEW SOLUTIONS */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
          <BadgeHelp className="text-[#E50914]" size={18} />
          Netflix Recommendation Engineer Interview Q&A Hub
        </h3>
        <p className="text-xs text-zinc-400">
          Prepare for technical questions regarding NLP, tf-idf calculations, vectors, and offline models evaluation parameters.
        </p>

        <div className="space-y-4">
          {interviewQuestions.map((iq, idx) => (
            <div key={idx} className="bg-[#181818] border border-zinc-805/85 rounded-lg p-5 space-y-3 hover:border-zinc-750 transition">
              <span className="text-xs font-mono text-[#E50914] font-bold block uppercase tracking-wide">
                QUESTION #{idx + 1}: {iq.q}
              </span>
              <div className="bg-black/60 p-4 border border-zinc-850 rounded text-xs text-zinc-305 leading-relaxed font-sans">
                {iq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MATHEMATICAL FRAMEWORK BLUEPRINT */}
      <div className="bg-[#181818] border border-zinc-800 p-6 rounded-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
          <BookOpen className="text-amber-500" size={18} />
          Content Similarity Matrix Mechanics & Steps
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400">
          <div className="bg-black/40 p-4 rounded border border-zinc-850 space-y-2">
            <span className="font-semibold text-white font-mono uppercase tracking-wider text-[11px] block text-[#E50914]">Step 1: Tokenization</span>
            <p className="leading-relaxed text-[11px]">
              We merge and stem tag features such as <span className="text-zinc-300 font-mono text-[9px] bg-zinc-900 px-1 py-0.5 rounded">genres</span> and descriptions, filter English stop words, and tokenize characters.
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded border border-zinc-850 space-y-2">
            <span className="font-semibold text-white font-mono uppercase tracking-wider text-[11px] block text-[#E50914]">Step 2: Vector Fit</span>
            <p className="leading-relaxed text-[11px]">
              Fitting term logs inside the TF-IDF parameters computes IDF scaling coefficients, down-weighting standard vocabulary and amplifying discrete plot-points context.
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded border border-zinc-850 space-y-2">
            <span className="font-semibold text-white font-mono uppercase tracking-wider text-[11px] block text-[#E50914]">Step 3: Cosine Dot Product</span>
            <p className="leading-relaxed text-[11px]">
              Computing dot products across L2-normalized vector dimensions produces similarity coefficients closer to 1.0, sorting similar items at speed.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end pt-2">
          <span className="text-[10px] font-mono text-zinc-500 italic bg-black border border-zinc-850 py-1 px-3 rounded flex items-center gap-1">
            <Sparkles size={11} className="text-amber-400" /> Precalculated server models preprocessed inside fast JavaScript engines.
          </span>
        </div>
      </div>

    </div>
  );
}
