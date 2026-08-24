export const videoCategories = [
  {
    id: "speed",
    title: "Speed",
    description: "Linear and multi-directional speed development for court coverage",
    count: 48,
  },
  {
    id: "agility",
    title: "Agility",
    description: "Change-of-direction and reactive movement patterns",
    count: 52,
  },
  {
    id: "strength",
    title: "Strength",
    description: "Age-appropriate strength progressions for junior athletes",
    count: 64,
  },
  {
    id: "coordination",
    title: "Coordination",
    description: "Motor skill development and neuromuscular coordination",
    count: 36,
  },
  {
    id: "movement-skills",
    title: "Movement Skills",
    description: "Fundamental movement patterns for athletic development",
    count: 42,
  },
  {
    id: "tennis-conditioning",
    title: "Tennis Specific Conditioning",
    description: "Court-specific energy system and work capacity training",
    count: 56,
  },
  {
    id: "warm-up",
    title: "Warm-Up Systems",
    description: "Structured activation and preparation protocols",
    count: 28,
  },
] as const;

export const systemComponents = [
  {
    title: "Performance System Manual™",
    subtitle: "The Foundation of the Entire System",
    description:
      "The foundational guide explaining methodology, principles, progressions and complete system implementation.",
    icon: "manual",
  },
  {
    title: "Video Exercise Library™",
    subtitle: "300+ Professional Demonstrations",
    description:
      "Comprehensive exercise library with coaching cues, progressions and age-specific modifications.",
    icon: "video",
  },
  {
    title: "Training Methodology",
    subtitle: "Science-Based Framework",
    description:
      "Periodization models, load management and long-term athlete development principles.",
    icon: "methodology",
  },
  {
    title: "Personalized Programs™",
    subtitle: "Tailored Development Plans",
    description:
      "Custom programming for individual players, academies and competitive pathways.",
    icon: "programs",
  },
  {
    title: "Coach Resources™",
    subtitle: "Education & Implementation",
    description:
      "Coach education materials, assessment tools and implementation guides.",
    icon: "coach",
  },
] as const;

export const problemPoints = [
  {
    title: "No Progression",
    description: "Random exercises without age-appropriate developmental stages",
    stat: "73%",
    statLabel: "of junior programs lack structured progressions",
  },
  {
    title: "No Structure",
    description: "Disconnected training sessions without periodization",
    stat: "68%",
    statLabel: "train without systematic planning",
  },
  {
    title: "No Long-Term Vision",
    description: "Short-term fixes instead of athlete development pathways",
    stat: "81%",
    statLabel: "ignore LTAD principles",
  },
] as const;

export const programTypes = [
  {
    title: "Junior Player Programs",
    description:
      "Age-specific physical development pathways for competitive junior players from foundation to elite levels.",
    features: [
      "U10–U12 Foundation Phase",
      "U14–U16 Development Phase",
      "U16+ Performance Phase",
      "Individual assessment protocols",
    ],
    cta: "Explore Player Programs",
  },
  {
    title: "Academy Programs",
    description:
      "Complete system integration for tennis academies seeking standardized physical development across all age groups.",
    features: [
      "Academy-wide implementation",
      "Coach training workshops",
      "Assessment & monitoring systems",
      "Seasonal periodization plans",
    ],
    cta: "Request Academy Demo",
  },
  {
    title: "Coach Consultation",
    description:
      "Direct access to expert guidance for implementing the system within your coaching environment.",
    features: [
      "1-on-1 methodology sessions",
      "Program design review",
      "Implementation support",
      "Ongoing mentorship",
    ],
    cta: "Book Consultation",
  },
] as const;
