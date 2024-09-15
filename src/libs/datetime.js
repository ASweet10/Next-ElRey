export function databaseTimeForHuman(str) {
    return str.replace('T', ' ').substring(0, 16) // Replace T with space and limit to 16 chars
}