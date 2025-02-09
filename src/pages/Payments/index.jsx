import React, { useEffect,useState,createContext,useContext } from 'react';
import CardDataStats from '../../components/CardDataStats.jsx';
/* import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne'; */
import { LoanCard } from '../Loans/index.jsx';
import PaymentList from '../../components/PaymentList.jsx';
import { PaymentCard } from '../../components/PaymentList.jsx';
import paymentsModel from '../../database/models/Payments.js';
import {MoneyBag} from "../../components/Icons.jsx"


const TodayPaymentsContext = createContext()

export const useTodayPayments=()=>useContext(TodayPaymentsContext)


import { formatAmount } from '../../common/funcs.jsx';

const Payments= () => {


    const [payments,setPayments] = useState([])
    const [todayGains,setTOdayGains] = useState(0)
    const [todayAllpaymentsGains,setTodayAllGains] = useState(0)
    const [payed,setPayed] = useState([])
    const [todayAmount,setTodayAmount] = useState(0)

    const [page, setPage] = useState(1)
      const [limit, setLimit] = useState(15)
      const [totalPages, setTotalPages] = useState(1)
      const [search,setSearch] = useState("")
  const [totalPayments, settotalPayments] = useState(0)
    
    const [count,setCount] = useState(0)
     
  
    useEffect(()=>{

      const init = async (params) => {
        const data = await paymentsModel.getTodayPayments(page,limit,search)
       // console.log(data)
        setPayments(data)
        console.log(data)
        const totalResults = data[0].totalResults
        setTotalPages(limit< totalResults ? 
          Math.ceil(totalResults/limit)
        : 1
        )

        const totalPaymentQuery= await window.sqlite.query(`SELECT COUNT(id) as total
           FROM payments WHERE payment_date=DATE('now','localtime')`)

     settotalPayments(totalPaymentQuery[0].total)

     console.log(totalPaymentQuery[0].total)
        const amount =await  paymentsModel.getAmountSumFromTodaysPaymentsPayed()

        setTodayAmount(amount)
      const gainsPayed =await  paymentsModel.getGainsFromTodaysPaymentsPayed()

       setTOdayGains(gainsPayed)

       console.log(gainsPayed)
      }

      
     // const r = getGainsFromTodaysPaymentsPayed()

      
      
      //  const gainsAll = getGainsFromTodaysPaymentsAll()
       // console.log(gainsPayed)
        //setTOdayGains(0.00)

        
       // console.log(todayAmount)
      init()

      return ()=>{}
    },[page,search])



  return (
    <>
    
    <TodayPaymentsContext.Provider value={
      {
        setPayments,payments,setPayed,payed,setCount,
        page,
        setPage,
        totalPages,
        setTotalPages,
        setTOdayGains,
        todayAmount,
        setTodayAmount,
        todayGains,
        limit,
        setLimit,
        search,
        setSearch
      }
    }>
     <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Total de pagos de hoy" total={totalPayments} rate="0.43%" levelUp>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 7h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5M10 12h4M5 12H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l3 3h6l3-3h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-1" />
</svg>
        </CardDataStats>
       
        <CardDataStats title="Ganancia hoy" total={`$${todayGains? formatAmount(todayGains) : 0}`} rate="2.59%" levelUp>
        <MoneyBag></MoneyBag>
        </CardDataStats>
        <CardDataStats title="Total de dinero Recaudado" total={`$${typeof todayAmount == "number" ? formatAmount(todayAmount) : 0}`} rate="0.95%" levelDown>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 1C7.03 1 3 5.03 3 10v9h18V10c0-4.97-4.03-9-9-9zM7 15h10v3H7zm4-8h2V5h-2zm-4 0h2V5H7zM5 18h14v2H5z" />
</svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 ">
      
        <PaymentList payments={payments}></PaymentList>
  
  
      </div>
      </TodayPaymentsContext.Provider>
    </>
  );
};


/* 

const PaymentCard = ({id, name, amount,state, profileImage,onPay }) => {

    const [payment,setPayment] = useState({
        id:id,
        amount:amount,
        client:name,
        state:state
    })
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
       <div className='flex justify-content-center'>
        <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-16 h-16"
          
        >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6.75a3 3 0 11-6 0 3 3 0 016 0zM6.75 17.25a4.5 4.5 0 019 0M18.75 7.5h2.25M18.75 12h2.25M18.75 16.5h2.25"
    />
  </svg>
        </span>
  
       </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-800">{payment.client}</div>
          <p className="text-gray-700 text-base">{payment.amount} $</p>
          <p className={
            payment.state == "pending" ? "text-gray-700 text-base bg-amber-300": "text-gray-700 text-base bg-lime-500"
          }>{payment.state} </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button onClick={async (id)=>{

            const p = payment.state=="pending" ? "payed": "pending"
            console.log("UPDATE payments SET state='"+p+"' WHERE id='"+payment.id+"'")

            const query = `UPDATE payments SET state='${
                payment.state == "pending" ? "payed":"pending"
            }' WHERE id='${payment.id}'
            `
           
            console.log(query)
            await window.sqlite.query(query)
            setPayment({
                ...payment,
                state: payment.state == "pending" ? "payed":"pending"
            })
            
          }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Pagar
          </button>
  
         

          
        </div>
      </div>
      </TodayPaymentsContext.Provider>
    );
  };
   */
export default Payments
