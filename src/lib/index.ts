export async function increment() {
    const response = await fetch('/api/increment')

    if (!response.ok) {
        throw new Error('Failed to increment counter')
    }

    return await response.json() as { counter: number }
}