import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import { Pie } from 'react-chartjs-2'
function Loan() {
    const [start, setStart] = useState(false);
    const [principal, setPrincipal] = useState(0);
    const [interest, setInterest] = useState(0);
    const [years, setYears] = useState(0);
    const [emi, setEMI] = useState(0);
    const [totAmount, settotAmount] = useState(0);
    const handleChange = (e) => {
        console.log(e.target.id, e.target.value);
        const id = e.target.id;
        const value = parseInt(e.target.value);
        if (id === 'principal') {
            setPrincipal(value);
        } else if (id === 'interest') {
            setInterest(value);
        } else {
            setYears(value);
        }
    }
    // P(r(1+r)^n/((1+r)^n)-1))
    const calculate = () => {
        let r = interest;
        if (principal && r && years) {
            r = r / 12 / 100; // per month
            setStart(true)
            const calcPow = Math.pow(1 + r, years * 12);
            const emii = principal * ((r * calcPow) / (calcPow - 1));
            const tamount = emii * years * 12;
            settotAmount(Math.round(tamount));
            setEMI(Math.round(emii));
        }
        else{
            setStart(false)
        }
    }

    useEffect(() => {
        calculate();
    }, [principal, interest, years])

    return (
        <LoanStyled>
            <InnerLayout>
            <h1>Mortgage Caclulator</h1>
                <div className='loan-calc'>
                    

                    <div className='inputs'>
                        <p>Principal:</p>
                        <input
                            onChange={handleChange}
                            type='number' id='principal' />

                        <p>Interest:</p>
                        <input
                            onChange={handleChange}
                            type='number' id='interest' />

                        <p>Years:</p>
                        <input
                            onChange={handleChange}
                            type='number' id='year' />
                    </div>
                    <div className='container'>
                        <div className="output">
                            <div>EMI(Monthly)</div>
                            <div>{emi}</div>
                        </div>
                        <div className='output'>
                            <div>Total Interest</div>
                            <div>{totAmount - principal}</div>
                        </div>
                        <div className='output'>
                            <div>Total Payment(Loan Amount + Interest)</div>
                            <div>{totAmount}</div>
                        </div>
                    </div>
                </div>
                <div className='piechart'>
                {start && <Pie 
                    data={
                        {
                            labels: ['Total Interest', 'Total Amount'],
                            datasets: [{
                                data: [totAmount - principal, totAmount],
                                backgroundColor: ['yellow', 'blue']
                            }]
                        }
                    }
                    // width="100px"
                    // height="100px"
                    // options={{maintainAspectRatio:false}}
                />}
                </div>
            </InnerLayout>
        </LoanStyled>
    )
}

const LoanStyled = styled.div`
.piechart{
    display:flex;
    justify-content:center;
    height:300px;
}
.loan-calc{
    display:flex;
}
.inputs{
margin:10px 0;
font-size:1.2rem;
}
.inputs input{
    margin:7px 0;
    font-size:1.2rem;
}
.container{
    display:flex;
    width:100%;
    justify-content:center;
    flex-direction:column;
    align-items:center;

    margin:10px;
}
    .output{
        width:80%;
        margin:5px;
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 0.8rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    
`;

export default Loan