import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
const preloadjs = path.resolve(__dirname, 'preload.js');

app.on('ready', function(){
  const window = new BrowserWindow({
    webPreferences: {
      preload: preloadjs,
      contextIsolation: true,
      nodeIntegration: true,
    }
  })
  window.loadFile(path.resolve(__dirname, '..', '..', 'src', 'index.html'));
  if(process.env.NODE_ENV === 'development'){
    let a = window.webContents
    console.log(a);
    window.webContents.openDevTools()
  }
})

app.on('will-finish-launching', function(){
  ipcMain.handle('app/get_basic_info', function handleAppGetBasicInfo(){
    return {
      version: app.getVersion(),
      name: app.name,
    }
  })
})