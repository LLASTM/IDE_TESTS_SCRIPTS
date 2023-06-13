// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics.
//
// All rights reserved. This program and the accompanying materials
// is the property of STMicroelectronics and must not be
// reproduced, disclosed to any third party, or used in any
// unauthorized manner without written consent.
// *****************************************************************************

import { expect } from '@playwright/test';
import { TheiaExplorerView } from '../models/theia-explorer-view';
import { TheiaApp } from '../models/theia-app';
import { TheiaAboutDialog } from '../models/theia-about-dialog';
import { TheiaMenuBar } from '../models/theia-main-menu';
import { TheiaQuickCommandPalette } from '../models/theia-quick-command-palette';
import { TheiaTextEditor } from '../models/theia-text-editor';
import { CsUiFactory } from './CsUiElement';

import { defineParameterType } from '@cucumber/cucumber'

defineParameterType({
    name: 'workspace_path',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'file_path',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'tab_name',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'panel_name',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'editor_line',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'editor_pattern',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'quick_command',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'key',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'menu_path',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'ui_obj_text',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'typed_in_text',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'html_selector',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'html_class',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'html_element',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'button_name',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'input_name',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'slider_legend',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'application_name',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'device_name',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'sw_project_name',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'preference_string',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'preference_value',
    regexp: [/'([^']*)'/, /"([^"]*)"/],
    transformer: function (singleQ, doubleQ) {
        return singleQ ? singleQ : doubleQ
    }
})

defineParameterType({
    name: 'position',
    regexp: /top|bottom|left|right/,
    transformer: s => s
})

defineParameterType({
    name: 'thumb',
    regexp: /min|max/,
    transformer: s => s
})

defineParameterType({
    name: 'editor_line_number',
    regexp: /[0-9]+/,
    transformer: s => s
})

defineParameterType({
    name: 'seconds_cnt',
    regexp: /[0-9]+/,
    transformer: s => s
})

defineParameterType({
    name: 'x_coord_px',
    regexp: /[0-9]+/,
    transformer: s => s
})

defineParameterType({
    name: 'y_coord_px',
    regexp: /[0-9]+/,
    transformer: s => s
})

defineParameterType({
    name: 'x_offset_px',
    regexp: /[0-9]+/,
    transformer: s => s
})

defineParameterType({
    name: 'y_offset_px',
    regexp: /[0-9]+/,
    transformer: s => s
})

defineParameterType({
    name: 'thumb_slider_int_value',
    regexp: /[0-9]+/,
    transformer: s => s
})

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

setDefaultTimeout(10 * 1000);
const { atMostOnePicklePerTag } = parallelCanAssignHelpers
const myTagRule = atMostOnePicklePerTag(["@config"]);
setParallelCanAssign(myTagRule)

import { Page } from '@playwright/test';
import CubeWorld from "./CubeWorld"

setWorldConstructor(CubeWorld);

let page: Page;
let theiaApp: TheiaApp;
let quickCommand: TheiaQuickCommandPalette;
let textEditor: TheiaTextEditor;
let menuBar: TheiaMenuBar;

export async function sleep_ms(msec_delay: Number) {
    await new Promise( resolve => setTimeout(resolve, + msec_delay) );
}

export async function pressKey (key: string) {
    await page.keyboard.press(key);
}

