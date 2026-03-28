export interface FileEntry {
  quality: '1080p' | '720p' | '480p';
  size_bytes: number;
  duration_s: number;
  mime_type: string;
  subtitle_files: SubtitleEntry[];
}

export interface SubtitleEntry {
  lang: string;
  label: string;
  path: string;
}

export interface Episode {
  episode_slug: string;
  title: string;
  season: number;
  episode: number;
  duration_s: number;
  subtitle_files: SubtitleEntry[];
}

export interface Content {
  slug: string;
  title: string;
  year: number;
  type: 'movie' | 'series';
  tmdb_id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: string[];
  cast: string[];
  rating: number;
  status: 'available' | 'broken' | 'processing';
  files?: FileEntry[];
  seasons?: { season: number; episodes: Episode[] }[];
}

export interface StreamToken {
  token: string;
  expires_in: number;
}

export interface PaginatedContent {
  items: Content[];
  total: number;
  page: number;
  per_page: number;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}