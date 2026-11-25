const STORAGE_KEY = 'transactions'

function isValidTransaction(item) {
    if (!item || typeof item !== 'object') return false;

    const hasValidId =
        (typeof item.id === 'string' && item.id.trim().length > 0)

    const hasValidTitle =
        typeof item.title === 'string' && item.title.trim().length > 0

    const hasValidAmount =
        typeof item.amount === 'number' && Number.isFinite(item.amount) && item.amount > 0

    const hasValidType =
        item.type === 'income' || item.type === 'expense'

    const hasValidCategory =
        typeof item.category === 'string' && item.category.trim().length > 0
    const hasValidDate =
        typeof item.date === 'string' && item.date.trim().length > 0

    return (
        hasValidId &&
        hasValidTitle &&
        hasValidAmount &&
        hasValidType &&
        hasValidCategory &&
        hasValidDate
    )
}
export function saveTransactions(transactions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}
export function loadTransactions() {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) {
        return []
    }

    let parsed
    try {
        parsed = JSON.parse(raw)
    } catch {
        localStorage.removeItem(STORAGE_KEY)
        return []
    }

    if (!Array.isArray(parsed)) {
        localStorage.removeItem(STORAGE_KEY)
        return []
    }

    const validTransactions = parsed.filter(isValidTransaction)

    if (validTransactions.length === 0) {
        localStorage.removeItem(STORAGE_KEY)

    } else if (validTransactions.length !== parsed.length) {
        saveTransactions(validTransactions)
    }

    return validTransactions
}

