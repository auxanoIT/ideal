"use client";

import { startTransition, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TurnstileField } from "@/components/forms/turnstile-field";
import type { EstimateAnswers, EstimateResult, EstimatorConfig } from "@/lib/types";
import { cn, formatCurrencyNGN, getBrowserCookie } from "@/lib/utils";
import { estimateSchema } from "@/lib/schemas";
import { formErrors } from "@/lib/form-errors";

type EstimateWizardProps = {
  config: EstimatorConfig;
};

const steps = ["Services", "Operations", "Scope", "Lead Capture"];

const initialAnswers: EstimateAnswers = {
  name: "",
  company: "",
  email: "",
  phone: "",
  companySize: "mid",
  locationBand: "single-site",
  supportTier: "standard",
  cameraBand: "1-8",
  networkScope: "light",
  complianceLevel: "none",
  serviceMix: ["managed-it", "network"],
  notes: "",
};

export function EstimateWizard({ config }: EstimateWizardProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<EstimateAnswers>(initialAnswers);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const canContinue =
    step === 0
      ? answers.serviceMix.length > 0
      : step === 3
        ? Boolean(answers.name && answers.company && answers.email && answers.phone)
        : true;

  function updateField<K extends keyof EstimateAnswers>(field: K, value: EstimateAnswers[K]) {
    setAnswers((current) => ({ ...current, [field]: value }));
  }

  function toggleService(serviceId: string) {
    setAnswers((current) => {
      const exists = current.serviceMix.includes(serviceId);

      return {
        ...current,
        serviceMix: exists
          ? current.serviceMix.filter((item) => item !== serviceId)
          : [...current.serviceMix, serviceId],
      };
    });
  }

  async function generateEstimate() {
    setSubmitting(true);
    setError("");

    const validation = estimateSchema.safeParse(answers);
    if (!validation.success) {
      setError(formErrors(validation.error.issues).error);
      setSubmitting(false);
      return;
    }

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Please complete the verification check.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...answers,
          turnstileToken,
          hubspotTrackingCookie: getBrowserCookie("hubspotutk"),
        }),
      });

      const data = (await response.json()) as { result?: EstimateResult; error?: string };

      if (!response.ok || !data.result) {
        setError(data.error ?? "Unable to generate estimate.");
        setSubmitting(false);
        setTurnstileResetKey((current) => current + 1);
        return;
      }

      setResult(data.result);
    } catch {
      setError("We could not generate your estimate. Please check your connection and try again; your details have been kept.");
    } finally {
      setSubmitting(false);
      setTurnstileResetKey((current) => current + 1);
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_24px_60px_rgba(11,18,32,0.08)]">
        <div className="flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <div
              key={label}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]",
                index === step
                  ? "bg-[var(--color-electric)] text-white"
                  : index < step
                    ? "bg-[color:rgba(24,182,126,0.12)] text-[var(--color-success)]"
                    : "bg-[var(--color-cloud)] text-[var(--color-muted)]",
              )}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="mt-8">
          {step === 0 ? (
            <div>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                Choose the service mix
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                Start with the commercial services shaping the project. The estimator can combine multiple scopes.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {config.services.map((service) => {
                  const active = answers.serviceMix.includes(service.id);

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={cn(
                        "rounded-[1.75rem] border p-5 text-left transition",
                        active
                          ? "border-[var(--color-electric)] bg-[color:rgba(47,107,255,0.06)] shadow-[0_18px_42px_rgba(47,107,255,0.12)]"
                          : "border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] hover:border-[color:rgba(47,107,255,0.24)]",
                      )}
                    >
                      <p className="text-lg font-semibold text-[var(--color-ink)]">{service.label}</p>
                      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                        {service.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                Size the environment
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Company scale, number of locations, and support expectation all affect the commercial range.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <SelectField
                  label="Company size"
                  value={answers.companySize}
                  onChange={(value) => updateField("companySize", value)}
                  options={config.companySizes}
                />
                <SelectField
                  label="Locations"
                  value={answers.locationBand}
                  onChange={(value) => updateField("locationBand", value)}
                  options={config.locationBands}
                />
                <SelectField
                  label="Support depth"
                  value={answers.supportTier}
                  onChange={(value) => updateField("supportTier", value)}
                  options={config.supportTiers}
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                Shape the rollout scope
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Add camera density, network rollout complexity, and any compliance pressure affecting the project.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <SelectField
                  label="Camera scope"
                  value={answers.cameraBand}
                  onChange={(value) => updateField("cameraBand", value)}
                  options={config.cameraBands}
                />
                <SelectField
                  label="Network scope"
                  value={answers.networkScope}
                  onChange={(value) => updateField("networkScope", value)}
                  options={config.networkScopes}
                />
                <SelectField
                  label="Compliance need"
                  value={answers.complianceLevel}
                  onChange={(value) => updateField("complianceLevel", value)}
                  options={config.complianceLevels}
                />
              </div>
              <label className="mt-5 grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Notes
                <textarea
                  value={answers.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  rows={5}
                  className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 py-4 outline-none transition focus:border-[var(--color-electric)]"
                  placeholder="Add any site-specific details, deadlines, or technical concerns."
                />
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                Enter lead details before results
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                This lets the team preserve the estimate context and follow up with a refined consultation.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InputField
                  label="Full name"
                  value={answers.name}
                  onChange={(value) => updateField("name", value)}
                />
                <InputField
                  label="Company"
                  value={answers.company}
                  onChange={(value) => updateField("company", value)}
                />
                <InputField
                  label="Email"
                  type="email"
                  value={answers.email}
                  onChange={(value) => updateField("email", value)}
                />
                <InputField
                  label="Phone"
                  value={answers.phone}
                  onChange={(value) => updateField("phone", value)}
                />
                <div className="md:col-span-2">
                  <TurnstileField
                    onVerify={setTurnstileToken}
                    onError={() => setError("Verification could not load. Please refresh and try again.")}
                    resetKey={turnstileResetKey}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[color:rgba(11,18,32,0.08)] pt-6">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[color:rgba(11,18,32,0.08)] px-5 text-sm font-semibold text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((current) => current + 1)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] px-6 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={() => startTransition(() => void generateEstimate())}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] px-6 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Generating..." : "Generate Estimate"}
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {error ? (
          <p role="alert" className="mt-4 rounded-2xl bg-[color:rgba(239,68,68,0.08)] px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>

      <div className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-ink)] p-7 text-white shadow-[0_28px_80px_rgba(11,18,32,0.18)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
          Estimate Summary
        </p>
        {result ? (
          <div className="mt-6">
            <h3 className="text-4xl font-semibold tracking-[-0.04em]">
              {formatCurrencyNGN(result.low)} - {formatCurrencyNGN(result.high)}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72">{result.timeline}</p>
            <p className="mt-4 rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-white/80">
              {result.recommendation}
            </p>
            <div className="mt-6 space-y-3">
              {result.lineItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-xs leading-6 text-white/60">{item.description}</p>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-cyan)]">
                      {formatCurrencyNGN(item.low)} - {formatCurrencyNGN(item.high)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4 text-sm leading-7 text-white/70">
            <p>
              The estimator uses editable pricing bands from Sanity so commercial logic can be tuned without a code deployment.
            </p>
            <p>
              It combines service mix, organization scale, site count, support depth, surveillance density, network complexity, and compliance pressure into a structured range.
            </p>
            <p>
              Once you complete lead capture, the backend stores the inquiry and returns a quote band with line items and delivery guidance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type Option = {
  id: string;
  label: string;
};

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
      />
    </label>
  );
}
