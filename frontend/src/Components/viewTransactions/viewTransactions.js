import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import IncomeItem from '../IncomeItem/IncomeItem';
function ViewTransaction() {
    const { totalExpenses, incomes, expenses, totalIncome,deleteExpense, addIncome, deleteIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])
    incomes.sort(function (a, b) {
        let d1 = new Date(a.date), d2 = new Date(b.date)
        if (d1 > d2) {
            return 1
        }
        else
            return -1
    })
    expenses.sort(function (a, b) {
        let d1 = new Date(a.date), d2 = new Date(b.date)
        if (d1 > d2) {
            return 1
        }
        else
            return -1
    })
    const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [category, setCategory] = useState('')
    const [month, setMonth] = useState(()=>{
        let m=new Date().getMonth()+1
        let y=new Date().getFullYear()
        if(m<10){m='0'+m}
        return y+'-'+m})

    const handleInput=(event)=> {
        setCategory(event.target.value)
    }
    const Type=
    [
        {id:1,type:'Income'},
        {id:2,type:'Expenses'}
    ]
    useEffect(
        ()=>{
            setCategory(Type)
        },[]
    )
    const selectMonth=(event)=> {
        setMonth(event.target.value)
    }
    return (
        <ViewTransactionStyled>
            <InnerLayout>
            <div className="selects input-control">
                <select required value={category} onChange={handleInput} name="category" id="category">
                    <option value=""  hidden>Select Option</option>
                    <option value='Income'>Income</option>
                    <option value="Expenses">Expenses</option>
                </select>
            </div>
            <div className='selects'>
                {/* {console.log(new Date())} */}
            <input type='month' defaultValue={month} onChange={selectMonth}/>
            {/* {console.log(new Date(incomes[0].date).getMonth()+1)} */}
            </div>
                {category=="Income" ?
                (<div className="incomes">
                    {/* {
                        incomes.filter((income)=>{
                            let m=new Date(income.date).getMonth()+1
                            let y=new Date().getFullYear()
                            if(m<10){m='0'+m}
                            y= y+'-'+m
                            console.log(month==y?true:false)
                    })} */}
                    {incomes.filter((income)=>{
                            let m=new Date(income.date).getMonth()+1
                            let y=new Date().getFullYear()
                            if(m<10){m='0'+m}
                            y= y+'-'+m
                            return month==y?true:false
                    }).map((income) => {
                        const { _id, amount, date, category, description, type } = income;
                        return <IncomeItem
                            key={_id}
                            id={_id}
                            description={description}
                            amount={amount}
                            date={date}
                            type={type}
                            category={category}
                            indicatorColor="var(--color-green)"
                            deleteItem={deleteIncome}
                        />
                    })}
                </div>):null}
                {category=='Expenses' ? (<div className="incomes">
                    {expenses.filter((income)=>{
                            let m=new Date(income.date).getMonth()+1
                            let y=new Date().getFullYear()
                            if(m<10){m='0'+m}
                            y= y+'-'+m
                            return month==y?true:false
                    }).map((income) => {
                        const { _id, amount, date, category, description, type } = income;
                        console.log(income)
                        return <IncomeItem
                            key={_id}
                            id={_id}
                            description={description}
                            amount={amount}
                            date={date}
                            type={type}
                            category={category}
                            indicatorColor="red"
                            deleteItem={deleteExpense}
                        />
                    })}
                </div>):null}
            </InnerLayout>
        </ViewTransactionStyled>
    )
}

const ViewTransactionStyled = styled.div`
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

`;

export default ViewTransaction