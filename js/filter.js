export function filterByType(transactions, selectedType) {
    if (selectedType === 'all') return transactions
  return transactions.filter(item =>
    item.type === selectedType
  )
}
