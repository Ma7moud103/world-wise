import { supabase } from "../lib/supabase";

export  async function deleteCity(id) { 
    
const { error } = await supabase
  .from("cities")
  .delete()
  .eq(" id", id);
    
    return {  error }
}