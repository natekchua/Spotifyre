export type User = {
  id: string;
  followers: Followers;
  images: UserImage[];
  display_name: string;
}

export type UserImage = {
  url: string;
}

export type Followers = {
  total: number;
}