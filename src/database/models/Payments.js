
import {getSunday,getMonday, getLastWeek} from "../../common/funcs.jsx"


class Payments {
    constructor(parameters) {
        
    }


       
async  getLoansPayments(id,{limit,page},filter){

    // console.log(filter)
     //console.log(`SELECT *  from payments WHERE loan_id='${id}' AND state LIKE '% ${filter} %'  LIMIT ${limit} OFFSET ${(page-1)*limit};`)
       //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
       const r = await window.sqlite.query(`SELECT *  from payments WHERE loan_id='${id}' AND state LIKE '%${filter}%'  LIMIT ${limit} OFFSET ${(page-1)*limit};
         
         `);
   
         const total = await window.sqlite.query(`SELECT COUNT(id) as total  from payments WHERE loan_id='${id}';
         
         `);
   
   
    //console.log(total)
      return {
         payments:r,
         total:total[0].total
      }
   
   }
    

    

 async  getTotalPayments(id){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query("SELECT COUNT(id) as total   from payments WHERE loan_id='"+id+"'");
 
 //console.log(r)
   return r[0].total
 
 }
 
 

 async  getClientExpiredPayments(id){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  *   from loans WHERE client_id ='${id}'`);
    const payments =[]
  
    for (const loan of r) {
      const p = await window.sqlite.query(`SELECT  *   from payments WHERE loan_id ='${loan.id}'`);
      payments.push(p)
    }
  
  
  // console.log(r)
   return payments.flat(1)
  
  }
 async getExpiredPaymentsLoans(id){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  *   from loans WHERE client_id ='${id}'`);
    const payments =[]
  
    for (const loan of r) {
      const p = await window.sqlite.query(`SELECT  *   from payments WHERE loan_id ='${loan.id}' AND state='expired'`);
      payments.push(p)
    }
  
    
  // console.log(r)
   return payments.flat(1)
  
  }

  async getLoanPayedPaymentsTotal(id){
    const r = await window.sqlite.query(`SELECT 
      COUNT(*) AS total_payments, 
      COUNT(CASE WHEN state = 'payed' THEN 1 END) AS total_paid_payments
    FROM payments
    WHERE loan_id =${id}`);

      //console.log("asdas")
      //console.log(r)
      return r[0];
    
  }

async  getPayments(id,{limit,page},filter){

    // console.log(filter)
     //console.log(`SELECT *  from payments WHERE loan_id='${id}' AND state LIKE '%${filter}%'  LIMIT ${limit} OFFSET ${(page-1)*limit};`)
       //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
       const r = await window.sqlite.query(`SELECT *  from payments WHERE loan_id='${id}' AND state LIKE '%${filter}%'  LIMIT ${limit} OFFSET ${(page-1)*limit};
         
         `);
   
         const total = await window.sqlite.query(`SELECT COUNT(id) as total  from payments WHERE loan_id='${id}';
         
         `);
   
   
    //console.log(total)
      return {
         payments:r,
         total:total[0].total
      }
   
   }
    
    
 async getExpiredPayments(id){
  
    try {
        //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
        const r = await window.sqlite.query("SELECT *   from payments WHERE loan_id='"+id+"'AND state='expired'");
       // console.log(r)
        return r
    } catch (error) {
      //console.log(error)
  
      return false
    }
    
 }

 async getPaymentById(id){
  const r =await window.sqlite.query(`SELECT * FROM payments WHERE id='${id}' LIMIT 1`)

  return r[0]
 }

