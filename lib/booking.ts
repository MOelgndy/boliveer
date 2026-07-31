/**
 * Demo booking adapter — calendar provider later (Cal.com / custom).
 */

export type BookingSlot = {
  id: string;
  label: string;
  startsAt: string;
};

export type BookingProvider = {
  listSlots: () => Promise<BookingSlot[]>;
  getEmbedUrl: (locale: string) => string | null;
};

const enabled = process.env.NEXT_PUBLIC_FLAG_BOOKING === "1";
const embedBase = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

export const bookingProvider: BookingProvider = {
  async listSlots() {
    if (!enabled) return [];
    // Placeholder slots until a calendar API is wired.
    const now = Date.now();
    return [1, 2, 3].map((offset) => {
      const startsAt = new Date(now + offset * 24 * 60 * 60 * 1000).toISOString();
      return {
        id: `slot-${offset}`,
        label: startsAt.slice(0, 16).replace("T", " "),
        startsAt,
      };
    });
  },
  getEmbedUrl(locale) {
    if (!enabled || !embedBase) return null;
    return `${embedBase}?locale=${locale}`;
  },
};

export function isBookingEnabled() {
  return enabled;
}
