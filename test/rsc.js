import { test, expect } from "@playwright/test";

export async function runwaySelection(page) {

await page.getByRole('button', { name: 'RWY-14/32' }).click();
await page.getByRole('option').nth(1).click();

// Check No Winter Maintenance
await page.getByRole("radio", { name: "No Winter Maintenance" }).click();

// Validate weather No Winter Maintenance is checked
expect(await page.getByRole("radio", { name: "No Winter Maintenance" }).isChecked()).toBe(true);

await page.getByRole('button', { name: 'RWY-07/25' }).click();
await page.getByRole('option').nth(2).click();

// Check No Winter Maintenance
await page.getByRole("radio", { name: "No Winter Maintenance" }).click();

// Validate weather No Winter Maintenance is checked
expect(await page.getByRole("radio", { name: "No Winter Maintenance" }).isChecked()).toBe(true);

await page.getByRole('button', { name: 'RWY-04/22' }).click();
await page.getByRole('option').nth(0).click();

// Check Report Surface Conditions
await page.getByRole("radio", { name: "Report Surface Conditions" }).click();

// Validate weather Report Surface Conditions is checked
expect(await page.getByRole("radio", { name: "Report Surface Conditions" }).isChecked()).toBe(true);
}