export type GalleryItem = { label: string; src: string };

export type ManualImages = {
  cover: string;
  pageSpread: string;
  progression: string;
  methodology: string;
  exercise: string;
};

export type VideoCategoryMedia = {
  id: string;
  image: string;
  videoUrl: string;
};

export type BlogMedia = {
  slug: string;
  image: string;
};

export type PageImages = {
  about: { hero: string; portrait: string };
  system: { hero: string };
  blog: { hero: string };
  videoLibrary: { hero: string };
  affiliate: { hero: string };
};

export type StarAthleteImages = {
  portraitBlue: string;
  portraitWinner: string;
  goldTrophy: string;
  duo: string;
};

export type SiteMedia = {
  hero: {
    main: string;
    leftTop: string;
    leftBottom: string;
    rightTop: string;
    rightBottom: string;
  };
  parallaxBand: string;
  gallery: GalleryItem[];
  problem: string[];
  solution: string[];
  programs: string[];
  manual: ManualImages;
  author: string;
  systemPageHero: string;
  star: StarAthleteImages;
  pages: PageImages;
  videoCategories: VideoCategoryMedia[];
  blog: BlogMedia[];
};
