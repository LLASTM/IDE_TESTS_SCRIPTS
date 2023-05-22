// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics.
//
// All rights reserved. This program and the accompanying materials
// is the property of STMicroelectronics and must not be
// reproduced, disclosed to any third party, or used in any
// unauthorized manner without written consent.
// *****************************************************************************

// import { ChromiumBrowser, expect } from '@playwright/test';
import { expect } from '@playwright/test';
//import { webkit } from '@playwright/test';
//import { Page, webkit, expect, chromium } from '@playwright/test';
//import { DefaultPreferences, PreferenceIds, TheiaPreferenceView } from '../../src/theia-preference-view';
import { TheiaExplorerView } from '../models/theia-explorer-view';
//import { expect } from '@playwright/test';
//import { OSUtil } from '../src/util';
//import { theiaApp } from '../../runner/hooks';
import { TheiaApp } from '../models/theia-app';
import { TheiaAboutDialog } from '../models/theia-about-dialog';
import { TheiaMenuBar } from '../models/theia-main-menu';
//import { TheiaNotificationIndicator } from '../src/theia-notification-indicator';
//import { TheiaProblemIndicator } from '../src/theia-problem-indicator';
//import { TheiaProblemsView } from '../src/theia-problem-view';
import { TheiaQuickCommandPalette } from '../models/theia-quick-command-palette';
//import { TheiaStatusBar } from '../src/theia-status-bar';
import { TheiaTextEditor } from '../models/theia-text-editor';
//import { TheiaToggleBottomIndicator } from '../src/theia-toggle-bottom-indicator';
// import { TheiaWorkspace } from '../../src/theia-workspace';
import { CsUiFactory } from './CsUiElement';

import {
    Before,
    After,
    setWorldConstructor,
    Given,
    When,
    Then,
    setParallelCanAssign,
    parallelCanAssignHelpers,
    setDefaultTimeout
} from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);
const { atMostOnePicklePerTag } = parallelCanAssignHelpers
const myTagRule = atMostOnePicklePerTag(["@config"]);
setParallelCanAssign(myTagRule)
// import {After} from '@cucumber/cucumber';
//import {AfterAll } from '@cucumber/cucumber';

import { Page } from '@playwright/test';
import CubeWorld from "./CubeWorld"
// import { chromium } from '@playwright/test';
setWorldConstructor(CubeWorld);

let page: Page;
let theiaApp: TheiaApp;
let quickCommand: TheiaQuickCommandPalette;
// let browser: ChromiumBrowser;
let textEditor: TheiaTextEditor;
let menuBar: TheiaMenuBar;


export async function sleep_ms(msec_delay: Number) {
    await new Promise( resolve => setTimeout(resolve, + msec_delay) );
}

export async function pressKey (key: string) {
    await page.keyboard.press(key);
}

Before({ timeout: 60 * 1000 }, async function(this: CubeWorld) {
})

After({ timeout: 60 * 1000 }, async function(this: CubeWorld, scenario){
    if(scenario?.result?.status === 'FAILED' && scenario.willBeRetried === false)
        await this.context.tracing.stop({ path: `traces/${scenario?.gherkinDocument?.feature?.name}-${scenario?.pickle?.name}.zip` });
    await this.context.close();
    await this.browser.close();
})

// regression test exists
Given("user opens CubeStudio", { timeout: 60 * 1000 }, async function () {
	await this.init();
    page = this.page;
    theiaApp = this.theiaApp;
    menuBar = theiaApp.menuBar;
});

Given("user opens CubeStudio workspace in {string}", { timeout: 60 * 1000 }, async function(this: CubeWorld, workspacePath: string) {
    await this.init(workspacePath);
    page = this.page;
    theiaApp = this.theiaApp;
    menuBar = theiaApp.menuBar;
});

Given('quick command is opened', { timeout: 60 * 1000 }, async function () {
    quickCommand = theiaApp.quickCommandPalette;
    await quickCommand.open();
});

When('user opens file {string}', async function (this: CubeWorld, file_name:string) {
    this.scenarioData.textEditor = await theiaApp.openEditor(file_name, TheiaTextEditor);
});

When('user closes file {string}', async(file_name:string) =>{
    await textEditor.close();
});

When('user selects tab {string}', async function (this: CubeWorld, tabNumber:string) {
    // select tab
    const tabNumberInt: number = +tabNumber;
    const mainPanelClass = 'theia-main-content-panel';
    const tabs = await this.page.$$(`#${mainPanelClass} .theia-tabBar-tab-row li.p-TabBar-tab`);
    console.log(tabs.length);
    const selectedWidget = tabs[tabNumberInt - 1];
    await selectedWidget.click();
    this.scenarioData.selectedWidget = selectedWidget;

    // load the corresponding object model
    await this.getActiveTab();
});

When('user selects tab {string} in {string} panel', async function (this: CubeWorld, tabNumber:string, panel:string) {
    // select tab
    const tabNumberInt: number = +tabNumber;
    const mainPanelClass = 'theia-main-content-panel';
    const bottomPanelClass = 'theia-bottom-content-panel';
    let panelClass = mainPanelClass;
    if(panel === 'bottom') panelClass = bottomPanelClass;

    const tabs = await this.page.$$(`#${panelClass} .theia-tabBar-tab-row li.p-TabBar-tab`);
    console.log(tabs.length);
    const selectedWidget = tabs[tabNumberInt - 1];
    await selectedWidget.click();
    this.scenarioData.selectedWidget = selectedWidget;

    // load the corresponding object model
    await this.getActiveTab();
});

When('user close tab', async function (this: CubeWorld) {
    const closeIcon = await this.scenarioData.selectedWidget?.waitForSelector('div.p-TabBar-tabCloseIcon');
    await closeIcon?.click();
    await new Promise( resolve => setTimeout(resolve, + 6 * 1000) );
})

Then('tab should be closed', async() =>{
});

Then('file {string} should be closed', async(file_name:string) =>{
});

Then('should be visible and active after opening', async function (this:CubeWorld) {
    expect(await this.scenarioData.textEditor.isTabVisible()).toBe(true);
    expect(await this.scenarioData.textEditor.isDisplayed()).toBe(true);
    expect(await this.scenarioData.textEditor.isActive()).toBe(true);
})

When('user closes text editor', async() =>{
        textEditor.close();
});

Then('text editor should not be visible', async()=>{
	expect(await textEditor.isTabVisible()).toBe(false);
});


Then('text editor line {word} should be {string}', async(line_nr:string, text:string)=>{
        expect(await textEditor.textContentOfLineByLineNumber(+line_nr)).toBe(text);
});

