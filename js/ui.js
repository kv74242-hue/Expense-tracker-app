const summaryEl = document.querySelector('#summary')
const transactionListEl = document.querySelector('#transaction-list')

export function renderSummary(summary = { totalIncome: 0, totalExpense: 0, balance: 0 }) {
     summaryEl.innerHTML = ''
     
     const incomeEl = document.createElement('p')
     const expenseEl = document.createElement('p')
     const balanceEl = document.createElement('p')
    

    incomeEl.textContent = `Total Income: $${(summary.totalIncome ?? 0).toFixed(2)}`
    expenseEl.textContent = `Total Expense: $${(summary.totalExpense ?? 0).toFixed(2)}`
    balanceEl.textContent = `Balance : $${(summary.balance ?? 0).toFixed(2)}`

    summaryEl.append(incomeEl,expenseEl,balanceEl)
     
}

export function renderTransactions(transactions) {
    transactionListEl.innerHTML = ''
    if(!transactions || transactions.length === 0 ) {
        const li = document.createElement('li')
        li.textContent = 'No transactions yet'

        transactionListEl.append(li)
        return
    } else{
        transactions.forEach((transaction)=> {
            const li = document.createElement('li')
            const span = document.createElement('span')
            span.textContent = `${transaction.title} | ${transaction.category} | ${transaction.date} | ${transaction.type} | ${transaction.amount.toFixed(2)}`

            const btn = document.createElement('button')
            btn.type = 'button'
            btn.textContent = 'Delete'
            btn.dataset.action = 'delete'
            btn.dataset.id = transaction.id

            li.append(span,btn)
            transactionListEl.appendChild(li)
        })
    }
}




