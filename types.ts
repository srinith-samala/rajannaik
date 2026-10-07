
export type Language = 'en' | 'mr';

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  icon: string;
  category: 'Critical' | 'Public Utility' | 'Social';
}

export interface IssueCategory {
  id: string;
  label: string;
  icon: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}
