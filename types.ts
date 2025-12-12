export interface BlogPost {
  title: string;
  content: string;
  tags: string[];
  generatedAt: string;
}

export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  WRITER = 'WRITER',
  ANALYTICS = 'ANALYTICS',
  COMMUNITY = 'COMMUNITY'
}

export interface UserState {
  isPremium: boolean;
  name: string | null;
}