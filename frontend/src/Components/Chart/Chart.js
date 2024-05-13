import React, { useState,useEffect } from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    scales,
} from 'chart.js'
import { DatePicker } from 'antd'
import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [category, setCategory] = useState('')
    const [month, setMonth] = useState(()=>{
        let m=new Date().getMonth()+1
        let y=new Date().getFullYear()
        if(m<10){m='0'+m}
        return y+'-'+m})
        const selectMonth=(event)=> {
            setMonth(event.target.value)
        }
    const {incomes, expenses} = useGlobalContext()
    incomes.sort(function(a,b){
        let d1=new Date(a.date),d2=new Date(b.date)
        if(d1>d2)
        {
            return 1
        }
        else
        return -1
    })
    expenses.sort(function(a,b){
        let d1=new Date(a.date),d2=new Date(b.date)
        if(d1>d2)
        {
            return 1
        }
        else
        return -1
    })
    // console.log(incomes)
    const data_income = {
        
        labels: incomes.filter((income)=>{
            let m=new Date(income.date).getMonth()+1
            let y=new Date().getFullYear()
            if(m<10){m='0'+m}
            y= y+'-'+m
            return month==y?true:false
    }).map((inc) =>{
            const {date} = inc
            // console.log(expenses)
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.filter((income)=>{
                        let m=new Date(income.date).getMonth()+1
                        let y=new Date().getFullYear()
                        if(m<10){m='0'+m}
                        y= y+'-'+m
                        return month==y?true:false
                }).map((income) => {
                        const {amount} = income
                        console.log(amount)
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
        ]
    }

    const data_expenses = {
        labels: expenses.filter((income)=>{
            let m=new Date(income.date).getMonth()+1
            let y=new Date().getFullYear()
            if(m<10){m='0'+m}
            y= y+'-'+m
            return month==y?true:false
    }).map((inc) =>{
            const {date} = inc
            // console.log(expenses)
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        console.log(amount)
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            },
        ]
    }
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



    return (
        <ChartStyled >
            <div className="selects input-control">
                <select required value={category} onChange={handleInput} name="category" id="category">
                    <option value=""  hidden>Select Option</option>
                    <option value='Income'>Income</option>
                    <option value="Expenses">Expenses</option>
                </select>
            </div>
            <div><input type='month' defaultValue={month} onChange={selectMonth}/></div>
            {category=='Income'?<Line data={data_income}/> :null  }  
            {category=='Expenses'?<Line data={data_expenses} /> :null  }        
      
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
input, textarea, select{
    margin:10px 0;
    font-family: inherit;
    font-size: inherit;
    outline: none;
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
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    
`;

export default Chart