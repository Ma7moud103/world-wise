import { supabase } from "../lib/supabase";

export async function getCity(id) { 
    let { data: city, error } = await supabase
      .from("cities")
      .select("*")
      .eq("id", id)
      .single();
    
    return { city, error };
}