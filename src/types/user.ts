// types/user.ts
export type User = {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
};

export type UserSettings = {
  themePreference: 'light' | 'dark' | 'system';
  notificationEnabled: boolean;
  defaultView: 'calendar' | 'list';
};