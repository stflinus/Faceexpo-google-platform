
export enum UserRole {
  ARTIST = 'ARTIST',
  FAN = 'FAN'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  avatarUrl: string;
  bio?: string;
  fanCount: number;
  followingCount: number;
  joinedDate: string;
  fannedArtistIds: string[]; // List of artist IDs this user is a fan of
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  title: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  tags: string[];
  createdAt: string;
  fanCount: number; // Snapshot of artist fans at time of post or specific engagement
  comments: Comment[];
}

export interface ContestEntry {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: 'BEST_IN_SHOW' | 'FUNNIEST_VIDEO';
  votes: number;
  title: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}