Before({ timeout: 60 * 1000 }, async function(this: CubeWorld, scenario) {
    const path = require('path');
    this.featureRelDir = path.parse(scenario.gherkinDocument.uri).dir;
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


Given("user opens CubeStudio workspace in {workspace_path}", { timeout: 120 * 1000 }, async function(this: CubeWorld, workspacePath: string) {
    await this.init(this.featureRelDir +'/'+ workspacePath);
    page = this.page;
    theiaApp = this.theiaApp;
    menuBar = theiaApp.menuBar;
});

Given('quick command is opened', { timeout: 60 * 1000 }, async function () {
    quickCommand = theiaApp.quickCommandPalette;
    await quickCommand.open();
});

When('user opens file {file_path}', async function (this: CubeWorld, file_name:string) {
    this.scenarioData.textEditor = await theiaApp.openEditor(file_name, TheiaTextEditor);
});

When('user closes file {file_path}', async(file_name:string) =>{
    await textEditor.close();
});

When('user selects tab {tab_name}', async function (this: CubeWorld, tabNumber:string) {
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

When('user selects tab {tab_name} in {panel_name} panel', async function (this: CubeWorld, tabNumber:string, panel:string) {
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

Then('file {file_path} should be closed', async(file_name:string) =>{
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


Then('text editor line {word} should be {editor_line}', async(line_nr:string, text:string)=>{
        expect(await textEditor.textContentOfLineByLineNumber(+line_nr)).toBe(text);
});

Then('text editor line matching pattern {editor_pattern} should be {string}', async(pattern:string, text:string)=>{
        expect(await textEditor.textContentOfLineContainingText(pattern)).toBe(text);
});

When('user runs quick command {quick_command}', { timeout: 60 * 1000 }, async (quick_command:string) => {
	const quickCommandPalette = theiaApp.quickCommandPalette; 
    await quickCommandPalette.open();
    await quickCommandPalette.type(quick_command);
    await quickCommandPalette.trigger(quick_command);
    await quickCommandPalette.type('.yml');
    await page.keyboard.press('Enter');
});

When('user type {quick_command} in command palette', { timeout: 60 * 1000 }, async(text:string) =>{
	const quickCommandPalette = theiaApp.quickCommandPalette; 
    await quickCommandPalette.type(text);
});

When('user hits key {key}', { timeout: 60 * 1000 }, async(key:string) =>{
    await pressKey(key);
});
When('user presses key {key}', { timeout: 60 * 1000 }, async(key:string) =>{
    await pressKey(key);
});
When('user hits Enter', { timeout: 60 * 1000 }, async() =>{
    await pressKey('Enter');
});
When('user presses Enter', { timeout: 60 * 1000 }, async() =>{
    await pressKey('Enter');
});

// async function userSelectsMenu(menu:string) {
//     const subMenus = menu.split('/');
//     await new Promise( resolve => setTimeout(resolve,+ 1000) ); // Workaround when menubar is not yet available
//     const mainMenu = await menuBar.openMenu(subMenus[0]);
//     await new Promise( resolve => setTimeout(resolve,+ 1000) ); // <== Added by [LLA]
//     subMenus.shift();
//     const item = await mainMenu.menuItemByNamePath(...subMenus);
//     await item?.click();
// }
// regression test exists
When('user selects menu {menu_path}', { timeout: 60 * 1000 }, async(menu:string) =>{
    const subMenus = menu.split('/');
    await new Promise( resolve => setTimeout(resolve,+ 1000) ); // Workaround when menubar is not yet available
    const mainMenu = await menuBar.openMenu(subMenus[0]);
    subMenus.shift();
    const item = await mainMenu.menuItemByNamePath(...subMenus);
    await item?.click();
});

When('user deletes text line matching pattern {editor_pattern}', async(text:string) =>{
        await textEditor.deleteLineContainingText(text);
});

When('user deletes text line number {editor_line_number}', async(line_nr:string) =>{
        await textEditor.deleteLineByLineNumber(+line_nr);
});

When('user replaces text line {editor_line_number} with {editor_line}', async(line_nr:string, text:string) =>{
        await textEditor.replaceLineWithLineNumber(text, +line_nr);
});

When('user replaces line matching pattern {editor_pattern} with {editor_line}', async(pattern:string, text:string) =>{
        await textEditor.replaceLineContainingText(text, pattern);
});


When('user adds text {editor_line} to new line after line matching pattern {editor_pattern}', async(text:string, pattern:string) =>{
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
});

Given('user pauses for {seconds_cnt} seconds', { timeout: 60 * 1000 }, async(delay:string)=>{
    await new Promise( resolve => setTimeout(resolve, + Number(delay) * 1000) );
});

Given('user get content of line {editor_line_number}', { timeout: 60 * 1000 }, async(line:string)=>{
    const text = await textEditor.textContentOfLineByLineNumber(Number(line));
    console.log("@@@@@@@@@@ Line content");
    console.log(text);
});

Given('user replace content of line {editor_line_number} with {editor_line}', { timeout: 60 * 1000 }, async function(this:CubeWorld, line:string, content: string) {
    await this.scenarioData.textEditor.replaceLineWithLineNumber(content, Number(line));
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
    //await obj.isVisible(); // Added by LLA
}

export async function clickTextBelowText(pattern:string, below:string) {
    await page.locator(`text=${below}`).isVisible();
    await page.locator(`text=${pattern} >> visible=true`).click();
}

When ('user clicks object containing text {string} below text {string}', { timeout: 60 * 1000 }, async(pattern:string, below:string)=>{
    clickTextBelowText(pattern, below);
});

// regression test exists
When('user clicks object containing text {ui_obj_text}', { timeout: 60 * 1000 }, async(pattern:string)=>{
    await clickText(pattern);
});

export async function typeText(text:string) {
    await page.keyboard.insertText(text);
    await sleep_ms(200);
}
When('user types {typed_in_text}', { timeout: 60 * 1000 }, async(text:string) =>{
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
    //await page.locator('.p-TabBar-tabIcon.codicon.codicon-files').first().click();
    // Promise( resolve => setTimeout(resolve, 2000) );
}
When('user opens Explorer', async()=>{
	await clickExplorerIcon();
});

async function clickFinderIcon() {
    await page.locator("div.p-TabBar-tabIcon.codicon.cubeicon.cubeicon-finder").first().click();
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

When('user clicks tab {tab_name}', { timeout: 60 * 1000 }, async(text:string) =>{
    await page.locator(':nth-match(div.p-TabBar-tabLabel:has-text("'+text+'"),1)').click();
    console.log(text);
});

When('user clicks tab {tab_name} 2nd position', { timeout: 60 * 1000 }, async(text:string) =>{
    await page.locator(':nth-match(div.p-TabBar-tabLabel:has-text("'+text+'"),2)').click();
    console.log(text);
});

When('user hovers tab {tab_name}', { timeout: 60 * 1000 }, async(text:string) =>{
        await page.locator(':nth-match(div.p-TabBar-tabLabel:has-text("'+text+'"),1)').hover();
        console.log(text);
});

When('user drags object to position {x_coord_px} {y_coord_px}', { timeout: 60 * 1000 }, async(x:string, y:string)=>{
	page.mouse.down();
    new Promise( resolve => setTimeout(resolve, 5000) );
    page.mouse.move(+x,+y);
    new Promise( resolve => setTimeout(resolve, 5000) );
    page.mouse.up();
});

When('user drags tab {tab_name} to panel offset {x_offset_px} {y_offset_px}', { timeout: 60 * 1000 }, async(text:string, x:string, y:string)=>{
    const tab_to_drag = await page.locator(':nth-match(div.p-TabBar-tabLabel:has-text("'+text+'"),2)');
    await tab_to_drag.click();
    await page.mouse.down();
    await page.mouse.move(+x,+y);
    await page.mouse.up();
});

When('user closes tab {tab_name}', { timeout: 60 * 1000 }, async function (this: CubeWorld, tab:string) {
    const mainPanelClass = 'theia-main-content-panel';
    const element = this.page.locator(`#${mainPanelClass} .p-TabBar li`, {hasText: tab});
    const closeIcon = element.locator(`div[title=Close]`);
    await closeIcon.click();
});

When('user scrolls down {y_offset_px} pixels', async(pixels:string) =>{
    await page.mouse.wheel(0,-pixels);
});

When('user moves mouse down {y_offset_px} pixels', async(pixels:string) =>{
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

When('user use html selector {html_selector}', { timeout: 60 * 1000 }, async function (this: CubeWorld, selector:string) {
    const elementHtml = await page.$eval(selector, el => el.outerHTML);
    this.scenarioData.selector = selector;
    this.scenarioData.elementHtml = elementHtml;
});

Then('element should have class {html_class}', { timeout: 60 * 1000 }, async function (this: CubeWorld, className:string) {
    const classAttr = await this.scenarioData.element.getAttribute('class');
    await expect(classAttr).toBe(className);
});

Then('element should be {html_element}', { timeout: 60 * 1000 }, async function (this: CubeWorld, htmlElement:string) {
    await expect(this.scenarioData.elementHtml).toBe(htmlElement);
});

async function count_visible_text (cw: CubeWorld, expected_text:string) : Promise<number> {
    let locator = cw.page.locator('text="'+expected_text+'" >> visible=true');
    return (await locator.count());
}

async function text_should_appear_on_screen (cw: CubeWorld, expected_text:string) {
    let locator = cw.page.locator('text="'+expected_text+'" >> visible=true >> nth=0');
    await locator.waitFor();
}
Then('text {ui_obj_text} should appear on screen', { timeout: 60 * 1000 }, async function (this: CubeWorld, expected_text:string) {
    await text_should_appear_on_screen(this, expected_text);
});
Then('text {ui_obj_text} should be visible on screen', { timeout: 60 * 1000 }, async function (this: CubeWorld, expected_text:string) {
    await text_should_appear_on_screen(this, expected_text);
});

Then('text {ui_obj_text} should not be visible on screen', { timeout: 60 * 1000 }, async function (this: CubeWorld, expected_text:string) {
    return (await count_visible_text(this, expected_text) == 0);
});

export async function clickInputAtRightOfText(text:string) {
    await page.locator('input:right-of(:text("'+text+'"))').first().click();
}
When('user clicks input box at right of text {ui_obj_text}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputAtRightOfText(text);
});

export async function clickInputBoxAtLeftOfText(text:string) {
    await page.locator('input:left-of(:text("'+text+'"))').click();
}
When('user clicks input box at left of text {ui_obj_text}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxAtLeftOfText(text);
});

export async function clickInputBoxAboveText(text:string) {
    await page.locator('input:above(:text("'+text+'"))').click();
}
When('user clicks input box above text {ui_obj_text}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxAboveText(text);
});

export async function clickInputBoxBelowText(text:string) {
    await page.locator('input:below(:text("'+text+'"))').click();
}
When('user clicks input box below text {ui_obj_text}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxBelowText(text);
});

export async function clickInputBoxNearText(text:string) {
    await (await page.waitForSelector('input:near(:text("'+text+'")):visible', { state: 'visible' })).click();
}
When('user clicks input box near text {ui_obj_text}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickInputBoxNearText(text);
});

export async function clickObjectWithSelector(selector:string) {
    await page.locator(selector).click();
}
When('user clicks object with selector {html_selector}', { timeout: 60 * 1000 }, async function (this: CubeWorld, selector:string) {
    await clickObjectWithSelector(selector);
});

export async function clickButton(btn_label:string) {
    if (btn_label == 'Create Application Project' || btn_label == 'Open') {
        await sleep_ms(1000);
    }

    const regex = new RegExp(`^${btn_label}$`);
    await page.locator(`button`, {hasText: regex}).click();
}
When('user clicks button {button_name}', { timeout: 60 * 1000 }, async function (this: CubeWorld, btn_label:string) {
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
When('user clicks pencil icon at right of text {ui_obj_text}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await clickPencilIconAtRightOfText(text);
});

export async function clickInputBoxWithText(text:string) {
    await page.locator('input[placeholder="'+text+'"]').click();
}
When('user clicks input box {input_name}', { timeout: 60 * 1000 }, async function (this: CubeWorld, text:string) {
    await (await CsUiFactory.newListOfCsInput(this.page)).getbyname(text).unique().locator.click();
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

When('user sets {position} slider {thumb} to {thumb_slider_int_value}', { timeout: 60 * 1000 }, async function (this: CubeWorld, position: string, thumb:string, value: number) {
    const listofsliders = await CsUiFactory.newListOfCsSlider(this.page);
    // for better code elegance, we can use object indexing to call class methods insetead of if else chain
    // example: listofsliders[position]().setLeftThumbValue(value)
    // however this code cause a typescript error
    if(thumb === 'min')
            await listofsliders.position(position).setLeftThumbValue(value);
        else
            await listofsliders.position(position).setRightThumbValue(value);
});

When('user sets slider {slider_legend} {thumb} to {thumb_slider_int_value}', { timeout: 60 * 1000 }, async function (this: CubeWorld, legend: string, thumb:string, value: number) {
    const listofsliders = await CsUiFactory.newListOfCsSlider(this.page);
    const sliderByLegend = listofsliders.getbyname(legend).unique();
    
    if(thumb === 'min')
        await sliderByLegend?.setLeftThumbValue(value);
    else
        await sliderByLegend?.setRightThumbValue(value);
});

When('user clicks {position} panel', { timeout: 60 * 1000 }, async function (this: CubeWorld, position: string) {
    const panels = await CsUiFactory.newListOfCsPanels(this.page);
    await panels.position(position).locator.click();
});

When('user clicks panel {panel_name}', { timeout: 60 * 1000 }, async function (this: CubeWorld, name:string) {
    const panels = await CsUiFactory.newListOfCsPanels(this.page);
    await panels.getbyname(name).unique().locator.click();

});

When('user selects context menu from {string} item {string}', { timeout: 60 * 1000 }, async function (this: CubeWorld, contextMenu: string, contextMenuItem:string) {
    const ContextMenues = await CsUiFactory.newlistOfContextMenu(this.page);
    const contextMenuInstance = ContextMenues.getbyname(contextMenu).unique();
    await contextMenuInstance.click();
    await contextMenuInstance.selectItem(contextMenuItem);
});

// The following variables are used for IDE integration tests
let notificationsList: Array<string> = [];      // This list is used to build a test verdict since no access to console logs is possible
let boardsList: Array<Array<string>>=[];          // contains the list of boards found in the Finder
let mcusList: Array<Array<string>>=[];            // contains the list of mcus found in the Finder
let mpusList: Array<Array<string>>=[];            // contains the list of mpus found in the Finder
let expansionBoardsList: Array<Array<string>>=[]; // contains the list of expansion boards found in the Finder
let PartsList: Array<Array<string>>=[];           // contains the list of parts found in the Finder

// This step is used to attach a screenshot to the html test report
Then('user adds a screenshot to test report', async function (this: CubeWorld) {
    const image = await this.page?.screenshot();
    image && (await this.attach(image, 'image/png'));
});

When('user synchronizes database', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
    await this.page.locator('text=Synchronize').click();
});

/**
 * 
 * @param repoUrl : The url of the git repository to be cloned
 */
async function userSelectsRepositoryLink(repoUrl:string) {
       const locatorText=`a:has-text("Clone the Git repository: ${repoUrl}")`;
       await page.locator(locatorText).waitFor({state:"visible"});
       await page.locator(locatorText).click();
}

// This step opens the command palette, and uses the git clone command to clone a repo which url is provided
Then('user selects repository {string} link',{ timeout: 30 * 1000 },async function (this: CubeWorld, repoUrl:string) {
    await userSelectsRepositoryLink(repoUrl);
});

// This function searches for a string in the current page
/**
 * 
 * @param textToFind : the text to search in the current page 
 */
async function userSearchesForStringInCurrentPage(textToFind:string) {
    const foundUrl = await page.$("text='" + textToFind +"'");
    if (foundUrl)
    {
        IDEtrace('DEBUG','text ' + textToFind + ' was found');
        // here we should set the test result to PASSED since cloned repo was found
    }
    else{
        IDEtrace('ERROR','text ' + textToFind + ' was not found');
        // here we should set the test result to FAILED since cloned repo was not found
        // or add an expect command
    }
}

// This step is used to search for a string provided as a parameter inside the current page
Then('user searches for string {string} in current page', { timeout: 30 * 1000 },async function (this: CubeWorld, repoUrl:string) {
    await userSearchesForStringInCurrentPage(repoUrl);
});

// this function is used to patch file main.c of a project during IDE tests
async function userPatchesFiletextFile01() {
    IDEtrace('DEBUG','userPatchesFiletextFile01:testuser patches file textFile01.txt');

    const textToFill = Date.now().toString() ;
    IDEtrace('DEBUG','Added to file :' + textToFill);

    await page.locator('.view-lines > div:nth-child(1)').waitFor({state:"visible"});
    await page.locator('.view-lines > div:nth-child(1)').click();

    await page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill(textToFill);

    IDEtrace('DEBUG','userPatchesFiletextFile01:testuser patches file textFile01.txt done');
}

// this step is used to patch file main.c of a project during IDE tests - it is ide tests specific
Then('testuser patches file textFile01.txt',{ timeout: 60 * 1000 }, async function (this: CubeWorld) {
    await userPatchesFiletextFile01();
});

// This function is used to add all files to the staging area
async function userAddsAllChangesToStagingArea() {
    IDEtrace('DEBUG','userAddsAllChangesToStagingArea:staging all changes');

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
          if (nodeText==="Changes")
          {
            currentNode.waitFor({state: "visible"});
            currentNode.click();

            const targetElement=page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.stage.all"]');
            if (targetElement)
            {
                IDEtrace('DEBUG',"user clicks on staging all changes button : found target element");
                targetElement.waitFor({state: "visible"});
                targetElement.click();
                await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
                break;
            }
            else
            {
                IDEtrace('ERROR',"user clicks on staging all changes button : did not find target element");
            }
          }
        }
      }
    }
    IDEtrace('DEBUG','staging all changes done');
}

// This step is used to add all files to the staging area
Then('user clicks on staging all changes button',{ timeout: 90 * 1000 }, async function (this: CubeWorld) {
    await userAddsAllChangesToStagingArea();
});

// This function is called when performing a commit (signed off) operation
async function userClicksOnCommitSignedOff() {
    IDEtrace('DEBUG','userClicksOnCommitSignedOff:click on commit signed off');

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
          if (nodeText==="Commit")
          {
            currentNode.waitFor({state: "visible"});
            currentNode.click();

            const targetElement=page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.commit.signOff"]');
            if (targetElement)
            {
              IDEtrace('DEBUG','userClicksOnCommitSignedOff:user clicks on commit signed off button: target element found');
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
    IDEtrace('DEBUG','click on Signed off done');
}

// This step is called when performing a commit (signed off) operation
Then('user clicks on commit signed off button',{ timeout: 10 * 1000 }, async function (this: CubeWorld) {
    await userClicksOnCommitSignedOff();
});

/**
 * : This is the commit message to be added
 *
 * @param {string} commitMessage
 */
async function userEntersCommitMessage(commitMessage:string ) {
    
    IDEtrace('DEBUG','userEntersCommitMessage');
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    await page.locator('textarea').waitFor({state: "visible"});
    await page.locator('textarea').click();
    IDEtrace('DEBUG','click on text area done');

    await page.locator('textarea').fill(commitMessage);
    IDEtrace('DEBUG','commit message [' + commitMessage + '] filled');

    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    await page.locator(`text=${commitMessage}`).waitFor({state: "visible"});
    await page.locator(`text=${commitMessage}`).press('Control+Enter');
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    IDEtrace('DEBUG','press ctrl + Enter done');

    IDEtrace('DEBUG','userEntersCommitMessage done');

}

// This step is used to add a commit message
Then('user enters commit message {string}',{ timeout: 20 * 1000 }, async function (this: CubeWorld,commitMessage:string) {
    await userEntersCommitMessage(commitMessage);
});

async function userExpectsToFindCommits(expectedCommitsNumber:string)
{
    let foundCommitsMessage="";
    IDEtrace('DEBUG','user expects to find commits in History view : expected commits number is ' + expectedCommitsNumber);

    const numberOfCommitsNodes=page.locator('div.history-container >> div.listContainer >> div[data-test-id="virtuoso-scroller"] >> div[data-viewport-type="element"] >> div[data-test-id="virtuoso-item-list"] >> div[data-index]'); 
    const counter : number= await numberOfCommitsNodes.count();
    IDEtrace('DEBUG','user found ' + counter + ' commit messages in History view');
    IDEtrace('DEBUG','user expects ' + expectedCommitsNumber + ' commits in git history');

    foundCommitsMessage="List of commits found in git history window\n";
    if (counter === Number(expectedCommitsNumber))
    {
        IDEtrace('DEBUG','The number of commits in History view matches what user expects');
    }
    else
    {
        IDEtrace('ERROR','The number of commits in History view does not match what user expects');
        foundCommitsMessage = 'FAILURE\n' + foundCommitsMessage ;
    }

    await page.waitForSelector('div.commitListElement >> div.containerHead >> div.headContent >> div.headLabelContainer >> div.commitTime');
    await page.waitForSelector('div.commitListElement >> div.containerHead >> div.headContent >> div.headLabelContainer >> div.commitTime');

    // trying to extract each commit message and time
    for (let index = 0; index < counter; index++)
    {
        const currentObject=numberOfCommitsNodes.nth(index);
                
        if (currentObject)
        {                          
            try
            {
                const oneCommitElementCommitTime=currentObject.locator('div.commitListElement >> div.containerHead >> div.headContent >> div.headLabelContainer >> div.commitTime'); 
                const oneCommitElementCommitMessage=currentObject.locator('div.commitListElement >> div.containerHead >> div.headContent >> div.headLabelContainer >> div.headLabel');
                
                let commitTimeText="NO_COMMIT_TIME";
                let commitMessageText="NO_COMMIT_MESSAGE";
                
                if (oneCommitElementCommitTime !== null)
                {
                    const tmpValue= await oneCommitElementCommitTime.textContent();
                    if (tmpValue !== null)
                    {
                        commitTimeText = tmpValue ;
                    }
                }
                if (oneCommitElementCommitMessage !== null)
                {
                    const tmpValue= await oneCommitElementCommitMessage.textContent();
                    if (tmpValue !== null)
                    {
                        commitMessageText = tmpValue ;
                    }
                }
                IDEtrace('DEBUG','commit message #' + index + ':[' + commitMessageText + ':' + commitTimeText + ']');
                foundCommitsMessage += 'commit message #' + index + ':[' + commitMessageText + ':' + commitTimeText + ']' + '\n';

            } 
            catch (except)
            {
                IDEtrace('ERROR','failed to access commit message #' + index );
                console.log(except);
            }              
        }
    }
    
    //context.attach(foundCommitsMessage,'text/plain');
    //expect(foundCommitsNumber).not.toContain('FAILURE');

    return foundCommitsMessage ;

}
// step used when user wants to compare the number of commits found in git history to an expected number
Then('user expects to find {string} commits in History view',{ timeout: 300 * 1000 }, async function (this: CubeWorld, expectedCommits:string) {
    const foundCommitsMessage = await userExpectsToFindCommits(expectedCommits);
    this.attach(foundCommitsMessage);
});

async function rightClickText(pattern:string) {
    const obj = page.locator(`text=${pattern} >> visible=true`).first();
    await obj.isEnabled();
    await obj.click({button: 'right'});
    await obj.isVisible();
}
When('user stops program for debug',{ timeout: 300 * 1000 },async function (this: CubeWorld) {
    await this.page.pause();
});
When('user right clicks on text {string}',{ timeout: 10 * 1000 }, async function (this: CubeWorld,textToClick:string) {
    await rightClickText(textToClick);
});
// This function is test specific, it consists in creating a number of empty files
// This number of files is the argument to this function
async function userCreatesASetOfNewFiles(numberOfFiles:string) {
    IDEtrace('DEBUG','user creates a set of new files');

    for (let index = 0; index < Number(numberOfFiles); index++) {
      IDEtrace('DEBUG','creating file #' + index);

      await rightClickText('Files');
      clickText('New File');
      await page.locator('text=New FileIDE_TESTS_FAKE_REPOSITORY/FilesOK >> input[type="text"]').fill(`textFile${index}.txt`);
      await page.locator('button:has-text("OK")').click();
    }
    IDEtrace('DEBUG','user creates a set of new files done');
}

// This step is used to create a set of files, used for some git related tests
Then('user creates a set of {string} new files',{ timeout: 60 * 1000 }, async function (this: CubeWorld,numberOfFiles:string) {
    await userCreatesASetOfNewFiles(numberOfFiles);
});

async function userChecksStagingArea(numberOfFiles:string) {
    IDEtrace('DEBUG','user checks that ' + numberOfFiles + ' files are in the staging area');

    const numberOfFilesChanged= page.locator('div.theia-TreeNodeSegmentGrow > div.theia-scm-inline-actions-container > div.notification-count-container > span.notification-count').first();
    if (numberOfFilesChanged)
    {
        const value=await numberOfFilesChanged.textContent();
        IDEtrace('DEBUG','found ' + value + ' files changed');
        
        //expect.soft does not work with cucumber !!!!
        //expect.soft(value).toBe(numberOfFiles);
    }
    else{
        IDEtrace('DEBUG','found no file changed');
    }
    IDEtrace('DEBUG','user checks that ' + numberOfFiles + ' files are in the staging area done');
}

Then('user checks that {string} files are in the staging area',{ timeout: 30 * 1000 }, async function (this: CubeWorld,numberOfFiles:string) {
    await userChecksStagingArea(numberOfFiles);
});

async function userSearchesForCommitInHistoryView(commitText:string) {
    const textToFind=`text=${commitText}`;
    IDEtrace('DEBUG','user searches for commit, textToFind=' + textToFind);
    const foundCommit = await page.$(textToFind);

    if (foundCommit)
    {
        IDEtrace('DEBUG','text Initial commit was found');
    }
    else{
        IDEtrace('ERROR','text Initial commit was not found');
        // here we should set the test result to FAILED since Initial commit message was not found
    }
    expect(foundCommit).toBeTruthy();
}

Then('user searches for commit {string} in History view', { timeout: 30 * 1000 },async function (this: CubeWorld, commitText:string) {
    await userSearchesForCommitInHistoryView(commitText);
});

async function userAddsAllFilesToStagingArea() {
    IDEtrace('DEBUG','user adds all files to staging area');

    const numberOfFilesChanged= page.locator('div.theia-scm-inline-actions-container > div.notification-count-container > span.notification-count').first();
    if (numberOfFilesChanged)
    {
      const value=await numberOfFilesChanged.textContent();
      IDEtrace('DEBUG','userAddsAllFilesToStagingArea : found ' + value + ' files changed');
    }
    else{
        IDEtrace('DEBUG','userAddsAllFilesToStagingArea: found no file changed');
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
          if (nodeText==="Changes")
          {
            currentNode.waitFor({state: "visible"});
            currentNode.click();

            const targetElement=page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.stage.all"]');
            if (targetElement)
            {
              IDEtrace('DEBUG',"user adds all files to staging area : found target element");
              targetElement.waitFor({state: "visible"});
              targetElement.click();
              await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
              break;
            }
            else
            {
                IDEtrace('ERROR',"user adds all files to staging area : did not find target element");
            }
          }
        }
      }
    }
    IDEtrace('DEBUG','user adds all files to staging area done');
}

Then('user adds all files to staging area',{ timeout: 30 * 1000 }, async function (this: CubeWorld) {
    await userAddsAllFilesToStagingArea();
});

async function clickSourceControlIcon() {
    await page.locator("div.p-TabBar-tabIcon.codicon.codicon-source-control").first().click();
}

When('user clicks Source Control icon', async()=>{
	await clickSourceControlIcon();
});

async function userBuildsConfiguration(swProjectName:string,configurationToBuild:string) {
    try{
        page.locator('text=Build ' + swProjectName + ' | main | ' + configurationToBuild).first().click();
        await page.locator('.theia-TreeNode.theia-CompositeTreeNode.theia-ExpandableTreeNode.theia-mod-selected > .theia-TreeNodeContent > .theia-TreeNodeSegment.flex > .theia-TreeNodeSegment').click();
        await new Promise( resolve => setTimeout(resolve, + 20 * 1000) );
    } 
    catch
    {
        IDEtrace('DEBUG','userBuildsConfiguration:could not launch build command');
    }
}

async function userCleansBuildsConfiguration(swProjectName:string, configurationToBuild:string) {
    try{
        await page.locator('text=Clean and Build ' + swProjectName + ' | main | ' + configurationToBuild ).first().click();
        await page.locator('.theia-TreeNode.theia-CompositeTreeNode.theia-ExpandableTreeNode.theia-mod-selected > .theia-TreeNodeContent > .theia-TreeNodeSegment.flex > .theia-TreeNodeSegment').click();
        await new Promise( resolve => setTimeout(resolve, + 20 * 1000) );
    }
    catch
    {
        userCleansBuildsConfiguration('DEBUG','userBuildsConfiguration:could not launch build command');
    }
}
async function buildVerdictFromNotificationsList(buildFlag:string) {

    let errorsFound=0;
    let updatNotificationsText="";

    // if (buildFlag === 'true')
    // {
    //     if (!notificationsList.includes('project build'))
    //     {
    //         errorsFound++;
    //         //expect.soft does not work with cucumber !!!!
    //         //expect.soft(errorsFound,'Testing if errorsFound is 0').toBe(0);
    //     }
    // }
    const notificationsListLength=notificationsList.length;
    IDEtrace('DEBUG','found ' + notificationsListLength + ' notifications in list');
    IDEtrace('DEBUG','Dumping ERRORS found in notifications list');

    for (let index=0;index<notificationsListLength;index++)
    {
        const currentItem=notificationsList[index];
        if (currentItem.includes('ERROR') || currentItem.includes("Connection timed out") || currentItem.includes("has exited with code") || currentItem.includes("couldn't create connection to server") )
        {
            errorsFound++;
            console.log('ERROR ' + errorsFound + ' : ' + currentItem);
        }
        updatNotificationsText += currentItem + '\n';
    }
    IDEtrace('DEBUG','End of dumping ERRORS found in notifications list');

    if (errorsFound === 0)
    {
      IDEtrace('INFO','buildVerdictFromNotificationsList : no error found in notifications, setting verdict to PASSED');
      updatNotificationsText += 'buildVerdictFromNotificationsList : no error found in notifications, setting verdict to PASSED' + '\n';
    }
    else {
      IDEtrace('ERROR','buildVerdictFromNotificationsList : Found ' + errorsFound + ' error traces, setting verdict to FAILED');
      updatNotificationsText += 'buildVerdictFromNotificationsList : Found ' + errorsFound + ' error traces, setting verdict to FAILED';
    }
    return updatNotificationsText;
}

// This step is called when user tries to build a verdict from the notifications list
Then('user builds verdict from notifications', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
     await buildVerdictFromNotificationsList('true');
});

// This step is used to clear the list of notifications that may be used to build a test verdict
// as long as it is not possible to use the console traces
Then('user clears notifications list', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
    notificationsList = [];
});

async function userclearsNotifications() {
    // clearing notifications
    try {
        await page.locator('span.codicon-bell-dot').click();
        await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
        await page.locator('.theia-notification-actions > .codicon.codicon-clear-all').click();
    }
    catch
    {
        IDEtrace('DEBUG','no item found for New Notifications');
    }
    //console.table(notificationsList);
    notificationsList = [];
    IDEtrace('DEBUG','notifications list cleared');
}
async function userOpensClockConfigurationView() {
    IDEtrace('DEBUG','Opening clock configuration view');
    await page.locator('[data-testid="clock_button_open"] span').click();
    await new Promise( resolve => setTimeout(resolve, + 15 * 1000) );
    await page.locator('[id="shell-tab-clock\\:tree\\:panel"] > .p-TabBar-tabCloseIcon').click();
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
}
async function userOpensPinoutView() {
    IDEtrace('DEBUG','Opening pinout view');
    await page.locator('[data-testid="pinout_button_open"] span').click();
    await new Promise( resolve => setTimeout(resolve, + 8 * 1000) );
    await page.locator('[id="shell-tab-pinout\\:panel"] > .p-TabBar-tabCloseIcon').click();
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
}
async function userRefreshesTasksList() {
    IDEtrace('DEBUG','Refreshing tasks list');          
    await page.locator('.p-TabBar-tabIcon.theia-plugin-view-container').first().click();
    await page.locator('[id="task-manager-tasks\\.refresh-as-tabbar-toolbar-item"]').first().click();
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    await page.locator('[id="task-manager-tasks\\.refresh-as-tabbar-toolbar-item"]').first().click();
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    // await page.locator('.p-TabBar-tabIcon.theia-plugin-view-container').first().click(); // keeping tasks list opened
    IDEtrace('DEBUG','tasks list is refreshed now');
}
async function userClosesOpenedWindows(products:string,deviceName:string) {
    // now we close all windows opened
    IDEtrace('DEBUG','closing all opened windows');

    try {
        const locatorText='[id="shell-tab-product\\:\\:hardware\\:\\:' + products.toLocaleLowerCase() + '\\:\\:' + deviceName + '"] > .p-TabBar-tabCloseIcon';
        await page.locator(locatorText).click();
        await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

        IDEtrace('DEBUG','All opened windows should be closed now');
    }
    catch
    {
        IDEtrace('ERROR','Failed to close opened windows');
    }
}

async function userGetsTheiaStatusBar(deviceName:string, deviceStatus:string,projectName:string, swProjectName:string) {
    const locatorText="div[id='theia-statusBar']";
    const statusBar=await page.locator(locatorText).textContent();
    // IDEtrace('DEBUG','userGetsTheiaStatusBar: status bar value is [' + statusBar + ']');
    if (statusBar) { 
        try 
        {
            const context=statusBar.split(']')[0].replace('[',''); 
            IDEtrace('INFO','device:' + deviceName + ', context:[' + context + ']');
            if (context !== projectName + ' | ' + swProjectName + ' | main | debug')
            {
                IDEtrace('ERROR','device:' + deviceName + ', device status:' + deviceStatus + ', unexpected context ' + context + ',from status bar for project ' + projectName + ' and sw project name ' + swProjectName);
             }
        }
        catch
        {
            IDEtrace('ERROR','device:' + deviceName + ', device status:' + deviceStatus + ', Failed to extract context from status bar for project ' + projectName + ' and sw project name ' + swProjectName);
        }
    }
}
async function userSelectsFileMainDotC(projectName:string,swProjectName:string) {
    
    IDEtrace('DEBUG','Entering userSelectsFileMainDotC');
    await openExplorer();

    page.setDefaultTimeout(10000);
    try
    {
        await page.locator('#files >> text=' + projectName).waitFor({state: "visible"});
        await page.locator('#files >> text=' + projectName).click();
        //await clickText(projectName);
        await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
        IDEtrace('DEBUG','click on ' + projectName + ' done');
    }
    catch
    {
        IDEtrace('ERROR','click on ' + projectName + ' failed');
    }
    try
    {
        await page.locator('#files >> text=' + swProjectName).waitFor({state: "visible"});
        await page.locator('#files >> text=' + swProjectName).click();
        //await clickText(swProjectName);
        await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
        IDEtrace('DEBUG','click on ' + swProjectName + ' done');
    }
    catch
    {
        IDEtrace('ERROR','click on ' + swProjectName + ' failed');
    }

    try
    {
        await page.locator(':text-is("src")').first().waitFor({state: "visible"});
        await page.locator(':text-is("src")').first().click();

        IDEtrace('DEBUG','click on src directory done');
    }
    catch
    {
        IDEtrace('ERROR','click on src directory failed');
    }  
    try
    {  
        await page.locator(':text-is("main.c")').first().waitFor({state: "visible"});
        await page.locator(':text-is("main.c")').first().click();
        //await clickText('main.c');
        await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
        IDEtrace('DEBUG','click on file main.c done');
    }
    catch
    {
        IDEtrace('ERROR','Failed to click on file main.c');
        //notificationsList.push('Error : Failed to click on file main.c');
    }
    page.setDefaultTimeout(30000);
    IDEtrace('DEBUG','Leaving userSelectsFileMainDotC');
}

async function  deleteProjectFromWorkspace(projectName:string) {
    IDEtrace('DEBUG','Entering deleteProjectFromWorkspace');
    openExplorer();
    
    try
    {
        await page.locator('#files >> text=' + projectName).first().waitFor({state: "visible"});
        await page.locator('#files >> text=' + projectName).first().click({
            button: 'right'
        });
        await page.locator('text=Delete').first().waitFor({state: "visible"});
        await page.locator('text=Delete').first().click();

        await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
        await page.locator('text=OK').waitFor({state: "visible"});
        await page.locator('text=OK').click();
        await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

        IDEtrace('INFO','project should be deleted now');
    }
    catch
    {
        IDEtrace('ERROR','Failed to delete project');
    }
    IDEtrace('DEBUG','Leaving deleteProjectFromWorkspace');
}
When('user starts IDE tests for {string} {string} {string} {string} {string} {string} {string} {string}', { timeout: 7200 * 1000 },async function (this: CubeWorld, 
    products:string,
    createProjectFlag:string,
    deleteProjectFlag:string,
    checkContextFlag:string,
    buildFlag:string, 
    displayPinoutViewFlag:string,
    displayClockViewFlag:string,
    numberOfTestsToRun:string
    ) {
    
    await userStartsIDETests(this,products,createProjectFlag,deleteProjectFlag,checkContextFlag,buildFlag,displayPinoutViewFlag,displayClockViewFlag,numberOfTestsToRun);

});
async function userStartsIDETests(  context:CubeWorld,
                                    products:string,  
                                    createProjectFlag:string,
                                    deleteProjectFlag:string,
                                    checkContextFlag:string,
                                    buildFlag:string, 
                                    displayPinoutViewFlag:string,
                                    displayClockViewFlag:string,
                                    numberOfTestsToRun:string) {

    IDEtrace('INFO','createProjectFlag=' + createProjectFlag);
    IDEtrace('INFO','deleteProjectFlag=' + deleteProjectFlag);
    IDEtrace('INFO','checkContextFlag=' + checkContextFlag);
    IDEtrace('INFO','buildFlag=' + buildFlag);
    IDEtrace('INFO','displayPinoutViewFlag=' + displayPinoutViewFlag);
    IDEtrace('INFO','displayClockViewFlag=' + displayClockViewFlag);
    IDEtrace('INFO','numberOfTestsToRun=' + numberOfTestsToRun);

    let textForTestReport="NO_TEXT_FOR_REPORT";

    let currentList: Array<Array<string>>=[];

    if (products === 'Board') { if (boardsList) { currentList=boardsList;} }
    if (products === 'MCU') { if (mcusList) { currentList=mcusList;}}
    if (products === 'MPU') { if (mpusList) { currentList=mpusList;}}

    // IDEtraceTable(currentList);
    IDEtrace('DEBUG','List length is ' + currentList.length);

    // we must click on Board/MCU/MPU here
    const locatorText='button:has-text("' + products + '")'
    await page.locator(locatorText).first().click();
    await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );

    let tested_devices=0;
    const testsResultsList: Array<Array<string>>=[];
    const tabHeader:Array<string>=['Test date','Test name','Test result'];
    testsResultsList.push(tabHeader);

    let endLoop=0;

    if (Number(numberOfTestsToRun) === -1)
    {
        endLoop=currentList.length ;
    }
    else
        endLoop= Number(numberOfTestsToRun);
    IDEtrace('DEBUG', endLoop + ' tests will be run');

    for(let index=1;index<endLoop+1;index++)
    {
        let deviceName='unknown_device';
        let deviceStatus='unknown_status';

        let testName='UNKNOWN_TEST_NAME' ;
        let testDate='UNKNOWN_TEST_DATE';

        for(let index2=0;index2<currentList[0].length;index2++)
        {
            const field=currentList[0][index2];
            
            // IDEtrace('DEBUG','field ' + index2 + '=[' + field + ']');
            if ( field === 'Status')
            {
                deviceStatus=currentList[index][index2];
                // IDEtrace('DEBUG', 'device status is : ' + deviceStatus);
            }
            if ( field === 'Part Number')
            {
                deviceName=currentList[index][index2];
                // IDEtrace('DEBUG', 'device name is : ' + deviceName);
                testName='TEST-' + deviceName ;

                const date=new Date();
                testDate=date.toTimeString().split(' ')[0];
            }
            
        }
        if ( (deviceStatus === 'Active') || (deviceStatus === 'Coming soon') )
        {
            const projectName='project_' + deviceName;
            const swProjectName='sw_' + projectName;

            tested_devices++;
           IDEtrace('INFO', 'Creating project ' + projectName + ' for device:' + deviceName + '[#' + tested_devices + ']');

            if (createProjectFlag === 'true')
            {
                await userCreatesProjectForDevice(projectName, deviceName);
                await userAddsANewSWProject(swProjectName);
            }

            // Add a flag and procedure here if we want to import already existing projects

            if (checkContextFlag === 'true')
            {
                await userSelectsFileMainDotC(projectName,swProjectName);
                await userGetsTheiaStatusBar(deviceName,deviceStatus,projectName, swProjectName);
            }

            try {
                    // we close editor containing file main.c
                    await page.locator('[id="theia\\:menubar"] >> text=File').click();
                    await page.locator('text=Close Editor').click();
                    IDEtrace('DEBUG','editor closed');
            }
            catch
            {
                IDEtrace('ERROR','Failed to close editor');
            }
            
            if (displayClockViewFlag === 'true') { await userOpensClockConfigurationView();}
            if (displayPinoutViewFlag === 'true') { await userOpensPinoutView();}

            page.setDefaultTimeout(10000);
            try {
                await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
                await page.locator('[id="shell-tab-Cube\\:application-project\\:widget"] > .p-TabBar-tabCloseIcon').click();
                await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
                IDEtrace('DEBUG','Application project is closed');
            }
            catch
            {
                IDEtrace('ERROR','Failed to close Cube : Application Project window');
                //notificationsList.push('Error : Failed to close Cube : Application Project window');
            }        

            if (buildFlag==='true')
            {
                await userRefreshesTasksList();

                await userBuildsConfiguration(swProjectName,'debug');
                await userBuildsConfiguration(swProjectName,'release');
                        
                await userCleansBuildsConfiguration(swProjectName,'debug');
                await userCleansBuildsConfiguration(swProjectName,'release');
            }

            await userClosesOpenedWindows(products,deviceName);

            if (deleteProjectFlag === 'true') { await deleteProjectFromWorkspace(projectName); }

            await userGetsTheiaNotifications();

            textForTestReport=await buildVerdictFromNotificationsList(buildFlag);

            const tab: Array<string>=[];
            tab.push(testDate);
            tab.push(testName);
            if (textForTestReport.includes('setting verdict to FAILED'))
            {            
                tab.push('Failed');
            }
            else
            {
                tab.push('Passed');
            }
            testsResultsList.push(tab);

            await userclearsNotifications();
        }
        context.attach(textForTestReport);
    }   
    //console.table(testsResultsList);
    let summaryText="";
    const length=testsResultsList.length;
    for (let index=0;index<length;index++) {
        const currentTable=testsResultsList[index];
        summaryText += currentTable.join('\t') + '\n';
    }
    context.attach(summaryText);
}


/**
 *
 * this function is called to get the list of boards,mcus,mpus,parts,expansion boards
 * that can be found in the Finder 
 * @param {string} products : can be either Board, or MCU or MPU or Part or Expansion Board
 * @return {*} : the list of corresponding items found in the finder (First item of list is a text header)
 */
async function userGetsListOfItems(products:string) {

    const itemsList: Array<string> = [];
    itemsList.push('List of ' + products + ' found in Finder');

    const locatorText=`button:has-text("${products}")`;

    await page.locator(locatorText).first().click();
    IDEtrace('DEBUG', 'click on ' + products + ' done');

    await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );

    await page.locator("text=Product(s) found:").first().waitFor({state: "visible"});
    const productString=await page.locator("text=Product(s) found:").first().textContent();

    let numberOfProducts=0;
    if (productString) { numberOfProducts = Number (productString.replace("Product(s) found:","")) ; }
    IDEtrace('DEBUG', 'found ' + numberOfProducts + ' products');
    
    let nextPageButtonIsVisible=false;
    let counter=0;

    const data: Array<Array<string>>=[];

    if (numberOfProducts !== 0)
    {
        await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
    
        const tableLocatorText='table.MuiTable-root';
        const tableHeadLocatorText= tableLocatorText + '>> thead.MuiTableHead-root';
        const headersLocatorText = tableHeadLocatorText+ '>> th.MuiTableCell-root';

        const tableheadersList=page.locator(headersLocatorText);
        const numberOfHeaders = await tableheadersList.count();
        IDEtrace('DEBUG', 'Found ' + numberOfHeaders + ' headers in current page');

        const headersList: Array<string> = [];
        for(let index=0;index<numberOfHeaders;index++)
        {
            const currentHeaderItem =  tableheadersList.nth(index);
        
            const headerName=await currentHeaderItem.textContent();
            if (headerName) 
            { 
                    headersList.push(headerName);
                IDEtrace('DEBUG',headerName);
            }
        }
        data.push(headersList);

        do
        {
            await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
            await page.locator("text=Product(s) found:").waitFor({state: "visible"});
      
            const dataLocatorText= tableLocatorText + '>> tbody.MuiTableBody-root >> tr.MuiTableRow-root';
            const currentPageListOfProducts=page.locator(dataLocatorText);

            numberOfProducts = await currentPageListOfProducts.count();
            IDEtrace('DEBUG','Found ' + numberOfProducts + ' products in current page');

            for(let index=0;index<numberOfProducts;index++)
            {
                const currentItem =  currentPageListOfProducts.nth(index);
                
                const locator = 'td.MuiTableCell-root';
                const locitems=currentItem.locator(locator);

                const numberOfFields=await locitems.count();
                const dataList: Array<string> = [];
                 
                for(let field=1;field<numberOfFields;field++)
                {
                    const currentField=currentItem.locator(locator).nth(field);
                    const currentItemText=await currentField.textContent();
                    if (currentItemText) { dataList.push(currentItemText); }
                }               
                data.push(dataList);  
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
        } while (counter != 1);        
    }

    const alteredProduct=products.toLocaleLowerCase().replace(' ','-');

    await page.locator('[id="shell-tab-category\\:\\:hardware\\:\\:' + alteredProduct + '"] > .p-TabBar-tabCloseIcon').click();
    
    //IDEtraceTable(data);
    return data;
}

// This function fills the adequate list depending on "products" string
async function userBuildsListOfProducts(products:string)
{
    let itemsList: Array<Array<string>>=[];
    itemsList= await userGetsListOfItems(products);

    if (products === "MCU")   { mcusList=itemsList;  }
    if (products === "Board") { boardsList=itemsList;}
    if (products === "MPU")   { mpusList=itemsList;  }
    if (products === "Part")  { PartsList=itemsList;}
    if (products === "Expansion Board")  { expansionBoardsList=itemsList;}
}

// This step is called when user wants to build a list of products available in the Finder :
// Boards, mcus, mpus, expansion boards, parts
Then('user builds list of {string}', { timeout: 90 * 1000 }, async function (this: CubeWorld, products:string) {
    await userBuildsListOfProducts(products);
});

/**
 * This function adds the content of a list to the test report
 *
 * @param {string} listToReport : the list to be added to test report
 * @return {*} : a string containing all items found in list
 */
async function userAddsListToTestReport(listToReport:string) {

    let textToReport="";
    let itemsList: Array<Array<string>>=[];

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

// This step is called when user wants to add a list to test report
Then('user adds {string} list to test report', { timeout: 30 * 1000 }, async function (this: CubeWorld, listToReport: string) {
    const textToReport=await userAddsListToTestReport(listToReport);
    this.attach(textToReport,'text/plain');
});

async function userGetsCubeStudioVersion(context:CubeWorld) {
    const cubeStudioVersion = await context.page.locator('div.about-details').textContent();
    await context.attach('cubeStudio version :' + cubeStudioVersion,'text/plain');
}

Then('user gets cube studio version', async function (this: CubeWorld) {
    userGetsCubeStudioVersion(this);
});

async function userGetsTheiaExtensionsVersions(context:CubeWorld) {
    const extensionsList = page.locator('div.theia-aboutDialog >> ul.theia-aboutExtensions >> li');
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
    await context.attach(allExtensionsText,'text/plain');
}

// This step is used to report the version of each theia extension into the test report
Then('user gets theia extensions', async function (this: CubeWorld) {
    await userGetsTheiaExtensionsVersions(this);
});

async function userGetsTheiaNotifications()
{
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    const notificationsListLocator = page.locator('div.theia-notification-message span') ;

    const childrenCounter = await notificationsListLocator.count();
    IDEtrace('DEBUG','user gets notifications : found ' + childrenCounter + ' notifications');

    for (let index = 0; index < childrenCounter; index++) {
      const message=await notificationsListLocator.nth(index).innerText();

      if (message) {
        IDEtrace('DEBUG',message);
      }
    }

    IDEtrace('DEBUG','Leaving userGetsTheiaNotifications' ); 
}

// This step is used when user wants to get the list of notifications appeared during the step  passed as a parameter
Then('user gets notifications after {string}', { timeout: 20 * 1000 }, async function (this: CubeWorld, step:string) {
    await userGetsTheiaNotifications();
});

// This function is called in order to convert a project before it could be built
// The string parameter is the name of the project that should be in the explorer view
async function userConvertsProject(projectName:string) {
    clickText(`${projectName}: Convert`);
    await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
}

// This step is called to convert a project before it could be built
Then('user converts project {string}', async function (this: CubeWorld, projectName:string) {
    await userConvertsProject(projectName);
});
Then('user types text {string}', async function (this: CubeWorld, textToType:string) {
    await clickText(textToType);
});
async function userBuildsProject(projectName:string, swProjectName:string,releaseToBuild:string ) {
    clickText(`${projectName}: Build ${swProjectName} | main | ${releaseToBuild}`);
}

Then('user builds project {string} {string} {string}', async function (this: CubeWorld, projectName:string, swProjectName:string, releaseToBuild:string) {
    await userBuildsProject(projectName, swProjectName,releaseToBuild);
});

async function userCreatesProjectForDevice(projectName:string, deviceName:string)
{
    IDEtrace('DEBUG','Entering userCreatesProjectForDevice');

    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    await page.locator('[placeholder="Search\\.\\.\\."]').nth(1).click();
    await page.locator('[placeholder="Search\\.\\.\\."]').nth(1).press('Enter');
    await page.locator('[placeholder="Search\\.\\.\\."]').nth(1).fill('');
    await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
    await page.locator('[placeholder="Search\\.\\.\\."]').nth(1).fill(`${deviceName}`);
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    const locatorText=`a:has-text("${deviceName}")`;
    await page.locator(locatorText).first().click();

    IDEtrace('DEBUG','click on Start a project');
    await clickButton('Start a project');
    IDEtrace('DEBUG','filling project name');
    await clickInputAtRightOfText('Project name:');
    await typeText(projectName);

    IDEtrace('DEBUG','clicking folder name');
    //await clickFolderIcon();
    await page.locator('[data-testid="browse-input-on-path-selected"]').click();

    IDEtrace('DEBUG','clicking Open button');
    await clickButton('Open');
    IDEtrace('DEBUG','clicking Create Application Project');
    await clickButton('Create Application Project');
    
}

When('user creates application project {string} with board {string}', async function (this: CubeWorld, proj_name:string, device_name:string) {

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

async function userChoosesLaunchConfiguration(launchConfiguration:string) {
    await page.locator('text='+launchConfiguration).waitFor({state: "visible"});
    await page.locator('text='+launchConfiguration).click();
}

When('user selects launch configuration {string}', async function (this: CubeWorld,launchConfiguration:string) {
    await userChoosesLaunchConfiguration(launchConfiguration);
});

async function userAddsANewSWProject(projectName:string) {
    try
    {
        await clickText('Add a SW project');
        await clickInputAtRightOfText('Software Project name:');
        await typeText(projectName);
        await clickButton('Create SW Project');
        IDEtrace('DEBUG','SW project created');
    }
    catch
    {
        IDEtrace('ERROR','Failed to add a SW project');
    }
}

Given('user adds a new software project {string} in application project panel', async function (this: CubeWorld, projectName:string) {
    await userAddsANewSWProject(projectName);
});

Given('user adds a new software component to project {string} in application project panel', async function (this: CubeWorld, sw_proj:string) {
    await clickPencilIconAtRightOfText(sw_proj);
});

Then('user gets conversion log messages from console', async function (this: CubeWorld) {
    await this.attach("user gets conversion log messages from console: nothing possible until now",'text/plain');
});

Then('user gets build log messages from console', async function (this: CubeWorld) {
    await this.attach("user gets conversion log messages from console: nothing possible until now",'text/plain');
});

// This step is called after calling a conversion step , and should set to "conversion" verdict depending
// on the console traces (not available until now)
Then('user sets a conversion verdict', async function (this: CubeWorld) {
    await this.attach("user sets a conversion verdict : nothing done until now",'text/plain');
});

Then('user sets a build verdict from console traces', async function (this: CubeWorld) {
    await this.attach("user sets a build verdict from console traces: nothing done until now",'text/plain');
});

// this test specific step is used to perform some step over a breakpoint operations in an infinite loop
Then('testuser performs {string} loops on breakpoints', async function (this: CubeWorld , numberOfLoops:string) {
    await this.page.locator('.theia-TreeContainer > div > .theia-TreeNode > .theia-TreeNodeContent > .theia-TreeNodeSegment').first().click();

    for (let index = 0; index < Number(numberOfLoops); index++)
    {
        IDEtrace('DEBUG','=== user performs loop #' + index + ' on breakpoint' + index);

        await this.page.locator('.debug-action.codicon.codicon-debug-continue').waitFor({state: "visible"});
        await this.page.locator('.debug-action.codicon.codicon-debug-continue').click();
        await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );

        const iVariableLocator=this.page.locator(`div.theia-debug-console-variable > span[title="${index+1}"]`);
        if (iVariableLocator)
        {
            const iValue = Number(await iVariableLocator.textContent());
            IDEtrace('DEBUG','extracted i value :' + iValue);
            IDEtrace('DEBUG','expected i value  :' + (index+1));

            expect(iValue).toBe(index+1);
        }
        const image = await this.page?.screenshot();
        image && (this.attach(image, 'image/png'));
    }
});
async function userSelectsDebugContext(applicationName:string,swProjectName:string,versionType:string) {
    const locatorText=` text=[${applicationName} | ${swProjectName} | main | ${versionType}]`;

    await page.locator(locatorText).waitFor({state: "visible"});
    await page.locator(locatorText).click(); 
}
// This step is called when user selects a debug context
Then('user selects debug context for application {string}, sw project {string} and {string} version', async function (this: CubeWorld, application:string, swProject:string, version:string) {
    await userSelectsDebugContext(application,swProject, version);
});

// This test specific step is used to patch file main.c (add i++)
Then('testuser patches file main.c', async function (this: CubeWorld) {
    await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).waitFor({state: "visible"});
    await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).click();

    await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').press('Enter');
    await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill('#include "main.h"\nint main() {\n    int i=0;\n  while(1) {\n    i++;\n  }\n  return 0;\n}');
});

// this test specific step is called when test user want to add a breakpoint on line containing "i++" of file main.c
When('testuser clicks on line with incremented i', async function (this: CubeWorld) {
    await this.page.locator('text=i++;').waitFor({state: "visible"});
    await this.page.locator('text=i++;').click();
});

// This test specific step is called when testuser wants to open file main.c of test project
Then('testuser opens file main.c of sw project {string} of application {string}', async function (this: CubeWorld, swProjectName:string,projectName:string) {
    
    const locatorText1=`#files >> text=${projectName}`;
    await this.page.locator(locatorText1).waitFor({state: "visible"});
    await this.page.locator(locatorText1).click();
    
    // Second we open SW project
    const locatorText2=`#files >> text=${swProjectName}`;

    await this.page.locator(locatorText2).waitFor({state: "visible"});
    await this.page.locator(locatorText2).click();

    await this.page.locator(':text-is("src")').waitFor({state: "visible"});
    await this.page.locator(':text-is("src")').first().click();

    await this.page.locator(':text-is("main.c")').waitFor({state: "visible"});
    await this.page.locator(':text-is("main.c")').first().click();
});

Then('user performs git init command', async function (this: CubeWorld) {
    await page.locator('#git-init').first().click();
});

Then('testuser checks that {string} files are in the staging area',async function (this: CubeWorld, numberOfCommits:string) {
    const locatorText='div.notification-count-container.scm-change-count >> span.notification-count';
    const staggedFiles = Number(await this.page.locator(locatorText).first().textContent());

    //expect.soft does not work with cucumber !!!!
    //expect.soft(staggedFiles).toBe(Number(Number(numberOfCommits)));

    IDEtrace('DEBUG', 'found ' + staggedFiles + ' in the staging area');
});

const ActivateIDETraces=true;
const report_IDE_ERROR_traces=true;
const report_IDE_WARNING_traces=false;
const report_IDE_DEBUG_traces=true;
const report_IDE_INFO_traces=true;
//const report_IDE_DEBUG_tables=false;

function IDEtrace(traceLevel:string, traceMessage:string) {
    if (ActivateIDETraces)
    {
        const date=new Date();
        const messageToEmit= (date.toTimeString().split(' ')[0]  + ':' + traceLevel + ':' + traceMessage);

        if (traceLevel==="ERROR")   { if (report_IDE_ERROR_traces)   {  console.error(messageToEmit); 
                                                                        notificationsList.push(messageToEmit);
                                                                     } }
        if (traceLevel==="WARNING") { if (report_IDE_WARNING_traces) { console.warn(messageToEmit);  notificationsList.push(messageToEmit);} }
        if (traceLevel==="INFO")    { if (report_IDE_INFO_traces)    { console.info(messageToEmit);  notificationsList.push(messageToEmit);} }
        if (traceLevel==="DEBUG")   { if (report_IDE_DEBUG_traces)   { console.debug(messageToEmit); notificationsList.push(messageToEmit);} }
    }
    // console.log(notificationsList);
}

Given('user sets viewport size to {string}',{ timeout: 30 * 1000 }, async function (this: CubeWorld, viewPortSize:string) {
    if ( (viewPortSize === "FullHD") || (viewPortSize === "WQHD") || (viewPortSize === "4K"))
    {
        if (viewPortSize === "FullHD")
        {
            this.page.setViewportSize({ width: 1920, height: 1080 });
        }
        if (viewPortSize === "WQHD")
        {
            this.page.setViewportSize({ width: 2560, height: 1440 });
        }
        if (viewPortSize === "4K")
        {
            this.page.setViewportSize({ width: 3840, height: 2160 });
        }
        IDEtrace('DEBUG','viewport size set to [' + viewPortSize + ']');
    }
    else
    {
        IDEtrace('WARNING','selected mode [' + viewPortSize + '] is unknown');
    }
});

When('user runs quick command {string} to clone directory {string}', { timeout: 60 * 1000 }, async (quick_command:string, repoUrl:string) => {
	const quickCommandPalette = theiaApp.quickCommandPalette; 
    await quickCommandPalette.open();
    await quickCommandPalette.type(quick_command);
    await quickCommandPalette.trigger(quick_command);
    await quickCommandPalette.type(repoUrl);
});

When('user unstages all staged changes', { timeout: 60 * 1000 }, async () => {

    IDEtrace('DEBUG','Unstaging all staged changes');

    await page.locator('[id="__more__"]').first().waitFor({state: "visible"});
    await page.locator('[id="__more__"]').first().click();

    await page.locator('text=Changes').nth(2).waitFor({state: "visible"});
    await page.locator('text=Changes').nth(2).click();

    await page.locator('text=Unstage All').click();
    IDEtrace('DEBUG','Unstaging all staged changes done');

});
When('user checks that there are {string} unstaged changes', { timeout: 60 * 1000 }, async (expectedUnchanged:string) => {

    IDEtrace('DEBUG','user checks that there are a given number of unstaged changes');
    const locatorText='div.theia-scm-inline-actions-container >> div.status';
    const unstagedFiles=await page.locator(locatorText).count();
    IDEtrace('DEBUG','Found ' + unstagedFiles + ' unstaged changes');
    IDEtrace('DEBUG','Expected ' + expectedUnchanged + ' unstaged changes');

    expect(unstagedFiles).toEqual(Number(expectedUnchanged));

    IDEtrace('DEBUG','user checks that there are a given number of unstaged changes done')
});

