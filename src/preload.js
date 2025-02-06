// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge,ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("sqlite",{

    query: (query, params) => ipcRenderer.invoke('db-query', query, params),
})


contextBridge.exposeInMainWorld('api', {
    
    hash:(password)=>ipcRenderer.invoke("api-handler",{
       password,
       action:"hash"
    }),
    compare:(password,
        hash
    )=>ipcRenderer.invoke("api-handler",{
        password,
        hash,
        action:"compare"
     }),
     generateToken:(payload)=>ipcRenderer.invoke("generate-token",{
        payload,
     }),
     decodeToken:(token)=>ipcRenderer.invoke("decode-token",{
        token,
     }),
     getConstants:(key)=>ipcRenderer.invoke("get-constants",{
      key,
   }),
    
  }) 