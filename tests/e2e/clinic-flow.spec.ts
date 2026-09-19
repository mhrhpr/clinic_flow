import { test, expect } from "@playwright/test";

test("critical ClinicFlow patient and appointment workflows", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "Good morning, clinic team." })).toBeVisible();

  await page.getByRole("link", { name: "Patients" }).click();
  await expect(page.getByRole("heading", { name: "Patients" })).toBeVisible();

  const uniqueName = "E2E ClinicFlow Patient";
  const uniquePhone = "+1 202 555 0199";
  await page.getByRole("button", { name: "+ New patient" }).click();
  await expect(page.getByRole("dialog", { name: "New patient" })).toBeVisible();
  await page.getByLabel("Full name").fill(uniqueName);
  await page.getByLabel("Phone").fill(uniquePhone);
  await page.getByLabel("Initial service").fill("E2E consultation");
  await page.getByRole("button", { name: "Create patient" }).click();

  await expect(page.getByRole("cell", { name: uniqueName })).toBeVisible();
  await page.getByRole("textbox", { name: "Search patients, phone or treatment" }).fill("E2E ClinicFlow");
  await expect(page.getByRole("cell", { name: uniqueName })).toBeVisible();

  await page.getByRole("link", { name: "Appointments" }).click();
  await expect(page.getByRole("heading", { name: "Appointments" })).toBeVisible();

  const statusSelect = page.getByLabel("Status for Emma Carter");
  await statusSelect.selectOption("Completed");
  await expect(statusSelect).toHaveValue("Completed");

  expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
});
