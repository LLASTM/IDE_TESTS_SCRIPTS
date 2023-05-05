// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics.
//
// All rights reserved. This program and the accompanying materials
// is the property of STMicroelectronics and must not be
// reproduced, disclosed to any third party, or used in any
// unauthorized manner without written consent.
// *****************************************************************************


let notificationsList: Array<string> = [];

import { expect } from '../../../test-tools/e2e/node_modules/@playwright/test';

import {
    setWorldConstructor,
    Given,
    Then,
    setParallelCanAssign,
    parallelCanAssignHelpers,
    setDefaultTimeout
} from '../../../test-tools/e2e/node_modules/@cucumber/cucumber';

setDefaultTimeout(60 * 1000);
const { atMostOnePicklePerTag } = parallelCanAssignHelpers
const myTagRule = atMostOnePicklePerTag(["@config"]);
setParallelCanAssign(myTagRule);

import CubeWorld from "../../../test-tools/e2e/features/support/CubeWorld";
setWorldConstructor(CubeWorld);

// =====================================================================
Then('user uses palette command to clone repository {string}',{ timeout: 60 * 1000 },async function (this: CubeWorld, repoUrl:string) {

  // click on palette commands button
  await this.page.locator('div[id="workbench.action.showCommands"][title="Command Palette (Ctrl+Shift+P)"]').waitFor({state:"visible"});
  await this.page.locator('div[id="workbench.action.showCommands"][title="Command Palette (Ctrl+Shift+P)"]').click();

  await this.page.locator('[aria-label="Type to narrow down results\\."]').waitFor({state:"visible"});
  await this.page.locator('[aria-label="Type to narrow down results\\."]').click();
  await this.page.locator('[aria-label="Type to narrow down results\\."]').fill('>git clone');

  await this.page.locator('span:has-text("Git: Clone...")').first().waitFor({state:"visible"});
  await this.page.locator('span:has-text("Git: Clone...")').first().click();

  await this.page.locator('[placeholder="Select Repository Location"]').waitFor({state:"visible"});
  await this.page.locator('[placeholder="Select Repository Location"]').click();

  await this.page.locator('[placeholder="Select Repository Location"]').fill(repoUrl);

  const locatorText=`a:has-text("Clone the Git repository: ${repoUrl}")`;
  await this.page.locator(locatorText).waitFor({state:"visible"});
  await this.page.locator(locatorText).click();
 
});
// =====================================================================
Then('user searches for commit {string}', { timeout: 60 * 1000 },async function (this: CubeWorld, commitText:string) {

  const textToFind=`text=${commitText}`;
  console.debug('user searches for commit, textToFind=' + textToFind);
  const foundCommit = await this.page.$(textToFind);

  if (foundCommit)
  {
      console.debug('text Initial commit was found');
  }
  else{
    console.debug('text Initial commit was not found');
    // here we should set the test result to FAILED since Initial commit message was not found
  }
});

