import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform, url }) => {
    const incrementBy = Number(url.searchParams.get('by') ?? '1');

	const counter = await platform?.env['ARYA-COUNTER'].get('count');

    if (!counter) {
        return error(500, 'Counter not found');
    }

    const updatedCounter = parseInt(counter, 10) + incrementBy;
    await platform?.env['ARYA-COUNTER'].put('count', updatedCounter.toString());

	return json({ counter: updatedCounter });
};