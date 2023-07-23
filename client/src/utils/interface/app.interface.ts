export interface HeaderSearchProps {
  links: {
    link: string;
    label: string;
  }[];
}

export interface FeedInterface {
  post: { userId: number; id: Number; title: string; body: string };
}
