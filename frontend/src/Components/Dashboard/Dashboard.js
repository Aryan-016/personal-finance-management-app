import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {incomes, expenses, getIncomes, getExpenses } = useGlobalContext()
    const user=JSON.parse(localStorage.getItem('user'))
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.filter((income)=>{
            let m=new Date(income.date).getMonth()+1
            let y=new Date().getFullYear()
            if(m<10){m='0'+m}
            y= y+'-'+m
            return month==y?true:false
    }).forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.filter((income)=>{
            let m=new Date(income.date).getMonth()+1
            let y=new Date().getFullYear()
            if(m<10){m='0'+m}
            y= y+'-'+m
            return month==y?true:false
    }).forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }
    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])
    const [month, setMonth] = useState(()=>{
        let m=new Date().getMonth()+1
        let y=new Date().getFullYear()
        if(m<10){m='0'+m}
        return y+'-'+m})

    
    const selectMonth=(event)=> {
        setMonth(event.target.value)
    }
    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Hi, {user.first_name[0].toUpperCase()+user.first_name.slice(1)}</h1>
                <h1>Your Monthly Total Balance is</h1>
                <div className='selects'>
                {/* {console.log(new Date())} */}
            <input type='month' defaultValue={month} onChange={selectMonth}/>
            {/* {console.log(new Date(incomes[0].date).getMonth()+1)} */}
            </div>
                <div className="stats-con">
                    <div className="chart-con">
                        {/* <Chart /> */}
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
input, textarea, select{
    margin:10px 0;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    width:40%;
    border: none;
    padding: .5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder{
        color: rgba(34, 34, 96, 0.4);
    }
}
.selects{
    display: flex;
    
    justify-content: flex-start;
    select{
        color: rgba(34, 34, 96, 0.4);
        &:focus, &:active{
            color: rgba(34, 34, 96, 1);
        }
    }
}
    .stats-con{
        display: flex;
        justify-content:center;
        margin:30px;
        
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 2rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    margin-bottom:10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard