
import React, { useState, useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";

import { useJwt } from "react-jwt";

import { useModal } from "../../components/Modal/Modal";

import Modal from "../../components/Modal/Modal";
import { GuidedForm, StepForm, useGuide } from "../../components/GuidedForm/GuidedForm";
import loansModel from "../../database/models/Loans";
import paymentsModel from "../../database/models/Payments";

export function AddLoanModal({ clientId, setLoans }) {

  const { token } = useAuth()

  const { decodedToken, isExpired } = useJwt(token);



  return (
    <Modal buttonLabel={"dar prestamo"} button={true} title={"Otorgar Prestamo"}>

      <GuidedForm
        initState={{
          label: {
            value: "Prestamo ",
            isValid: true,
            error: ""
          },
          monto: {
            value: 5000,
            isValid: true,
            error: ""
          },
          interes: {
            value: 30,
            isValid: true,
            error: ""
          },

          cuotas: {
            value: 0,
            isValid: true,
            error: ""
          },
          pagos: {
            value: "weekly",
            isValid: true,
            error: ""
          },
          fecha: {
            value: "",
            isValid: true,
            error: ""
          },
          interesVal: {
            value: "",
            isValid: true,
            error: ""
          },
          clientId: {
            value: clientId,
            isValid: true,
            error: ""
          },
          userId: {
            value: decodedToken?.payload || 1,
            isValid: true,
            error: ""
          }

        }}>
        <StepForm targetStep={1}>
          <Step1></Step1>
        </StepForm>

        <StepForm targetStep={2} handleForm={() => ""}>
          <Step2></Step2>
        </StepForm>


        <StepForm targetStep={3} handleForm={() => ""}>
          <Step3></Step3>
        </StepForm>
        <StepForm targetStep={4} handleForm={() => ""}>
          <Step4 setLoans={setLoans}></Step4>
        </StepForm>
        <StepForm targetStep={5} handleForm={() => ""}>
          <Step5 setLoans={setLoans}></Step5>
        </StepForm>




      </GuidedForm>

    </Modal>
  )
}




const Step1 = () => {
  const { formData, disableNext, nextStep, handleChange,
    enableNext, registerOnNext, validate, setField } = useGuide()


  const montos = [10000, 20000, 50000, 100000]
  useEffect(() => {

    enableNext()
    // Registra el callback para este paso
    registerOnNext(() => {
      console.log("Callback ejecutado desde Step1");

      const errors = validate({
        monto: {
          required: {
            param: true,
            message: "Este campo es requerido para avanzar",

          },

        }
      })

      nextStep()

    });
  }, [registerOnNext]);

  return (
    <div className="mb-4">
      <h3 className=" text-xl font-semibold p-3  pb-7 block text-black dark:text-white text-center ">
        Cuanto dinero  deseas prestar?
      </h3>
      <div className="relative">
        <input
          step={1000}
          name="monto"
          type="number"
          min={5000}
          placeholder="Ingresa el monto del prestamo"
          className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
          onChange={(e) => setField({ type: "set", field: "monto", value: e.target.value })}
          defaultValue={10000}
          value={formData.monto.value}
        />



        <div className='flex  mt-5 mb-5 gap-2'>
          {
            montos.map((e) => <span

              onClick={(e) => {
                setField({ type: "set", field: "monto", value: Number(e.target.innerText) })
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


const Step2 = () => {
  const { formData, disableNext, nextStep, handleChange, enableNext, registerOnNext, validate, setField } = useGuide()



  useEffect(() => {

    enableNext()
    // Registra el callback para este paso
    registerOnNext(() => {
      console.log("Callback ejecutado desde Step1");

      const errors = validate({
        cuotas: {
          required: {
            param: true,
            message: "Este campo es requerido para avanzar",

          },

        }
      })


      if (errors) nextStep()

    });
  }, [registerOnNext]);
  return (
    <div className="mb-4">
      <h3 className=" text-xl font-semibold p-3  pb-7 block text-black dark:text-white text-center ">
        En cuantas cuotas desea que se pague?
      </h3>
      <div className="relative">
        <input

          name="cuotas"
          type="number"
          placeholder="Ingresa tu nombre de usuario"
          className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
          onChange={(e) => {

            setField({ type: "set", field: "cuotas", value: e.target.value })

            /*      const amount = formData.monto+(formData.monto*formData.interes)
                 
                 const cuotasAmount = Math.round(amount/formData.cuotas,2)
      */
            // (e)=>
            // setCuotasMonto(cuotasAmount)

          }}
          defaultValue={formData.cuotas.value}
          value={formData.cuotas.value}
        />



        <div className='flex  mt-5 mb-5 gap-2'>
          {
            [2, 3, 6, 10].map((p) => <span

              onClick={(e) => {
                const cuotas = e.target.innerText;
                setField({ type: "set", field: "cuotas", value: cuotas })


                console.log(formData)
              }}
              className='text-sm p-2  border border-stroke  text-center cursor-pointer rounded-lg'
            >
              {p}</span>)
          }

          <p className="text-center text-red ">
            {
              formData.cuotas.error ? formData.cuotas.error : ""
            }
          </p>
        </div>
      </div>
    </div>
  )
}


import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";
const Step3 = () => {
  const { formData, disableNext, nextStep, handleChange, enableNext, registerOnNext, validate, setField } = useGuide()
  useEffect(() => {

    enableNext()
    // Registra el callback para este paso
    registerOnNext(() => {
      console.log("Callback ejecutado desde Step1");

      const errors = validate({
        fecha: {
          required: {
            param: true,
            message: "Este campo es requerido para avanzar",

          },

        }
      })


      if (errors) nextStep()

    });
  }, [registerOnNext]);
  return (
    <div className="mb-4">
      <h3 className=" text-xl font-semibold p-3  pb-7 block text-black dark:text-white text-center ">
        Elija la fecha de  entrega del prestamo
      </h3>
      <div className="relative">
        <input

          name="fecha"
          type="date"
          placeholder="Ingresa tu nombre de usuario"
          className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
          onChange={(e) => setField({ type: "set", field: "fecha", value: e.target.value })
          }
          defaultValue={formData.fecha.value}
          value={formData.fecha.value}
        />


        <p className="text-center text-red ">
          {
            formData.fecha.error ? formData.fecha.error : ""
          }
        </p>

      </div>
    </div>
  )
}

import Notification from "../../components/Notifications";
import { useNotification } from "../../components/Notifications";


const Step4 = ({ setLoans }) => {
  const [notifications, setNotifications] = useState([]);

  const { setNotification, showNotification } = useNotification()
  const { toggleModal } = useModal()
  const { formData, disableNext, nextStep, handleChange, enableNext, registerOnNext, validate, setField } = useGuide()


  useEffect(() => {

    enableNext()
    // Registra el callback para este paso
    registerOnNext(async () => {
      console.log("Callback ejecutado desde Step4");

      //if(formData.pagos.value=="custom") nextStep()
        
       const errors = validate({
        pagos: {
          required: {
            param: true,
            message: "Este campo es requerido para avanzar",

          },

        }
      })


      if (errors) {

        const loan = await loansModel.insertLoan(formData)

        console.log(formData)

        if(formData.pagos.value == "custom") console.log("asdasd")
        await paymentsModel.insertPayments({
          amount: formData.monto.value,
          installments: formData.cuotas.value,
          date: formData.fecha.value,
          interes: formData.interes.value,
          interval: formData.pagos.value,
          id: loan.id
        })



        // console.log(insert)
        setLoans((prev) => [
          {
            ...loan,

          },
          ...prev
        ])

        toggleModal();

        setNotification({
          type: "success",
          message: "Prestamo agregado con exito"
        })

        showNotification()  


      } 

    });
  }, [registerOnNext]);
  return (

    <div className="mb-4">

      <h3 className=" text-xl font-semibold p-3  pb-7 block text-black dark:text-white text-center ">
        Que periodo desean que se paguen las cuotas?
      </h3>
      <div className="relative">

        <SelectGroupOne onChange={(e) => {
          setField({ type: "set", field: "pagos", value: e.target.value })

        }} ></SelectGroupOne>
        {/* <Modal button={false}>
           
          </Modal> */}


        <p className="text-center text-red ">
          {
            formData.pagos.error ? formData.pagos.error : ""
          }
        </p>
      </div>



    </div>


  )
}




const Step5 = ({ setLoans }) => {
   const [notifications, setNotifications] = useState([]);
  const { setNotification, showNotification } = useNotification()
  const { toggleModal } = useModal()
  const { formData, disableNext, nextStep, handleChange, enableNext, registerOnNext, validate, setField } = useGuide()

  const cuotas = new Array(Number(formData.cuotas.value)).fill(0);
  const [pDates, setPDates] = useState(cuotas.map((e, i) => new Date()))

  console.log(formData.cuotas.value)
  useEffect(() => {

    enableNext()
    // Registra el callback para este paso
    registerOnNext(async () => {
      console.log("Callback ejecutado desde Step1");

      const errors = validate({
        pagos: {
          required: {
            param: true,
            message: "Este campo es requerido para avanzar",

          },

        }
      })


      if (errors) {

        const loan = await loansModel.insertLoan(formData)

        console.log(formData)

        await paymentsModel.insertPayments({
          amount: formData.monto.value,
          installments: formData.cuotas.value,
          date: formData.fecha.value,
          interes: formData.interes.value,
          interval: formData.pagos.value,
          id: loan.id
        },pDates)



        // console.log(insert)
        setLoans((prev) => [
          {
            ...loan,

          },
          ...prev
        ])

        toggleModal();

        setNotification({
          type: "success",
          message: "Prestamo agregado con exito"
        })

        showNotification() 


      }

    });
  }, [registerOnNext]); 

  return (

  <div className="mb-4 h-80 overflow-auto">

      <h3 className=" text-xl font-semibold p-3  pb-7 block text-black dark:text-white text-center ">
        Elige las fechas de los pago
      </h3>
      <div className="relative">

        {
          cuotas.map((e, i) => {
            return (<div className="mb-4">
              <label className="mb-2.5 block font-medium text-left text-black dark:text-white">
                Pago numero {i + 1}
              </label>
              <input
                name="date"
                type="date"
                placeholder={"fecha del pago " + i + 1}
                className={`w-full rounded-lg border border-stroke  focus:text-black  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                onChange={(el) =>{

                  setPDates((prev) =>prev.map((e, j) =>j == i ? el.target.value : e))

                  //console.log(pDates)
                } }
                defaultValue={pDates[i]}
                value={pDates[i]} />
            </div>)
          })
        }


      </div>



    </div>


  )
}

/* function  GuidedFormModal() {
    const {token} = useAuth()

    const {decodedToken, isExpired } = useJwt(token);

    const {toggleModal} = useModal()
   
   
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleForm =async  (e) => {


        const gains = ((formData.monto*formData.interes)/100);

        const amount = formData.monto+gains


       await  window.sqlite.query(`INSERT INTO loans
         (gains,amount,installments,interes_percentage,aproved_date,payment_interval,client_id,lender_id) 
        VALUES
        ('${gains}',
        '${formData.monto}',
        '${formData.cuotas}',
        '${formData.interes}',
        '${formData.fecha}',
        '${formData.pagos}',
        '${formData.clientId}',
        '${1}'
        );
        `)

       
            
        }

        toggleModal()
    };
  return (
   
  )
} */

export default AddLoanModal


