import { test } from "@playwright/test";
import credentials from "./credentials";
import { performLogin, performLogout } from "./login&logout";

test("login & logout", async ({ page }) => {
  // Login with incorrect credentials
  await performLogin(page, credentials.email1, credentials.password, false);
  await performLogin(page, credentials.email, credentials.password1, false);
  await performLogin(page, credentials.email1, credentials.password1, false);

  // Login with correct credentials
  await performLogin(page, credentials.email, credentials.password, true);

  // Logout
  await performLogout(page);
});
