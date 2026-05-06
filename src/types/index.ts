export interface Identity {
  name: string;
  avatar?: string;
  role: string;
  location: string;
  availability: 'looking' | 'open' | 'not-looking';
  preferences: string[];
}

export interface Capability {
  id: string;
  name: string;
  level: 'expert' | 'strong' | 'moderate' | 'basic';
  category: string;
  evidenceIds: string[];
  description: string;
}

export interface Evidence {
  id: string;
  type: 'company' | 'project' | 'education' | 'certificate' | 'portfolio';
  title: string;
  organization: string;
  period: string;
  description: string;
  capabilities: string[];
  links?: string[];
}

export interface Boundaries {
  strong: string[];
  moderate: string[];
  weak: string[];
  collaboration: string[];
}

export interface MatchingProfile {
  idealProjects: string[];
  avoidProjects: string[];
  independenceLevel: string;
  riskFactors: string[];
  salaryRange?: [number, number];
}

export interface AgentMeta {
  accessToken: string;
  permissionScope: string[];
  expiresAt?: Date;
  instructions: string;
  humanViewUrl: string;
  agentProfileUrl: string;
  structuredJsonUrl: string;
}

export interface TalentGraphData {
  id: string;
  identity: Identity;
  capabilities: Capability[];
  evidence: Evidence[];
  boundaries: Boundaries;
  matching: MatchingProfile;
  agentMeta: AgentMeta;
  rawResume: string;
  createdAt: Date;
}

export interface MatchingResult {
  overallScore: number;
  strengths: { capability: string; evidence: string }[];
  gaps: string[];
  risks: string[];
  recommendation: 'highly-recommended' | 'recommended' | 'consider' | 'not-recommended';
  collaborationSuggestion: string;
  detailedAnalysis: string;
}

export interface GraphNode {
  id: string;
  label: string;
  layer: 'center' | 'identity' | 'capability' | 'evidence';
  category?: string;
  level?: number;
  x?: number;
  y?: number;
  connections?: string[];
}

export interface GraphLink {
  source: string;
  target: string;
  strength: number;
}
