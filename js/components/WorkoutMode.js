import { telegramData } from '../telegram.js';

const MOCK_EXERCISES = [
    { id: 101, title: 'Віджимання', sets: 4, reps: 15, duration: 0, image: 'https://images.unsplash.com/photo-1598971639058-202a0b2fdab9?w=300&q=60' },
    { id: 102, title: 'Підтягування', sets: 4, reps: 8, duration: 0, image: 'https://images.unsplash.com/photo-1599058917212-97d8cb270aa4?w=300&q=60' },
    { id: 103, title: 'Планка', sets: 3, reps: 0, duration: 60, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=60' },
];

export function renderWorkoutMode(container, params) {
    const title = params.title || 'Тренування';
    
    let exercisesHtml = MOCK_EXERCISES.map((ex, idx) => `
        <div class="flex items-center gap-4 bg-brand-card p-3 rounded-2xl border border-slate-700/50 mb-3 shadow-lg relative overflow-hidden group">
            <div class="w-16 h-16 rounded-[14px] bg-slate-800 overflow-hidden flex-shrink-0 relative">
                <img src="${ex.image}" alt="${ex.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/20"></div>
            </div>
            <div class="flex-1 min-w-0 py-1" onclick="window.router.navigate('exercise', { id: ${ex.id}, title: '${ex.title}' })">
                <h4 class="font-bold text-white text-[17px] tracking-tight truncate mb-1">${ex.title}</h4>
                <div class="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-wider">
                    <span class="text-white bg-slate-700/60 px-2 py-1 rounded border border-slate-600/50">${ex.sets} Сетів</span>
                    ${ex.reps > 0 ? `<span class="text-brand-accent bg-brand-accent/10 px-2 py-1 rounded border border-brand-accent/20">${ex.reps} Повторів</span>` : `<span class="text-orange-400 bg-orange-400/10 px-2 py-1 rounded border border-orange-400/20">${ex.duration} Сек</span>`}
                </div>
            </div>
            <button onclick="window.router.navigate('exercise', { id: ${ex.id}, title: '${ex.title}' })" class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-brand-super hover:text-white transition-colors absolute right-4 mr-0.5 active:scale-90">
                <svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    `).join('');

    const html = `
        <div class="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md px-5 pt-8 pb-4 flex items-center justify-between border-b border-slate-800 shadow-sm">
            <div class="flex items-center min-w-0">
                <button onclick="window.router.goBack()" class="mr-4 p-2 bg-slate-800 rounded-full ring-1 ring-slate-700 text-slate-300 hover:text-white transition active:scale-90 shrink-0">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h1 class="text-[20px] font-black tracking-tight text-white truncate pr-2">${title}</h1>
            </div>
            <button id="finish-workout" class="text-[11px] font-black uppercase tracking-widest text-[#050B14] bg-brand-accent px-4 py-2 rounded-xl active:scale-95 transition shadow-[0_0_15px_rgba(56,189,248,0.4)] shrink-0">Завершити</button>
        </div>
        
        <div class="px-5 pt-6 pb-40">
            ${exercisesHtml}
        </div>
        
        <div class="fixed bottom-[85px] left-0 w-full px-5 z-40 pointer-events-none safe-area-pb">
            <div class="bg-[#1e1b4b]/95 backdrop-blur-xl rounded-[2rem] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-indigo-500/30 flex items-center justify-between pointer-events-auto">
                <div class="flex items-center gap-3">
                    <div class="bg-indigo-500/20 p-2.5 rounded-full border border-indigo-500/20 shadow-inner">
                        <svg class="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <div class="text-[9px] uppercase font-black text-indigo-300/80 tracking-[0.15em] mb-0.5">Тривалість</div>
                        <div class="text-3xl font-black text-white font-mono tracking-tight leading-none" id="workout-timer">00:00</div>
                    </div>
                </div>
                 <button class="w-14 h-14 bg-indigo-500 hover:bg-indigo-400 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-90 transition">
                    <svg class="w-7 h-7 relative left-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                 </button>
            </div>
        </div>
    `;
    container.innerHTML = html;

    const start = Date.now();
    const timerEl = document.getElementById('workout-timer');
    const interval = setInterval(() => {
        if(!document.getElementById('workout-timer')) {
            clearInterval(interval);
            return;
        }
        const delta = Math.floor((Date.now() - start) / 1000);
        const m = String(Math.floor(delta / 60)).padStart(2, '0');
        const s = String(delta % 60).padStart(2, '0');
        timerEl.textContent = `${m}:${s}`;
    }, 1000);

    document.getElementById('finish-workout').addEventListener('click', () => {
        clearInterval(interval);
        if(telegramData.isAvailable) {
             telegramData.showMainButton("ПРОДОВЖИТИ", () => {
                 telegramData.hideMainButton();
                 window.router.goBack();
             });
        } else {
             alert("Тренування успішно завершено та збережено!");
             window.router.goBack();
        }
    });
}
