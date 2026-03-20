import { telegramData } from './telegram.js';
import { supabase } from './supabase.js';

// Import views
import { renderProfile } from './components/Profile.js';
import { renderCatalog } from './components/Catalog.js';
import { renderProgramView } from './components/ProgramView.js';
import { renderExerciseCard } from './components/ExerciseCard.js';
import { renderWorkoutMode } from './components/WorkoutMode.js';

// Basic SPA Router implementation
export class Router {
    constructor() {
        this.appContainer = document.getElementById('app-container');
        this.currentView = null;
        this.history = [];
        this.currentParams = {};
    }

    navigate(viewName, params = {}) {
        if (this.currentView) {
            this.history.push({ name: this.currentView, params: this.currentParams });
        }
        this.renderView(viewName, params);
        this.updateNavUI(viewName);
    }

    goBack() {
        if (this.history.length > 0) {
            const previous = this.history.pop();
            this.renderView(previous.name, previous.params);
            this.updateNavUI(previous.name);
        } else {
            this.navigate('catalog');
        }
    }

    renderView(viewName, params) {
        this.currentView = viewName;
        this.currentParams = params;
        
        // Add fade-in animation class
        this.appContainer.className = 'h-screen w-full relative overflow-y-auto pb-24 safe-area-pb fade-in';
        void this.appContainer.offsetWidth; // trigger reflow

        switch (viewName) {
            case 'profile':
                renderProfile(this.appContainer, params);
                break;
            case 'catalog':
                renderCatalog(this.appContainer, params);
                break;
            case 'program':
                renderProgramView(this.appContainer, params);
                break;
            case 'exercise':
                renderExerciseCard(this.appContainer, params);
                break;
            case 'workout':
                renderWorkoutMode(this.appContainer, params);
                break;
            default:
                renderCatalog(this.appContainer, params);
        }
    }

    updateNavUI(activeView) {
        const navs = ['catalog', 'profile'];
        navs.forEach(nav => {
            const el = document.getElementById(`nav-${nav}`);
            if (el) {
                if(nav === activeView) {
                   el.classList.add('text-brand-accent');
                   el.classList.remove('text-slate-400');
                } else {
                   el.classList.add('text-slate-400');
                   el.classList.remove('text-brand-accent');
                }
            }
        });
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Let Telegram know WebApp is ready and expand it
    telegramData.ready();
    telegramData.expand();
    
    // Initialize Router globally
    window.router = new Router();
    window.router.navigate('catalog');
    
    console.log("Easy FIT initialized for user:", telegramData.user);
});
