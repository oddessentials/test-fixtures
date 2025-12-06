export async function processPayment(amount: number, idempotencyKey: string) {
    // Call external API
    const response = await fetch('https://api.gateway.com/charge', {
        method: 'POST',
        body: JSON.stringify({ amount })
    });
    if (!response.ok) {
        throw new Error('Payment failed');
    }
    return response.json();
}
