// Mock Data for MVP
const PROGRAMS = [
    { id: 1, title: 'Beginner Calisthenics', level: 'Початківець', duration: '4 тижні', image: 'https://images.unsplash.com/photo-1599058917212-97d8cb270aa4?w=500&auto=format&fit=crop&q=60', color: 'from-green-500/30 to-emerald-900/60' },
    { id: 2, title: 'THENX Fundamentals', level: 'Середній', duration: '8 тижнів', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60', color: 'from-brand-super/30 to-blue-900/60' },
    { id: 3, title: 'Pro Muscle Up', level: 'Просунутий', duration: '6 тижнів', image: 'https://images.unsplash.com/photo-1598971639058-202a0b2fdab9?w=500&auto=format&fit=crop&q=60', color: 'from-red-500/30 to-orange-900/60' }
];

export function renderCatalog(container, params) {
    let cardsHtml = PROGRAMS.map(prog => `
        <div onclick="window.router.navigate('program', { id: ${prog.id}, title: '${prog.title}' })" 
             class="group relative overflow-hidden rounded-[2rem] border border-slate-700/40 bg-brand-card mb-5 transform transition active:scale-[0.98] shadow-lg">
            
            <div class="absolute inset-0 bg-gradient-to-br ${prog.color} z-10 opacity-70 mix-blend-multiply"></div>
            <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
            
            <img src="${prog.image}" alt="${prog.title}" class="absolute inset-0 w-full h-full object-cover">
            
            <div class="relative z-20 p-6 flex flex-col h-56 justify-end">
                <div class="flex items-center gap-2 mb-3">
                    <span class="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md rounded-md text-white border border-white/10 shadow-sm">${prog.level}</span>
                    <span class="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md rounded-md text-white border border-white/10 shadow-sm">${prog.duration}</span>
                </div>
                <h3 class="text-2xl font-black text-white leading-tight drop-shadow-md mb-1">${prog.title}</h3>
                <div class="flex items-center gap-2 text-brand-accent text-sm font-medium mt-1">
                    <span>Переглянути план</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
            </div>
        </div>
    `).join('');

    const html = `
        <div class="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-sm px-5 pt-8 pb-4 border-b border-transparent transition-all">
            <h1 class="text-[28px] font-black tracking-tight text-white leading-none">Тренування</h1>
            <p class="text-sm font-medium text-slate-400 mt-1">Обери програму та досягай цілей</p>
        </div>
        
        <div class="px-5 pt-6">
            ${cardsHtml}
        </div>
    `;

    container.innerHTML = html;
}
