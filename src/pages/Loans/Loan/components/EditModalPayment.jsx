
import React,{useState,useEffect} from 'react'
import Modal from '../../../../components/Modal/Modal'
import paymentsModel from '../../../../database/models/Payments'
function EditModalPayment({payment,button}) {
  // console.log(payment)
  
  return (
    
    <Modal buttonLabel={"edit"} title={"Editar Pago"} button={button}>

        <EditPaymentForm payment={payment} ></EditPaymentForm>
    </Modal>
  )
}


import Select from '../../../../components/Forms/SelectGroup/Select'
import { useLoans } from '..'

import { useNotification } from '../../../../components/Notifications'
import { useModal } from '../../../../components/Modal/Modal'
function  EditPaymentForm({payment,button}){

    const {setNotification,showNotification} = useNotification()
    const {toggleModal} = useModal()
    const {updatePayments,payments,loan,setExpired,expired,setState,setPayed,loanId} = useLoans()
   console.log(loanId)

    const [formData,setFormData] = useState({
        
        amount:{
            value:typeof payment.amount =="object" ? "" : payment.amount,
            error:"",
        },
        date:{
            value:payment.payment_date,
            error:"",
        },
        label:{
            value:payment.label,
            error:"",
        },
        notes:{
            value:payment.notes,
            error:"",
        },
        state:{
            value:payment.state,
            error:"",
        }
    })

    useEffect(() => {
      
    
      return () => {
        
      }
    }, [formData])
    

    function setField({type,field,value}){
        
        if(type=="set"){
            console.log(value)
            setFormData((prev)=>{
                return {
                    ...prev,
                    [field]:{
                       
                        ...formData[field],
                        value:value,
                    },
                    
                }
            })
            console.log(formData[field])
        }

        if(type=="error"){
            setFormData((prev)=>{
                return {
                    ...prev,
                    [field]:{
                        
                        ...formData[field],
                        error:value,
                    },
                    
                }
            })
        }
       
    }


    return (
        <div>

            <form onSubmit={(e)=>e.preventDefault()}>

            <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                        Etiqueta 
                    </label>
                    <input
                        step={1000}
                        name="label"
                        type="text"
                        min={5000}
                        placeholder="Ingresa el monto del pago"
                        className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        onChange={(e) => setField({ type: "set", field: "label", value: e.target.value })}
                        defaultValue={formData.label.value}
                        value={formData.label.value}
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                        Monto 
                    </label>
                    <input
                        step={1000}
                        name="monto"
                        type="number"
                        min={5000}
                        placeholder="Ingresa el monto del pago"
                        className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        onChange={(e) => setField({ type: "set", field: "amount", value: e.target.value })}
                        defaultValue={formData.amount.value}
                        value={formData.amount.value}
                        formNoValidate
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                        Fecha del Pago
                    </label>
                <input
            
            name="date"
            type="date"
            placeholder="fecha del pago"
            className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            onChange={(e)=> setField({type:"set",field:"date",value:e.target.value})}
            defaultValue={formData.date.value }
            value={formData.date.value} />
            </div>

            <Select label={"Estado del prestamo"} onChange={(e)=>setField({type:"set",field:"state",value:e.target.value})} 
            options={[
                {
                    label:"pagado",
                    value:"payed",
                    selected:payment.state=="payed"
                },
                {
                    label:"vencido",
                    value:"expired",
                    selected:payment.state=="expired"
                },
                {
                    label:"pendiente",
                    value:"pending",
                    selected:payment.state=="pending"
                },
                {
                    label:"incompleto",
                    value:"incomplete",
                    selected:payment.state=="incomplete"
                },
            ]}>
           
            
         
            </Select>


            <button
            onClick={
                async()=>{
    
                    console.log("Asdasd")
                    console.log(formData)
                    paymentsModel.editPayment(
                        payment.id,{
                        amount:formData.amount.value,
                        date:formData.date.value,
                        label:formData.label.value,
                        state:formData.state.value,
                        notes:"",
                       
                    })
                    

                   
                    toggleModal()
                    setNotification({
                        type:"success",
                        message:"Pago actualizado con exito"
                    })
                    //cami matias primer uota no llego transferencia
                    //jesus debo debe 2500
                    //  setGains((prev)=>prev>0 ? prev-formData.amount.value: 0 )
                    
                    showNotification()
                   // console.log(payment)
                    updatePayments(payments.map((p)=>p.id==payment.id ? {
                        ...p,
                        amount:formData.amount.value,
                        notes:formData.notes.value,
                        label:formData.label.value,
                        payment_date:formData.date.value,
                        state:formData.state.value
                    } : p))

                    if(payment.state!="expired" && formData.state.value=="expired"){
                        setExpired((prev)=>prev+1)
                    }
                    if(payment.state=="expired" && formData.state.value!="expired"){
                        console.log(expired)
                        setExpired((prev)=>prev-1)
                    }


                    if(payment.state=="payed" && formData.state.value!=payment.state){
                        setPayed((prev)=>prev-1)
                    }

                    const unpayed = payments.filter((p)=>p.state!="payed")


                    setState(unpayed.length == 0 ? "active" : "completed")
                    
                    console.log(loanId)
                    const state = await window.sqlite.query("SELECT state from loans where id="+loanId)
                    if(unpayed.length == 0 && state[0].state=="completed"){
                        await window.sqlite.query("UPDATE loans SET state='active' WHERE id="+loanId)
                    } 
                    
                   
                    
                }
            }
            className='p-3 bg-primary text-white'>
                editar
            </button>
            </form>
        </div>
    )
}

/* 

function Amount() {
    
  return (
    <div className="mb-4">
    <h3 className=" text-xl font-semibold p-3  pb-7 block text-black dark:text-white text-center ">
        Cunato dinero  deseas prestar?
    </h3>
    <div className="relative">
        <input
            step={1000}
            name="monto"
            type="number"
            min={5000}
            placeholder="Ingresa el monto del prestamo"
            className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            onChange={ (e)=>setField({type:"set",field:"monto",value:e.target.value})}
            defaultValue={10000}
            value={formData.monto.value}
        />

        <div className='flex  mt-5 mb-5 gap-2'>
            {
                montos.map((e) => <span

                    onClick={(e) => {
                       setField({type:"set",field:"monto",value:Number(e.target.innerText)})  
                    }}
                    className='text-sm p-2  border border-stroke  text-center cursor-pointer rounded-lg'
                >
                    {e}</span>)
            }
        </div>

        <p className="text-center text-red ">
    {
      formData.monto.error ? formData.monto.error : ""
    }
  </p>

    </div>
</div>
  )
}

export default EditModalPayment */
export default EditModalPayment