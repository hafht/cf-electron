📘 MODULE-1.2-INSTRUCTIONS.md

Module: Configuration Management
Depends on:

Module 0.1 (App Bootstrap)

Module 1.1 (IPC – request/response)

1️⃣ Mục tiêu Module 1.2

Chuẩn hóa cách define – load – validate – consume config cho desktop app.

Config phải:

Có schema

Validate khi app start

Read-only

Consistent giữa các app

2️⃣ Problem hiện tại (từ app cũ)

Config nằm rải rác:

env

json

global variable

Không có schema

Sai config → lỗi runtime muộn

Mỗi app xử lý config khác nhau

3️⃣ Nguyên tắc thiết kế (BẮT BUỘC)
3.1 Config là input của app, không phải state

Config:

read-only

không mutate

Không store token / runtime data

3.2 Fail fast

Config sai → app không start

Không:

fallback ngầm

default magic

3.3 Config phải typed

Không any

Không string-based access

4️⃣ Scope Module 1.2
In scope

Config schema

Load config (env + file)

Validate on startup

Expose config qua DI

Out of scope

Secret management phức tạp

Dynamic config reload

Feature flag system

5️⃣ Kiến trúc đề xuất (high-level)
Config Schema
   ↓
Config Loader
   ↓
Validation
   ↓
AppContainer (DI)
   ↓
Modules consume config

6️⃣ API Shape (proposal – freeze v1)
6.1 Config schema (app-defined)
export interface AppConfig {
  env: 'dev' | 'prod';
  apiBaseUrl: string;
  enableDebug: boolean;
}


👉 Schema thuộc app, không thuộc framework

6.2 Framework expose Config Service
export interface ConfigService<T> {
  get(): Readonly<T>;
}

7️⃣ App usage (target DX)
createElectronApp({
  appId: 'lhapp-beta',
  config: {
    env: 'dev',
    apiBaseUrl: 'https://api.example.com',
    enableDebug: true
  },
  modules: [...]
});


Trong module:

const config = container.get(ConfigService).get();

8️⃣ Thứ tự implement Module 1.2

Define ConfigService interface

Build config loader

Validate config at app start

Bind config vào DI container

Write minimal doc + example

9️⃣ Những điều CẤM làm

❌ Global process.env access trong module
❌ Mutate config
❌ Config nằm rải rác
❌ Silent default

10️⃣ Definition of Done – Module 1.2

 App không start nếu config sai

 Config typed end-to-end

 Module access config qua DI

 Không module nào đọc process.env trực tiếp

 Có doc & example