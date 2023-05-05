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
  await this.page.locator('div[role="button"]').nth(3).click(); // click on palette commands button

  await this.page.locator('[aria-label="Type to narrow down results\\."]').click();
  await this.page.locator('[aria-label="Type to narrow down results\\."]').fill('>git clone');

  await this.page.locator('span:has-text("Git: Clone...")').first().click();
  await this.page.locator('[placeholder="Select Repository Location"]').click();
  await this.page.locator('[placeholder="Select Repository Location"]').fill(repoUrl);

  const locatorText=`a:has-text("Clone the Git repository: ${repoUrl}")`;
  await this.page.locator(locatorText).click();
 
});
// =====================================================================
Then('user searches for commit {string}', { timeout: 60 * 1000 },async function (this: CubeWorld, commitText:string) {

  const textToFind=`text=${commitText}`;
  console.log('user searches for commit, textToFind=' + textToFind);
  const foundCommit = await this.page.$(textToFind);

  if (foundCommit)
  {
      console.log('text Initial commit was found');
  }
  else{
    console.log('text Initial commit was not found');
    // here we should set the test result to FAILED since Initial commit message was not found
  }
});

// =====================================================================
Then('user patches file textFile01.txt',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {
  console.log('user patches file textFile01.txt - clicking on line2 of file textFile01.txt');

  const textToFill = Date.now().toString() ;
 
  console.log('Added to file :' + textToFill);

  await this.page.locator('.view-lines > div:nth-child(1)').click();
  await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill(textToFill);
  
});
// =====================================================================
Then('user expands project directories',{ timeout: 60 * 1000 }, async function (this: CubeWorld) {

  console.log('Entering user expands project directories');

  await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
  await this.page.locator('#files >> text=IDE_TESTS_FAKE_REPOSITORY').click();
  await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
  await this.page.locator('text=Files').first().click();
  await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
  await this.page.locator('text=textFile01.txt').click();
  
  console.log('Leaving user expands project directories');
});
// =====================================================================
Then('user closes editor',{ timeout: 30 * 1000 }, async function (this: CubeWorld) {
 
  await this.page.locator('[id="theia\\:menubar"] >> text=File').click();
  await this.page.locator('text=Close Editor').click();
  // await this.page.pause();
  await this.page.locator('div:nth-child(2) > .theia-TreeNodeContent > .theia-TreeNodeSegment.theia-ExpansionToggle').click();
  await this.page.locator('.theia-TreeNodeSegment').first().click();

});
// =====================================================================
Then('user clicks on staging all changes button',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {

  console.log('staging all changes');
 
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
        console.log(nodeText);
        if (nodeText==="Changes")
        {
          currentNode.click();
          
          const targetElement=this.page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.stage.all"]');
          if (targetElement)
          {
            console.log("user clicks on staging all changes button : found target element");
            targetElement.click();
            await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
            break;
          }
          else
          {
            console.log("user clicks on staging all changes button : did not find target element");
          }
        }
      }
    }  
  }
  console.log('staging all changes done');
}); 
// =====================================================================
Then('user clicks on commit signed off button',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {

  console.log('click on commit signed off');

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
        console.log(nodeText);
        if (nodeText==="Commit")
        {
          currentNode.click();
          
          const targetElement=this.page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.commit.signOff"]');
          if (targetElement)
          {
            targetElement.click();
            await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
            break;
          }
        }
      }
    }  
  }


  console.log('click on Signed off done');

});
// =====================================================================
Then('user goes to History view',{ timeout: 30 * 1000 }, async function (this: CubeWorld) {
  console.log('user goes to History view');

  await this.page.locator('[id="theia\\:menubar"] >> text=View').click();

  const targetElement=this.page.locator('li.p-Menu-item[data-command="scm-history:open-branch-history"]');
  if (targetElement)
  {
    console.log('user goes to History view : target element found');
    await targetElement.waitFor();
    await targetElement.click();
    await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
  }
  else
  {
    console.log('user goes to History view : target element not found');
  }
  console.log('user goes to History view done');
});
// =====================================================================
Then('user enters commit message {string}',{ timeout: 300 * 1000 }, async function (this: CubeWorld,commitMessage:string) {

  console.log('filling commit message');

  await this.page.locator('textarea').click();
  await this.page.locator('textarea').fill(commitMessage);
  await this.page.locator(`text=${commitMessage}`).press('Control+Enter');
  await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );

  console.log('filling commit message done');

});
// =====================================================================
Then('user collapses fake repo directory',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {

  console.log('Entering user collapses fake repo directory');

  // closing project directories to iterate again
  await this.page.locator('#files >> text=Files').first().click();
  await this.page.locator('.theia-TreeNodeSegment').first().click();
 
  console.log('Leaving user collapses fake repo directory');
});

