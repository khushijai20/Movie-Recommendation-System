export interface Movie {
  id: number;
  title: string;
  genres: string[];
  year: number;
  rating: number; // 1-5 stars
  ratingCount: number; // Number of ratings in MovieLens-like subset
  overview: string;
  tags: string[]; // Content terms
  tagline: string;
}

export const MOVIES_DATA: Movie[] = [
  {
    id: 1,
    title: "Toy Story",
    tagline: "An adventure that takes you out of this world!",
    genres: ["Animation", "Adventure", "Comedy", "Children"],
    year: 1995,
    rating: 4.15,
    ratingCount: 2154,
    overview: "A cowboy toy named Woody is profoundly threatened and jealous when a fancy new spaceman astronaut figure named Buzz Lightyear becomes top toy in a boy's room. Together they are lost in the outside world and must cooperate to find their way home.",
    tags: ["pixar", "disney", "animation", "buddy", "toy", "childhood", "living-toys", "spaceman", "jealousy", "cooperation", "family"]
  },
  {
    id: 2,
    title: "Jumanji",
    tagline: "Roll the dice and search for survival.",
    genres: ["Adventure", "Children", "Fantasy"],
    year: 1995,
    rating: 3.43,
    ratingCount: 1120,
    overview: "When two children find and play a magical ancient board game, they release a dark man who was trapped in it for decades, along with a host of exotic jungle hazards, wild animals, stampedes, and hunters that can only be stopped by finishing the game.",
    tags: ["board-game", "magic", "jungle", "survival", "trapped", "stamps", "hunter", "mysterious", "childhood", "fantasy"]
  },
  {
    id: 3,
    title: "GoldenEye",
    tagline: "You know the name. You know the number.",
    genres: ["Action", "Adventure", "Thriller"],
    year: 1995,
    rating: 3.65,
    ratingCount: 1240,
    overview: "James Bond 007 teams up with a Russian computer programmer to stop a rogue former MI6 secret agent colleague from using a devastating space satellite weapon system called GoldenEye to wipe out London's financial infrastructure.",
    tags: ["spy", "secret-agent", "james-bond", "007", "espionage", "satellite", "rogue", "hacker", "action-thriller", "russia"]
  },
  {
    id: 4,
    title: "Heat",
    tagline: "A Los Angeles crime saga.",
    genres: ["Action", "Crime", "Drama", "Thriller"],
    year: 1995,
    rating: 4.23,
    ratingCount: 940,
    overview: "A legendary professional mastermind thief leads an elite crew on daring bank robberies and heist operations through Los Angeles, while an intense, obsessive LAPD detective tracks their crew down, leading to a cat-and-mouse confrontation.",
    tags: ["heist", "robbery", "professional-thief", "detective", "police", "los-angeles", "gunfight", "obsession", "modern-noir", "crime-saga"]
  },
  {
    id: 5,
    title: "Casino",
    tagline: "No one stays at the top forever.",
    genres: ["Crime", "Drama"],
    year: 1995,
    rating: 4.12,
    ratingCount: 810,
    overview: "A master sports handicapper and gambling expert is tapped by the Chicago Mafia mob to oversee operations at the Tangiers Casino in Las Vegas. His empire crumbles due to his hot-headed enforcer friend and a glamorous, manipulative femme fatale wife.",
    tags: ["mafia", "gambling", "las-vegas", "mob", "corruption", "greed", "betrayal", "scorsese", "criminal-empire", "biographical", "money"]
  },
  {
    id: 6,
    title: "The Usual Suspects",
    tagline: "Five criminals. One lineup. No coincidence.",
    genres: ["Crime", "Mystery", "Thriller"],
    year: 1995,
    rating: 4.28,
    ratingCount: 1780,
    overview: "A sole survivor tells of the twisty chain of events that led five elite criminals to meet in a random police lineup only to plan a heist that went bloodily wrong, culminating in a mysterious criminal mastermind named Keyser Soze.",
    tags: ["interrogation", "keyser-soze", "twist-ending", "heist", "manipulation", "mastermind", "criminal-lineup", "police", "flashback", "legend"]
  },
  {
    id: 7,
    title: "Star Wars: Episode IV - A New Hope",
    tagline: "A long time ago in a galaxy far, far away...",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 1977,
    rating: 4.45,
    ratingCount: 2980,
    overview: "Luke Skywalker joining forces with a Jedi Knight, a cocky pilot smuggler Han Solo, and two droids, sets out on a galactic space crusade to rescue Rebel Leader Princess Leia from the clutches of Darth Vader and destroy the Empire's planet-killing Death Star.",
    tags: ["space-opera", "the-force", "jedi", "galaxy", "rebellion", "empire", "spaceship", "george-lucas", "darth-vader", "classic", "aliens"]
  },
  {
    id: 8,
    title: "Star Wars: Episode V - The Empire Strikes Back",
    tagline: "The Adventure Continues.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 1980,
    rating: 4.52,
    ratingCount: 2890,
    overview: "After the Rebels are brutally overpowered by the Empire on the ice planet of Hoth, Luke Skywalker undergoes rigorous Jedi training with Master Yoda in the swamps of Dagobah, while Han Solo and Princess Leia are captured by Darth Vader.",
    tags: ["jedi-training", "yoda", "hoth", "darth-vader", "plot-twist", "betrayal", "cloud-city", "father-revelation", "space-opera", "masterpiece", "the-force"]
  },
  {
    id: 9,
    title: "Star Wars: Episode VI - Return of the Jedi",
    tagline: "The Empire falls, the Jedi returns.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 1983,
    rating: 4.21,
    ratingCount: 2420,
    overview: "Luke Skywalker attempts to rescue his friend Han Solo from the crime lord Jabba the Hutt, then returns to face Darth Vader and the Galactic Emperor on the forest moon of Endor, trying to redeem his father while the fleet attacks the new Death Star.",
    tags: ["jabba", "endor", "ewoks", "emperor-palpatine", "redemption", "death-star", "space-battle", "father-redemption", "space-opera", "the-force"]
  },
  {
    id: 10,
    title: "Jurassic Park",
    tagline: "An adventure 65 million years in the making.",
    genres: ["Action", "Adventure", "Sci-Fi", "Thriller"],
    year: 1993,
    rating: 4.25,
    ratingCount: 2640,
    overview: "A billionaire entrepreneur creates a wildlife dinosaur theme park of cloned prehistoric creatures on an island. Before opening, a group of scientists, paleontologists, and his grandchildren are trapped as a power sabotage frees the giant predators.",
    tags: ["dinosaurs", "cloning", "science-fiction", "theme-park", "disaster", "survival", "tyrannosaurus-rex", "island", "spielberg", "genetics", "chaos-theory"]
  },
  {
    id: 11,
    title: "Schindler's List",
    tagline: "Whoever saves one life, saves the world entire.",
    genres: ["Drama", "History", "War"],
    year: 1993,
    rating: 4.48,
    ratingCount: 2310,
    overview: "In Nazi-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution. He spends his entire personal fortune to bribe officers and save over a thousand refugees.",
    tags: ["holocaust", "world-war-ii", "nazi", "oskar-schindler", "true-story", "jewish-rescue", "black-and-white", "spielberg", "humanitarian", "tragedy"]
  },
  {
    id: 12,
    title: "Forrest Gump",
    tagline: "The world will never be the same once you've seen it through the eyes of Forrest Gump.",
    genres: ["Comedy", "Drama", "Romance"],
    year: 1994,
    rating: 4.18,
    ratingCount: 3120,
    overview: "A simple, kindhearted man from Alabama with a low IQ witnesses and accidentally influences some of the defining historical events of the late 20th century, including the Vietnam War and Watergate, while holding a lifelong love for his childhood sweetheart.",
    tags: ["historical-events", "vietnam-war", "running", "shrimp", "love-story", "ping-pong", "destiny", "tom-hanks", "simpleton", "friendship"]
  },
  {
    id: 13,
    title: "The Lion King",
    tagline: "Life's greatest adventure is finding your place in the Circle of Life.",
    genres: ["Animation", "Drama", "Children", "Musical"],
    year: 1994,
    rating: 4.16,
    ratingCount: 2040,
    overview: "A young lion prince named Simba is exiled from his pride lands after his treacherous uncle Scar murders his father Mufasa and frames Simba. Simba grows up in the jungle with funny friends, learning to take responsibility and reclaim his rightful crown.",
    tags: ["disney", "animation", "musical", "animals", "africa", "royalty", "uncle-betrayal", "grief", "hamlet", "hakuna-matata"]
  },
  {
    id: 14,
    title: "Pulp Fiction",
    tagline: "Just because you are a character doesn't mean that you have character.",
    genres: ["Comedy", "Crime", "Drama", "Thriller"],
    year: 1994,
    rating: 4.35,
    ratingCount: 2890,
    overview: "The lives of two mob hitmen, a boxer who gets paid to throw a fight, a gangster's glamorous cocaine-addict wife, and a pair of nervous diner robbery bandit lovers intertwine in four tales of crime, violence, dark comedy, and redemption in modern LA.",
    tags: ["hitmen", "gangsters", "quentin-tarantino", "nonlinear-narrative", "drugs", "boxing-match", "cult-classic", "dark-comedy", "briefcase", "pop-culture", "los-angeles"]
  },
  {
    id: 15,
    title: "The Shawshank Redemption",
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    genres: ["Drama", "Crime"],
    year: 1994,
    rating: 4.72,
    ratingCount: 3450,
    overview: "Andy Dufresne, a successful banker, is unjustly sentenced to life in Shawshank State Prison for murdering his wife. Over two decades, he befriends smuggling inmate Red, maintains hope, maintains integrity, and plays a long-term game to find freedom.",
    tags: ["prison-escape", "friendship", "unjust-conviction", "hope", "stephen-king", "corruption", "dignity", "perseverance", "morgan-freeman", "highest-rated", "classic"]
  },
  {
    id: 16,
    title: "The Dark Knight",
    tagline: "Why So Serious?",
    genres: ["Action", "Crime", "Drama", "Thriller"],
    year: 2008,
    rating: 4.61,
    ratingCount: 3200,
    overview: "Batman, Police Lieutenant Jim Gordon, and District Attorney Harvey Dent wage war on organized crime in Gotham. They find themselves terrorized by the Joker, a psychopathic anarchist mastermind who unleashes total chaos, testing Batman's psychological limits.",
    tags: ["batman", "joker", "vigilante", "chaos", "anarchy", "gotham", "superhero", "christopher-nolan", "double-face", "psychological", "masterpiece"]
  },
  {
    id: 17,
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    genres: ["Action", "Crime", "Sci-Fi", "Thriller"],
    year: 2010,
    rating: 4.41,
    ratingCount: 2950,
    overview: "A highly skilled fugitive corporate thief specializes in extracting valuable commercial secrets from deep within the subconscious minds of executives while they dream. He is given a redemptive final job: to plant an idea rather than steal it.",
    tags: ["dreams", "subconscious", "heist", "christopher-nolan", "mind-bending", "totem", "gravity-defying", "puzzle", "action-sci-fi", "physics-bending"]
  },
  {
    id: 18,
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    genres: ["Sci-Fi", "Drama", "IMAX"],
    year: 2014,
    rating: 4.38,
    ratingCount: 2610,
    overview: "A team of space explorers and an ex-NASA pilot travel through a newly discovered wormhole near Saturn on an interstellar voyage in search of a habitable planet to save humanity as a massive plant blight causes Earth's agriculture to fail.",
    tags: ["space-exploration", "gravity", "time-travel", "wormhole", "relativity-dilatation", "father-daughter", "christopher-nolan", "black-hole", "future-apocalypse", "robots"]
  },
  {
    id: 19,
    title: "The Matrix",
    tagline: "Free your mind.",
    genres: ["Action", "Sci-Fi", "Thriller"],
    year: 1999,
    rating: 4.46,
    ratingCount: 3050,
    overview: "A computer hacker named Neo learns from mysterious outlaw rebel Morpheus that his entire seemingly normal reality is a simulated neural virtual reality computer network called the Matrix, built by sentient machines that harvest human bio-energy.",
    tags: ["artificial-intelligence", "virtual-reality", "simulation-theory", "kung-fu", "cyberpunk", "bullet-time", "dystopian-future", "the-one", "machines", "philosophical"]
  },
  {
    id: 20,
    title: "Fight Club",
    tagline: "Mischief. Mayhem. Soap.",
    genres: ["Action", "Drama", "Thriller"],
    year: 1999,
    rating: 4.32,
    ratingCount: 2240,
    overview: "An insomniac office worker looking for a way to change his boring consumer lifestyle crosses paths with Tyler Durden, a charismatic soap salesman. They establish an underground fight club for men that quickly spirals into a dark anti-capitalist anarchist movement.",
    tags: ["split-personality", "anarchism", "anti-consumerism", "underground-fight", "schizophrenia", "brad-pitt", "satire", "cult-classic", "plot-twist", "nihilism"]
  },
  {
    id: 21,
    title: "The Silence of the Lambs",
    tagline: "To enter the mind of a killer, she must challenge the mind of a madman.",
    genres: ["Crime", "Horror", "Thriller"],
    year: 1991,
    rating: 4.39,
    ratingCount: 2470,
    overview: "A raw, brilliant young FBI trainee, Clarice Starling, must approach and interview an infamous imprisoned cannibalistic forensic psychiatrist, Dr. Hannibal Lecter, in his high-security cell in order to gain psychological clues to catch an active serial killer.",
    tags: ["serial-killer", "fbi", "cannibal", "hannibal-lecter", "psychological-thriller", "investigation", "mind-games", "oscar-winner", "suspense", "tension"]
  },
  {
    id: 22,
    title: "Seven",
    tagline: "The seven deadly sins. Seven ways to die.",
    genres: ["Crime", "Mystery", "Thriller"],
    year: 1995,
    rating: 4.30,
    ratingCount: 2120,
    overview: "Two homicide detectives - a retiring, methodical veteran and his newly arriving, impulsive young partner - track a meticulously brilliant and psychotic serial killer whose gruesome murders correspond directly to the biblical seven deadly sins.",
    tags: ["serial-killer", "seven-deadly-sins", "detective", "police-investigation", "david-fincher", "rainy-city", "dark-mood", "shocking-climax", "bible", "neo-noir"]
  },
  {
    id: 23,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    tagline: "One Ring to rule them all.",
    genres: ["Adventure", "Fantasy"],
    year: 2001,
    rating: 4.58,
    ratingCount: 2830,
    overview: "An innocent young Shire hobbit, Frodo Baggins, inherits a mythical, ancient golden Ring of power. He must embark on a dangerous quest to the volcanic fires of Mount Doom in Mordor to destroy the ring, protected by a diverse fellowship of nine companions.",
    tags: ["middle-earth", "hobbit", "wizard", "magic-ring", "orc", "fantasy-quest", "elf", "peter-jackson", "tolkien", "epic-journey", "fellowship"]
  },
  {
    id: 24,
    title: "The Lord of the Rings: The Two Towers",
    tagline: "The Alliance is united. The Journey continues.",
    genres: ["Adventure", "Fantasy"],
    year: 2002,
    rating: 4.54,
    ratingCount: 2680,
    overview: "While Frodo and Sam, now joined by the treacherous, split-minded creature Gollum, trek closer to the dark lands of Mordor to destroy the Ring of power, Aragorn, Legolas and Gimli help defend the kingdom of Rohan from Saruman's massive Uruk-hai monster armies.",
    tags: ["middle-earth", "gollum", "siege-battle", "helms-deep", "wizard", "fantasy-war", "splits-mind", "peter-jackson", "tolkien", "fellowship"]
  },
  {
    id: 25,
    title: "The Lord of the Rings: The Return of the King",
    tagline: "The Eye of the Enemy is moving.",
    genres: ["Adventure", "Fantasy"],
    year: 2003,
    rating: 4.62,
    ratingCount: 2940,
    overview: "The final confrontation between the remaining forces of good and the massive dark armies of Sauron takes place at Gondor's capital. Meanwhile, hobbit heroes Frodo and Sam struggle through boiling barren volcanic lands to cast the Ring into Mount Doom.",
    tags: ["middle-earth", "mount-doom", "epic-battle", "victory-climax", "royalty-return", "peter-jackson", "tolkien", "oscar-winner", "final-chapter", "fantasy"]
  },
  {
    id: 26,
    title: "Gladiator",
    tagline: "What we do in life echoes in eternity.",
    genres: ["Action", "Adventure", "Drama"],
    year: 2000,
    rating: 4.29,
    ratingCount: 1980,
    overview: "A heroic Roman general, Maximus, is betrayed when the corrupt, power-hungry prince Commodus murders his own father Emperor Marcus Aurelius and takes the throne. Saved from execution, Maximus rises as a warrior gladiator in the Colosseum to avenge his family and Rome.",
    tags: ["ancient-rome", "colosseum", "gladiator", "revenge", "military-general", "betrayal-empire", "ridley-scott", "sword-and-sandal", "emperor", "arena"]
  },
  {
    id: 27,
    title: "The Godfather",
    tagline: "An offer you can't refuse.",
    genres: ["Crime", "Drama"],
    year: 1972,
    rating: 4.70,
    ratingCount: 2840,
    overview: "The aging patriarch of an organized crime dynasty, Don Vito Corleone, transfers control of his extensive underground criminal empire to his reluctant youngest war-hero son, Michael, initiating a bloody, calculated cycle of mafia violence and family loyalty.",
    tags: ["mafia", "sicilian-family", "don-corleone", "succession", "organized-crime", "gangster-empire", "marlon-brando", "al-pacino", "classic-cinema", "violence", "honor"]
  },
  {
    id: 28,
    title: "The Godfather: Part II",
    tagline: "The Godfather continues.",
    genres: ["Crime", "Drama"],
    year: 1974,
    rating: 4.65,
    ratingCount: 2110,
    overview: "In twin parallel storylines, a young Vito Corleone grows up in Sicily and starts a mafia empire in early 20th century New York, while in the 1950s his son Michael expands and tightens his grip on the family crime empire, dealing with betrayal and senator trials.",
    tags: ["mafia", "sequel-prequel", "sicily-origin", "robert-de-niro", "al-pacino", "organized-crime", "family-tragedy", "corruption", "historical"]
  },
  {
    id: 29,
    title: "Goodfellas",
    tagline: "Three decades of life in the mafia.",
    genres: ["Crime", "Drama"],
    year: 1990,
    rating: 4.43,
    ratingCount: 1890,
    overview: "The rise and rapid chaotic fall of three decades in the Lucchese crime family, as told by local kid turned gangster Henry Hill. He lives the glamorous mob life, organizes airport heists, deals cocaine, and is forced to enter witness protection.",
    tags: ["mafia-lifestyle", "real-crime-story", "scorsese", "cocaine-trafficking", "heist-robbery", "gangster", "fast-paced", "voiceover", "narrator"]
  },
  {
    id: 30,
    title: "The Departed",
    tagline: "Liar. Betrayer. Cop. Rat.",
    genres: ["Crime", "Drama", "Thriller"],
    year: 2006,
    rating: 4.31,
    ratingCount: 1540,
    overview: "While a young state police cop goes undercover to infiltrate an Irish mob boss's crew in South Boston, a smart street criminal is planted of that same mob crew as a mole informant inside the police department. Both operate in constant threat of exposure.",
    tags: ["undercover-cop", "police-mole", "boston-mob", "scorsese", "cat-and-mouse", "betrayal-investigation", "paranoia", "irish-mafia", "criminals"]
  },
  {
    id: 31,
    title: "The Prestige",
    tagline: "Are you watching closely?",
    genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"],
    year: 2006,
    rating: 4.34,
    ratingCount: 1650,
    overview: "After a tragic stage accident, two young, competitive 19th-century magicians in Victorian London engage in an obsessive, escalating battle of showmanship and illusion to create the ultimate stage trick, sacrificing their lives and sanity.",
    tags: ["magicians", "london-victorian", "rivalry", "obsession", "science-versus-magic", "nikola-tesla", "christopher-nolan", "cloning-machine", "twist-ending", "secret-diary"]
  },
  {
    id: 32,
    title: "Memento",
    tagline: "Some memories are best forgotten.",
    genres: ["Drama", "Mystery", "Thriller"],
    year: 2000,
    rating: 4.26,
    ratingCount: 1820,
    overview: "A man suffering from rare short-term memory loss is unable to store new thoughts. He relies on polaroid photographs, body tattoos, and personal notes as he tries to solve his wife's murder, told in reverse chronological order.",
    tags: ["short-term-memory-loss", "reverse-chronological", "polaroids", "wife-murder", "christopher-nolan", "revenge-quest", "investigation-puzzle", "psychological"]
  },
  {
    id: 33,
    title: "The Avengers",
    tagline: "Some assembly required.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 2012,
    rating: 4.10,
    ratingCount: 1950,
    overview: "S.H.I.E.L.D director Nick Fury initiates the Avengers Initiative, assembling a team of legendary modern superheroes including Iron Man, Captain America, Thor, and the Hulk, to stop Thor's rogue brother Loki from invading Earth with an alien army.",
    tags: ["superheroes", "marvel-cinematic-universe", "alien-invasion", "teamwork", "action-blockbuster", "loki", "iron-man", "comic-book", "saving-earth"]
  },
  {
    id: 34,
    title: "Titanic",
    tagline: "Nothing on Earth could come between them.",
    genres: ["Drama", "Romance"],
    year: 1997,
    rating: 3.84,
    ratingCount: 2210,
    overview: "A young, wealthy aristocratic woman on the maid voyage of the massive, unsinkable R.M.S. Titanic falls deeply in love with a poor, bohemian free-spirited artist. Their secret romance is cut short when the ocean liner collides with a fatal iceberg.",
    tags: ["shipwreck", "iceberg", "tragic-love", "class-separation", "aristocrat-artist", "james-cameron", "ocean-liner", "historical-disaster", "leonardo-dicaprio"]
  },
  {
    id: 35,
    title: "Avatar",
    tagline: "Enter the World.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 2009,
    rating: 3.72,
    ratingCount: 2455,
    overview: "A paraplegic ex-marine is sent on a corporate mission to colonial alien forest moon Pandora to operate a brain-linked biological native body. He is embraced by the indigenous Na'vi tribe and forced to choose between human greed and their planet's life force.",
    tags: ["alien-planet", "navi-tribe", "biochemistry-forest", "james-cameron", "colonialism-critique", "glowing-flora", "mecha-suit-war", "ecological"]
  },
  {
    id: 36,
    title: "Alien",
    tagline: "In space, no one can hear you scream.",
    genres: ["Horror", "Sci-Fi"],
    year: 1979,
    rating: 4.31,
    ratingCount: 1610,
    overview: "The commercial deep-space mining spaceship Nostromo answers a mysterious distress beacon on a desolate moon, only to bring aboard a highly aggressive extraterrestrial parasite organism that stalks and systematically slaughter-kills the crew.",
    tags: ["xenomorph", "sci-fi-horror", "claustrophobic", "spaceship-nostromo", "sigourney-weaver", "ridley-scott", "parasite-alien", "facehugger", "haunted-house-in-space", "creature"]
  },
  {
    id: 37,
    title: "Back to the Future",
    tagline: "He's the only kid ever to get into trouble before he was born.",
    genres: ["Adventure", "Comedy", "Sci-Fi"],
    year: 1985,
    rating: 4.35,
    ratingCount: 2840,
    overview: "Marty McFly, a cool teenager, is accidentally sent back in time to 1955 in a plutonium-powered DeLorean time machine built by eccentric scientist Doc Brown. There, he must ensure his parents fall in love or he will cease to exist in 1985.",
    tags: ["time-travel", "delorean-time-machine", "eccentric-scientist", "1955-nostalgia", "high-schooler", "guitar-solo", "historical-timeline", "mother-attraction", "classic-comedy"]
  },
  {
    id: 38,
    title: "WALL-E",
    tagline: "He's got a lot of space to clean up.",
    genres: ["Animation", "Children", "Sci-Fi"],
    year: 2008,
    rating: 4.28,
    ratingCount: 1620,
    overview: "In the far future, a tiny, lonely rusty waste-collecting robot named WALL-E is left behind on an abandoned, garbage-smothered Earth. He falls in love with sleek probe robot EVE and triggers a journey into space to bring lazy fat humans back home.",
    tags: ["pixar", "garbage-cleanup-robot", "rusty-wall-e", "sleek-eve-probe", "environmental-message", "abandoned-earth", "silent-film-comedy", "fat-space-humans", "disney", "charming-animation"]
  },
  {
    id: 39,
    title: "Spirited Away",
    tagline: "Nothing that happens is ever forgotten, even if you can't remember.",
    genres: ["Animation", "Fantasy", "Children"],
    year: 2001,
    rating: 4.42,
    ratingCount: 1710,
    overview: "During her family's move to the suburbs, a moody young ten-year-old girl wanders into a strange abandoned amusement park. When her parents are turned into literal pigs, she must work in a bathhouse for mythical spirits and gods to win their freedom.",
    tags: ["studio-ghibli", "hayao-miyazaki", "spirit-bathhouse", "witch-yubaba", "no-face", "dragon-haku", "parent-rescue", "magical-fantasy", "japanese-folklore", "coming-of-age"]
  },
  {
    id: 40,
    title: "Monsters, Inc.",
    tagline: "We Scare Because We Care.",
    genres: ["Animation", "Children", "Comedy"],
    year: 2001,
    rating: 4.14,
    ratingCount: 1980,
    overview: "In the city of Monstropolis, scream-power energy is generated by scaring human children. When a tiny toddler girl named Boo accidentally slips past closet doors into the monster world, elite scarer Sulley and his best friend Mike must hide and return her.",
    tags: ["pixar", "monstropolis", "scream-energy", "scaring-closet-doors", "boo-toddler-girl", "mike-and-sulley", "disney-collaboration", "family-comedy", "monsters-scare"]
  },
  {
    id: 41,
    title: "Finding Nemo",
    tagline: "There are 3.7 trillion fish in the ocean. They're looking for one.",
    genres: ["Animation", "Children", "Comedy"],
    year: 2003,
    rating: 4.08,
    ratingCount: 2240,
    overview: "After a neurotic clownfish's adventurous son Nemo is captured from the Great Barrier Reef and put in a Sydney dentist's aquarium, the father Marlin treks across the vast ocean, joined by a cheerful blue tang with short-term memory loss, to find him.",
    tags: ["pixar", "barrier-reef-aquarium", "father-search", "doris-blue-fish", "vegetarian-sharks", "sea-turtles", "sydney-dentist", "disney", "coming-of-age", "underwater-adventure"]
  },
  {
    id: 42,
    title: "Up",
    tagline: "Fly away with balloons.",
    genres: ["Animation", "Children", "Drama", "Adventure"],
    year: 2009,
    rating: 4.22,
    ratingCount: 1840,
    overview: "To fulfill a lifelong travel promise to his deceased wife, elderly widower Carl Fredricksen ties thousands of helium balloons to his house, lifting off. He accidentally takes along an eager young Wilderness Explorer cub scout, steering to South America.",
    tags: ["pixar", "flying-house-balloons", "grief-healing", "south-america-falls", "elderly-man", "talking-dogs-collar", "russell-cub-scout", "adventure-journey", "disney"]
  },
  {
    id: 43,
    title: "The Truman Show",
    tagline: "On the air. Unaware.",
    genres: ["Comedy", "Drama", "Sci-Fi"],
    year: 1998,
    rating: 4.18,
    ratingCount: 1680,
    overview: "Truman Burbank is a positive insurance salesman who lives in an idyllic seaside town. He gradually becomes suspicious that his entire life is actually a highly orchestrated 24/7 television show watched by billions, and everyone he knows is an actor.",
    tags: ["live-television-show", "fake-dome-town", "surveillance-paranoia", "existential-crisis", "jim-carrey", "media-critique", "escape-boat", "staged-lives", "audience-ethics"]
  },
  {
    id: 44,
    title: "Eternal Sunshine of the Spotless Mind",
    tagline: "You can erase someone from your mind. Getting them out of your heart is another story.",
    genres: ["Drama", "Romance", "Sci-Fi"],
    year: 2004,
    rating: 4.26,
    ratingCount: 1485,
    overview: "After discovering his ex-girlfriend underwent an experimental clinical procedure to erase all painful memories of their relationship following a bad breakup, a heart-broken man undertakes the same process, only to realize he still wants to hold onto her in his dreams.",
    tags: ["memory-erasing", "experimental-clinic", "breakup-sorrow", "dreams-subconscious", "jim-carrey", "surrealist-romance", "non-linear", "philosophical-love", "kaufman"]
  },
  {
    id: 45,
    title: "Shutter Island",
    tagline: "Someone is missing.",
    genres: ["Drama", "Mystery", "Thriller"],
    year: 2010,
    rating: 4.24,
    ratingCount: 1615,
    overview: "In 1954, a troubled U.S. Marshal, Teddy Daniels, travels with his partner to a remote mental hospital for the criminally insane on Shutter Island to investigate the escape of a multiple-murderer patient, uncovering dark medical conspiracies and personal trauma.",
    tags: ["mental-asylum", "federal-marshal", "medical-conspiracies", "hallucinations-delusions", "martin-scorsese", "leonardo-dicaprio", "plot-twist-climax", "remote-island-ocean", "psychological"]
  },
  {
    id: 46,
    title: "Django Unchained",
    tagline: "Life, liberty, and the pursuit of vengeance.",
    genres: ["Action", "Drama", "Western"],
    year: 2012,
    rating: 4.30,
    ratingCount: 1720,
    overview: "Two years before the American Civil War, a freed slave named Django teams up with an eccentric German dentist turned bounty hunter to rescue his beloved enslaved wife Broomhilda from a brutal, wealthy Mississippi cotton plantation owner.",
    tags: ["slaves-freedom", "bounty-hunter", "german-dentist", "southern-plantation", "quentin-tarantino", "brutal-vengeance", "blood-shootout", "western-frontier", "jamie-foxx"]
  },
  {
    id: 47,
    title: "Pulp",
    tagline: "A low-life private investigator makes a mess.",
    genres: ["Comedy", "Crime", "Mystery"],
    year: 1972,
    rating: 3.51,
    ratingCount: 180,
    overview: "An eccentric writer of tacky trashy paperback pulp detective mystery novels is hired to ghost-write the autobiography of an aging movie actor known for playing gangsters, leading to actual assassinations and secret services chases.",
    tags: ["paperback-novels", "ghostwriter", "assassination-conspiracy", "pulp-fiction", "satirical-comedy", "private-investigator", "eccentric-characters"]
  },
  {
    id: 48,
    title: "Avatar: The Way of Water",
    tagline: "Return to Pandora.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 2022,
    rating: 4.02,
    ratingCount: 890,
    overview: "Jake Sully lives with his newfound family on the extrasolar moon Pandora. Once a familiar threat returns to finish what was started, Jake must work with Neytiri and the army of the Metkayina water tribe clan to protect their oceans.",
    tags: ["alien-planet", "water-world-sea", "metkayina-clan", "whales-tulkur", "james-cameron", "military-invasion", "family-protection", "advanced-graphics", "eco-preservation"]
  },
  {
    id: 49,
    title: "The Godfather: Part III",
    tagline: "Real power can't be given. It must be taken.",
    genres: ["Crime", "Drama"],
    year: 1990,
    rating: 3.61,
    ratingCount: 920,
    overview: "In the final installment of the mafia trilogy, an aging Michael Corleone seeks to legitimize his criminal family interests and remove himself completely from the violent underworld, only to be dragged back in by hot-headed nephew Vincent.",
    tags: ["mafia-legitimacy", "vatican-bank-corruption", "elderly-michael", "nephew-Vincent", "organized-crime", "opera-climax", "family-tragedy"]
  },
  {
    id: 50,
    title: "Alien: Resurrection",
    tagline: "It's cloning time, again.",
    genres: ["Horror", "Sci-Fi", "Action"],
    year: 1997,
    rating: 3.12,
    ratingCount: 780,
    overview: "Two hundred years after her death, officer Ellen Ripley is cloned by military scientists who extract the xenomorph alien queen from her chest. The aliens escape captivity on a spaceship, and Ripley must team up with Space Smugglers to stop them.",
    tags: ["cloning-human", "ellen-ripley-clone", "xenomorph-escape", "space-smugglers", "military-lab-scientists", "sci-fi-horror-action", "newborn-hybrid-creature"]
  }
];

