import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
	posts: defineCollection({
		loader: glob({ pattern: "**/*.mdx", base: "./posts" }),
		schema: z.object({
			title: z.string(),
			pubDate: z.date(),
		}),
	}),
	pages: defineCollection({
		loader: glob({ pattern: "**/*.mdx", base: "./pages" }),
		schema: z.object({
			title: z.string(),
			pubDate: z.date(),
		}),
	}),
};