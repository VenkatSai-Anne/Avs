import { test, expect } from "@playwright/test";

export async function runwaySelection(page) {

await page.getByRole('button', { name: 'RWY-07/25' }).click();
await page.getByRole('option').nth(1).click();

// Check No Winter Maintenance
await page.getByRole("radio", { name: "No Winter Maintenance" }).click();

// Validate weather No Winter Maintenance is checked
expect(await page.getByRole("radio", { name: "No Winter Maintenance" }).isChecked()).toBe(true);

await page.getByRole('button', { name: 'RWY-04/22' }).click();
await page.getByRole('option').nth(2).click();

// Check No Winter Maintenance
await page.getByRole("radio", { name: "No Winter Maintenance" }).click();

// Validate weather No Winter Maintenance is checked
expect(await page.getByRole("radio", { name: "No Winter Maintenance" }).isChecked()).toBe(true);

await page.getByRole('button', { name: 'RWY-14/32' }).click();
await page.getByRole('option').nth(0).click();

// Check Report Surface Conditions
await page.getByRole("radio", { name: "Report Surface Conditions" }).click();

// Validate weather Report Surface Conditions is checked
expect(await page.getByRole("radio", { name: "Report Surface Conditions" }).isChecked()).toBe(true);
}

export async function validTo(page) {
  //Select the Valid To time
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

  await timeChange(page);

  // check for exception
  expect(await page.isVisible('label:has-text("Report \'Valid To\' Must Be In The Future")'));
  
  //Click ok
  await page.getByRole("button", { name: "OK" }).click();

  //Click set to now button
  await page.getByRole("button", { name: "Set to now" }).click();

  await page.locator("#valid-to-type").click();
  await page.getByRole("option", { name: "Match NOTAM End Time" }).click();
}

export async function snowbankBesideRunway(page) {
    // Check Snowbanks Beside Runway
  await page.getByRole("button", { name: "Snowbanks Beside Runway" }).click();
  await page.getByLabel('Snowbank Adjacent To Runway NORTH').click();
  await page.getByLabel('Snowbank Is Along Runway Edge').first().click();
  await page.getByLabel('Set Distance From Runway Edge').first().click();
  await page.getByLabel('Distance FT').first().fill("a");
  expect(await page.isVisible('label:has-text("Distance From Runway Edge - NORTH - Must Be A Valid Number Between 0 and 14000")'));
  await page.getByLabel('Distance FT').first().fill("2");
  await page.getByLabel('Snowbank Adjacent To Runway SOUTH').click();
  await page.getByLabel('Snowbank Is Along Runway Edge').first().click();
  await page.getByLabel('Set Distance From Runway Edge').first().click();
  await page.getByLabel('Distance FT').first().fill("a");
  expect(await page.isVisible('label:has-text("Distance From Runway Edge - NORTH - Must Be A Valid Number Between 0 and 14000")'));
  await page.getByLabel('Distance FT').first().fill("2");
  expect(await page.isVisible('label:has-text("Snowbank Maximum Height Has Not Been Set")'));
  await page.getByLabel('FT', { exact: true }).click("2");
  await page.getByLabel('IN', { exact: true }).click("2");
}

export async function timeChange(page) {

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

}


