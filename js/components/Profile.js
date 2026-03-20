import { telegramData } from '../telegram.js';

export function renderProfile(container, params) {
    const user = telegramData.user;
    
    // Mock data for MVP
    const stats = {
        level: 'Intermediate',
        weight: '75',
        height: '180',
        streak: 3,
        totalWorkouts: 12
    };

    const html = `
        <div class="px-5 pt-8 pb-6 flex items-center justify-between">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-brand-super to-brand-accent bg-clip-text text-transparent">Профіль</h1>
            <button class="bg-brand-card p-2 rounded-full ring-1 ring-slate-700/50 active:bg-slate-700 transition">
                <svg class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
        </div>

        <div class="px-5 space-y-6">
            <!-- User Info Card -->
            <div class="bg-brand-card rounded-3xl p-5 border border-slate-700/50 shadow-lg flex items-center gap-5">
                <div class="relative">
                    <img src="${user.photo_url || 'https://ui-avatars.com/api/?name=User&background=38bdf8&color=fff'}" alt="${user.first_name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-super/50">
                    <div class="absolute -bottom-2 -right-2 bg-slate-800 p-1 rounded-full text-xs shadow-md border border-slate-700/50">⭐</div>
                </div>
                <div class="flex-1 overflow-hidden">
                    <h2 class="text-xl font-bold text-white truncate">${user.first_name} ${user.last_name || ''}</h2>
                    <p class="text-sm text-brand-accent truncate">@${user.username || 'user'}</p>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-brand-card rounded-3xl p-5 border border-slate-700/50 flex flex-col items-center shadow-lg transform transition active:scale-[0.98]">
                    <span class="text-3xl font-black text-white mb-1">${stats.weight}<span class="text-sm text-slate-400 font-medium ml-1">кг</span></span>
                    <span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Вага</span>
                </div>
                <div class="bg-brand-card rounded-3xl p-5 border border-slate-700/50 flex flex-col items-center shadow-lg transform transition active:scale-[0.98]">
                    <span class="text-3xl font-black text-white mb-1">${stats.height}<span class="text-sm text-slate-400 font-medium ml-1">см</span></span>
                    <span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Зріст</span>
                </div>
            </div>

            <!-- Progress Dashboard -->
            <div class="bg-brand-card rounded-3xl p-6 border border-slate-700/50 shadow-lg">
                <h3 class="text-[10px] text-slate-400 font-semibold mb-5 uppercase tracking-wider">Прогрес тренувань</h3>
                <div class="flex justify-around items-center">
                    <div class="text-center group">
                        <div class="w-16 h-16 rounded-full bg-slate-800/80 border-2 border-orange-500 flex items-center justify-center mb-2 mx-auto relative shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                            <span class="text-2xl font-black text-orange-400">🔥 ${stats.streak}</span>
                        </div>
                        <span class="text-xs text-slate-400 font-medium uppercase">Стрік (Днів)</span>
                    </div>
                    <div class="w-px h-12 bg-slate-700/80"></div>
                    <div class="text-center group">
                        <div class="w-16 h-16 rounded-full bg-slate-800/80 border-2 border-brand-super flex items-center justify-center mb-2 mx-auto relative shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                            <span class="text-2xl font-black text-brand-super">${stats.totalWorkouts}</span>
                        </div>
                        <span class="text-xs text-slate-400 font-medium uppercase">Всього</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-brand-card rounded-3xl p-5 border border-slate-700/50 shadow-lg flex items-center justify-between active:bg-slate-800 transition">
                <div>
                     <span class="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Рівень підготовки</span>
                     <span class="text-lg font-bold text-white">${stats.level}</span>
                </div>
                <button class="text-brand-accent text-sm font-bold bg-brand-accent/10 px-3 py-1.5 rounded-lg active:scale-95 transition">Змінити</button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}
