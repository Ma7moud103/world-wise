import { supabase } from "../lib/supabase";

export  async function signUpHelper(email, password,phone) { 
    console.log({email, password,phone})
    
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        phone: phone
})

    
    return { data, error }
}