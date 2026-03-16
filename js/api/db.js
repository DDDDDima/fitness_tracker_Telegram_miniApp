import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

let supabase = null;

export const DB = {
    init(supabaseUrl, supabaseKey) {
        if (!supabaseUrl || !supabaseKey) {
            console.error("Supabase credentials missing.");
            return false;
        }
        supabase = createClient(supabaseUrl, supabaseKey);
        console.log("Supabase client initialized via esm.sh");
        return true;
    },

    isReady() {
        return supabase !== null;
    },

    async getUserRole(tgId) {
        if (!supabase) throw new Error("Supabase is not initialized");
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('tg_id', tgId)
            .single();
            
        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw error;
        }
        return data;
    },

    async registerUser(tgId, fullName, role = 'client') {
        if (!supabase) throw new Error("Supabase is not initialized");
        const { data, error } = await supabase
            .from('users')
            .insert([{ tg_id: tgId, full_name: fullName, role: role }])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getWorkouts(clientId) {
        if (!supabase) throw new Error("Supabase is not initialized");
        const { data, error } = await supabase
            .from('workouts')
            .select('*')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async addWorkout(clientId, exerciseName, weight, reps) {
        if (!supabase) throw new Error("Supabase is not initialized");
        const { data, error } = await supabase
            .from('workouts')
            .insert([{ client_id: clientId, exercise_name: exerciseName, weight: weight, reps: reps }])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getCoachClients(coachId) {
        if (!supabase) throw new Error("Supabase is not initialized");
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('coach_id', coachId);
        if (error) throw error;
        return data;
    }
};
