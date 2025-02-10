import loans from "../models/Loans";
import loansModel from "../models/Loans"

class Clients {
  constructor() {

  }


  async getClientsDebtors() {

    const query = `SELECT
  COUNT(DISTINCT CASE WHEN p.state = 'expired' THEN c.id END) AS expired_clients_count,
  COUNT(DISTINCT CASE WHEN p.state = 'incomplete' THEN c.id END) AS incomplete_clients_count
FROM clients c
JOIN loans l ON c.id = l.client_id
LEFT JOIN payments p ON l.id = p.loan_id AND p.state IN ('expired', 'incomplete');`
    return await window.sqlite.query(query);

  }


  async deleteClient(id) {

    await window.sqlite.query(`DELETE  FROM  clients WHERE id='${id}'`);

    await loansModel.deleteLoanByClient(id)
    //console.log(r)
  }


  async getClients(filter, limit = 5, page = 1) {

    let clients;
    let total = 0;

    if (filter.state) {


      clients = await window.sqlite.query(`SELECT DISTINCT l.client_id, c.*
      FROM clients c
      JOIN loans l ON c.id = l.client_id
      LEFT JOIN payments p ON l.id = p.loan_id
      WHERE  p.state = '${filter.state}' 
      ${filter.nickname ? ` AND c.nickname LIKE '%${filter.nickname}%'` : ""}
      ORDER BY c.id DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
      ;`);

      console.log("clients")

      total = await window.sqlite.query(`SELECT DISTINCT l.client_id, count(c.id) as total
      FROM clients c
      JOIN loans l ON c.id = l.client_id
      LEFT JOIN payments p ON l.id = p.loan_id
      WHERE  p.state = '${filter.state}' 
      ${filter.nickname ? ` AND c.nickname LIKE '%${filter.nickname}%'` : ""}
      ORDER BY c.id DESC
      
      `);

        console.log(total[0].total)
       total = total[0].total
    }

    else {
      clients = await window.sqlite.query(`SELECT * 
      FROM clients
      WHERE clients.nickname LIKE '%${filter.nickname}%' 
      ORDER BY clients.id DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `);

      total = await this.getTotalClients()
    }



    for (const client of clients) {
      try {
        // Obtenemos los pagos para este cliente
        const payments = await window.sqlite.query(`SELECT
          l.client_id,
          COUNT(CASE 
                  WHEN p.payment_date IS NOT NULL AND p.state = 'payed' THEN 1 
                END) AS cuotas_pagadas,
          COUNT(CASE 
                  WHEN p.payed_date IS NULL AND p.state = 'expired' THEN 1 
                END) AS cuotas_vencidas,
          COUNT(CASE 
                  WHEN p.state = 'incomplete'  THEN 1 
                END) AS cuotas_incompletas
        FROM loans l
        LEFT JOIN payments p ON l.id = p.loan_id
        WHERE l.client_id = '${client.id}'  -- Asegúrate de que client.id es correcto
        GROUP BY l.client_id;
      `);

        // Agregamos los pagos al objeto del cliente, verificando si hay datos
        client.expired = payments.length > 0 ? payments[0].cuotas_vencidas : 0;
        client.incomplete = payments.length > 0 ? payments[0].cuotas_incompletas : 0;
        client.payed = payments.length > 0 ? payments[0].cuotas_pagadas : 0;

      } catch (error) {
        console.error(`Error al obtener los pagos para el cliente ${client.id}:`, error);
      }
    }

  
    return { clients, total }


  }


  async getTotalClients() {

    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query("SELECT COUNT(id) as total  from clients  ");

    console.log(r)
    return r[0].total

  }



  async getClientLastId() {

    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query("SELECT id from clients  ORDER BY id DESC LIMIT 1");

    console.log(r)
    return r

  }

  async editClient(id, values) {

    console.log(id, values)

    await window.sqlite.query(`
    UPDATE clients SET  nickname='${values.nickname}',name='${values.name}',
    lastname ='${values.lastname}',email='${values.email}',phonenumber='${values.phonenumber}',
    address ='${values.address}'

    WHERE id='${id}'
`);


  }

  async insertClient(values) {

    console.log(values)

    await window.sqlite.query(`
    INSERT INTO clients (nickname,name,lastname,email,phonenumber,address) VALUES (
    '${values.nickname}',
    '${values.name}',
    '${values.lastname}',
    '${values.email}',
    '${values.phonenumber}',
    '${values.address}'
    )
    
    `);


  }



