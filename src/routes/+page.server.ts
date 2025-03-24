import type { PageServerLoad } from './$types';

export const ssr = true

export const load: PageServerLoad = async ({ platform }) => {
    const counter = await platform?.env['ARYA-COUNTER'].get('count');
    if (!counter) {
        console.error('Counter not found');
        return { counter: 0 };
    }

	return { counter: parseInt(counter, 10) };
};