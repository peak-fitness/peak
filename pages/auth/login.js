import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();

  console.log(session);

  return (
    <>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        ) : (
          <p>Temp</p>
        )}
      </div>
    </>
  );
}
