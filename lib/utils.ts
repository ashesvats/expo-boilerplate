export function isEmpty(value:any) {
    if (value == null) return true; // Handles null and undefined
    if (typeof value === 'string' && value.trim() === '') return true; // Handles empty strings
    if (Array.isArray(value) && value.length === 0) return true; // Handles empty arrays
    if (typeof value === 'object' && Object.keys(value).length === 0) return true; // Handles empty objects
    return false;
}