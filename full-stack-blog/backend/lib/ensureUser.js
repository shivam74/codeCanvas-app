import User from "../models/user.model.js";

function placeholderUsername(clerkUserId) {
  const base = String(clerkUserId).replace(/[^a-zA-Z0-9_]/g, "_");
  const suffix = base.slice(-28) || "user";
  return `u_${suffix}`;
}

function placeholderEmail(clerkUserId) {
  return `${String(clerkUserId).replace(/[^a-zA-Z0-9_-]/g, "")}@users.clerk.local`;
}

/**
 * Finds or creates a Mongo user for a Clerk ID. Idempotent on clerkUserId.
 * Optional profile updates applied when provided (sync from full Clerk profile).
 */
export async function ensureUserByClerkId(clerkUserId, profile = {}) {
  if (!clerkUserId) {
    throw new Error("clerkUserId is required");
  }

  let user = await User.findOne({ clerkUserId });

  const username =
    profile.username != null && String(profile.username).trim() !== ""
      ? String(profile.username).trim()
      : null;
  const email =
    profile.email != null && String(profile.email).trim() !== ""
      ? String(profile.email).trim()
      : null;
  const { img } = profile;

  if (user) {
    let dirty = false;
    if (username && username !== user.username) {
      user.username = username;
      dirty = true;
    }
    if (email && email !== user.email) {
      user.email = email;
      dirty = true;
    }
    if (img !== undefined && img !== user.img) {
      user.img = img;
      dirty = true;
    }
    if (dirty) {
      try {
        await user.save();
      } catch (e) {
        if (e.code !== 11000) throw e;
      }
    }
    return user;
  }

  const payload = {
    clerkUserId,
    username: username || placeholderUsername(clerkUserId),
    email: email || placeholderEmail(clerkUserId),
  };
  if (img !== undefined) payload.img = img;

  try {
    return await User.create(payload);
  } catch (e) {
    if (e.code !== 11000) throw e;
    payload.username = `${payload.username}_${Date.now().toString(36)}`;
    payload.email = `${clerkUserId}+dup@${Date.now().toString(36)}.clerk.local`;
    return await User.create(payload);
  }
}
