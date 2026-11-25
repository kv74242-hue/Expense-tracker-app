import { calculateSummary } from "./analytics.js";
import { loadTransactions,saveTransactions } from "./storage.js";
import { renderSummary, renderTransactions  } from "./ui.js";
import { filterByType } from "./filter.js";
const typeFilterSelect = document.querySelector('#type-filter')
const transactionListEl = document.querySelector('#transaction-list')
const transactionForm = document.querySelector('#transaction-form')
const titleInput = document.querySelector('#title-input')
const amountInput = document.querySelector('#amount-input')
const typeInput = document.querySelector('#type-input') 
const categoryInput = document.querySelector('#category-input') 
const dateInput = document.querySelector('#date-input') 
const formError = document.querySelector('#form-error')
const clearAllBtn = document.querySelector('#clear-all-btn')
let transactions = loadTransactions()

transactionForm.addEventListener('submit', (event)=> {
   event.preventDefault()
   const title = titleInput.value.trim()
   const amount = Number(amountInput.value)
   const type = typeInput.value
   const category = categoryInput.value
   const date = dateInput.value
   if (title === '' || Number.isNaN(amount) || amount <=0 ||
    (type !== 'income' && type !== 'expense') ||
    category === '' ||
    date === '' ) {
   formError.textContent = 'Please enter a valid title, amount, type, category, and date.'
    return
   } else{
    formError.textContent = ''
    const newTransaction = {
        id : crypto.randomUUID(),
        title: title,
        amount: amount,
        type: type,
        category: category,
        date: date
    }
    transactions.unshift(newTransaction)
    updateUI(transactions)    
    saveTransactions(transactions)
    transactionForm.reset()
    }
})

function updateUI(list = []) {
  const filteredTransactions = filterByType(list, typeFilterSelect.value)
  renderTransactions(filteredTransactions)
  renderSummary(calculateSummary(list))
}

transactionListEl.addEventListener('click',event=> {
    const deleteBtn = event.target.closest('button[data-action="delete"]')
    if(!deleteBtn) return
    transactions = transactions.filter((transaction) =>  transaction.id !== deleteBtn.dataset.id )
    updateUI(transactions)
    saveTransactions(transactions)
})

clearAllBtn.addEventListener('click', () => {
    if (transactions.length === 0) return
    const isConfirmed = confirm('Are you sure you want to delete this?')
    if(isConfirmed){
  transactions = []
  updateUI(transactions)
  saveTransactions(transactions)
} else{
    return
}
})

typeFilterSelect.addEventListener('change',()=> {
    updateUI(transactions)
})

updateUI(transactions)