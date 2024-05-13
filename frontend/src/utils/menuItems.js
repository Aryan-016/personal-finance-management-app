import {dashboard, expenses, transactions, trend,history,analysis,emi} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Analysis",
        icon: analysis,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "History",
        icon: history,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "Mortgage Calculator",
        icon: emi,
        link: "/dashboard",
    },
]