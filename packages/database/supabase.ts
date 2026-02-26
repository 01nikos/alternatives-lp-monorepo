import { createClient } from '@supabase/supabase-js';

export interface LeadData {
  email: string;
  company_name: string;
  source: 'braze' | 'hubspot' | 'klaviyo' | 'salesforce';
  placement: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  ip_address: string;
  user_agent: string;
}

export interface LeadRecord extends LeadData {
  id: string;
  created_at: string;
  updated_at: string;
}

export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function insertLead(leadData: LeadData): Promise<LeadRecord | null> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('leads')
    .insert([leadData])
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  return data;
}
