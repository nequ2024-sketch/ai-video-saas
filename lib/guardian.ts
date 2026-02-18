import { supabase } from "./supabase";

export const reportSuspiciousActivity = async (ip: string, reason: string) => {
  const { data, error } = await supabase.rpc('handle_suspicious_ip', { 
    client_ip: ip, 
    violation_reason: reason 
  });
  if (error) console.error("Security Alert Error:", error);
  return data;
};
