import { app, BrowserWindow,ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

import {passwordHash,compareHash,generateToken} from "./api/api.js";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

import database from "./database/db"
import { createRequire } from 'module';
const require = createRequire(import.meta.url); // Usamos createRequire para acceder a CommonJS
import jwt from "jsonwebtoken"
const sqlite3 = require('sqlite3'); // Ahora puedes usar require para importar sqlite3
sqlite3.verbose()

var db;



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  db = new sqlite3.Database('./prestamos.db', (err) => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err.message);
    } else {
      console.log('Conectado a la base de datos SQLite.');
    }
  });



  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.handle('db-query', async (_, query, params = []) => {
  return new Promise((resolve, reject) => {

    if(query.startsWith("SELECT")){
      db.all(query, params, (err, rows) => {
        if (err) {
          console.error('Error en la consulta SQL:', err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }else{
      console.log("asdasd")
      db.run(query, params, (err, result) => {
        if (err) {
          console.error('Error en la consulta SQL:', err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
   
  });
});
 ipcMain.handle("api-handler",(event,data)=>{
  
  var d ;
  if(data.action=="compare"){
    d= async (data)=> await compareHash(data.password,data.hash)
  }
  else if(data.action=="token-gen"){

    d= async (data)=> "queonda"
  }
  else{
     d= async (data)=> await passwordHash(data.password)
  }
  
return d(data)
});

ipcMain.handle('decode-token', async (_, token) => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('El token debe ser una cadena válida.');
    }

    const decoded = jwt.verify(token, secretKey); // Decodifica el token
    return decoded; // Devuelve los datos decodificados
  } catch (error) {
    console.error('Error al decodificar el token:', error.message);
    throw error;
  }
});



import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);

// Obtén el directorio actual
const __dirname = dirname(__filename);


ipcMain.handle('get-constants', async (_, key) => {
  
  const constants =
    {
      dirname:__dirname,
      __filename
    }
  
  return constants[key]
});





ipcMain.handle('generate-token', async (_, payload) => {
  try {
    const token = jwt.sign(payload, "aasdasdasd", { expiresIn: '1h' }); // Genera un token válido por 1 hora
    return token;
  } catch (error) {
    console.error('Error al generar el token:', error);
    throw error;
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
