import { supabase } from "../lib/supabase";

export  async function createCity(city) { 
    
const { data, error } = await supabase
  .from("cities")
  .insert([city])
  .select();

    
    return { data, error }
}