async editPayment(id,data){


  console.log(data)
   const current = await this.getPaymentById(id)

  //console.log("Asdasd12312")
   /*   console.log(data)
    const  payment ={
      ...current,
     ...data
      
    } */
    
     const  payment ={
      ...current,
     ...data
      
    } 
    
  //console.log("asdasd")
    //console.log(payment)

   
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");

     await window.sqlite.query(`UPDATE  payments  SET 
       state='${payment.state }',
       amount='${payment.amount}', 
       payment_date='${payment.payment_date}' ,
       label='${payment.label}' ,
       notes='${payment.notes}',
       net_amount='${payment.net_amount}'
      
       WHERE id ='${id}'
       
      ; `);

 
 
 //console.log("pago editado")
   return 
 
 }
 
 /* 

 async  setExpiredPayments(id){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  *   from loans WHERE client_id ='${id}'`);
    
    
  
    for (const loan of r) {
      const p = await window.sqlite.query(`UPDATE  payments  SET state='expired' WHERE loan_id ='${loan.id}'
       and payment_date<Date('now')
       `);
     
    }
  
  
  // console.log(r)
   return
  
  } */
 

  async payPayment(id){

    //console.log(id)

    await window.sqlite.query(`UPDATE payments 
        SET state ='payed',
        payed_date=DATE('now')
        
        WHERE id='${id}';
        `); 
  
        //console.log(`SELECT id,loan_id FROM paymentsWHERE id='${id}';`)
        
        const loanId =  await window.sqlite.query(`SELECT id,loan_id FROM payments
          WHERE id='${id}';
          `); 
          //console.log("loan id")
          //console.log(loanId)
  
      /*  console.log(await window.sqlite.query(`
          UPDATE loans
          SET state = 'completed'
          WHERE id = ${loanId[0].loan_id}
          AND (
              SELECT COUNT(*) 
              FROM payments 
              WHERE loan_id = loans.id 
              AND state != 'payed'
          ) = 0;  
          `));   */
          
/*       const isCompleted =  `SELECT id FROM payments WHERE loan_id = ${loanId[0].loan_id}
          AND (
              SELECT COUNT(*) 
              FROM payments 
              WHERE loan_id = loans.id 
              AND state != 'payed'
          ) = 0; `
    
        console.log(  await window.sqlite.query(isCompleted))
     */
  }

  async getPaymentsMonthState(month) {

      // Obtener el año y el mes actual
  const date = new Date();
  const year = date.getFullYear();

  // Calcular el primer día del mes
  const startDate = new Date(year, month - 1, 1);  // Restamos 1 porque los meses en JavaScript son indexados desde 0
  const start = startDate.toISOString().split('T')[0]; // Convertimos a formato YYYY-MM-DD

  // Calcular el último día del mes
  const endDate = new Date(year, month, 0); // El día 0 del siguiente mes nos da el último día del mes actual
  const end = endDate.toISOString().split('T')[0]; // Convertimos a formato YYYY-MM-DD

  //console.log("fechas del mes ",start,end)

    const query = `SELECT
       state,
       COUNT(*) AS total_payments
     FROM payments
     WHERE payment_date BETWEEN 
         '${start}' AND
'${end}'
     GROUP BY state
     ORDER BY CASE state
       WHEN 'payed' THEN 1
       WHEN 'expired' THEN 2
       WHEN 'incomplete' THEN 3
       WHEN 'pending' THEN 4
       ELSE 5
     END;'
 `
    try {
      const result = await window.sqlite.query(query);
      //console.log(result);  // Verifica que los datos lleguen correctamente
      return result;  // Devuelve el resultado de la consulta
    } catch (error) {
      console.error('Error al obtener los pagos por mes:', error);
    }

    return false
  }


  async getPaymentsWeekState(){

    const start = getMonday(new Date())
    const end = getSunday(new Date())

    //console.log(start,end)
   /*  console.log(
      await window.sqlite.query("SELECT  strftime('%Y-%m-%d', 'now', 'weekday 6') as date FROM payments"))
 */
    const query = `SELECT
       state,
       COUNT(*) AS total_payments
     FROM payments
     WHERE payment_date BETWEEN 
         '${start}' AND
'${end}'
     GROUP BY state
     ORDER BY CASE state
       WHEN 'payed' THEN 1
       WHEN 'expired' THEN 2
       WHEN 'incomplete' THEN 3
       WHEN 'pending' THEN 4
       ELSE 5
     END;'
 `


  const result = await window.sqlite.query(query)

  //console.log("estado de los pagos ")
   //console.log(result)

  return result 


  /* SELECT
       state,
       COUNT(*) AS total_payments
     FROM payments
     WHERE payment_date BETWEEN 
         strftime('%Y-%m-%d', 'now', 'weekday 0', '-6 days') AND
 strftime('%Y-%m-%d', 'now', 'weekday 6')
     GROUP BY state
     ORDER BY CASE state
       WHEN 'pagado' THEN 1
       WHEN 'vencido' THEN 2
       WHEN 'incompleto' THEN 3
       WHEN 'pendiente' THEN 4
       ELSE 5
     END;
    */
 }


 async getPaymentsState(start,end){


  //console.log(start,end)
 /*  console.log(
    await window.sqlite.query("SELECT  strftime('%Y-%m-%d', 'now', 'weekday 6') as date FROM payments"))
*/
  const query = `SELECT
     state,
     COUNT(*) AS total_payments
   FROM payments
   WHERE payment_date BETWEEN 
       '${start}' AND
'${end}'
   GROUP BY state
   ORDER BY CASE state
     WHEN 'payed' THEN 1
     WHEN 'expired' THEN 2
     WHEN 'incomplete' THEN 3
     WHEN 'pending' THEN 4
     ELSE 5
   END;'
`


const result = await window.sqlite.query(query)

//console.log("estado de los pagos ")
 //console.log(result)

return result 


/* SELECT
     state,
     COUNT(*) AS total_payments
   FROM payments
   WHERE payment_date BETWEEN 
       strftime('%Y-%m-%d', 'now', 'weekday 0', '-6 days') AND
strftime('%Y-%m-%d', 'now', 'weekday 6')
   GROUP BY state
   ORDER BY CASE state
     WHEN 'pagado' THEN 1
     WHEN 'vencido' THEN 2
     WHEN 'incompleto' THEN 3
     WHEN 'pendiente' THEN 4
     ELSE 5
   END;
  */
}


 async  getLastPayments() {
       
    const query = `SELECT payments.id as paymentId, payments.payment_date, payments.amount,payments.state,
    loans.id,loans.amount as loanAmount,loans.client_id,clients.id,clients.nickname
    FROM payments
    INNER JOIN 
    loans ON payments.loan_id = loans.id
    INNER JOIN 
    clients ON loans.client_id = clients.id

    WHERE  payments.state="payed"

    ORDER BY payments.id DESC 
    limit 4

    `;
    
    //console.log(query)
    const data = await window.sqlite.query(query)
    
    return data
}


