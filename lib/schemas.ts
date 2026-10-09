import { z } from "zod";

import { isValidEmail, normalizeEmail } from "@/lib/email-validation";

const emailSchema = z
  .string()
  .transform(normalizeEmail)
  .refine(isValidEmail, {
    message: "Please enter a valid email address.",
  });

const marketingConsentSchema = z
  .preprocess(
    (value) => value === true || value === "true" || value === "on",
    z.boolean(),
  )
  .refine((value) => value, {
    message: "Please agree to receive email communication before submitting.",
  });

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name (at least 2 characters)."),
  company: z.string().trim().min(2, "Please enter your company name (at least 2 characters)."),
  email: emailSchema,
  phone: z.string().trim().regex(/^[+\d\s().-]+$/, "Please enter a phone number using digits and optional +, spaces, brackets or hyphens.").refine(value => { const digits = value.replace(/\D/g, ""); return digits.length >= 6 && digits.length <= 15; }, "Please enter a phone number with 6 to 15 digits."),
  serviceInterest: z.string().trim().min(2, "Please select the service you need.").refine(value => value !== "Select the service you need", "Please select the service you need."),
  message: z.string().trim().min(10, "Please describe your project in at least 10 characters."),
  marketingConsent: marketingConsentSchema,
  context: z.enum(["contact", "consultation"]),
  turnstileToken: z.string().optional(),
  hubspotTrackingCookie: z.string().optional(),
});

export const estimateSchema = z.object({
  name: leadSchema.shape.name,
  company: leadSchema.shape.company,
  email: emailSchema,
  phone: leadSchema.shape.phone,
  companySize: z.string().min(1),
  locationBand: z.string().min(1),
  supportTier: z.string().min(1),
  cameraBand: z.string().min(1),
  networkScope: z.string().min(1),
  complianceLevel: z.string().min(1),
  serviceMix: z.array(z.string()).min(1, "Please select at least one service."),
  notes: z.string().optional(),
  turnstileToken: z.string().optional(),
  hubspotTrackingCookie: z.string().optional(),
});

export const checklistLeadSchema = z.object({
  name: leadSchema.shape.name,
  company: leadSchema.shape.company,
  email: emailSchema,
  phone: z.string().trim().optional().refine(value => !value || leadSchema.shape.phone.safeParse(value).success, "Please enter a valid phone number with 6 to 15 digits, or leave this optional field blank."),
  marketingConsent: marketingConsentSchema,
  score: z.number().min(0).max(20),
  maxScore: z.literal(20),
  scorePercent: z.number().min(0).max(100),
  scoreBandId: z.enum(["excellent", "good", "needs-attention", "high-risk"]),
  scoreBandLabel: z.string().min(2),
  categoryScores: z
    .array(
      z.object({
        categoryId: z.string().min(2),
        category: z.string().min(2),
        score: z.number().min(0).max(2),
        maxScore: z.literal(2),
      }),
    )
    .length(10),
  hubspotTrackingCookie: z.string().optional(),
});
