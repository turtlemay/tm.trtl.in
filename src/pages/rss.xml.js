import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import text from '../../entries.txt?raw';
import { parseEntries } from '../../parse-entries.js';

const parser = new MarkdownIt();

// @ts-ignore
export async function GET(context) {
	return rss({
		title: "tm.trtl.in",
		description: "Turtlemay's writings.",
		site: context.site,
		items: await getItems(),
		customData: "<language>en-us</language>",
	});
}

async function getItems() {
	const arr = [
		...parseEntries(text).map(v => ({
			title: v.date,
			pubDate: new Date(v.date),
			content: v.content,
			customData: "<postType>status</postType>",
		})),
		...(await getCollection('pages')).map(v => ({
			title: v.data.title,
			pubDate: v.data.pubDate,
			link: `/${v.id}`,
			content: sanitizeHtml(parser.render(v.body ?? ''), {
				allowedTags: sanitizeHtml.defaults.allowedTags,
			}),
		})),
		...(await getCollection('posts')).map(v => ({
			title: v.data.title,
			pubDate: v.data.pubDate,
			link: `/posts/${v.id}`,
			content: sanitizeHtml(parser.render(v.body ?? ''), {
				allowedTags: sanitizeHtml.defaults.allowedTags,
			}),
		})),
		...await pagesGlobToRssItems(
			import.meta.glob([
				'./*.{md,mdx}',
				'!./index.*',
				'!./now.*',
				'!./medialog.*',
				'!./microblog.*',
				'!./contact.*',
				'!./misc.*',
			]),
		),
	];
	const chronologicalOrder = arr.sort((a, b) => {
		const date1 = a.pubDate ?? new Date();
		const date2 = b.pubDate ?? new Date();
		// @ts-ignore
		return date1 - date2;
	});
	return chronologicalOrder.reverse();
}
