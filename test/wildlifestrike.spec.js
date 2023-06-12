import { test, expect } from "@playwright/test";
import { performLogout, performLogin } from "./login&logout";
import credentials from "./credentials";
import values, { selectAirport } from "./airport";
import { checkWithMenu, selectMapPoint } from "./map";
import { addIncidentInformation, addAircraftInformation, addAircraftdamage, addeffectsOnFlight, addWildlifeSpecies } from "./wildlife";

test.use({
  geolocation: { latitude: 37.7749, longitude: -122.4194 },
  permissions: ["geolocation"]
});

test("Wildlife Strike", async ({ page }) => {

  await performLogin(page, credentials.email, credentials.password, true);

  // Select the Airport
  await selectAirport(page, values.Airport1);

  
  await page.getByRole("button", { name: "Bird & Wildlife" }).click();
  await page.waitForTimeout(1000);

  // Select the point on map
  const point = await selectMapPoint(page);
  await page.mouse.click(point[0], point[1], { button: "left" });

  await checkWithMenu(page);
  await page.mouse.click(point[0], point[1], { button: "left" });
  await page.getByRole("menuitem", { name: "Wildlife Strike" }).click();

  await addIncidentInformation(page);

  await addAircraftInformation(page);

  await addAircraftdamage(page); 

  await addeffectsOnFlight(page);

  await addWildlifeSpecies(page, 0);
  
  //  await page.getByRole("button", { name: "TP132" }).click();

  // await page.getByRole("button", { name: "Comments" }).click();

  await page.getByRole("button", { name: "Cancel" }).click();
  // await page.getByRile("button", { name: "" }).click();
  
  // Logout
  await performLogout(page);
});