import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";

export default function Account() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      console.log(user.id);

      setLoading(true);

      let { data, error, status } = await supabase
        .from("user")
        .select(`username, first_name, last_name`)
        .eq("auth_id", user.id)
        .single();
      console.log(data);

      if (error && status !== 406) {
        throw error;
      }

      if (data && session) {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, first_name, last_name }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        first_name,
        last_name,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("user").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    session && (
      <div className="form-widget">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <button
            className="button primary block"
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>

        <div>
          <button
            className="button block"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  );
}