// Complete TF-IDF and Cosine Similarity implementation in TypeScript!
const ENGLISH_STOP_WORDS = new Set([
  "a", "about", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along",
  "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another",
  "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became",
  "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside",
  "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co",
  "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each",
  "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every",
  "everyone", "everything", "everywhere", "except", "few", "fifteen", "fifty", "fill", "find", "fire", "first",
  "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give",
  "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon",
  "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", "if", "in", "inc", "indeed",
  "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd",
  "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move",
  "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no",
  "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one",
  "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part",
  "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious",
  "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone",
  "something", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "thank", "that", "the",
  "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therein", "thereupon",
  "these", "they", "thick", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru",
  "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until",
  "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever",
  "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while",
  "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would",
  "yet", "you", "your", "yours", "yourself", "yourselves"
]);

// Cleans a string and returns tokens
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove punctuation
    .split(/\s+/)
    .filter(word => word.length >= 3 && !ENGLISH_STOP_WORDS.has(word));
}

// Builds terms for each movie (genres, tagline, overview, tags)
export function getMovieWords(movie: Movie): string[] {
  const content = [
    ...movie.genres.map(g => g.toLowerCase()),
    ...tokenize(movie.tagline),
    ...tokenize(movie.overview),
    ...movie.tags
  ];
  return content;
}