Then('text editor line matching pattern {string} should be {string}', async(pattern:string, text:string)=>{
        expect(await textEditor.textContentOfLineContainingText(pattern)).toBe(text);
});

When('user runs quick command {string}', { timeout: 60 * 1000 }, async (quick_command:string) => {
	const quickCommandPalette = theiaApp.quickCommandPalette; 
    await quickCommandPalette.open();
    await quickCommandPalette.type(quick_command);
    await quickCommandPalette.trigger(quick_command);
    await quickCommandPalette.type('.yml');
    await page.keyboard.press('Enter');
	// await quickCommand.trigger(quick_command);
});

When('user type {string} in command palette', { timeout: 60 * 1000 }, async(text:string) =>{
	const quickCommandPalette = theiaApp.quickCommandPalette; 
    await quickCommandPalette.type(text);
});

When('user hits key {string}', { timeout: 60 * 1000 }, async(key:string) =>{
    await pressKey(key);
});
When('user presses key {string}', { timeout: 60 * 1000 }, async(key:string) =>{
    await pressKey(key);
});
When('user hits Enter', { timeout: 60 * 1000 }, async() =>{
    await pressKey('Enter');
});
When('user presses Enter', { timeout: 60 * 1000 }, async() =>{
    await pressKey('Enter');
});

// regression test exists
When('user selects menu {string}', { timeout: 60 * 1000 }, async(menu:string) =>{
    const subMenus = menu.split('/');
    await new Promise( resolve => setTimeout(resolve,+ 1000) ); // Workaround when menubar is not yet available
    const mainMenu = await menuBar.openMenu(subMenus[0]);
    subMenus.shift();
    const item = await mainMenu.menuItemByNamePath(...subMenus);
    await item?.click();
});

When('user deletes text line matching pattern {string}', async(text:string) =>{
        await textEditor.deleteLineContainingText(text);
});

When('user deletes text line number {word}', async(line_nr:string) =>{
        await textEditor.deleteLineByLineNumber(+line_nr);
});

When('user replaces text line {word} with {string}', async(line_nr:string, text:string) =>{
        await textEditor.replaceLineWithLineNumber(text, +line_nr);
});

When('user replaces line matching pattern {string} with {string}', async(pattern:string, text:string) =>{
        await textEditor.replaceLineContainingText(text, pattern);
});


When('user adds text {string} to new line after line matching pattern {string}', async(text:string, pattern:string) =>{
        await textEditor.addTextToNewLineAfterLineContainingText(pattern, text);
});


Then('text editor should be dirty', async()=>{
        expect(await textEditor.isDirty()).toBe(true);
});


Then('text editor should not be dirty', async()=>{
        expect(await textEditor.isDirty()).toBe(false);
});


When('user saves text', async()=>{
        await textEditor.save();
});

let aboutDialog: TheiaAboutDialog;

Then('About dialog should popup', async()=>{
	aboutDialog = new TheiaAboutDialog(theiaApp);
	expect(await aboutDialog.isVisible()).toBe(true);
});

When('user closes About dialog', async()=>{
	await aboutDialog.close();
});

Then('About dialog should disappear', async()=>{
	expect(await aboutDialog.isVisible()).toBe(false);
});

Then('explorer view should popup', async()=>{
	const explorerView = new TheiaExplorerView(theiaApp);
    expect(await explorerView.isDisplayed()).toBe(true);
});

Given('user pauses for {string} seconds', { timeout: 60 * 1000 }, async(delay:string)=>{
    await new Promise( resolve => setTimeout(resolve, + Number(delay) * 1000) );
    console.log("wait please");
});

Given('user get content of line {string}', { timeout: 60 * 1000 }, async(line:string)=>{
    const text = await textEditor.textContentOfLineByLineNumber(Number(line));
    console.log("@@@@@@@@@@ Line content");
    console.log(text);
});

Given('user replace content of line {string} with {string}', { timeout: 60 * 1000 }, async function(this:CubeWorld, line:string, content: string) {
    await this.scenarioData.textEditor.replaceLineWithLineNumber(content, Number(line));
    // await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    this.page.keyboard.press('Enter')
    this.page.keyboard.press('Backspace')
    this.page.keyboard.press('Backspace')
    this.page.keyboard.press('Backspace')
    await this.scenarioData.textEditor.save();
});

Given('content of line should be correct', { timeout: 60 * 1000 }, async()=>{
	
});

Given('content of line should be replaced', { timeout: 60 * 1000 }, async()=>{
	
});

export async function clickText(pattern:string) {
    const obj = page.locator(`text=${pattern} >> visible=true`).first();
    await obj.isEnabled();
    await obj.click({force:true});
}

export async function clickTextBelowText(pattern:string, below:string) {
    await page.locator(`text=${below}`).isVisible();
    await page.locator(`text=${pattern} >> visible=true`).click();
}

When ('user clicks object containing text {string} below text {string}', { timeout: 60 * 1000 }, async(pattern:string, below:string)=>{
    clickTextBelowText(pattern, below);
});

// regression test exists
When('user clicks object containing text {string}', { timeout: 60 * 1000 }, async(pattern:string)=>{
    await clickText(pattern);
});

export async function typeText(text:string) {
    await page.keyboard.insertText(text);
    await sleep_ms(200);
}
When('user types {string}', { timeout: 60 * 1000 }, async(text:string) =>{
    await typeText(text);
});

When('user clicks input box', async()=>{
	await page.locator('#quick-input-container > div > div.quick-input-header > div.quick-input-and-message > div.quick-input-filter > div.quick-input-box > div > div > input').click();
});

When('user clicks split editor icon', async()=>{
	await page.locator('#workbench\.action\.splitEditorRight').click();
});

async function clickExplorerIcon() {
    await page.locator("#shell-tab-explorer-view-container > div.theia-tab-icon-label > div.p-TabBar-tabIcon.codicon.codicon-files").first().click();
}
When('user clicks explorer icon', async()=>{
	await clickExplorerIcon();
});
export async function openExplorer() {
    await clickExplorerIcon();
}
When('user opens Explorer', async()=>{
	await clickExplorerIcon();
});
async function clickFinderIcon() {
    await page.locator("div.p-TabBar-tabIcon.cubeicon.cubeicon-finder").first().click();
}
async function clickSearchPanelIcon() {
    await page.locator("#shell-tab-search-view-container").first().click();
}

When('user clicks Finder icon', async()=>{
	await clickFinderIcon();
});

