import { supabase } from "./supabase";

export const logActivity = async (userId: string, action: string) => {
  await supabase.from('audit_logs').insert([{ user_id: userId, action: action, ip: '...' }]);
};
