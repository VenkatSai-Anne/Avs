// @ts-check
import { test, expect } from "@playwright/test";
import { login } from "./fixtures/index.js";
test.afterAll(({ page }) => {
  page.close();
});
test("With correct creds, User should be able to login", async ({ page }) => {
  await page.goto("https://eisglobal.app/");
  await expect(page).toHaveURL("http://eisglobal.app/auth/login");
  await page.getByLabel("Email Address").fill(login.email);
  await page.getByLabel("Password").fill(login.password);
  await page.getByTestId("login").click();
  await expect(page).toHaveURL("http://eisglobal.app:5173/");
});

test("With incorrect creds, User should not be able to login", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveURL(/.*login/);
  await page.getByLabel("Email Address").fill("brucew@team-eagle.ca");
  await page.getByLabel("Password").fill("b");
  await page.getByTestId("login").click();
  await expect(page).toHaveURL(/.*login/);
});

test("Without login, User should be redirected to login page", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveURL(/.*login/);
});
