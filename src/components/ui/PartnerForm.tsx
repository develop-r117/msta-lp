"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ArrowIcon, DownloadIcon } from "@/components/ui/Button";
import { trackLeadSubmit } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  partnerFormSchema,
  type PartnerFormValues,
} from "@/lib/partner-form-schema";

export { partnerFormSchema, type PartnerFormValues };

const interestOptions: {
  id: PartnerFormValues["interests"][number];
  label: string;
}[] = [
  { id: "create", label: "制作パートナー" },
  { id: "intro", label: "紹介パートナー" },
  { id: "template", label: "テンプレート販売" },
  { id: "official", label: "オフィシャル制作連携" },
  { id: "other", label: "その他" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      interests: [],
      consult: "no",
    },
  });

  const onSubmit = async (values: PartnerFormValues) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/partner-download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? `送信に失敗しました (${res.status})`);
      }
      setStatus("success");
      trackLeadSubmit({
        interest_count: values.interests.length,
        wants_consult: values.consult === "yes",
      });
    } catch (e) {
      setStatus("error");
      setServerError(e instanceof Error ? e.message : "送信に失敗しました");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-primary-200 bg-primary-50 p-7 text-center md:p-9">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-500 text-white">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-neutral-900">
          送信が完了しました
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          ご登録のメールアドレス宛に、パートナー資料のダウンロードリンクをお送りしました。
          <br />
          数分以内に届かない場合は迷惑メールフォルダもご確認ください。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="会社名 / 屋号" optional>
          <input
            {...register("company")}
            className={inputClass(false)}
            placeholder="株式会社サンプル"
          />
        </Field>
        <Field label="担当者名" error={errors.name?.message}>
          <input
            {...register("name")}
            className={inputClass(!!errors.name)}
            placeholder="山田 太郎"
          />
        </Field>

        <Field label="メールアドレス" error={errors.email?.message}>
          <input
            type="email"
            {...register("email")}
            className={inputClass(!!errors.email)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="電話番号" optional>
          <input
            {...register("phone")}
            className={inputClass(false)}
            placeholder="03-0000-0000"
          />
        </Field>

        <Field label="業種" optional>
          <input
            {...register("industry")}
            className={inputClass(false)}
            placeholder="制作会社 / 開発会社など"
          />
        </Field>
        <Field label="WebサイトURL" optional error={errors.websiteUrl?.message}>
          <input
            {...register("websiteUrl")}
            className={inputClass(!!errors.websiteUrl)}
            placeholder="https://example.com"
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
          興味のある内容
          <span className="ml-2 text-[10px] text-primary-600">複数選択可</span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {interestOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-primary-300 hover:bg-primary-50/40"
            >
              <input
                type="checkbox"
                value={opt.id}
                {...register("interests")}
                className="h-4 w-4 accent-primary-600"
              />
              <span className="font-medium text-neutral-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.interests ? (
          <p className="mt-2 text-xs text-red-600">
            {errors.interests.message as string}
          </p>
        ) : null}
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
          オンライン相談希望
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { id: "yes", label: "希望する" },
            { id: "no", label: "希望しない" },
          ].map((c) => (
            <label
              key={c.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-primary-300 hover:bg-primary-50/40"
            >
              <input
                type="radio"
                value={c.id}
                {...register("consult")}
                className="h-4 w-4 accent-primary-600"
              />
              <span className="font-medium text-neutral-700">{c.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("website")}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={status === "submitting"}
          variant="primary"
          size="lg"
          icon={status === "submitting" ? null : <ArrowIcon />}
          fullWidth
        >
          {status === "submitting" ? "送信中..." : "資料を受け取る"}
        </Button>
        <p className="text-xs text-neutral-500 sm:max-w-[260px]">
          送信後、ご登録のメールアドレスにダウンロードリンクをお送りします。
        </p>
      </div>

      {status === "error" && serverError ? (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {serverError}
        </p>
      ) : null}

      <p className="mt-4 flex items-start gap-2 text-[11px] text-neutral-500">
        <DownloadIcon />
        ご入力情報はパートナー制度のご案内のみに使用します。
      </p>
    </form>
  );
}

function Field({
  label,
  children,
  optional,
  error,
}: {
  label: string;
  children: React.ReactNode;
  optional?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
        {label}
        {optional ? (
          <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
            任意
          </span>
        ) : (
          <span className="rounded-full bg-primary-100 px-1.5 py-0.5 text-[10px] font-medium text-primary-700">
            必須
          </span>
        )}
      </span>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none ring-0 transition-all",
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100",
  );
}
