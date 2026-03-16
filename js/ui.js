export const UI = {
    els: {
        loading: document.getElementById('view-loading'),
        dashboard: document.getElementById('view-dashboard'),
        tabsContainer: document.getElementById('tabs-container'),
        tabPersonal: document.getElementById('btn-tab-personal'),
        tabCoach: document.getElementById('btn-tab-coach'),
        containerPersonal: document.getElementById('container-personal'),
        containerCoach: document.getElementById('container-coach'),
        fab: document.getElementById('fab-add'),
        userName: document.getElementById('user-name'),
        modalBackdrop: document.getElementById('modal-backdrop'),
        modalContent: document.getElementById('modal-content')
    },

    showLoading() {
        this.els.loading.classList.remove('hidden');
        this.els.dashboard.classList.add('hidden');
    },

    hideLoading() {
        this.els.loading.classList.add('hidden');
        this.els.dashboard.classList.remove('hidden');
    },

    setUserName(name) {
        this.els.userName.textContent = name;
    },

    showModal(htmlContent) {
        this.els.modalContent.innerHTML = htmlContent;
        this.els.modalBackdrop.classList.remove('hidden');
        
        // Small delay for entrance animation
        requestAnimationFrame(() => {
            this.els.modalContent.classList.remove('translate-y-full');
            this.els.modalContent.classList.add('translate-y-0');
        });
    },

    hideModal() {
        this.els.modalContent.classList.remove('translate-y-0');
        this.els.modalContent.classList.add('translate-y-full');
        
        setTimeout(() => {
            this.els.modalBackdrop.classList.add('hidden');
        }, 300);
    },

    switchTab(tab) {
        if (tab === 'personal') {
            this.els.tabPersonal.classList.replace('text-tg-hint', 'text-tg-text');
            this.els.tabPersonal.classList.replace('font-medium', 'font-semibold');
            this.els.tabPersonal.classList.add('bg-tg-bg', 'shadow-sm');
            
            this.els.tabCoach.classList.replace('text-tg-text', 'text-tg-hint');
            this.els.tabCoach.classList.replace('font-semibold', 'font-medium');
            this.els.tabCoach.classList.remove('bg-tg-bg', 'shadow-sm');

            this.els.containerPersonal.classList.remove('hidden');
            this.els.containerCoach.classList.add('hidden');
        } else {
            this.els.tabCoach.classList.replace('text-tg-hint', 'text-tg-text');
            this.els.tabCoach.classList.replace('font-medium', 'font-semibold');
            this.els.tabCoach.classList.add('bg-tg-bg', 'shadow-sm');
            
            this.els.tabPersonal.classList.replace('text-tg-text', 'text-tg-hint');
            this.els.tabPersonal.classList.replace('font-semibold', 'font-medium');
            this.els.tabPersonal.classList.remove('bg-tg-bg', 'shadow-sm');

            this.els.containerCoach.classList.remove('hidden');
            this.els.containerPersonal.classList.add('hidden');
        }
    },

    renderWorkoutCard(workout) {
        const date = new Date(workout.created_at).toLocaleDateString('uk-UA');
        return `
            <div class="glass-card p-4 flex flex-col space-y-2 slide-up">
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-tg-text text-lg">${workout.exercise_name}</h3>
                    <span class="text-xs text-tg-hint">${date}</span>
                </div>
                <div class="flex items-center space-x-4 text-sm text-tg-text">
                    <div class="flex items-center space-x-1">
                        <span class="text-tg-hint">К-ть:</span>
                        <span class="font-semibold">${workout.reps}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <span class="text-tg-hint">Вага:</span>
                        <span class="font-semibold">${workout.weight} кг</span>
                    </div>
                </div>
            </div>
        `;
    },

    renderEmptyState(message) {
        return `
            <div class="flex flex-col items-center justify-center p-8 text-center glass-card slide-up">
                <div class="w-16 h-16 mb-4 text-tg-hint opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p class="text-tg-hint">${message}</p>
            </div>
        `;
    }
};
