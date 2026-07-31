"use client";

import { ActionForm } from "./ActionForm";
import {
  submitCareer,
  submitContact,
  submitDemo,
  submitEnterprise,
  submitPartnership,
  submitSupport,
} from "@/lib/forms";
import { isBookingEnabled } from "@/lib/booking";

export function ContactForm({
  locale,
  successMessage,
}: {
  locale: string;
  successMessage: string;
}) {
  return (
    <ActionForm
      locale={locale}
      successMessage={successMessage}
      fields={[
        { name: "name", labelKey: "name", type: "text", required: true },
        { name: "email", labelKey: "email", type: "email", required: true },
        { name: "topic", labelKey: "topic", type: "text", required: true },
        { name: "message", labelKey: "message", type: "textarea", required: true },
      ]}
      onSubmit={(data) =>
        submitContact({
          name: data.name,
          email: data.email,
          topic: data.topic,
          message: data.message,
          locale: data.locale,
        })
      }
    />
  );
}

export function SupportForm({
  locale,
  successMessage,
}: {
  locale: string;
  successMessage: string;
}) {
  return (
    <ActionForm
      locale={locale}
      successMessage={successMessage}
      fields={[
        { name: "name", labelKey: "name", type: "text", required: true },
        { name: "email", labelKey: "email", type: "email", required: true },
        { name: "topic", labelKey: "topic", type: "text", required: true },
        { name: "message", labelKey: "message", type: "textarea", required: true },
      ]}
      onSubmit={(data) =>
        submitSupport({
          name: data.name,
          email: data.email,
          topic: data.topic,
          message: data.message,
          locale: data.locale,
        })
      }
    />
  );
}

export function DemoForm({
  locale,
  successMessage,
  slots = [],
}: {
  locale: string;
  successMessage: string;
  slots?: { id: string; label: string }[];
}) {
  const booking = isBookingEnabled() && slots.length > 0;
  return (
    <ActionForm
      locale={locale}
      successMessage={successMessage}
      fields={[
        { name: "name", labelKey: "name", type: "text", required: true },
        { name: "email", labelKey: "email", type: "email", required: true },
        { name: "company", labelKey: "company", type: "text", required: true },
        { name: "role", labelKey: "role", type: "text", required: true },
        { name: "interest", labelKey: "interest", type: "text", required: true },
        ...(booking
          ? [
              {
                name: "bookingSlot",
                labelKey: "notes",
                type: "select" as const,
                options: slots.map((s) => ({ value: s.id, label: s.label })),
              },
            ]
          : []),
        { name: "notes", labelKey: "notes", type: "textarea" },
      ]}
      onSubmit={(data) =>
        submitDemo({
          name: data.name,
          email: data.email,
          company: data.company,
          role: data.role,
          interest: data.interest,
          notes: data.notes,
          bookingSlot: data.bookingSlot,
          locale: data.locale,
        })
      }
    />
  );
}

export function PartnershipForm({
  locale,
  successMessage,
}: {
  locale: string;
  successMessage: string;
}) {
  return (
    <ActionForm
      locale={locale}
      successMessage={successMessage}
      fields={[
        { name: "name", labelKey: "name", type: "text", required: true },
        { name: "email", labelKey: "email", type: "email", required: true },
        { name: "company", labelKey: "company", type: "text", required: true },
        {
          name: "partnerType",
          labelKey: "partnerType",
          type: "select",
          required: true,
          options: [
            { value: "technology", label: "Technology" },
            { value: "go-to-market", label: "Go-to-market" },
            { value: "ecosystem", label: "Ecosystem" },
            { value: "other", label: "Other" },
          ],
        },
        { name: "message", labelKey: "message", type: "textarea", required: true },
      ]}
      onSubmit={(data) =>
        submitPartnership({
          name: data.name,
          email: data.email,
          company: data.company,
          partnerType: data.partnerType,
          message: data.message,
          locale: data.locale,
        })
      }
    />
  );
}

export function EnterpriseForm({
  locale,
  successMessage,
}: {
  locale: string;
  successMessage: string;
}) {
  return (
    <ActionForm
      locale={locale}
      successMessage={successMessage}
      fields={[
        { name: "name", labelKey: "name", type: "text", required: true },
        { name: "email", labelKey: "email", type: "email", required: true },
        { name: "company", labelKey: "company", type: "text", required: true },
        { name: "scale", labelKey: "scale", type: "text", required: true },
        { name: "needs", labelKey: "needs", type: "textarea", required: true },
      ]}
      onSubmit={(data) =>
        submitEnterprise({
          name: data.name,
          email: data.email,
          company: data.company,
          scale: data.scale,
          needs: data.needs,
          locale: data.locale,
        })
      }
    />
  );
}

export function CareerForm({
  locale,
  role,
  successMessage = "Application received.",
}: {
  locale: string;
  role: string;
  successMessage?: string;
}) {
  return (
    <ActionForm
      locale={locale}
      successMessage={successMessage}
      fields={[
        { name: "name", labelKey: "name", type: "text", required: true },
        { name: "email", labelKey: "email", type: "email", required: true },
        { name: "linkedin", labelKey: "linkedin", type: "url" },
        { name: "message", labelKey: "message", type: "textarea", required: true },
      ]}
      onSubmit={(data) =>
        submitCareer({
          name: data.name,
          email: data.email,
          linkedin: data.linkedin,
          message: data.message,
          role,
          locale: data.locale,
        })
      }
    />
  );
}
