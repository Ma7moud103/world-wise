import { supabase } from "../lib/supabase";

export  async function signInHelper(email ,password) { 
    
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
});

    
    return { data, error }
}