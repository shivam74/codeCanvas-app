import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import axios from "axios";

const SyncUser = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const syncedForUserId = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      syncedForUserId.current = null;
      return;
    }

    if (syncedForUserId.current === user.id) return;

    const api = import.meta.env.VITE_API_URL;
    if (!api) return;

    const run = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        await axios.post(
          `${api}/users/sync-user`,
          {
            clerkUserId: user.id,
            username:
              user.username ||
              user.firstName ||
              user.primaryEmailAddress?.emailAddress,
            email: user.primaryEmailAddress?.emailAddress,
            img: user.imageUrl,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        syncedForUserId.current = user.id;
      } catch {
        // retry on next session load; avoid tight loops
      }
    };

    run();
  }, [user, isLoaded, getToken]);

  return null;
};

export default SyncUser;
