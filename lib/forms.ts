"use server";

import { z } from "zod";

export type FormResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export type FormChannel =
  | "contact"
  | "support"
  | "demo"
  | "partnership"
  | "enterprise"
  | "newsletter"
  | "careers";

export type FormPayload = {
  channel: FormChannel;
  data: Record<string, unknown>;
  locale: string;
  receivedAt: string;
};

/**
 * Provider boundary — swap console for Resend/CRM/webhook without changing forms.
 */
export async function submitFormPayload(
  payload: FormPayload,
): Promise<FormResult> {
  const endpoint = process.env.FORM_WEBHOOK_URL;

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return {
        ok: false,
        message: "Delivery failed. Please try again shortly.",
      };
    }
    return { ok: true, message: "Received. Our team will respond soon." };
  }

  // Adapter stub: persist-ready boundary for local/dev without a webhook.
  console.info("[boliveer:form]", JSON.stringify(payload));
  return { ok: true, message: "Received. Our team will respond soon." };
}

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  topic: z.string().min(2).max(80),
  message: z.string().min(10).max(5000),
  locale: z.string(),
});

const demoSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().min(2).max(160),
  role: z.string().min(2).max(120),
  interest: z.string().min(2).max(160),
  notes: z.string().max(5000).optional(),
  locale: z.string(),
  bookingSlot: z.string().optional(),
});

const partnershipSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().min(2).max(160),
  partnerType: z.string().min(2).max(120),
  message: z.string().min(10).max(5000),
  locale: z.string(),
});

const enterpriseSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().min(2).max(160),
  scale: z.string().min(2).max(120),
  needs: z.string().min(10).max(5000),
  locale: z.string(),
});

const newsletterSchema = z.object({
  email: z.string().email(),
  locale: z.string(),
});

const careersSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  role: z.string().min(2).max(160),
  linkedin: z.string().url().optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
  locale: z.string(),
});

function fail(error: z.ZodError, fallback: string): FormResult {
  return {
    ok: false,
    message: fallback,
    fieldErrors: error.flatten().fieldErrors as Record<string, string[]>,
  };
}

export async function submitContact(
  input: z.infer<typeof contactSchema>,
): Promise<FormResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error, "Please check the form.");
  return submitFormPayload({
    channel: "contact",
    data: parsed.data,
    locale: parsed.data.locale,
    receivedAt: new Date().toISOString(),
  });
}

export async function submitSupport(
  input: z.infer<typeof contactSchema>,
): Promise<FormResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error, "Please check the form.");
  return submitFormPayload({
    channel: "support",
    data: parsed.data,
    locale: parsed.data.locale,
    receivedAt: new Date().toISOString(),
  });
}

export async function submitDemo(
  input: z.infer<typeof demoSchema>,
): Promise<FormResult> {
  const parsed = demoSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error, "Please check the form.");
  return submitFormPayload({
    channel: "demo",
    data: parsed.data,
    locale: parsed.data.locale,
    receivedAt: new Date().toISOString(),
  });
}

export async function submitPartnership(
  input: z.infer<typeof partnershipSchema>,
): Promise<FormResult> {
  const parsed = partnershipSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error, "Please check the form.");
  return submitFormPayload({
    channel: "partnership",
    data: parsed.data,
    locale: parsed.data.locale,
    receivedAt: new Date().toISOString(),
  });
}

export async function submitEnterprise(
  input: z.infer<typeof enterpriseSchema>,
): Promise<FormResult> {
  const parsed = enterpriseSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error, "Please check the form.");
  return submitFormPayload({
    channel: "enterprise",
    data: parsed.data,
    locale: parsed.data.locale,
    receivedAt: new Date().toISOString(),
  });
}

export async function submitNewsletter(
  input: z.infer<typeof newsletterSchema>,
): Promise<FormResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error, "Enter a valid email.");
  return submitFormPayload({
    channel: "newsletter",
    data: { ...parsed.data, doubleOptInReady: true },
    locale: parsed.data.locale,
    receivedAt: new Date().toISOString(),
  });
}

export async function submitCareer(
  input: z.infer<typeof careersSchema>,
): Promise<FormResult> {
  const parsed = careersSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error, "Please check the form.");
  return submitFormPayload({
    channel: "careers",
    data: parsed.data,
    locale: parsed.data.locale,
    receivedAt: new Date().toISOString(),
  });
}
