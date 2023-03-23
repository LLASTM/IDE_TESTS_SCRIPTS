import { ICustomWorld } from '../support/custom-world';

import { Given, Then } from '@cucumber/cucumber';

/**import { Given, When, Then } from '@cucumber/cucumber';*/
/**import { expect } from '@playwright/test';*/

// ===============================================================================

Given('Go to the cubestudio application', async function (this: ICustomWorld) {
  const page = this.page!;

  await page.goto('http://localhost:3000/#/');
  await page.waitForTimeout(20000);
});

// ===============================================================================

Then('click on Theia icons', async function (this: ICustomWorld) {
  const page = this.page!;

  await page.locator('.p-TabBar-tabIcon').first().click();
  await page.waitForTimeout(1000);

  await page
    .locator('#shell-tab-explorer-view-container > .theia-tab-icon-label > .p-TabBar-tabIcon')
    .click();
  await page.waitForTimeout(1000);
  await page
    .locator('#shell-tab-search-view-container > .theia-tab-icon-label > .p-TabBar-tabIcon')
    .click();
  await page.waitForTimeout(1000);
  await page
    .locator('#shell-tab-search-components-widget > .theia-tab-icon-label > .p-TabBar-tabIcon')
    .click();
  await page.waitForTimeout(1000);
  await page
    .locator('#shell-tab-scm-view-container > .theia-tab-icon-label > .p-TabBar-tabIcon')
    .click();
  await page.locator('#shell-tab-debug > .theia-tab-icon-label > .p-TabBar-tabIcon').click();
  await page.waitForTimeout(1000);
  await page
    .locator('#shell-tab-vsx-extensions-view-container > .theia-tab-icon-label > .p-TabBar-tabIcon')
    .click();
  await page.waitForTimeout(1000);
  await page
    .locator(
      '[id="shell-tab-plugin-view-container\\:task-manager"] > .theia-tab-icon-label > .p-TabBar-tabIcon',
    )
    .click();
  await page.waitForTimeout(1000);
});
// ===============================================================================

Then('Click on menu content items', async function (this: ICustomWorld) {
  const page = this.page!;
  const menuItems = page.locator('li >> .p-Menu-item [data-type="command"]');
  const counter = (await menuItems.count()) - 1;
  console.log('== Click on menu content items : number of items=', counter);
  for (let index = counter; index >= 0; index--) {
    console.log('==== Click on menu content items : menu item :', index);
    await menuItems.nth(index).waitFor();
    await page.waitForTimeout(1000);
    await menuItems.nth(index).click();
    await page.waitForTimeout(1000);
    await menuItems.nth(index).click();
  }
});
// ===============================================================================

Then('Click on each item of main menu', async function (this: ICustomWorld) {
  const page = this.page!;

  const menuItems = page.locator('ul.p-MenuBar-content >> li ');
  const counter = await menuItems.count();
  // console.log('+++++++++++++++++++++++++++++++++++ found ' + counter + ' items in menu');
  for (let index = counter - 1; index >= 0; index--) {
    const currentObject = menuItems.nth(index);
    const objectName = await currentObject.locator('.p-MenuBar-itemLabel').textContent();
    console.log('== menu item name is :', objectName);
    await currentObject.click();
    await page.waitForTimeout(1000);

    const objectChildren = page.locator('ul.p-Menu-content >> li[data-type="command"]');
    const childrenCounter = await objectChildren.count();
    console.log('found items : ', childrenCounter);

    for (let index = childrenCounter - 1; index >= 0; index--) {
      const currentObject = objectChildren.nth(index);
      const objectName = await currentObject.locator('.p-Menu-itemLabel').textContent();
      console.log('==== menu item name is :', objectName);
    }

    await currentObject.click();
    await page.waitForTimeout(1000);
  }
});
// ===============================================================================