// =====================================================================
Then('user patches file textFile01.txt',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {
  console.debug('user patches file textFile01.txt');

  const textToFill = Date.now().toString() ;
 
  console.debug('Added to file :' + textToFill);

  await this.page.locator('.view-lines > div:nth-child(1)').waitFor({state:"visible"});
  await this.page.locator('.view-lines > div:nth-child(1)').click();

  await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill(textToFill);
  
  console.debug('user patches file textFile01.txt done');
});
// =====================================================================
Then('user expands project directories',{ timeout: 60 * 1000 }, async function (this: CubeWorld) {

  console.debug('Entering user expands project directories');

  await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

  await this.page.locator('#files >> text=IDE_TESTS_FAKE_REPOSITORY').waitFor({state: "attached"});
  await this.page.locator('#files >> text=IDE_TESTS_FAKE_REPOSITORY').waitFor({state: "visible"});
  await this.page.locator('#files >> text=IDE_TESTS_FAKE_REPOSITORY').click();


  await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

  await this.page.locator('text=Files').first().waitFor({state: "attached"});
  await this.page.locator('text=Files').first().waitFor({state: "visible"});
  await this.page.locator('text=Files').first().click();

  await this.page.locator('text=textFile01.txt').waitFor({state: "attached"});
  await this.page.locator('text=textFile01.txt').waitFor({state: "visible"});
  await this.page.locator('text=textFile01.txt').click();

  await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

  console.debug('Leaving user expands project directories');
});
// =====================================================================
Then('user closes editor',{ timeout: 30 * 1000 }, async function (this: CubeWorld) {
 
  await this.page.locator('[id="theia\\:menubar"] >> text=File').waitFor({state: "visible"});
  await this.page.locator('[id="theia\\:menubar"] >> text=File').click();

  await this.page.locator('text=Close Editor').waitFor({state: "visible"});
  await this.page.locator('text=Close Editor').click();
 
  await this.page.locator('div:nth-child(2) > .theia-TreeNodeContent > .theia-TreeNodeSegment.theia-ExpansionToggle').waitFor({state: "visible"});
  await this.page.locator('div:nth-child(2) > .theia-TreeNodeContent > .theia-TreeNodeSegment.theia-ExpansionToggle').click();
  
  await this.page.locator('.theia-TreeNodeSegment').first().waitFor({state: "visible"});
  await this.page.locator('.theia-TreeNodeSegment').first().click();

});
// =====================================================================
Then('user clicks on staging all changes button',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {

  console.debug('staging all changes');
 
  await this.page.locator('[id="__more__"]').first().waitFor({state: "visible"});
  await this.page.locator('[id="__more__"]').first().click();
 
  const menuElements=this.page.locator('ul.p-Menu-content > li.p-Menu-item[data-type="submenu"]' );
  const counter = await menuElements.count();

  for (let index=0; index < counter; index++)
  {
    const currentNode=menuElements.nth(index);
    if (currentNode)
    {
      const nodeText = await currentNode.textContent();
      if (nodeText)
      {
        console.debug(nodeText);
        if (nodeText==="Changes")
        {
          currentNode.waitFor({state: "visible"});
          currentNode.click();
          
          const targetElement=this.page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.stage.all"]');
          if (targetElement)
          {
            console.debug("user clicks on staging all changes button : found target element");
            targetElement.waitFor({state: "visible"});
            targetElement.click();
            await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
            break;
          }
          else
          {
            console.debug("user clicks on staging all changes button : did not find target element");
          }
        }
      }
    }  
  }
  console.debug('staging all changes done');
}); 
// =====================================================================
Then('user clicks on commit signed off button',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {

  console.debug('click on commit signed off');

  await this.page.locator('[id="__more__"]').first().waitFor({state: "visible"});
  await this.page.locator('[id="__more__"]').first().click();

  const menuElements=this.page.locator('ul.p-Menu-content > li.p-Menu-item[data-type="submenu"]' );
  const counter = await menuElements.count();

  for (let index=0; index < counter; index++)
  {
     const currentNode=menuElements.nth(index);
    if (currentNode)
    {
      const nodeText = await currentNode.textContent();
      if (nodeText)
      {
        console.debug(nodeText);
        if (nodeText==="Commit")
        {
          currentNode.waitFor({state: "visible"});
          currentNode.click();

          const targetElement=this.page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.commit.signOff"]');
          if (targetElement)
          {
            console.debug('user clicks on commit signed off button: target element found');
            targetElement.waitFor({state: "visible"});
            targetElement.click();
            await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
            break;
          }
          else
          {
            console.debug("user clicks on commit signed off button: target element not found");
          }
        }
      }
    }  
  }

  console.debug('click on Signed off done');

});

// =====================================================================
Then('user goes to History view',{ timeout: 30 * 1000 }, async function (this: CubeWorld) {
  console.debug('user goes to History view');

  await this.page.locator('[id="theia\\:menubar"] >> text=View').waitFor({state: "visible"});
  await this.page.locator('[id="theia\\:menubar"] >> text=View').click();

  const targetElement=this.page.locator('li.p-Menu-item[data-command="scm-history:open-branch-history"]');
  if (targetElement)
  {
    console.debug('user goes to History view : target element found');
    await targetElement.waitFor({state: "visible"});
    await targetElement.click();

    // for user to see result visually
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
  }
  else
  {
    console.debug('user goes to History view : target element not found');
  }
  console.debug('user goes to History view done');
});

