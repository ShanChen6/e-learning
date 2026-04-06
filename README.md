# 🎓 eLearning Monorepo System

Hệ thống eLearning (monorepo) gồm backend API viết bằng NestJS và frontend viết bằng Next.js.

## Mục lục
- Giới thiệu
- Yêu cầu
- Cài đặt
- Chạy (phát triển)
- Scripts hữu dụng
- Cấu trúc dự án
- Đóng góp
- License

## Giới thiệu
Dự án này là một monorepo chứa nhiều package và ứng dụng (API, Web). Sử dụng `turbo` để chạy các lệnh đa gói dễ dàng.

## Yêu cầu
- Node.js >= 18
- npm (phiên bản được cấu hình trong `package.json`)
- Docker & Docker Compose (nếu dùng container cho DB)

## Cài đặt
Tại thư mục gốc, cài dependencies cho workspace:

```bash
npm install
```

Nếu muốn chạy database (nếu có cấu hình trong `docker-compose.yml`):

```bash
npm run db:up
# dừng: npm run db:down
```

## Chạy (phát triển)
- Chạy toàn bộ workspace (turbo sẽ chạy các lệnh `dev` của từng app):

```bash
npm run dev
```

- Hoặc chạy từng app riêng:

API:
```bash
cd apps/api
npm install
npm run dev
```

Web:
```bash
cd apps/web
npm install
npm run dev
```

## Scripts hữu dụng (ở gốc)
- **dev**: `npm run dev` — chạy chế độ phát triển cho cả monorepo (sử dụng `turbo`).
- **build**: `npm run build` — build tất cả packages/apps.
- **lint**: `npm run lint` — chạy lint cho workspace.
- **format**: `npm run format` — định dạng code bằng Prettier.
- **db:up / db:down**: khởi/dừng Docker Compose.

## Cấu trúc dự án
- `apps/api` — NestJS backend
- `apps/web` — Next.js frontend
- `packages/shared` — code/chung/shared giữa các app

## Đóng góp
1. Fork repository
2. Tạo branch tính năng: `git checkout -b feat/ten-tinh-nang`
3. Viết code, thêm test nếu cần
4. Tạo PR mô tả rõ thay đổi

## License
Xem trường `license` trong `package.json`.

---
Nếu bạn muốn, tôi có thể:
- Thêm hướng dẫn chạy Docker DB chi tiết (nếu cần biến môi trường).
- Viết ví dụ env file cho `apps/api`.

