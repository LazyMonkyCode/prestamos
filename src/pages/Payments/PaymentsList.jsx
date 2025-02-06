import React,{useState} from "react";

const PaymentList = ({ payments,title }) => (
  
  <div className="col.span-6  md:col-span-6 xl:col-span-2 max-w-3xl  bg-white  rounded-sm overflow-hidden">
    {/* Título */}
    <div className="text-md font-semibold p-4 flex items-center">
      
      <h3>{title}</h3>
    </div>

    {payments.length < 0 ?payments.map((payment) => (
      <PaymentListItem key={payment.id} paymentData={payment}></PaymentListItem>
    )): (
      <div className='flex justify-center items-center p-10 '>

          <span className='text-xl text-gray-300' >No hay Pagos Registrados</span>
      </div>
    )}
  </div>
);





export  function PaymentListItem({paymentData}) {

  const [payment,setPayment] = useState(paymentData)
  console.log(paymentData)
  return (
    <div
        
        className="flex items-center justify-between px-6 py-4 border-b last:border-b-0 hover:bg-gray-50"
      >
        {/* Información del cliente */}
        <div className="flex items-center">
          {/* Icono de cliente */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A3.375 3.375 0 008.25 15h7.5a3.375 3.375 0 013.129 2.804M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9z"
            />
          </svg>
          <div>
            <h3 className="text-gray-700">
              {payment.nickname}
            </h3>
          </div>
        </div>

        {/* Monto y estado */}
        <div className="flex items-center space-x-4">
          {/* Icono de monto */}
          <div className="flex items-center text-gray-500">
            
            <span className="text-lg font-semibold  font-medium">${payment.amount}</span>
          </div>

          {/* Estado */}
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              payment.state === "Pendiente"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {payment.state=="payed" ? "pagada" :"pendiente"}
          </span>
        </div>

        
      </div>
  )
}







export default PaymentList;

