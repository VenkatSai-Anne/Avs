import { test, expect } from "@playwright/test";
import { performLogout, performLogin } from "./login&logout";
import credentials from "./credentials";

test.use({
  geolocation: { latitude: 37.7749, longitude: -122.4194 },
  permissions: ["geolocation"]
});

test("Wildlife Strike", async ({ page }) => {

  await performLogin(page, credentials.email, credentials.password, true);

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
  await page.getByRole('button', { name: 'Marker' }).first().click();
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
  await page.locator("#aircraft_make_id").click();
  await page.getByRole("option", { name: "Aesl Nz" }).click();
  await page.locator("#aircraft_model_id").click();
  await page.getByRole("option", { name: "1329" }).click();
  await page.locator("#engine_make_id").click();
  await page.getByRole("option", { name: "Alvis" }).click();
  await page.locator("#engine_type_id").click();
  await page.getByRole("option", { name: "Radial" }).click();
  // await page.locate("#operator_name_id").click();
  await page.getByLabel("Flight Number").fill("w1");
  await page.locator('input[name="aircraft_registration"]').fill("w2");

  await page.getByRole("tab", { name: "Aircraft damage" }).click();
  await page.getByRole("button", { name: "Radome", exact: true }).click();
  await page.getByRole("button", { name: "Radome : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Windshield", exact: true }).click();
  await page.getByRole("button", { name: "Windshield : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Nose", exact: true }).click();
  await page.getByRole("button", { name: "Nose : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Propeller", exact: true }).click();
  await page.getByRole("button", { name: "Propeller : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Engine #1", exact: true }).click();
  await page.getByRole("button", { name: "Engine #1 : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Wings", exact: true }).click();
  await page.getByRole("button", { name: "Wings : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Engine #2", exact: true }).click();
  await page.getByRole("button", { name: "Engine #2 : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Rotor", exact: true }).click();
  await page.getByRole("button", { name: "Rotor : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Engine #3", exact: true }).click();
  await page.getByRole("button", { name: "Engine #3 : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Fuselage", exact: true }).click();
  await page.getByRole("button", { name: "Fuselage : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Engine #4", exact: true }).click();
  await page.getByRole("button", { name: "Engine #4 : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Landing Gear", exact: true }).click();
  await page.getByRole("button", { name: "Landing Gear : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Tail", exact: true }).click();
  await page.getByRole("button", { name: "Tail : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Lights", exact: true }).click();
  await page.getByRole("button", { name: "Lights : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Pitot Static", exact: true }).click();
  await page.getByRole("button", { name: "Pitot Static : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Tail Rotor", exact: true }).click();
  await page.getByRole("button", { name: "Tail Rotor : Struck", exact: true }).click();
  await page.getByRole("button", { name: "Other", exact: true }).click();
  await page.getByRole("button", { name: "Other : Struck", exact: true }).click();   
  await page.getByRole("tab", { name: "Effects on Flight" }).click();
  await page.getByRole("button", { name: "Aborted Takeoff", exact: true }).click();
  await page.getByRole("button", { name: "Penetration of Airframe", exact: true }).click();
  await page.getByRole("button", { name: "Precautionary Landing", exact: true }).click();
  await page.getByRole("button", { name: "Vision Obscured", exact: true }).click();
  await page.getByRole("button", { name: "Engine(s) Shut Down", exact: true }).click();
  await page.getByRole("button", { name: "Engine Ingestion", exact: true }).click();
  await page.getByRole("button", { name: "Forced Landing", exact: true }).click();
  await page.getByRole("button", { name: "Engine Uncontained Failure", exact: true }).click();
  await page.getByRole("button", { name: "Fire", exact: true }).click();
  await page.getByRole("button", { name: "Other", exact: true }).click();
  await page.getByRole("tab", { name: "Wildlife species" }).click();
  await page.locator("#wildlife_family_id").click();
  await page.getByRole("option", { name: "Birds of Prey" }).click();
  await page.locator("#wildlife_genus_id").click();
  await page.getByRole("option", { name: "Eagle" }).click();
  await page.locator("#species").click();
  await page.getByRole("option", { name: "Eagles" }).click();
  await page.locator('input[name="number_struck"]').fill("08");
  await page.getByLabel('Number Of Birds Seen').fill('07');
  await page.getByLabel('Remains Collected').check();
  await page.getByLabel('Medium').click();
  await page.getByLabel('Remains Submitted For Identification').check();
  await page.getByLabel('Yes').check();
  
  //  await page.getByRole("button", { name: "TP132" }).click();

  // await page.getByRole("button", { name: "Comments" }).click();

  await page.getByRole("button", { name: "Cancel" }).click();
  // await page.getByRile("button", { name: "" }).click();
  
  // Logout
  await performLogout(page);
});
