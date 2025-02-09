import { createRequire } from 'module';
const require = createRequire(import.meta.url); // Usamos createRequire para acceder a CommonJS

const sqlite3 = require('sqlite3'); // Ahora puedes usar require para importar sqlite3
sqlite3.verbose()
// Crear la base de datos (en este caso, 'my-database.db')


    const db = new sqlite3.Database('./prestamos.db');
    
    db.exec("PRAGMA foreign_keys = ON;", (err) => {
      if (err) {
        console.error("Error al habilitar claves foráneas:", err);
        return;
      }})

    console.log("database connected")

    

    db.exec("CREATE TABLE IF NOT EXISTS  wallets_information (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,    cbu TEXT,   alias TEXT,    user_id INTEGER,  client_id INTEGER,    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);")
    
    //db.exec("ALTER TABLE tags ADD COLUMN class TEXT DEFAULT 'bg-primary';")

    db.exec(`CREATE TABLE IF NOT EXISTS  information (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
      label TEXT ,
      name TEXT ,lastname TEXT,email TEXT, nickname TEXT NOT NULL,
       phonenumber TEXT,address TEXT,
       sex TEXT,
        create_at DATE DEFAULT CURRENT_TIMESTAMP,
         rate INTEGER DEFAULT 100,
          notes TEXT,
      user_id INTEGER,
      client_id INTEGER,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`)


      db.exec(`CREATE TABLE IF NOT EXISTS  tags (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
        label TEXT ,
        class TEXT,
        user_id INTEGER,
        client_id INTEGER,
        payment_id INTEGER,
        loan_id INTEGER,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE,
        FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`)
     

        db.exec("DROP TABLE IF EXISTS tags")

     //db.exec("CREATE TABLE IF NOT EXISTS  Loans (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, payment_interval INTEGER ,gains REAL,  label TEXT DEFAULT 'prestamo',payment_gen_date DATE,    amount REAL DEFAULT 0.00,    interes_percentage INTEGER DEFAULT  0,    installments INTEGER DEFAULT 1,lender_id INTEGER,aproved_date DATE DEFAULT CURRENT_DATE, create_at DATE DEFAULT CURRENT_TIMESTAMP,   state TEXT DEFAULT 'active',    client_id INTEGER NOT NULL,    payment_method TEXT DEFAULT 'cash',    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,    FOREIGN KEY (lender_id) REFERENCES users(id) ON DELETE CASCADE)")

     // ALTER TABLE usuarios ADD COLUMN edad INTEGER;


     //db.exec("DROP TABLE IF EXISTS loans;DROP TABLE IF EXISTS payments")
     db.exec("CREATE TABLE IF NOT EXISTS  loans(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, payment_interval INTEGER ,gains REAL,  label TEXT DEFAULT 'prestamo',    amount REAL DEFAULT 0.00,    interes_percentage INTEGER DEFAULT  0,    installments INTEGER DEFAULT 1,lender_id INTEGER,aproved_date DATE DEFAULT CURRENT_DATE, create_at DATE DEFAULT CURRENT_TIMESTAMP,   state TEXT DEFAULT 'active',    client_id INTEGER NOT NULL,    payment_method TEXT DEFAULT 'cash',    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,    FOREIGN KEY (lender_id) REFERENCES users(id) ON DELETE CASCADE)")

     db.exec("CREATE TABLE IF NOT EXISTS  payments(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,gains REAL,payed_date DATE,net_amount REAL,   amount REAL NOT NULL DEFAULT 0.00, incomplete_amount REAL,   label TEXT DEFAULT 'cuota',    notes TEXT DEFAULT '',    payment_date DATE ,    state TEXT DEFAULT 'pending', create_at DATE DEFAULT CURRENT_TIMESTAMP,   loan_id INTEGER NOT NULL,    payment_method TEXT DEFAULT 'cash',    FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE)")
     
     db.exec("CREATE TABLE IF NOT EXISTS  clients(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,name TEXT ,lastname TEXT,email TEXT, nickname TEXT NOT NULL, phonenumber TEXT,address TEXT, create_at DATE DEFAULT CURRENT_TIMESTAMP, rate INTEGER DEFAULT 100, notes TEXT);")
  
     // db.exec("DROP TABLE IF EXISTS users;DROP TABLE IF EXISTS clients;DROP TABLE IF EXISTS loans;DROP TABLE IF EXISTS payments;DROP TABLE IF EXISTS bank_account;")

    //create tables
    db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT ,email TEXT, create_at DATE DEFAULT CURRENT_TIMESTAMP);")
    
   // db.exec("CREATE TABLE IF NOT EXISTS  clients(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,name TEXT ,lastname TEXT, nickname TEXT NOT NULL, phonenumber TEXT,address TEXT, create_at DATE DEFAULT CURRENT_TIMESTAMP, rate INTEGER DEFAULT 100, notes TEXT);")
  
   // db.exec("DROP TABLE IF EXISTS loans;")   
    
    
   

   // 
// Función para envolver consultas `get` en una promesa


function queryGet(query, params = []) {
    return new Promise((resolve, reject) => {
      db.get(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  
  // Función para envolver consultas `all` en una promesa (devuelve todas las filas)
  function queryAll(query, params = []) {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  
  // Función para envolver `run` (que no devuelve resultados pero maneja inserciones, actualizaciones, etc.)
  function queryRun(query, params = []) {
    return new Promise((resolve, reject) => {
      db.run(query, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this); // Devuelve el objeto `this` para obtener el ID de la fila si es una inserción
        }
      });
    });
  }



  export default db
export  {
  queryGet,
  queryAll,
  queryRun,
}