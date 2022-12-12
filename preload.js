const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  title: 'Notes App',
  createNote: (data) => ipcRenderer.invoke('create-file', data),
});
