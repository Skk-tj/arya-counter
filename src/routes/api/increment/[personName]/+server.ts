import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform, url }) => {
    const incrementBy = Number(url.searchParams.get('by') ?? '1');
    const counterByPerson = await platform?.env['ARYA-COUNTER'].get('countByPerson', "json") as Record<string, number>;

    console.log(counterByPerson);

    if (!counterByPerson) {
        return error(500, 'Counter not found');
    }

    if (params.personName in counterByPerson) {
        counterByPerson[params.personName] += incrementBy;
    } else {
        counterByPerson[params.personName] = 1;
    }

    await platform?.env['ARYA-COUNTER'].put('countByPerson', JSON.stringify(counterByPerson));

    return json(counterByPerson);
};