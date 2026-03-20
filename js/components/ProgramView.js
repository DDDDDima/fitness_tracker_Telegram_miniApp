const MOCK_DAYS = [
    { day: 1, title: 'Push Day', duration: '45 хв', exercises: 6 },
    { day: 2, title: 'Pull Day', duration: '50 хв', exercises: 7 },
    { day: 3, title: 'Legs & Core', duration: '40 хв', exercises: 5 },
    { day: 4, title: 'Active Rest', duration: '---', exercises: 0 },
];

export function renderProgramView(container, params) {
    const title = params.title || 'Програма';
    
    let daysHtml = MOCK_DAYS.map(day => `
        <div onclick="${day.exercises > 0 ? `window.router.navigate('workout', { title: '${day.title}', day: ${day.day} })` : ''}" 
             class="bg-brand-card/80 backdrop-blur border border-slate-700/50 rounded-3xl p-5 flex items-center justify-between mb-4 active:scale-[0.98] transition shadow-lg ${day.exercises > 0 ? 'cursor-pointer' : 'opacity-70'}">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl ${day.exercises > 0 ? 'bg-gradient-to-br from-brand-super to-indigo-600' : 'bg-slate-800'} flex items-center justify-center font-black text-white text-xl shadow-inner">
                    D${day.day}
                </div>
                <div>
                    <h4 class="font-bold text-white text-lg">${day.title}</h4>
                    <p class="text-xs font-semibold text-brand-accent/80 mt-1 tracking-wide uppercase">${day.exercises > 0 ? `${day.exercises} вправ • ${day.duration}` : 'Відпочинок / Розтяжка'}</p>
                </div>
            </div>
            ${day.exercises > 0 ? `
            <div class="text-slate-500 bg-slate-800/50 p-2 rounded-full ring-1 ring-slate-700/50">
                <svg class="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>
            ` : ''}
        </div>
    `).join('');

    const html = `
        <div class="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md px-5 pt-8 pb-4 flex items-center border-b border-slate-800 shadow-sm">
            <button onclick="window.router.goBack()" class="mr-4 p-2 bg-slate-800/80 ring-1 ring-slate-700 rounded-full text-slate-300 hover:text-white transition active:scale-90">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h1 class="text-[22px] font-black text-white truncate pr-4 tracking-tight">${title}</h1>
        </div>
        
        <div class="px-5 pt-6 pb-20">
            <div class="flex items-center gap-2 mb-6 text-sm text-brand-accent font-bold uppercase tracking-widest">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Розклад</span>
            </div>
            ${daysHtml}
        </div>
    `;
    container.innerHTML = html;
}