When('user clicks Search icon', async()=>{
    await openSearchPanel();
});

export async function openFinder() {
    await clickFinderIcon();
}

export async function openSearchPanel() {
    await clickSearchPanelIcon();
}

When('user opens Finder', async()=>{
	await openFinder();
});

When('user clicks tab {string}', { timeout: 60 * 1000 }, async(text:string) =>{
    await page.locator(':nth-match(div.p-TabBar-tabLabel:has-text("'+text+'"),1)').click();
    console.log(text);
});

When('user clicks tab {string} 2nd position', { timeout: 60 * 1000 }, async(text:string) =>{
    await page.locator(':nth-match(div.p-TabBar-tabLabel:has-text("'+text+'"),2)').click();
    console.log(text);
});

When('user hovers tab {string}', { timeout: 60 * 1000 }, async(text:string) =>{
        await page.locator(':nth-match(div.p-TabBar-tabLabel:has-text("'+text+'"),1)').hover();
        console.log(text);
});

When('user drags object to position {word} {word}', { timeout: 60 * 1000 }, async(x:string, y:string)=>{
	page.mouse.down();
    new Promise( resolve => setTimeout(resolve, 5000) );
    page.mouse.move(+x,+y);
    new Promise( resolve => setTimeout(resolve, 5000) );
    page.mouse.up();
});

When('user drags tab {string} to panel offset {word} {word}', { timeout: 60 * 1000 }, async(text:string, x:string, y:string)=>{
    // const main_panel = await page.locator('#theia-main-content-panel');
    const tab_to_drag = await page.locator(':nth-match(div.p-TabBar-tabLabel:has-text("'+text+'"),2)');
    // await tab_to_drag.dragTo(main_panel, {targetPosition:{x: +x, y:+y}});
    await tab_to_drag.click();
    await page.mouse.down();
    await page.mouse.move(+x,+y);
    await page.mouse.up();
    /*
    page.mouse.down();
    new Promise( resolve => setTimeout(resolve, 5000) );
    page.mouse.move(+x,+y);
    new Promise( resolve => setTimeout(resolve, 5000) );
    page.mouse.up();
    */
});

When('user closes tab {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, tab:string) {
    const mainPanelClass = 'theia-main-content-panel';
    const element = this.page.locator(`#${mainPanelClass} .p-TabBar li`, {hasText: tab});
    const closeIcon = element.locator(`div[title=Close]`);
    await closeIcon.click();
});

When('user scrolls down {word} pixels', async(pixels:string) =>{
    await page.mouse.wheel(0,-pixels);
});

When('user moves mouse down {word} pixels', async(pixels:string) =>{
    await page.mouse.wheel(0,-pixels);
});

When('user clicks config panel text {string}', { timeout: 60 * 1000 }, async(pattern:string)=>{
    // await page.frameLocator('iframe').locator('text='+pattern).click();
    // const config_panel = page.frame({url: });
    return;
});

Then('editor should be split to right', async() => {
    // expect(3).toBe(4);
})

When('user use html selector {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, selector:string) {
    const elementHtml = await page.$eval(selector, el => el.outerHTML);
    this.scenarioData.selector = selector;
    this.scenarioData.elementHtml = elementHtml;
});

Then('element should have class {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, className:string) {
    const classAttr = await this.scenarioData.element.getAttribute('class');
    await expect(classAttr).toBe(className);
});

Then('element should be {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, htmlElement:string) {
    await expect(this.scenarioData.elementHtml).toBe(htmlElement);
});

// #plugin-custom-editor\:2ec023fb-ae2d-4055-b351-aad0d399e174 > iframe


async function text_should_appear_on_screen (cw: CubeWorld, expected_text:string) {
    let locator = await cw.page.locator('text="'+expected_text+'" >> visible=true');
    expect(await locator.count()).toBeGreaterThan(0);
}
Then('text {string} should appear on screen', { timeout: 60 * 1000 }, async function (this: CubeWorld, expected_text:string) {
    await text_should_appear_on_screen(this, expected_text);
});
Then('text {string} should be visible on screen', { timeout: 60 * 1000 }, async function (this: CubeWorld, expected_text:string) {
    await text_should_appear_on_screen(this, expected_text);
});

export async function clickInputAtRightOfText(text:string) {
    await page.locator('input:right-of(:text("'+text+'"))').first().click();
}
When('user clicks input box at right of text {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputAtRightOfText(text);
});

export async function clickInputBoxAtLeftOfText(text:string) {
    await page.locator('input:left-of(:text("'+text+'"))').click();
}
When('user clicks input box at left of text {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxAtLeftOfText(text);
});

export async function clickInputBoxAboveText(text:string) {
    await page.locator('input:above(:text("'+text+'"))').click();
}
When('user clicks input box above text {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxAboveText(text);
});

export async function clickInputBoxBelowText(text:string) {
    await page.locator('input:below(:text("'+text+'"))').click();
}
When('user clicks input box below text {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxBelowText(text);
});

export async function clickInputBoxNearText(text:string) {
    await (await page.waitForSelector('input:near(:text("'+text+'")):visible', { state: 'visible' })).click();
}
When('user clicks input box near text {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxNearText(text);
});

export async function clickObjectWithSelector(selector:string) {
    await page.locator(selector).click();
}
When('user clicks object with selector {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, selector:string) {
    await clickObjectWithSelector(selector);
});

export async function clickButton(btn_label:string) {
    if (btn_label == 'Create Application Project' || btn_label == 'Open') {
        await sleep_ms(1000);
    }

    const regex = new RegExp(`^${btn_label}$`);
    await page.locator(`button`, {hasText: regex}).click();
}
When('user clicks button {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, btn_label:string) {
    await clickButton(btn_label);
});

export async function clickObject(loc_expr:string) {
    await page.locator(loc_expr).click();
}

export async function clickPencilIcon() {
    await clickObject('.cubeicon-edit-line');
}
When('user clicks pencil icon', { timeout: 60 * 1000 }, async function (this: CubeWorld) {
    await clickPencilIcon();
});


export async function clickPencilIconAtRightOfText(text:string) {
    await sleep_ms(200);
    await page.locator('.cubeicon-edit-line:right-of(:text("'+text+'"))').first().click();
}
When('user clicks pencil icon at right of text {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickPencilIconAtRightOfText(text);
});

export async function clickInputBoxWithText(text:string) {
    await page.locator('input[placeholder="'+text+'"]').click();
}
When('user clicks input box {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxWithText(text);
});