Then('Click on Main menu children', async function (this: ICustomWorld) {
  const page = this.page!;

  const mainMenuChildren = page.locator('div >> .p-MenuBar-itemLabel');
  const counter = (await mainMenuChildren.count()) - 1;

  console.log('=== Main menu items :', counter);

  for (let index = counter; index >= 0; index--) {
    console.log('==== menu item :', index);
    await mainMenuChildren.nth(index).waitFor();
    await page.waitForTimeout(1000);
    await mainMenuChildren.nth(index).click();
    await page.waitForTimeout(1000);
    await mainMenuChildren.nth(index).click();
  }
  for (let index = 0; index <= counter; index++) {
    console.log('==== menu item :', index);
    await mainMenuChildren.nth(index).waitFor();
    await page.waitForTimeout(1000);
    await mainMenuChildren.nth(index).click();
    await page.waitForTimeout(1000);
    await mainMenuChildren.nth(index).click();
  }
});
// ===============================================================================
Then('click on About menu', async function (this: ICustomWorld) {
  const page = this.page!;

  await page.locator('div >> .p-MenuBar-itemLabel').getByText('Help').waitFor();
  await page.locator('div >> .p-MenuBar-itemLabel').getByText('Help').click();
  await page.getByText('About').click();
  await page.waitForTimeout(1000);
});
// ===============================================================================
Then('get theia extensions', async function (this: ICustomWorld) {
  const page = this.page!;

  const extensionsList = page.locator('div.theia-aboutDialog >> ul.theia-aboutExtensions >> li');
  const counter = (await extensionsList.count()) - 1;
  console.log('== found ', counter, ' extensions');
  for (let index = 0; index <= counter; index++) {
    console.log(await extensionsList.nth(index).textContent());
  }
});
// ===============================================================================
Then('get cube studio version', async function (this: ICustomWorld) {
  const page = this.page!;
  const cube2version = await page.locator('div.about-details').textContent();
  console.log('cube2 version :' + cube2version);
});
// ===============================================================================
Then('click on About menu OK button', async function (this: ICustomWorld) {
  const page = this.page!;

  await page.getByRole('button', { name: 'OK' }).click();
});
// ===============================================================================

Then('Go to the Get Started menu', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('div >> .p-MenuBar-itemLabel').getByText('Help').waitFor();
  await page.locator('div >> .p-MenuBar-itemLabel').getByText('Help').click();
  await page.getByText('Get Started').click();
  await page.waitForTimeout(1000);
});
// ===============================================================================

Then('Go to the Documentation menu', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('div >> .p-MenuBar-itemLabel').getByText('Help').waitFor();
  await page.locator('div >> .p-MenuBar-itemLabel').getByText('Help').click();
  await page.getByText('Documentation').nth(1).click();
  await page.waitForTimeout(1000);
});

// ===============================================================================

Then('import project {string}', async function (this: ICustomWorld, projectName: string) {
  const page = this.page!;
  const projectId =
    (await '[id="/c:/jenkins/workspace/LLA_GNBCWL1766/LLA_TESTS_SCRIPTS/PROJECTS/') +
    projectName +
    '"]';
  console.log('== project id is : ', projectId);

  await page.getByText('File', { exact: true }).click();
  await page.waitForTimeout(10000);

  await page.getByText('Open...').click();
  await page.waitForTimeout(1000);

  await page.getByRole('combobox').selectOption('file:///c%3A');
  await page.getByText('jenkins').click();

  await page.getByText('workspace', { exact: true }).click();

  await page.locator('[id="/c:/jenkins/workspace/LLA_GNBCWL1766"]').click();
  await page.waitForTimeout(1000);

  await page.locator('[id="/c:/jenkins/workspace/LLA_GNBCWL1766/LLA_TESTS_SCRIPTS"]').click();
  await page.waitForTimeout(1000);

  await page
    .locator('[id="/c:/jenkins/workspace/LLA_GNBCWL1766/LLA_TESTS_SCRIPTS/PROJECTS"]')
    .click();

  await page.locator(projectId).click();
  await page.waitForTimeout(1000);

  await page.locator('#theia-dialog-shell').getByRole('button', { name: 'Open' }).click();
  await page.waitForTimeout(10000);

  await page
    .locator('#shell-tab-explorer-view-container > .theia-tab-icon-label > .p-TabBar-tabIcon')
    .click();
  await page.waitForTimeout(2000);
});

// ===============================================================================

Then('wait 5 secondes', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.waitForTimeout(5 * 1000);
});
