# Portfolio Marketing — Lê Ngọc Bảo Nhi

Trang portfolio tĩnh, không cần build, không phụ thuộc thư viện ngoài
ngoài Google Fonts và Font Awesome tải qua CDN.

## Cấu trúc

- `index.html` — toàn bộ nội dung trang
- `style.css` — bảng màu, bố cục, responsive, hai chế độ sáng/tối
- `app.js` — điều hướng, tab dashboard, bộ lọc dự án, lightbox
- `assets/images/` — ảnh chiến dịch, POSM, sự kiện (đã nén cho web)
- `.nojekyll` — tắt Jekyll của GitHub Pages

## Chạy thử tại máy

```bash
python3 -m http.server 8000
```

Rồi mở http://localhost:8000

## Xuất bản

Đẩy toàn bộ thư mục lên nhánh `main` của một repo GitHub, vào
**Settings → Pages**, chọn Source = *Deploy from a branch*, branch `main`, thư mục `/ (root)`.
