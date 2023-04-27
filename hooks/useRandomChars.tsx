export const useRandomChars = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i <= 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}