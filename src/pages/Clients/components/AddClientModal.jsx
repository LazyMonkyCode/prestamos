import React,{useState,useEffect,useRef} from "react";

import Modal from "../../../components/Modal/Modal";
import clientsModel from "../../../database/models/Clients";


const GuidedModal = ({updateState,lastId}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      nickname: "",
      email: "",
      address: "",
      phone: "",
    });
    
  /*   const addClient =async (data) => {
      
  
      const values = Object.values(formData).map((i)=>{
        return i.length ==0 ? "''" : "'"+i+"'"
      }).join(",")
  
     
    await window.sqlite.query(`INSERT INTO clients (nickname,email,address,phonenumber) 
        VALUES
        (${values})
        `) 

    const last = await  window.sqlite.query(`SELECT  * FROM clients  ORDER BY id DESC LIMIT 1`) 
       
    console.log(last)
    updateState({
            id:last[0].id,
            nickname:formData.nickname
        })
  
        
    };
  
    const toggleModal = () => {
      setIsOpen(!isOpen);
      if (!isOpen) setStep(1); // Reinicia al primer paso si se vuelve a abrir
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
   */
    return (
      <div className={isOpen ? "flex justify-center items-center h-screen": ""}>
        {/* Botón para abrir el modal */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={toggleModal}
        >
          Abrir Formulario Guiado
        </button>
  
        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              {/* Cabecera */}
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-semibold">Formulario Paso {step}</h2>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={toggleModal}
                >
                  ✕
                </button>
              </div>
  
              {/* Contenido del Formulario */}
              <div className="mt-4">
                {step === 1 && (
                  <>
                    <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nickname del cliente
                    </label>
                    <div className="relative">
                      <input
  
                        value={formData.nickname}
                        onChange={handleChange}
                        //onChange={(e)=>setField({type:"set",field:"password",value:e.target.value})}
                        name="nickname"
                        type="text"
                        placeholder="ingrese el nombre del cliente"
                       // defaultValue={fields.password.value}
                       // value={fields.password.value}
                        className={`w-full rounded-lg border border-stroke  focus:text-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                       
                      />
  
                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                              fill=""
                            />
                            <path
                              d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
  
                   
                    
                  </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className='text-center'>
                      ¿Deseas agregar informacion adicional al cliente?
                    
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      addClient()
                      console.log("Datos del formulario:", formData);
                      toggleModal();
                    }}
                  >
                    No
                  </button>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                   asdasd
                  </>
                )}
                {step === 4 && (
                  <>
                    <label className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Escribe tu teléfono"
                    />
                  </>
                )}
              </div>
  
              {/* Navegación */}
              <div className="mt-6 flex justify-between">
                <button
                  className={`px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 ${
                    step === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={prevStep}
                  disabled={step === 1}
                >
                  Atrás
                </button>
                {step < 4 ? (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={nextStep}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => {
                      console.log("Datos del formulario:", formData);
                      toggleModal();
                    }}
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  

import {GuidedForm,StepForm,useGuide} from "../../../components/GuidedForm/GuidedForm"
import { useDispatch, useSelector } from 'react-redux';
import { add} from '../../../redux/clients'

export function AddClientModal() {

  
 
  return (
    <Modal buttonLabel={"agregar"} button={true} title={"Agregar Cliente"}>
        <GuidedForm updateState={add}
         initState={
         {
          nickname:{
            value:"",
            isValid:true,
            error:""
          },
          name:{
            value:"",
            isValid:true,
            error:""
          },
          lastname:{
            value:"",
            isValid:true,
            error:""
          },
          
          email:{
            value:"",
            isValid:true,
            error:""
          },
          address:{
            value:"",
            isValid:true,
            error:""
          },
          phonenumber: {
            value:"",
            isValid:true,
            error:""
          },
        }
        }>
          <StepForm targetStep={1}>
              <Step1></Step1>
          </StepForm>
          <StepForm targetStep={2}>
             <Step2></Step2>
          </StepForm>
          <StepForm targetStep={3}>
             <Step3></Step3>
          </StepForm>
          <StepForm targetStep={4}>
             <Step2></Step2>
          </StepForm>
          <StepForm targetStep={5}>
             <Step4></Step4>
          </StepForm>
        </GuidedForm>
      </Modal>
  )
}

 function Step1() {

  const {formData,disableNext,nextStep,handleChange,enableNext,registerOnNext,validate,setField} = useGuide()

  const [isValid,setIsValid] = useState(true)
  

  useEffect(() => {

    const init = async  ()=>{

      
     const r =  await  window.sqlite.query(`SELECT id from clients WHERE nickname='${formData.nickname.value}'`)
          

      enableNext()
    // Registra el callback para este paso
    registerOnNext(() => {
      console.log("Callback ejecutado desde Step1");

      const errors = validate({
       
        nickname:{
          required:{
            param:true,
            message:"Este campo es requerido para avanzar",
            
          },
          minLength:{
            param:3,
            message:"No puede ser menor a 3"
          },
          maxLength:{
            param:30,
            message:"No puede ser mayor a 30"
          }
        }
      })

      /* 
        quincenal hijo de laura
      */


      
    

      if(errors) {

        if(r.length>0) setField({type:"error",field:"nickname",error:"Este cliente ya existe "})

        else nextStep()
      }
     
    })
    }

    init()
  }, [registerOnNext]);

  useEffect(() => {
    
    //disableNext()
    return () => {
     
    }
  }, [])
  
  return (
    <div className="">
      <div className="mb-6">
        <label className="mb-2.5 block text-center mb-3 text-lg text-black dark:text-white">
          Coloca el nombre del cliente
        </label>
        <div className="relative">
          <input
            value={formData.nickname.value}
            onChange={(e)=>{
              setField({type:"set",field:"nickname",value:e.target.value})

              
              
            }}
            //onChange={(e)=>setField({type:"set",field:"password",value:e.target.value})}
            name="nickname"
            type="text"
            placeholder="ingrese el nombre del cliente"
            // defaultValue={fields.password.value}
            // value={fields.password.value}
            className={`w-full rounded-lg border border-stroke ${formData.nickname.error
              ? 'border-red' : ''

            }  focus:text-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}

          />
          <p className="text-center text-red ">
            {
              formData.nickname.error ? formData.nickname.error : ""
            }
          </p>
         
        </div>



      </div>

    </div>
  )
}


import { useModal } from "../../../components/Modal/Modal";

function Step2() {



  const dispatch = useDispatch(); 

  const {toggleModal}= useModal()

  const {formData,nextStep,enableNext,registerOnNext,updateState} = useGuide()

  const [isValid,setIsValid] = useState(true)
  

  useEffect(() => {

    
    // Registra el callback para este paso
    registerOnNext(() => {
      console.log("Callback ejecutado desde Step2");

      nextStep()
      
      
     
    });
  }, [registerOnNext]);

  useEffect(() => {
    
    //disableNext()
    return () => {
     
    }
  }, [])
  
  return (
    <div className="">
      <div className="mb-6">
        <label className="mb-2.5 block text-center mb-3 text-lg text-black dark:text-white">
          Deseas seguir añadiendo informacion? 
        </label>
        <div className=" text-center relative">
          
          <button className="rounded-sm p-2 bg-success text-white" 
          onClick={async ()=>{


            await  clientsModel.insertClient({
              nickname:formData.nickname.value,
              name:formData.name.value,
              lastname:formData.lastname.value,
              email:formData.email.value,
              address:formData.address.value,
              phonenumber:formData.phonenumber.value
                 
            })

            const lastId = await clientsModel.getClientLastId()
            
           /*  console.log({
              id:lastId[0].id,
              nickname:formData.nickname.value,
              name:formData.name.value,
              lastname:formData.lastname.value,
              email:formData.email.value,
              address:formData.address.value,
              phonenumber:formData.phonenumber.value
                 
            

          }) */
            
          
          dispatch(add({
                  id:lastId[0].id,
                  nickname:formData.nickname.value,
                  name:formData.name.value,
                  lastname:formData.lastname.value,
                  email:formData.email.value,
                  address:formData.address.value,
                  phonenumber:formData.phonenumber.value
                }));
            toggleModal()
          }}>
            terminar
        </button>
         
        </div>



      </div>

    </div>
  )
}


function Step3() {

  const {formData,disableNext,nextStep,handleChange,enableNext,registerOnNext,validate,setField} = useGuide()

  const [isValid,setIsValid] = useState(true)
  

  useEffect(() => {

    enableNext()
    // Registra el callback para este paso
    registerOnNext(() => {
      console.log("Callback ejecutado desde Step1");

      const errors = validate({
         name:{
          required:{
            param:true,
            message:"Este campo es requerido para avanzar",
            
          },
          minLength:{
            param:3,
            message:"No puede ser menor a 3"
          },
          maxLength:{
            param:20,
            message:"No puede ser mayor a 15"
          }
         
        },
        lastname:{
          
          required:{
            param:true,
            message:"Este campo es requerido para avanzar",
            
          },
          minLength:{
            param:3,
            message:"No puede ser menor a 3"
          },
          maxLength:{
            param:20,
            message:"No puede ser mayor a 15"
          }
         
        }
      })


      if(errors) nextStep()
     
    });
  }, [registerOnNext]);

  useEffect(() => {
    
    //disableNext()
    return () => {
     
    }
  }, [])
  
  return (
    <div className="">
      <div className="mb-6">
        <label className="mb-2.5 block text-center mb-3 text-lg text-black dark:text-white">
          Coloca el nombre y apellido del cliente 
        </label>
        <div className="relative">

          {/* nombre */}
          <input
            value={formData.name.value}
            onChange={(e)=>{
              setField({type:"set",field:"name",value:e.target.value})

              
            }}
            //onChange={(e)=>setField({type:"set",field:"password",value:e.target.value})}
            name="name"
            type="text"
            placeholder="ingrese el nombre del cliente"
            // defaultValue={fields.password.value}
            // value={fields.password.value}
            className={`w-full mb-3 rounded-lg border border-stroke ${formData.name.error
              ? 'border-red' : ''

            }  focus:text-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}

          />
          <p className="text-center text-red ">
            {
              formData.name.error ? formData.name.error : ""
            }
          </p>
          {/* nombre */}
          <input
            value={formData.lastname.value}
            onChange={(e)=>{
              setField({type:"set",field:"lastname",value:e.target.value})

              
            }}
            //onChange={(e)=>setField({type:"set",field:"password",value:e.target.value})}
            name="lastname"
            type="text"
            placeholder="ingrese el apellido del cliente"
            // defaultValue={fields.password.value}
            // value={fields.password.value}
            className={`w-full rounded-lg border border-stroke ${formData.lastname.error
              ? 'border-red' : ''

            }  focus:text-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}

          />
          <p className="text-center text-red ">
            {
              formData.lastname ? formData.lastname.error : ""
            }
          </p>

          {/**apellido */}
          
        </div>



      </div>

    </div>
  )
}



function Step4() {

  const {formData,disableNext,nextStep,handleChange,enableNext,registerOnNext,validate,setField} = useGuide()

  const [isValid,setIsValid] = useState(true)
  

  useEffect(() => {

    enableNext()
    // Registra el callback para este paso
    registerOnNext(() => {
      console.log("Callback ejecutado desde Step1");

      const errors = validate({
         email:{
          required:{
            param:true,
            message:"Este campo es requerido para avanzar",
            
          },
          minLength:{
            param:3,
            message:"No puede ser menor a 3"
          },
          maxLength:{
            param:50,
            message:"No puede ser mayor a 50"
          },
          email:{
            param:true,
            message:"Debe ser un formato de email valido"
          }
         
        },
        phonenumber:{
          
          required:{
            param:true,
            message:"Este campo es requerido para avanzar",
            
          },
          phonenumber:{
            param:true,
            message:"Formato de numero invalido  ejempplo(0000-000000)",
          }
         
        }
      })


      if(errors) nextStep()
     
    });
  }, [registerOnNext]);

  useEffect(() => {
    
    //disableNext()
    return () => {
     
    }
  }, [])
  
  return (
    <div className="">
      <div className="mb-6">
        <label className="mb-2.5 block text-center mb-3 text-lg text-black dark:text-white">
          Completa la Informacion e contacto  
        </label>
        <div className="relative">

          {/* nombre */}
          <input
            value={formData.email.value}
            onChange={(e)=>{
              setField({type:"set",field:"email",value:e.target.value})

              
            }}
            //onChange={(e)=>setField({type:"set",field:"password",value:e.target.value})}
            name="email"
            type="email"
            placeholder="ingrese el email "
            // defaultValue={fields.password.value}
            // value={fields.password.value}
            className={`w-full mb-3 rounded-lg border border-stroke ${formData.email.error
              ? 'border-red' : ''

            }  focus:text-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}

          />
          <p className="text-center text-red ">
            {
              formData.email.error ? formData.email.error : ""
            }
          </p>
          {/* nombre */}
          <input
            value={formData.phonenumber.value}
            onChange={(e)=>{
              setField({type:"set",field:"phonenumber",value:e.target.value})

              
            }}
            //onChange={(e)=>setField({type:"set",field:"password",value:e.target.value})}
            name="phonenumber"
            type="text"
            placeholder="ingrese el apellido del cliente"
            // defaultValue={fields.password.value}
            // value={fields.password.value}
            className={`w-full rounded-lg border border-stroke ${formData.phonenumber.error
              ? 'border-red' : ''

            }  focus:text-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}

          />
          <p className="text-center text-red ">
            {
              formData.phonenumber ? formData.phonenumber.error : ""
            }
          </p>

          {/**apellido */}
          
        </div>



      </div>

    </div>
  )
}





