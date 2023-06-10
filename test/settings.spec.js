import { login, logout } from "./login&logout";
import { test, expect } from "@playwright/test";
import credentials from "./credentials";

test.beforeEach(async ({ page }) => {
  await login(page, credentials);
});

test.afterAll(async ({ page }) => {
  await logout(page);
  page.close();
});

test("Setting1", async ({ page }) => {
    
    // Go to Settings tab
    await page.getByRole("button", { name: "Settings" }).click();
  
    // Validate if you are in settings tab
    // await expect(page).toHaveURL(creds.ip3);
    // await page.waitForURL(creds.ip3);
  
    // Go to Bird & Wildlife Strike
    await page.getByRole("button", { name: "Bird & Wildlife Strike" }).click();
  
    // Go to Aircraft Makes
    await page.getByRole("button", { name: "Aircraft Makes" }).click();
  
    // Add a new entry in Aircraft Make
    await page.getByRole("button", { name: "add" }).click();
    await page.getByLabel("Aircraft Make").fill(settingstab.add);
    await page.getByLabel("Active").check();
    await page.getByRole("button", { name: "Save" }).click();
  
    let nextPageButtonEnabled0 = true;
    while (nextPageButtonEnabled0) {
      await page.getByRole("button", { name: "Go to next page" }).click();
      nextPageButtonEnabled0 = (await page.getAttribute(
        '[aria-label="Go to next page"]',
        'tabindex'
      )) !== "-1";
    }
  
    // edit a new entry in Aircraft Make
    await page.getByRole("checkbox", { name: settingstab.add }).click();
    await page.getByRole("button", { name: "edit" }).click();
    await page.getByLabel("Aircraft Make").fill(settingstab.edit);
    await page.getByRole("button", { name: "Save" }).click();
  
    let nextPageButtonEnabled1 = true;
    while (nextPageButtonEnabled1) {
      await page.getByRole("button", { name: "Go to next page" }).click();
      nextPageButtonEnabled1 = (await page.getAttribute(
        '[aria-label="Go to next page"]',
        'tabindex'
      )) !== "-1";
    }
  
    // Delete a new entry in Aircraft Make
    await page.getByRole("checkbox", { name: settingstab.edit }).click();
    await page.getByRole("button", { name: "delete" }).click();
    await page.getByRole("button", { name: "Yes" }).click();
  
    // Logout
    await page.getByRole("button", { name: "open profile" }).click();
    await page.getByRole("button", { name: "logout Logout" }).click();
    await expect(page).toHaveURL(creds.ip);
  });
  
  test("Setting2", async ({ page }) => {
  
    // Go to Settings tab
    await page.getByRole("button", { name: "Settings" }).click();
  
    // Validate if you are in settings tab
    // await expect(page).toHaveURL(creds.ip3);
    // await page.waitForURL(creds.ip3);
  
    // Go to Bird & Wildlife Strike
    await page.getByRole("button", { name: "Bird & Wildlife Strike" }).click();
  
    // Go to Aircraft Models
    await page.getByRole("button", { name: "Aircraft Models" }).click();
  
    // Add a new entry in Aircraft Model
    await page.getByRole("button", { name: "add" }).click();
    await page.getByLabel("Aircraft Model").fill(settingstab.add);
    await page.getByLabel("Active").check();
    await page.getByRole("button", { name: "Save" }).click();
  
    // await page.getByRole("button", { name: "Rows per page: 10" }).click();
    // await page.getByRole("option", { name: "100" }).click();
  
    let nextPageButtonEnabled0 = true;
    while (nextPageButtonEnabled0) {
      await page.getByRole("button", { name: "Go to next page" }).click();
      nextPageButtonEnabled0 = (await page.getAttribute(
        '[aria-label="Go to next page"]',
        'tabindex'
      )) !== "-1";
    }
  
    // edit a new entry in Aircraft Model
    await page.getByRole("checkbox", { name: settingstab.add }).click();
    await page.getByRole("button", { name: "edit" }).click();
    await page.getByLabel("Aircraft Model").fill(settingstab.edit);
    await page.getByRole("button", { name: "Save" }).click();
  
    // await page.getByRole("button", { name: "Rows per page: 10" }).click();
    // await page.getByRole("option", { name: "100" }).click();
  
    let nextPageButtonEnabled1 = true;
    while (nextPageButtonEnabled1) {
      await page.getByRole("button", { name: "Go to next page" }).click();
      nextPageButtonEnabled1 = (await page.getAttribute(
        '[aria-label="Go to next page"]',
        'tabindex'
      )) !== "-1";
    }
  
    // Delete a new entry in Aircraft Model
    await page.getByRole("checkbox", { name: settingstab.edit }).click();
    await page.getByRole("button", { name: "delete" }).click();
    await page.getByRole("button", { name: "Yes" }).click();
  
    // Logout
    await page.getByRole("button", { name: "open profile" }).click();
    await page.getByRole("button", { name: "logout Logout" }).click();
    await expect(page).toHaveURL(creds.ip);
  });