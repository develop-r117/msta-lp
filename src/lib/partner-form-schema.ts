import { z } from "zod";

// パートナー資料DLフォームのスキーマ。
// "use client" コンポーネントとAPIルート(edge)の両方から共有するため、
// クライアント依存を持たない独立モジュールに切り出している。
// (edgeルートが "use client" モジュールからimportすると、ビルド時に
//  クライアント参照へ置き換わり実行時クラッシュするのを防ぐ)
export const partnerFormSchema = z.object({
  company: z.string().max(100).optional().or(z.literal("")),
  name: z.string().min(1, "担当者名は必須です").max(60),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z.string().max(40).optional().or(z.literal("")),
  industry: z.string().max(80).optional().or(z.literal("")),
  websiteUrl: z
    .string()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}.*$/.test(v),
      "正しいURLを入力してください",
    ),
  interests: z
    .array(z.enum(["create", "intro", "template", "official", "other"]))
    .min(1, "1つ以上選択してください"),
  consult: z.enum(["yes", "no"]),
  // Honeypot
  website: z.string().max(0).optional(),
});

export type PartnerFormValues = z.infer<typeof partnerFormSchema>;
