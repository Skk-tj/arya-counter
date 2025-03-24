export async function increment(by: number): Promise<{ counter: number }> {
    const response = await fetch(`/api/increment?by=${by}`)

    if (!response.ok) {
        throw new Error('Failed to increment counter')
    }

    return await response.json() as { counter: number }
}

export async function incrementByPerson(personName: string | null, by: number): Promise<Record<string, number>> {
    if (personName === null) {
        console.log("personName is null");
        throw new Error("personName is null");
    }

    if (personName === '') {
        console.log("personName is empty");
        throw new Error("personName is empty");
    }

    const response = await fetch(`/api/increment/${personName}?by=${by}`)
    if (!response.ok) {
        throw new Error(`Failed to increment counter for ${personName}`)
    }

    return await response.json() as Record<string, number>;
}

export async function getCounterByPerson(personName: string | null): Promise<number> {
    if (personName === null) {
        console.log("personName is null");
        throw new Error("personName is null");
    }

    if (personName === '') {
        console.log("personName is empty");
        throw new Error("personName is empty");
    }

    const response = await fetch(`/api/${personName}`)
    if (!response.ok) {
        throw new Error(`Failed to get counter for ${personName}`)
    }

    return await response.json() as number;
}

export async function getCount(): Promise<string> {
    const response = await fetch(`/api`)
    if (!response.ok) {
        throw new Error('Failed to get counter')
    }

    return await response.json() as string
}