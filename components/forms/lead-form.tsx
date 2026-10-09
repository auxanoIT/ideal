"use client";

import { useId, useRef, useState, useTransition } from "react";
import { CalendarDays } from "lucide-react";

import { TurnstileField } from "@/components/forms/turnstile-field";
import {
  getEmailValidationMessage,
  normalizeEmail,
} from "@/lib/email-validation";
import { cn, getBrowserCookie } from "@/lib/utils";
import { leadSchema } from "@/lib/schemas";
import { formErrors } from "@/lib/form-errors";

type LeadFormProps = {
  context: "contact" | "consultation";
  title?: string;
  description?: string;
  className?: string;
  headingAlign?: "left" | "center";
  showEyebrow?: boolean;
  submitLabel?: string;
  fullWidthSubmit?: boolean;
  initialService?: string;
  initialSection?: string;
  serviceOptions?: string[];
};

const serviceInterests = [
  "Select the service you need",
  "Data Centre Deployment & Infrastructure",
  "Smart Hands & Technical Support",
  "Server, Storage & Hardware",
  "Network Infrastructure & Connectivity",
  "Data Centre Security & Safety",
  "Infrastructure Assessment & Optimisation",
  "Data Centre Project & Lifecycle Management",
  "Multiple Services / Not Sure Yet",
];

