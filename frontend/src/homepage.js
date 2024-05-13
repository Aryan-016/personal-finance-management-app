import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Statistics from './Components/Statistics/Statistics'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import {Routes,Route,Navigate} from 'react-router-dom'
// import Register from './Components/register/register';
// import Login from './Components/login/login';
import Analysis from './Components/Analysis/Analysis';
import Loan from './Components/Loan/Loan';
import ViewTransaction from './Components/viewTransactions/viewTransactions';

function Homepage() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <ViewTransaction/>
      case 3:
        return <Analysis/>
      case 4:
        return <Income/>
      case 5: 
        return <Expenses/>
      case 6:
        return <Statistics/>
        case 7:
          return <Loan/>
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <HomepageStyled bg={bg} >
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </HomepageStyled>
  );}


const HomepageStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  
  @
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default Homepage;