export async function clickFolderIcon() {
    await page.locator('.codicon-folder').click();
}
When('user clicks folder icon', { timeout: 60 * 1000 }, async function (this: CubeWorld) {
    await clickFolderIcon();
});

When('user select the left tab in bottom panel', { timeout: 60 * 1000 }, async function (this: CubeWorld) {
    const listofTabs = await CsUiFactory.newListOfCsUiElements(this.page, ['#theia-bottom-content-panel .p-TabBar-tab']);
    const leftTab = listofTabs.left().locator;
    await leftTab.click();
});

When('user sets {string} slider {string} to {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, position: string, thumb:string, value: number) {
    const listofsliders = await CsUiFactory.newListOfCsSlider(this.page);
    // for better code elegance, we can use object indexing to call class methods insetead of if else chain
    // example: listofsliders[position]().setLeftThumbValue(value)
    // however this code cause a typescript error
    if(position === 'top')
        if(thumb === 'min')
            await listofsliders.top().setLeftThumbValue(value);
        else
            await listofsliders.top().setRightThumbValue(value);
    else if(position === 'bottom')
        if(thumb === 'min')
            await listofsliders.bottom().setLeftThumbValue(value);
        else
            await listofsliders.bottom().setRightThumbValue(value);
    else if(position === 'left')
        if(thumb === 'min')
            await listofsliders.left().setLeftThumbValue(value);
        else
            await listofsliders.left().setRightThumbValue(value);
    else
        if(thumb === 'min')
            await listofsliders.right().setLeftThumbValue(value);
        else
            await listofsliders.right().setRightThumbValue(value);
});

When('user sets slider {string} {string} to {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, legend: string, thumb:string, value: number) {
    const listofsliders = await CsUiFactory.newListOfCsSlider(this.page);
    const sliderByLegend = listofsliders.getbyname(legend);
    
    if(thumb === 'min')
        await sliderByLegend?.setLeftThumbValue(value);
    else
        await sliderByLegend?.setRightThumbValue(value);
});

When('user clicks bottom panel', { timeout: 60 * 1000 }, async function (this: CubeWorld) {
    const panels = await CsUiFactory.newListOfCsPanels(this.page);
    await panels.bottom().locator.click();
    let mypanel = panels.top();

    console.log(mypanel.area);
    console.log(mypanel.area.MatrixSubArea(2,2,2,2));
});

When('user clicks panel {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, name:string) {
    const panels = await CsUiFactory.newListOfCsPanels(this.page);
    await panels.getbyname(name).locator.click();
});

// The following variables are used for IDE integration tests
let notificationsList: Array<string> = [];
let boardsList: Array<string> = [];
let mcusList: Array<string> = [];
let mpusList: Array<string> = [];
let expansionBoardsList: Array<string> = [];
let PartsList: Array<string> = [];


Then('user adds a screenshot to test report', async function (this: CubeWorld) {
    const image = await this.page?.screenshot();
    image && (await this.attach(image, 'image/png'));
});

async function userClonesRepository(repoUrl:string) {
       await page.locator('div[id="workbench.action.showCommands"][title="Command Palette (Ctrl+Shift+P)"]').waitFor({state:"visible"});
       await page.locator('div[id="workbench.action.showCommands"][title="Command Palette (Ctrl+Shift+P)"]').click();

       await page.locator('[aria-label="Type to narrow down results\\."]').waitFor({state:"visible"});
       await page.locator('[aria-label="Type to narrow down results\\."]').click();
       await page.locator('[aria-label="Type to narrow down results\\."]').fill('>git clone');

       await page.locator('span:has-text("Git: Clone...")').first().waitFor({state:"visible"});
       await page.locator('span:has-text("Git: Clone...")').first().click();

       await page.locator('[placeholder="Select Repository Location"]').waitFor({state:"visible"});
       await page.locator('[placeholder="Select Repository Location"]').click();

       await page.locator('[placeholder="Select Repository Location"]').fill(repoUrl);

       const locatorText=`a:has-text("Clone the Git repository: ${repoUrl}")`;
       await page.locator(locatorText).waitFor({state:"visible"});
       await page.locator(locatorText).click();
}

Then('user uses palette command to clone repository {string}',{ timeout: 60 * 1000 },async function (this: CubeWorld, repoUrl:string) {
    await userClonesRepository(repoUrl);
});

async function userSearchesForStringInCurrentPage(repoUrl:string) {
    const foundUrl = await page.$("text='" + repoUrl +"'");
    if (foundUrl)
    {
        // console.debug('text ' + repoUrl + ' was found');
        // here we should set the test result to PASSED since cloned repo was found
    }
    else{
      console.error('text ' + repoUrl + ' was not found');
      // here we should set the test result to FAILED since cloned repo was not found
      // or add an expect command
    }
}

Then('user searches for string {string} in current page', { timeout: 60 * 1000 },async function (this: CubeWorld, repoUrl:string) {
    await userSearchesForStringInCurrentPage(repoUrl);
});

async function userExpandsTestDirectory() {
    // console.debug('Entering user expands project directories');

    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    await page.locator('#files >> text=IDE_TESTS_FAKE_REPOSITORY').waitFor({state: "attached"});
    await page.locator('#files >> text=IDE_TESTS_FAKE_REPOSITORY').waitFor({state: "visible"});
    await page.locator('#files >> text=IDE_TESTS_FAKE_REPOSITORY').click();

    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    await page.locator('text=Files').first().waitFor({state: "attached"});
    await page.locator('text=Files').first().waitFor({state: "visible"});
    await page.locator('text=Files').first().click();

    await page.locator('text=textFile01.txt').waitFor({state: "attached"});
    await page.locator('text=textFile01.txt').waitFor({state: "visible"});
    await page.locator('text=textFile01.txt').click();

    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    // console.debug('Leaving user expands project directories');
}
Then('user expands fake repo project directories',{ timeout: 60 * 1000 }, async function (this: CubeWorld) {
    await userExpandsTestDirectory();
});

async function userSavesAllFiles() {

    await page.locator('[id="theia\\:menubar"] >> text=File').waitFor({state: "visible"});
    await page.locator('[id="theia\\:menubar"] >> text=File').click();

    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    await page.locator('text=Save All').waitFor({state: "visible"});
    await page.locator('text=Save All').click();

    // here we should find a way to detect that all files are saved instead of waiting
    await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );

    // console.debug("command Save All done");
}

Then('user saves all files' , async function (this: CubeWorld) {
    await userSavesAllFiles();
});

