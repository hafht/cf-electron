# SESSION-CONTEXT-SUMMARY.md

## 1. Vấn đề hiện tại

Team Creative Force đang quản lý **nhiều desktop application (Electron)** độc lập:
- Kelvin
- Hue
- Luma
- Ink

Các app này:
- Dùng **cùng tech stack** (Electron + Angular + Node/.NET integration)
- Có **rất nhiều logic trùng lặp**:
  - IPC
  - preload
  - auth flow
  - config
  - service manager
  - window lifecycle
- Mỗi app là **repo riêng biệt**, dẫn tới:
  - Duplicate code
  - Naming không consistent
  - Fix bug / update lib phải làm lại nhiều lần
  - Khó maintain, khó onboard dev mới
  - Khó đảm bảo security baseline đồng nhất

➡️ Với nguồn lực hiện tại, cách làm này **không scale được**.

---

## 2. Lý do cần Internal Electron Framework

Mục tiêu của việc xây dựng **internal Electron framework**:

### 2.1 Chuẩn hóa (Standardization)
- Chuẩn hóa:
  - App lifecycle
  - IPC & preload
  - Config management
  - Window creation
  - Naming conventions
- Mọi app đều follow cùng pattern → dễ đọc, dễ debug.

### 2.2 Tái sử dụng (Reuse)
- Các app dùng chung:
  - Framework core
  - Infrastructure modules
- Business logic nằm ở app hoặc module riêng.

### 2.3 Giảm chi phí phát triển
- Implement feature 1 lần → dùng cho nhiều app
- Fix bug / update dependency tập trung
- Dễ test & rollout

### 2.4 Chuẩn bị cho tương lai
- Gộp Hue / Luma / Ink thành app beta
- Dễ mở rộng:
  - Auth
  - Logger
  - Service manager
  - Background tasks
- Phù hợp AI-assisted development

---

## 3. Triết lý thiết kế Framework

### 3.1 Framework ≠ App
- Framework **không chứa business logic**
- Framework chỉ cung cấp:
  - Infrastructure
  - Guardrails
  - Contracts

### 3.2 Module-based
- Framework được chia thành **các module độc lập**
- App compose module theo nhu cầu
- Không over-engineer

### 3.3 Fail fast & secure by default
- Config invalid → app không start
- Preload & IPC theo security checklist
- Không expose Electron API cho renderer

---

## 4. Tổng quan Structure Framework đã implement

### 4.1 Phase & Module strategy

Framework được xây theo **phase** (không phải semver):

| Phase | Ý nghĩa |
|-----|--------|
| 0.x | Foundation |
| 1.x | Communication & Control |
| 2.x | Infrastructure |
| 3.x | Feature foundation |

---

### 4.2 Module đã implement

#### Module 0.1 – App Bootstrap
**Mục tiêu**
- Chuẩn hóa lifecycle Electron app
- DI container
- Module lifecycle (register / start / stop)

**Thành phần chính**
- `createElectronApp`
- `ElectronModule`
- `AppContainer`

---

#### Module 1.1 – IPC (Request / Response)
**Mục tiêu**
- Chuẩn hóa communication giữa main ↔ renderer
- IPC centralized
- Không string literal

**Thành phần**
- IPC channel contracts
- IPC handler registry
- Preload API wrapper

---

#### Module 1.2 – Configuration Management
**Mục tiêu**
- Typed, validated config
- Fail fast
- App-owned schema

**Thành phần**
- `AppConfigModule`
- `AppConfigService`
- Zod-based validation
- Config injected qua DI

---

#### Module 1.3 – Window
**Mục tiêu**
- Tạo BrowserWindow chuẩn
- Gắn preload
- Load renderer dev/prod
- Security baseline

**Thành phần**
- `WindowMainModule`
- `WindowOptions`
- Preload entry & API

---

### 4.3 Naming Conventions
- Đã freeze naming rules trong `NAMING-CONVENTIONS.md`
- Áp dụng cho:
  - Folder
  - File
  - Class / interface
  - IPC channel
  - Preload API
  - Documentation

---

## 5. Kết quả hiện tại

Sau Phase 1 (0.1 → 1.3):
- Framework **đủ để chạy app thật**
- Có thể build:
  - App demo
  - App beta (Auth-only)
- Kiến trúc rõ ràng, không over-engineer
- Sẵn sàng mở rộng Phase 2

---

## 6. Hướng tiếp theo (Planned)

### Phase 2 – Infrastructure
- Logger module
- Service Manager (netcore services)
- Background task runner

### Phase 3 – Feature Foundation
- Auth (OAuth PKCE)
- Common business modules

### Documentation
- Build documentation website:
  - Framework docs
  - App beta docs
- Onboarding & reference cho dev

---

## Guiding Principle

> **Standardization reduces cost.  
> Framework provides guardrails.  
> Business logic stays in the app.**
