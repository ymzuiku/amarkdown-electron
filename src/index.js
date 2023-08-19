const cache = require("./cache");
require("./server");

const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");

// 创建一个新的存储实例
const store = new Store();
// const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  cache.mainWindow = new BrowserWindow({
    width: store.get("windowWidth", 1220),
    height: store.get("windowHeight", 820),
    frame: false, // 隐藏默认 Frame
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  cache.mainWindow.loadURL("https://amarkdown.com?electron=1");
  // cache.mainWindow.loadURL("http://127.0.0.1:3100?electron=1");
  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  cache.mainWindow.on("closed", () => {
    mainWindow = null;
  });
  cache.mainWindow.on("resize", () => {
    const [width, height] = cache.mainWindow.getSize();
    store.set("windowWidth", width);
    store.set("windowHeight", height);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
