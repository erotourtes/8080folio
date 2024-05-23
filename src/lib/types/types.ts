import { type components } from '@octokit/openapi-types';

export type TGithubContributor = components['schemas']['contributor'];
export type TGithubLanguage = components['schemas']['language'];
export type TGithubRepo = components['schemas']['repository'];

export type TFirebaseContributor = {
  contributions: number;
  html_url: string | null;
  login: string | null;
  avatar_url: string | null;
};

export type TFirebaseRepo = {
  html_url: string;
  languages: TGithubLanguage | null;
  contributors: TFirebaseContributor[] | null;
  stargazers_count: number;
  created_at: string | null;
};

export type TFirebaseUser = {
  bio: string | null;
  blog: string | null;
  username: string;
  html_url: string;
  name: string | null;
  created_at: string;
  public_repos: number;
  total_private_repos?: number;
  repos_url: string;
};
