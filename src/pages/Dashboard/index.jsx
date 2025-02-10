import React,{useState,useEffect} from 'react';

import { Link } from 'react-router-dom';
import { ClientIcon, DollarSign, MoneyBag, WalletIcon } from '../../components/Icons.jsx';
import { formatAmount } from '../../common/funcs.jsx';
import CardDataStats from "../../components/CardDataStats.jsx"
import LoansList from './components/LoanList.jsx';
import DashContextProvider from './context/DashContext.jsx';

import clients from '../../database/models/Clients.js';
import loansModel from '../../database/models/Loans.js';
import paymentsModel from '../../database/models/Payments.js';
import payments from '../../database/models/Payments.js';
import ChartOne from '../../components/Charts/ChartOne.jsx';
import ChartTwo from '../../components/Charts/ChartTwo.jsx';
import ChartThree from '../../components/Charts/ChartThree.jsx';
import clientsModel from '../../database/models/Clients.js';





const Dashboard = () => {

  const [loans,setLoans] = useState([])
  const [totalLoans,setTotalLoans] = useState(0)
  const [payments,setPayments] = useState([])
  const [monthly,setMonthly] = useState(0)
  const [loansTotalAmount, setloansTotalAmount] = useState(0)
 const [paymentsTotalAmount, setpaymentsTotalAmount] = useState(0)

  useEffect(() => {
    
    async function init() {

     const Amounts =  await loansModel.getTotalLoansAmountPayments()
     
     //const r = await window.sqlite.query("SELECT *,SUM(amount) as sum from loans ORDER BY amount DESC ")
     
     console.log(Amounts)
     setloansTotalAmount(Amounts.loans-Amounts.payments)

     setpaymentsTotalAmount(Amounts.payments)

     console.log(loansTotalAmount)
      await paymentsModel.setExpiredPayments()
      

 /* await window.sqlite.query(`  DELETE FROM loans
WHERE client_id NOT IN (
    SELECT id
    FROM clients
);`)
    
       await window.sqlite.query(`DELETE FROM payments
        WHERE NOT EXISTS (
            SELECT 1
            FROM loans
            WHERE loans.id = payments.loan_id
        );`) */
    //  console.log(await paymentsModel.getWeekPayments())

      

   /*    const lastLoans = await loansModel.getLastLoans()
      setLoans(lastLoans)

       */


   
      const monthlyGains = await paymentsModel.getMonthlyPaymentGains()
     
      setMonthly(monthlyGains)

      const total = await loansModel.getTotalLoans()

      setTotalLoans(total[0].total)

      clientsModel.getClientsPaymentsState("expired")
     // console.log(lastLoans)

     /*  const debtors =await  
      console.log(debtors)
      
      
      const lastLoans = await getLastLoans()
      const lastPayments = await getLastPayments()
     // console.log(lastPayments)

      setPayments(lastPayments)
     
     */
    console.log(await  window.sqlite.query(`SELECT * FROM payments WHERE payment_date='2025-02-03' AND state='payed'`))
    }
    

    init()



    return () => {
      
    }
  }, [])
  

  return (
    <>
    <DashContextProvider value={{
      setPayments,
    }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total de Prestamos" total={totalLoans} rate="0.0" levelUp>
          <WalletIcon></WalletIcon>
        </CardDataStats>
        <CardDataStats title="Ganancia Total" total={"$"+formatAmount(monthly) || 0}  levelUp>
          <MoneyBag  className="fill-primary dark:fill-white"
            width="22"
            height="22"></MoneyBag>
        </CardDataStats>
        <CardDataStats title="Total Dinero cirulando" total={"$"+formatAmount(loansTotalAmount || 0) }  levelUp>
         <DollarSign width={"22"} height={"22"}/>
        </CardDataStats>

        <CardDataStats title="Total pagado de cuotas" total={"$"+formatAmount(paymentsTotalAmount || 0) }  levelUp>
         <DollarSign width={"22"} height={"22"}/>
        </CardDataStats>
        
      </div>
      {/* end   */}

    
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

      <ChartThree /> 
        
        <ChartTwo></ChartTwo>

        <ChartOne></ChartOne>
        {/* <div className="col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-8">
           <LoansList loans={loans}>
            </LoansList> 
        </div>
        <div className="col-span-5 xl:col-span-4">
            sdasd
        </div> */}
        {/* <ChatCard /> */}
      </div>
      </DashContextProvider>
    </>
  );
};




export default Dashboard;
