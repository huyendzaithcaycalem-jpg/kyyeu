# 🎓 Trang Web Mời Đi Chụp Kỷ Yếu 14/2 ✨

Chào cậu! Đây là mã nguồn hoàn chỉnh của trang web mời bạn bè đi chụp ảnh kỷ yếu ngày 14/2 với đầy đủ các kịch bản tương tác theo đúng ý cậu.

---

## 🌟 Các Kịch Bản & Giao Diện Của Web

1. **Giao diện Mở đầu (Trang chủ)**:
   - Lời chào dễ thương, lời dẫn thanh xuân xúc động kèm tên chủ nhân.
   - Album ảnh kỷ yếu/cá nhân dạng **Polaroid cổ điển** (có hiệu ứng nghiêng, ghim kẹp, bấm vào để phóng to).
   - Bộ đếm ngược thời gian (Countdown) tới ngày 14/2.
   - Nhạc nền Lofi nhẹ nhàng du dương (có nút bật/tắt ở góc dưới).
   - Câu hỏi tương tác: **"Cậu có rảnh vào 14/2 không?"** với 2 nút:
     - 👉 **Có, mình rảnh nè! 🥰**
     - 👉 **Tiếc quá, hôm đó tớ bận rùi 🥺**

2. **Kịch bản 1: Khi chọn "Có, mình rảnh"**:
   - Pháo hoa giấy (Confetti) bắn tung tóe chúc mừng 🎉.
   - Lời cảm ơn chân thành, ngọt ngào.
   - Bảng thông tin chi tiết: Thời gian, Địa điểm, Gợi ý trang phục (Dress code), Lời nhắn mời trà sữa 🧋.
   - Nút **"Lưu vào Google Calendar"** tự động tạo lịch hẹn.
   - Nút **"Nhắn tin Zalo"** để bạn bè xác nhận ngay.

3. **Kịch bản 2: Khi chọn "Không rảnh"**:
   - Giao diện chia buồn / hụt hẫng dí dỏm 😭.
   - Đưa ra lời đề nghị hài hước:
     > *"Bạn có thể cho mình xin một bức ảnh từ đầu đến chân để mình ghép vô được khum?" 🥺📸*
   - Kèm 2 lựa chọn tiếp theo:
     - 👉 **Được nha, gửi liền nè! 📸** (Chuyển sang bước 4)
     - 👉 **Hong được đâu, ngại lém 🙈** (Chuyển sang bước 5)

4. **Kịch bản 3: Khi đồng ý gửi ảnh toàn thân**:
   - Hiệu ứng tim bay lấp lánh 💖.
   - Lời cảm ơn siêu cảm động kèm lời hứa photoshop đỉnh chóp.
   - Khung kéo thả hoặc chọn file ảnh trực tiếp (xem trước preview ảnh ngay trên màn hình).
   - Nút bấm gửi trực tiếp ảnh qua Zalo / Facebook Messenger cho cậu.

5. **Kịch bản 4: Khi từ chối gửi ảnh ghép**:
   - Giao diện dỗi nhẹ 3 giây siêu dễ thương 😾.
   - Lời dặn dò, cảm ơn và lời chúc 14/2 ấm áp, hẹn kèo cà phê bù sau.
   - Nút "Đổi ý rồi (Cho tớ chọn lại nè 😜)" để quay lại từ đầu nếu muốn.

---

## 🚀 Hướng Dẫn Sử Dụng & Tùy Chỉnh

Tất cả thông tin được tách riêng trong file `config.js` để cậu có thể chỉnh sửa cực kỳ dễ dàng mà không cần biết lập trình:

### 1. Cách thay đổi thông tin (Tên, Địa điểm, Link Zalo...)
Mở file `config.js` bằng Notepad hoặc bất kỳ trình soạn thảo nào:
```javascript
const CONFIG = {
  ownerName: "Tên của cậu nè",           // Thay tên của cậu vào đây
  eventDate: "14/02/2026",
  eventTargetDate: "2026-02-14T08:00:00", // Thời gian đếm ngược

  eventDetails: {
    time: "08:00 - 16:30, Ngày 14/02",
    location: "Sân trường ĐH ...",
    address: "Địa chỉ cụ thể ...",
    dressCode: "Tone màu Trắng / Pastel ...",
    specialNote: "Có chuẩn bị trà sữa và hoa tươi đợi cậu nè! 🧋💐",
    googleMapsUrl: "https://maps.google.com",
  },

  socialLinks: {
    facebook: "https://facebook.com/duong-link-fb-cua-cau",
    zalo: "https://zalo.me/sdt-cua-cau", // VD: https://zalo.me/0912345678
  },
  // ...
};
```

### 2. Cách thay ảnh của chính cậu vào trang web
1. Copy các bức ảnh kỷ yếu hoặc ảnh chụp của cậu vào thư mục `assets/` (ví dụ đặt tên: `anh1.jpg`, `anh2.jpg`, `anh3.jpg`).
2. Mở `config.js`, tìm phần `photos` và sửa lại đường dẫn:
```javascript
photos: [
  {
    url: "assets/anh1.jpg",
    caption: "Thanh xuân rực rỡ 🎓"
  },
  {
    url: "assets/anh2.jpg",
    caption: "Nụ cười tuổi trẻ ✨"
  },
  // ...
]
```

### 3. Cách xem trang web trên máy
- Chỉ cần **nhấp đúp chuột vào file `index.html`**, trang web sẽ tự động mở trong trình duyệt (Chrome, Cốc Cốc, Edge, Safari...) cực kỳ mượt mà!

---

## 🌐 Hướng Dẫn Đưa Web Lên Mạng Để Gửi Link Cho Mọi Người

Để gửi link qua Zalo, Messenger, Instagram cho bạn bè mở trên điện thoại, cậu có thể dùng 1 trong các cách **hoàn toàn MIỄN PHÍ** sau:

### Cách 1: Dùng Vercel hoặc Netlify Drop (Đơn giản nhất - 30 giây)
1. Truy cập trang: [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Kéo thả toàn bộ thư mục `ky-yeu-14-2` vào khung tròn trên màn hình.
3. Chờ 5 giây là có ngay một đường link web dạng `https://ten-cau-ky-yeu.netlify.app` để gửi ngay cho bạn bè!

### Cách 2: Dùng GitHub Pages
1. Tạo một repository mới trên GitHub (ví dụ: `ky-yeu-14-2`).
2. Tải toàn bộ file trong thư mục này lên.
3. Vào **Settings** -> **Pages** -> chọn nhánh `main` và ấn **Save**. Cậu sẽ nhận được link `https://username.github.io/ky-yeu-14-2`.

Chúc cậu có một ngày chụp ảnh kỷ yếu 14/2 thật vui vẻ, đáng nhớ và ngập tràn những bức ảnh thanh xuân tuyệt đẹp nha! 🎉📸

