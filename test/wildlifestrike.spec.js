import { test, expect } from "@playwright/test";
import { login, logout } from "./login&logout";
import credentials from "./credentials";

test.use({
  geolocation: { latitude: 37.7749, longitude: -122.4194 },
  permissions: ["geolocation"]
});

test("Wildlife Strike", async ({ page }) => {

  await login(page, credentials);

  // Select the Airport
  await page.getByRole("button", { name: "Airport" }).click();
  await page.getByRole("option", { name: "Ottawa Macdonald-Cartier International Airport" }).click();
  
  await page.getByRole("button", { name: "Bird & Wildlife" }).click();
  
  const element = page.locator(".MuiBox-root.css-12o3yan");
  const boundingBox = await element.boundingBox();

  const x = Math.floor(Math.random() * boundingBox.width) + boundingBox.x;
  const y = Math.floor(Math.random() * boundingBox.height) + boundingBox.y;  

  console.log(x, y);
  await page.waitForTimeout(1000)
  await page.mouse.click(x, y, { button: "left" }); 
  await page.getByRole('button', { name: 'Close popup' }).click();
  await page.getByRole('button', { name: 'Marker' }).click(); 
  await page.getByRole("menuitem", { name: "Wildlife Strike" }).click();

  await page.getByRole("tab", { name: "Incident information" }).click();
  
  
  // Click on the combobox
  await page.locator("#report_type").click();
  await page.getByRole("option", { name: "Bird Strike" }).click();
  await page.locator("#reporting_source_id").click();
  await page.getByRole("option", { name: "Pilot" }).click();
  await page.locator("#flight_phase_id").click();
  await page.getByRole("option", { name: "Climb" }).click();
  await page.locator("#cloud_cover_id").click();
  await page.getByRole("option", { name: "Overcast" }).click();
  await page.locator("#light_condition_id").click();
  await page.getByRole("option", { name: "Day" }).click();
  await page.locator("#precipitation_id").click();
  await page.getByRole("option", { name: "Rain" }).click();
  await page.getByLabel("Aircraft Height").fill("01");
  await page.locator('input[name="aircraft_speed"]').fill("02");
  await page.locator('input[name="distance_from_airport"]').fill("03");

  await page.getByRole("tab", { name: "Aircraft information" }).click();
  await page.getByRole('listbox', { name: 'Aircraft Make' }).click();
  await page.getByRole("option", { name: "Aesl Nz" }).click();
  await page.locator("#aircraft_model_id").click();
  await page.getByRole("option", { name: "1329" }).click();
  await page.locator("#engine_make_id").click();
  await page.getByRole("option", { name: "Alvis" }).click();
  await page.locator("#engine_type_id").click();
  await page.getByRole("option", { name: "Prop" }).click();
  // await page.locate("#operator_name_id").click();
  await page.getByLabel("Flight Number").fill("w1");
  await page.locator('input[name="aircraft_registration"]').fill("w2");

  await page.getByRole("tab", { name: "Aircraft damage" }).click();
  await page.getByRole("button", { name: "Radome" }).click();
  await page.getByRole("button", { name: "Radome : Struck" }).click();   
  await page.getByRole("tab", { name: "Effects on Flight" }).click();
  await page.getByRole("tab", { name: "Wilflife species" }).click();
  await page.getByRole("option", { name: "Bird Strike" }).click();
  await page.locator("#wildlife_family_id").click();
  await page.getByRole("option", { name: "Bird Strike" }).click();
  await page.locator("#wildlife_genus_id").click();
  await page.getByRole("option", { name: "Bird Strike" }).click();
  await page.locator("#species").click();
  await page.getByRole("option", { name: "Bird Strike" }).click();
  await page.getByLabel("Number of birds seen").fill();
  await page.getByRole("option", { name: "Bird Strike" }).click();
  await page.locator('input[name="number_struck"]').fill();
  await page.getByRole("option", { name: "Bird Strike" }).click();
  await page.getByLabel("Wildlife remains collected").check();
  await page.getByRole("option", { name: "Bird Strike" }).click();
  await page.getByLabel("Wildlife remains submitted for identification").check();
  
  //  await page.getByRole("button", { name: "TP132" }).click();

  // await page.getByRole("button", { name: "Comments" }).click();

  await page.getByRole("button", { name: "Cancel" }).click();
  // await page.getByRile("button", { name: "" }).click();
  
  // Logout
  await logout(page);
});
