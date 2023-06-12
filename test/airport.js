export default {
  Airport1: "Ottawa Macdonald-Cartier International Airport",
  Airport2: "15 Wing Moose Jaw",
  Airport3: "Campbellford Semi-International Airport",
  Airport4: "Mirabel International Aerocity",
  Airport5: "Montréal–Trudeau International Airport",
};
  
export async function selectAirport(page, airportName) {
    // Select the Airport
  await page.getByRole("button", { name: "Airport" }).click();
  await page.getByRole("option", { name: airportName }).click();
}