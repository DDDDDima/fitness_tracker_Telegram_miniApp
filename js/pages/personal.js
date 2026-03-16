import { DB } from '../api/db.js';
import { UI } from '../ui.js';
import { TelegramInterface } from '../telegram.js';

export const PersonalPage = {
    async render(user) {
        UI.els.fab.classList.remove('hidden');
        UI.els.containerPersonal.innerHTML = '<div class="text-center text-tg-hint py-4">Завантаження тренувань...</div>';
        try {
            const workouts = await DB.getWorkouts(user.id);
            if (workouts.length === 0) {
                UI.els.containerPersonal.innerHTML = UI.renderEmptyState("Ви ще не записали жодного тренування.");
            } else {
                UI.els.containerPersonal.innerHTML = '';
                workouts.forEach(w => {
                    const el = document.createElement('div');
                    el.innerHTML = UI.renderWorkoutCard(w);
                    UI.els.containerPersonal.appendChild(el.firstElementChild);
                });
            }
        } catch (e) {
            UI.els.containerPersonal.innerHTML = '<div class="text-red-500 text-center py-4">Помилка завантаження.</div>';
        }
    },

    openAddWorkoutModal(user, onWorkoutAdded) {
        const modalHtml = `
            <h2 class="text-xl font-bold mb-4 text-tg-text">Нове тренування</h2>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-tg-hint mb-1">Назва вправи</label>
                    <input type="text" id="input-exercise" class="tg-input" placeholder="Наприклад: Жим лежачи">
                </div>
                <div class="flex flex-row space-x-4">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-tg-hint mb-1">Вага (кг)</label>
                        <input type="number" id="input-weight" class="tg-input" placeholder="0">
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-tg-hint mb-1">Повторення</label>
                        <input type="number" id="input-reps" class="tg-input" placeholder="0">
                    </div>
                </div>
            </div>
            <div class="mt-6 flex flex-row space-x-3">
                <button id="btn-cancel-workout" class="flex-1 py-3 rounded-xl font-medium text-tg-hint bg-tg-secondaryBg active:scale-95 transition-transform">Скасувати</button>
                <button id="btn-save-workout" class="flex-1 py-3 rounded-xl font-semibold bg-tg-button text-tg-buttonText shadow-lg shadow-tg-button/30 active:scale-95 transition-transform">Зберегти</button>
            </div>
        `;
        
        UI.showModal(modalHtml);

        document.getElementById('btn-cancel-workout').addEventListener('click', () => {
            UI.hideModal();
        });

        document.getElementById('btn-save-workout').addEventListener('click', async () => {
            const exercise = document.getElementById('input-exercise').value.trim();
            const weight = parseFloat(document.getElementById('input-weight').value) || 0;
            const reps = parseInt(document.getElementById('input-reps').value) || 0;

            if (!exercise || reps <= 0) {
                TelegramInterface.showAlert("Будь ласка, введіть назву та кількість повторень.");
                return;
            }

            const btn = document.getElementById('btn-save-workout');
            btn.innerHTML = '<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>';
            btn.disabled = true;

            try {
                await DB.addWorkout(user.id, exercise, weight, reps);
                UI.hideModal();
                // Reload data
                await this.render(user);
                if (onWorkoutAdded) onWorkoutAdded();
            } catch (e) {
                btn.innerHTML = 'Зберегти';
                btn.disabled = false;
                TelegramInterface.showAlert("Помилка збереження. Перевірте підключення до БД.");
            }
        });
    }
};
