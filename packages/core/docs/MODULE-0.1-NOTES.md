📘 MODULE 0.1 – App Bootstrap & Lifecycle

Package: @creative-force/electron-core
Status: ✅ DONE (Foundation)
Purpose: Xương sống cho toàn bộ Electron Framework

1️⃣ Mục tiêu Module 0.1 (đã đạt)

Module 0.1 chịu trách nhiệm DUY NHẤT cho:

Khởi tạo Electron app

Chuẩn hóa lifecycle

Điều phối module

Cung cấp DI container cho app & module

Sau Module 0.1, app không còn trực tiếp quản lý Electron lifecycle.

2️⃣ Những gì ĐÃ LÀM (In Scope)
2.1 Public API (Freeze v1)
createElectronApp(options: CreateElectronAppOptions): Promise<void>


appId bắt buộc

modules optional

Chỉ có 1 entry point duy nhất

2.2 Module Contract
export interface ElectronModule {
  register(container: AppContainer): void;
  start?(): Promise<void>;
  stop?(): Promise<void>;
}


register() chạy sync, trước app.whenReady

start() chạy sau whenReady

stop() chạy khi app quit

App không hook Electron event

2.3 Dependency Injection

Framework tạo 1 DI container / app

Container được truyền vào module qua register()

App không import DI library

Framework expose AppContainer type alias

2.4 Electron Lifecycle Handling

Centralized trong electron-core

Handle:

app.whenReady

before-quit

stop() gọi theo thứ tự ngược

Graceful shutdown (no zombie process)

2.5 Error Handling (tối thiểu)

Catch error trong:

register()

start()

stop()

Log rõ module lỗi

Fail fast khi critical

2.6 Logging (tạm thời)

Dùng console

Prefix [electron-core]

Chỉ để debug bootstrap

2.7 Developer Experience

App entry < 20 dòng

Không cần hiểu Electron lifecycle

Module dễ viết, dễ test

AI có thể generate module skeleton đúng chuẩn

3️⃣ Những gì CỐ Ý CHƯA LÀM (Out of Scope)

❌ IPC / Preload
❌ Window management
❌ Config loader
❌ Logger module
❌ Auth
❌ External service manager
❌ Telemetry / analytics

Module 0.1 = xương sống, không phải feature module

4️⃣ Quy ước & Nguyên tắc ĐÃ CHỐT
4.1 Architectural Rules

App không gọi Electron lifecycle API

Module không hook Electron event

Module không gọi module khác trực tiếp

Không global mutable state

4.2 DI Rules

App không import inversify

Chỉ dùng AppContainer

Framework có quyền đổi DI implementation

5️⃣ Known Limitations (Chấp nhận ở v1)

Logging đơn giản

Chưa có test automation

Chưa support restart module

Chưa có async register

➡ Sẽ xử lý ở module / phase sau

6️⃣ Module Dependency Graph (tạm)
electron-core (0.1)
   ↑
   ├─ electron-ipc (1.1)
   ├─ electron-config (1.2)
   ├─ electron-logger (2.1)
   ├─ electron-service-manager (2.2)
   └─ electron-auth (3.1)

7️⃣ Các Module TIẾP THEO (Roadmap)
🔜 Module 1.1 – IPC & Preload Standardization

Priority: HIGH

Typed IPC

Central IPC registry

Single preload API (window.api)

Renderer không import ipcRenderer

🔜 Module 1.2 – Config Management

Priority: HIGH

Config schema

Validate on startup

Immutable config

🔜 Module 2.1 – Logging

Priority: MEDIUM

Central logger

Structured log

Context-based logging

🔜 Module 2.2 – Service / Process Manager

Priority: MEDIUM

Dotnet / exe service lifecycle

Health check

Graceful shutdown

🔜 Module 3.1 – Authentication

Priority: HIGH (Beta App)

OAuth PKCE

External browser

Token management

8️⃣ Instruction cho bước tiếp theo
BẮT ĐẦU MODULE 1.1 KHI:

Module 0.1 đã được:

chạy trong integration app

review & approve

App side đã quen với ElectronModule contract

KHÔNG bắt đầu module mới khi:

Module trước chưa dùng thực tế

API chưa ổn định

DX chưa được validate

9️⃣ Guiding Principle (NHẮC LẠI)

Framework thành công khi app dev không phải suy nghĩ về framework

📌 File này là reference – không sửa tùy tiện
📌 Mọi breaking change phải bump MAJOR