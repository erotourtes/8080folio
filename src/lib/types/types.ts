import { type components } from '@octokit/openapi-types';

export type TGithubUser = components['schemas']['public-user'];

export type TGithubRepo = components['schemas']['repository'];

export type TFirebaseRepo = {
  html_url: string;
  languages_url: string;
  collaborators_url: string;
  stargazers_count: number;
  created_at: string | null;
};

export type TFirebaseUser = {
  bio: string | null;
  blog: string | null;
  public_repos: number;
  total_private_repos?: number;
  repos_url: string;
};
