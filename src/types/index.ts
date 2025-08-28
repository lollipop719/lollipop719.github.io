export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface MediaItem {
  title: string;
  creator: string;
  year: string;
  rating: number;
  review: string;
  coverUrl: string;
  genre: string;
}

export interface SkillBubble {
  name: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  isHovered: boolean;
}
