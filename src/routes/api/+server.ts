import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
    const counter = await platform?.env['ARYA-COUNTER'].get('count');

    if (!counter) {
        return error(500, 'Counter not found');
    }

    return json(counter);
};