// =====================================================================
Then('user goes to explorer view', { timeout: 60 * 1000 },async function (this: CubeWorld) {

  console.log('Entering user goes to explorer view');

  await this.page.locator('.p-TabBar-tabIcon.codicon').first().click();

  console.log('Leaving user goes to explorer view');
});
// =====================================================================
Then('user searches for {string}', { timeout: 60 * 1000 },async function (this: CubeWorld, repoUrl:string) {
  
  const foundUrl = await this.page.$("text='" + repoUrl +"'");
  if (foundUrl)
  {
      console.log('text ' + repoUrl + ' was found');
      // here we should set the test result to PASSED since cloned repo was found
  }
  else{
    console.log('text ' + repoUrl + ' was not found');
    // here we should set the test result to FAILED since cloned repo was not found
  }
});
  
// =====================================================================
Then('user goes to SCM view', { timeout: 60 * 1000 },async function (this: CubeWorld) {
  await this.page.locator('.p-TabBar-tabIcon.codicon.codicon-source-control').first().click();

});

// =====================================================================
Then('user add debugger console' , async function (this: CubeWorld) {
    
    await this.page.locator('[id="theia\\:menubar"] >> text=View').click();
    await this.page.locator('text=Debug Console').click();
});
// =====================================================================
Then('user creates a debug configuration' , async function (this: CubeWorld) {
    
    await this.page.locator('text=Run').click();
    await this.page.locator('text=Start Debugging').click();
    await this.page.locator('text=Cube (PoC): Generic Context Based STM32 Launch').click();

});
// =====================================================================
Then('user opens file main.c of sw project {string} of application {string}', async function (this: CubeWorld, swProjectName:string,projectName:string) {
    
    // click on explorer icon
    await this.page.locator('.p-TabBar-tabIcon.codicon').first().click();

    const locatorText1=`#files >> text=${projectName}`;
    console.log('============================= processing locator1:' + locatorText1);
    await this.page.locator(locatorText1).click();

    // Second we open SW project
    const locatorText2=`#files >> text=${swProjectName}`;
    console.log('============================= processing locator2:' + locatorText2);
    await this.page.locator(locatorText2).click();

    await this.page.locator('text=src').click();
    await this.page.locator('text=main.c').first().click();

   
});
// =====================================================================
Then('user patches file main.c', async function (this: CubeWorld) {

    await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).click();
    await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').press('Enter');
    await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill('#include "main.h"\nint main() {\n    int i=0;\n  while(1) {\n    i++;\n  }\n  return 0;\n}');
});

// =====================================================================
Then('user saves file main.c', async function (this: CubeWorld) {
    await this.page.locator('[id="theia\\:menubar"] >> text=File').click();
    await this.page.locator('text=Save').nth(1).click();
});

// =====================================================================
Then('user adds breakpoints to file main.c', async function (this: CubeWorld) {

    console.log('Entering user adds breakpoints to file main.c');

    await this.page.locator('text=i++;').click();
    console.log('should be on line i++ now');

    await this.page.locator('text=Run').click();
    
    await this.page.locator('text=Toggle Breakpoint').click();

    console.log('Leaving user adds breakpoints to file main.c');
});

// =====================================================================
Then('user saves the file' , async function (this: CubeWorld) {    

   await this.page.locator('[id="theia\\:menubar"] >> text=File').click();
   await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
   await this.page.locator('text=Save All').click();
   await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

   console.log("command Save All done");
});
// =====================================================================
Then('user starts debugger', { timeout: 15 * 1000 }, async function (this: CubeWorld) {

  await this.page.locator('text=Run').first().click();
  await this.page.locator('text=Start Debugging').click();
  await new Promise( resolve => setTimeout(resolve, + 10 * 1000) );

  console.log('====================== debugger should be started now');
});

// =====================================================================
Then('user performs {string} loops on breakpoints', async function (this: CubeWorld , numberOfLoops:string) {
    await this.page.locator('.theia-TreeContainer > div > .theia-TreeNode > .theia-TreeNodeContent > .theia-TreeNodeSegment').first().click();

    for (let index = 0; index < Number(numberOfLoops); index++) {
        console.log('========================= user performs loops on breakpoints: performing loop #' + index);   
    
        await this.page.locator('.debug-action.codicon.codicon-debug-continue').click();
        await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );

        const image = await this.page.screenshot({
            path: `screenshots/loops/loop_${index}_${Date.now()}.png`,
        });
        image && (await this.attach(image, 'image/png'));    
    }
});

// =====================================================================
Then('user selects debug context for application {string}, sw project {string} and {string} version', async function (this: CubeWorld, application:string, swProject:string, version:string) {
    const locatorText=` text=[${application} | ${swProject} | main | ${version}]`;
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
    console.log("wait please");
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
    
    await this.page.locator('text =Terminal').click();
    await this.page.locator('text=Run Build Task').click();

    const locatorText=`text=${projectName}: Convert`;
    await this.page.locator(locatorText).click();

})
// =====================================================================
Then('user builds project {string} {string} {string}', async function (this: CubeWorld, projectName:string, swProjectName:string, releaseToBuild:string) {
    
    await this.page.locator('text=Terminal').click();
    await this.page.locator('text=Run Build Task').click();

    const locatorText=`text=${projectName}: Build ${swProjectName} | main | ${releaseToBuild}`;
    await this.page.locator(locatorText).click();

})
// =====================================================================

