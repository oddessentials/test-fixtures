export interface UserV1 {
    id: string;
    username: string;
}

export const users: UserV1[] = [
    { id: "1", username: "alice" },
    { id: "2", username: "bob" },
];

export function getUsersV1(): UserV1[] {
    return users;
}
