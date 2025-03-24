import type { PageServerLoad } from './$types';

export const ssr = true

export const load: PageServerLoad = async ({ platform }) => {
    const counter = await platform?.env['ARYA-COUNTER'].get('counter');
    if (!counter) {
        return { counter: 0 };
    }

	return { counter: parseInt(counter, 10) };
};