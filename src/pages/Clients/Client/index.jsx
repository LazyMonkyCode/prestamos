import React,{useState,useEffect} from 'react';
import CardDataStats from '../../../components/CardDataStats';
/* import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne'; */
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';

import EditIcon, { UserIcon,StarIcon,PaymentIcon,WalletIcon } from '../../../components/Icons';
import { useNavigate } from 'react-router-dom';
import { LoansList } from './components/Loans';

import { AddLoanModal } from '../AddLoanModal';

import { createContext,useContext } from 'react';
import Notification from '../../../components/Notifications';

import { useNotification } from '../../../components/Notifications';

import ClientContextProvider from '../../../context/ClientContext';

import clientsModel from '../../../database/models/Clients';
import paymentsModel from '../../../database/models/Payments';
import loansModel from '../../../database/models/Loans';
import DropdownDefault from '../../../components/Dropdowns/DropdownDefault';
import EditModalClient from './components/EditClientModal';



const Client= () => {

  const {showNotification} = useNotification()

  const navigate = useNavigate()

// navigate("/")
  const { clientId } = useParams();
  const [client,setClient] = useState({})
  const [loans,setLoans] = useState([])
  const [totalGains,setTotalGains] = useState(0)
  const [totalLoans,setTotalLoans] = useState(0)
  const [expiredPayments,setExpiredPayments2] = useState(0)

  useEffect(() => {
    const init= async()=>{
      

      console.log(clientId)

      setExpiredPayments2(await paymentsModel.getExpiredPaymentsLoans(clientId));
    
      
     // 
      const loansData = await loansModel.getClientLoans(clientId)
      //console.log("asd")
      //console.log(loansData)
      setLoans(loansData)
      
      //console.log(loans)
      const data = await clientsModel.getClient(clientId)
      setClient(data[0])

      console.log(client)
      
      const expired = await paymentsModel.getClientExpiredPayments(clientId)
      
      //setExpiredPayments(expired)

      const totalLoans = await loansModel.getClientTotalLoans(clientId)
      setTotalLoans(totalLoans[0].total)
      
     
     const totalGains= await clientsModel.getGainsFromClient(clientId)
      setTotalGains(totalGains)

    }

    init()
  
    return () => {
      
    }
  }, [])
  

      
      

  return (
    <>
  
  <ClientContextProvider value={{
    loans,
    setLoans,client,
    clientId,
    setClient
  }}>
    <Notification >
      <Breadcrumb pageName="Cliente" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Prestamos del Cliente" total={totalLoans} rate="0.0" levelUp>
          <WalletIcon></WalletIcon>
        </CardDataStats>
        <CardDataStats title="Cuotas Vencidas" total={expiredPayments.length} rate={"0.0"} levelDown>
          <PaymentIcon></PaymentIcon>
        </CardDataStats>
        <CardDataStats title=" Ganancias obtenidas del cliente" total={"$ "+totalGains} rate="0.0" levelUp>
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
        
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      
      <div className="col-span-12 xl:col-span-12"> 
      
     <AddLoanModal clientId={clientId} setLoans={setLoans} ></AddLoanModal>
      </div>
      <div className="col-span-6 xl:col-span-4">
          
          <ClientCard
            client={client}
          ></ClientCard>
       
        </div>
        <div className="col-span-6 xl:col-span-8">
          <LoansList loans={loans || []} />
        </div>
        {/* <ChatCard /> */}
      </div>
      </Notification>
      </ClientContextProvider>
    </>
  );
};


export const ClientCard = ({client}) => {

  
 // console.log(client)
  const { nickname,name,lastname,email,phone,address,id } = client;
  const navigate = useNavigate()
 
  useEffect(() => {
    
    console.log("asdasd")
    console.log(client)
    return () => {
      
    }
  }, [])
  
  return (
    <div className="max-w-sm  bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      {/* Header */}

      <DropdownDefault left={true} >
        
        <EditModalClient
          button={ <button
            className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
               <EditIcon></EditIcon>
                Edit
              </button>}
        ></EditModalClient>

        <button
      
      onClick={async()=>{
        try {
              
          await clientsModel.deleteClient(id)
         } catch (error) {
          console.log(error)
         }
         
        navigate("/clients")
      
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
          Delete
        </button></DropdownDefault>
      <div className="flex justify-center  items-center">
        {/* Client Icon */}
        <div className="bg-blue-500 text-white w-15 h-15 flex flex-row justify-center items-center rounded-full">
         <UserIcon></UserIcon>
        
        </div>
        {/* Client Info */}
        
      </div>
      <div className="ml-4">
          <h3 className="text-lg text-center font-semibold text-gray-800">{nickname}</h3>
         
        </div>
      {/* Divider */}
      <div className="my-4 border-t border-gray-200"></div>
      <h3 className='text-center text-lg'> Informacion</h3>

      <p>
        nombre y apellido : {client.name+" "+client.lastname}
      </p>
      <p>
        telefono : {client.phone }
      </p>
      <p>
        email : {client.email }
      </p>
      <p>
        direccion : {client.address }
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
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">Rating:</p>
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <StarIcon key={i} filled={i < 5} />
            ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
         
      </div>
    </div>
  );
};




 
export default Client;
