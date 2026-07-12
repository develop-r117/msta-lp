"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { trackCtaClick } from "@/lib/analytics";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "partner";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35",
  secondary:
    "bg-white text-neutral-800 border-2 border-neutral-200 hover:border-primary-300 hover:text-primary-700 shadow-md",
  tertiary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-md",
  ghost:
    "bg-transparent text-neutral-700 hover:text-primary-700 hover:bg-primary-50/60",
  partner:
    "bg-accent-400 text-primary-900 hover:bg-primary-400 hover:text-white shadow-lg shadow-accent-400/30 hover:shadow-xl",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-8 py-4 text-base md:text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: ReactNode;
  /** GA計測用ラベル。未指定時はボタンテキスト（string時）→ href の順で自動補完 */
  analyticsLabel?: string;
  /** GA計測用の設置場所ラベル。未指定時は現在のパスを使用 */
  analyticsLocation?: string;
  /** 個別計測済みボタン（SignupButton等）で cta_click の自動送信をスキップ */
  "data-ga-skip-cta"?: boolean;
};

type AnchorProps = CommonProps &
  Omit<HTMLMotionProps<"a">, "ref"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = CommonProps &
  Omit<HTMLMotionProps<"button">, "ref"> & {
    href?: undefined;
  };

type Props = AnchorProps | ButtonProps;

const baseClass =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed";

export const Button = forwardRef<HTMLElement, Props>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      className,
      icon,
      iconPosition = "right",
      fullWidth,
      children,
      analyticsLabel,
      analyticsLocation,
      "data-ga-skip-cta": skipCtaTracking,
      onClick,
      ...rest
    } = props as CommonProps & {
      onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    } & Record<string, unknown>;

    const pathname = usePathname();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (!skipCtaTracking) {
        const href =
          "href" in props && props.href ? String(props.href) : undefined;
        const label =
          analyticsLabel ??
          (typeof children === "string" ? children : undefined) ??
          href ??
          "button";
        trackCtaClick(label, analyticsLocation ?? pathname ?? "unknown");
      }
      onClick?.(event);
    };

    const composed = cn(
      baseClass,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className,
    );

    const content = (
      <>
        {icon && iconPosition === "left" ? (
          <span className="inline-flex shrink-0">{icon}</span>
        ) : null}
        <span>{children}</span>
        {icon && iconPosition === "right" ? (
          <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">
            {icon}
          </span>
        ) : null}
      </>
    );

    if ("href" in props && props.href) {
      const { href, external, ...anchorRest } = rest as Omit<
        AnchorProps,
        keyof CommonProps
      >;
      const openInNewTab =
        external === true || (external !== false && /^https?:/.test(href));
      if (openInNewTab) {
        return (
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={composed}
            onClick={handleClick}
            {...anchorRest}
          >
            {content}
          </motion.a>
        );
      }
      return (
        <MotionLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={composed}
          onClick={handleClick}
          {...anchorRest}
        >
          {content}
        </MotionLink>
      );
    }

    const buttonRest = rest as Omit<ButtonProps, keyof CommonProps>;
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={composed}
        onClick={handleClick}
        {...buttonRest}
      >
        {content}
      </motion.button>
    );
  },
);

export function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
      />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.836L3 20l1.05-3.84A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}
