const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 768,
    height: 560,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.handle('create-file', (req, data) => {
    if (!data || !data.title || !data.content) return false;

    const filePath = path.join(__dirname, 'notes', `${data.title}.txt`);
    fs.writeFileSync(filePath, data.content);
    //with the packager add-on, you can set you own path for the notes to be stored on your local drive.

    return { success: true, filepath: filePath }; //can i eliminate second filepath? as its value is the same...It will work, but throw an error.
  });

  win.loadFile('src/index.html');
}

//we check if app is ready, we ask to run a window;
app.whenReady().then(createWindow);

//listener. We need this to close the window, for Mac especially.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
