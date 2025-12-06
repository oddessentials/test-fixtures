export interface Item {
    id: string;
    name: string;
    price: number;
}

export const items: Item[] = [
    { id: "1", name: "Widget", price: 10 },
    { id: "2", name: "Gadget", price: 20 },
    { id: "3", name: "Doodad", price: 15 },
];

export function getItems(query: Record<string, string>): Item[] {
    return items;
}
