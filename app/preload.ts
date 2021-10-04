import { ipcRenderer, contextBridge } from 'electron';

async function getAppInfo() {
  return await ipcRenderer.invoke('app/get_basic_info') 
}

contextBridge.exposeInMainWorld('JSBridge', {
  getAppInfo
})

