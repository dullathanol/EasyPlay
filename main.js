const { app, Menu, BrowserWindow } = require('electron')

const createWindow = () => {

    Menu.setApplicationMenu(null)

    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('dist/index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})