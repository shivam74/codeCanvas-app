const OPTIONAL_IMAGEKIT = ["IK_URL_ENDPOINT", "IK_PUBLIC_KEY", "IK_PRIVATE_KEY"];

export function validateEnv() {
  const missing = [];
  if (!process.env.MONGO) missing.push("MONGO");
  if (!process.env.CLERK_SECRET_KEY) missing.push("CLERK_SECRET_KEY");

  if (missing.length) {
    console.warn(
      `[env] Missing required variables: ${missing.join(", ")} — server may fail to start or authenticate.`
    );
  }

  const ikMissing = OPTIONAL_IMAGEKIT.filter((k) => !process.env[k]);
  if (ikMissing.length) {
    console.warn(
      `[env] ImageKit not fully configured (${ikMissing.join(", ")}). Upload auth will return 503.`
    );
  }
}
