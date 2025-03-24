import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	const counter = await platform?.env['ARYA-COUNTER'].get('counter');

    if (!counter) {
        return error(500, 'Counter not found');
    }

    const updatedCounter = parseInt(counter, 10) + 1;
    await platform?.env['ARYA-COUNTER'].put('counter', updatedCounter.toString());

	return json({ counter: updatedCounter });
};