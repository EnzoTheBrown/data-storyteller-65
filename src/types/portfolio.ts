export interface Company {
  name: string;
  description: string;
  sectors: string[];
  location: string;
  website: string;
}

export interface ProjectPeriod {
  start_date: string;
  end_date: string | null;
}

export interface ProjectLink {
  type: string;
  label: string;
  url: string;
}

export interface Project {
  name: string;
  period: ProjectPeriod;
  description: string;
  responsibilities: string[];
  tech_stack: string[];
  impact: string;
  links: ProjectLink[];
}

export interface Experience {
  id: string;
  title: string;
  employment_type: string;
  level: string;
  start_date: string;
  end_date: string | null;
  summary: string;
  location: string;
  company: Company;
  projects: Project[];
}

export interface Institution {
  name: string;
  description: string;
  location: string;
  website: string;
}

export interface Education {
  id: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  grade: string | null;
  summary: string;
  location: string;
  institution: Institution;
  projects: Project[];
}
