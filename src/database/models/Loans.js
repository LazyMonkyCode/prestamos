import paymentsModel from "./Payments"

class Loans {
    constructor(parameters) {
        
    }


async name(params) {
const query = `
  SELECT id, amount
FROM loans
ORDER BY amount DESC
LIMIT 5;`


const r = await window.sqlite.query(query)


 
}
    

 async   updateLoan(data,prevState) {

    console.log(data)
    
    let gains = prevState.gains
    
    
    if(prevState.amount != data.amount) gains = Math.round((data.amount*data.interes)/100)
   
   /*  
      console.log(`
      UPDATE loans SET 
        amount='${data.amount}'
      ,installments='${data.installments}'
      ,interes_percentage='${data.interes}'
      ,aproved_date='${data.date}'
      ,label='${data.label}'
      ,payment_interval='${data.interval}'
      ,state='${data.state}'
      ,gains='${gains}'
  
      WHERE id='${data.id}';
      `)*/
      //console.log(data) 
     // console.log(prevState)

   const r = await window.sqlite.query( `
      UPDATE loans SET 
        amount = '${data.amount}', 
        installments = '${data.installments}', 
        interes_percentage = '${data.interes}', 
        aproved_date = '${data.date}', 
        label = '${data.label}', 
        payment_interval = '${data.interval}', 
        state = '${data.state}', 
        gains = '${gains}' 
      WHERE id = '${data.id}';
    `); 
  
  
      
   
  
      if(
        prevState.installments != data.installments ||
        prevState.amount != data.amount ||
        prevState.payment_interval != data.interval ||
       // prevState.aproved_date != data.date ||
        prevState.interes_percentage != data.interes 
      
      ){
        
       // console.log("Asdasd")
       //delete payments
         window.sqlite.query(`
          DELETE FROM payments WHERE loan_id='${data.id}'  
  
        `).then(async ()=>{

          await paymentsModel.insertPayments(data)
        })
  
      
          
      } 
  }
  

  async getTotalLoansAmountPayments(){

    const query = `SELECT 
     
      SUM(CASE WHEN payments.state = 'payed' THEN payments.net_amount ELSE 0 END) AS total_payed
  FROM loans
  LEFT JOIN payments ON loans.id = payments.loan_id
  WHERE loans.state = 'active';`
  const p = await window.sqlite.query(query)
  
  const r = await window.sqlite.query(`SELECT 
      SUM(loans.amount) AS total_loans
    
  FROM loans
 
  WHERE loans.state = 'active';`)
  
  return {
    loans:r[0].total_loans,
    payments:p[0].total_payed
  };
  }

async insertLoan(formData){

    const {interes,cuota,monto} = formData
    
    const gains = (formData.monto.value*formData.interes.value)/100
  
    
  
   /*  const cuotaBruta  = formData.monto.value/formData.cuotas.value
    
    const totalCuota = cuotaBruta+paymentGain
  
    console.log(totalCuota) */
  
    
    const loans = await  window.sqlite.query(`SELECT id from loans where client_id=${formData.clientId.value}`);
    
    const label = "Prestamo N° "+(loans.length+1)

    await  window.sqlite.query(`INSERT INTO loans
      (label,amount,installments,interes_percentage,gains,aproved_date,payment_interval,client_id,lender_id) 
     VALUES
     (
      '${label}',
     '${formData.monto.value}',
     '${formData.cuotas.value}',
     '${formData.interes.value}',
     '${gains}',
     '${formData.fecha.value}',
     '${formData.pagos.value}',
     '${formData.clientId.value}',
     '${1}'
     );
     `)
  
     const loan_id = await window.sqlite.query("SELECT id FROM loans ORDER BY id DESC LIMIT 1")
  
  
     return {
      id:loan_id[0].id,
      gains:gains
      ,amount:formData.monto.value
      ,installments:formData.cuotas.value
      ,interes_percentage:formData.interes.value
      ,aproved_date:formData.fecha.value
      ,payment_interval:formData.pagos.value
      ,client_id:formData.clientId.value
      ,lender_id:formData.userId.value
      ,label:label
      ,state:"active"
     } 
  
    
  }
  
  
  

  
   async deleteLoan(id) {
      try {
        await window.sqlite.query("DELETE FROM loans WHERE id='"+id+"'")
  
      await window.sqlite.query("DELETE FROM payments WHERE loan_id='"+id+"'")

      console.log("pagos eliminados")
      } catch (error) {
        console.log(error)

      }
  
  }


