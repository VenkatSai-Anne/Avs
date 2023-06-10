import settingstab from "./settingstab";
import creds from "./credentials";
import { test, expect } from "@playwright/test";

const performTest = async (page, settingsButtonName, fieldName, settinngsButtonDropDown) => {
  
  // Go to the Application
  await page.goto(creds.ip);

  // Validate the Application page has the title
  await expect(page).toHaveTitle(creds.title);

  //login with both correct creds
  await page.getByPlaceholder("Enter email address").fill(creds.email);
  await page.getByPlaceholder("Enter password").fill(creds.password);
  await page.getByTestId("login").click();

  // Validate the login successful snack bar
  await page.waitForSelector('.MuiSnackbar-root:has-text("Login Successful")');

  // Validate login successful
  await page.waitForURL(creds.ip1);

  // Go to Settings tab
  await page.getByRole("button", { name: "Settings" }).click();

  // Validate if you are in settings tab
  await expect(page).toHaveURL(creds.ip3);
  await page.waitForURL(creds.ip3);

  // Go to Bird & Wildlife Strike
  await page.getByRole("button", { name: settinngsButtonDropDown }).click();

  // Go to settingsButtonName
  await page.getByRole("button", { name: settingsButtonName }).click();

  // Add a new entry in fieldName
  await page.getByRole("button", { name: "add" }).click();
  await page.getByLabel(fieldName).fill(settingstab.add);
  await page.getByLabel("Active").check();
  await page.getByRole("button", { name: "Save" }).click();

  // Go to Bird & Wildlife Strike
  await page.getByRole("button", { name: settinngsButtonDropDown }).click();

  // Go to Bird & Wildlife Strike
  await page.getByRole("button", { name: settinngsButtonDropDown }).click();

  // Go to settingsButtonName
  await page.getByRole("button", { name: settingsButtonName }).click();

  // await page.getByRole("button", { name: "Rows per page: 10" }).click();
  // await page.getByRole("option", { name: "100" }).click();

  let nextPageButtonEnabled0 = (await page.getAttribute(
    '[aria-label="Go to next page"]',
    'tabindex'
  )) !== "-1";

  while (nextPageButtonEnabled0) {
    const tabIndex = await page.getAttribute(
      '[aria-label="Go to next page"]',
      'tabindex'
    );
    if (tabIndex === "-1") {
      break;
    }

    await page.getByRole("button", { name: "Go to next page" }).click();
    await page.getAttribute(
      '[aria-label="Go to next page"]',
      'tabindex',
      value => value !== "-1"
    );
    nextPageButtonEnabled0 = (await page.getAttribute(
      '[aria-label="Go to next page"]',
      'tabindex'
    )) !== "-1";
  }

  // edit a new entry in fieldName
  await page.getByRole("checkbox", { name: settingstab.add }).click();
  await page.getByRole("button", { name: "edit" }).click();
  await page.getByLabel(fieldName).fill(settingstab.edit);
  await page.getByRole("button", { name: "Save" }).click();

  // Go to Bird & Wildlife Strike
  await page.getByRole("button", { name: settinngsButtonDropDown }).click();

  // Go to Bird & Wildlife Strike
  await page.getByRole("button", { name: settinngsButtonDropDown }).click();

  // Go to settingsButtonName
  await page.getByRole("button", { name: settingsButtonName }).click();

  // await page.getByRole("button", { name: "Rows per page: 10" }).click();
  // await page.getByRole("option", { name: "100" }).click();

  let nextPageButtonEnabled1 = (await page.getAttribute(
    '[aria-label="Go to next page"]',
    'tabindex'
  )) !== "-1";

  while (nextPageButtonEnabled1) {
    const tabIndex = await page.getAttribute(
      '[aria-label="Go to next page"]',
      'tabindex'
    );
    if (tabIndex === "-1") {
      break;
    }

    await page.getByRole("button", { name: "Go to next page" }).click();
    await page.getAttribute(
      '[aria-label="Go to next page"]',
      'tabindex',
      value => value !== "-1"
    );
    nextPageButtonEnabled1 = (await page.getAttribute(
      '[aria-label="Go to next page"]',
      'tabindex'
    )) !== "-1";
  }

  // Delete a new entry in fieldName
  await page.getByRole("checkbox", { name: settingstab.edit }).click();
  await page.getByRole("button", { name: "delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();

  // Logout
  await page.getByRole("button", { name: "open profile" }).click();
  await page.getByRole("button", { name: "logout Logout" }).click();
  await expect(page).toHaveURL(creds.ip);
};

test("Aircraft Makes", async ({ page }) => {
  await performTest(page, "Aircraft Makes", "Aircraft Make", "Bird & Wildlife Strike");
});

test("Aircraft Models", async ({ page }) => {
  await performTest(page, "Aircraft Models", "Aircraft Model", "Bird & Wildlife Strike");
});