export function required(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
}

export function isInteger(value: any): boolean {
    return Number.isInteger(Number(value));
}

export function isValidIBAN(value: string): boolean {
    return value !== null && value !== undefined && value.length <= 34 && value.trim() !== '';
}

export function isValidDNI(value: string): boolean {
    return value === null || value === undefined || value === '' || value.length === 9;
}

export function isPositiveAmount(value: any): boolean {
    return !isNaN(value) && Number(value) > 0;
}