async getWeeksPaymentsState(state,dates){

  


  //console.log(dates)
  const query=`SELECT
  p.id as payment_id,
   p.label as label,
   p.amount as monto,
   p.state,
    strftime('%Y-%m-%d', p.payment_date) AS payment_day,  -- Formato de la fecha (año-mes-día)
    c.nickname AS client_name,  -- Concatenar nombre y apellido del cliente
    COUNT(*) AS total_expired,  -- Cuenta cuántas cuotas vencidas hay en ese día
    SUM(p.amount) AS total_amount  -- Suma el monto total de las cuotas vencidas en ese día
    FROM payments p
    JOIN loans l ON p.loan_id = l.id  -- Unir con la tabla de préstamos
    JOIN clients c ON l.client_id = c.id  -- Unir con la tabla de clientes
    WHERE (p.state = 'pending' OR p.state = 'expired') AND payed_date IS NULL   -- Filtra solo las cuotas vencidas
      AND p.payment_date BETWEEN '${dates[0]}' AND
    '${dates[1]}'
GROUP BY payment_day, client_name  -- Agrupa por día y nombre del cliente
ORDER BY payment_day, client_name;  -- Ordena por fecha y nombre del cliente`

const result = await  window.sqlite.query(query)

//console.log(result)
return result 

}
 
async setExpiredPayments(){
  const start = getMonday(new Date())
  const end = getSunday(new Date())

  const query = `UPDATE payments SET state='expired'
  WHERE payment_date < DATE('now','localtime') AND payed_date IS NULL  AND (state = 'pending' OR state = 'incomplete')
   
  
  `
  const result = await  window.sqlite.query(query)

}


async getWeekPendingPayments(){
  const start = getMonday(new Date())
  const end = getSunday(new Date())

  const query=`SELECT
  p.id as payment_id,
   p.label as label,
   p.amount as monto,
   p.state,
    strftime('%Y-%m-%d', p.payment_date) AS payment_day,  -- Formato de la fecha (año-mes-día)
    c.nickname AS client_name,  -- Concatenar nombre y apellido del cliente
    COUNT(*) AS total_expired,  -- Cuenta cuántas cuotas vencidas hay en ese día
    SUM(p.amount) AS total_amount  -- Suma el monto total de las cuotas vencidas en ese día
    FROM payments p
    JOIN loans l ON p.loan_id = l.id  -- Unir con la tabla de préstamos
    JOIN clients c ON l.client_id = c.id  -- Unir con la tabla de clientes
    WHERE (p.state = 'pending' OR p.state = 'expired') AND payed_date IS NULL   -- Filtra solo las cuotas vencidas
      AND p.payment_date BETWEEN '${start}' AND
    '${end}'
GROUP BY payment_day, client_name  -- Agrupa por día y nombre del cliente
ORDER BY payment_day, client_name;  -- Ordena por fecha y nombre del cliente`

const result = await  window.sqlite.query(query)

//console.log(result)
return result 

}

