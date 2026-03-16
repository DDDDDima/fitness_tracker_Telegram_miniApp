import { DB } from '../api/db.js';
import { UI } from '../ui.js';

export const CoachPage = {
    async render(user) {
        UI.els.fab.classList.add('hidden');
        UI.els.containerCoach.innerHTML = '<div class="text-center text-tg-hint py-4">Завантаження клієнтів...</div>';
        try {
            const clients = await DB.getCoachClients(user.id);
            if (clients.length === 0) {
                UI.els.containerCoach.innerHTML = UI.renderEmptyState("У вас поки що немає клієнтів.");
            } else {
                UI.els.containerCoach.innerHTML = '<h2 class="font-semibold text-lg mb-2 text-tg-text">Ваші клієнти</h2>';
                const list = document.createElement('div');
                list.className = 'space-y-2';
                clients.forEach(c => {
                    const clientEl = document.createElement('div');
                    clientEl.className = "glass-card p-4 flex items-center justify-between cursor-pointer active:scale-95 transition-transform slide-up";
                    clientEl.innerHTML = `
                        <span class="font-medium text-tg-text">${c.full_name || 'Клієнт ' + c.tg_id}</span>
                        <svg class="w-5 h-5 text-tg-hint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    `;
                    clientEl.addEventListener('click', () => this.showClientDetails(c));
                    list.appendChild(clientEl);
                });
                UI.els.containerCoach.appendChild(list);
            }
        } catch (e) {
            UI.els.containerCoach.innerHTML = '<div class="text-red-500 text-center py-4">Помилка завантаження клієнтів.</div>';
        }
    },

    async showClientDetails(client) {
        UI.showModal(`
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-tg-text">${client.full_name || 'Клієнт'}</h2>
                <button id="btn-close-client" class="p-2 text-tg-hint rounded-full bg-tg-secondaryBg active:scale-95">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div id="client-workouts-list" class="space-y-3 max-h-96 overflow-y-auto pr-2">
                <div class="text-center text-sm text-tg-hint py-4">Завантаження...</div>
            </div>
        `);

        document.getElementById('btn-close-client').addEventListener('click', () => UI.hideModal());

        const listContainer = document.getElementById('client-workouts-list');
        try {
            const workouts = await DB.getWorkouts(client.tg_id);
            if (workouts.length === 0) {
                listContainer.innerHTML = '<p class="text-sm text-tg-hint text-center py-4">Клієнт ще не має тренувань.</p>';
            } else {
                listContainer.innerHTML = '';
                workouts.forEach(w => {
                    const el = document.createElement('div');
                    el.innerHTML = UI.renderWorkoutCard(w);
                    listContainer.appendChild(el.firstElementChild);
                });
            }
        } catch (e) {
            listContainer.innerHTML = '<p class="text-sm text-red-500 text-center py-4">Помилка завантаження.</p>';
        }
    }
};
