import { expect } from "@playwright/test";
import credentials from "./credentials";

export async function performLogin(page, email, password, shouldSucceed) {
  // Go to the application
  await page.goto(credentials.loginURL);

  // Validate the application page has the title
  await expect(page).toHaveTitle(credentials.title);

  // Fill in the login form
  await page.getByPlaceholder("Enter email address").fill(email);
  await page.getByPlaceholder("Enter password").fill(password);
  await page.getByTestId("login").click();

  if (shouldSucceed) {
    // Validate the login successful snack bar
    await page.waitForSelector('.MuiSnackbar-root:has-text("Login Successful")');

    // Validate login successful
    await page.waitForURL(credentials.homeURL);
  } else {
    // Validate the login failed snack bar
    await page.waitForSelector('.MuiSnackbar-root:has-text("Enter valid email and password")');

    // Validate login failed
    await page.waitForURL(credentials.loginURL);
  }
}

export async function performLogout(page) {
  // Perform logout actions
  await page.getByRole("button", { name: "open profile" }).click();
  await page.getByRole("button", { name: "logout Logout" }).click();
  await expect(page).toHaveURL(credentials.loginURL);
}