Then('user gets cube studio version', async function (this: CubeWorld) {
    console.log('================ Entering user gets cube studio version');
    const cubeStudioVersion = await this.page.locator('div.about-details').textContent();
    await this.attach('cube2 version :' + cubeStudioVersion);
    console.log('================ Leaving user gets cube studio version');
  });
// =====================================================================

Then('user gets theia extensions', async function (this: CubeWorld) {

  console.log('================ Entering user gets theia extensions');
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

    console.log('================ Leaving user gets theia extensions');
  });

// =====================================================================
Given("user goes to cubestudio home page", { timeout: 60 * 1000 }, async function(this: CubeWorld) {

  await this.page.goto('http://localhost:3000/#/');
  expect(this.page).toHaveURL('http://localhost:3000/#/');
  
  // wait for File menu to be visible
  await this.page.locator('[id="theia\\:menubar"] >> text=File').waitFor();

  // for debug purpose only : take a screenshot
  const image = await this.page?.screenshot();
  image && (await this.attach(image, 'image/png'));

});
// =====================================================================
Then('user opens About menu', { timeout: 60 * 1000 },async function (this: CubeWorld) {

    await this.page.locator('text=Help').click();
    await this.page.locator('text=About').click();
   
    const image = await this.page.screenshot({
        path: `screenshots/AboutMenu_${Date.now()}.png`,
      });
    image && (await this.attach(image, 'image/png'));

  });

// =====================================================================
Then('user closes About menu', { timeout: 60 * 1000 },async function (this: CubeWorld) {

    await this.page.locator('text=OK').click();

  });
// =====================================================================
Then('user clicks on Main menu children', async function (this: CubeWorld) {

    const mainMenuChildren = this.page.locator('div >> .p-MenuBar-itemLabel');
    const counter = (await mainMenuChildren.count());
  
    let testTraces ="";

    testTraces += 'user clicks on Main menu children : number of menus :' + counter + '\n';
  
    for (let index = 0; index < counter; index++) {
    //   console.log('==== menu item :', index);
      await mainMenuChildren.nth(index).waitFor();
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
    // console.log('+++++++++++++++++++++++++++++++++++ found ' + counter + ' items in menu');
    for (let index = counter - 1; index >= 0; index--)
    {
      const currentObject = menuItems.nth(index);
      const menu: Array<string> = [];
      const objectName = await currentObject.locator('.p-MenuBar-itemLabel').textContent();
  
      if (objectName) {
        //console.log('== menu item name is :', objectName);
        menu.push(objectName);
      }
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
      await currentObject.click();
    }
});

// =====================================================================
Then('user gets notifications after {string}', { timeout: 20 * 1000 }, async function (this: CubeWorld, notificationText:string) {

  // console.log('============== Entering user gets notifications after ' + notificationText);

  await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

  const notificationsListLocator = this.page.locator('div.theia-notification-message span') ;

  const childrenCounter = await notificationsListLocator.count();
  // console.log('user gets notifications : found ' + childrenCounter + ' notifications');

  for (let index = 0; index < childrenCounter; index++) {
    const message=await notificationsListLocator.nth(index).innerText();

    // console.log('message ' + index + ' : ' + message);
    // console.log('============== notificationsList before');
    // console.table(notificationsList);
    // console.log('==============');

    if (message) { 
      // console.log(message);
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

  // console.log('============== Leaving user gets notifications after ' + notificationText);
});
// =====================================================================
 function buildVerdictFromNotificationsList(notifications:string[]) {

  let errorsFound=0;

  console.log('======================= Entering buildVerdictFromNotificationsList');
  for (const iterator of notifications) {
    if (iterator.includes('Error') || iterator.includes("Connection timed out") || iterator.includes("has exited with code") )
    {
      errorsFound++;
      // console.log(notifications[index]);
    }
  }
  
  if (errorsFound === 0)
  {
    console.log('buildVerdictFromNotificationsList : no error found in notifications, setting verdict to PASSED');
  }
  else {
    console.log('buildVerdictFromNotificationsList : Found ' + errorsFound + ' error traces, setting verdict to FAILED');
  }

  console.log('======================= Leaving buildVerdictFromNotificationsList')
}
// =====================================================================
Then('user builds verdict from notifications', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
  console.log('======================= Entering user builds verdict from notifications');
  buildVerdictFromNotificationsList(notificationsList); 
  console.log('======================= Leaving user builds verdict from notifications');
});
// =====================================================================
Then('user clears notifications list', { timeout: 20 * 1000 }, async function (this: CubeWorld) {

  notificationsList = [];
});