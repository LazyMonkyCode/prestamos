
export const getLastLoans = async (params) => {
    
    const r = await window.sqlite.query(`SELECT 

        loans.id as loanId ,loans.client_id,loans.aproved_date,loans.amount,
        clients.id as clientid,clients.nickname
        
         FROM loans
        
        INNER JOIN clients ON clients.id = loans.client_id 
        ORDER BY loans.id desc LIMIT 8`)


    return r
}