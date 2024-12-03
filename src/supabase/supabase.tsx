import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://bdiafllhveopdlgllbsa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkaWFmbGxodmVvcGRsZ2xsYnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNDEzNjIsImV4cCI6MjA0NTgxNzM2Mn0.7P8r7zYm35WYnvmOz8q5IlXQceCTnD9aMJV8zrBoy74';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
