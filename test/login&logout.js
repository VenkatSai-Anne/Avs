import { expect } from "@playwright/test";
import credentials from "./credentials";

export async function login(page, credentials) {
  // Perform login actions
    
  // Go to the Application
  await page.goto(credentials.ip);
  
  // Validate the Application page has the title
  await expect(page).toHaveTitle(credentials.title);
  
  //login with both correct creds
  await page.getByPlaceholder("Enter email address").fill(credentials.email);
  await page.getByPlaceholder("Enter password").fill(credentials.password);
  await page.getByTestId("login").click();
  
  // Validate the login successful snack bar
  await page.waitForSelector('.MuiSnackbar-root:has-text("Login Successful")');
  
  // Validate login successful
  await page.waitForURL(credentials.ip1);
  
}

export async function logout(page) {
  // Perform logout actions
  await page.getByRole("button", { name: "open profile" }).click();
  await page.getByRole("button", { name: "logout Logout" }).click();
  await expect(page).toHaveURL(credentials.ip);
}

export async function login_error1(page, credentials) {
  // Perform login actions
  
  // Go to the Application
  await page.goto(credentials.ip);

  // Validate the Application page has the title
  await expect(page).toHaveTitle(credentials.title);

  //login with both correct creds
  await page.getByPlaceholder("Enter email address").fill(credentials.email1);
  await page.getByPlaceholder("Enter password").fill(credentials.password);
  await page.getByTestId("login").click();

  // Validate the login failed snack bar
  await page.waitForSelector('.MuiSnackbar-root:has-text("Enter valid email and password")');

  // Validate login failed
  await page.waitForURL(credentials.ip);
}

export async function login_error2(page, credentials) {
  // Perform login actions
  
  // Go to the Application
  await page.goto(credentials.ip);

  // Validate the Application page has the title
  await expect(page).toHaveTitle(credentials.title);

  //login with both correct creds
  await page.getByPlaceholder("Enter email address").fill(credentials.email);
  await page.getByPlaceholder("Enter password").fill(credentials.password1);
  await page.getByTestId("login").click();

  // Validate the login failed snack bar
  await page.waitForSelector('.MuiSnackbar-root:has-text("Enter valid email and password")');

  // Validate login failed
  await page.waitForURL(credentials.ip);
}

export async function login_error3(page, credentials) {
  // Perform login actions
  
  // Go to the Application
  await page.goto(credentials.ip);

  // Validate the Application page has the title
  await expect(page).toHaveTitle(credentials.title);

  //login with both correct creds
  await page.getByPlaceholder("Enter email address").fill(credentials.email1);
  await page.getByPlaceholder("Enter password").fill(credentials.password1);
  await page.getByTestId("login").click();

  // Validate the login failed snack bar
  await page.waitForSelector('.MuiSnackbar-root:has-text("Enter valid email and password")');

  // Validate login failed
  await page.waitForURL(credentials.ip);
}