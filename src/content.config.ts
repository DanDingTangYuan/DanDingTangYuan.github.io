import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const devlog = defineCollection({
	// Load Markdown and MDX files in the `src/content/devlog/` directory.
	loader: glob({ base: './src/content/devlog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		version: z.string().optional(),
		repoURL: z.string().url().optional(),
		tags: z.array(z.string()).default([]).optional(),
		projectStatus: z.enum(['development', 'maintenance', 'fixing' , 'completed', 'abandoned']).optional(),
		thumbnail: z.string().url().optional(),
		}),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]).optional(),
		thumbnail: z.string().url().optional(),
		draft: z.boolean().optional(),
		}),
});

const story = defineCollection({
	// Load Markdown and MDX files in the `src/content/story/` directory.
	loader: glob({ base: './src/content/story', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(), 
		series: z.string(),
		chapter: z.number(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		status: z.enum(['ongoing', 'completed', 'hiatus']).default('ongoing'),
		tags: z.array(z.string()).default([]).optional(),
		coverImage: z.string().url().optional(),
		}),
});

const wiki = defineCollection({
	// Load Markdown and MDX files in the `src/content/wiki/` directory.
	loader: glob({ base: './src/content/wiki', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(), 
        category: z.enum(['Character', 'Location', 'Item', 'Lore']),
        updatedDate: z.coerce.date(),
        tags: z.array(z.string()).optional(),
		thumbnail: z.string().url().optional(),
		}),
});

export const collections = { devlog,blog,story,wiki };
