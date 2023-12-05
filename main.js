const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow; // Declare mainWindow globally

function createWindow() {
  mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('save-data', (event, data) => {
    const filePath = path.join(__dirname, 'data.json');
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
        if (err) {
            console.error('Failed to save data:', err);
            return;
        }
        console.log('Data saved to data.json');
    });
});

ipcMain.on('navigate', (event, page) => {
  // Load the requested page
  mainWindow.loadFile(page);
});