async insertPayments(data,dates){
        
 
      console.log(dates)
       
      const {date,amount,interes,installments,interval,loanId,id} = data
       // const loan_id = await window.sqlite.query("SELECT id FROM loans ORDER BY id DESC LIMIT 1")
        //console.log(loan_id)

        const [ anio, mes,dia] = date.split("-")
      
        const payDate = new Date(anio,mes-1,dia)
        
      
        //cuotas 
      
        const gains = (amount*interes)/100
      
        
        const paymentGain= Math.ceil(gains/installments)
      
        const cuotaBruta  = Math.ceil(amount/installments)
        
        const totalCuota = cuotaBruta+paymentGain
        console.log(dates)
      
        for (let index = 0; index < Number(installments); index++) {
            let ndate
          if(interval=="custom" && dates){
            
            console.log("fechas "+dates[index])
             ndate= dates[index]
          
          }
           else{
          // Dividir la fecha en partes (día, mes, año)
          if(interval=="daily"){

            payDate.setDate(payDate.getDate()+1)
            //console.log(payDate)
           }
           if(interval=="weekly") payDate.setDate(payDate.getDate()+7)
            if(interval=="fortnight") {

           
             payDate.setDate(payDate.getDate() + 15);
    
             //console.log("Fortnight");
             //console.log(payDate); // Aquí verás la nueva fecha sumando los 15 días

             
            }
           if(interval=="monthly"){
              payDate.setMonth(payDate.getMonth() + 1);
              
              
           }
      
      
          
           
           const anio1 = payDate.getFullYear();
           const mes1 = String(payDate.getMonth() + 1).padStart(2, "0"); // Mes (base 0) + 1, con cero inicial
           const dia1 = String(payDate.getDate()).padStart(2, "0"); // Día con cero inicial
         
            ndate= `${anio1}-${mes1}-${dia1}`;
         
          }
          
      
           //console.log(loanId)
           //console.log(cuotasAmount)
           
          //console.log("fecha "+ndate)

          try {
            await  window.sqlite.query(`INSERT INTO payments
              (amount,payment_date,loan_id,gains,net_amount,label) 
             VALUES
             (
             '${totalCuota}',
             
             '${ndate}',
             '${id}',
              '${ paymentGain}',
               '${cuotaBruta}',
               '${"Cuota N° "+(index+1)}'
               
             );
             `)
             //console.log("pago agregado")
          } catch (error) {
            //console.log(error)
            //console.log("pago no agregado")
          }
             
      
      
} 
        
}

 async  deletePayment(id){
  
        //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
        const r = await window.sqlite.query("DELETE FROM payments WHERE id='"+id+"'");
     
     //console.log(r)
       return r
     
}
     

async getWeekPayments(){


  const start = getMonday(new Date())
  const end = getSunday(new Date())

  //console.log(start)
  //console.log(end)

    const query=`SELECT
    CASE strftime('%w', payment_date)
        WHEN '0' THEN 'Domingo'
        WHEN '1' THEN 'Lunes'
        WHEN '2' THEN 'Martes'
        WHEN '3' THEN 'Miércoles'
        WHEN '4' THEN 'Jueves'
        WHEN '5' THEN 'Viernes'
        WHEN '6' THEN 'Sábado'
    END AS weekday_name,
    payment_date,
    strftime('%w', payment_date) AS weekday,  -- Días de la semana: 0 (domingo) a 6 (sábado)
    SUM(net_amount) AS total_amount,              -- Suma de los pagos
    SUM(gains) AS total_gains,  
    SUM(amount) AS total_amount_gains,           -- Suma de las ganancias
    COUNT(*) AS total_payments                -- Contar cuántos pagos hubo en ese día
FROM payments
WHERE state = 'payed'  -- Filtrar solo los pagos pagados
AND payment_date BETWEEN '${start}' AND '${end}'
GROUP BY weekday
ORDER BY weekday;`

const r = await window.sqlite.query(query) 

//console.log(r)
return r

}



