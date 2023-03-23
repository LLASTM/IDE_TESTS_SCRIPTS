// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics.
//
// All rights reserved. This program and the accompanying materials
// is the property of STMicroelectronics and must not be
// reproduced, disclosed to any third party, or used in any
// unauthorized manner without written consent.
// *****************************************************************************

import {Given } from '../../../test-tools/e2e/node_modules/@cucumber/cucumber';
import CubeWorld from "../../../test-tools/e2e/features/support/CubeWorld";
import {
    openFinder,
    clickText,
    typeText,
    pressKey,
    clickButton,
    clickInputAtRightOfText,
    clickPencilIconAtRightOfText,
    clickTextBelowText,
    clickFolderIcon,
    } from "../../../test-tools/e2e/features/support/steps";

Given('user creates application project {string} with board {string}', async function (this: CubeWorld, proj_name:string, device_name:string) {
    await openFinder();

    await this.page.locator('button:has-text("Board")').first().click();

    await clickText('Search Product');
    await typeText(device_name);
    await pressKey('Enter');

    await clickTextBelowText(device_name, 'Product(s) found:');

    await clickButton('Start a project');
    await clickInputAtRightOfText('Project name:');
    await typeText(proj_name);

    await clickFolderIcon();
    await clickButton('Open');

    await clickButton('Create Application Project');
})

Given('user adds a new software project {string} in application project panel', async function (this: CubeWorld, sw_proj:string) {
    await clickText('Add a SW project');
    await clickInputAtRightOfText('Software Project name:');
    await typeText(sw_proj);
    //await clickButton('Create and compose');
    await clickButton('Create SW Project');
})

Given('user adds a new software component to project {string} in application project panel', async function (this: CubeWorld, sw_proj:string) {
    await clickPencilIconAtRightOfText(sw_proj);
})

