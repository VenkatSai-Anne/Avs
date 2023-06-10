import { test } from "@playwright/test";
import credentials from "./credentials";
import { login, logout, login_error1, login_error2, login_error3 } from "./login&logout";

test("login-logout", async ({ page }) => {

  // login
  await login_error1(page, credentials);

  // login
  await login_error2(page, credentials);

  // login
  await login_error3(page, credentials);

  // login
  await login(page, credentials);

  // logout
  await logout(page);
});