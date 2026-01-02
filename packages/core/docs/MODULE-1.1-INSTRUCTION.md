📘 MODULE-1.1-INSTRUCTIONS.md

Module: IPC & Preload Standardization
Depends on: Module 0.1
Priority: HIGH

Check `PRELOAD-SECURITY-CHECKLIST.md` để biết rules khi làm việc với preload.

1. Mục tiêu Module 1.1

Chuẩn hóa cách giao tiếp giữa Renderer ↔ Main bằng IPC, với các yêu cầu:

Secure

Typed

Consistent

Dễ debug

Dễ mở rộng

IPC được xem là Public API của Desktop App.

2. Problem cần giải quyết

Hiện tại (trong các app cũ):

IPC string rải rác

Không có contract rõ ràng

Renderer gọi ipcRenderer trực tiếp

Preload expose tuỳ tiện

Khó refactor, dễ bug ngầm

3. Nguyên tắc thiết kế (BẮT BUỘC)
3.1 IPC là contract, không phải implementation

IPC channel = API name

Không thay đổi tuỳ tiện

Breaking IPC = bump major

3.2 Renderer KHÔNG biết Electron

Renderer:

window.api.auth.login()


Renderer:
❌ không import ipcRenderer
❌ không import electron

3.3 Preload là boundary duy nhất

Toàn bộ IPC phải đi qua preload

Preload expose 1 object duy nhất

4. Scope Module 1.1
In scope

IPC registry

Typed IPC

Preload expose API

IPC handler lifecycle

Out of scope

Business logic

Auth flow

Permission system phức tạp

5. API shape (freeze v1 – proposal)
Preload API
window.api = {
  app: {
    getVersion(): Promise<string>;
  },
  auth: {
    login(): Promise<void>;
    logout(): Promise<void>;
  }
};


Đây chỉ là ví dụ – structure phải domain-based

6. Kiến trúc đề xuất
Renderer
  ↓ (window.api)
Preload
  ↓ (ipcRenderer.invoke)
IPC Registry (Main)
  ↓
Module Handler

7. Các thành phần cần xây dựng
7.1 IPC Registry (Main)

Trách nhiệm

Central register IPC channels

Bind handler với module

Log & catch error

Instruction

Không đăng ký IPC trực tiếp trong module

Mọi IPC đi qua registry

7.2 IPC Handler Interface
export interface IpcHandler {
  register(): void;
}


Module có thể cung cấp nhiều handler

Handler không chứa business logic nặng

7.3 Preload Exposer

Trách nhiệm

Expose API an toàn

Không leak Electron API

Validate input (basic)

8. Thứ tự implement (BẮT BUỘC)

Define IPC naming convention

Build IPC registry (main)

Build preload API shape

Connect preload ↔ registry

Example IPC: app.getVersion

Write doc + example usage

9. Definition of Done (DoD)

Module 1.1 được coi là DONE khi:

 Renderer không import Electron

 Preload expose 1 API duy nhất

 IPC channel centralized

 Có example IPC end-to-end

 Có documentation

 Có app demo chạy thật

10. Những điều CẤM làm

❌ IPC string rải rác

❌ Renderer gọi ipcRenderer

❌ Preload expose raw Electron API

❌ Business logic trong IPC handler

11. Output mong đợi

Sau Module 1.1:

Framework có communication backbone

Module sau (Auth, Service Manager) có thể build clean

App dev viết IPC không sợ vỡ

12. Note cho AI / Contributor

Nếu generate code:

Luôn theo naming convention

Không tự ý thêm feature ngoài scope

Ưu tiên clarity hơn cleverness

13. Next Modules (Preview)

Module 1.2 – Config Management

Module 2.1 – Logging

Module 2.2 – Service Manager

📌 File này là instruction, không phải discussion
📌 Mọi thay đổi phải có lý do & review