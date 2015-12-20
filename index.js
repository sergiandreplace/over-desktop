

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: localStorage.getItem("window.width") || 800,
    height: localStorage.getItem("window.height") ||  600,
    x: localStorage.getItem("window.x") || 0,
    y: localStorage.getItem("window.y") || 0,
    center:false
    });

  if (localStorage.getItem("window.maximized") !== undefined && localStorage.getItem("window.maximized")=='true') {
     mainWindow.maximize();
     console.log("maximize" + localStorage.getItem("window.maximized"));
  }

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('close', function() {
    localStorage.setItem("window.width", mainWindow.getBounds().width);
    localStorage.setItem("window.height", mainWindow.getBounds().height);
    localStorage.setItem("window.x", mainWindow.getBounds().x);
    localStorage.setItem("window.y", mainWindow.getBounds().y);
    localStorage.setItem("window.maximized", mainWindow.isMaximized());
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.


    mainWindow = null;


  });
});