// =====================================================================
Then('user expects to find {string} commits in History view',{ timeout: 30 * 1000 }, async function (this: CubeWorld, expectedCommits:string) {
 
  const historyElements=this.page.locator('div.headLabel.noWrapInfo.noselect');
  const counter = await historyElements.count();

  console.debug('user expects ' + expectedCommits + ' commits in git history');
  console.debug('user found ' + counter + ' commit messages in History view');

  console.debug('list of commits found in git history');
  for (let index = 0; index < counter; index++) {
    const currentObject=historyElements.nth(index);
    
    if (currentObject)
    {
      const message=await currentObject.textContent();
      console.debug('commit message : ' + message);
    }  
  }
  expect(counter).toBe(Number(expectedCommits));
});

// =====================================================================
Then('user enters commit message {string}',{ timeout: 300 * 1000 }, async function (this: CubeWorld,commitMessage:string) {

  console.debug('user enters commit message');

  await this.page.locator('textarea').waitFor({state: "visible"});
  await this.page.locator('textarea').click();

  await this.page.locator('textarea').fill(commitMessage);

  await this.page.locator(`text=${commitMessage}`).waitFor({state: "visible"});
  await this.page.locator(`text=${commitMessage}`).press('Control+Enter');

  // for user to see result visually
  await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

  console.debug('user enters commit message done');

});
// =====================================================================
Then('user collapses fake repo directory',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {

  console.debug('Entering user collapses fake repo directory');

  // closing project directories to iterate again
  await this.page.locator('#files >> text=Files').first().waitFor({state:"visible"});
  await this.page.locator('#files >> text=Files').first().click();

  await this.page.locator('.theia-TreeNodeSegment').first().waitFor({state:"visible"});
  await this.page.locator('.theia-TreeNodeSegment').first().click();
 
  console.debug('Leaving user collapses fake repo directory');
});

// =====================================================================
Then('user goes to explorer view', { timeout: 60 * 1000 },async function (this: CubeWorld) {

  console.debug('Entering user goes to explorer view');

  await this.page.locator('.p-TabBar-tabIcon.codicon').first().waitFor({state:"visible"});
  await this.page.locator('.p-TabBar-tabIcon.codicon').first().click();

  console.debug('Leaving user goes to explorer view');
});
// =====================================================================
Then('user searches for {string}', { timeout: 60 * 1000 },async function (this: CubeWorld, repoUrl:string) {
  
  const foundUrl = await this.page.$("text='" + repoUrl +"'");
  if (foundUrl)
  {
      console.debug('text ' + repoUrl + ' was found');
      // here we should set the test result to PASSED since cloned repo was found
  }
  else{
    console.debug('text ' + repoUrl + ' was not found');
    // here we should set the test result to FAILED since cloned repo was not found
  }
});
  
// =====================================================================
Then('user goes to SCM view', { timeout: 60 * 1000 },async function (this: CubeWorld) {
  await this.page.locator('.p-TabBar-tabIcon.codicon.codicon-source-control').first().waitFor({state: "visible"});
  await this.page.locator('.p-TabBar-tabIcon.codicon.codicon-source-control').first().click();

});

// =====================================================================
Then('user add debugger console' , async function (this: CubeWorld) {
    
  await this.page.locator('[id="theia\\:menubar"] >> text=View').waitFor({state: "visible"});
    await this.page.locator('[id="theia\\:menubar"] >> text=View').click();

    await this.page.locator('text=Debug Console').waitFor({state: "visible"});
    await this.page.locator('text=Debug Console').click();
});
// =====================================================================
Then('user creates a debug configuration' , async function (this: CubeWorld) {
    
  await this.page.locator('text=Run').waitFor({state: "visible"});
  await this.page.locator('text=Run').click();

  await this.page.locator('text=Start Debugging').waitFor({state: "visible"});
  await this.page.locator('text=Start Debugging').click();

  await this.page.locator('text=Cube (PoC): Generic Context Based STM32 Launch').waitFor({state: "visible"});
  await this.page.locator('text=Cube (PoC): Generic Context Based STM32 Launch').click();

});
// =====================================================================
Then('user opens file main.c of sw project {string} of application {string}', async function (this: CubeWorld, swProjectName:string,projectName:string) {
    
    // click on explorer icon
    await this.page.locator('.p-TabBar-tabIcon.codicon').first().waitFor({state: "visible"});
    await this.page.locator('.p-TabBar-tabIcon.codicon').first().click();

    const locatorText1=`#files >> text=${projectName}`;
    // console.debug('============================= processing locator1:' + locatorText1);
    await this.page.locator(locatorText1).waitFor({state: "visible"});
    await this.page.locator(locatorText1).click();

    // Second we open SW project
    const locatorText2=`#files >> text=${swProjectName}`;
    // console.debug('============================= processing locator2:' + locatorText2);
    await this.page.locator(locatorText2).waitFor({state: "visible"});
    await this.page.locator(locatorText2).click();

    await this.page.locator('text=src').waitFor({state: "visible"});
    await this.page.locator('text=src').click();

    await this.page.locator('text=main.c').first().waitFor({state: "visible"});
    await this.page.locator('text=main.c').first().click();

});
// =====================================================================
Then('user patches file main.c', async function (this: CubeWorld) {

  await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).waitFor({state: "visible"});
  await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).click();

  await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').press('Enter');
  await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill('#include "main.h"\nint main() {\n    int i=0;\n  while(1) {\n    i++;\n  }\n  return 0;\n}');
});

