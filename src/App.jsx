import React,{ useEffect, useState } from 'react';
import { Route, Routes, useLocation,Link } from 'react-router-dom';

 import Loader from './common/Loader.jsx';
import PageTitle from './components/PageTitle.jsx';
import SignIn from './pages/Authentication/SignIn.jsx';
import SignUp from './pages/Authentication/SignUp';
import Dashboard from './pages/Dashboard/index.jsx';
 import Clients from './pages/Clients/index.jsx';
 import Client from "./pages/Clients/Client/index.jsx"
import Loans from './pages/Loans/index.jsx';
import Payments from './pages/Payments/index.jsx';
import Calendar from './pages/Calendar/index.jsx';
import Loan from './pages/Loans/Loan/index.jsx';
import Payment from './pages/Payments/Payment/index.jsx'; 
/*import Calendar from './pages/Calendar';
import Chart from './pages/Chart';

*/
import DefaultLayout from './layout/DefaultLayout.jsx'; 
import PrivateRoute  from './components/PrivateRoute.jsx';
import Notification from './components/Notifications.jsx';
import Error404 from './404.jsx';
import Profile from './pages/Profile/index.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return loading ? (
    <Loader />
  ) : (

   
    <Routes>

      {/* 404 path */}
      <Route path='*' element={<Error404></Error404>}></Route>
      
      <Route  element={<PrivateRoute/>}>
        <Route  path='/profile' element={<DefaultLayout>
          <PageTitle title="Perfil" />
          <Profile></Profile>
        </DefaultLayout>} />
      </Route>
      {/* dashboard root */}
      <Route  element={<PrivateRoute/>}>
        <Route  path='/' element={
          <DefaultLayout>
            <Dashboard></Dashboard>
        </DefaultLayout>} />
      </Route>

      <Route  element={<PrivateRoute/>}>
        <Route  path='/clients' element={
          
          <DefaultLayout>
          <PageTitle title="clientes" />

          <Clients />
        </DefaultLayout>
        
        } />
      </Route>
      
      <Route  path='/clients/:clientId?' element={
            
          <DefaultLayout>
            <PageTitle title="cliente" />
            <Client></Client>
        </DefaultLayout>
  
       } />
 
       
      <Route  element={<PrivateRoute/>}>
        <Route  path='/loans' element={<DefaultLayout>
          <PageTitle title="prestamos" />
          <Loans></Loans>
        </DefaultLayout>} />
      </Route>



      <Route element={<PrivateRoute/>}>
        <Route  path='/loans/:loanId?' element={
          <Notification>
          <DefaultLayout>
            <PageTitle title="prestamos" />
            <Loan></Loan>
          </DefaultLayout>
        </Notification>
        } />
      </Route>
      
    <Route  element={<PrivateRoute/>}>
        <Route  path='/cobranza' element={
           <Notification>
          <DefaultLayout>
          <PageTitle title="cobranza" />
          <Payments></Payments>
        </DefaultLayout></Notification>} />
      </Route>


      <Route  element={<PrivateRoute/>}>
        <Route  path='/calendar' element={
           <Notification>
          <DefaultLayout>
          <PageTitle title="cobranza" />
          <Calendar></Calendar>
        </DefaultLayout></Notification>} />
      </Route>
      <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />  {/*  */}
     
       {/* 
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
       */}
      </Routes>
   
  );
}

export default App;
