export async function registerUser(email: string) {
    const user = await createUser(email);
    const wallet = await createWallet(user.id);
    return { user, wallet };
}

async function createUser(email: string) {
    return { id: '123', email };
}

async function createWallet(userId: string) {
    throw new Error('Wallet service down');
}

async function deleteUser(userId: string) {
    console.log('Deleting user', userId);
}
