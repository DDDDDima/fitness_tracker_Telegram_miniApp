export function renderExerciseCard(container, params) {
    const title = params.title || 'Вправа';
    
    // Simulate loading details
    const exercisesDetails = {
        title: title,
        muscles: 'Груди • Трицепс • Дельти',
        image: 'https://images.unsplash.com/photo-1599058917212-97d8cb270aa4?w=800&q=80',
        steps: [
            "Прийміть упор лежачи, руки трохи ширше плечей. Тіло повинно утворювати пряму лінію від голови до п'ят.",
            "На вдиху повільно опускайтеся, згинаючи лікті, поки груди майже не торкнуться підлоги. Лікті направлені під кутом 45 градусів до тіла.",
            "На видиху потужно відіжміться вгору, повертаючись у вихідне положення. Затримайтесь на секунду у верхній точці."
        ]
    };
    
    const html = `
        <div class="h-screen flex flex-col bg-[#050B14]">
            <!-- Video / GIF Header Area -->
            <div class="relative w-full h-[45vh] bg-slate-900 overflow-hidden rounded-b-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20">
                <img src="${exercisesDetails.image}" alt="Exercise Form" class="w-full h-full object-cover opacity-70">
                
                <div class="absolute inset-x-0 top-0 p-5 pt-8 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start">
                    <button onclick="window.router.goBack()" class="p-2.5 bg-black/40 backdrop-blur-md rounded-full text-white ring-1 ring-white/20 active:scale-90 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <div class="bg-brand-super/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full ring-1 ring-white/20 shadow-lg">
                        Техніка
                    </div>
                </div>
                
                <!-- Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center transform hover:scale-105 transition duration-300">
                    <div class="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center ring-2 ring-white/50 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-black ml-1.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="flex-1 -mt-8 pt-10 z-10 px-6 overflow-y-auto pb-24 relative">
                
                <h1 class="text-[32px] leading-tight font-black text-white mb-2 tracking-tight">${exercisesDetails.title}</h1>
                <p class="text-brand-accent font-bold mb-8 uppercase tracking-widest text-[11px]">${exercisesDetails.muscles}</p>
                
                <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Як виконувати:
                </h3>
                <ul class="space-y-5 text-slate-300 text-[15px] leading-relaxed relative before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-slate-800 before:-z-10">
                    ${exercisesDetails.steps.map((step, idx) => `
                    <li class="flex gap-4">
                        <span class="font-black text-brand-accent bg-slate-900 ring-2 ring-slate-800 w-[24px] h-[24px] text-[12px] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">${idx + 1}</span>
                        <span class="block">${step}</span>
                    </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
    container.innerHTML = html;
}