async function userClosesEditor() {
    await page.locator('[id="theia\\:menubar"] >> text=File').waitFor({state: "visible"});
    await page.locator('[id="theia\\:menubar"] >> text=File').click();

    await page.locator('text=Close Editor').waitFor({state: "visible"});
    await page.locator('text=Close Editor').click();

    await page.locator('div:nth-child(2) > .theia-TreeNodeContent > .theia-TreeNodeSegment.theia-ExpansionToggle').waitFor({state: "visible"});
    await page.locator('div:nth-child(2) > .theia-TreeNodeContent > .theia-TreeNodeSegment.theia-ExpansionToggle').click();

    await page.locator('.theia-TreeNodeSegment').first().waitFor({state: "visible"});
    await page.locator('.theia-TreeNodeSegment').first().click();
}

Then('user closes editor',{ timeout: 30 * 1000 }, async function (this: CubeWorld) {
    await userClosesEditor();
});

async function userPatchesFiletextFile01() {
    // console.debug('user patches file textFile01.txt');

    const textToFill = Date.now().toString() ;

    // console.debug('Added to file :' + textToFill);

    await page.locator('.view-lines > div:nth-child(1)').waitFor({state:"visible"});
    await page.locator('.view-lines > div:nth-child(1)').click();

    await page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill(textToFill);

    // console.debug('user patches file textFile01.txt done');
}

Then('user patches file textFile01.txt',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {
    await userPatchesFiletextFile01();
});

async function userAddsAllChangesToStagingArea() {
    // console.debug('staging all changes');

    await page.locator('[id="__more__"]').first().waitFor({state: "visible"});
    await page.locator('[id="__more__"]').first().click();

    const menuElements=page.locator('ul.p-Menu-content > li.p-Menu-item[data-type="submenu"]' );
    const counter = await menuElements.count();

    for (let index=0; index < counter; index++)
    {
      const currentNode=menuElements.nth(index);
      if (currentNode)
      {
        const nodeText = await currentNode.textContent();
        if (nodeText)
        {
        //   console.debug(nodeText);
          if (nodeText==="Changes")
          {
            currentNode.waitFor({state: "visible"});
            currentNode.click();

            const targetElement=page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.stage.all"]');
            if (targetElement)
            {
            //   console.debug("user clicks on staging all changes button : found target element");
              targetElement.waitFor({state: "visible"});
              targetElement.click();
              await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
              break;
            }
            else
            {
              console.error("user clicks on staging all changes button : did not find target element");
            }
          }
        }
      }
    }
    // console.debug('staging all changes done');
}

Then('user clicks on staging all changes button',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {
    await userAddsAllChangesToStagingArea();
});

async function userClicksOnCommitSignedOff() {
    // console.debug('click on commit signed off');

    await page.locator('[id="__more__"]').first().waitFor({state: "visible"});
    await page.locator('[id="__more__"]').first().click();

    const menuElements=page.locator('ul.p-Menu-content > li.p-Menu-item[data-type="submenu"]' );
    const counter = await menuElements.count();

    for (let index=0; index < counter; index++)
    {
       const currentNode=menuElements.nth(index);
      if (currentNode)
      {
        const nodeText = await currentNode.textContent();
        if (nodeText)
        {
        //   console.debug(nodeText);
          if (nodeText==="Commit")
          {
            currentNode.waitFor({state: "visible"});
            currentNode.click();

            const targetElement=page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.commit.signOff"]');
            if (targetElement)
            {
            //   console.debug('user clicks on commit signed off button: target element found');
              targetElement.waitFor({state: "visible"});
              targetElement.click();
              await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
              break;
            }
            else
            {
              console.error("user clicks on commit signed off button: target element not found");
            }
          }
        }
      }
    }
    // console.debug('click on Signed off done');
}

Then('user clicks on commit signed off button',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {
    await userClicksOnCommitSignedOff();
});

async function userEntersCommitMessage(commitMessage:string ) {
    // console.debug('user enters commit message');

    await page.locator('textarea').waitFor({state: "visible"});
    await page.locator('textarea').click();

    await page.locator('textarea').fill(commitMessage);

    await page.locator(`text=${commitMessage}`).waitFor({state: "visible"});
    await page.locator(`text=${commitMessage}`).press('Control+Enter');

    // for user to see result visually
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    // console.debug('user enters commit message done');
}

Then('user enters commit message {string}',{ timeout: 300 * 1000 }, async function (this: CubeWorld,commitMessage:string) {
    await userEntersCommitMessage(commitMessage);
});
async function userGoesToHistoryView() {
    // console.debug('user goes to History view');

    await page.locator('[id="theia\\:menubar"] >> text=View').waitFor({state: "visible"});
    await page.locator('[id="theia\\:menubar"] >> text=View').click();

    const targetElement=page.locator('li.p-Menu-item[data-command="scm-history:open-branch-history"]');
    if (targetElement)
    {
    //   console.debug('user goes to History view : target element found');
      await targetElement.waitFor({state: "visible"});
      await targetElement.click();

      // for user to see result visually
      await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    }
    else
    {
      console.error('user goes to History view : target element not found');
    }
    // console.debug('user goes to History view done');
}

Then('user goes to History view',{ timeout: 30 * 1000 }, async function (this: CubeWorld) {
    await userGoesToHistoryView();
});

async function userExpectToFindCommits(expectedCommits:string ) {
    const historyElements=page.locator('div.headLabel.noWrapInfo.noselect');
    const counter : number= await historyElements.count();

    // console.debug('user expects ' + expectedCommits + ' commits in git history');
    // console.debug('user found ' + counter + ' commit messages in History view');

    let commitsText="List of commits found in git history window\n";
    // console.debug('list of commits found in git history');
    for (let index = 0; index < counter; index++) {
      const currentObject=historyElements.nth(index);

      if (currentObject)
      {
        const message=await currentObject.textContent();
        if (message) {
        //   console.debug('commit message #' + index + ':[' + message + ']');
          commitsText+=  message  + '\n';
        }
      }
    }

    const commitsToFind=Number(expectedCommits);

    if (counter !== commitsToFind) { commitsText = 'FAILURE\n' + commitsText ;} 

    return 'found ' + counter + ' commits in git history view\n' + 
           'expecting to find ' + commitsToFind +' commits\n' 
           + commitsText ;
}

Then('user expects to find {string} commits in History view',{ timeout: 30 * 1000 }, async function (this: CubeWorld, expectedCommits:string) {
    let commitsText="";
    commitsText = await userExpectToFindCommits(expectedCommits);
    // console.debug('user expects to find commits in History view : commitsText is ' + commitsText);
    if (commitsText)
    {
        this.attach(commitsText);
        expect(commitsText).not.toContain('FAILURE');
    }
});

