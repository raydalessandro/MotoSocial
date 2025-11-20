// Core data models per MotoSocial
// Social network per motociclisti italiani

export type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  motoModel?: string;
  location?: string;
  avatarUrl?: string;
  coverPhotoUrl?: string;
  followersCount: number;
  followingCount: number;
  routesCount: number;
  createdAt: string;
};

export type Post = {
  id: string;
  authorId: string;
  type: 'text' | 'photo' | 'route' | 'event';
  content: string;
  photos?: string[];
  routeId?: string;
  eventId?: string;
  visibility: 'public' | 'followers' | 'private';
  likes: string[];
  comments: Comment[];
  shares: number;
  createdAt: string;
};

export type Route = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  gpxUrl?: string;
  distance: number;
  duration?: number;
  elevationGain?: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  points: Array<{ lat: number; lng: number }>;
  visibility: 'public' | 'followers' | 'private';
  stats: {
    views: number;
    likes: number;
    downloads: number;
  };
  createdAt: string;
};

export type Event = {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  startDate: string;
  meetingPoint: { lat: number; lng: number };
  meetingAddress: string;
  routeId?: string;
  participants: string[];
  maxParticipants?: number;
  visibility: 'public' | 'followers' | 'invite';
  createdAt: string;
};
