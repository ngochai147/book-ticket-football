// darkModeInitializer.js
// File này có thể được import trong index.js hoặc được đặt vào App.js

export const initializeDarkMode = () => {
    // Kiểm tra localStorage trước
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Nếu không có giá trị được lưu, kiểm tra theme hệ thống
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  };
  
  // Xử lý sự kiện thay đổi theme hệ thống
  export const setupSystemThemeListener = () => {
    // Lắng nghe sự kiện thay đổi theme của hệ thống
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      // Chỉ cập nhật nếu người dùng chưa đặt theme cụ thể
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    });
  };