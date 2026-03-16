// Wrapper for Telegram SDK to simplify interactions

const tg = window.Telegram.WebApp;

export const TelegramInterface = {
    init() {
        tg.ready();
        tg.expand();
        tg.setHeaderColor('bg_color');
    },

    getUser() {
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            return tg.initDataUnsafe.user;
        }
        // Fallback for local development or testing in browser
        console.warn("Telegram SDK not available or running outside Telegram. Returning mock user.");
        return {
            id: 111111111, // Mock ID
            first_name: "Test",
            last_name: "User",
            username: "testuser",
            language_code: "uk"
        };
    },

    getThemeParams() {
        return tg.themeParams;
    },

    setMainButton(text, onClick, isVisible = true) {
        tg.MainButton.setText(text);
        if (isVisible) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
        
        tg.MainButton.offClick(this._currentMainButtonHandler);
        
        this._currentMainButtonHandler = onClick;
        if (onClick) {
            tg.MainButton.onClick(onClick);
        }
    },

    showMainButton() {
        tg.MainButton.show();
    },

    hideMainButton() {
        tg.MainButton.hide();
    },

    showAlert(message) {
        tg.showAlert(message);
    },

    showConfirm(message, callback) {
        tg.showConfirm(message, callback);
    }
};