async getMonthsGains(){

  const query = `SELECT DISTINCT CAST(strftime('%m', payment_date) AS INTEGER) AS month ,
   SUM(gains) AS total_gains,
   SUM(net_amount) AS total_net
  
  FROM payments
  
  WHERE 
    state = 'payed'
GROUP BY 
    strftime('%m', payment_date);`

const r = await window.sqlite.query(query)

//console.log(r)
return  r
}

async getLastWeekPayments(){


  const lastweek=getLastWeek()

  const query = `SELECT
      CASE strftime('%w', payment_date)
          WHEN '0' THEN 'Domingo'
          WHEN '1' THEN 'Lunes'
          WHEN '2' THEN 'Martes'
          WHEN '3' THEN 'Miércoles'
          WHEN '4' THEN 'Jueves'
          WHEN '5' THEN 'Viernes'
          WHEN '6' THEN 'Sábado'
      END AS weekday_name,
      payment_date,
      strftime('%w', payment_date) AS weekday,
      SUM(net_amount) AS total_amount,
      SUM(gains) AS total_gains,
      SUM(amount) AS total_amount_gains,
      COUNT(*) AS total_payments
  FROM payments
  WHERE state = 'payed'
  AND payment_date BETWEEN
    '2025-01-27'  -- Primer día de la semana pasada (domingo)
      AND '2025-02-02'  -- Último día de la semana pasada (sábado)
  GROUP BY weekday
  ORDER BY weekday;
  `;
  

const r = await window.sqlite.query(query) 

//console.log(r)
return r

}
     

 async  getMonthlyPaymentGains(){

    const r = await window.sqlite.query(`SELECT  SUM(gains) AS totalGains 
         FROM payments WHERE  state='payed'`)

         /* strftime('%Y-%m', payment_date) = strftime('%Y-%m', 'now')  AND  */

         //console.log(r)
    return  r[0].totalGains
}


async  getGainsFromTodaysPaymentsPayed() {
      const r = await window.sqlite.query(`SELECT  SUM(gains) AS todayGains  FROM payments WHERE payment_date=DATE('now','localtime')  AND  state='payed'`)
  
      //console.log(r)
      return r[0].todayGains
}


async  getTodaylTotalPayments() {

    return await window.sqlite.query(`
        
        SELECT COUNT(id) AS total  FROM payments 
        
    `)
}


async  getAmountSumFromTodaysPaymentsPayed() {


    const r = await window.sqlite.query(`SELECT  SUM(amount) AS todayTotalGains  FROM payments WHERE payment_date=DATE('now','localtime')  AND  state='payed'`)

    //console.log(r)
    return r[0].todayTotalGains
}


 async setIncompletePayment(payment,monto) {


    //console.log(payment)
  try {
    const r = await window.sqlite.query(`
        UPDATE  payments SET  state='incomplete',notes='pago incompleto
         monto pagado ${monto} resta
          por pagar ${payment.amount} para completar el pago (los pagos incompletos
           no estan acoplados al calculo de la ganancia)' WHERE id='${payment.paymentId}'
        `)

  } catch (error) {
    //console.log(error)
  }
   
    
}


 async  getTotalPaymentsAll() {

     const r =  await window.sqlite.query(`
        
        SELECT  SUM(amount) AS ganacia_total_hoy  FROM payments WHERE payment_date=DATE('now','localtime') 
        
    `)
    //console.log(r)

    return r;
}




   

 async getTodayPayments(page,limit,search) {


  //console.log(search)
  const query = `SELECT 
    payments.id as paymentId,
    payments.label, 
    payments.payment_date, 
    payments.amount, 
    payments.state,
    payments.gains,
    loans.id, 
    loans.amount as loanAmount, 
    loans.client_id, 
    clients.id, 
    clients.nickname,
    (SELECT COUNT(*) 
     FROM payments 
     INNER JOIN loans ON payments.loan_id = loans.id 
     INNER JOIN clients ON loans.client_id = clients.id
     WHERE payment_date = DATE('now','localtime') 
     AND clients.nickname LIKE '%${search}%') AS totalResults
    FROM payments
    INNER JOIN loans ON payments.loan_id = loans.id
    INNER JOIN clients ON loans.client_id = clients.id
    WHERE payment_date = DATE('now','localtime')
    AND clients.nickname LIKE '%${search}%'
    ORDER BY payments.id DESC
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit};
  `;


    
    //console.log(query)
    //console.log(query)
    const data = await window.sqlite.query(query)
    
    
    

//    console.log(data)


    return data
}




      
}





const payments = new Payments()


export default payments