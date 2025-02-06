
import React,{useState,useEffect} from 'react'
import Modal,{ useModal } from '../../../../components/Modal/Modal'
import { PaymentIcon } from '../../../../components/Icons'

import { StateTag } from './PaymentsList'

import { formatAmount } from '../../../../common/funcs'
import { formatDateDifference } from '../../../../common/funcs'

function PaymentModal({payment,button}) {
   //console.log(payment)
  
  
  return (
    
    <Modal buttonLabel={"ver"} title={payment.label} button={button}>
        <div className='flex gap-3'>

          <div className="bg-lime-500 text-white w-30 h-30 flex flex-row justify-center items-center rounded-full">
                     <PaymentIcon/>
           </div>

            <div className='flex flex-col gap-4'>
            
            <div className='w-full'>
                <span className='text-center text-3xl text-green-500'>{"$"+formatAmount(payment.amount)} </span>
                <span>{"(ganancia $"+payment.gains+")"}</span>
            </div>
            <div className='w-full'>
                <span className='text-md text-black'>{payment.payment_date} {payment.state=="payed" ? new Date(payment.payment_date)> new Date() ? "pago adelantado":"pagado hace" : 
                    payment.state=="pending" ? "se paga en " : payment.state=="expired" ? "atrasado hace " : ""
                    } {formatDateDifference(payment.payment_date)}</span>
            </div>
            <div className='w-full'>
                <StateTag state={payment.state}>

                </StateTag>
                
            </div >
           
            <div>
              Notas:   {payment.notes ? payment.notes: "sin notas..."}
            </div>
           </div>
           
       </div>
  
    </Modal>
  )
}








export default PaymentModal