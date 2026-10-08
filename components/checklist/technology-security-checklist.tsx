"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Flame,
  Lock,
  Mail,
  Network,
  RefreshCw,
  Server,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";

import { PartnerLogoMarquee } from "@/components/sections/partner-logo-marquee";
import {
  checklistCategories,
  checklistMaxScore,
  checklistTotalChecks,
  type ChecklistCategoryId,
} from "@/data/checklist-lead-magnet";
import {
  calculateChecklistCategoryScores,
  calculateChecklistScore,
  formatChecklistScore,
  getChecklistBand,
  getChecklistScorePercent,
  type ChecklistAnswer,
  type ChecklistAnswerMap,
} from "@/lib/checklist-scoring";
import {
  getEmailValidationMessage,
  normalizeEmail,
} from "@/lib/email-validation";
import { cn, getBrowserCookie } from "@/lib/utils";

type LeadDetails = {
  name: string;
  company: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
};

type GateErrors = Partial<Record<keyof LeadDetails, string>>;

const initialLeadDetails: LeadDetails = {
  name: "",
  company: "",
  email: "",
  phone: "",
  marketingConsent: false,
};

const categoryIcons: Record<
  ChecklistCategoryId,
  typeof Network
> = {
  "network-health": Network,
  "internet-reliability": Wifi,
  "server-health": Server,
  cybersecurity: Lock,
  "data-backup": Database,
  "fire-alarm-systems": Flame,
  "cctv-access-control": Camera,
  "power-ups": BatteryCharging,
  "software-licensing": BadgeCheck,
  "disaster-recovery": RefreshCw,
};

const answerOptions: Array<{
  value: ChecklistAnswer;
  label: string;
  helper: string;
}> = [
  { value: "yes", label: "Yes", helper: "Fully in place" },
  { value: "partial", label: "Partly", helper: "Some gaps remain" },
  { value: "no", label: "No / Not sure", helper: "Not confirmed" },
];

function countAnswered(answers: ChecklistAnswerMap) {
  return checklistCategories.reduce(
    (total, category) =>
      total +
      category.questions.filter((question) => Boolean(answers[question.id]))
        .length,
    0,
  );
}

function getLowestCategories(
  categoryScores: ReturnType<typeof calculateChecklistCategoryScores>,
) {
  return [...categoryScores]
    .sort((left, right) => left.score - right.score)
    .slice(0, 3);
}

