const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
require('./packages/webrtc/build/server.js');

// 避免第一次打开时出现updating窗口
if (require('electron-squirrel-startup')) {
    app.quit();
}

Menu.setApplicationMenu(null);

const createMainWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preloads/index.js'),
        },
        icon: path.resolve(__dirname, './assets/icons/128x128.png'),
    });

    win.loadURL('https://webrtc.touchczy.top/');
};

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
