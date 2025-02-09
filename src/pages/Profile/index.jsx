import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from 'react-redux';
import { add ,edit,remove} from '../../redux/clients'

const Profile = () => {

  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);

  useEffect(() => {

    console.log(clients)



    return () => {

    }
  }, [clients])

  return (
    <>

      <div className='mt-4 grid grid-cols-3 gap-2  p-5'>

        <button className='bg-primary text-white' onClick={(e) => {

          setCount((prev) => prev + 1)

          dispatch(add({
            id: count,
            name: "pepe",

          }))
        }}>add client</button>

        <button className='bg-primary text-white' onClick={(e) => {

         

          dispatch(edit({
            id:3,
            data:{
              name:"cahgnoasd123"
            }
          }))
        }}>edit client</button>
        <button className='bg-primary text-white' onClick={(e) => {

         
          dispatch(remove(2))
        }}>remove client</button>
        {/*   <AvatarComponent></AvatarComponent>
      <div className='bg-white '>
       <DateRangePickerWithDatepicker></DateRangePickerWithDatepicker>
      </div> */}
      </div>


    </>
  );
};




import avatar3 from "../../images/user/user-01.png"


const AvatarComponent = () => {
  const [avatar, setAvatar] = useState(avatar3);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setAvatar(event.target.result); // Cambiar la imagen del avatar
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-start bg-white  space-x-3 cursor-pointer p-4 col-span-2">
      <div className="relative w-40 h-40 rounded-full overflow-hidden group">
        <img
          src={avatar}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
        <input
          type="file"
          id="file-input"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*"
          onChange={handleFileChange}
        />
        <i className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl opacity-0 group-hover:opacity-100">
          ⬆️
        </i>
      </div>
      <div className='ml-4'>
        <span className="text-lg">Usuario Nombre</span>
      </div>
    </div>
  );
};




const DateRangePicker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {/* Input para el rango de fechas */}
      <div className="flex space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border border-gray-300 rounded-md p-2"
        />
        <span className="text-xl">to</span>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Mostrar calendario si el flag 'isOpen' es verdadero */}
      {isOpen && (
        <div
          className="absolute top-12 left-0 p-4 border border-gray-300 bg-white shadow-lg rounded-lg z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-7 gap-4">
            <button
              className="p-2 bg-gray-200 rounded-md"
              onClick={toggleCalendar}
            >
              Close
            </button>
            {/* Aquí puedes agregar un calendario visual si lo deseas */}
            {/* Pero por ahora te dejo solo los inputs de fecha de HTML5 */}
          </div>
        </div>
      )}

      {/* Abrir el calendario */}
      <button
        onClick={toggleCalendar}
        className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-full"
      >
        🗓️
      </button>
    </div>
  );
};


const DateRangePickerWithDatepicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="flex flex-col space-x-4">
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="border border-gray-300 rounded-md p-2"
          placeholderText="Start Date"
        />
      </div>

      <span className="text-xl">to</span>

      <div>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="border border-gray-300 rounded-md p-2"
          placeholderText="End Date"
        />
      </div>
    </div>
  );
};

export default Profile;
