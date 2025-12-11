import { supabase } from "../lib/supabase";

export async function getCities() { 
    let { data: cities, error } = await supabase.from("cities").select("*");
    return { cities, error };
}