export function LeadForm({
  context,
  title = "Start the conversation",
  description = "Share the environment, issue, or project goal. Ideal Solutions will review the brief and recommend the right next step.",
  className,
  headingAlign = "left",
  showEyebrow = true,
  submitLabel,
  fullWidthSubmit = false,
  initialService,
  initialSection,
  serviceOptions,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const errorId = useId();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const fieldProps = (name: string) => ({
    "aria-invalid": Boolean(fieldErrors[name]),
    "aria-describedby": fieldErrors[name] ? `${errorId}-${name}` : undefined,
  });
  const fieldError = (name: string) => fieldErrors[name] ? (
    <span id={`${errorId}-${name}`} className="text-xs font-medium text-red-600">{fieldErrors[name]}</span>
  ) : null;
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    setMessage("");

    const email = normalizeEmail(formData.get("email"));
    const marketingConsent = formData.get("marketingConsent") === "on";

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email,
      phone: formData.get("phone"),
      serviceInterest: formData.get("serviceInterest"),
      message: formData.get("message"),
      marketingConsent,
      context,
      turnstileToken,
      hubspotTrackingCookie: getBrowserCookie("hubspotutk"),
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const details = formErrors(parsed.error.issues);
      setFieldErrors(details.fieldErrors);
      setEmailError(details.fieldErrors.email ?? "");
      setConsentError(details.fieldErrors.marketingConsent ?? "");
      setStatus("error");
      setMessage("Please correct the fields marked above and submit again.");
      const first = formRef.current?.elements.namedItem(Object.keys(details.fieldErrors)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setFieldErrors({});
    setEmailError("");
    setConsentError("");
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setMessage("Please complete the verification check before submitting.");
      return;
    }

    try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
        fieldErrors?: Record<string, string>;
      } | null;
      setStatus("error");
      setFieldErrors(data?.fieldErrors ?? {});
      setEmailError(data?.fieldErrors?.email ?? "");
      setConsentError(data?.fieldErrors?.marketingConsent ?? "");
      setMessage(data?.error ?? "Something went wrong. Please try again.");
      setTurnstileResetKey((current) => current + 1);
      return;
    }

    setStatus("success");
    setMessage(
      context === "consultation"
        ? "Consultation request received. The team can now coordinate the next discussion."
        : "Message received. Ideal Solutions can now review the brief and respond.",
    );
    setTurnstileResetKey((current) => current + 1);
    } catch {
      setStatus("error");
      setMessage("We could not send your request because the connection failed. Your details are still here. Please check your internet connection and try again.");
      setTurnstileResetKey(current => current + 1);
    }
  }

  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_24px_60px_rgba(11,18,32,0.08)]",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-xl",
          headingAlign === "center" && "mx-auto text-center",
        )}
      >
        {showEyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
            {context === "consultation"
              ? "Book Consultation"
              : "Contact Ideal Solutions"}
          </p>
        ) : null}
        <h3
          className={cn(
            "text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]",
            showEyebrow && "mt-4",
          )}
        >
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
          {description}
        </p>
      </div>

      <form
        ref={formRef}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (isPending) return;
          const data = new FormData(event.currentTarget);
          startTransition(async () => { await handleSubmit(data); });
        }}
        className="mt-8 grid gap-4 md:grid-cols-2"
      >
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Full name
          <input
            name="name"
            {...fieldProps("name")}
            required
            placeholder="Enter your full name"
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          />
          {fieldError("name")}
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Company
          <input
            name="company"
            {...fieldProps("company")}
            required
            placeholder="Enter your company name"
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          />
          {fieldError("company")}
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Email
          <input
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "lead-form-email-error" : undefined}
            placeholder="Enter your email address"
            onBlur={(event) =>
              setEmailError(getEmailValidationMessage(event.target.value))
            }
            onChange={(event) => {
              if (emailError) {
                setEmailError(getEmailValidationMessage(event.target.value));
              }
            }}
            className={cn(
              "h-12 rounded-2xl border bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]",
              emailError
                ? "border-red-500 focus:border-red-500"
                : "border-[color:rgba(11,18,32,0.1)]",
            )}
          />
          {emailError ? (
            <span
              id="lead-form-email-error"
              className="text-xs font-medium text-red-600"
            >
              {emailError}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            {...fieldProps("phone")}
            required
            placeholder="Enter your phone number"
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          />
          {fieldError("phone")}
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)] md:col-span-2">
          Service focus
          <select
            name="serviceInterest"
            {...fieldProps("serviceInterest")}
            defaultValue={
              initialService ??
              serviceOptions?.[0] ??
              "Select the service you need"
            }
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          >
            {(serviceOptions ?? serviceInterests).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {fieldError("serviceInterest")}
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)] md:col-span-2">
          Project brief
          <textarea
            name="message"
            {...fieldProps("message")}
            defaultValue={
              initialSection
                ? `I would like to discuss ${initialSection.toLowerCase()}.\n\nSite location:\nProject requirements:\nPreferred work window:\n`
                : undefined
            }
            rows={6}
            required
            placeholder="Example: Rack-and-stack deployment for new equipment, fibre and copper cabling remediation, Smart Hands support for a remote team, server installation, access control upgrade, or an infrastructure assessment."
            className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 py-4 outline-none transition focus:border-[var(--color-electric)]"
          />
          {fieldError("message")}
        </label>
        <label
          className={cn(
            "flex gap-3 rounded-[1.25rem] border bg-[var(--color-cloud)] p-4 text-sm leading-6 text-[var(--color-muted)] md:col-span-2",
            consentError
              ? "border-red-500"
              : "border-[color:rgba(11,18,32,0.1)]",
          )}
        >
          <input
            name="marketingConsent"
            type="checkbox"
            required
            aria-invalid={Boolean(consentError)}
            aria-describedby={
              consentError ? "lead-form-consent-error" : undefined
            }
            onChange={(event) => {
              if (event.target.checked) {
                setConsentError("");
              }
            }}
            className="mt-1 h-4 w-4 shrink-0 rounded border-[color:rgba(11,18,32,0.18)] accent-[var(--color-electric)]"
          />
          <span>
            I agree to receive email communication from Ideal Solutions about my
            request and allow Ideal Solutions to store and process my personal
            data to respond to this submission.
          </span>
        </label>
        {consentError ? (
          <p
            id="lead-form-consent-error"
            className="-mt-2 text-xs font-medium text-red-600 md:col-span-2"
          >
            {consentError}
          </p>
        ) : null}
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <TurnstileField
            onVerify={setTurnstileToken}
            onError={() => {
              setStatus("error");
              setMessage(
                "Verification could not load. Please refresh and try again.",
              );
            }}
            resetKey={turnstileResetKey}
          />
        </div>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(47,107,255,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70",
              fullWidthSubmit && "w-full",
            )}
          >
            {context === "consultation" ? (
              <CalendarDays className="mr-2 h-4 w-4" />
            ) : null}
            {isPending
              ? "Sending..."
              : (submitLabel ??
                (context === "consultation"
                  ? "Request Consultation"
                  : "Send Message"))}
          </button>
        </div>
      </form>

      {message ? (
        <p
          role={status === "error" ? "alert" : "status"}
          className={cn(
            "mt-5 rounded-2xl px-4 py-3 text-sm",
            status === "success"
              ? "bg-[color:rgba(24,182,126,0.12)] text-[var(--color-success)]"
              : "bg-[color:rgba(239,68,68,0.08)] text-red-600",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