  async deleteLoanByClient(id) {
    await window.sqlite.query(`DELETE FROM payments 
WHERE loan_id IN (SELECT id FROM loans WHERE client_id = ${id});`)


await window.sqlite.query(`DELETE FROM loans 
WHERE client_id = ${id};
`)
  
  
await window.sqlite.query(`DELETE FROM clients 
WHERE id = ${id};
  `)
    
    

}


  
  async getTotalLoans  ()  {
    
    const r = await window.sqlite.query(`SELECT COUNT(id) as total FROM loans `)


    return r
}



async  getLoan(id){
  
    try {
        //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
        const r = await window.sqlite.query(`SELECT loans.id,loans.amount,loans.installments,loans.state
          ,loans.gains,loans.label,loans.interes_percentage,loans.payment_interval,loans.client_id,loans.aproved_date
          ,clients.id,clients.nickname
          FROM loans
          INNER  JOIN clients ON loans.client_id=clients.id
           WHERE loans.id='${id}' ;
          `);
        console.log(r)
        return r
    } catch (error) {
      console.log(error)
  
      return false
    }
    
      
   //console.log(r)
    
  
  }

  async getLastLoans  (params)  {
    
    const r = await window.sqlite.query(`SELECT 

        loans.id as loanId ,loans.client_id,loans.aproved_date,loans.amount,
        clients.id as clientid,clients.nickname
        
         FROM loans
        
        INNER JOIN clients ON clients.id = loans.client_id 
        ORDER BY loans.id desc LIMIT 4`)


    return r
}

async  getClientTotalLoans(id){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  COUNT(id) AS total  from loans WHERE client_id ='${id}'`);
  
  // console.log(r)
   return r
  
  }

  async  getClientTotalLoans(id){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  COUNT(id) AS total  from loans WHERE client_id ='${id}'`);
  
  // console.log(r)
   return r
  
  }
      
  

async  getClientLoans(id){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  
      loans.id,loans.amount,loans.installments,loans.state
      ,loans.gains,loans.label,loans.interes_percentage,loans.payment_interval,
      loans.client_id,loans.aproved_date,
      COUNT(CASE WHEN payments.state = 'expired' THEN  1 END) AS total_expired,
      COUNT(CASE WHEN payments.state = 'payed' THEN 1 END) AS total_paid,
      COUNT(CASE WHEN payments.state = 'incomplete' THEN 1 END) AS total_inomplete,
      COUNT(CASE WHEN payments.state = 'pending' THEN 1 END) AS total_pending,


      COUNT(payments.id) AS total_payments
    
    from loans 
      
     LEFT JOIN
    payments ON loans.id = payments.loan_id

    WHERE client_id ='${id}'

    GROUP BY
    loans.id, loans.client_id
    
    ORDER BY loans.id DESC;

      `);

  console.log(r)
   return r

}




 async getGainsLoan(id){
  
    try {
        //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
        const r = await window.sqlite.query("SELECT SUM(gains) as gains ,SUM(net_amount) as netas from payments WHERE loan_id='"+id+"'AND state='payed';");
        
      //  console.log(r)
      if(r) return {
        gains:r[0].gains,
        netas:r[0].netas
      }
      else return 0
  
    } catch (error) {
      console.log(error)
  
      return false
    }
}
    





}




const loans = new Loans()


export default loans