import React, { useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
//import ClientCard from "./ClientCard";
import { Link } from "react-router-dom";
import { UserIcon } from "../../../components/Icons";
import { useDispatch, useSelector } from 'react-redux';
import { add ,edit,remove} from '../../../redux/clients'

const ClientList = () => {

    const clients = useSelector((state) => state.clients);
    const dispatch = useDispatch();
  
  useEffect(()=>{
    
  },[])
  //console.log(clients)
  return (
    <>
    
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-1 ">
      {clients ? clients.map((client) =>{
     // console.log(client)
        return  (
          <ClientCard
            key={client.id}
            name={client.nickname}
            email={client.email}
            id={client.id}
            client={client}
            //profileImage={user.profileImage}
          />
        )
      }):""}
    </div>
    </>
  );
};




export const ClientCard = ({ name, loans,id,client }) => {
  return (
    <div className="max-w-sm  bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-center  items-center">
        {/* Client Icon */}
        <div className="bg-blue-500 text-white w-15 h-15 flex flex-row justify-center items-center rounded-full">
         <UserIcon></UserIcon>
        </div>
        {/* Client Info */}
        
      </div>
      <div className="ml-4">
          <h3 className="text-lg text-center font-semibold text-gray-800">{name}</h3>
         
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
      {client.expired > 0 ? (<Tag
      type="danger"

      label={"deudor"}

      />): ""}

   
       
       
   
      {client.incomplete>0 ? (<Tag
      type="warning"

      label={"p.incompletos "}

      ></Tag>  ):""}
      {/*  {client.incomplete > 0 ? (<Tag
      type="warnign"

      label={"asdasdr"}

      />): ""} */}
      <div className="text-center p-3">
        <Link to={"/clients/"+client.id}>ver cliente</Link>
      </div>
    </div>
  );
};

import Tag from "../../../components/Tag";
import clients from "../../../database/models/Clients";

export default ClientList