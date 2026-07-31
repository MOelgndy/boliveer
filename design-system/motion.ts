export const easeOut = [0.22, 1, 0.36, 1] as const;

export const mount = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.42, ease: easeOut },
};

export const fadeRise = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.45, ease: easeOut },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.06 } },
  viewport: { once: true, margin: "-8% 0px" },
};

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeOut },
};
