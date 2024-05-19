import { type ImportMetaEnv } from '../../vite.env';

export const getConfig = (key: keyof ImportMetaEnv): string => {
  return import.meta.env[key];
};
