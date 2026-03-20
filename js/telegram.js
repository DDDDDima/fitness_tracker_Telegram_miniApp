// Wrapper and utilities for window.Telegram.WebApp
const tg = window.Telegram?.WebApp;

export const telegramData = {
    isAvailable: !!tg,
    user: tg?.initDataUnsafe?.user || {
        id: 123456,
        first_name: "Mock",
        last_name: "User",
        username: "mockuser",
        // Dummy photo for UI testing
        photo_url: "https://ui-avatars.com/api/?name=Mock+User&background=38bdf8&color=fff&size=256"
    },
    theme: tg?.themeParams || {},
    initData: tg?.initData || "",
    
    ready: () => tg?.ready(),
    expand: () => tg?.expand(),
    close: () => tg?.close(),
    
    showMainButton: (text, callback) => {
        if (!tg) return;
        tg.MainButton.setText(text);
        tg.MainButton.show();
        tg.MainButton.onClick(callback);
    },
    hideMainButton: () => {
        if (!tg) {
            console.log("Hiding main button (mock)");
            return;
        }
        tg.MainButton.hide();
        tg.MainButton.offClick();
    }
}