export interface RecommendationResult {
  movie: Movie;
  score: number;
  matchedTerms: string[];
}

export function computeRecommendations(selectedMovieId: number, count: number = 5): RecommendationResult[] {
  const selectedMovie = MOVIES_DATA.find(m => m.id === selectedMovieId);
  if (!selectedMovie) return [];

  // TF-IDF algorithm
  // 1. Tokenize all movies and build document list
  const allMovieWords = MOVIES_DATA.map(m => getMovieWords(m));

  // 2. Build global vocabulary
  const vocabSet = new Set<string>();
  allMovieWords.forEach(words => words.forEach(w => vocabSet.add(w)));
  const vocab = Array.from(vocabSet);
  const wordToIndex = new Map<string, number>();
  vocab.forEach((w, i) => wordToIndex.set(w, i));

  const N = MOVIES_DATA.length;

  // 3. Compute Document Frequency (DF) for each word
  const df = new Array(vocab.length).fill(0);
  allMovieWords.forEach(words => {
    const uniqueInDoc = new Set(words);
    uniqueInDoc.forEach(word => {
      const idx = wordToIndex.get(word);
      if (idx !== undefined) df[idx]++;
    });
  });

  // 4. Compute Inverse Document Frequency (IDF) with smoothing
  const idf = df.map(val => Math.log(1 + N / (1 + val)));

  // 5. Compute TF-IDF Vectors for all movies
  const vectors = MOVIES_DATA.map((movie, mIdx) => {
    const words = allMovieWords[mIdx];
    const termCounts = new Map<string, number>();
    words.forEach(w => termCounts.set(w, (termCounts.get(w) || 0) + 1));

    // Vector size is vocab.length
    const vec = new Array(vocab.length).fill(0);
    termCounts.forEach((count, word) => {
      const wIdx = wordToIndex.get(word);
      if (wIdx !== undefined) {
        // TF-IDF = Term Frequency * IDF
        vec[wIdx] = count * idf[wIdx];
      }
    });

    // Euclidean length of vector (L2 norm) for cosine similarity normalization
    let sumSquares = 0;
    for (let i = 0; i < vec.length; i++) {
      sumSquares += vec[i] * vec[i];
    }
    const magnitude = Math.sqrt(sumSquares);

    // Normalize
    const normalizedVec = magnitude > 0 ? vec.map(val => val / magnitude) : vec;

    return {
      movieId: movie.id,
      vector: normalizedVec,
      words: Array.from(termCounts.keys())
    };
  });

  const targetVectorObj = vectors.find(v => v.movieId === selectedMovieId);
  if (!targetVectorObj) return [];

  const targetVec = targetVectorObj.vector;

  // 6. Calculate Cosine Similarity
  const results: RecommendationResult[] = [];

  vectors.forEach((vObj, idx) => {
    if (vObj.movieId === selectedMovieId) return; // skip self

    const otherMovie = MOVIES_DATA[idx];
    const otherVec = vObj.vector;

    // Dot product (since vectors are L2 normalized, similarity is just dot product)
    let dotProduct = 0;
    for (let i = 0; i < targetVec.length; i++) {
      dotProduct += targetVec[i] * otherVec[i];
    }

    // Identify matched words (words that exist in both and contribute to similarity)
    const matchedTerms: string[] = [];
    const targetWords = new Set(targetVectorObj.words);
    vObj.words.forEach(w => {
      if (targetWords.has(w)) {
        matchedTerms.push(w);
      }
    });

    results.push({
      movie: otherMovie,
      score: Math.min(1.0, Math.max(0.0, dotProduct)), // Clip 0 to 1
      matchedTerms: matchedTerms.slice(0, 5) // Show top 5 features
    });
  });

  // Sort by score descending and return top `count`
  return results.sort((a, b) => b.score - a.score).slice(0, count);
}

