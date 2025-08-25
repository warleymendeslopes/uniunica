/**
 * Generates a stable random number that persists for a specified time period
 * Uses localStorage to cache the value with TTL (time to live)
 */
export function getStableRandom(
    min: number,
    max: number,
    key = "default",
    ttlMs: number = 24 * 60 * 60 * 1000, // 24 hours default
): number {
    if (typeof window === "undefined") {
        // Server-side fallback - return middle value
        return Math.floor((min + max) / 2)
    }

    const storageKey = `stable_random_${key}`
    const now = Date.now()

    try {
        const stored = localStorage.getItem(storageKey)

        if (stored) {
            const { value, timestamp } = JSON.parse(stored)

            // Check if the stored value is still valid (within TTL)
            if (now - timestamp < ttlMs) {
                return value
            }
        }
    } catch (error) {
        // Handle localStorage errors gracefully
        console.warn("Error reading from localStorage:", error)
    }

    // Generate new random value
    const newValue = Math.floor(Math.random() * (max - min + 1)) + min

    try {
        // Store the new value with timestamp
        localStorage.setItem(
            storageKey,
            JSON.stringify({
                value: newValue,
                timestamp: now,
            }),
        )
    } catch (error) {
        // Handle localStorage errors gracefully (e.g., quota exceeded)
        console.warn("Error writing to localStorage:", error)
    }

    return newValue
}
