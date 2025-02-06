
import React,{useState,useEffect} from 'react'
import Modal from '../../../../components/Modal/Modal'
import paymentsModel from '../../../../database/models/Payments'
import { useLoans } from '..'

import { useNotification } from '../../../../components/Notifications'
import { useModal } from '../../../../components/Modal/Modal'



function AddNoteModalPayment({payment,button}) {
   console.log(payment)
  
  return (
    
    <Modal buttonLabel={"agregar"} title={"Agregar Nota"} button={button}>

        <EditPaymentForm payment={payment} ></EditPaymentForm>
    </Modal>
  )
}



function  EditPaymentForm({payment,button}){

    const {setNotification,showNotification} = useNotification()
    const {toggleModal} = useModal()
    const {updatePayments,payments} = useLoans()
    
   

    const [formData,setFormData] = useState({
        
        notes:{
            value:payment.notes,
            error:"",
        },
        
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
                        Notas
                    </label>
                    <textarea
                        step={1000}
                        name="label"
                        type="text"
                        min={5000}
                        placeholder="Ingresa el monto del pago"
                        className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        onChange={(e) => setField({ type: "set", field: "notes", value: e.target.value })}
                        defaultValue={formData.notes.value}
                        value={formData.notes.value}
                    />
            </div>
                


            <button
            onClick={
                ()=>{
    
                    console.log("Asdasd")
                    console.log(formData)
                    paymentsModel.editPayment(payment.id,{ 
                        ...payment,  
                        notes:formData.notes.value,
                       
                    })
                    
                    toggleModal()

                    setNotification({
                        type:"success",
                        message:"Nota agregada actualizado con exito"
                    })
                    //cami matias primer uota no llego transferencia
                    //jesus debo debe 2500
                  //  setGains((prev)=>prev>0 ? prev-formData.amount.value: 0 )

                    showNotification()
                   // console.log(payment)
                    updatePayments(payments.map((p)=>p.id==payment.id ? {
                        ...p,
                       
                        notes:formData.notes.value,
                        
                    } : p))
                    
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
export default AddNoteModalPayment