// EDA Statistics helpers
export interface GenreCount {
  genre: string;
  count: number;
}

export function getGenreCounts(): GenreCount[] {
  const counts: Record<string, number> = {};
  MOVIES_DATA.forEach(m => {
    m.genres.forEach(g => {
      counts[g] = (counts[g] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count);
}

export interface RatingRangeCount {
  range: string;
  count: number;
}

export function getRatingDistribution(): RatingRangeCount[] {
  const ranges = {
    "3.0 - 3.4": 0,
    "3.5 - 3.8": 0,
    "3.9 - 4.2": 0,
    "4.3 - 4.5": 0,
    "4.6 - 5.0": 0,
  };

  MOVIES_DATA.forEach(m => {
    if (m.rating >= 3.0 && m.rating < 3.5) ranges["3.0 - 3.4"]++;
    else if (m.rating >= 3.5 && m.rating < 3.9) ranges["3.5 - 3.8"]++;
    else if (m.rating >= 3.9 && m.rating < 4.3) ranges["3.9 - 4.2"]++;
    else if (m.rating >= 4.3 && m.rating < 4.6) ranges["4.3 - 4.5"]++;
    else if (m.rating >= 4.6 && m.rating <= 5.0) ranges["4.6 - 5.0"]++;
  });

  return Object.entries(ranges).map(([range, count]) => ({ range, count }));
}

export function getMostPopularMovies(count: number = 7): Movie[] {
  return [...MOVIES_DATA]
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, count);
}