// =====================================================================
Then('user saves file main.c', async function (this: CubeWorld) {
    
    console.debug('user saves file main.c');

    await this.page.locator('[id="theia\\:menubar"] >> text=File').waitFor({state: "visible"});
    await this.page.locator('[id="theia\\:menubar"] >> text=File').click();

    await this.page.locator('li[data-type="command"][data-command="core.save"]').waitFor({state: "visible"});
    await this.page.locator('li[data-type="command"][data-command="core.save"]').click();

    console.debug('user saves file main.c done');
});

// =====================================================================
Then('user adds breakpoints to file main.c', async function (this: CubeWorld) {

    console.debug('Entering user adds breakpoints to file main.c');

    await this.page.locator('text=i++;').waitFor({state: "visible"});
    await this.page.locator('text=i++;').click();

    console.debug('should be on line i++ now');

    await this.page.locator('text=Run').waitFor({state: "visible"});
    await this.page.locator('text=Run').click();
    
    await this.page.locator('text=Toggle Breakpoint').waitFor({state: "visible"});
    await this.page.locator('text=Toggle Breakpoint').click();

    console.debug('Leaving user adds breakpoints to file main.c');
});

// =====================================================================
Then('user saves all files' , async function (this: CubeWorld) {    

  await this.page.locator('[id="theia\\:menubar"] >> text=File').waitFor({state: "visible"});
  await this.page.locator('[id="theia\\:menubar"] >> text=File').click();

  await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
  await this.page.locator('text=Save All').waitFor({state: "visible"});
  await this.page.locator('text=Save All').click();

  await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );

   console.debug("command Save All done");
});
// =====================================================================
Then('user starts debugger', { timeout: 15 * 1000 }, async function (this: CubeWorld) {

  await this.page.locator('text=Run').first().waitFor({state: "visible"});
  await this.page.locator('text=Run').first().click();

  await this.page.locator('text=Start Debugging').waitFor({state: "visible"});
  await this.page.locator('text=Start Debugging').click();

  // waiting time to let debugger start as soon as we are not able to read status from terminal
  await new Promise( resolve => setTimeout(resolve, + 10 * 1000) );

  console.debug('====================== debugger should be started now');
});

// =====================================================================
Then('user performs {string} loops on breakpoints', async function (this: CubeWorld , numberOfLoops:string) {
    await this.page.locator('.theia-TreeContainer > div > .theia-TreeNode > .theia-TreeNodeContent > .theia-TreeNodeSegment').first().click();

    for (let index = 0; index < Number(numberOfLoops); index++) {
        console.debug('========================= user performs loops on breakpoints: performing loop #' + index);   
    
        await this.page.locator('.debug-action.codicon.codicon-debug-continue').waitFor({state: "visible"});
        await this.page.locator('.debug-action.codicon.codicon-debug-continue').click();
        await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
   
        const iVariableLocator=this.page.locator(`div.theia-debug-console-variable > span[title="${index+1}"]`);
        if (iVariableLocator)
        {
            const iValue = Number(await iVariableLocator.textContent());
            console.debug('extracted i value :' + iValue);
            console.debug('expected i value :' + (index+1));

            expect(iValue).toBe(index+1);
        }      
    }
});

