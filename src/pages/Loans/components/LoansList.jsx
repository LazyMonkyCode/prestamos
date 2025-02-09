</LoanCard> */
const LoansList = ({ loans }) => (
  
<>

{/* {loans != null ? loans.map((loan) => (
      <LoanCard key={loan.id} amount={loan.amount} interestRate={""} id={loan.loanId} term={""}></LoanCard>
    )):""} */}
</>
    


   

);



export const LoanCard = ({ amount, interestRate, term,id }) => {
  return (
    
      <div className="loan-card bg-white p-6 rounded-lg shadow-md max-w-xs ">
        <div className="flex items-center">
          {/* Ícono de billete */}
          <svg
            className="w-8 h-8 text-green-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V18M18 12H6M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800">Detalles del Préstamo</h2>
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Monto:</span>
            <span className="font-bold text-gray-800">${amount}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Tasa de Interés:</span>
            <span className="font-bold text-gray-800">{interestRate}%</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Plazo:</span>
            <span className="font-bold text-gray-800">{term} meses</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to={"/prestamos/"+id+""}>ver prestamo</Link>
        </div>
      </div>
  )
};