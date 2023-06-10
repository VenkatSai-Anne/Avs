import { test, expect } from "@playwright/test";
import { login, birdstrike } from "./fixtures/index.js";
let birdstrikeId = null;
var mapPoints = [300, 300];

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/auth/login");
  await page.getByPlaceholder("Enter email address").fill(login.email);
  await page.getByPlaceholder("Enter password").fill(login.password);
  await page.getByTestId("login").click();
  await expect(page).toHaveURL("http://localhost:5173/");
  await page.getByRole("button", { name: "twitter" }).click();
  await expect(page).toHaveURL("http://localhost:5173/bird&wildlife");
});

test.afterAll(({ page }) => {
  page.close();
});

test.describe.serial("Birdstrike module", () => {
  test("User should be able to add new birdstrike log", async ({ page }) => {
    await page.mouse.move(...mapPoints);
    await page.mouse.down();
    await page.mouse.up();
    await page
      .getByRole("menuitem", { name: "Bird and WildLife Strikes" })
      .click();
    await expect(page).toHaveURL(
      new RegExp("http://localhost:5173/bird&wildlife/bird-strike/create/")
    );
    //  Incident Information
    await page.locator("#report_type").click();
    await page.getByRole("option", { name: birdstrike.report_type[0] }).click();
    await page.locator("#reporting_source_id").click();
    await page
      .getByRole("option", { name: birdstrike.reporting_source_id[0] })
      .click();
    await page.locator("#flight_phase_id").click();
    await page
      .getByRole("option", { name: birdstrike.flight_phase_id[0] })
      .click();
    await page.locator("#cloud_cover_id").click();
    await page
      .getByRole("option", { name: birdstrike.cloud_cover_id[0] })
      .click();
    await page.locator("#light_condition_id").click();
    await page
      .getByRole("option", { name: birdstrike.light_condition_id[0] })
      .click();

    await page.locator("#precipitation_id").click();
    await page
      .getByRole("option", { name: birdstrike.precipitation_id[0] })
      .click();
    await page
      .getByLabel("Aircraft Height")
      .fill(birdstrike.aircraft_height[0]);
    await page
      .locator('input[name="aircraft_speed"]')
      .fill(birdstrike.aircraft_speed[0]);
    await page
      .locator('input[name="distance_from_airport"]')
      .fill(birdstrike.distance_from_airport[0]);

    //  Aircraft information
    await page.getByRole("tab", { name: "Aircraft information" }).click();
    await page.locator("#aircraft_make_id").click();
    await page
      .getByRole("option", { name: birdstrike.aircraft_make_id[0] })
      .click();
    await page.locator("#aircraft_model_id").click();
    await page
      .getByRole("option", { name: birdstrike.aircraft_model_id[0] })
      .click();
    await page.locator("#engine_make_id").click();
    await page
      .getByRole("option", { name: birdstrike.engine_make_id[0] })
      .click();
    await page.locator("#engine_type_id").click();
    await page
      .getByRole("option", { name: birdstrike.engine_type_id[0] })
      .click();
    await page.getByLabel("Flight Number").fill(birdstrike.flight_number[0]);
    await page
      .locator('input[name="aircraft_registration"]')
      .fill(birdstrike.aircraft_registration[0]);

    //  Aircraft Damage
    await page.getByRole("tab", { name: "Aircraft damage" }).click();
    await page
      .getByRole("button", {
        name: birdstrike.damage_list[0],
      })
      .click();
    await page
      .getByRole("button", {
        name: birdstrike.damage_list[1],
      })
      .click();
    //  Effects on Flight
    await page.getByRole("tab", { name: "Effects on Flight" }).click();
    await page
      .getByRole("button", {
        name: birdstrike.effects_list[0],
      })
      .click();
    await page
      .getByRole("button", {
        name: birdstrike.effects_list[1],
      })
      .click();
    //  Wildlife Species
    await page.getByRole("tab", { name: "Wilflife species" }).click();
    await page.locator("#wildlife_family_id").click();
    await page
      .getByRole("option", { name: birdstrike.wildlife_family_id[0] })
      .click();
    await page.locator("#wildlife_genus_id").click();
    await page
      .getByRole("option", { name: birdstrike.wildlife_genus_id[0] })
      .click();

    await page.locator("#species").click();
    await page.getByRole("option", { name: birdstrike.species[0] }).click();

    await page.getByLabel(birdstrike.size[0]).check();
    await page
      .getByLabel("Number of birds seen")
      .fill(birdstrike.number_seen[0]);
    await page
      .locator('input[name="number_struck"]')
      .fill(birdstrike.number_struck[0]);
    await page.getByLabel(birdstrike.pilot_warned[0]).check();
    await page.getByLabel("Wildlife remains collected").check();
    await page
      .getByLabel("Wildlife remains submitted for identification")
      .check();

    //  TP 132
    await page.getByRole("button", { name: "TP132" }).click();
    await page.locator("#part139_condition_id").click();
    await page.locator("#part139_condition_id-option-0").click();
    await page.getByTestId("CancelOutlinedIcon").click();

    //  Comments
    await page.getByRole("button", { name: "Comments" }).click();
    await page.getByLabel("Comments").fill("TEST 20");
    await page.getByTestId("CancelOutlinedIcon").click();

    // Save
    await page.getByRole("button", { name: "Save" }).click();
    // Spy on Create
    const response = await page.waitForResponse(
      (resp) =>
        resp.url().includes("/birdstrike-header") && resp.status() === 200
    );
    const birdstrikeData = await response.json();
    birdstrikeId = birdstrikeData.id;
  });
  test("User should be able to edit birdstrike log", async ({ page }) => {
    await page.mouse.move(...mapPoints);
    await page.mouse.down();
    await page.mouse.up();
    await page.getByRole("button", { name: "Edit" }).click();
    await page.goto(
      "http:localhost:5173/bird&wildlife/bird-strike/edit/" + birdstrikeId
    );
    await page.waitForResponse(
      (resp) =>
        resp.url().includes("api/birdwildlife/birdstrike-detail") &&
        resp.status() === 200
    );

    // Incident Information
    expect(await page.locator("#report_type").inputValue()).toBe(
      birdstrike.report_type[0]
    );
    expect(await page.locator("#reporting_source_id").inputValue()).toBe(
      birdstrike.reporting_source_id[0]
    );
    expect(await page.locator("#flight_phase_id").inputValue()).toBe(
      birdstrike.flight_phase_id[0]
    );
    expect(await page.locator("#cloud_cover_id").inputValue()).toBe(
      birdstrike.cloud_cover_id[0]
    );
    expect(await page.locator("#light_condition_id").inputValue()).toBe(
      birdstrike.light_condition_id[0]
    );
    expect(await page.locator("#precipitation_id").inputValue()).toBe(
      birdstrike.precipitation_id[0]
    );
    expect(await page.getByLabel("Aircraft Height").inputValue()).toBe(
      birdstrike.aircraft_height[0]
    );
    expect(await page.getByLabel("Aircraft Speed").inputValue()).toBe(
      birdstrike.aircraft_speed[0]
    );
    expect(await page.getByLabel("Distance From Airport").inputValue()).toBe(
      birdstrike.distance_from_airport[0]
    );

    // Aircraft Information
    await page.getByRole("tab", { name: "Aircraft information" }).click();
    expect(await page.locator("#aircraft_make_id").inputValue()).toBe(
      birdstrike.aircraft_make_id[0]
    );
    expect(await page.locator("#aircraft_model_id").inputValue()).toBe(
      birdstrike.aircraft_model_id[0]
    );
    expect(await page.locator("#engine_make_id").inputValue()).toBe(
      birdstrike.engine_make_id[0]
    );
    expect(await page.locator("#engine_type_id").inputValue()).toBe(
      birdstrike.engine_type_id[0]
    );
    expect(await page.getByLabel("Flight Number").inputValue()).toBe(
      birdstrike.flight_number[0]
    );
    expect(
      await page.locator('input[name="aircraft_registration"]').inputValue()
    ).toBe(birdstrike.aircraft_registration[0]);

    //  Aircraft Damage
    await page.getByRole("tab", { name: "Aircraft Damage" }).click();
    expect(
      page.locator("button", {
        name: birdstrike.damage_list_struck[0],
      })
    );
    expect(
      page.locator("css-jmsxmk-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.damage_list_struck[1],
      })
    );

    //  Effects on Flight
    await page.getByRole("tab", { name: "Effects on flight" }).click();
    expect(
      page.locator("css-14wzuw5-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.effects_list[0],
      })
    );
    expect(
      page.locator("css-14wzuw5-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.effects_list[1],
      })
    );

    //  Wildlife Species
    await page.getByRole("tab", { name: "Wilflife species" }).click();
    expect(await page.locator("#wildlife_family_id").inputValue()).toBe(
      birdstrike.wildlife_family_id[0]
    );
    expect(await page.locator("#wildlife_genus_id").inputValue()).toBe(
      birdstrike.wildlife_genus_id[0]
    );
    expect(await page.locator("#species").inputValue()).toBe(
      birdstrike.species[0]
    );
    expect(await page.getByLabel(birdstrike.size[0]).isChecked());
    expect(await page.getByLabel("Number of birds seen").inputValue()).toBe(
      birdstrike.number_seen[0]
    );
    expect(await page.locator('input[name="number_struck"]').inputValue()).toBe(
      birdstrike.number_struck[0]
    );
    expect(await page.getByLabel(birdstrike.pilot_warned[0]).isChecked());
    expect(await page.getByLabel("Wildlife remains collected").isChecked());
    expect(
      await page
        .getByLabel("Wildlife remains submitted for identification")
        .isChecked()
    );

    // TP 132
    await page.getByRole("button", { name: "TP132" }).click();
    expect(await page.locator("#part139_condition_id").inputValue()).toBe(
      birdstrike.part139_condition_id[0]
    );

    // Comments
    await page.getByTestId("CancelOutlinedIcon").locator("path").click();
    await page.getByRole("button", { name: "Comments" }).click();
    expect(await page.getByLabel("Comments").inputValue()).toBe("TEST 20");
  });
  test("User should be able to update birdstrike log", async ({ page }) => {
    await page.goto(
      "http:localhost:5173/bird&wildlife/bird-strike/edit/" + birdstrikeId
    );
    await page.waitForResponse(
      (resp) =>
        resp.url().includes("api/birdwildlife/birdstrike-detail") &&
        resp.status() === 200
    );
    //  Incident Information
    await page.locator("#report_type").click();
    await page.getByRole("option", { name: birdstrike.report_type[1] }).click();
    await page.locator("#reporting_source_id").click();
    await page
      .getByRole("option", { name: birdstrike.reporting_source_id[1] })
      .click();
    await page.locator("#flight_phase_id").click();
    await page
      .getByRole("option", { name: birdstrike.flight_phase_id[1] })
      .click();
    await page.locator("#cloud_cover_id").click();
    await page
      .getByRole("option", { name: birdstrike.cloud_cover_id[1] })
      .click();
    await page.locator("#light_condition_id").click();
    await page
      .getByRole("option", { name: birdstrike.light_condition_id[1] })
      .click();

    await page.locator("#precipitation_id").click();
    await page
      .getByRole("option", { name: birdstrike.precipitation_id[1] })
      .click();
    await page
      .getByLabel("Aircraft Height")
      .fill(birdstrike.aircraft_height[1]);
    await page
      .locator('input[name="aircraft_speed"]')
      .fill(birdstrike.aircraft_speed[1]);
    await page
      .locator('input[name="distance_from_airport"]')
      .fill(birdstrike.distance_from_airport[1]);

    // Aircraft information
    await page.getByRole("tab", { name: "Aircraft information" }).click();
    await page.locator("#aircraft_make_id").click();
    await page
      .getByRole("option", { name: birdstrike.aircraft_make_id[1] })
      .click();
    await page.locator("#aircraft_model_id").click();
    await page
      .getByRole("option", { name: birdstrike.aircraft_model_id[1] })
      .click();
    await page.locator("#engine_make_id").click();
    await page
      .getByRole("option", { name: birdstrike.engine_make_id[1] })
      .click();
    await page.locator("#engine_type_id").click();
    await page
      .getByRole("option", { name: birdstrike.engine_type_id[1] })
      .click();
    await page.getByLabel("Flight Number").fill(birdstrike.flight_number[1]);
    await page
      .locator('input[name="aircraft_registration"]')
      .fill(birdstrike.aircraft_registration[1]);

    // Aircraft Damage
    await page.getByRole("tab", { name: "Aircraft damage" }).click();
    await page
      .getByRole("button", {
        name: birdstrike.damage_list_struck[0],
      })
      .click();

    await page
      .getByRole("button", {
        name: birdstrike.damage_list[3],
      })
      .click();
    await page
      .getByRole("button", {
        name: birdstrike.damage_list[4],
      })
      .click();

    // Effects on Flight
    await page.getByRole("tab", { name: "Effects on Flight" }).click();
    await page
      .getByRole("button", {
        name: birdstrike.effects_list[0],
      })
      .click();
    await page
      .getByRole("button", {
        name: birdstrike.effects_list[2],
      })
      .click();
    await page
      .getByRole("button", {
        name: birdstrike.effects_list[3],
      })
      .click();
    // Wildlife Species
    await page.getByRole("tab", { name: "Wilflife species" }).click();
    await page.locator("#wildlife_family_id").click();
    await page
      .getByRole("option", { name: birdstrike.wildlife_family_id[1] })
      .click();
    await page.locator("#wildlife_genus_id").click();
    await page
      .getByRole("option", { name: birdstrike.wildlife_genus_id[1] })
      .click();

    await page.locator("#species").click();
    await page.getByRole("option", { name: birdstrike.species[1] }).click();

    await page.getByLabel(birdstrike.size[1]).check();
    await page
      .getByLabel("Number of birds seen")
      .fill(birdstrike.number_seen[1]);
    await page
      .locator('input[name="number_struck"]')
      .fill(birdstrike.number_struck[1]);
    await page.getByLabel("No").first().check();
    await page.getByLabel("Wildlife remains collected").uncheck();
    await page
      .getByLabel("Wildlife remains submitted for identification")
      .uncheck();

    // TP 132
    await page.getByRole("button", { name: "TP132" }).click();
    await page.locator("#part139_condition_id").click();
    await page.locator("#part139_condition_id-option-2").click();
    await page.getByTestId("CancelOutlinedIcon").click();

    // Comments
    await page.getByRole("button", { name: "Comments" }).click();
    await page.getByLabel("Comments").fill("TEST 20 (Updated)");
    await page.getByTestId("CancelOutlinedIcon").click();

    //Save
    await page.getByRole("button", { name: "Save" }).click();
    //Spy on Create
    const response = await page.waitForResponse(
      (resp) =>
        resp.url().includes("/birdstrike-header") && resp.status() === 200
    );
    const birdstrikeData = await response.json();
    birdstrikeId = birdstrikeData.id;
  });
  test("User should be able to edit the updated birdstrike log", async ({
    page,
  }) => {
    await page.goto(
      "http:localhost:5173/bird&wildlife/bird-strike/edit/" + birdstrikeId
    );
    await page.waitForResponse(
      (resp) =>
        resp.url().includes("api/birdwildlife/birdstrike-detail") &&
        resp.status() === 200
    );

    // Incident Information
    expect(await page.locator("#report_type").inputValue()).toBe(
      birdstrike.report_type[1]
    );
    expect(await page.locator("#reporting_source_id").inputValue()).toBe(
      birdstrike.reporting_source_id[1]
    );
    expect(await page.locator("#flight_phase_id").inputValue()).toBe(
      birdstrike.flight_phase_id[1]
    );
    expect(await page.locator("#cloud_cover_id").inputValue()).toBe(
      birdstrike.cloud_cover_id[1]
    );
    expect(await page.locator("#light_condition_id").inputValue()).toBe(
      birdstrike.light_condition_id[1]
    );
    expect(await page.locator("#precipitation_id").inputValue()).toBe(
      birdstrike.precipitation_id[1]
    );
    expect(await page.getByLabel("Aircraft Height").inputValue()).toBe(
      birdstrike.aircraft_height[1]
    );
    expect(await page.getByLabel("Aircraft Speed").inputValue()).toBe(
      birdstrike.aircraft_speed[1]
    );
    expect(await page.getByLabel("Distance From Airport").inputValue()).toBe(
      birdstrike.distance_from_airport[1]
    );

    // Aircraft Information
    await page.getByRole("tab", { name: "Aircraft information" }).click();
    expect(await page.locator("#aircraft_make_id").inputValue()).toBe(
      birdstrike.aircraft_make_id[1]
    );
    expect(await page.locator("#aircraft_model_id").inputValue()).toBe(
      birdstrike.aircraft_model_id[1]
    );
    expect(await page.locator("#engine_make_id").inputValue()).toBe(
      birdstrike.engine_make_id[1]
    );
    expect(await page.locator("#engine_type_id").inputValue()).toBe(
      birdstrike.engine_type_id[1]
    );
    expect(await page.getByLabel("Flight Number").inputValue()).toBe(
      birdstrike.flight_number[1]
    );
    expect(
      await page.locator('input[name="aircraft_registration"]').inputValue()
    ).toBe(birdstrike.aircraft_registration[1]);

    //  Aircraft Damage
    await page.getByRole("tab", { name: "Aircraft Damage" }).click();
    expect(
      page.locator("css-14wzuw5-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.damage_list_damage[0],
      })
    );
    expect(
      page.locator("css-jmsxmk-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.damage_list_struck[1],
      })
    );
    expect(
      page.locator("css-jmsxmk-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.damage_list_struck[2],
      })
    );
    expect(
      page.locator("css-jmsxmk-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.damage_list_struck[3],
      })
    );

    // Effects on Flight
    await page.getByRole("tab", { name: "Effects on flight" }).click();
    expect(
      page.locator("css-ocrv0r-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.effects_list[0],
      })
    );
    expect(
      page.locator("css-14wzuw5-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.effects_list[1],
      })
    );
    expect(
      page.locator("css-14wzuw5-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.effects_list[2],
      })
    );
    expect(
      page.locator("css-14wzuw5-MuiButtonBase-root-MuiButton-root", {
        name: birdstrike.effects_list[3],
      })
    );

    // Wildlife Species
    await page.getByRole("tab", { name: "Wilflife species" }).click();
    expect(await page.locator("#wildlife_family_id").inputValue()).toBe(
      birdstrike.wildlife_family_id[1]
    );
    expect(await page.locator("#wildlife_genus_id").inputValue()).toBe(
      birdstrike.wildlife_genus_id[1]
    );
    expect(await page.locator("#species").inputValue()).toBe(
      birdstrike.species[1]
    );
    expect(await page.getByLabel(birdstrike.size[1]).isChecked());
    expect(await page.getByLabel("Number of birds seen").inputValue()).toBe(
      birdstrike.number_seen[1]
    );
    expect(await page.locator('input[name="number_struck"]').inputValue()).toBe(
      birdstrike.number_struck[1]
    );
    expect(await page.getByLabel("No").first().isChecked());

    // TP 132
    await page.getByRole("button", { name: "TP132" }).click();
    expect(await page.locator("#part139_condition_id").inputValue()).toBe(
      birdstrike.part139_condition_id[2]
    );

    // Comments
    await page.getByTestId("CancelOutlinedIcon").locator("path").click();
    await page.getByRole("button", { name: "Comments" }).click();
    expect(await page.getByLabel("Comments").inputValue()).toBe(
      "TEST 20 (Updated)"
    );
  });
});
