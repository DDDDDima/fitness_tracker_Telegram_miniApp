import { TelegramInterface } from './telegram.js';
import { UI } from './ui.js';
import { DB } from './api/db.js';
import { PersonalPage } from './pages/personal.js';
import { CoachPage } from './pages/coach.js';

// Application State
const AppState = {
    user: null,
    dbUser: null,
    currentTab: 'personal' // 'personal' or 'coach'
};

// --- CONFIGURATION ---
// IMPORTANT: Replace these with real credentials when you create the Supabase project
const SUPABASE_URL = ''; 
const SUPABASE_KEY = '';

async function initApp() {
    TelegramInterface.init();
    
    // Check if we need to initialize Supabase
    let isDbReady = false;
    if (SUPABASE_URL && SUPABASE_KEY) {
        isDbReady = DB.init(SUPABASE_URL, SUPABASE_KEY);
    } else {
        console.warn("Supabase credentials not set! App will not load real data.");
    }

    const tgUser = TelegramInterface.getUser();
    AppState.user = tgUser;
    
    UI.setUserName(tgUser.first_name || 'Спортсмен');

    UI.els.tabPersonal.addEventListener('click', () => switchTab('personal'));
    UI.els.tabCoach.addEventListener('click', () => switchTab('coach'));
    UI.els.fab.addEventListener('click', handleFabClick);

    if (!isDbReady) {
        console.log("Entering MOCK MODE for UI testing.");
        // MOCK MODE
        AppState.dbUser = { role: 'coach' }; // Give coach role for testing both tabs
        UI.els.tabsContainer.classList.remove('hidden');
        UI.els.tabsContainer.classList.add('flex');
        
        // Override DB methods for mock mode
        DB.getWorkouts = async () => [
            { created_at: new Date().toISOString(), exercise_name: 'Test Workout', weight: 50, reps: 10 }
        ];
        DB.getCoachClients = async () => [
            { tg_id: 1, full_name: 'Test Client 1' },
            { tg_id: 2, full_name: 'Test Client 2' }
        ];
        DB.addWorkout = async () => true;

        switchTab('personal');
        UI.hideLoading();
        return;
    }

    try {
        let dbUser = await DB.getUserRole(tgUser.id);
        if (!dbUser) {
            const fullName = `${tgUser.first_name || ''} ${tgUser.last_name || ''}`.trim();
            dbUser = await DB.registerUser(tgUser.id, fullName, 'client');
        }
        AppState.dbUser = dbUser;

        if (dbUser && dbUser.role === 'coach') {
            UI.els.tabsContainer.classList.remove('hidden');
            UI.els.tabsContainer.classList.add('flex');
        }

        switchTab('personal');
        UI.hideLoading();
    } catch (e) {
        console.error("App init error:", e);
        UI.hideLoading();
        TelegramInterface.showAlert("Помилка при завантаженні даних з БД. Перевірте консоль.");
    }
}

async function switchTab(tabId) {
    if (tabId === 'coach' && AppState.dbUser?.role !== 'coach') {
        TelegramInterface.showAlert("У вас немає доступу тренера.");
        return;
    }
    
    AppState.currentTab = tabId;
    UI.switchTab(tabId);

    if (tabId === 'personal') {
        PersonalPage.render(AppState.user);
    } else if (tabId === 'coach') {
        CoachPage.render(AppState.user);
    }
}

function handleFabClick() {
    if (AppState.currentTab === 'personal') {
        PersonalPage.openAddWorkoutModal(AppState.user, () => {
             // Optional callback on added workout
        });
    }
}

// Start app
document.addEventListener('DOMContentLoaded', initApp);
