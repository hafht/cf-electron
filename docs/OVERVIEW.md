1. Mục tiêu của CF-ELECTRON

CF-ELECTRON là internal Electron framework dùng làm basement cho các desktop app của team.

Framework này:

Chuẩn hóa Electron main process

Chuẩn hóa cách module hoạt động

Giảm duplicate code giữa nhiều app

Tăng tốc phát triển & debug

Là nền tảng cho các module business phía sau

CF-ELECTRON KHÔNG phải app, KHÔNG có UI, KHÔNG xử lý business trực tiếp.

2. Nguyên tắc kiến trúc (đã chốt)

Framework ≠ App

App chỉ:

compose module

define business

Framework:

quản lý lifecycle

cung cấp hạ tầng

Boundary rõ ràng:

App không gọi Electron lifecycle

App không biết framework dùng DI gì

Renderer không import Electron API

3. Cấu trúc thư mục hiện tại
cf-electron/
├─ src/                    # Source code (TypeScript)
│  ├─ app/                 # App bootstrap & lifecycle
│  │  ├─ createElectronApp.ts
│  │  ├─ lifecycle.ts
│  │  └─ types.ts
│  │
│  ├─ di/                  # Dependency Injection
│  │  └─ container.ts
│  │
│  └─ index.ts             # Public entry
│
├─ dist/                   # Build output (CJS + d.ts)
│
├─ docs/                   # Documentation
│  ├─ MODULE-0.1-NOTES.md
│  └─ MODULE-1.1-INSTRUCTIONS.md
│
├─ scripts/                # Dev scripts (symlink, tooling)
├─ package.json
├─ tsconfig.json
└─ vite.config.ts

4. Cách framework hoạt động (high-level)
App start
  ↓
createElectronApp()
  ↓
Create DI container
  ↓
Module.register()
  ↓
Electron app.whenReady()
  ↓
Module.start()
  ↓
App running
  ↓
App quit
  ↓
Module.stop()


Framework điều phối tất cả, app chỉ khai báo module.

5. Trạng thái hiện tại
✅ Hoàn thành

Module 0.1 – App Bootstrap & Lifecycle

⏭️ Tiếp theo

Module 1.1 – IPC & Preload Standardization

6. Cách dev tiếp theo nên làm

Không sửa Module 0.1 trừ khi cần thiết

Bắt đầu Module 1.1 theo instruction

Viết docs song song với code

Module mới phải:

dùng được ngay

có example

không phá DX

7. Guiding Principle

Framework thành công khi app dev không cần hiểu framework internals