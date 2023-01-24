import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

export const supabase = createClient(
  "https://cfbogjupbnvkonljmcuq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYm9nanVwYm52a29ubGptY3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1OTExOTgsImV4cCI6MTk5MDE2NzE5OH0.j9LFnHprenmmzwUFBdq7V_Y_2oW0Wrm55fPg3UJH_gw"
);