  async getClientsPaymentsState(state, dates = null) {

    const r = await window.sqlite.query(`SELECT 
    c.id AS client_id,
    c.nickname AS client_name,

    COUNT(p.id) AS overdue_payments_count,  -- Contar los pagos vencidos
    GROUP_CONCAT(p.id, ', ') AS overdue_payment_ids  -- Concatenar los IDs de los pagos vencidos
    FROM 
      clients c
    JOIN 
    loans l ON c.id = l.client_id
      LEFT JOIN 
    payments p ON l.id = p.loan_id
    WHERE 
    l.state = 'active'  -- Solo prestamos activos
    AND p.state = '${state}'  -- Solo pagos pendientes
    AND p.payment_date < DATE('now')  -- Solo pagos cuyo vencimiento es anterior a la fecha actual
    ${dates != null ? ` AND p.payment_date BETWEEN ${dates.start} AND ${dates.end}` : ""}

    GROUP BY 
    c.id, c.name, c.lastname  -- Agrupar por cliente para contar y concatenar los pagos vencidos
ORDER BY 
    overdue_payments_count DESC;  -- Ordenar por el número de pagos vencidos`)

    console.log("asdasd")
    console.log(r)
    return r
  }






  async getGainsFromClient(clientId) {

    // console.log(clientId)
    const r = await window.sqlite.query(`SELECT id FROM loans  WHERE client_id='${clientId}';`);

    // console.log(r)
    const payments = []

    if (Array.isArray(r)) {

      var gains = 0

      for (const loan of r) {
        let sumGains = 0
        const p = await window.sqlite.query(`SELECT  id,gains 
              from payments WHERE loan_id ='${loan.id}' 
            
            AND state='payed'  `);

        for (const paym of p) {
          sumGains += paym.gains
        }

        gains += sumGains
      }

    }

    return gains
  }








  async updateClient(clientId, data) {



    try {
      const r = await window.sqlite.query(`
      UPDATE clients SET nickname='${data.nickname}'
      ,email='${data.email}'
      ,name='${data.name}'
      ,lastname='${data.lastname}'
      ,phonenumber='${data.phonenumber}'
      ,address='${data.address}'
     ,alias='${data.alias}'
     ,cbu='${data.cbu}'
    ,rate='${data.rate}'
  
      WHERE id='${data.id}'
      `);

      return true
    } catch (error) {
      console.log(error)

      return false
    }

  }


  /* 
    
     const loan_id = await window.sqlite.query("SELECT id FROM loans ORDER BY id DESC LIMIT 1")
     //console.log(loan_id)
     const [ anio, mes,dia] = formData.fecha.split("-");
     const payDate = new Date(anio,mes-1,dia)
     console.log(payDate)
  
   
    /*   
    // const amount = formData.monto+gains
    
    */

  async getClient(id) {

    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query("SELECT *   from clients WHERE id='" + id + "'");
    console.log("asdasd12")
    console.log(r)
    return r

  }



  async getClientTotalLoans(id) {

    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  COUNT(id) AS total  from loans WHERE client_id ='${id}'`);

    // console.log(r)
    return r

  }

}


/* export async function getClient(id){
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query("SELECT *   from clients WHERE id='"+id+"'");

 // console.log(r)
   return r

}

export async function getPaymentsByState(id,state){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  id from loans WHERE client_id='${1}'`);

    const ids = r.map((e)=>e.id)

    var  payments = []
    for (const id of ids) {
        
        const r = await window.sqlite.query(`SELECT  * from payments WHERE loan_id='${id}' AND state='${state}'`);

        
       payments.push(r)
    }


   // console.log(payments.flat(1))

 // console.log(r)
   return payments.flat(1)

}

export async function getClientLoans(id){
  
    //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
    const r = await window.sqlite.query(`SELECT  *   from loans WHERE client_id ='${id}'`);

 // console.log(r)
   return r

}

export async function getClientTotalLoans(id){
  
  //await window.sqlite.query("INSERT INTO clients (nickname) VALUES ('chango12') ");
  const r = await window.sqlite.query(`SELECT  COUNT(id) AS total  from loans WHERE client_id ='${id}'`);

// console.log(r)
 return r

}

export async function getClientExpiredPayments(id){
  
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














 */

const clients = new Clients()


export default clients
