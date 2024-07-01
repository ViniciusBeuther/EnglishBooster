import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cqpbajkxbhntpjplkvhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxcGJhamt4YmhudHBqcGxrdmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5ODU2NzEsImV4cCI6MjAyNzU2MTY3MX0.zM87fXkufxFY8w8wY76UDau0wEgdJRbHxUJQvXvQiGw';

export const supabase = createClient(supabaseUrl, supabaseKey);
