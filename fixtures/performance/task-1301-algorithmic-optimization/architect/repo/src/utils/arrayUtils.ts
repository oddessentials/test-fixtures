export function findDuplicates(items: number[]): number[] {
    const duplicates: number[] = [];
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            if (items[i] === items[j] && !duplicates.includes(items[i])) {
                duplicates.push(items[i]);
            }
        }
    }
    return duplicates;
}
