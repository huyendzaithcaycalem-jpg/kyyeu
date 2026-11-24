/**
 * ============================================================
 * CẤU HÌNH THÔNG TIN THƯ MỜI KỶ YẾU 14/2
 * Cậu có thể dễ dàng chỉnh sửa các thông tin bên dưới cho phù hợp với mình nhé!
 * ============================================================
 */
const CONFIG = {
  // Thông tin chủ nhân lời mời
  ownerName: "Bùi Huyền", // Tên của bạn
  ownerNickname: "Huyền", // Biệt danh thân mật
  eventDate: "14/02/2026", // Ngày diễn ra (định dạng DD/MM/YYYY)
  eventTargetDate: "2026-02-14T10:20:00", // Ngày giờ để đếm ngược (YYYY-MM-DDTHH:mm:ss)

  // Thông tin chi tiết buổi kỷ yếu (Hiển thị khi bạn bè chọn "Có, mình rảnh")
  eventDetails: {
    time: "10:20 - 11:30 a.m., Ngày 14/02",
    location: "Sân trường THPT Chuyên Hoàng Văn Thụ",
    address: "Trường THPT Chuyên Hoàng Văn Thụ",
    dressCode: "Tone màu Trắng / Be / Pastel xinh xắn",
    specialNote: "Có trà sữa mát lạnh, bánh ngọt và hoa tươi đợi cậu đó nha! 🧋💐",
    googleMapsUrl: "https://maps.google.com", // Link Google Maps vị trí chụp
  },

  // Liên hệ của bạn (Để bạn bè nhắn tin xác nhận hoặc gửi ảnh)
  socialLinks: {
    facebook: "https://facebook.com", // Link Facebook của bạn
    zalo: "https://zalo.me/0974773986", // Link Zalo (https://zalo.me/0974773986)
    messenger: "https://m.me",        // Link Messenger
    phoneNumber: "0974 773 986"       // Số điện thoại liên hệ
  },

  // Danh sách hình ảnh kỷ yếu / cá nhân của bạn hiển thị ở trang đầu
  // Cậu có thể thay bằng đường dẫn ảnh của mình (ví dụ: 'assets/anh1.jpg')
  photos: [
    {
      url: "assets/anh1.jpg",
      caption: "Thanh xuân rực rỡ 🎓"
    },
    {
      url: "assets/anh2.jpg",
      caption: "Nụ cười tuổi trẻ ✨"
    },
    {
      url: "assets/anh3.jpg",
      caption: "Những ngày tháng đẹp nhất 🌸"
    },
    {
      url: "assets/anh4.jpg",
      caption: "Hẹn gặp lại ở cột mốc mới 🎈"
    }
  ],

  // Nhạc nền (Tùy chọn) - Nhạc lofi nhẹ nhàng
  music: {
    enabled: true,
    url: "assets/dien-tri.mp3"
  }
};