export async function clearRsc(page) {
  // Click Clear Runway Settings
  await page.getByRole("button", { name: "Clear Runway Settings" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
}

export async function otherLocalizedConditions(page) {
  await page.getByRole('tab', { name: 'Ice Patches' }).click();
  await page.getByRole('button', { name: 'Add Ice Patch' }).first().click();
  await page.getByRole('button', { name: '​' }).first().click();
  await page.getByRole('option').nth(1).click();
  await page.getByRole('button', { name: '​', exact: true }).click();
  await page.getByRole('option', { name: '700', exact: true }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: '700 FT 25' }).click();
  await page.getByRole('button', { name: 'Edit Ice Patch' }).first().click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('row', { name: '700 FT 25' }).click();
  await page.getByRole('button', { name: 'Edit Ice Patch' }).first().click();
  await page.getByRole('button', { name: 'Ok' }).click();
  // await page.getByRole('row', { name: '700 FT 25' }).click();
  await page.getByRole('button', { name: 'Delete Ice Patch'}).first().click();
  await page.getByRole('button', { name: 'No' }).click();
  // await page.getByRole('row', { name: '700 FT 25' }).click();
  await page.getByRole('button', { name: 'Delete Ice Patch'}).first().click();
  await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('tab', { name: 'Compacted Snow Patches' }).click();
  // await page.getByRole('button', { name: 'Add Compacted Snow Patch' }).first().click();
  // await page.getByRole('button', { name: '​' }).first().click();
  // await page.getByRole('option').nth(1).click();
  // await page.getByRole('button', { name: '​', exact: true }).click();
  // await page.getByRole('option', { name: '700', exact: true }).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('row', { name: '700 FT 25' }).click();
  // await page.getByRole('button', { name: 'Edit Compacted Snow Patch' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('row', { name: '700 FT 25' }).click();
  // await page.getByRole('button', { name: 'Edit Compacted Snow Patch' }).first().click();
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('row', { name: '700 FT 25' }).click();
  // await page.getByRole('button', { name: 'Delete Compacted Snow Patch'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('row', { name: '700 FT 25' }).click();
  // await page.getByRole('button', { name: 'Delete Compacted Snow Patch'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('tab', { name: 'Standing Water Patch' }).click();
  // await page.getByRole('button', { name: 'Add Standing Water Patch' }).first().click();
  // await page.getByRole('button', { name: '​' }).first().click();
  // await page.getByRole('option').nth(1).click();
  // await page.getByRole('button', { name: '​', exact: true }).click();
  // await page.getByRole('option', { name: '700', exact: true }).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('row', { name: '700 FT 25' }).click();
  // await page.getByRole('button', { name: 'Edit Standing Water Patch' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('row', { name: '700 FT 25' }).click();
  // await page.getByRole('button', { name: 'Edit Standing Water Patch' }).first().click();
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('row', { name: '700 FT 25' }).click();
  // await page.getByRole('button', { name: 'Delete Standing Water Patch'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('row', { name: '700 FT 25' }).click();
  // await page.getByRole('button', { name: 'Delete Standing Water Patch'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
}

export async function conditionsOnRunway(page) {
  
  await page.getByRole('button', { name: 'Add Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Add Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  await page.getByRole('option', { name: 'Along Cleared Width' }).click();
  await page.getByLabel('FT', { exact: true }).fill("2");
  await page.getByLabel('IN', { exact: true }).fill("2");
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Along Cleared Width 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('row', { name: 'Along Cleared Width 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  await page.getByRole('button', { name: 'edit Snowbank' }).first().click();
  await page.getByLabel('FT', { exact: true }).fill("3");
  await page.getByLabel('IN', { exact: true }).fill("3");
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByRole('row', { name: 'Along Cleared Width 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'No' }).click();
  await page.getByRole('row', { name: 'Along Cleared Width 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Add Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  await page.getByRole('option', { name: 'Along Inside Runway Edge' }).click();
  await page.getByLabel('FT', { exact: true }).fill("2");
  await page.getByLabel('IN', { exact: true }).fill("2");
  await page.getByLabel('NORTH side').click();
  await page.getByRole('button', { name: '​' }).nth(1).click();
  await page.getByRole('option', { name: '30' }).click();
  await page.getByLabel('SOUTH side').click();
  await page.getByRole('button', { name: '​' }).nth(2).click();
  await page.getByRole('option', { name: '30' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByLabel('FT', { exact: true }).click("3");
  await page.getByLabel('IN', { exact: true }).click("3");
  await page.getByRole('button', { name: 'Ok' }).click();
  // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'No' }).click();
  // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Add Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  await page.getByRole('option', { name: 'Distance From Center Line' }).click();
  await page.getByLabel('FT', { exact: true }).fill("2");
  await page.getByLabel('IN', { exact: true }).fill("2");
  await page.getByLabel('NORTH side').click();
  await page.getByRole('button', { name: '​' }).nth(1).click();
  await page.getByRole('option', { name: '30' }).click();
  await page.getByLabel('SOUTH side').click();
  await page.getByRole('button', { name: '​' }).nth(2).click();
  await page.getByRole('option', { name: '30' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByLabel('FT', { exact: true }).click("3");
  await page.getByLabel('IN', { exact: true }).click("3");
  await page.getByRole('button', { name: 'Ok' }).click();
  // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 3 FT 3 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'No' }).click();
  // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Add Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  await page.getByRole('option', { name: 'Distance From Threshold' }).click();
  await page.getByLabel('FT', { exact: true }).fill("2");
  await page.getByLabel('IN', { exact: true }).fill("2");
  await page.getByRole('button', { name: '​' }).nth(1).click();
  await page.getByRole('option').nth(1).click();
  await page.getByRole('button', { name: '​' }).nth(2).click();
  await page.getByRole('option', { name: '700', exact: true }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByLabel('FT', { exact: true }).click("3");
  await page.getByLabel('IN', { exact: true }).click("3");
  await page.getByRole('button', { name: 'Ok' }).click();
  // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'No' }).click();
  // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Add Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  await page.getByRole('option', { name: 'Across Intersection From Runway' }).click();
  await page.getByLabel('FT', { exact: true }).fill("2");
  await page.getByLabel('IN', { exact: true }).fill("2");
  await page.getByRole('button', { name: '​' }).nth(1).click();
  await page.getByRole('option').nth(1).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 14/32' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 14/32' }).click();
  await page.getByRole('button', { name: 'Edit Snowbank' }).first().click();
  await page.getByLabel('FT', { exact: true }).click("3");
  await page.getByLabel('IN', { exact: true }).click("3");
  await page.getByRole('button', { name: 'Ok' }).click();
  // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'No' }).click();
  // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  await page.getByRole('button', { name: 'Delete Snowbank'}).first().click();
  await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('tab', { name: 'Windrows' }).click();
  // await page.getByRole('button', { name: 'Add Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('button', { name: 'Add Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Along Cleared Width' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('row', { name: 'Along Cleared Width 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('row', { name: 'Along Cleared Width 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByLabel('FT', { exact: true }).fill("3");
  // await page.getByLabel('IN', { exact: true }).fill("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // await page.getByRole('row', { name: 'Along Cleared Width 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // await page.getByRole('row', { name: 'Along Cleared Width 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Add Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Along Inside Runway Edge' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByLabel('NORTH side').click();
  // await page.getByRole('button', { name: '​' }).nth(1).click();
  // await page.getByRole('option', { name: '30' }).click();
  // await page.getByLabel('SOUTH side').click();
  // await page.getByRole('button', { name: '​' }).nth(2).click();
  // await page.getByRole('option', { name: '30' }).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByLabel('FT', { exact: true }).click("3");
  // await page.getByLabel('IN', { exact: true }).click("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Add Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Distance From Center Line' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByLabel('NORTH side').click();
  // await page.getByRole('button', { name: '​' }).nth(1).click();
  // await page.getByRole('option', { name: '30' }).click();
  // await page.getByLabel('SOUTH side').click();
  // await page.getByRole('button', { name: '​' }).nth(2).click();
  // await page.getByRole('option', { name: '30' }).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByLabel('FT', { exact: true }).click("3");
  // await page.getByLabel('IN', { exact: true }).click("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 3 FT 3 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Add Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Distance From Threshold' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByRole('button', { name: '​' }).nth(1).click();
  // await page.getByRole('option').nth(1).click();
  // await page.getByRole('button', { name: '​', exact: true }).click();
  // await page.getByRole('option', { name: '700', exact: true }).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByLabel('FT', { exact: true }).click("3");
  // await page.getByLabel('IN', { exact: true }).click("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Add Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Across Intersection From Runway' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByRole('button', { name: '​' }).nth(1).click();
  // await page.getByRole('option').nth(1).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  // await page.getByRole('button', { name: 'Edit Windrows' }).first().click();
  // await page.getByLabel('FT', { exact: true }).click("3");
  // await page.getByLabel('IN', { exact: true }).click("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  // await page.getByRole('button', { name: 'Delete Windrows'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('tab', { name: 'Snowdrifts' }).click();
  // await page.getByRole('button', { name: 'Add Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('button', { name: 'Add Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Along Cleared Width' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('row', { name: 'Along Cleared Width 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.getByRole('row', { name: 'Along Cleared Width 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByLabel('FT', { exact: true }).fill("3");
  // await page.getByLabel('IN', { exact: true }).fill("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // await page.getByRole('row', { name: 'Along Cleared Width 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // await page.getByRole('row', { name: 'Along Cleared Width 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Add Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Along Inside Runway Edge' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByLabel('NORTH side').click();
  // await page.getByRole('button', { name: '​' }).nth(1).click();
  // await page.getByRole('option', { name: '30' }).click();
  // await page.getByLabel('SOUTH side').click();
  // await page.getByRole('button', { name: '​' }).nth(2).click();
  // await page.getByRole('option', { name: '30' }).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByLabel('FT', { exact: true }).click("3");
  // await page.getByLabel('IN', { exact: true }).click("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 3 FT 3 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('row', { name: 'Along Inside Runway Edge - 30 FT to the NORTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Along Inside Runway Edge - 30 FT to the NORTH' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Add Windrows' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Distance From Center Line' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByLabel('NORTH side').click();
  // await page.getByRole('button', { name: '​' }).nth(1).click();
  // await page.getByRole('option', { name: '30' }).click();
  // await page.getByLabel('SOUTH side').click();
  // await page.getByRole('button', { name: '​' }).nth(2).click();
  // await page.getByRole('option', { name: '30' }).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByLabel('FT', { exact: true }).click("3");
  // await page.getByLabel('IN', { exact: true }).click("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 3 FT 3 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('row', { name: 'Distance From Center Line - 30 FT to the SOUTH 2 FT 2 IN' }).getByRole('rowheader', { name: 'Distance From Center Line - 30 FT to the SOUTH' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Add Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Distance From Threshold' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByRole('button', { name: '​' }).nth(1).click();
  // await page.getByRole('option').nth(1).click();
  // await page.getByRole('button', { name: '​', exact: true }).click();
  // await page.getByRole('option', { name: '700', exact: true }).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByLabel('FT', { exact: true }).click("3");
  // await page.getByLabel('IN', { exact: true }).click("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('rowheader', { name: 'Distance From Threshold - 700 FT from 25' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Add Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Along Cleared Width' }).click();
  // await page.getByRole('option', { name: 'Across Intersection From Runway' }).click();
  // await page.getByLabel('FT', { exact: true }).fill("2");
  // await page.getByLabel('IN', { exact: true }).fill("2");
  // await page.getByRole('button', { name: '​' }).nth(1).click();
  // await page.getByRole('option').nth(1).click();
  // await page.getByRole('button', { name: 'Add' }).click();
  // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  // await page.getByRole('button', { name: 'Edit Snowdrifts' }).first().click();
  // await page.getByLabel('FT', { exact: true }).click("3");
  // await page.getByLabel('IN', { exact: true }).click("3");
  // await page.getByRole('button', { name: 'Ok' }).click();
  // // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'No' }).click();
  // // await page.getByRole('rowheader', { name: 'Across Intersection From Runway: 04/22' }).click();
  // await page.getByRole('button', { name: 'Delete Snowdrifts'}).first().click();
  // await page.getByRole('button', { name: 'Yes' }).click();
}




export async function remarksSection(page) {
  // Check Remarks
  
  await page.getByLabel('Clearing/Sweeping In Progress').click();
  await page.getByLabel('Conditions Changing Rapidly').click();
  await page.getByLabel('Expected To Be Cleared By').click();
  const inputElements8 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement8 = inputElements8.first();
  await firstInputElement8.click();
  await page.getByRole("button", { name: "OK" }).click();

  const inputElements9 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement9 = inputElements9.first();
  await firstInputElement9.click();
  await page.getByRole("button", { name: "Cancel" }).click();

  const inputElements10 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement10 = inputElements10.first();
  await firstInputElement10.click();
  await page.getByRole('button', { name: 'calendar view is open, go to text input view' }).click();
  await page.getByRole("button", { name: "Cancel" }).click();

  const inputElements11 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement11 = inputElements11.first();
  await firstInputElement11.click();
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Click the input field to select the value
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Get the value of the input field
  let fieldValue5 = await page.inputValue('input[placeholder="mmmm dd, yyyy    hh:mm"]');
  console.log("Field value:", fieldValue5);

  // Extract the date and hour from the field value
  const [date5, time5] = fieldValue5.split("    ");
  const [month5, day5, year5] = date5.split(" ");
  const [hour5, minute5] = time5.split(":");

  // Increment the hour by 1, considering the condition
  let updatedHour5;
  let updatedDay5;
  if (parseInt(hour5) === 23) {
  updatedHour5 = "00";
  updatedDay5 = parseInt(day5) + 1;
  } else {
  updatedHour5 = (parseInt(hour5) + 1).toString().padStart(2, "0");
  updatedDay5 = day5;
  }

  // Update the field value with the modified hour and day
  const updatedFieldValue5 = `${month5} ${updatedDay5}, ${year5}    ${updatedHour5}:${minute5}`;
  console.log("Updated field value:", updatedFieldValue5);

  // Update the input field with the modified value
  await page.fill('input[placeholder="mmmm dd, yyyy    hh:mm"]', updatedFieldValue5);

  // Click OK
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByLabel('Next Observation At').click();
  const inputElements12 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement12 = inputElements12.nth(1);
  await firstInputElement12.click();
  await page.getByRole("button", { name: "OK" }).click();

  const inputElements13 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement13 = inputElements13.nth(1);
  await firstInputElement13.click();
  await page.getByRole("button", { name: "Cancel" }).click();

  const inputElements14 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement14 = inputElements14.nth(1);
  await firstInputElement14.click();
  await page.getByRole('button', { name: 'calendar view is open, go to text input view' }).click();
  await page.getByRole("button", { name: "Cancel" }).click();

  const inputElements15 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement15 = inputElements15.nth(1);
  await firstInputElement15.click();
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Click the input field to select the value
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Get the value of the input field
  let fieldValue4 = await page.inputValue('input[placeholder="mmmm dd, yyyy    hh:mm"]');
  console.log("Field value:", fieldValue4);

  // Extract the date and hour from the field value
  const [date4, time4] = fieldValue4.split("    ");
  const [month4, day4, year4] = date4.split(" ");
  const [hour4, minute4] = time4.split(":");

  // Increment the hour by 1, considering the condition
  let updatedHour4;
  let updatedDay4;
  if (parseInt(hour4) === 23) {
  updatedHour4 = "00";
  updatedDay4 = parseInt(day4) + 1;
  } else {
  updatedHour4 = (parseInt(hour4) + 1).toString().padStart(2, "0");
  updatedDay4 = day4;
  }

  // Update the field value with the modified hour and day
  const updatedFieldValue4 = `${month4} ${updatedDay4}, ${year4}    ${updatedHour4}:${minute4}`;
  console.log("Updated field value:", updatedFieldValue4);

  // Update the input field with the modified value
  await page.fill('input[placeholder="mmmm dd, yyyy    hh:mm"]', updatedFieldValue4);

  // Click OK
  await page.getByRole("button", { name: "OK" }).click();

  await page.getByRole('tab', { name: 'General Remarks' }).click();
  await page.getByLabel('English Remarks').fill("a");
  expect(await page.isVisible('label:has-text("General Remarks Contains Invalid Item \'Illegal Characters\'")'));
  await page.getByLabel('English Remarks').fill("A");
  await page.getByRole('tab', { name: 'Runway Remarks' }).click();
  await page.getByLabel('English Remarks').fill("a");
  expect(await page.isVisible('label:has-text("Runway Remarks Contains Invalid Item \'Illegal Characters\'")'));
  await page.getByLabel('English Remarks').fill("A");
  await page.getByRole('tab', { name: 'Taxiway Remarks' }).click();
  await page.getByLabel('English Remarks').fill("a");
  expect(await page.isVisible('label:has-text("Taxiway Remarks Contains Invalid Item \'Illegal Characters\'")'));
  await page.getByLabel('English Remarks').fill("A");
  await page.getByRole('tab', { name: 'Apron Remarks' }).click();
  await page.getByLabel('English Remarks').fill("a");
  expect(await page.isVisible('label:has-text("Apron Remarks Contains Invalid Item \'Illegal Characters\'")'));
  await page.getByLabel('English Remarks').fill("A");
}




export async function runwayFriction(page) {
  // Check Runway Friction
  
  await page.getByRole('button', { name: 'Set to now' }).click();
  await page.getByRole('textbox').nth(1).fill("a");
  expect(await page.isVisible('label:has-text("Ambient Temperature Value Is Not Valid. Must Be \'-61\' to \'+61\'")'));
  await page.getByRole('textbox').nth(1).fill("60");
  expect(await page.isVisible('label:has-text("You Must Specify CRFI Value, If You Specify Ambient Temperature")'));
  await page.getByRole('textbox').nth(2).fill("a");
  expect(await page.isVisible('label:has-text("CRFI Value Is Not Valid. Must Be \'01\' to \'99\'")'));
  await page.getByRole('textbox').nth(2).fill("60");
  expect(await page.isVisible('label:has-text("Observation Time Can Not Be In The Future")'));
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
  let fieldValue1 = await page.inputValue('input[placeholder="mmmm dd, yyyy    hh:mm"]');
  console.log("Field value:", fieldValue1);

  // Extract the date and hour from the field value
  const [date1, time1] = fieldValue1.split("    ");
  const [month1, day10, year1] = date1.split(" ");
  const [hour1, minute1] = time1.split(":");

  // Increment the hour by 1, considering the condition
  let updatedHour1;
  let updatedDay10;
  if (parseInt(hour1) === 23) {
  updatedHour1 = "00";
  updatedDay10 = parseInt(day10) + 1;
  } else {
  updatedHour1 = (parseInt(hour1) + 1).toString().padStart(2, "0");
  updatedDay10 = day10;
  }

  // Update the field value with the modified hour and day
  const updatedFieldValue1 = `${month1} ${updatedDay10}, ${year1}    ${updatedHour1}:${minute1}`;
  console.log("Updated field value:", updatedFieldValue1);

  // Update the input field with the modified value
  await page.fill('input[placeholder="mmmm dd, yyyy    hh:mm"]', updatedFieldValue1);

  //Click ok
  await page.getByRole("button", { name: "OK" }).click();
}



export async function runTreatments(page) {
  
  // Check Treatments
  
  await page.getByLabel('Sand Applied').click();
  await page.getByLabel('Application Time').nth(0).click();
  // await page.getByRole('textbox', { name: 'Choose date' }).click();
  const inputElements = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement = inputElements.first();
  await firstInputElement.click();
  await page.getByRole("button", { name: "OK" }).click();

  const inputElements1 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement1 = inputElements1.first();
  await firstInputElement1.click();
  await page.getByRole("button", { name: "Cancel" }).click();

  const inputElements2 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement2 = inputElements2.first();
  await firstInputElement2.click();
  await page.getByRole('button', { name: 'calendar view is open, go to text input view' }).click();
  await page.getByRole("button", { name: "Cancel" }).click();

  const inputElements3 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement3 = inputElements3.first();
  await firstInputElement3.click();
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Click the input field to select the value
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Get the value of the input field
  let fieldValue2 = await page.inputValue('input[placeholder="mmmm dd, yyyy    hh:mm"]');
  console.log("Field value:", fieldValue2);

  // Extract the date and hour from the field value
  const [date2, time2] = fieldValue2.split("    ");
  const [month2, day2, year2] = date2.split(" ");
  const [hour2, minute2] = time2.split(":");

  // Decrement the hour by 1, considering the condition
  let updatedHour2;
  let updatedDay2;
  if (parseInt(hour2) === 0) {
    updatedHour2 = "23";
    updatedDay2 = parseInt(day2) - 1;
  } else {
    updatedHour2 = (parseInt(hour2) - 1).toString().padStart(2, "0");
    updatedDay2 = day2;
  }

  // Update the field value with the modified hour and day
  const updatedFieldValue2 = `${month2} ${updatedDay2}, ${year2}    ${updatedHour2}:${minute2}`;
  console.log("Updated field value:", updatedFieldValue2);

  // Update the input field with the modified value
  await page.fill('input[placeholder="mmmm dd, yyyy    hh:mm"]', updatedFieldValue2);

  // Click OK
  await page.getByRole("button", { name: "OK" }).click();

  await page.getByLabel('Chemical Applied').click();
  await page.getByLabel('Application Time').nth(1).click();
  // await page.getByRole('textbox', { name: 'Choose date' }).click();
  const inputElements4 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement4 = inputElements4.nth(1);
  await firstInputElement4.click();
  await page.getByRole("button", { name: "OK" }).click();

  const inputElements5 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement5 = inputElements5.nth(1);
  await firstInputElement5.click();
  await page.getByRole("button", { name: "Cancel" }).click();

  const inputElements6 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement6 = inputElements6.nth(1);
  await firstInputElement6.click();
  await page.getByRole('button', { name: 'calendar view is open, go to text input view' }).click();
  await page.getByRole("button", { name: "Cancel" }).click();

  const inputElements7 = page.locator('.MuiInputBase-input.MuiOutlinedInput-input.Mui-readOnly');
  const firstInputElement7 = inputElements7.nth(1);
  await firstInputElement7.click();
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Click the input field to select the value
  await page.click('input[placeholder="mmmm dd, yyyy    hh:mm"]');

  // Get the value of the input field
  let fieldValue7 = await page.inputValue('input[placeholder="mmmm dd, yyyy    hh:mm"]');
  console.log("Field value:", fieldValue7);

  // Extract the date and hour from the field value
  const [date7, time7] = fieldValue7.split("    ");
  const [month7, day7, year7] = date7.split(" ");
  const [hour7, minute7] = time7.split(":");

  // Decrement the hour by 1, considering the condition
  let updatedHour7;
  let updatedDay7;
  if (parseInt(hour7) === 0) {
    updatedHour7 = "23";
    updatedDay7 = parseInt(day7) - 1;
  } else {
    updatedHour7 = (parseInt(hour7) - 1).toString().padStart(2, "0");
    updatedDay7 = day7;
  }

  // Update the field value with the modified hour and day
  const updatedFieldValue7 = `${month7} ${updatedDay7}, ${year7}    ${updatedHour7}:${minute7}`;
  console.log("Updated field value:", updatedFieldValue7);

  // Update the input field with the modified value
  await page.fill('input[placeholder="mmmm dd, yyyy    hh:mm"]', updatedFieldValue7);

  // Click OK
  await page.getByRole("button", { name: "OK" }).click();

}



export async function runwayConditions(page) {
  // Check Runway Conditions
  
  await page.getByRole("radio", { name: "Fully Cleared" }).click();
  await page.getByRole("radio", { name: "Cleared Width - Centered" }).click();
  expect(await page.isVisible('label:has-text("You Must Select A Cleared Width")'));
  await page.getByRole('radiogroup').filter({ hasText: 'Fully ClearedCleared Width - CenteredCleared Width (FT)Cleared Width - OffsetCle' }).getByRole('button', { name: '​' }).first().click();
  await page.getByRole('option', { name: '80', exact: true }).click();
  await page.getByRole("radio", { name: "Cleared Width - Offset" }).click();
  expect(await page.isVisible('label:has-text("You Must Select A Cleared Width")'));
  await page.getByRole('radiogroup').filter({ hasText: 'Fully ClearedCleared Width - CenteredCleared Width (FT)Cleared Width - OffsetCle' }).getByRole('button', { name: '​' }).nth(1).click();
  await page.getByRole('option', { name: '80', exact: true }).click();
  expect(await page.isVisible('label:has-text("You Must Select An Offset Direction")'));
  // await page.getByLabel('NORTH').click();
  // await page.getByLabel('SOUTH').click();

  await page.getByRole("radio", { name: "NORTH" }).click();
  await page.getByRole("radio", { name: "SOUTH" }).click();
  // await page.getByRole("checkbox", { name: "Surface Packed" }).click();
  // await page.getByRole("checkbox", { name: "Surface Graded" }).click();
  // await page.getByRole("checkbox", { name: "Surface Scarified" }).click();

  // expect(await page.isVisible('label:has-text("Lower Threshold - First Contaminant - Contaminant Has Not Been Set")'));
  expect(await page.isVisible('label:has-text("First Contaminant - Contaminant Has Not Been Set")'));
  await page.getByRole("checkbox", { name: "Slippery When Wet" }).click();
  await page.locator('.MuiBox-root > div > div:nth-child(2) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: '40' }).click();
  // expect(await page.isVisible('label:has-text("Lower Threshold - First Contaminant - Not Specified")'));
  expect(await page.isVisible('label:has-text("First Contaminant - Not Specified")'));
  await page.locator('.MuiBox-root > div > div:nth-child(3) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: "ICE", exact: true }).click();
  await page.locator('.MuiBox-root > div > div:nth-child(3) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: "STANDING WATER", exact: true }).click();
  expect(await page.isVisible('label:has-text("First Contaminant - Depth Not Specified")'));
  await page.locator('.MuiBox-root > div > div:nth-child(4) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: '2', exact: true }).click();
  await page.locator('.MuiBox-root > div:nth-child(2) > div:nth-child(2) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: '60' }).click();
  expect(await page.isVisible('label:has-text("Second Contaminant - Not Specified")'));
  await page.locator('.MuiBox-root > div:nth-child(2) > div:nth-child(3) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: "WET ICE", exact: true }).click();
  await page.locator('.MuiBox-root > div:nth-child(2) > div:nth-child(3) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: "DRY SNOW ON TOP OF ICE", exact: true }).click();
  expect(await page.isVisible('label:has-text("Second Contaminant - Depth Not Specified")'));
  await page.locator('.MuiBox-root > div:nth-child(2) > div:nth-child(4) > .MuiInputBase-root > .MuiSelect-select').first().click();
  await page.getByRole('option', { name: '2', exact: true }).click();
  // await page.getByRole("checkbox", { name: "Apply To All Runway Thirds" }).click();
}