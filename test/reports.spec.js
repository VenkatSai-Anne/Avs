import { test, expect } from "@playwright/test";
import { login, birdstrike } from "./fixtures/index.js";

test("Reports Module", async ({ page }) => {
  await page.goto("http://localhost:5173/auth/login");
  await page.getByPlaceholder("Enter email address").fill(login.email);
  await page.getByPlaceholder("Enter password").fill(login.password);
  await page.getByTestId("login").click();
  await expect(page).toHaveURL("http://localhost:5173/");
  await page.getByRole("button", { name: "pie-chart" }).click();
  const response = await page.waitForResponse(
    (resp) =>
      resp.url().includes("api/birdwildlife/birdstrike-header") &&
      resp.status() === 200
  );
  const data = await response.json();
  await page.getByText("Rows per page:101–10 of 81").click();
  const element = await page.getByText("Rows per page:101–10 of 81");
  const text = await element.evaluate((node) => node.innerText);
  const regex = /of (\d+)/;
  const match = text.match(regex);
  const lastNumber = parseInt(match[1]);
  console.log(typeof lastNumber);
  console.log(typeof data.length);

  if (data.length === lastNumber) {
    console.log("Successful");
  } else {
    console.log("No");
  }
});
