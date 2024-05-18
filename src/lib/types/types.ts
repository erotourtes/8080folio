export type TUserProfile = {
  isNewUser: boolean;
  bio: string;
  email: string | null;
  githubId: string;
  name: string;
  avatarUrl: string;
  publicReposNumber: number;
  reposUrl: string;
  username?: string | null;
};