// =====================================================================
Then('user selects debug context for application {string}, sw project {string} and {string} version', async function (this: CubeWorld, application:string, swProject:string, version:string) {
    const locatorText=` text=[${application} | ${swProject} | main | ${version}]`;

    await this.page.locator(locatorText).waitFor({state: "visible"});
    await this.page.locator(locatorText).click();
});
// =====================================================================
Then('user sets a build verdict', async function (this: CubeWorld) {
    await this.attach("user sets a build verdict : nothing done until now");
});
// =====================================================================
Then('user sets a conversion verdict', async function (this: CubeWorld) {
    await this.attach("user sets a conversion verdict : nothing done until now");
});
// =====================================================================
Then('user adds debug trace {string}', async function (this: CubeWorld, debugTrace:string) {
    await this.attach(debugTrace);
});
// =====================================================================
Then('user pauses for {int} seconds', async(delay:number)=>{
    await new Promise( resolve => setTimeout(resolve, + delay * 1000) );
    console.debug("wait please");
});
// =====================================================================
Then('user adds a screenshot to test report', async function (this: CubeWorld) {
    const image = await this.page?.screenshot();
    image && (await this.attach(image, 'image/png'));
});
// =====================================================================
Then('user gets conversion log messages', async function (this: CubeWorld) {
    await this.attach("user gets conversion log messages : nothing possible until now");
});
// =====================================================================
Then('user gets build log messages', async function (this: CubeWorld) {
    await this.attach("user gets conversion log messages : nothing possible until now");
});
// =====================================================================
Then('user converts project {string}', async function (this: CubeWorld, projectName:string) {
    
  await this.page.locator('text=Terminal').waitFor({state: "visible"});
  await this.page.locator('text=Terminal').click();
    
  await this.page.locator('text=Run Build Task').waitFor({state: "visible"});
  await this.page.locator('text=Run Build Task').click();

  const locatorText=`text=${projectName}: Convert`;
  await this.page.locator(locatorText).waitFor({state: "visible"});
  await this.page.locator(locatorText).click();

})
// =====================================================================
Then('user builds project {string} {string} {string}', async function (this: CubeWorld, projectName:string, swProjectName:string, releaseToBuild:string) {
    
  await this.page.locator('text=Terminal').waitFor({state: "visible"});
  await this.page.locator('text=Terminal').click();

  await this.page.locator('text=Run Build Task').waitFor({state: "visible"});
  await this.page.locator('text=Run Build Task').click();

  const locatorText=`text=${projectName}: Build ${swProjectName} | main | ${releaseToBuild}`;
  await this.page.locator(locatorText).waitFor({state: "visible"});
  await this.page.locator(locatorText).click();

})
// =====================================================================

Then('user gets cube studio version', async function (this: CubeWorld) {
    console.debug('================ Entering user gets cube studio version');
    const cubeStudioVersion = await this.page.locator('div.about-details').textContent();
    await this.attach('cube2 version :' + cubeStudioVersion);
    console.debug('================ Leaving user gets cube studio version');
  });
// =====================================================================

Then('user gets theia extensions', async function (this: CubeWorld) {

  console.debug('================ Entering user gets theia extensions');
    const extensionsList = this.page.locator('div.theia-aboutDialog >> ul.theia-aboutExtensions >> li');
    const counter = (await extensionsList.count()) - 1;
  
    const menu: Array<string> = [];
  
    let allExtensionsText = '';
  
    for (let index = 0; index <= counter; index++) {
      const textContent = await extensionsList.nth(index).textContent();
      allExtensionsText += textContent + '\n';
  
      if (textContent) {
        menu.push(textContent);
      }
    }
    await this.attach(allExtensionsText);
    console.table(menu);

    console.debug('================ Leaving user gets theia extensions');
  });

// =====================================================================
Given("user goes to cubestudio home page", { timeout: 60 * 1000 }, async function(this: CubeWorld) {

  await this.page.goto('http://localhost:3000/#/');
  expect(this.page).toHaveURL('http://localhost:3000/#/');
  
  // wait for File menu to be visible
  await this.page.locator('[id="theia\\:menubar"] >> text=File').waitFor({state: "visible"});

  // for debug purpose only : take a screenshot
  const image = await this.page?.screenshot();
  image && (await this.attach(image, 'image/png'));

});
// =====================================================================
Then('user opens About menu', { timeout: 60 * 1000 },async function (this: CubeWorld) {

  await this.page.locator('text=Help').waitFor({state: "visible"});
  await this.page.locator('text=Help').click();

  await this.page.locator('text=About').waitFor({state: "visible"});
  await this.page.locator('text=About').click();
  
  const image = await this.page.screenshot({
      path: `screenshots/AboutMenu_${Date.now()}.png`,
    });
  image && (await this.attach(image, 'image/png'));

});

