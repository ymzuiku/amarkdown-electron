const { shell } = require("electron");

// Import the framework and instantiate it
const cache = require("./cache");
const Fastify = require("fastify");
const fastify = Fastify({
  logger: false,
});

fastify.register(require("@fastify/cors"), {});

fastify.post("/electron/amarkdown-ping", function () {
  return { ok: 1 };
});

fastify.post("/electron/window-close", function handler() {
  if (cache.mainWindow) {
    cache.mainWindow.close();
  }
  return { ok: 1 };
});

fastify.post("/electron/window-minimize", async function handler() {
  if (cache.mainWindow) {
    cache.mainWindow.minimize();
  }
  return { ok: 1 };
});

fastify.post("/electron/window-maximize", async function handler() {
  if (cache.mainWindow) {
    if (cache.mainWindow.isMaximized()) {
      cache.mainWindow.unmaximize();
    } else {
      cache.mainWindow.maximize();
    }
  }
  return { ok: 1 };
});

fastify.post("/electron/google-login", async function handler() {
  shell.openExternal("https://amarkdown.com/login/electron-with-google");
  cache.auth = null;
  return { ok: 1 };
});

fastify.post("/electron/google-login-auth", async function handler(request) {
  const data = JSON.parse(request.body);
  if (data.auth) {
    cache.auth = data.auth;
  }
  return { ok: 1, auth: cache.auth };
});

fastify.post("/electron/google-login-callback", async function handler() {
  return { ok: 1, auth: cache.auth };
});

let nowPort = 43062;

async function start() {
  // Run the server!
  try {
    await fastify.listen({ port: nowPort });
  } catch (err) {
    if (nowPort < 43300) {
      nowPort += 1;
      start();
    }
  }
}

start();
