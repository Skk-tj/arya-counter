import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform }) => {
    const counterByPerson = await platform?.env['ARYA-COUNTER'].get('countByPerson', "json") as Record<string, number>;

    console.log(counterByPerson);

    if (!counterByPerson) {
        return error(500, 'Counter not found');
    }

    if (params.personName in counterByPerson) {
        return json(counterByPerson[params.personName]);
    } else {
        return json(0);
    }
};