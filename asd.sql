
CREATE TABLE IF NOT EXISTS bank_account(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    cbu TEXT,
    alis TEXT,
    user_id INTEGER ,
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE if not EXISTS clients(

    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT ,
    lastname TEXT,
    nickname TEXT NOT NULL,
    phonenumber TEXT,
    address TEXT,
    rate INTEGER DEFAULT 100,
    notes TEXT,
)



CREATE TABLE if not EXISTS loans(

    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    label TEXT DEFAULT 'prestamo',
    amount REAL DEFAULT 0.00,
    interes_per REAL ,
    installments INTEGER DEFAULT 1,
    lender_id INTEGER,
    aproved_date DATE DEFAULT CURRENT_DATE,
    state TEXT DEFAULT 'active',
    client_id INTEGER NOT NULL,
    payment_method TEXT DEFAULT 'cash',
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (lender_id) REFERENCES users(id)
    DEFAULT CURR
)



CREATE TABLE if not EXISTS payments(

    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL DEFAULT 0.00,
    label TEXT DEFAULT 'cuota',
    notes TEXT ,
    payment_date DATE ,
    state TEXT DEFAULT 'active',
    loan_id INTEGER NOT NULL,
    payment_method TEXT DEFAULT 'cash',
    FOREIGN KEY (loan_id) REFERENCES loans(id)
 
)