async function userCreatesASetOfNewFiles(numberOfFiles:string) {
    // console.debug('user creates a set of new files\n');

    for (let index = 0; index < Number(numberOfFiles); index++) {
    //   console.debug('creating file #' + index);
      await page.locator('#files >> text=Files').first().waitFor({state:"visible"});
      await page.locator('#files >> text=Files').first().click({ button: 'right' });

      await page.locator('text=New File').waitFor({state:"visible"});
      await page.locator('text=New File').click();

      await page.locator('text=New FileIDE_TESTS_FAKE_REPOSITORY/FilesOK >> input[type="text"]').fill(`textFile${index}.txt`);
      await page.locator('button:has-text("OK")').click();
    }
    // console.debug('user creates a set of new files done');
}

Then('user creates a set of {string} new files',{ timeout: 300 * 1000 }, async function (this: CubeWorld,numberOfFiles:string) {
    await userCreatesASetOfNewFiles(numberOfFiles);
});

async function userChecksStagingArea(numberOfFiles:string) {
    // console.debug('user checks that ' + numberOfFiles + ' files are in the staging area');

    const numberOfFilesChanged= page.locator('div.theia-TreeNodeSegmentGrow > div.theia-scm-inline-actions-container > div.notification-count-container > span.notification-count').first();
    if (numberOfFilesChanged)
    {
        const value=await numberOfFilesChanged.textContent();
        // console.debug('found ' + value + ' files changed');
        expect.soft(value).toBe(numberOfFiles);
    }
    else{
        console.debug('found no file changed');
    }
    //  console.debug('user checks that ' + numberOfFiles + ' files are in the staging area done');
}

Then('user checks that {string} files are in the staging area',{ timeout: 60 * 1000 }, async function (this: CubeWorld,numberOfFiles:string) {
    await userChecksStagingArea(numberOfFiles);
});

async function userSearchesForCommitInHistoryView(commitText:string) {
    const textToFind=`text=${commitText}`;
    // console.debug('user searches for commit, textToFind=' + textToFind);
    const foundCommit = await page.$(textToFind);

    if (foundCommit)
    {
        //console.debug('text Initial commit was found');
    }
    else{
      console.error('text Initial commit was not found');
      // here we should set the test result to FAILED since Initial commit message was not found
    }
    expect(foundCommit).toBeTruthy();
}

Then('user searches for commit {string} in History view', { timeout: 60 * 1000 },async function (this: CubeWorld, commitText:string) {
    await userSearchesForCommitInHistoryView(commitText);
});

async function userAddsAllFilesToStagingArea() {
    // console.debug('user adds all files to staging area');

    const numberOfFilesChanged= page.locator('div.theia-scm-inline-actions-container > div.notification-count-container > span.notification-count').first();
    if (numberOfFilesChanged)
    {
      const value=await numberOfFilesChanged.textContent();
      console.debug('userAddsAllFilesToStagingArea : found ' + value + ' files changed');
    }
    else{
      console.debug('userAddsAllFilesToStagingArea: found no file changed');
    }

    await page.locator('[id="__more__"]').first().waitFor({state: "visible"});
    await page.locator('[id="__more__"]').first().click();

    const menuElements=page.locator('ul.p-Menu-content > li.p-Menu-item[data-type="submenu"]' );
    const counter = await menuElements.count();

    for (let index=0; index < counter; index++)
    {
      const currentNode=menuElements.nth(index);
      if (currentNode)
      {
        const nodeText = await currentNode.textContent();
        if (nodeText)
        {
        //   console.debug(nodeText);
          if (nodeText==="Changes")
          {
            currentNode.waitFor({state: "visible"});
            currentNode.click();

            const targetElement=page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.stage.all"]');
            if (targetElement)
            {
            //   console.debug("user adds all files to staging area : found target element");
              targetElement.waitFor({state: "visible"});
              targetElement.click();
              await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
              break;
            }
            else
            {
              console.error("user adds all files to staging area : did not find target element");
            }
          }
        }
      }
    }
    // console.debug('user adds all files to staging area done');
}

Then('user adds all files to staging area',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {
    await userAddsAllFilesToStagingArea();
});

async function clickSourceControlIcon() {
    await page.locator("div.p-TabBar-tabIcon.codicon.codicon-source-control").first().click();
}

When('user clicks Source Control icon', async()=>{
	await clickSourceControlIcon();
});

function buildVerdictFromNotificationsList(notifications:string[]) {

    let errorsFound=0;

     if (!notifications.includes('project build'))
    {
        errorsFound++;
        expect.soft(errorsFound,'No notification about project build was found').toBe(0);
        // test verdict should be set to FAILED
    }
    for (const iterator of notifications) {
      if (iterator.includes('Error') || iterator.includes("Connection timed out") || iterator.includes("has exited with code") )
      {
        errorsFound++;
        // console.debug(notifications[index]);
      }
    }

    if (errorsFound === 0)
    {
      console.debug('buildVerdictFromNotificationsList : no error found in notifications, setting verdict to PASSED');
    }
    else {
      console.error('buildVerdictFromNotificationsList : Found ' + errorsFound + ' error traces, setting verdict to FAILED');
    }
}

Then('user builds verdict from notifications', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
     buildVerdictFromNotificationsList(notificationsList);
});

Then('user clears notifications list', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
    notificationsList = [];
});

async function userGetsListOfItems(products:string) {

    const itemsList: Array<string> = [];
    itemsList.push('List of ' + products + ' found in Finder');

    let locatorText=`button:has-text("${products}")`;
    await page.locator(locatorText).first().click();

    await page.locator("text=Product(s) found:").first().waitFor({state: "visible"});
    const productString=await page.locator("text=Product(s) found:").first().textContent();

    let numberOfProducts=0;
    if (productString) { numberOfProducts = Number (productString.replace("Product(s) found:","")) ; }

    let nextPageButtonIsVisible=false;
    let counter=0;

    if (numberOfProducts !== 0)
    {
        do
        {
            await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
            await page.locator("text=Product(s) found:").waitFor({state: "visible"});

            //locatorText='tbody >> tr.MuiTableRow-root';
            locatorText='td > a.MuiLink-root';

            const currentPageListOfProducts=page.locator(locatorText);

            numberOfProducts = await currentPageListOfProducts.count();
            // console.debug('Found ' + numberOfProducts + ' products in current page');

            for(let index=0;index<numberOfProducts;index++)
            {
                const currentItem =  currentPageListOfProducts.nth(index);
                const itemName=await currentItem.textContent();
                if (itemName) { if (!itemsList.includes(itemName)) { itemsList.push(itemName);} }
            }

            const nextPageButton=page.locator('div.MuiTablePagination-actions >> button[aria-label="Go to next page"] ');
            nextPageButtonIsVisible= await nextPageButton.isEnabled();

            if (nextPageButtonIsVisible)
            {
                page.locator('div.MuiTablePagination-actions >> button[aria-label="Go to next page"]').click();
            }
            else
            {
                counter++;
            }
        } while (counter != 2);
    }
    return itemsList;
}

