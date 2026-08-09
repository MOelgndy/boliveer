export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeCinematic = [0.22, 1, 0.36, 1] as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 120,
  damping: 22,
  mass: 0.9,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
};

/** Compositor-only properties (opacity, transform). Never filter/width/height. */

export const mount = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeCinematic },
};

export const cinematicReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.8, ease: easeCinematic },
};

export const fadeRise = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, ease: easeCinematic },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-8% 0px" },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeCinematic },
};
