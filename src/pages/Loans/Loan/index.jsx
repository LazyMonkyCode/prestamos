import React,{useState,useEffect,createContext,useContext} from 'react';
import CardDataStats from '../../../components/CardDataStats';
/* import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne'; */
//import { getClient,deleteClient, getClientLoans, getPaymentsByState } from './funcs';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useNavigate,useParams } from 'react-router-dom';
//import { LoansList } from './components/Loans';

import { DeleteIcon, DollarIcon, MoneyBag, PaymentIcon2, WalletIcon } from '../../../components/Icons';
import {PaymentsList} from './components/PaymentsList';
import Pagination from '../../../components/Pagination';
import Select from '../../../components/Forms/SelectGroup/Select';

import { Link } from 'react-router-dom';
import EditLoanModal from '../../Clients/Client/components/EditLoanModal';
import DropdownDefault from '../../../components/Dropdowns/DropdownDefault';
import ClientContextProvider from "../../../context/ClientContext"
import paymentsModel from '../../../database/models/Payments';
import loansModel from '../../../database/models/Loans';
import Tag from '../../../components/Tag';
const  LoanContext = createContext()


export const useLoans=()=> useContext(LoanContext)

const Loan= () => {

 
  const { loanId } = useParams();
  const [loan,setLoan] = useState({})
  const [payments,setPayments] = useState([])
  const [expired,setExpired] = useState([])
  const [totalPayments,settotalPayments] = useState(0)
  const [gains, setGains] = useState(0);
  const [netGains, setNetGains] = useState(0);
  const [payed, setPayed] = useState(0);
  const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [search, setSearch] = useState("");
    const [totalPages,setTotalPages] = useState(1);
    const [filter,setFilter] = useState("");

  const updatePayments=(payments)=>setPayments(payments)
  //console.log(loanId)
  
  useEffect(() => {
    const init= async()=>{

      settotalPayments(await paymentsModel.getTotalPayments(loanId) )

      //await window.sqlite.query("UPDATE payments  set payment_date='2025-01-29' WHERE id=388")
      const ex = await paymentsModel.getExpiredPayments(loanId);
     
      setExpired(ex ? ex.length : 0)

      const gainsQuery=await loansModel.getGainsLoan(loanId)
      setGains(gainsQuery.gains)

      setNetGains(gainsQuery.netas)
      const data = await loansModel.getLoan(loanId)
      
      setLoan(data[0])
      
     
      

      const payments = await paymentsModel.getLoansPayments(loanId,{
        page,
        limit:limit
      },filter)
      
      
      setTotalPages(limit<payments.total ? Math.ceil(payments.total/limit) : 1)
     
      setPayments(payments.payments)


      if(loanId){
        const payedPayments =   await paymentsModel.getLoanPayedPaymentsTotal(loanId)
      
      
        setPayed(payedPayments.total_paid_payments)

      
      }


/* 
      setLoans(loansData)
      console.log(loansData)
      setClient(data[0])

      const expiredPayments  = await getPaymentsByState("expired"); 
      setExpired(expiredPayments) */
    }

    init()
  
    return () => {
      
    }
  }, [limit,page,filter])


 // console.log('Loan state in render:', loan); // Aquí se imprimirá el valor más actualizado


  function setState(state){
    
    setLoan((prev)=>{
      return {
        ...prev,
        state:state
      }
    })
  }
 
  function changePage(page){
    setPage(page)
  }
 
  
  return (
    <>
  
    <LoanContext.Provider value={
      {
        payments,
        updatePayments,
        setLimit,
        Loan,
        setLoan,
        loanId,
        payed,
        setPayed,
        gains,
        setGains,
        netGains,
        setNetGains,
        setState,
        expired,setExpired
      }
    }>
       

     <Breadcrumb pageName="Prestamo" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Pagos Totales " total={totalPayments} rate="0.0%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Pagos Vencidos" total={expired} rate="0.0%" levelDown>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
              fill=""
            />
            <path
              d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Ganancia actual" total={"$"+Intl.NumberFormat('de-DE').format(gains)} rate="0.0%" levelUp>
         <MoneyBag></MoneyBag>
        </CardDataStats>
        
        <CardDataStats title="Dinero Recaudado" total={"$"+Intl.NumberFormat('de-DE').format(netGains)} rate="0.0%" levelUp>
         <MoneyBag></MoneyBag>
        </CardDataStats>
        
      </div>

      <div className=' bg-white my-6 flex justify-between items-center'>
          <div>
         
          {/* <button className='bg-primary text-sm text-white p-2 rounded-sm'>
            agregar pago
          </button> */}
          </div>
          <Select 
          onChange={(e)=>setFilter(e.target.value)} 
          options={[{
            label:"filtro",
            value:"",
            selected:true
          },
          {

            label:"Pagados",
            value:"payed",
            selected:false
          },
            {

            label:"Vencidas",
            value:"expired",
            selected:false
          },{
            label:"Pendientes",
            value:"pending",
            selected:false
          },
          {
            label:"Incompletos",
            value:"incommplete",
            selected:false
          }
          ]}>

          </Select>
          <Pagination currentPage={page} totalPages={totalPages} changePage={changePage}></Pagination>
          
        </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <div className="col-span-6 xl:col-span-4">
          
          <LoanCard
            loan={loan}
            id={loanId}
          ></LoanCard> 
        
        </div>
       
        <div className="col-span-6 xl:col-span-8">
         <PaymentsList payments={payments} />
        </div>
        {/* <ChatCard /> */}
      </div>
      </LoanContext.Provider>
     
    </>
  );
};