// =====================================================================
Then('user closes About menu', { timeout: 60 * 1000 },async function (this: CubeWorld) {

  await this.page.locator('text=OK').waitFor({state: "visible"});
  await this.page.locator('text=OK').click();

});
// =====================================================================
Then('user clicks on Main menu children', async function (this: CubeWorld) {

    const mainMenuChildren = this.page.locator('div >> .p-MenuBar-itemLabel');
    const counter = (await mainMenuChildren.count());
  
    let testTraces ="";

    testTraces += 'user clicks on Main menu children : number of menus :' + counter + '\n';
  
    for (let index = 0; index < counter; index++) {
    //   console.debug('==== menu item :', index);
      await mainMenuChildren.nth(index).waitFor({state: "visible"});
      testTraces+='user clicks on Main menu children : Menu name : ' + await mainMenuChildren.nth(index).textContent() + '\n';
      
      await mainMenuChildren.nth(index).click();
      await mainMenuChildren.nth(index).click();

    }
    await this.attach(testTraces);
  });
// ======================================================================
Then('user clicks on each item of main menu', async function (this: CubeWorld) {
    
    const menuItems = this.page.locator('ul.p-MenuBar-content >> li ');
    const counter = await menuItems.count();
    // console.debug('+++++++++++++++++++++++++++++++++++ found ' + counter + ' items in menu');
    for (let index = counter - 1; index >= 0; index--)
    {
      const currentObject = menuItems.nth(index);
      const menu: Array<string> = [];
      const objectName = await currentObject.locator('.p-MenuBar-itemLabel').textContent();
  
      if (objectName) {
        //console.debug('== menu item name is :', objectName);
        menu.push(objectName);
      }
      await currentObject.waitFor({state: "visible"});
      await currentObject.click();
  
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
  
      const objectChildren = this.page.locator('ul.p-Menu-content >> li[data-type="command"]');
      const childrenCounter = await objectChildren.count();
  
      let allItemsText = 'Menu ' + objectName + '\n';
  
      for (let index = 0; index <= childrenCounter - 1; index++)
      {
        const currentObject = objectChildren.nth(index);
        const currentObjectName = await currentObject.locator('.p-Menu-itemLabel').textContent();
        if (currentObjectName) {
          menu.push(currentObjectName);
          allItemsText += currentObjectName + '\n';
        }
      }
  
      console.table(menu);
   
      await this.attach(allItemsText);

      await currentObject.waitFor({state: "visible"});
      await currentObject.click();
    }
});

// =====================================================================
Then('user gets notifications after {string}', { timeout: 20 * 1000 }, async function (this: CubeWorld, notificationText:string) {

  // console.debug('============== Entering user gets notifications after ' + notificationText);

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

  const image = await this.page.screenshot();
  image && (await this.attach(image, 'image/png'));

  let notificationsText = '';

  for (const iterator of notificationsList) {
    notificationsText += iterator + '\n';
  }
  await this.attach(notificationsText);

  // console.debug('============== Leaving user gets notifications after ' + notificationText);
});
// =====================================================================
 function buildVerdictFromNotificationsList(notifications:string[]) {

  let errorsFound=0;

  console.debug('======================= Entering buildVerdictFromNotificationsList');
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
    console.debug('buildVerdictFromNotificationsList : Found ' + errorsFound + ' error traces, setting verdict to FAILED');
  }

  console.debug('======================= Leaving buildVerdictFromNotificationsList')
}
// =====================================================================
Then('user builds verdict from notifications', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
  console.debug('======================= Entering user builds verdict from notifications');
  buildVerdictFromNotificationsList(notificationsList); 
  console.debug('======================= Leaving user builds verdict from notifications');
});
// =====================================================================
Then('user clears notifications list', { timeout: 20 * 1000 }, async function (this: CubeWorld) {

  notificationsList = [];
});