export function TechnologySecurityChecklist() {
  const [leadDetails, setLeadDetails] =
    useState<LeadDetails>(initialLeadDetails);
  const [gateErrors, setGateErrors] = useState<GateErrors>({});
  const [gateOpen, setGateOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<ChecklistAnswerMap>({});
  const [quizError, setQuizError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [submittingResults, setSubmittingResults] = useState(false);
  const [submittedResults, setSubmittedResults] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const quizRef = useRef<HTMLDivElement>(null);

  const activeCategory = checklistCategories[activeCategoryIndex];
  const answeredCount = countAnswered(answers);
  const score = calculateChecklistScore(answers);
  const scorePercent = getChecklistScorePercent(score);
  const scoreBand = getChecklistBand(score);
  const categoryScores = useMemo(
    () => calculateChecklistCategoryScores(answers),
    [answers],
  );
  const lowestCategories = getLowestCategories(categoryScores);
  const completionPercent = Math.round(
    (answeredCount / checklistTotalChecks) * 100,
  );

  function updateLeadField<K extends keyof LeadDetails>(
    field: K,
    value: LeadDetails[K],
  ) {
    setLeadDetails((current) => ({ ...current, [field]: value }));

    if (gateErrors[field]) {
      setGateErrors((current) => ({ ...current, [field]: "" }));
    }
  }

  function validateGate() {
    const nextErrors: GateErrors = {};
    const email = normalizeEmail(leadDetails.email);
    const emailMessage = getEmailValidationMessage(email);

    if (leadDetails.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name.";
    }

    if (leadDetails.company.trim().length < 2) {
      nextErrors.company = "Please enter your company name.";
    }

    if (emailMessage) {
      nextErrors.email = emailMessage;
    }

    if (!leadDetails.marketingConsent) {
      nextErrors.marketingConsent =
        "Please agree to receive your checklist result by email.";
    }

    setGateErrors(nextErrors);

    if (!Object.keys(nextErrors).length) {
      setLeadDetails((current) => ({ ...current, email }));
      return true;
    }

    return false;
  }

  function handleGateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateGate()) {
      return;
    }

    setGateOpen(true);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function updateAnswer(questionId: string, answer: ChecklistAnswer) {
    setAnswers((current) => ({ ...current, [questionId]: answer }));
    setQuizError("");
  }

  function goToNextCategory() {
    setActiveCategoryIndex((current) =>
      Math.min(current + 1, checklistCategories.length - 1),
    );
  }

  function goToPreviousCategory() {
    setActiveCategoryIndex((current) => Math.max(current - 1, 0));
  }

  async function submitResults() {
    if (answeredCount < checklistTotalChecks) {
      setQuizError(
        `Please answer all ${checklistTotalChecks} checks before viewing your result.`,
      );
      return;
    }

    setShowResults(true);
    setSubmitError("");

    if (submittedResults || submittingResults) {
      return;
    }

    setSubmittingResults(true);

    try {
      const response = await fetch("/api/checklist-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadDetails,
          email: normalizeEmail(leadDetails.email),
          score,
          maxScore: checklistMaxScore,
          scorePercent,
          scoreBandId: scoreBand.id,
          scoreBandLabel: scoreBand.label,
          categoryScores,
          hubspotTrackingCookie: getBrowserCookie("hubspotutk"),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setSubmitError(
          data?.error ??
            "Your score is ready, but we could not save the lead details. Please try again.",
        );
        return;
      }

      setSubmittedResults(true);
    } catch {
      setSubmitError(
        "Your score is ready, but we could not save the lead details. Please try again.",
      );
    } finally {
      setSubmittingResults(false);
    }
  }

  return (
    <div className="bg-[var(--color-background)]">
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--color-ink)] text-white">
        <Image
          src="/image/service_section/Operational_support.jpg"
          alt="Technical team reviewing business technology and security readiness"
          fill
          priority
          quality={58}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(11,18,32,0.58)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.26),rgba(11,18,32,0.76))]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-5xl flex-col items-center justify-center px-5 py-20 text-center sm:px-6 lg:px-8">
         
          <h1 className="mt-5 text-balance text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            2026 Business Technology & Security Checklist
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-xl">
            Identify technology, security, infrastructure, and operational risk
            gaps before they become downtime, data loss, safety exposure, or
            avoidable business cost.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#checklist-start"
              style={{ color: "#0b1220" }}
              className="inline-flex h-14 min-w-52 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5"
            >
              Start Free Assessment
            </a>
            <Link
              href="/book-consultation"
              className="inline-flex h-14 min-w-52 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Speak with Ideal Solutions
            </Link>
          </div>
        </div>
      </section>

      <PartnerLogoMarquee />

      <section id="checklist-start" className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <form
            onSubmit={handleGateSubmit}
            className="rounded-2xl border border-[color:rgba(11,18,32,0.08)] bg-white p-5 shadow-[0_24px_80px_rgba(11,18,32,0.1)] sm:p-8"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:rgba(47,107,255,0.1)] text-[var(--color-electric)]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-ink)]">
                  Very Simple to Start!
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <TextInput
                label="Full name"
                value={leadDetails.name}
                error={gateErrors.name}
                onChange={(value) => updateLeadField("name", value)}
                placeholder="Enter your full name"
              />
              <TextInput
                label="Company"
                value={leadDetails.company}
                error={gateErrors.company}
                onChange={(value) => updateLeadField("company", value)}
                placeholder="Enter company name"
              />
              <TextInput
                label="Business email"
                type="email"
                value={leadDetails.email}
                error={gateErrors.email}
                onChange={(value) => updateLeadField("email", value)}
                onBlur={() =>
                  setGateErrors((current) => ({
                    ...current,
                    email: getEmailValidationMessage(leadDetails.email),
                  }))
                }
                placeholder="name@company.com"
              />
              <TextInput
                label="Phone"
                value={leadDetails.phone}
                error={gateErrors.phone}
                onChange={(value) => updateLeadField("phone", value)}
                placeholder="+234..."
              />
            </div>

            <label
              className={cn(
                "mt-4 flex gap-3 rounded-xl border bg-[var(--color-cloud)] p-4 text-sm leading-6 text-[var(--color-muted)]",
                gateErrors.marketingConsent
                  ? "border-red-500"
                  : "border-[color:rgba(11,18,32,0.08)]",
              )}
            >
              <input
                type="checkbox"
                checked={leadDetails.marketingConsent}
                onChange={(event) =>
                  updateLeadField("marketingConsent", event.target.checked)
                }
                className="mt-1 h-4 w-4 shrink-0 rounded border-[color:rgba(11,18,32,0.2)] accent-[var(--color-electric)]"
              />
              <span>
                I agree to receive my checklist result and practical follow-up
                communication from Ideal Solutions.
              </span>
            </label>
            {gateErrors.marketingConsent ? (
              <p className="mt-2 text-xs font-medium text-red-600">
                {gateErrors.marketingConsent}
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(47,107,255,0.24)] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Unlock the checklist
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {gateOpen ? (
        <section ref={quizRef} className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl border border-[color:rgba(11,18,32,0.08)] bg-white p-5 shadow-[0_18px_50px_rgba(11,18,32,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ED6B37]">
                    Progress
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-[var(--color-ink)]">
                      <span>{answeredCount} answered</span>
                      <span>{completionPercent}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-cloud)]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))]"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-2">
                    {checklistCategories.map((category, index) => {
                      const Icon = categoryIcons[category.id];
                      const categoryScore = categoryScores[index];
                      const isActive = index === activeCategoryIndex;

                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setActiveCategoryIndex(index)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                            isActive
                              ? "bg-[var(--color-electric)] text-white"
                              : "bg-[var(--color-cloud)] text-[var(--color-ink)] hover:bg-white",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="min-w-0 flex-1 text-sm font-semibold">
                            {category.shortTitle}
                          </span>
                          <span
                            className={cn(
                              "text-xs font-semibold",
                              isActive ? "text-white/80" : "text-[var(--color-muted)]",
                            )}
                          >
                            {formatChecklistScore(categoryScore.score)}/
                            {categoryScore.maxScore}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              <div className="min-w-0">
                {!showResults ? (
                  <ChecklistCategoryPanel
                    category={activeCategory}
                    answers={answers}
                    onAnswer={updateAnswer}
                  />
                ) : (
                  <ResultPanel
                    score={score}
                    scorePercent={scorePercent}
                    scoreBand={scoreBand}
                    lowestCategories={lowestCategories}
                    submittingResults={submittingResults}
                    submittedResults={submittedResults}
                    submitError={submitError}
                  />
                )}

                {quizError ? (
                  <p className="mt-5 rounded-xl bg-[color:rgba(239,68,68,0.08)] px-4 py-3 text-sm text-red-600">
                    {quizError}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  {!showResults ? (
                    <>
                      <button
                        type="button"
                        onClick={goToPreviousCategory}
                        disabled={activeCategoryIndex === 0}
                        className="inline-flex h-12 items-center justify-center rounded-full border border-[color:rgba(11,18,32,0.1)] bg-white px-5 text-sm font-semibold text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Previous section
                      </button>

                      {activeCategoryIndex < checklistCategories.length - 1 ? (
                        <button
                          type="button"
                          onClick={goToNextCategory}
                          className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-ink)] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                        >
                          Next section
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => void submitResults()}
                          className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(47,107,255,0.22)] transition hover:-translate-y-0.5"
                        >
                          Calculate my score
                          <ClipboardCheck className="ml-2 h-4 w-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/book-consultation"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(47,107,255,0.22)] transition hover:-translate-y-0.5"
                      >
                        Book free assessment
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setShowResults(false);
                          setActiveCategoryIndex(0);
                          setQuizError("");
                        }}
                        className="inline-flex h-12 items-center justify-center rounded-full border border-[color:rgba(11,18,32,0.1)] bg-white px-5 text-sm font-semibold text-[var(--color-ink)]"
                      >
                        Review answers
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
  error?: string;
  type?: "text" | "email";
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        inputMode={type === "email" ? "email" : undefined}
        autoComplete={type === "email" ? "email" : undefined}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-12 rounded-xl border bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]",
          error ? "border-red-500 focus:border-red-500" : "border-[color:rgba(11,18,32,0.1)]",
        )}
      />
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}

