export async function selectMapPoint(page) {

  const element = page.locator(".MuiBox-root.css-12o3yan");
  const boundingBox = await element.boundingBox();

  const x = Math.floor(Math.random() * boundingBox.width) + boundingBox.x;
  const y = Math.floor(Math.random() * boundingBox.height) + boundingBox.y;  

  console.log(x, y);
  return [x,y];
}

export async function checkWithMenu(page) {
  await page.getByRole('button', { name: 'Close popup' }).click();
  await page.getByRole('button', { name: 'Marker' }).first().click();
  await page.getByRole('menuitem', { name: "Cancel"}).click();
}