import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Eye, MoneyBillAlt, NoteIcon, PaymentIcon } from "../../../../components/Icons";

import EditModalPayment from "./EditModalPayment";
import DropdownDefault from "../../../../components/Dropdowns/DropdownDefault";

import { useNotification } from "../../../../components/Notifications";


import { useLoans } from "..";
import { formatDateDifference } from "../../../../common/funcs";
import PaymentModal from "./PaymentModal";
import paymentsModel from "../../../../database/models/Payments";
import loansModel from "../../../../database/models/Loans";



export const PaymentsList = ({ payments }) => {


  //console.log(clients)
  return (
    <>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
        {payments.map((payment) => {

          //  console.log(payment)
          return (
            <PaymentCard
              key={payment.id}

              payment={payment}
            //profileImage={user.profileImage}
            />
          )
        })}
      </div>
    </>
  );
};






export const PaymentCard = ({ payment }) => {

  const { loan: loanState, setLoan, loanId, payed, setPayed, setGains,setState } = useLoans()

  console.log(loanId)
  const { updatePayments, payments } = useLoans()
  //console.log(payment)
  const { setNotification, showNotification } = useNotification()
  const { amount, payment_date: date, id, label, state,payed_date } = payment

  function stateLabel(state) {
    if (state == "payed") return "Pagado"
    else if (state == "expired") return "Vencido"
    else if (state == "pending") return "Pendiente"
    else if (state == "incomplete") return "Incompleto"
  }


  
  const payPayment=async (e) => {

    await paymentsModel.payPayment(id)

    setPayed((prev) => prev + 1)

    setGains((prev) => prev + payment.gains)
    setNotification({
      type: "success",
      message: "Pagodo con exito"
    })
    showNotification()


    updatePayments((prev) => {
      return prev.map((p) => p.id == id ? {
        ...p,
        state: "payed"
      } : p)
    })
    /* await deletePayment(payment.id)
     await deleteLoan(id) 
     

      
       */
  }
  return (
    <div className="col-span-1 max-w-sm  bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      {/* Header */}

      <DropdownDefault >

        {/* agregar nota button */}
        <AddNoteModalPayment payment={payment}
          button={<button

            className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
            <NoteIcon payment={payment} />
            agregar nota
          </button>}
        ></AddNoteModalPayment>


        {/*  ver pago button  */}
        <PaymentModal payment={payment}
          button={<button

            className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
            <Eye></Eye>
            ver pago
          </button>}
        ></PaymentModal>
        
        {/* pay button */}
        <button disabled={payment.state == "payed"}
          onClick={payPayment}
          className={`flex w-full items-center gap-2 ${payment.state == "payed" ? "opacity-30" : ""} rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4 `}>
          <MoneyBillAlt></MoneyBillAlt>
          Pagar
        </button>


        {/* editar pago */}
        <EditModalPayment payment={payment}
          button={(<button
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
            Editar pago
          </button>)}
        >
        </EditModalPayment>

         <button 
                 onClick={async()=>{
                  
                  await paymentsModel.deletePayment(payment.id)
                  
                  
                   setNotification({
                     type:"success",
                     message:"Pagon eliminado con exito"
                   })
                   showNotification()

                   
                   updatePayments(payments.filter((e)=>{
                    if(e.id!=id) return e 
                   }))
                 }}
                 className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                   <svg
                     className="fill-current"
                     width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path
                       d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
                       fill=""
                     />
                     <path
                       d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
                       fill=""
                     />
                     <path
                       d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
                       fill=""
                     />
                     <path
                       d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
                       fill=""
                     />
                   </svg>
                   Borrar pago
                 </button> 
      </DropdownDefault>

      <div className="flex justify-center flex-col  items-center">
        {/* Client Icon */}
        <div className="bg-lime-500 text-white w-15 h-15 flex flex-row justify-center items-center rounded-full">
          <PaymentIcon />
        </div>
        {/* Client Info */}
        <h3>{label}</h3>
        <span className='text-success font-bold text-2xl '>$ {Intl.NumberFormat('de-DE').format(amount)} </span>
        <p>fecha <span title={date} className="text-black text-sm font-bold"> {formatDateDifference(date)}</span></p>

      </div>

      {/* Divider */}
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
      <div className="">


        <StateTag state={state}></StateTag>

        {
          payed_date ? 
          
          new Date(payed_date)< new Date(date) ? (<Tag type={"success2"}  title={`Pagada el (${payed_date})  adelantado a la fecha de pago`} label={"P. adelan.."}></Tag>)
          : new Date(payed_date)> new Date(date) ? (<Tag title={"Pagada el ("+payed_date+") Fuera de fecha de pago"} type={"danger2"} label={"P. Atras.."}></Tag>) : (<Tag title="Pagada dentro de la fecha de pago" type={"success3"} label={"P. en fecha"}></Tag>)
          :(<></>)
        }

        {/* {state=="expired"? payed_date!=null ?  (): ""} */}

        {/*  <Link to={"/prestamos/"+id}>ver prestamo</Link> */}
      </div>
    </div>
  );
};


import Tag from "../../../../components/Tag";
import AddNoteModalPayment from "./AddNoteModal";

export function StateTag({ state }) {

  let type
  if (state == "pending") type = "primary"
  if (state == "incomplete") type = "warning"
  if (state == "expired") type = "danger"
  if (state == "payed") type = "success"

  let label
  if (state == "pending") label = "pendiente"
  if (state == "incomplete") label = "incompleto"
  if (state == "expired") label = "vencido"
  if (state == "payed") label = "pagado"

  return (

    <Tag label={label}

      type={type}> </Tag>
  )
}



