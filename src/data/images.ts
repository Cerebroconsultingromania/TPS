/**
 * Tennis-only imagery — juniors, courts, on-court training.
 * Sources: Pexels, Unsplash (verified), Wikimedia Commons.
 */

type ImageKey =
  | "parallax"
  | "courtBlue"
  | "juniorGirl"
  | "juniorMatch"
  | "juniorGroup"
  | "racketCourt"
  | "tennisAction"
  | "juniorCoach";

const SOURCES: Record<ImageKey, (width: number) => string> = {
  /** Aerial / overhead blue hard court — parallax hero */
  parallax: (w) =>
    `https://images.pexels.com/photos/5739494/pexels-photo-5739494.jpeg?auto=compress&cs=tinysrgb&w=${w}`,
  /** Blue tournament court from above */
  courtBlue: () =>
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Tennis_court_at_the_Indian_Wells_Masters.jpg/1920px-Tennis_court_at_the_Indian_Wells_Masters.jpg",
  /** Junior girl on outdoor court */
  juniorGirl: (w) =>
    `https://images.pexels.com/photos/8224492/pexels-photo-8224492.jpeg?auto=compress&cs=tinysrgb&w=${w}`,
  /** U.S. Open Juniors match */
  juniorMatch: () =>
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Taylor_Townsend_tennis.jpg/1280px-Taylor_Townsend_tennis.jpg",
  /** Junior tennis academy group */
  juniorGroup: () =>
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Children%27s_tennis_group%2C_Anguilla_%287457275146%29.jpg/1280px-Children%27s_tennis_group%2C_Anguilla_%287457275146%29.jpg",
  /** Racket & ball on court (Unsplash — loads reliably) */
  racketCourt: (w) =>
    `https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=${w}&q=80`,
  /** Player hitting on clay court */
  tennisAction: (w) =>
    `https://images.pexels.com/photos/3666119/pexels-photo-3666119.jpeg?auto=compress&cs=tinysrgb&w=${w}`,
  /** Coach with junior on court */
  juniorCoach: (w) =>
    `https://images.pexels.com/photos/6284875/pexels-photo-6284875.jpeg?auto=compress&cs=tinysrgb&w=${w}`,
};

export function siteImage(key: ImageKey, width = 800): string {
  return SOURCES[key](width);
}

export const siteImages = {
  hero: {
    /** Junior on-court training — not the blue parallax court */
    main: siteImage("tennisAction", 1920),
    leftTop: siteImage("juniorGirl", 800),
    leftBottom: siteImage("juniorMatch", 800),
    rightTop: siteImage("tennisAction", 800),
    rightBottom: siteImage("juniorGroup", 800),
  },
  gallery: [
    { src: siteImage("juniorGirl", 600), label: "Agility" },
    { src: siteImage("juniorMatch", 600), label: "Strength" },
    { src: siteImage("tennisAction", 600), label: "Speed" },
    { src: siteImage("racketCourt", 600), label: "Conditioning" },
  ],
  problem: [
    siteImage("courtBlue", 800),
    siteImage("juniorCoach", 800),
    siteImage("juniorGroup", 800),
  ],
  solution: [
    siteImage("racketCourt", 800),
    siteImage("juniorGirl", 800),
    siteImage("tennisAction", 800),
    siteImage("juniorMatch", 800),
    siteImage("juniorCoach", 800),
  ],
  programs: [
    siteImage("juniorGirl", 800),
    siteImage("juniorGroup", 800),
    siteImage("juniorCoach", 800),
  ],
  manual: {
    cover: siteImage("courtBlue", 800),
    pageSpread: siteImage("juniorMatch", 600),
    progression: siteImage("juniorGirl", 400),
    methodology: siteImage("tennisAction", 400),
    exercise: siteImage("racketCourt", 400),
  },
} as const;

/** Author / about — coach with juniors on court */
export const authorImage = siteImage("juniorCoach", 800);
