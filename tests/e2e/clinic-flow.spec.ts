import { test, expect } from "@playwright/test";

test("critical ClinicFlow patient and appointment workflows", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "صبح بخیر، تیم آیدا." })).toBeVisible();

  await page.getByRole("link", { name: "بیماران" }).click();
  await expect(page.getByRole("heading", { name: "بیماران" })).toBeVisible();

  const uniqueName = "بیمار تست ClinicFlow";
  const uniquePhone = "۰۹۱۲ ۲۰۲ ۰۱۹۹";
  await page.getByRole("button", { name: "+ ثبت بیمار جدید" }).click();
  const dialog = page.getByRole("dialog", { name: "ثبت بیمار جدید" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("نام و نام خانوادگی").fill(uniqueName);
  await dialog.getByLabel("شماره تلفن").fill(uniquePhone);
  await dialog.getByLabel("خدمت اولیه").fill("مشاوره پوست");
  await dialog.getByRole("button", { name: "ثبت بیمار" }).click();

  await expect(page.getByRole("cell", { name: uniqueName })).toBeVisible();
  await page.getByRole("textbox", { name: "جست‌وجوی بیمار، تلفن یا خدمت" }).fill("ClinicFlow");
  await expect(page.getByRole("cell", { name: uniqueName })).toBeVisible();

  await page.getByRole("link", { name: "نوبت‌ها" }).click();
  await expect(page.getByRole("heading", { name: "نوبت‌ها" })).toBeVisible();

  const statusSelect = page.getByLabel("وضعیت نوبت النا کریمی");
  await statusSelect.selectOption("Completed");
  await expect(statusSelect).toHaveValue("Completed");

  expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
});
