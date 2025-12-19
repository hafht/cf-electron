# CF-Electron Framework Documentation

Đây là thư mục chứa tất cả documentation, engineering notes, và instructions cho CF-Electron framework.

## 📚 Tài liệu chính

### [OVERVIEW.md](./OVERVIEW.md)
**Tài liệu tổng quan về framework**

- Mục tiêu và nguyên tắc kiến trúc
- Cấu trúc thư mục project
- Cách framework hoạt động (high-level)
- Trạng thái hiện tại và roadmap
- Development guidelines

**Đọc file này trước** khi bắt đầu làm việc với framework hoặc khi cần hiểu tổng quan về kiến trúc.

### [MODULE-0.1-NOTES.md](./MODULE-0.1-NOTES.md)
**Documentation cho Module 0.1 - App Bootstrap & Lifecycle**

Module này là xương sống của framework, chịu trách nhiệm:
- Khởi tạo Electron app
- Chuẩn hóa lifecycle (register → start → stop)
- Điều phối modules
- Cung cấp DI container

**Nội dung bao gồm:**
- Mục tiêu và scope của module
- Public API và Module Contract
- Dependency Injection setup
- Electron lifecycle handling
- Error handling và logging
- Known limitations
- Roadmap cho các module tiếp theo

**Đọc file này** khi:
- Cần hiểu cách app bootstrap hoạt động
- Viết module mới cần implement lifecycle
- Debug issues liên quan đến startup/shutdown
- Planning module tiếp theo

## 📋 Cấu trúc Documentation

```
docs/
├── README.md              # File này - Index của tất cả docs
├── OVERVIEW.md            # Tổng quan framework
└── MODULE-*.md            # Documentation cho từng module
    ├── MODULE-0.1-NOTES.md
    ├── MODULE-1.1-*.md    # (Sẽ có trong tương lai)
    └── ...
```

## 🔍 Cách sử dụng Documentation

### Khi bắt đầu project mới
1. Đọc `OVERVIEW.md` để hiểu kiến trúc tổng thể
2. Đọc `MODULE-0.1-NOTES.md` để hiểu lifecycle và cách viết module

### Khi implement feature mới
1. Kiểm tra `OVERVIEW.md` để đảm bảo không vi phạm nguyên tắc
2. Đọc documentation của module liên quan
3. Xem roadmap trong `MODULE-0.1-NOTES.md` để biết module nào đang được plan

### Khi debug hoặc fix bug
1. Đọc documentation của module có vấn đề
2. Kiểm tra known limitations
3. Xem implementation notes trong module docs

## 📝 Quy ước viết Documentation

- **Module docs** (`MODULE-*.md`): Ghi lại implementation notes, design decisions, và instructions cho từng module
- **Status**: Đánh dấu rõ ràng module đã hoàn thành (✅) hay đang plan (🔜)
- **Breaking changes**: Phải bump MAJOR version và update docs
- **File reference**: Không sửa tùy tiện, mọi thay đổi phải có lý do rõ ràng

## 🚀 Module Roadmap

Xem chi tiết trong `MODULE-0.1-NOTES.md` section 7️⃣:

- **Module 1.1** - IPC & Preload Standardization (HIGH priority)
- **Module 1.2** - Config Management (HIGH priority)
- **Module 2.1** - Logging (MEDIUM priority)
- **Module 2.2** - Service/Process Manager (MEDIUM priority)
- **Module 3.1** - Authentication (HIGH priority for Beta App)

## 💡 Lưu ý

- Tất cả documentation được viết song song với code
- Documentation là source of truth cho architecture decisions
- Khi có thay đổi kiến trúc, phải update docs trước hoặc cùng lúc với code
- AI/Cursor sẽ đọc docs này để hiểu context và đưa ra suggestions phù hợp