async function userBuildsListOfProducts(products:string) {

    let itemsList: Array<string> = [];
    itemsList= await userGetsListOfItems(products);

    if (products === "MCU")   { mcusList=itemsList;  }
    if (products === "Board") { boardsList=itemsList;}
    if (products === "MPU")   { mpusList=itemsList;  }
    if (products === "Part")  { PartsList=itemsList;}
    if (products === "Expansion Board")  { expansionBoardsList=itemsList;}

    // if (mcusList.length !== 0 ) { console.table(mcusList);} else { console.debug('MCUs list is empty');}
    // if (boardsList.length !== 0 ) { console.table(boardsList);} else { console.debug('Boards list is empty');}
    // if (mpusList.length !== 0 ) { console.table(mpusList);} else { console.debug('MPUs list is empty');}
    // if (PartsList.length !== 0 ) { console.table(PartsList);} else { console.debug('Parts list is empty');}
    // if (expansionBoardsList.length !== 0 ) { console.table(expansionBoardsList);} else { console.debug('Expansion boards list is empty');}
}

Then('user builds list of {string}', { timeout: 90 * 1000 }, async function (this: CubeWorld, products:string) {
    await userBuildsListOfProducts(products);
});

async function userAddsListToTestReport(listToReport:string) {

    let textToReport="";
    let itemsList: Array<string> = [];

    if (listToReport === "MCU")   { itemsList=mcusList;  }
    if (listToReport === "Board") { itemsList=boardsList;}
    if (listToReport === "MPU")   { itemsList=mpusList;  }
    if (listToReport === "Part")  { itemsList=PartsList;}
    if (listToReport === "Expansion Board")  { itemsList=expansionBoardsList;}

    for (const item of itemsList) {
        textToReport += item + '\n';
    }
    return textToReport;
}

Then('user adds {string} list to test report', { timeout: 90 * 1000 }, async function (this: CubeWorld, listToReport: string) {
    const textToReport=await userAddsListToTestReport(listToReport);
    this.attach(textToReport);
});

Then('user opens About menu', { timeout: 60 * 1000 },async function (this: CubeWorld) {
    await this.page.locator('text=Help').waitFor({state: "visible"});
    await this.page.locator('text=Help').click();

    await this.page.locator('text=About').waitFor({state: "visible"});
    await this.page.locator('text=About').click();
});

Then('user closes About menu', { timeout: 60 * 1000 },async function (this: CubeWorld) {
    await this.page.locator('text=OK').waitFor({state: "visible"});
    await this.page.locator('text=OK').click();
});

Then('user gets cube studio version', async function (this: CubeWorld) {
    const cubeStudioVersion = await this.page.locator('div.about-details').textContent();
    await this.attach('cubeStudio version :' + cubeStudioVersion);
});

Then('user gets theia extensions', async function (this: CubeWorld) {

    const extensionsList = this.page.locator('div.theia-aboutDialog >> ul.theia-aboutExtensions >> li');
    const counter = (await extensionsList.count()) - 1;
    const menu: Array<string> = [];

    let allExtensionsText = '';

    for (let index = 0; index <= counter; index++)
    {
        const textContent = await extensionsList.nth(index).textContent();
        allExtensionsText += textContent + '\n';

        if (textContent)
        {
            menu.push(textContent);
        }
    }
    await this.attach(allExtensionsText);
    // console.table(menu);

});

Then('user gets notifications after {string}', { timeout: 20 * 1000 }, async function (this: CubeWorld, notificationText:string) {

    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    const notificationsListLocator = this.page.locator('div.theia-notification-message span') ;

    const childrenCounter = await notificationsListLocator.count();
    // console.debug('user gets notifications : found ' + childrenCounter + ' notifications');

    for (let index = 0; index < childrenCounter; index++) {
      const message=await notificationsListLocator.nth(index).innerText();

      // console.debug('message ' + index + ' : ' + message);
      // console.debug('============== notificationsList before');
      // console.table(notificationsList);
      // console.debug('==============');

      if (message) {
        // console.debug(message);
        const element=notificationsList.some(item => item.includes(message));
        if (!element)
        {
           notificationsList.push(notificationText + ':' + message);
        }
      }
    }

    // const image = await this.page.screenshot();
    // image && (await this.attach(image, 'image/png'));

    let notificationsText = 'List of notifications after ' + notificationText + '\n';

    for (const iterator of notificationsList) {
      notificationsText += iterator + '\n';
    }
    await this.attach(notificationsText);

    // console.debug('============== Leaving user gets notifications after ' + notificationText);
});

async function userConvertsProject(projectName:string) {
    await page.locator('text=Terminal').waitFor({state: "visible"});
    await page.locator('text=Terminal').click();

    await page.locator('text=Run Build Task').waitFor({state: "visible"});
    await page.locator('text=Run Build Task').click();

    const locatorText=`text=${projectName}: Convert`;
    await page.locator(locatorText).waitFor({state: "visible"});
    await page.locator(locatorText).click();
}

Then('user converts project {string}', async function (this: CubeWorld, projectName:string) {
    await userConvertsProject(projectName);
});

async function userBuildsProject(projectName:string, swProjectName:string,releaseToBuild:string ) {
    await page.locator('text=Terminal').waitFor({state: "visible"});
    await page.locator('text=Terminal').click();

    await page.locator('text=Run Build Task').waitFor({state: "visible"});
    await page.locator('text=Run Build Task').click();

    const locatorText=`text=${projectName}: Build ${swProjectName} | main | ${releaseToBuild}`;
    await page.locator(locatorText).waitFor({state: "visible"});
    await page.locator(locatorText).click();

    // here we should find a way to wait for the build to be finished when terminal traces are available
    await new Promise( resolve => setTimeout(resolve, + 6 * 1000) );
}

Then('user builds project {string} {string} {string}', async function (this: CubeWorld, projectName:string, swProjectName:string, releaseToBuild:string) {
    await userBuildsProject(projectName, swProjectName,releaseToBuild);
});

