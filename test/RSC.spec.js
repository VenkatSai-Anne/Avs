import { test, expect } from "@playwright/test";
import { login, logout } from "./login&logout";
import credentials from "./credentials";

test("RSC", async ({ page }) => {
  await login(page, credentials);

  //Select the Airport
  await page.getByRole("button", { name: "Airport" }).click();
  await page.getByRole("option", { name: "Ottawa Macdonald-Cartier International Airport" }).click();

  // Go to RSC
  await page.getByRole("button", { name: "WinterOps RSC" }).click();

  // Check No Winter Maintenance
  await page.getByRole("radio", { name: "No Winter Maintenance" }).click();
  
  // Validate weather No Winter Maintenance is checked
  expect(await page.getByRole("radio", { name: "No Winter Maintenance" }).isChecked()).toBe(true);

  // Check Report Surface Conditions
  await page.getByRole("radio", { name: "Report Surface Conditions" }).click();
  
  // Validate weather Report Surface Conditions is checked
  expect(await page.getByRole("radio", { name: "Report Surface Conditions" }).isChecked()).toBe(true);

  //Select the Valid To time
  await page.locator("#valid-to-type").click();
  await page.getByRole("option", { name: "Match NOTAM End Time" }).click();
  await page.locator("#valid-to-type").click();
  await page.getByRole("option", { name: "8 Hours From Now" }).click();
  await page.locator("#valid-to-type").click();
  await page.getByRole("option", { name: "Specify" }).click();
  expect(await page.isVisible('label:has-text("Report \'Valid To\' Must Be In The Future")'));
  
  await page.getByRole('textbox', { name: 'Choose date' }).click();
  await page.getByRole("button", { name: "OK" }).click();

  await page.getByRole('textbox', { name: 'Choose date' }).click();
  await page.getByRole("button", { name: "Cancel" }).click();

  await page.getByRole('textbox', { name: 'Choose date' }).click();
  await page.getByRole('button', { name: 'calendar view is open, go to text input view' }).click();
  await page.getByRole("button", { name: "Cancel" }).click();

  await page.getByRole('textbox', { name: 'Choose date' }).click();
  // await page.getByRole('button', { name: 'calendar view is open, go to text input view' }).click();

  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Click the input field to select the value
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Get the value of the input field
  let fieldValue = await page.inputValue('input[placeholder="mmmm dd, yyyy    hh:mm"]');
  console.log("Field value:", fieldValue);

  // Extract the date and hour from the field value
  const [date, time] = fieldValue.split("    ");
  const [month, day, year] = date.split(" ");
  const [hour, minute] = time.split(":");

  // Increment the hour by 1, considering the condition
  let updatedHour;
  let updatedDay;
  if (parseInt(hour) === 23) {
  updatedHour = "00";
  updatedDay = parseInt(day) + 1;
  } else {
  updatedHour = (parseInt(hour) + 1).toString().padStart(2, "0");
  updatedDay = day;
  }

  // Update the field value with the modified hour and day
  const updatedFieldValue = `${month} ${updatedDay}, ${year}    ${updatedHour}:${minute}`;
  console.log("Updated field value:", updatedFieldValue);

  // Update the input field with the modified value
  await page.fill('input[placeholder="mmmm dd, yyyy    hh:mm"]', updatedFieldValue);

  // check for exception
  expect(await page.isVisible('label:has-text("Report \'Valid To\' Must Be In The Future")'));
  
  //Click ok
  await page.getByRole("button", { name: "OK" }).click();

  //Click set to now button
  await page.getByRole("button", { name: "Set to now" }).click();
  
  // Click Clear Runway Settings
  await page.getByRole("button", { name: "Clear Runway Settings" }).click();
  await page.getByRole("button", { name: "No" }).click();
  
  await page.getByRole("button", { name: "Clear Runway Settings" }).click();
  await page.getByRole("button", { name: "Yes" }).click();

  // Logout
  await logout(page);
});

test("Runway Conditions", async ({ page }) => {
  await login(page, credentials);

  //Select the Airport
  await page.getByRole("button", { name: "Airport" }).click();
  await page.getByRole("option", { name: "Ottawa Macdonald-Cartier International Airport" }).click();

  // Go to RSC
  await page.getByRole("button", { name: "WinterOps RSC" }).click();

  // Check Runway Conditions
  await page.getByRole("radio", { name: "Fully Cleared" }).click();
  await page.getByRole("radio", { name: "Cleared Width - Centered" }).click();
  expect(await page.isVisible('label:has-text("You Must Select A Cleared Width")'));
  await page.getByRole('radiogroup').filter({ hasText: 'Fully ClearedCleared Width - CenteredCleared Width (FT)Cleared Width - OffsetCle' }).getByRole('button', { name: '​' }).first().click();
  await page.getByRole('option', { name: '80' }).click();
  await page.getByRole("radio", { name: "Cleared Width - Offset" }).click();
  expect(await page.isVisible('label:has-text("You Must Select A Cleared Width")'));
  await page.getByRole('radiogroup').filter({ hasText: 'Fully ClearedCleared Width - CenteredCleared Width (FT)Cleared Width - OffsetCle' }).getByRole('button', { name: '​' }).nth(1).click();
  await page.getByRole('option', { name: '80' }).click();
  expect(await page.isVisible('label:has-text("You Must Select An Offset Direction")'));
  await page.getByRole("radio", { name: "NORTH" }).click();
  await page.getByRole("radio", { name: "SOUTH" }).click();
  await page.getByRole("checkbox", { name: "Surface Packed" }).click();
  await page.getByRole("checkbox", { name: "Surface Graded" }).click();
  await page.getByRole("checkbox", { name: "Surface Scarified" }).click();

  // expect(await page.isVisible('label:has-text("Lower Threshold - First Contaminant - Contaminant Has Not Been Set")'));
  expect(await page.isVisible('label:has-text("First Contaminant - Contaminant Has Not Been Set")'));
  await page.getByRole("checkbox", { name: "Slippery When Wet" }).click();
  await page.locator('.MuiBox-root > div > div:nth-child(2) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: '40' }).click();
  // expect(await page.isVisible('label:has-text("Lower Threshold - First Contaminant - Not Specified")'));
  expect(await page.isVisible('label:has-text("First Contaminant - Not Specified")'));
  await page.locator('.MuiBox-root > div > div:nth-child(3) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: "ICE", exact: true }).click();
  await page.locator('.MuiBox-root > div:nth-child(2) > div:nth-child(2) > .MuiInputBase-root > .MuiSelect-select').first().click();

  await page.getByRole('option', { name: '60' }).click();
  await page.locator('.MuiBox-root > div:nth-child(2) > div:nth-child(3) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: "WET ICE", exact: true }).click();
  // await page.getByRole("checkbox", { name: "Apply To All Runway Thirds" }).click();


  // Logout
  await logout(page);
});