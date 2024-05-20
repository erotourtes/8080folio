export type TUserProfile = {
  bio: string;
  email: string | null;
  githubId: number;
  name: string;
  avatarUrl: string;
  publicReposNumber: number;
  reposUrl: string;
  username?: string | null;
};