Then ('user clicks on Synchronize button', async function (this: CubeWorld) {
    await this.page.locator('text=Synchronize').waitFor({state:"visible"});
    await this.page.locator('text=Synchronize').click();
    await new Promise( resolve => setTimeout(resolve, + 10 * 1000) );
});

Given('user creates application project {string} with board {string}', async function (this: CubeWorld, proj_name:string, device_name:string) {

    await this.page.locator('button:has-text("Board")').first().click();

    await clickText('Search Product');
    await typeText(device_name);
    await pressKey('Enter');

    const locatorText=`a:has-text("${device_name}")`;
    await this.page.locator(locatorText).click();

    await clickButton('Start a project');
    await clickInputAtRightOfText('Project name:');
    await typeText(proj_name);

    await clickFolderIcon();
    await clickButton('Open');

    await clickButton('Create Application Project');
});

Given('user adds a new software project {string} in application project panel', async function (this: CubeWorld, sw_proj:string) {
    await clickText('Add a SW project');
    await clickInputAtRightOfText('Software Project name:');
    await typeText(sw_proj);
    await clickButton('Create SW Project');
});

Given('user adds a new software component to project {string} in application project panel', async function (this: CubeWorld, sw_proj:string) {
    await clickPencilIconAtRightOfText(sw_proj);
});

Then('user gets conversion log messages from console', async function (this: CubeWorld) {
    await this.attach("user gets conversion log messages from console: nothing possible until now");
});

Then('user gets build log messages from console', async function (this: CubeWorld) {
    await this.attach("user gets conversion log messages from console: nothing possible until now");
});

Then('user adds debugger console' , async function (this: CubeWorld) {

    await this.page.locator('[id="theia\\:menubar"] >> text=View').waitFor({state: "visible"});
    await this.page.locator('[id="theia\\:menubar"] >> text=View').click();

    await this.page.locator('text=Debug Console').waitFor({state: "visible"});
    await this.page.locator('text=Debug Console').click();
});

Then('user sets a conversion verdict', async function (this: CubeWorld) {
    await this.attach("user sets a conversion verdict : nothing done until now");
});

Then('user sets a build verdict from console traces', async function (this: CubeWorld) {
    await this.attach("user sets a build verdict from console traces: nothing done until now");
});

async function userCreatesADebugConfiguration() {
    await page.locator('text=Run').waitFor({state: "visible"});
    await page.locator('text=Run').click();

    await page.locator('text=Start Debugging').waitFor({state: "visible"});
    await page.locator('text=Start Debugging').click();

    await page.locator('text=Cube (PoC): Generic Context Based STM32 Launch').waitFor({state: "visible"});
    await page.locator('text=Cube (PoC): Generic Context Based STM32 Launch').click();
}

Then('user creates a debug configuration' , async function (this: CubeWorld) {
    await userCreatesADebugConfiguration();
});

async function userStartsDebugger() {
    await page.locator('text=Run').first().waitFor({state: "visible"});
    await page.locator('text=Run').first().click();

    await page.locator('text=Start Debugging').waitFor({state: "visible"});
    await page.locator('text=Start Debugging').click();

    // waiting time to let debugger start as soon as we are not able to read status from terminal
    await new Promise( resolve => setTimeout(resolve, + 10 * 1000) );
}

Then('user starts debugger', { timeout: 15 * 1000 }, async function (this: CubeWorld) {
    await userStartsDebugger();
});

Then('user performs {string} loops on breakpoints', async function (this: CubeWorld , numberOfLoops:string) {
    await this.page.locator('.theia-TreeContainer > div > .theia-TreeNode > .theia-TreeNodeContent > .theia-TreeNodeSegment').first().click();

    for (let index = 0; index < Number(numberOfLoops); index++)
    {
        console.debug('=== user performs loop #' + index + ' on breakpoint' + index);

        await this.page.locator('.debug-action.codicon.codicon-debug-continue').waitFor({state: "visible"});
        await this.page.locator('.debug-action.codicon.codicon-debug-continue').click();
        await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );

        const iVariableLocator=this.page.locator(`div.theia-debug-console-variable > span[title="${index+1}"]`);
        if (iVariableLocator)
        {
            const iValue = Number(await iVariableLocator.textContent());
            // console.debug('extracted i value :' + iValue);
            // console.debug('expected i value  :' + (index+1));

            expect(iValue).toBe(index+1);
        }
        const image = await this.page?.screenshot();
        image && (await this.attach(image, 'image/png'));
    }
});

Then('user selects debug context for application {string}, sw project {string} and {string} version', async function (this: CubeWorld, application:string, swProject:string, version:string) {
    const locatorText=` text=[${application} | ${swProject} | main | ${version}]`;

    await this.page.locator(locatorText).waitFor({state: "visible"});
    await this.page.locator(locatorText).click();
});

Then('testuser patches file main.c', async function (this: CubeWorld) {

    await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).waitFor({state: "visible"});
    await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).click();

    await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').press('Enter');
    await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill('#include "main.h"\nint main() {\n    int i=0;\n  while(1) {\n    i++;\n  }\n  return 0;\n}');
});

Then('testuser adds breakpoints to file main.c', async function (this: CubeWorld) {
    await this.page.locator('text=i++;').waitFor({state: "visible"});
    await this.page.locator('text=i++;').click();

    await this.page.locator('text=Run').waitFor({state: "visible"});
    await this.page.locator('text=Run').click();

    await this.page.locator('text=Toggle Breakpoint').waitFor({state: "visible"});
    await this.page.locator('text=Toggle Breakpoint').click();
});

Then('testuser opens file main.c of sw project {string} of application {string}', async function (this: CubeWorld, swProjectName:string,projectName:string) {

    // click on explorer icon
    await this.page.locator('.p-TabBar-tabIcon.codicon').first().waitFor({state: "visible"});
    await this.page.locator('.p-TabBar-tabIcon.codicon').first().click();

    const locatorText1=`#files >> text=${projectName}`;
    await this.page.locator(locatorText1).waitFor({state: "visible"});
    await this.page.locator(locatorText1).click();

    // Second we open SW project
    const locatorText2=`#files >> text=${swProjectName}`;

    await this.page.locator(locatorText2).waitFor({state: "visible"});
    await this.page.locator(locatorText2).click();

    await this.page.locator('text=src').waitFor({state: "visible"});
    await this.page.locator('text=src').click();

    await this.page.locator('text=main.c').first().waitFor({state: "visible"});
    await this.page.locator('text=main.c').first().click();
});