
import React,{useState} from "react";
import { ClientIcon } from "../../../components/Icons";
import { WalletIcon } from "../../../components/Icons";
import { Link } from "react-router-dom";
import { formatAmount } from "../../../common/funcs";


 const LoansList = ({ loans }) =>{

  console.log(loans)

  return (<div className="col-span-6  md:col-span-6 xl:col-span-2 max-w-3xl  bg-white  rounded-sm overflow-hidden">
    {/* Título */}
    <div className=" text-md font-semibold p-4 flex items-center">
      
      <h3>Ultimos Prestamos </h3>
    </div>

    {loans.length>0 ? loans.map((loan) => (
      <LoansListItem key={loan.loanId} loan={loan}></LoansListItem>
    )): (
      <div className='flex justify-center items-center p-10 '>

          <span className='text-xl text-gray-300' >No hay Prestamos Registrados</span>
      </div>
    )}
  </div>)
 }
  
  
export  function LoansListItem({loan}) {
  
    const [payment,setPayment] = useState(loan)
  
  
    return (
      <div
          
          className="flex items-center justify-between px-6 py-4 border-b last:border-b-0 hover:bg-gray-50"
        >
          {/* Información del cliente */}
          <div className="flex items-center">
            {/* Icono de cliente */}
             <div className=" mr-2 bg-primary text-white w-10 h-10 flex flex-row justify-center items-center rounded-full">
             <WalletIcon></WalletIcon>
                       </div>
           
            <div>
              <h3 className="text-gray-700">
               <Link to={"/clients/"+payment.client_id}>{payment.nickname}</Link> 
              </h3>
            </div>
          </div>
  
          {/* Monto y estado */}
          <div className="flex items-center space-x-4">
            {/* Icono de monto */}
            <div className="flex items-center text-gray-500">
              
              <span className="text-lg font-semibold  font-medium">${formatAmount(payment.amount)}</span>
            </div>
  
            {/* Estado */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                payment.state === "Pendiente"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
             <Link className="text-sky-600" to={"/prestamos/"+payment.loanId}>ver prestamo</Link>
            </span>
          </div>
  
          {/* Botón de acción */}
        
        </div>
    )
  }
  
  
  
  export default LoansList
  
  