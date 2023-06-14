import { test, expect } from "@playwright/test";
import { performLogin, performLogout } from "./login&logout";
import credentials from "./credentials";
import values, { selectAirport } from "./airport";
import { runwaySelection, snowbankBesideRunway, validTo, clearRsc, otherLocalizedConditions, conditionsOnRunway, runTreatments, remarksSection, runwayFriction, runwayConditions } from "./rsc";

test.use({
  geolocation: { latitude: 37.7749, longitude: -122.4194 },
  permissions: ["geolocation"]
});

test("RSC1", async ({ page }) => {
  await performLogin(page, credentials.email, credentials.password, true);

  // Select the Airport
  await selectAirport(page, values.Airport1);

  // Go to RSC
  await page.getByRole("button", { name: "WinterOps RSC" }).click();
  await runwaySelection(page);
  await validTo(page);

  // await clearRsc(page);
  
  await page.getByRole("button", { name: "Clear Runway Settings" }).click();
  await page.getByRole("button", { name: "No" }).click();

  // Logout
  await performLogout(page);
});

test("RSC2", async ({ page }) => {
  await performLogin(page, credentials.email, credentials.password, true);

  // Select the Airport
  await selectAirport(page, values.Airport1);

  // Go to RSC
  await page.getByRole("button", { name: "WinterOps RSC" }).click();
  
  await page.getByRole('button', { name: 'Conditions on Runway' }).click();
  await conditionsOnRunway(page);
  // Logout
  await performLogout(page);
});

test("RSC3", async ({ page }) => {
  await performLogin(page, credentials.email, credentials.password, true);

  // Select the Airport
  await selectAirport(page, values.Airport1);

  // Go to RSC
  await page.getByRole("button", { name: "WinterOps RSC" }).click();

  await page.getByRole("button", { name: "Remarks" }).click();
  await remarksSection(page);

  await snowbankBesideRunway(page);

  // Logout
  await performLogout(page);
});

test("RSC4", async ({ page }) => {
  await performLogin(page, credentials.email, credentials.password, true);

  // Select the Airport
  await selectAirport(page, values.Airport1);

  // Go to RSC
  await page.getByRole("button", { name: "WinterOps RSC" }).click();

  await page.getByRole("button", { name: "Runway Conditions" }).click();
  await runwayConditions(page);

  await page.getByRole("button", { name: "Runway Friction" }).click();
  await runwayFriction(page);
  
  // Logout
  await performLogout(page);
});

test("RSC5", async ({ page }) => {
  await performLogin(page, credentials.email, credentials.password, true);

  // Select the Airport
  await selectAirport(page, values.Airport1);

  // Go to RSC
  await page.getByRole("button", { name: "WinterOps RSC" }).click();

  await page.getByRole("button", { name: "Treatments" }).click();
  await runTreatments(page);

  await page.getByRole('button', { name: 'Other Localized Conditions' }).click();
  await otherLocalizedConditions(page);
  
  // Logout
  await performLogout(page);
});
