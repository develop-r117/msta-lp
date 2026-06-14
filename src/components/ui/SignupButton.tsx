"use client";

import { type ReactNode } from "react";
import { Button, ArrowIcon } from "@/components/ui/Button";
import {
  CTA_LINKS,
  SIGNUP_COMING_SOON_LABEL,
  SIGNUP_COMING_SOON_NOTE,
  SIGNUP_OPEN,
} from "@/lib/sections";
import { trackSignupClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "partner";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: ReactNode;
  /** ヘッダー等の狭い領域向け（1行表示） */
  compact?: boolean;
  /** GA計測用の設置場所ラベル（例: "header", "hero", "footer"） */
  analyticsLocation?: string;
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300";

const mutedVariantStyles: Record<Variant, string> = {
  primary: "bg-neutral-500/90 text-white shadow-none",
  secondary: "bg-neutral-100 text-neutral-500 border-2 border-neutral-200",
  tertiary: "bg-neutral-700 text-neutral-300",
  ghost: "bg-white/10 text-white/75",
  partner: "bg-neutral-500/80 text-white",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-8 py-4 text-base md:text-lg",
};

function ComingSoonBadge({
  variant = "primary",
  size = "md",
  className,
  compact,
}: Pick<Props, "variant" | "size" | "className" | "compact">) {
  return (
    <span
      title={`${SIGNUP_COMING_SOON_LABEL} — ${SIGNUP_COMING_SOON_NOTE}`}
      className={cn(
        baseClass,
        mutedVariantStyles[variant ?? "primary"],
        sizeStyles[size ?? "md"],
        "pointer-events-none cursor-default select-none",
        className,
      )}
    >
      {compact ? (
        <span className="text-center leading-tight">
          {SIGNUP_COMING_SOON_NOTE}
        </span>
      ) : (
        <span className="flex flex-col items-center leading-tight">
          <span>{SIGNUP_COMING_SOON_LABEL}</span>
          <span className="text-[10px] font-normal opacity-90 md:text-[11px]">
            {SIGNUP_COMING_SOON_NOTE}
          </span>
        </span>
      )}
    </span>
  );
}

/** 2週間無料トライアル（dashboard）導線。クローズ公開中は Coming soon 表示。 */
export function SignupButton({
  variant = "primary",
  size = "md",
  className,
  icon,
  iconPosition = "right",
  fullWidth,
  children = "2週間無料で始める",
  compact,
  analyticsLocation = "signup_button",
}: Props) {
  if (!SIGNUP_OPEN) {
    return (
      <ComingSoonBadge
        variant={variant}
        size={size}
        className={cn(fullWidth && "w-full", className)}
        compact={compact}
      />
    );
  }

  return (
    <Button
      href={CTA_LINKS.signup}
      external={CTA_LINKS.signup.startsWith("http")}
      variant={variant}
      size={size}
      className={className}
      icon={icon ?? <ArrowIcon />}
      iconPosition={iconPosition}
      fullWidth={fullWidth}
      data-ga-skip-outbound
      onClick={() => trackSignupClick(analyticsLocation, true)}
    >
      {children}
    </Button>
  );
}

/** フッター用のトライアル導線 */
export function SignupFooterLink({ className }: { className?: string }) {
  if (!SIGNUP_OPEN) {
    return (
      <ComingSoonBadge
        variant="primary"
        size="sm"
        className={cn("w-full px-5 py-2.5 shadow-none", className)}
      />
    );
  }

  return (
    <a
      href={CTA_LINKS.signup}
      target={CTA_LINKS.signup.startsWith("http") ? "_blank" : undefined}
      rel={
        CTA_LINKS.signup.startsWith("http") ? "noopener noreferrer" : undefined
      }
      data-ga-skip-outbound
      onClick={() => trackSignupClick("footer", true)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition hover:shadow-primary-500/40",
        className,
      )}
    >
      2週間無料で始める
    </a>
  );
}

/** モバイル下部フローティングCTA用 */
export function SignupFloatingTile({ className }: { className?: string }) {
  if (!SIGNUP_OPEN) {
    return (
      <span
        title={`${SIGNUP_COMING_SOON_LABEL} — ${SIGNUP_COMING_SOON_NOTE}`}
        className={cn(
          "col-span-2 flex flex-col items-center justify-center rounded-xl bg-neutral-400 px-3 py-2.5 text-center text-white pointer-events-none cursor-default select-none",
          className,
        )}
      >
        <span className="text-[10px] font-medium opacity-90">
          {SIGNUP_COMING_SOON_LABEL}
        </span>
        <span className="text-sm font-bold leading-none">
          {SIGNUP_COMING_SOON_NOTE}
        </span>
      </span>
    );
  }

  return (
    <a
      href={CTA_LINKS.signup}
      target={CTA_LINKS.signup.startsWith("http") ? "_blank" : undefined}
      rel={
        CTA_LINKS.signup.startsWith("http") ? "noopener noreferrer" : undefined
      }
      data-ga-skip-outbound
      onClick={() => trackSignupClick("floating_cta", true)}
      className={cn(
        "col-span-2 flex flex-col items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-2.5 text-center text-white shadow-md shadow-primary-500/30",
        className,
      )}
    >
      <span className="text-[10px] font-medium opacity-90">2週間無料</span>
      <span className="text-sm font-bold leading-none">いますぐ始める</span>
    </a>
  );
}