function ChecklistCategoryPanel({
  category,
  answers,
  onAnswer,
}: {
  category: (typeof checklistCategories)[number];
  answers: ChecklistAnswerMap;
  onAnswer: (questionId: string, answer: ChecklistAnswer) => void;
}) {
  const Icon = categoryIcons[category.id];
  const answeredInCategory = category.questions.filter((question) =>
    Boolean(answers[question.id]),
  ).length;

  return (
    <section className="rounded-2xl border border-[color:rgba(11,18,32,0.08)] bg-white p-5 shadow-[0_18px_50px_rgba(11,18,32,0.06)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:rgba(47,107,255,0.1)] text-[var(--color-electric)]">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ED6B37]">
              Section {category.number}
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--color-ink)]">
              {category.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
              {category.summary}
            </p>
          </div>
        </div>
        <div className="rounded-full bg-[var(--color-cloud)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)]">
          {answeredInCategory}/{category.questions.length} answered
        </div>
      </div>

      <div className="mt-7 grid gap-4">
        {category.questions.map((question, index) => (
          <article
            key={question.id}
            className="rounded-xl border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-background)] p-4"
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Check {index + 1}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-7 text-[var(--color-ink)]">
                  {question.text}
                </h3>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[28rem]">
                {answerOptions.map((option) => {
                  const isActive = answers[question.id] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onAnswer(question.id, option.value)}
                      className={cn(
                        "min-h-16 rounded-xl border px-3 py-2 text-left transition",
                        isActive
                          ? "border-[var(--color-electric)] bg-white text-[var(--color-ink)] shadow-[0_12px_30px_rgba(47,107,255,0.12)]"
                          : "border-[color:rgba(11,18,32,0.08)] bg-white/70 text-[var(--color-muted)] hover:border-[color:rgba(47,107,255,0.24)]",
                      )}
                    >
                      <span className="block text-sm font-semibold">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5">
                        {option.helper}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResultPanel({
  score,
  scorePercent,
  scoreBand,
  lowestCategories,
  submittingResults,
  submittedResults,
  submitError,
}: {
  score: number;
  scorePercent: number;
  scoreBand: ReturnType<typeof getChecklistBand>;
  lowestCategories: ReturnType<typeof getLowestCategories>;
  submittingResults: boolean;
  submittedResults: boolean;
  submitError: string;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[color:rgba(11,18,32,0.08)] bg-white shadow-[0_18px_50px_rgba(11,18,32,0.06)]">
      <div className="grid gap-8 bg-[var(--color-ink)] p-6 text-white sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            Your readiness score
          </p>
          <div className="mt-5 flex items-end gap-2">
            <span className="text-6xl font-semibold">
              {formatChecklistScore(score)}
            </span>
            <span className="pb-2 text-xl text-white/60">
              / {checklistMaxScore}
            </span>
          </div>
          <p className="mt-3 text-sm text-white/68">{scorePercent}% ready</p>
        </div>
        <div>
          <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            {scoreBand.label}
          </div>
          <h2 className="mt-5 text-3xl font-semibold leading-tight">
            {scoreBand.description}
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/72">
            {scoreBand.recommendation}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {lowestCategories.map((category) => (
            <div
              key={category.categoryId}
              className="rounded-xl border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] p-4"
            >
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                {category.category}
              </p>
              <p className="mt-3 text-2xl font-semibold text-[var(--color-electric)]">
                {formatChecklistScore(category.score)}/{category.maxScore}
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
                Prioritize this area during your next technical review.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-xl border border-[color:rgba(11,18,32,0.08)] bg-white p-5">
          <div className="flex flex-wrap items-center gap-3">
            {submittedResults ? (
              <CheckCircle2 className="h-5 w-5 text-[var(--color-success)]" />
            ) : submittingResults ? (
              <Zap className="h-5 w-5 text-[var(--color-electric)]" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-[var(--color-electric)]" />
            )}
            <p className="text-sm font-semibold text-[var(--color-ink)]">
              {submittedResults
                ? "Your score has been submitted to Ideal Solutions."
                : submittingResults
                  ? "Saving your result for follow-up..."
                  : "Your result is ready."}
            </p>
          </div>
          {submitError ? (
            <p className="mt-3 text-sm leading-6 text-red-600">{submitError}</p>
          ) : (
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              Ideal Solutions can use this score to prepare a focused technology,
              infrastructure, and security assessment discussion.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
