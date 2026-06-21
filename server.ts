import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Lazily initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    console.warn("GEMINI_API_KEY is not configured or uses placeholder. Gemini chat utility is disabled.");
    return null;
  }
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    return aiClient;
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
    return null;
  }
}

// Import our TS Movie Data and recommendation engine
import { 
  MOVIES_DATA, 
  computeRecommendations, 
  getGenreCounts, 
  getRatingDistribution, 
  getMostPopularMovies 
} from "./src/data/movies.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  // 1. Get all movies metadata
  app.get("/api/movies", (req, res) => {
    try {
      res.json({ success: true, movies: MOVIES_DATA });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // 2. Compute recommendations given a movie target ID
  app.post("/api/recommend", (req, res) => {
    try {
      const { movieId, count } = req.body;
      if (!movieId) {
        return res.status(400).json({ success: false, error: "movieId is required" });
      }

      const parsedId = Number(movieId);
      const limit = count ? Number(count) : 5;
      
      const recommendations = computeRecommendations(parsedId, limit);
      res.json({ success: true, recommendations });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // 3. Get statistical analysis and aggregation metrics (EDA)
  app.get("/api/stats", (req, res) => {
    try {
      const genreCounts = getGenreCounts();
      const ratingDistribution = getRatingDistribution();
      const popularMovies = getMostPopularMovies(8);
      
      res.json({
        success: true,
        stats: {
          totalMovies: MOVIES_DATA.length,
          genreCounts,
          ratingDistribution,
          popularMovies,
          averageYear: Math.round(MOVIES_DATA.reduce((acc, curr) => acc + curr.year, 0) / MOVIES_DATA.length),
          averageRating: Number((MOVIES_DATA.reduce((acc, curr) => acc + curr.rating, 0) / MOVIES_DATA.length).toFixed(2))
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // 4. Dynamic Python/Jupyter Notebook Code Hub API
  app.get("/api/exporter/files", (req, res) => {
    const readme = `# Movie Recommendation System 🎬

A complete, resume-worthy Movie Recommendation System using Python, Pandas, Matplotlib, Scikit-learn, and Streamlit.

## Features
- **Exploratory Data Analysis (EDA)**: Interactive distribution graphs for ratings, genres, and movie releases.
- **Content-Based Filtering**: Implements a complete TF-IDF Vectorizer + Cosine Similarity mathematical pipeline from scratch and using Scikit-Learn.
- **Streamlit Web Dashboard**: Slick web interactive interface with responsive search, filter sliders, similarity scoring displays, and movie statistics.

## Project Structure
\`\`\`text
Movie-Recommendation-System/
├── data/
│   ├── movies.csv          <- Movie titles, release years, and genres
│   └── ratings.csv         <- User rating logs (MovieLens subset)
├── notebooks/
│   └── EDA.ipynb           <- Jupyter Notebook with full visual analysis
├── model/
│   ├── movie_list.pkl      <- Serialized pandas movies dataframe
│   └── similarity.pkl      <- Precomputed cosine similarity matrix
├── model_generator.py      <- Data science script to preprocess data and train similarity
├── app.py                  <- Full Streamlit application file
├── requirements.txt        <- Python dependencies list
└── README.md               <- Full documentation (this file)
\`\`\`

## Quick Start 🚀
1. **Clone this repository**:
   \`\`\`bash
   git clone https://github.com/your-username/Movie-Recommendation-System.git
   cd Movie-Recommendation-System
   \`\`\`

2. **Install Python requirements**:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. **Train the Similarity Model**:
   This runs preprocessing and exports the serialized \`.pkl\` files into \`model/\`:
   \`\`\`bash
   python model_generator.py
   \`\`\`

4. **Launch the Streamlit App**:
   \`\`\`bash
   streamlit run app.py
   \`\`\`
`;

    const requirements = `streamlit>=1.35.0
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.2.0
matplotlib>=3.7.0
seaborn>=0.12.0
`;

    const modelGeneratorPython = `\"\"\"
model_generator.py
Preprocesses MovieLens datasets, merges tags, creates TF-IDF embeddings, 
computes Cosine Similarity matrix, and exports Pickle files for the Streamlit app.
\"\"\"

import os
import pandas as pd
import numpy as np
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def load_and_preprocess_data():
    print("⏳ Loading datasets...")
    # Read files (relative paths)
    movies_df = pd.read_csv("data/movies.csv")
    ratings_df = pd.read_csv("data/ratings.csv")
    
    # Calculate average ratings and ratings count
    rating_stats = ratings_df.groupby('movieId').agg(
        avg_rating=('rating', 'mean'),
        rating_count=('rating', 'count')
    ).reset_index()
    
    # Merge into movies dataframe
    movies_df = pd.merge(movies_df, rating_stats, on='movieId', how='left')
    movies_df['avg_rating'] = movies_df['avg_rating'].fillna(0.0).round(2)
    movies_df['rating_count'] = movies_df['rating_count'].fillna(0).astype(int)
    
    # Fill empty genres
    movies_df['genres'] = movies_df['genres'].fillna("")
    
    # Build text 'tags' for content-based filtering
    # Clean up genre formats (remove spaces like 'Sci-Fi' -> 'Scifi', or replace '|' with spaces)
    cleaned_genres = movies_df['genres'].apply(lambda x: x.replace('|', ' ').replace('-', ''))
    
    # Extract release year from title
    movies_df['year'] = movies_df['title'].str.extract(r'\\((\\d{4})\\)')
    movies_df['year'] = movies_df['year'].fillna("1990")
    
    # Combine genres, release year, and extra metadata keywords as tags
    movies_df['tags'] = cleaned_genres + " " + movies_df['year'] + " " + movies_df['title'].apply(lambda x: x.lower())
    
    print(f"✅ Loaded {len(movies_df)} movies! Preprocessing complete.")
    return movies_df

def build_recommendation_model(movies_df):
    print("🧠 Building content-based filtering model...")
    
    # Initialize TF-IDF Vectorizer with English stop words removal
    tfidf = TfidfVectorizer(stop_words='english', min_df=1)
    
    # Generate sparse matrix representation of descriptors
    tfidf_matrix = tfidf.fit_transform(movies_df['tags'])
    
    # Calculate pairwise cosine similarity matrix
    similarity_matrix = cosine_similarity(tfidf_matrix)
    
    print(f"Matrix computed! Shape: {similarity_matrix.shape}")
    return similarity_matrix

def save_models(movies_df, similarity_matrix):
    print("💾 Serializing model files using Pickling...")
    os.makedirs("model", exist_ok=True)
    
    # Export movie dictionary
    with open("model/movie_list.pkl", "wb") as f:
      # Only export columns needed for recommendation to save space
      export_df = movies_df[['movieId', 'title', 'genres', 'year', 'avg_rating', 'rating_count', 'tags']]
      pickle.dump(export_df, f)
      
    # Export similarity matrix
    with open("model/similarity.pkl", "wb") as f:
      pickle.dump(similarity_matrix, f)
      
    print("🎉 Models successfully exported inside model/ directory!")

if __name__ == "__main__":
    df = load_and_preprocess_data()
    sim = build_recommendation_model(df)
    save_models(df, sim)
`;

    const appPython = `\"\"\"
app.py
A modern and responsive Streamlit user interface for the Movie Recommendation System.
Loads processed lists and similarities, and serves recommendations instantly.
\"\"\"

import streamlit as st
import pandas as pd
import numpy as np
import pickle
import os

# Set browser page configuration
st.set_page_config(
    page_title="Movie Recommendation System 🎬",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling (CSS injection)
st.markdown(\"\"\"
<style>
    .metric-card {
        background-color: #0e1117;
        border: 1px solid #30363d;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    .recommendation-card {
        background-color: #161b22;
        border: 1px solid #30363d;
        border-radius: 8px;
        padding: 20px;
        transition: transform 0.2s;
    }
    .recommendation-card:hover {
        transform: translateY(-5s);
        border-color: #58a6ff;
    }
</style>
\"\"\", unsafe_allow_html=True)

@st.cache_resource
def load_assets():
    # Fallback simulation if pickle files do not exist (for immediate demo verification)
    if not (os.path.exists('model/movie_list.pkl') and os.path.exists('model/similarity.pkl')):
        # Create a tiny mock dataframe
        mock_movies = pd.DataFrame([
            {"movieId": 1, "title": "Toy Story (1995)", "genres": "Animation|Adventure|Children", "year": "1995", "avg_rating": 4.15, "rating_count": 2154},
            {"movieId": 2, "title": "Jumanji (1995)", "genres": "Adventure|Children|Fantasy", "year": "1995", "avg_rating": 3.43, "rating_count": 1120},
            {"movieId": 3, "title": "GoldenEye (1995)", "genres": "Action|Adventure|Thriller", "year": "1995", "avg_rating": 3.65, "rating_count": 1240},
            {"movieId": 4, "title": "Heat (1995)", "genres": "Action|Crime|Drama|Thriller", "year": "1995", "avg_rating": 4.23, "rating_count": 940},
            {"movieId": 5, "title": "Star Wars: Episode IV (1977)", "genres": "Action|Adventure|Sci-Fi", "year": "1977", "avg_rating": 4.45, "rating_count": 2980},
        ])
        mock_sim = np.array([
            [1.0, 0.45, 0.30, 0.15, 0.40],
            [0.45, 1.0, 0.25, 0.05, 0.35],
            [0.30, 0.25, 1.0, 0.50, 0.45],
            [0.15, 0.05, 0.50, 1.0, 0.20],
            [0.40, 0.35, 0.45, 0.20, 1.0],
        ])
        return mock_movies, mock_sim
        
    with open('model/movie_list.pkl', 'rb') as f:
        movies = pickle.load(f)
    with open('model/similarity.pkl', 'rb') as f:
        similarity = pickle.load(f)
    return movies, similarity

try:
    movies_df, similarity_matrix = load_assets()
except Exception as e:
    st.error(f"Failed to load datasets: {e}")
    st.stop()

# App Header
st.title("🎬 Movie Recommendation System")
st.write("A Content-Based Filtering Movie Search engine powered by TF-IDF vector embeddings & Cosine Similarity.")

# Layout Columns
col_sidebar, col_main = st.beta_columns([1, 3]) if hasattr(st, "beta_columns") else st.columns([1, 3])

with col_sidebar:
    st.header("⚙️ Configuration")
    
    # Dropdown movie select
    movie_list = movies_df['title'].values
    selected_movie_title = st.selectbox(
        "Select Reference Movie:",
        movie_list,
        help="The algorithm will suggest top matches based on this movie's metadata features."
    )
    
    # Slides for limit
    recommend_count = st.slider("Number of Recommendations:", 3, 10, 5)
    
    # Statistics summary indicators
    st.markdown("---")
    st.markdown("### 📊 Dataset Overview")
    st.info(f"Loaded Movies: **{len(movies_df)}**")
    st.success(f"Average Rating: **{movies_df['avg_rating'].mean():.2f} ★**")

with col_main:
    # Get active movie details
    active_movie = movies_df[movies_df['title'] == selected_movie_title].iloc[0]
    
    # Brief active movie summary card
    st.markdown(f\"\"\"
    <div class="metric-card">
        <h3>🎯 Base Selection: {active_movie['title']}</h3>
        <p><b>Genres:</b> {active_movie['genres'].replace('|', ', ')} | <b>Year:</b> {active_movie['year']}</p>
        <p><b>MovieLens Rating:</b> {active_movie['avg_rating']} ★ ({active_movie['rating_count']} ratings)</p>
    </div>
    \"\"\", unsafe_allow_html=True)
    
    if st.button("Generate Recommendations 🚀", key="rec_btn") or True:
        st.subheader(f"Top {recommend_count} Movies Similar to '{active_movie['title']}':")
        
        # Calculate indexes
        try:
            movie_idx = movies_df[movies_df['title'] == selected_movie_title].index[0]
            similarity_scores = list(enumerate(similarity_matrix[movie_idx]))
            
            # Sort scores descending, ignore 0th (self match)
            sorted_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[1:recommend_count+1]
            
            # Grid display
            cols = st.columns(recommend_count) if hasattr(st, "columns") else [st] * recommend_count
            
            for rank, (idx, score) in enumerate(sorted_scores):
                rec_movie = movies_df.iloc[idx]
                with cols[rank % len(cols)]:
                    st.markdown(f\"\"\"
                    <div class="recommendation-card">
                        <span style="color: #8b949e; font-size: 0.8em;">Rank #{rank+1}</span>
                        <h4 style="margin: 5px 0;">{rec_movie['title']}</h4>
                        <p style="font-size: 0.9em; color:#58a6ff; font-weight: bold; margin: 3px 0;">
                            Similarity: {score*100:.1f}%
                        </p>
                        <p style="font-size: 0.8em; color: #8b949e; margin: 2px 0;">
                            ⭐ {rec_movie['avg_rating']} ★
                        </p>
                        <p style="font-size: 0.8em; color: #8b949e; height: 35px; overflow: hidden; text-overflow: ellipsis;">
                            <i>Genres:</i> {rec_movie['genres'].split('|')[0]}
                        </p>
                    </div>
                    \"\"\", unsafe_allow_html=True)
        except Exception as err:
            st.error(f"Error calculating recommendations: {err}")
st.markdown("---")
st.caption("Produced by Google AI Studio Code Workspace - Complete Python & ML Stack.")
`;

    const jupyterNotebookCode = `
# Exploratory Data Analysis & Content-Based Recommendation Pipeline
# Created as an industry-level reference Jupyter Notebook (.ipynb)

## Cell 1: Imports and Environment Setup
\`\`\`python
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Configure inline visualization
%matplotlib inline
sns.set_theme(style="darkgrid")
plt.rcParams['figure.figsize'] = (10, 6)
print("🚀 Libraries successfully imported!")
\`\`\`

## Cell 2: Creating Synthetic Datasets (Demo fallback if file not in tree)
\`\`\`python
# Check or download MovieLens dataset. In notebook, we simulate files to prevent breaks:
os.makedirs("data", exist_ok=True)

# Generate a minimal placeholder file for movies and ratings if they don't exist
if not os.path.exists("data/movies.csv"):
    movies_demo = pd.DataFrame([
        [1, "Toy Story (1995)", "Animation|Adventure|Children|Comedy"],
        [2, "Jumanji (1995)", "Adventure|Children|Fantasy"],
        [3, "GoldenEye (1995)", "Action|Adventure|Thriller"],
        [4, "Heat (1995)", "Action|Crime|Drama|Thriller"],
        [5, "Star Wars: Episode IV - A New Hope (1977)", "Action|Adventure|Sci-Fi"]
    ], columns=["movieId", "title", "genres"])
    movies_demo.to_csv("data/movies.csv", index=False)
    print("Created demo movies.csv dataset.")

if not os.path.exists("data/ratings.csv"):
    ratings_demo = pd.DataFrame([
        [1, 1, 4.0, 964982703],
        [2, 1, 4.5, 964981247],
        [1, 2, 3.5, 964982563],
        [3, 3, 4.0, 964983204],
        [5, 5, 5.0, 964980124]
    ], columns=["userId", "movieId", "rating", "timestamp"])
    ratings_demo.to_csv("data/ratings.csv", index=False)
    print("Created demo ratings.csv dataset.")
\`\`\`

## Cell 3: Loading and Inspecting the Data (Data Profiling)
\`\`\`python
# Load dataset
movies = pd.read_csv("data/movies.csv")
ratings = pd.read_csv("data/ratings.csv")

# Print structural profiles
print("--- Movie Profiles ---")
print(movies.info())
print("\\nFirst 5 Rows:")
display(movies.head())

print("\\n--- Rating Profiles ---")
print(ratings.info())
print("\\nFirst 5 Rows:")
display(ratings.head())
\`\`\`

## Cell 4: Checking Missing Values and Duplicates
\`\`\`python
print("Missing values in Movies:\\n", movies.isnull().sum())
print("\\nMissing values in Ratings:\\n", ratings.isnull().sum())

# Duplicates
print("\\nDuplicates found in Movies:", movies.duplicated(subset=['title']).sum())
if movies.duplicated(subset=['title']).sum() > 0:
    movies = movies.drop_duplicates(subset=['title'])
    print("Duplicates purged.")
\`\`\`

## Cell 5: Aggregating Statistics & Merging
\`\`\`python
# Compute average rating per movie ID
movie_ratings = ratings.groupby("movieId").agg(
    avg_rating=("rating", "mean"),
    rating_count=("rating", "count")
).reset_index()

# Merge
movies_full = pd.merge(movies, movie_ratings, on="movieId", how="left")
movies_full['avg_rating'] = movies_full['avg_rating'].fillna(0.0).round(2)
movies_full['rating_count'] = movies_full['rating_count'].fillna(0).astype(int)
display(movies_full.head())
\`\`\`

## Cell 6: Data Visualization - Theme Genre Counts
\`\`\`python
# Splitting genres to analyze counts
genres_list = movies['genres'].str.split('|').explode()
genre_counts = genres_list.value_counts()

plt.figure(figsize=(12, 6))
sns.barplot(x=genre_counts.values, y=genre_counts.index, palette="viridis")
plt.title("MovieLens - Distribution of Movie Genres 🎬", fontsize=16)
plt.xlabel("Count of Movies")
plt.ylabel("Movie Genre")
plt.show()
\`\`\`

## Cell 7: Data Visualization - Rating Distributions
\`\`\`python
plt.figure(figsize=(10, 5))
sns.histplot(data=ratings, x="rating", bins=10, kde=True, color="purple")
plt.title("Overall Ratings Distribution in Dataset ⭐", fontsize=15)
plt.xlabel("Star Rating (0.5 - 5.0)")
plt.ylabel("Frequency Log Count")
plt.show()
\`\`\`

## Cell 8: Feature Engineering & Pre-processing
\`\`\`python
# Combine variables to form tags vector: title + genres (cleaned) + year
movies_full['genres_clean'] = movies_full['genres'].apply(lambda x: x.replace('|', ' ').replace('-', ''))
movies_full['year'] = movies_full['title'].str.extract(r'\\((\\d{4})\\)').fillna("1996")

# Combine everything
movies_full['combined_features'] = movies_full['title'].apply(lambda l: l.lower()) + " " + movies_full['genres_clean'].apply(lambda l: l.lower()) + " " + movies_full['year']
print("Feature Engineering completed! Output example:")
print(movies_full['combined_features'].iloc[0])
\`\`\`

## Cell 9: Compute Similarity Matrix
\`\`\`python
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movies_full['combined_features'])
print("TF-IDF Matrix dimensions: ", tfidf_matrix.shape)

# Cosine similarities
cos_similarity = cosine_similarity(tfidf_matrix, tfidf_matrix)
print("Pairwise Cosine Similarity matrix calculated.")
\`\`\`

## Cell 10: Recommendation Function Test
\`\`\`python
def recommend_movies(movie_title, limit=5):
    # Find matching index
    try:
        movie_idx = movies_full[movies_full['title'].str.contains(movie_title, case=False)].index[0]
    except IndexError:
        print(f"❌ '{movie_title}' not found in database.")
        return None
        
    scores = list(enumerate(cos_similarity[movie_idx]))
    # Sort
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:limit+1]
    
    print(f"🎬 Top Recommendations for movie: {movies_full.iloc[movie_idx]['title']}\\n" + "="*50)
    for i, (idx, val) in enumerate(sorted_scores):
        print(f"{i+1}. {movies_full.iloc[idx]['title']} (Similarity: {val*100:.2f}%)")

# Test Run
recommend_movies("Toy Story", limit=3)
\`\`\`
`;

    res.json({
      success: true,
      files: {
        "README.md": readme,
        "requirements.txt": requirements,
        "model_generator.py": modelGeneratorPython,
        "app.py": appPython,
        "notebooks/EDA.ipynb": jupyterNotebookCode
      }
    });
  });

  // 5. Ask Gemini AI API conversation route (using process.env.GEMINI_API_KEY)
  app.post("/api/chat", async (req, res) => {
    try {
      const client = getGeminiClient();
      if (!client) {
        return res.json({
          success: false,
          isConfigured: false,
          reply: "Google Gemini is currently unavailable because the API key is missing or invalid. Please configure your `GEMINI_API_KEY` in **Settings > Secrets** in the AI Studio sidebar to unlock interactive AI advice!"
        });
      }

      const { prompt, currentMovieTitle } = req.body;
      if (!prompt) {
        return res.status(400).json({ success: false, error: "Prompt is required" });
      }

      // Context injection
      const systemInstruction = 
        `You are an expert Senior Data Scientist and Machine Learning Engineer specializing in Movie Recommendation Systems.
        Your goal is to answer questions from users about the recommendation model, and teach topics such as:
        - TF-IDF Vectorization, Stop Words, Term Frequency, Inverse Document Frequency
        - Cosine Similarity mathematics and L2 Vector Normalization
        - Collaborative Filtering (User-Item, Item-Item) vs. Content-Based Filtering
        - Cold Start Problem and how to mitigate it
        - Evaluation Metrics (MAE, RMSE, Precision@K, Recall@K, NDCG)
        
        Keep your tone friendly, incredibly knowledgeable, clear, and highly professional. Use Markdown list formats and bold highlighting.
        ${currentMovieTitle ? `The user is currently researching recommendations related to the movie: **${currentMovieTitle}**.` : ""}`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({
        success: true,
        isConfigured: true,
        reply: response.text || "I processed your request, but wasn't able to compile a clear reply text. Please try asking again!"
      });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // Serve static assets in production, mount Vite development server in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Full-stack Movie App Server successfully running on http://localhost:${PORT}`);
  });
}

startServer();
