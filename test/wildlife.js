export const wildlife = {
  incidentInformation: {
    reportTypes: ["Bird Strike", "Bird Near Miss"],
    reportingSources: ["Pilot", "Site"],
    flightPhases: ["Climb", "Taxi"],
    cloudCover: ["Overcast", "Some Cloud"],
    lightConditions: ["Day", "Night"],
    precipitation: ["Rain", "Snow"],
    aircraftHeight: ["2", "3"],
    aircraftSpeed: ["4", "5"],
    distanceFromAirport: ["6", "7"],
  },
  aircraftInformation: {
    aircraftMakes: ["Aesl Nz", "Aa Colombes"],
    aircraftModels: ["1329", "152"],
    engineMakes: ["Alvis", "Allison"],
    engineTypes: ["Piston", "Radial"],
    flightNumbers: ["8", "9"],
    aircraftRegistrations: ["10", "11"],
    operatorNames: ["", ""],
  },
  wildlifeSpecies: {
    wildlifeFamily: ["Birds of Prey", "Land Bird/Fowl-like"],
    wildlifeGenus: ["Eagle", "Land Bird/ Fowl-like"],
    species: ["Bald Eagle", "Pelicans"],
    numberStruk: ["12", "13"],
    numberSeen: ["14", "15"],
  },
};

export async function addIncidentInformation(page) {
  await updateIncidentInformation(page, wildlife.incidentInformation, 0);
}

export async function editIncidentInformation(page) {
  await updateIncidentInformation(page, wildlife.incidentInformation, 1);
}

export async function addAircraftInformation(page) {
  await updateAircraftInformation(page, wildlife.aircraftInformation, 0);
}

export async function editAircraftInformation(page) {
  await updateAircraftInformation(page, wildlife.aircraftInformation, 1);
}

async function updateIncidentInformation(page, incidentInfo, index) {
  await page.getByRole("tab", { name: "Incident information" }).click();

  const fields = [
    { id: "#report_type", options: incidentInfo.reportTypes },
    { id: "#reporting_source_id", options: incidentInfo.reportingSources },
    { id: "#flight_phase_id", options: incidentInfo.flightPhases },
    { id: "#cloud_cover_id", options: incidentInfo.cloudCover },
    { id: "#light_condition_id", options: incidentInfo.lightConditions },
    { id: "#precipitation_id", options: incidentInfo.precipitation },
    { label: "Aircraft Height", value: incidentInfo.aircraftHeight },
    { name: "aircraft_speed", value: incidentInfo.aircraftSpeed },
    { name: "distance_from_airport", value: incidentInfo.distanceFromAirport },
  ];

  for (const { id, options, label, value, name } of fields) {
    if (id) {
      await page.locator(id).click();
      if (options) {
        await page.getByRole("option", { name: options[index] }).click();
      }
    } else if (label) {
      await page.getByLabel(label).fill(value[index]);
    } else if (name) {
      await page.locator(`input[name="${name}"]`).fill(value[index]);
    }
  }
}

async function updateAircraftInformation(page, aircraftInfo, index) {
  await page.getByRole("tab", { name: "Aircraft information" }).click();

  const fields = [
    { id: "#aircraft_make_id", options: aircraftInfo.aircraftMakes },
    { id: "#aircraft_model_id", options: aircraftInfo.aircraftModels },
    { id: "#engine_make_id", options: aircraftInfo.engineMakes },
    { id: "#engine_type_id", options: aircraftInfo.engineTypes },
  ];

  for (const { id, options } of fields) {
    await page.locator(id).click();
    await page.getByRole("option", { name: options[index] }).click();
  }

  await page.getByLabel("Flight Number").fill(aircraftInfo.flightNumbers[index]);
  await page.locator('input[name="aircraft_registration"]').fill(aircraftInfo.aircraftRegistrations[index]);
}

export async function addAircraftdamage(page) {
  await updateAircraftDamage(page, false);
}

export async function editAircraftdamage(page) {
  await updateAircraftDamage(page, true);
}

async function updateAircraftDamage(page, isEdit) {
  await page.getByRole("tab", { name: "Aircraft damage" }).click();

  const buttons = [
    "Radome",
    "Windshield",
    "Nose",
    "Propeller",
    "Engine #1",
    "Wings",
    "Engine #2",
    "Rotor",
    "Engine #3",
    "Fuselage",
    "Engine #4",
    "Landing Gear",
    "Tail",
    "Lights",
    "Pitot Static",
    "Tail Rotor",
    "Other",
  ];

  for (const button of buttons) {
    const buttonName = isEdit ? `${button} : Struck` : button;
    await page.getByRole("button", { name: buttonName, exact: true }).click();
  }
}

export async function addeffectsOnFlight(page) {
  await addEffectsOnFlight(page);
}

export async function editeffectsOnFlight(page) {
  await editEffectsOnFlight(page);
}

async function addEffectsOnFlight(page){

  await page.getByRole("tab", { name: "Effects on Flight" }).click();
  await page.getByRole("button", { name: "Penetration of Airframe", exact: true }).click();
  await page.getByRole("button", { name: "Vision Obscured", exact: true }).click();
  await page.getByRole("button", { name: "Engine Ingestion", exact: true }).click();
  await page.getByRole("button", { name: "Forced Landing", exact: true }).click();
  await page.getByRole("button", { name: "Fire", exact: true }).click();


}

async function editEffectsOnFlight(page){
  await page.getByRole("tab", { name: "Effects on Flight" }).click();
  await page.getByRole("button", { name: "Aborted Takeoff", exact: true }).click();
  await page.getByRole("button", { name: "Precautionary Landing", exact: true }).click();
  await page.getByRole("button", { name: "Engine(s) Shut Down", exact: true }).click();
  await page.getByRole("button", { name: "Engine Uncontained Failure", exact: true }).click();
  await page.getByRole("button", { name: "Other", exact: true }).click();
}

export async function addWildlifeSpecies(page) {
  await updateWildlifeSpecies(page, 0);
}

export async function editWildlifeSpecies(page) {
  await updateWildlifeSpecies(page, 1);
}

async function updateWildlifeSpecies(page, index) {
  await page.getByRole("tab", { name: "Wildlife species" }).click();
  await page.locator("#wildlife_family_id").click();
  await page.getByRole("option", { name: wildlife.wildlifeSpecies.wildlifeFamily[index] }).click();
  await page.locator("#wildlife_genus_id").click();
  await page.getByRole("option", { name: wildlife.wildlifeSpecies.wildlifeGenus[index] }).click();
  await page.locator("#species").click();
  await page.getByRole("option", { name: wildlife.wildlifeSpecies.species[index] }).click();
  await page.locator('input[name="number_struck"]').fill(wildlife.wildlifeSpecies.numberStruk[index]);
  await page.getByLabel('Number Of Birds Seen').fill(wildlife.wildlifeSpecies.numberSeen[index]);

  if (index === 0) {
    await page.getByLabel('Remains Collected').check();
    await page.getByLabel('Medium').click();
    // await page.getByLabel('No', exact=true).click();
    const value = '1';
    const inputElement = await page.$(`input[name="pilot_warned"][value="${value}"]`);
    await inputElement.click();
  } else {
    await page.getByLabel('Small').click();
    await page.getByLabel('Remains Submitted For Identification').check();
    // await page.getByLabel('Yes', exact=true).click();
    const value = '0'; 
    const inputElement = await page.$(`input[name="pilot_warned"][value="${value}"]`);
    await inputElement.click();
  }
}