import { supabase } from "./supabase";

export const checkUserCredits = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('credits_remaining, tier')
    .eq('user_id', userId)
    .single();

  if (error || !data) return { allowed: false, credits: 0 };
  
  return { 
    allowed: data.credits_remaining > 0, 
    credits: data.credits_remaining,
    tier: data.tier 
  };
};
