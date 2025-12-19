🔐 PRELOAD SECURITY CHECKLIST

Scope: Electron Preload (Framework)
Applies to: All desktop apps using CF-ELECTRON
Priority: CRITICAL

0️⃣ Mục tiêu của Preload

Preload là security boundary giữa:

Untrusted Renderer (web-like)

Trusted Main Process (Node / OS access)

❗ Nếu preload sai → app mất toàn bộ security guarantee.

1️⃣ Nguyên tắc cốt lõi (MUST UNDERSTAND)

Renderer = untrusted

Preload = gatekeeper

Main = privileged

👉 Renderer KHÔNG được:

Access Node.js API

Access Electron API

Access OS / filesystem

2️⃣ Electron BrowserWindow Security Flags (BẮT BUỘC)
☐ 2.1 contextIsolation: true
new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
});


❌ KHÔNG BAO GIỜ:

contextIsolation: false

☐ 2.2 nodeIntegration: false
nodeIntegration: false


❌ Renderer không được dùng Node

☐ 2.3 enableRemoteModule: false
enableRemoteModule: false


❌ remote là legacy + insecure

3️⃣ Preload API Exposure Rules (CỰC KỲ QUAN TRỌNG)
☐ 3.1 Chỉ expose 1 object duy nhất
contextBridge.exposeInMainWorld('api', api);


❌ KHÔNG:

exposeInMainWorld('fs', fs)
exposeInMainWorld('electron', electron)

☐ 3.2 Không expose function raw

❌ SAI:

window.api = ipcRenderer.invoke;


✅ ĐÚNG:

window.api = {
  app: {
    getVersion: () => ipc.invoke('app:getVersion')
  }
};

☐ 3.3 API phải domain-based
window.api = {
  app: {},
  auth: {},
  services: {}
};


❌ Không flat API:

window.api.login()

4️⃣ IPC Channel Security
☐ 4.1 Không expose channel name trực tiếp

❌ Renderer:

ipcRenderer.invoke('auth:login');


✅ Renderer:

window.api.auth.login();

☐ 4.2 IPC channel naming convention
domain:action


Ví dụ:

app:getVersion

auth:login

service:start

☐ 4.3 Không cho renderer subscribe IPC tuỳ ý

❌ KHÔNG expose:

ipcRenderer.on(...)


Nếu cần event:

Preload wrap lại

Control event name

5️⃣ Input Validation (Basic nhưng BẮT BUỘC)
☐ 5.1 Validate input ở preload (basic)
login(username: string) {
  if (typeof username !== 'string') {
    throw new Error('Invalid input');
  }
}


❌ Không tin renderer

☐ 5.2 Không pass object raw xuống main

❌ SAI:

invoke('task:create', payload);


✅ TỐT:

invoke('task:create', {
  id: payload.id,
  type: payload.type
});

6️⃣ Error Handling & Leakage
☐ 6.1 Không leak error stack OS / Node

❌ KHÔNG:

throw err;


✅ NÊN:

throw new Error('Operation failed');


(Main process log chi tiết)

☐ 6.2 Promise rejection phải được handle
return ipc.invoke(...).catch(() => {
  throw new Error('IPC error');
});

7️⃣ No Shared Mutable State
☐ 7.1 Không store state trong preload

❌ KHÔNG:

let token;


Preload:

Stateless

Proxy-only

8️⃣ Explicit Allowlist (KHUYẾN NGHỊ)
☐ 8.1 Chỉ expose API đã định nghĩa
const api = {
  app: {...},
  auth: {...}
};


❌ Không dynamic expose:

api[moduleName] = handler;

9️⃣ Dev vs Prod Behavior
☐ 9.1 Không relax security vì DEV

❌ KHÔNG:

if (dev) enableNodeIntegration();


Security flags phải giống nhau ở DEV & PROD

10️⃣ Testing & Review Checklist
☐ 10.1 Renderer không access được Node
typeof require === 'undefined'

☐ 10.2 Renderer không access được Electron
typeof window.process === 'undefined'

☐ 10.3 Only expected API exists
Object.keys(window.api)

11️⃣ Anti-patterns (CẤM TUYỆT ĐỐI)

❌ nodeIntegration: true
❌ contextIsolation: false
❌ expose ipcRenderer
❌ expose fs, path, process
❌ dynamic IPC channel
❌ preload chứa business logic

12️⃣ Quick Audit Script (Manual)

Trong DevTools (Renderer):

window.require
window.process
window.electron


👉 Tất cả phải là undefined

13️⃣ Guiding Principle (NHỚ KỸ)

Preload không phải tiện lợi cho dev,
mà là tuyến phòng thủ cuối cùng cho app

14️⃣ Status & Ownership

Preload security rules freeze từ Module 1.1

Mọi thay đổi:

cần review

cần doc

cần reason rõ ràng

📌 Checklist này dùng cho PR review – không tranh luận trong code
📌 Nếu nghi ngờ → chọn phương án an toàn hơn