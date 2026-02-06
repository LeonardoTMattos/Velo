import { test, expect } from '@playwright/test';

test('Consultar Pedido aprovado', async ({ page }) => {
  //arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByTestId('header-nav').getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  //act
  await page.getByTestId('search-order-id').fill('VLO-QF15N5');
  await page.getByTestId('search-order-button').click();
  //assert
  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-QF15N5');
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});

test('Consultar Pedido reprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByTestId('header-nav').getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  await page.getByTestId('search-order-id').fill('VLO-123456');
  await page.getByTestId('search-order-button').click();
  await expect(page.getByText('Pedido não encontradoVerifique o número do pedido e tente novamente')).toBeVisible();
});