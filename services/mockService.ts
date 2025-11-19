import { Post, User, UserRole, Comment } from '../types';

// Mock Data
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'NeonVibes',
    role: UserRole.ARTIST,
    avatarUrl: 'https://picsum.photos/100/100?random=1',
    bio: 'Digital artist creating cyber-reality.',
    fanCount: 1240,
    followingCount: 5,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    username: 'BeatMakerPro',
    role: UserRole.ARTIST,
    avatarUrl: 'https://picsum.photos/100/100?random=2',
    bio: 'Synthwave producer. Future sounds.',
    fanCount: 8900,
    followingCount: 20,
    joinedDate: '2023-03-10'
  },
  {
    id: '3',
    username: 'FanBoy01',
    role: UserRole.FAN,
    avatarUrl: 'https://picsum.photos/100/100?random=3',
    fanCount: 0,
    followingCount: 45,
    joinedDate: '2023-06-20'
  }
];

const MOCK_POSTS: Post[] = [
  {
    id: '101',
    artistId: '1',
    artistName: 'NeonVibes',
    artistAvatar: 'https://picsum.photos/100/100?random=1',
    title: 'Cyberpunk City 2077',
    mediaUrl: 'https://picsum.photos/800/600?random=10',
    mediaType: 'image',
    tags: ['cyberpunk', 'art', 'neon'],
    createdAt: new Date().toISOString(),
    fanCount: 1240,
    comments: [
      { id: 'c1', userId: '3', username: 'FanBoy01', text: 'This is incredible!', createdAt: new Date().toISOString() }
    ]
  },
  {
    id: '102',
    artistId: '2',
    artistName: 'BeatMakerPro',
    artistAvatar: 'https://picsum.photos/100/100?random=2',
    title: 'Studio Session - Night Shift',
    mediaUrl: 'https://picsum.photos/800/600?random=11',
    mediaType: 'image',
    tags: ['music', 'studio', 'synth'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    fanCount: 8900,
    comments: []
  },
    {
    id: '103',
    artistId: '1',
    artistName: 'NeonVibes',
    artistAvatar: 'https://picsum.photos/100/100?random=1',
    title: 'Glitch in the Matrix',
    mediaUrl: 'https://picsum.photos/800/600?random=12',
    mediaType: 'image',
    tags: ['glitch', 'abstract'],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    fanCount: 1250,
    comments: []
  }
];

// Service Methods
export const MockService = {
  login: async (username: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate latency
    const user = MOCK_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user) return user;
    
    // Auto-create user for demo if not found
    const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        role: UserRole.ARTIST, // Default to Artist for demo
        avatarUrl: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 100)}`,
        fanCount: 0,
        followingCount: 0,
        joinedDate: new Date().toISOString(),
        bio: 'New to FaceExpo!'
    };
    MOCK_USERS.push(newUser);
    return newUser;
  },

  getFeed: async (): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...MOCK_POSTS];
  },

  getArtistPosts: async (artistId: string): Promise<Post[]> => {
     await new Promise(resolve => setTimeout(resolve, 400));
     return MOCK_POSTS.filter(p => p.artistId === artistId);
  },

  getUser: async (userId: string): Promise<User | undefined> => {
      return MOCK_USERS.find(u => u.id === userId);
  },

  createPost: async (post: Omit<Post, 'id' | 'createdAt' | 'comments' | 'fanCount'>, user: User): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPost: Post = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        comments: [],
        fanCount: user.fanCount,
        ...post
    };
    MOCK_POSTS.unshift(newPost);
    return newPost;
  },

  becomeFan: async (artistId: string): Promise<number> => {
     // Simulate toggle fan
     const artist = MOCK_USERS.find(u => u.id === artistId);
     if (artist) {
         artist.fanCount += 1;
         return artist.fanCount;
     }
     return 0;
  }
};