export const LoanCard = ({loan,id}) => {

  
  const {loan:loanState,setLoan,loanId,payed,setPayed} = useLoans()

  const {amount,installments,aproved_date:date,state,label,nickname,client_id} = loan

  
 
  const navigate = useNavigate()
  

  

  useEffect(() => {
    
    const init = async ()=>{

     
      
    }  


    init();


  }, [])
  

  return (
    <div className="max-w-sm  bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <DropdownDefault >

    {/*    <EditLoanModal loan={loan} label={"Editar prestamo"} button={ <button 
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
           <svg
             className="fill-current"
             width="16"
             height="16"
             viewBox="0 0 16 16"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <g clipPath="url(#clip0_62_9787)">
               <path
                 d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                 fill=""
               />
             </g>
             <defs>
               <clipPath id="clip0_62_9787">
                 <rect width="16" height="16" fill="white" />
               </clipPath>
             </defs>
           </svg>
           Editar Prestamo
         </button>}>
          
         </EditLoanModal> */}
        
          <button 
                 onClick={async()=>{
                  
                  try {
                   
                    await loansModel.deleteLoan(id)
  
                    navigate(-1) 
                     
                  } catch (error) {
                    console.log(error)
                  }
                  

                 }}
                 className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                  <DeleteIcon></DeleteIcon>
                   Borrar Prestamo
                 </button> 
          </DropdownDefault>
      <div className="flex justify-center  items-center">
        {/* Client Icon */}
        <div className="bg-blue-500 text-white w-15 h-15 flex flex-row justify-center items-center rounded-full">
         <WalletIcon/>
        </div>
        {/* Client Info */}
        
      </div>
      <div className="ml-4">
          <h3 className="text-lg text-center font-semibold text-gray-800">{label}</h3>
         
        </div>
      {/* Divider */}

      
      <div className="my-4 border-t border-gray-200"></div>
      

      <p className='text-center text-success font-bold text-3xl '>$ {Intl.NumberFormat('es-ES').format(amount)} 
      </p>
      <p>
      Cuotas : {installments }
      </p>
      <p>
       Fecha entrega : {date}
      </p>
      <p>
       Cliente :<Link to={"/clients/"+client_id}><span className='text-bold text-lg text-black-2'> {nickname}</span></Link>
      </p>

      <div className="my-4 border-t border-gray-200"></div>
      {/* Rating Section 
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">Rating:</p>
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <StarIcon key={i} filled={i < rating} />
            ))}
        </div>
      </div>*/}
      

      {/* Action Button */}
      <div className="flex gap-1">
         {/*  <span className='bg-danger text-sm text-white p-1 rounded-md '>cuotas vencidas</span> */}
          {/* estadoo  */}
          {
           state =="active" ? 
           (<Tag type={"primary"} label={"activo"}></Tag>)
           : state=="completed" ? 
           (<Tag type={"success"} label={"completado"}></Tag>)
           :
           (<Tag type={"danger"} label={"cancelado"}></Tag>)
          }
       
       {/* cuotas pagas */}
          <span className='bg-success text-sm text-white p-1 rounded-md '>{payed} Pagas</span>
      </div>
    </div>
  );
};



export default Loan;
