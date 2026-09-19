import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { createNews, deleteNews, getNewsById, getPublishedNewsBySlug, listAllNews, listPublishedNews, updateNews } from "./db";
import { storagePut } from "./storage";
import { news } from "../drizzle/schema";

const newsInput = z.object({
  title: z.string().trim().min(3).max(220),
  category: z.string().trim().min(2).max(80),
  publishedAt: z.coerce.date(),
  excerpt: z.string().trim().min(10).max(500),
  content: z.string().trim().min(20),
  imageUrl: z.string().trim().url().optional().or(z.literal("")),
  imageData: z.string().optional(),
  isPublished: z.boolean().default(true),
});

const updateNewsInput = newsInput.extend({ id: z.number().int().positive() });

function slugify(value: string) {
  const base = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "noticia"}-${nanoid(6).toLowerCase()}`;
}

async function resolveImage(input: { imageData?: string; imageUrl?: string }, slug: string) {
  if (!input.imageData) return { imageUrl: input.imageUrl || null, imageKey: null };
  const match = input.imageData.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/);
  if (!match) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Envie uma imagem JPG, PNG ou WebP válida." });
  }
  const [, contentType, encoded] = match;
  const buffer = Buffer.from(encoded, "base64");
  if (buffer.byteLength > 8 * 1024 * 1024) {
    throw new TRPCError({ code: "PAYLOAD_TOO_LARGE", message: "A imagem deve ter no máximo 8 MB." });
  }
  const extension = contentType === "image/jpeg" || contentType === "image/jpg" ? "jpg" : contentType.split("/")[1];
  const stored = await storagePut(`news/${slug}.${extension}`, buffer, contentType);
  return { imageUrl: stored.url, imageKey: stored.key };
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  news: router({
    list: publicProcedure.query(() => listPublishedNews()),
    bySlug: publicProcedure.input(z.object({ slug: z.string().min(1) })).query(({ input }) => getPublishedNewsBySlug(input.slug)),
    adminList: adminProcedure.query(() => listAllNews()),
    create: adminProcedure.input(newsInput).mutation(async ({ input, ctx }) => {
      const slug = slugify(input.title);
      const image = await resolveImage(input, slug);
      return createNews({
        title: input.title,
        category: input.category,
        publishedAt: input.publishedAt,
        excerpt: input.excerpt,
        content: input.content,
        isPublished: input.isPublished,
        imageUrl: image.imageUrl,
        imageKey: image.imageKey,
        slug,
        createdBy: ctx.user.id,
      });
    }),
    update: adminProcedure.input(updateNewsInput).mutation(async ({ input }) => {
      const image = await resolveImage(input, `updated-${input.id}`);
      const updates: Partial<typeof news.$inferInsert> = {
        title: input.title,
        category: input.category,
        publishedAt: input.publishedAt,
        excerpt: input.excerpt,
        content: input.content,
        isPublished: input.isPublished,
      };
      if (input.imageData) {
        updates.imageUrl = image.imageUrl;
        updates.imageKey = image.imageKey;
      } else if (input.imageUrl !== undefined) {
        updates.imageUrl = input.imageUrl || null;
      }
      return updateNews(input.id, updates);
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteNews(input.id)),
    getById: adminProcedure.input(z.object({ id: z.number().int().positive() })).query(({ input }) => getNewsById(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
