import React, { useState, useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
/* import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne'; */
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoansList } from './components/LoansList';
import { AddLoanModal } from './components/AddLoanModal';
import Notification from '../../components/Notifications';
import { useNotification } from '../../components/Notifications';
import ClientContextProvider from '../../context/ClientContext';
import clientsModel from '../../database/models/Clients';
import paymentsModel from '../../database/models/Payments';
import loansModel from '../../database/models/Loans';
import DropdownDefault from '../../components/Dropdowns/DropdownDefault';
import EditModalClient from './components/EditClientModal';
import Pagination from '../../components/Pagination'
import Select from '../../components/Forms/SelectGroup/Select';
import EditIcon, { UserIcon, StarIcon, PaymentIcon, WalletIcon } from '../../components/Icons';
import { ClientCard } from './components/ClientCard';

import { useDispatch, useSelector } from 'react-redux';
import { setClient} from '../../redux/client'
import { setLoans} from '../../redux/loans'


const Client = () => {


  const dispatch = useDispatch()
  
  const client = useSelector((state) => state.client);
  const loans = useSelector((state) => state.loans);
  
  const { showNotification } = useNotification()

  const navigate = useNavigate()

  // navigate("/")
  const { clientId } = useParams();
 
  
  const [totalGains, setTotalGains] = useState(0)
  const [totalLoans, setTotalLoans] = useState(0)
  const [expiredPayments, setExpiredPayments2] = useState(0)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('')


  useEffect(() => {
    const init = async () => {


  
     // setExpiredPayments2(await paymentsModel.getExpiredPaymentsLoans(clientId));

    const data = await clientsModel.getClient(clientId)
      

     dispatch(setClient(data[0]))

    
    
     const loansData = await loansModel.getClientLoans(clientId, {
        state: filter,
        pagination: {
          page,
          limit
        }
      }) 
      

      console.log(loansData)

      dispatch(setLoans(loansData.data))


      const totalRows = loansData.total
      setTotalPages(totalRows > limit ? Math.ceil(totalRows / limit) : 1)

     
      
      
      //console.log(client)

      const expired = await paymentsModel.getClientExpiredPayments(clientId)

      //setExpiredPayments(expired)

      const totalLoans = await loansModel.getClientTotalLoans(clientId)
      setTotalLoans(totalLoans[0].total)


      const totalGains = await clientsModel.getGainsFromClient(clientId)
      setTotalGains(totalGains)

    }

    init()

    return () => {

    }
  }, [page, filter])



  function changePage(page) {
    setPage(page)
  }

  return (
    <>
      <Notification >
        <Breadcrumb pageName="Cliente" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Prestamos del Cliente" total={totalLoans} rate="0.0" levelUp>
            <WalletIcon></WalletIcon>
          </CardDataStats>
          <CardDataStats title="Cuotas Vencidas" total={expiredPayments.length} rate={"0.0"} levelDown>
            <PaymentIcon></PaymentIcon>
          </CardDataStats>
          <CardDataStats title=" Ganancias obtenidas del cliente" total={"$ " + totalGains} rate="0.0" levelUp>
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
          <div className="flex justify-between col-span-12 xl:col-span-12 bg-white p-5">
            <Select className=""
              onChange={async (e) => setFilter(e.target.value)}
              options={[{
                label: "filtro Prestamos",
                value: "",
                selected: true
              },


              {

                label: "activos",
                value: "active",
                selected: false
              },

              {

                label: "completados",
                value: "completed",
                selected: false
              },

              {

                label: "cancelados",
                value: "canceled",
                selected: false
              },




              ]}>

            </Select>
            <Pagination currentPage={page} totalPages={totalPages} changePage={changePage}></Pagination>

          </div>
          <div className="col-span-6 xl:col-span-4">

            <ClientCard
             
            ></ClientCard>

          </div>
          <div className="col-span-6 xl:col-span-8">

            <LoansList  />
          </div>
          {/* <ChatCard /> */}
        </div>
      </Notification>

    </>
  );
};







export default Client;
