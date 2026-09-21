type StatMetricIconKind = "award" | "clipboard" | "headset" | "savings" | "users";

type StatMetricIconProps = {
  kind: StatMetricIconKind;
};

function StatIconSvg({ kind }: StatMetricIconProps) {
  const baseProps = {
    viewBox: "0 0 64 64",
    fill: "none",
    className: "relative h-14 w-14",
    "aria-hidden": true,
  };

  if (kind === "users") {
    return (
      <svg {...baseProps}>
        <path
          d="M26 51V39.5C26 34.8 29.8 31 34.5 31h3C42.2 31 46 34.8 46 39.5V51"
          stroke="var(--stat-icon-primary, #1557C8)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M24 21.5C24 14.6 28.9 9 35 9s11 5.6 11 12.5S41.1 34 35 34 24 28.4 24 21.5Z"
          stroke="var(--stat-icon-primary, #1557C8)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M15 50V40.5C15 36.9 17.9 34 21.5 34M15 23c-4.4 0-8 4-8 9s3.6 9 8 9"
          stroke="var(--stat-icon-accent, #FF6A1A)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M49 50V40.5C49 36.9 46.1 34 42.5 34M49 23c4.4 0 8 4 8 9s-3.6 9-8 9"
          stroke="var(--stat-icon-accent, #FF6A1A)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>
    );
  }

  if (kind === "clipboard") {
    return (
      <svg {...baseProps}>
        <path
          d="M23 14h-7a4 4 0 0 0-4 4v36a4 4 0 0 0 4 4h32a4 4 0 0 0 4-4V18a4 4 0 0 0-4-4h-7"
          stroke="var(--stat-icon-primary, #1557C8)"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M24 18V11h5.5C30.4 8.1 33 6 36 6s5.6 2.1 6.5 5H48v7H24Z"
          stroke="var(--stat-icon-primary, #1557C8)"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path d="m19 30 3 3 6-7M19 41l3 3 6-7M33 31h12M33 42h12" stroke="var(--stat-icon-accent, #FF6A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        <path d="m41 52 5 5 9-11" stroke="var(--stat-icon-primary, #1557C8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    );
  }

  if (kind === "award") {
    return (
      <svg {...baseProps}>
        <path
          d="m22 42-4 15 11-7 11 7-4-15"
          stroke="var(--stat-icon-primary, #1557C8)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M32 6l4.2 3.9 5.7-.4 2.2 5.3 5 2.9-1.4 5.6 2.4 5.2-4.8 3.2-1.7 5.5-5.8.2-4.6 3.5-4.6-3.5-5.8-.2-1.7-5.5-4.8-3.2 2.4-5.2-1.4-5.6 5-2.9 2.2-5.3 5.7.4L32 6Z"
          stroke="var(--stat-icon-primary, #1557C8)"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="m32 17 3.2 6.4 7.1 1-5.2 5 1.3 7-6.4-3.4-6.4 3.4 1.3-7-5.2-5 7.1-1L32 17Z"
          stroke="var(--stat-icon-accent, #FF6A1A)"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>
    );
  }

  if (kind === "headset") {
    return (
      <svg {...baseProps}>
        <path
          d="M12 32C12 19.8 20.9 10 32 10s20 9.8 20 22"
          stroke="var(--stat-icon-primary, #1557C8)"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M12 34h5a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-2a5 5 0 0 1-5-5v-7a5 5 0 0 1 2-5ZM52 34h-5a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h2a5 5 0 0 0 5-5v-7a5 5 0 0 0-2-5Z"
          stroke="var(--stat-icon-primary, #1557C8)"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path d="M37 54h7c3 0 5-2 5-5" stroke="var(--stat-icon-primary, #1557C8)" strokeLinecap="round" strokeWidth="4" />
        <path d="M25 54h12" stroke="var(--stat-icon-accent, #FF6A1A)" strokeLinecap="round" strokeWidth="4" />
        <path d="M28 28v8M36 28v8M24 31v2M40 31v2" stroke="var(--stat-icon-accent, #FF6A1A)" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  return (
    <svg {...baseProps}>
      <path
        d="M17 43c0 8 6 13 15 13s15-5 15-13c0-13-15-24-15-24S17 30 17 43Z"
        stroke="var(--stat-icon-primary, #1557C8)"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M24 18c0-6 4-10 8-10s8 4 8 10"
        stroke="var(--stat-icon-primary, #1557C8)"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path d="M25 42h14M32 34v18" stroke="var(--stat-icon-accent, #FF6A1A)" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

export function StatMetricIcon({ kind }: StatMetricIconProps) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[var(--stat-icon-surface,#eef4ff)]">
      <span
        aria-hidden="true"
        className="absolute -right-2 -top-2 h-12 w-12 opacity-80 [background-image:radial-gradient(var(--stat-icon-dots,#1557C8)_1.4px,transparent_1.4px)] [background-size:9px_9px]"
      />
      <StatIconSvg kind={kind} />
    </div>
  );
}

export type { StatMetricIconKind };
