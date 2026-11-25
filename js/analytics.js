export function calculateSummary(list) {
    
    const totals = list.reduce((acc ,item) => {
        if(item.type === 'income') {
            acc.totalIncome += item.amount
        } else if (item.type === 'expense') {
            acc.totalExpense += item.amount
        }
        return acc
    },{totalIncome:0, totalExpense:0})

const balance = totals.totalIncome - totals.totalExpense
    return {
        totalIncome: totals.totalIncome,
        totalExpense: totals.totalExpense,
        balance:balance
    }
}


