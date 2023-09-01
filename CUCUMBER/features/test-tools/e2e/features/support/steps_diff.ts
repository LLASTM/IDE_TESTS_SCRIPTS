// ================================================================================

// The following variables are used for IDE integration tests
let notificationsList: Array<string> = [];      // This list is used to build a test verdict since no access to console logs is possible
let boardsList: Array<Array<string>>=[];          // contains the list of boards found in the Finder
let mcusList: Array<Array<string>>=[];            // contains the list of mcus found in the Finder
let mpusList: Array<Array<string>>=[];            // contains the list of mpus found in the Finder
let expansionBoardsList: Array<Array<string>>=[]; // contains the list of expansion boards found in the Finder
let PartsList: Array<Array<string>>=[];           // contains the list of parts found in the Finder

// ================================================================================

// This step is used to attach a screenshot to the html test report
Then('user adds a screenshot to test report', async function (this: CubeWorld) {
    const image = await this.page?.screenshot();
    image && (await this.attach(image, 'image/png'));
});

// ================================================================================

async function userSysnchronizesDatabase() {
    await page.locator('text=Synchronize').click();
    await new Promise( resolve => setTimeout(resolve, + 20 * 1000) );
}

// ================================================================================

When('user synchronizes database', { timeout: 30 * 1000 }, async function (this: CubeWorld) {
    await userSysnchronizesDatabase();
});

// ================================================================================

/**
 * 
 * @param repoUrl : The url of the git repository to be cloned
 */
async function userSelectsRepositoryLink(repoUrl:string) {
    const locatorText=`a:has-text("Clone the Git repository: ${repoUrl}")`;
    await page.locator(locatorText).waitFor({state:"visible"});
    await page.locator(locatorText).click();
}

// ================================================================================

// This step opens the command palette, and uses the git clone command to clone a repo which url is provided
Then('user selects repository {string} link',{ timeout: 30 * 1000 },async function (this: CubeWorld, repoUrl:string) {
    await userSelectsRepositoryLink(repoUrl);
});

// ================================================================================

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

// ================================================================================

// This step is used to search for a string provided as a parameter inside the current page
Then('user searches for string {string} in current page', { timeout: 30 * 1000 },async function (this: CubeWorld, repoUrl:string) {
    await userSearchesForStringInCurrentPage(repoUrl);
});

// ================================================================================

// this function is used to patch file main.c of a project during IDE tests
async function userPatchesFiletextFile01() {
    IDEtrace('DEBUG','userPatchesFiletextFile01:testuser patches file textFile01.txt');

    const textToFill = Date.now().toString() ;
    
    try
    {
        await page.locator('.view-lines > div:nth-child(1)').waitFor({state:"visible"});
        await page.locator('.view-lines > div:nth-child(1)').click();

        await page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill(textToFill);
        IDEtrace('DEBUG','Added to file :' + textToFill);
    }
    catch
    {
        IDEtrace('ERROR','userPatchesFiletextFile01:failed to patch file textFile01.txt');
    }
    IDEtrace('DEBUG','userPatchesFiletextFile01:testuser patches file textFile01.txt done');
}

// ================================================================================

// this step is used to patch file main.c of a project during IDE tests - it is ide tests specific
Then('testuser patches file textFile01.txt',{ timeout: 300 * 1000 }, async function (this: CubeWorld) {
    await userPatchesFiletextFile01();
});

// ================================================================================

// This function is used to add all files to the staging area
async function userAddsAllChangesToStagingArea() {
    IDEtrace('DEBUG','userAddsAllChangesToStagingArea:staging all changes');

    await page.locator('[id="__more__"]').first().waitFor({state: "visible"});
    await page.locator('[id="__more__"]').first().click();

    IDEtrace('DEBUG','pause in user clicks on staging all changes button');

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

            IDEtrace('DEBUG',"userAddsAllChangesToStagingArea : searching for stageAll command");

            const targetElement=page.locator('li.p-Menu-item[data-command="git.stageAll"]');
            if (targetElement)
            {
                IDEtrace('DEBUG',"userAddsAllChangesToStagingArea : found target element");
                targetElement.waitFor({state: "visible"});
                targetElement.click();
                await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
                // await page.pause();
                break;
            }
            else
            {
                IDEtrace('ERROR',"userAddsAllChangesToStagingArea : did not find target element");
            }
          }
        }
      }
    }
    IDEtrace('DEBUG','staging all changes done');
}

// ================================================================================

// This step is used to add all files to the staging area
Then('user clicks on staging all changes button',{ timeout: 90 * 1000 }, async function (this: CubeWorld) {
    await userAddsAllChangesToStagingArea();
});

// ================================================================================

// This function is called when performing a commit (signed off) operation
async function userClicksOnCommitSignedOff(commitMessage:string, workspacePath:string) {
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

            await page.locator('text=Commit Staged (Signed Off)').click();

            // click on first line
            await page.locator('.monaco-editor.no-user-select.showUnused.showDeprecated.vs.focused > .overflow-guard > .monaco-scrollable-element > .lines-content > .view-lines > div').first().click();
            await page.locator('text=Selection').click();
            await page.locator('text=Select All').first().click();
            await page.locator('text=Edit').first().click();
            await page.locator('text=Cut').click();
            await page.locator('.monaco-editor.no-user-select.showUnused.showDeprecated.vs.focused > .overflow-guard > .monaco-scrollable-element > .lines-content > .view-lines > .view-line').click();

            try
            {
                await page.locator('.monaco-editor.no-user-select.showUnused.showDeprecated.vs.focused > .overflow-guard > .monaco-scrollable-element > .lines-content > .view-lines > .view-line').click({timeout:2000});
                IDEtrace('DEBUG', 'userClicksOnCommitSignedOff: click on first line is ok');
                await page.keyboard.type(commitMessage);

                IDEtrace('DEBUG', 'userClicksOnCommitSignedOff: fill commit message done as expected');
            }
            catch
            {
                IDEtrace('DEBUG', 'userClicksOnCommitSignedOff: could not fill commit message');
                expect(1).toBe(0);
            }
 
            await page.locator('[id="theia\\:menubar"] >> text=File').click();
            await page.locator('text=Save').nth(1).click();
            await page.locator('[id="theia\\:menubar"] >> text=File').click();
            await page.locator('text=Close Editor').click();

            break;
          }
        }
      }
    }
    IDEtrace('DEBUG','userClicksOnCommitSignedOff done');
}

// ================================================================================

Then('user clicks on commit signed off button {string}',{ timeout: 300 * 1000 }, async function (this: CubeWorld, commitMessage:string) {
    const workspacePath = this.theiaApp.workspace['workspacePath'].replace(/\\/gi, '\\\\/').replace('C:','c\\\\%3A');
    IDEtrace('DEBUG', 'workspacePath modified is ' + workspacePath);
    await userClicksOnCommitSignedOff(commitMessage,workspacePath);
});

// ================================================================================

/**
 * : This is the commit message to be added
 *
 * @param {string} commitMessage
 */
async function userEntersCommitMessage(commitMessage:string ) {
    
    IDEtrace('DEBUG','userEntersCommitMessage');
    await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    try
    {
        await page.locator('div.theia-scm-input-message-container >> textarea.theia-scm-input-message').waitFor({state: "visible"});
        await page.locator('div.theia-scm-input-message-container >> textarea.theia-scm-input-message').click();
        IDEtrace('DEBUG','click on text area done');
    }
    catch
    {
        IDEtrace('ERROR','userEntersCommitMessage : failed to click on text area');
    }
    try
    {
        await page.locator('div.theia-scm-input-message-container >> textarea.theia-scm-input-message').fill(commitMessage);
        IDEtrace('DEBUG','commit message [' + commitMessage + '] filled');
        await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
    }
    catch
    {
        IDEtrace('ERROR','userEntersCommitMessage : failed to fill commit message');
    }
    try
    {
        await page.locator(`text=${commitMessage}`).waitFor({state: "visible"});
        await page.locator(`text=${commitMessage}`).press('Control+Enter');
        await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
        IDEtrace('DEBUG','userEntersCommitMessage : press ctrl + Enter done');
    }
    catch
    {
        IDEtrace('ERROR','userEntersCommitMessage : failed to press ctrl + Enter');
    }

    IDEtrace('DEBUG','userEntersCommitMessage : trying to close STM32CubeSTUDIO pop-up');
    try
    {
        await page.locator('div:has-text("STM32CubeSTUDIO")').nth(2).click({timeout:4000});
        await page.locator('text=Close').click();
        IDEtrace('DEBUG','userEntersCommitMessage : click on STM32CubeSTUDIO pop-up done');
    }
    catch
    {
        IDEtrace('DEBUG','userEntersCommitMessage : No STM32CubeSTUDIO pop-up found');
    }
    IDEtrace('DEBUG','userEntersCommitMessage : trying to close Eclipse Theia pop-up');
    try
    {
        await page.locator('div:has-text("Eclipse Theia")').nth(2).click({timeout:4000});
        await page.locator('text=Close').click();
        IDEtrace('DEBUG','userEntersCommitMessage : click on Eclipse Theia pop-up done');
    }
    catch
    {
        IDEtrace('DEBUG','userEntersCommitMessage : No Eclipse Theia pop-up found');
    }
    IDEtrace('DEBUG','userEntersCommitMessage done');

}

// ================================================================================

// This step is used to add a commit message
Then('user enters commit message {string}',{ timeout: 300 * 1000 }, async function (this: CubeWorld,commitMessage:string) {
    await userEntersCommitMessage(commitMessage);
});

// ================================================================================

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
                IDEtrace('ERROR',except);
            }
        }
    }
    //context.attach(foundCommitsMessage,'text/plain');
    //expect(foundCommitsNumber).not.toContain('FAILURE');

    return foundCommitsMessage ;
}

// ================================================================================

// step used when user wants to compare the number of commits found in git history to an expected number
Then('user expects to find {string} commits in History view',{ timeout: 300 * 1000 }, async function (this: CubeWorld, expectedCommits:string) {
    const foundCommitsMessage = await userExpectsToFindCommits(expectedCommits);
    this.attach(foundCommitsMessage);
});

// ================================================================================

async function rightClickText(pattern:string) {
    const obj = page.locator(`text=${pattern} >> visible=true`).first();
    await obj.isEnabled();
    await obj.click({button: 'right'});
    await obj.isVisible();
}

// ================================================================================

When('user stops program for debug',{ timeout: 300 * 1000 },async function (this: CubeWorld) {
    await this.page.pause();
});

// ================================================================================

When('user right clicks on text {string}',{ timeout: 10 * 1000 }, async function (this: CubeWorld,textToClick:string) {
    await rightClickText(textToClick);
});

// ================================================================================
// This function is test specific, it consists in creating a number of empty files
// This number of files is the argument to this function
async function userCreatesASetOfNewFiles(numberOfFiles:string) {
    IDEtrace('DEBUG','user creates a set of new files');

    for (let index = 0; index < Number(numberOfFiles); index++) {
      IDEtrace('DEBUG','creating file #' + index);

      IDEtrace('DEBUG','userCreatesASetOfNewFiles : before right click');
      await rightClickText('Files');
      clickText('New File');
      IDEtrace('DEBUG','userCreatesASetOfNewFiles : after clickText');
      
      await page.locator('[placeholder="File Name"]').fill(`textFile${index}.txt`);
      await page.locator('button:has-text("OK")').click();

      await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );

    }
    await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
    IDEtrace('DEBUG','user creates a set of new files done');
}
// ================================================================================
async function userAddsGitTag(gitTagName:string) {
    IDEtrace('DEBUG','Entering userAddsGitTag , tag is : ' + gitTagName);
    
    await page.locator('[id="__more__"]').first().click();
    await page.locator('text=Tags').click();
    await page.locator('text=Create Tag').click();
    IDEtrace('DEBUG','userAddsGitTag : click on more done');
    await page.locator('[placeholder="Tag name"]').fill(gitTagName);
    await page.locator('[placeholder="Tag name"]').press('Enter');
    
    await page.locator('[placeholder="Message"]').click(); 
    await page.locator('[placeholder="Message"]').fill('this is a message to annotate tag :' + gitTagName);
    await page.locator('[placeholder="Message"]').press('Enter');

    IDEtrace('DEBUG','Leaving userAddsGitTag , tag is : ' + gitTagName);
}

// ================================================================================

Then('user adds git tag {string}',{ timeout: 120 * 1000 }, async function (this: CubeWorld,gitTagName:string) {
    await userAddsGitTag(gitTagName);
});

// ================================================================================

Then('user displays git branch {string}',{ timeout: 60 * 1000 }, async function (this: CubeWorld,gitBranchName:string) {
    IDEtrace('DEBUG','Entering user displays git branch ' + gitBranchName);
    await page.locator('span:has-text("' + gitBranchName + '")').click();
    const image = await this.page?.screenshot();
    image && (this.attach(image, 'image/png'));

    await this.page.locator('[placeholder="Select a branch or tag to checkout"]').click();
    await this.page.locator('[placeholder="Select a branch or tag to checkout"]').press('Escape');
    
    IDEtrace('DEBUG','Leaving user displays git branch');
});

// ================================================================================

async function userDeletesGitTag(gitTagToDelete:string)
{
    IDEtrace('DEBUG','Entering user deletes git tag');
    await page.locator('[id="__more__"]').first().click();
    await page.locator('text=Tags').click();
    await page.locator('text=Delete Tag').click();
    await page.locator('[placeholder="Select a tag to delete"]').click();
    
    //await page.locator('span:has-text("TAG-#1")').first().click();
    await page.locator('span:has-text("' + gitTagToDelete + '")').first().click();
    IDEtrace('DEBUG','Leaving user deletes git tag');
}

// ================================================================================

Then('user deletes git tag {string}', async function (this: CubeWorld,gitTagToDelete:string) {
    await userDeletesGitTag(gitTagToDelete);
});

// ================================================================================

// This step is used to create a set of files, used for some git related tests
Then('user creates a set of {string} new files',{ timeout: 60 * 1000 }, async function (this: CubeWorld,numberOfFiles:string) {
    await userCreatesASetOfNewFiles(numberOfFiles);
});

// ================================================================================

async function userChecksStagingArea(numberOfFiles:string) {
    IDEtrace('DEBUG','user checks that ' + numberOfFiles + ' files are in the staging area');

    const numberOfFilesChanged= page.locator('div.theia-TreeNodeSegmentGrow > div.theia-scm-inline-actions-container > div.notification-count-container > span.notification-count').first();
    if (numberOfFilesChanged)
    {
        const value=await numberOfFilesChanged.textContent();
        IDEtrace('DEBUG','found ' + value + ' files changed');
        
        //expect.soft does not work with cucumber !!?? or I didn't understand the behavior
        expect.soft(value).toBe(numberOfFiles);
    }
    else{
        IDEtrace('DEBUG','found no file changed');
    }
    IDEtrace('DEBUG','user checks that ' + numberOfFiles + ' files are in the staging area done');
}

// ================================================================================

Then('user checks that {string} files are in the staging area',{ timeout: 30 * 1000 }, async function (this: CubeWorld,numberOfFiles:string) {
    await userChecksStagingArea(numberOfFiles);
});

// ================================================================================

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
    expect.soft(foundCommit).toBeTruthy();
}

// ================================================================================

Then('user searches for commit {string} in History view', { timeout: 30 * 1000 },async function (this: CubeWorld, commitText:string) {
    await userSearchesForCommitInHistoryView(commitText);
});

// ================================================================================

// async function userAddsAllFilesToStagingArea() {
//     IDEtrace('DEBUG','user adds all files to staging area');

//     const numberOfFilesChanged= page.locator('div.theia-scm-inline-actions-container > div.notification-count-container > span.notification-count').first();
//     if (numberOfFilesChanged)
//     {
//       const value=await numberOfFilesChanged.textContent();
//       IDEtrace('DEBUG','userAddsAllFilesToStagingArea : found ' + value + ' files changed');
//     }
//     else{
//         IDEtrace('DEBUG','userAddsAllFilesToStagingArea: found no file changed');
//     }

//     await page.locator('[id="__more__"]').first().waitFor({state: "visible"});
//     await page.locator('[id="__more__"]').first().click();

//     const menuElements=page.locator('ul.p-Menu-content > li.p-Menu-item[data-type="submenu"]' );
//     const counter = await menuElements.count();

//     for (let index=0; index < counter; index++)
//     {
//       const currentNode=menuElements.nth(index);
//       if (currentNode)
//       {
//         const nodeText = await currentNode.textContent();
//         if (nodeText)
//         {
//           if (nodeText==="Changes")
//           {
//             currentNode.waitFor({state: "visible"});
//             currentNode.click();

//             //const targetElement=page.locator('li.p-Menu-item[data-command="__git.tabbar.toolbar.git.stage.all"]');
//             const targetElement=page.locator('li.p-Menu-item[data-command="git.stageAll"]');

//             if (targetElement)
//             {
//               IDEtrace('DEBUG',"user adds all files to staging area : found target element");
//               targetElement.waitFor({state: "visible"});
//               targetElement.click();
//               await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
//               break;
//             }
//             else
//             {
//                 IDEtrace('ERROR',"user adds all files to staging area : did not find target element");
//             }
//           }
//         }
//       }
//     }
//     IDEtrace('DEBUG','user adds all files to staging area done');
// }

// ================================================================================

Then('user adds all files to staging area',{ timeout: 30 * 1000 }, async function (this: CubeWorld) {
    await userAddsAllChangesToStagingArea();
});

// ================================================================================

When('user clicks Source Control icon', async()=>{
	await clickSourceControlIcon();
});

// ================================================================================

// async function userBuildsConfiguration(swProjectName:string,configurationToBuild:string) {
//     try{
//         page.locator('text=Build ' + swProjectName + ' | main | ' + configurationToBuild).first().click();
//         await page.locator('.theia-TreeNode.theia-CompositeTreeNode.theia-ExpandableTreeNode.theia-mod-selected > .theia-TreeNodeContent > .theia-TreeNodeSegment.flex > .theia-TreeNodeSegment').click();
//         await new Promise( resolve => setTimeout(resolve, + 20 * 1000) );
//     } 
//     catch
//     {
//         IDEtrace('DEBUG','userBuildsConfiguration:could not launch build command');
//     }
// }

// ================================================================================

// async function userCleansBuildsConfiguration(swProjectName:string, configurationToBuild:string) {
//     try{
//         await page.locator('text=Clean and Build ' + swProjectName + ' | main | ' + configurationToBuild ).first().click();
//         await page.locator('.theia-TreeNode.theia-CompositeTreeNode.theia-ExpandableTreeNode.theia-mod-selected > .theia-TreeNodeContent > .theia-TreeNodeSegment.flex > .theia-TreeNodeSegment').click();
//         await new Promise( resolve => setTimeout(resolve, + 20 * 1000) );
//     }
//     catch
//     {
//         userCleansBuildsConfiguration('DEBUG','userBuildsConfiguration:could not launch build command');
//     }
// }

// ================================================================================

async function buildVerdictFromNotificationsList(buildFlag:string) {

    let errorsFound=0;
    let updatNotificationsText="";

    if (buildFlag === 'true')
    {
    //     if (!notificationsList.includes('project build'))
    //     {
    //         errorsFound++;
    //         //expect.soft does not work with cucumber !!!!
    //         //expect.soft(errorsFound,'Testing if errorsFound is 0').toBe(0);
    //     }
    }
    const notificationsListLength=notificationsList.length;
    IDEtrace('DEBUG','found ' + notificationsListLength + ' notifications in list');
    IDEtrace('DEBUG','Dumping ERRORS found in notifications list');

    for (let index=0;index<notificationsListLength;index++)
    {
        const currentItem=notificationsList[index];
        if (currentItem.includes('ERROR') || currentItem.includes("Connection timed out") || currentItem.includes("has exited with code") || currentItem.includes("couldn't create connection to server") )
        {
            errorsFound++;
            IDEtrace('ERROR' , errorsFound + ' : ' + currentItem);
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

// ================================================================================

// This step is called when user tries to build a verdict from the notifications list
Then('user builds verdict from notifications', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
     await buildVerdictFromNotificationsList('true');
});

// ================================================================================

// This step is used to clear the list of notifications that may be used to build a test verdict
// as long as it is not possible to use the console traces
Then('user clears notifications list', { timeout: 20 * 1000 }, async function (this: CubeWorld) {
    notificationsList = [];
});

// ================================================================================

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

// ================================================================================

// async function userRefreshesTasksList() {
//     IDEtrace('DEBUG','Refreshing tasks list');          
//     await page.locator('.p-TabBar-tabIcon.theia-plugin-view-container').first().click();
//     await page.locator('[id="task-manager-tasks\\.refresh-as-tabbar-toolbar-item"]').first().click();
//     await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
//     await page.locator('[id="task-manager-tasks\\.refresh-as-tabbar-toolbar-item"]').first().click();
//     await new Promise( resolve => setTimeout(resolve, + 2 * 1000) );
//     // await page.locator('.p-TabBar-tabIcon.theia-plugin-view-container').first().click(); // keeping tasks list opened
//     IDEtrace('DEBUG','tasks list is refreshed now');
// }

// ================================================================================

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

// ================================================================================

// async function userGetsTheiaStatusBar(deviceName:string, deviceStatus:string,projectName:string, swProjectName:string) {
//     const locatorText="div[id='theia-statusBar']";
//     const statusBar=await page.locator(locatorText).textContent();
//     // IDEtrace('DEBUG','userGetsTheiaStatusBar: status bar value is [' + statusBar + ']');
//     if (statusBar) { 
//         try 
//         {
//             const context=statusBar.split(']')[0].replace('[',''); 
//             IDEtrace('INFO','device:' + deviceName + ', context:[' + context + ']');
//             if (context !== projectName + ' | ' + swProjectName + ' | main | debug')
//             {
//                 IDEtrace('ERROR','device:' + deviceName + ', device status:' + deviceStatus + ', unexpected context ' + context + ',from status bar for project ' + projectName + ' and sw project name ' + swProjectName);
//              }
//         }
//         catch
//         {
//             IDEtrace('ERROR','device:' + deviceName + ', device status:' + deviceStatus + ', Failed to extract context from status bar for project ' + projectName + ' and sw project name ' + swProjectName);
//         }
//     }
// }

// ================================================================================

// async function userSelectsFileMainDotC(projectName:string,swProjectName:string) {
    
//     IDEtrace('DEBUG','Entering userSelectsFileMainDotC');
//     await openExplorer();

//     page.setDefaultTimeout(10000);
//     try
//     {
//         await page.locator('#files >> text=' + projectName).waitFor({state: "visible"});
//         await page.locator('#files >> text=' + projectName).click();
//         //await clickText(projectName);
//         await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
//         IDEtrace('DEBUG','click on ' + projectName + ' done');
//     }
//     catch
//     {
//         IDEtrace('ERROR','click on ' + projectName + ' failed');
//     }
//     try
//     {
//         await page.locator('#files >> text=' + swProjectName).waitFor({state: "visible"});
//         await page.locator('#files >> text=' + swProjectName).click();
//         //await clickText(swProjectName);
//         await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
//         IDEtrace('DEBUG','click on ' + swProjectName + ' done');
//     }
//     catch
//     {
//         IDEtrace('ERROR','click on ' + swProjectName + ' failed');
//     }

//     try
//     {
//         await page.locator(':text-is("src")').first().waitFor({state: "visible"});
//         await page.locator(':text-is("src")').first().click();

//         IDEtrace('DEBUG','click on src directory done');
//     }
//     catch
//     {
//         IDEtrace('ERROR','click on src directory failed');
//     }  
//     try
//     {  
//         await page.locator(':text-is("main.c")').first().waitFor({state: "visible"});
//         await page.locator(':text-is("main.c")').first().click();
//         //await clickText('main.c');
//         await new Promise( resolve => setTimeout(resolve, + 1 * 1000) );
//         IDEtrace('DEBUG','click on file main.c done');
//     }
//     catch
//     {
//         IDEtrace('ERROR','Failed to click on file main.c');
//         //notificationsList.push('Error : Failed to click on file main.c');
//     }
//     page.setDefaultTimeout(30000);
//     IDEtrace('DEBUG','Leaving userSelectsFileMainDotC');
// }

// ================================================================================

async function deleteProjectFromWorkspace(projectName:string) {
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

// ================================================================================

When('user starts IDE tests for {string} {string} {string} {string} {string} {string} {string} {string} {string}', { timeout: 7200 * 1000 },async function (this: CubeWorld, 
    products:string,
    filter:string,
    createProjectFlag:string,
    deleteProjectFlag:string,
    checkContextFlag:string,
    buildFlag:string, 
    displayPinoutViewFlag:string,
    displayClockViewFlag:string,
    numberOfTestsToRun:string
    ) {
    
    await userStartsIDETests(this,products,filter,createProjectFlag,deleteProjectFlag,checkContextFlag,buildFlag,displayPinoutViewFlag,displayClockViewFlag,numberOfTestsToRun);

});

// ================================================================================

let yCounter=-1;

// ================================================================================

async function saveAllFiles()
{
    await page.locator('[id="theia\\:menubar"] >> text=File').click();
    await page.locator('text=Save All').click();
}

// ================================================================================

async function userAddsComponent(context:CubeWorld,component:string)
{
    IDEtrace('DEBUG','Entering userAddsComponent');
    const delay=1;
    const Xoffset=200;
    const Yoffset=100;

    await context.page.locator('input[type="search"]').click();
    await context.page.locator('input[type="search"]').fill(component);
    await context.page.locator('input[type="search"]').press('Enter');
    await new Promise( resolve => setTimeout(resolve, + delay * 1000) );

    const inititialLocator = context.page.locator('div.search-container >> div.element-list >> div.element').first();
    await inititialLocator.hover();
    await new Promise( resolve => setTimeout(resolve, + delay * 1000) );
    const dragBox = await inititialLocator.boundingBox();
    await new Promise( resolve => setTimeout(resolve, + delay * 1000) );

    if (dragBox)
    {
        yCounter++;
        
        const Xorigin=Math.round(dragBox.x + dragBox.width / 2);
        const Yorigin=Math.round(dragBox.y + dragBox.height / 2);

        const Xtarget=Math.round(dragBox.x + dragBox.width / 2  + Xoffset);
        const Ytarget=Math.round(dragBox.y + dragBox.height / 2 + Yoffset* yCounter);

        await context.page.mouse.move(Xorigin, Yorigin , {steps:10}) ;
        await new Promise( resolve => setTimeout(resolve, + delay * 1000) );
        await context.page.mouse.click(Xorigin, Yorigin);

        await new Promise( resolve => setTimeout(resolve, + delay * 1000) );

        await context.page.mouse.move(Xtarget, Ytarget , {steps:10}) ; 
        await new Promise( resolve => setTimeout(resolve, + delay * 1000) );
        await context.page.mouse.click(Xtarget, Ytarget);

        IDEtrace('DEBUG','dragAndDropSWComposer : mouse is up'); 
    }
    else
    {
        IDEtrace('ERROR','dragAndDropSWComposer : dragBox is null');
    }

    await saveAllFiles();
    IDEtrace('DEBUG','Leaving userAddsComponent');
    
}

// ================================================================================

async function userResolvesDependencies()
{

    await page.locator('button:has-text("Resolve all Dependencies")').click();
    await new Promise( resolve => setTimeout(resolve, + 30 * 1000) );

    await saveAllFiles();

}

// ================================================================================

async function userGeneratesCode()
{
    await page.locator('button:has-text("Generate code")').nth(1).click();
    await new Promise( resolve => setTimeout(resolve, + 40 * 1000) );

    await saveAllFiles();
}

// ================================================================================

async function userGetsText()
{
    await new Promise( resolve => setTimeout(resolve, 4000) );
    
    const divNodesLocator = await page.locator('div.view-lines >> div.view-line');
    const numberOfLines=await divNodesLocator.count();

    IDEtrace('DEBUG','Number of lines found : ' + numberOfLines);

    let textContent="";

    IDEtrace('DEBUG','userGetsText : searching for text ++++++++++++++++++++++++++++++++++');
    
    for(let index=0;index<numberOfLines;index++)
    {
        const currentLineLocator = divNodesLocator.nth(index);
        const spanNodes=await currentLineLocator.locator('span >> span');
        const spanNodesNumber=await spanNodes.count();
        IDEtrace('DEBUG','userGetsText : Found ' + spanNodesNumber + ' span nodes for line ' + index);

       let lineText="";
        for(let index=0;index<spanNodesNumber;index++)
        {
                const newItem=spanNodes.nth(index);
                const text=await newItem.textContent();
                //IDEtrace('DEBUG','userGetsText : Found text : [' + text + ']');
                lineText += text;
        }
        IDEtrace('DEBUG','userGetsText : Found line : [' + lineText + ']');
        textContent += lineText + '\n';
    }
    IDEtrace('DEBUG',textContent);
    IDEtrace('DEBUG','userGetsText : searching for text done +++++++++++++++++++++++++++++++++++++');

    return textContent;
}

// ================================================================================

async function userAddsCompilerToCsolution(projectName:string)
{

    // opens explorer
    await page.locator('.p-TabBar-tabIcon.codicon.codicon-files').first().click();
  
    // opens project
    await page.locator('div.theia-TreeNodeSegment.theia-TreeNodeSegmentGrow:text-is("' + projectName + '")').first().click();
	
    // opens csolution.yml file
    await page.locator('text=' + projectName + '.csolution.yml').click();

    let csolutionFileContent=await userGetsText();

    // append text content
    csolutionFileContent += '  compiler: GCC' ;

    //IDEtrace('DEBUG','userAddsCompilerToCsolution : ++++++++ csolution file content');
    //IDEtrace('DEBUG',csolutionFileContent);
    //IDEtrace('DEBUG',' : userAddsCompilerToCsolution++++++++ csolution file content displayed');

    // Erase content
    await page.locator('text=Selection').click();
    await page.locator('text=Select All').first().click();
    await new Promise( resolve => setTimeout(resolve, 4000) );

    try {
        await page.locator('[id="theia\\:menubar"] >> text=Edit').click({timeout:6000});
        await new Promise( resolve => setTimeout(resolve, 2000) );
        IDEtrace('DEBUG',' : userAddsCompilerToCsolution : cick on Edit command succeeded');
    }
    catch
    {
        IDEtrace('DEBUG','click on Edit command failed');
    }

    try {
        await page.locator('text=Cut').nth(1).click({timeout:1000});
	 IDEtrace('DEBUG','click on Cut command succeeded');
    }
    catch
    {
        await page.locator('text=Cut').click({timeout:1000});
	IDEtrace('DEBUG','click on Cut command should be ok');
    }

    try {
        await page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill(csolutionFileContent);
        await new Promise( resolve => setTimeout(resolve, 2000) );
	IDEtrace('DEBUG', 'userAddsCompilerToCsolution : filling editor with text content succeeded');
    }
    catch
    {
        IDEtrace('DEBUG','Failed to fill editor with text content');
    }


    IDEtrace('DEBUG', 'userAddsCompilerToCsolution : converting invisible characters');

    try {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : trying to click on Replace in Files button');
        await page.locator('[id="theia\\:menubar"] >> text=Edit').click({timeout:6000});
        await new Promise( resolve => setTimeout(resolve, 2000) );
        await page.locator('text=Replace in Files').click({timeout:6000});
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : after click on Replace in Files button');
    }
    catch
    {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : could not click on Replace in files button');
    }

    try {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : before click on use regular expression button to enable it');
        await page.locator('.codicon.codicon-regex.option').first().click({timeout:6000});
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : after click on use regular expression button');
    }
    catch
    {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : could not click on regular expression button');
    }

    try {
        await page.locator('[placeholder="Search"]').click();
        await page.locator('[placeholder="Search"]').fill('[\\xa0]');
        await page.locator('[placeholder="Search"]').press('Enter');
        await new Promise( resolve => setTimeout(resolve, 4000) );
    }
    catch
    {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : failed to fill Search field with 0xa0');
    }

    try {
        await page.locator('[placeholder="Replace"]').click();
        await page.locator('[placeholder="Replace"]').fill(' ');
        await page.locator('[placeholder="Replace"]').press('Enter');
        await new Promise( resolve => setTimeout(resolve, 4000) );
    }
    catch
    {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : failed to fill Replace field with space');
    }

    try {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : before click on replace all button');
        await page.locator('.codicon.codicon-replace-all').click();
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : after click on replace all button');
    }
    catch
    {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : failed to click on replace all button');
    }

    try {
        await page.locator('button.theia-button.main:text-is("OK")').first().click();
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : after click on OK button');
    }
    catch
    {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : failed to click on OK button');
    }
	
    try {
        // disable regular expression button for next test
        await page.locator('.codicon.codicon-regex.option').first().click({timeout:2000});
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : after click on use regular expression button to disable it');
    }
    catch
    {
        IDEtrace('DEBUG', 'userAddsCompilerToCsolution : failed to  disable regular expression button for next test');
    }
	
    IDEtrace('DEBUG', 'userAddsCompilerToCsolution : converting invisible characters done');

    // save file
    await page.locator('[id="theia\\:menubar"] >> text=File').click();
    await page.locator('text=SaveCtrl+S >> div').nth(1).click();

    // close editor
    await page.locator('[id="theia\\:menubar"] >> text=File').click();
    await page.locator('text=Close Editor').click();
	
    IDEtrace('DEBUG', 'Leaving userAddsCompilerToCsolution');
}

// ================================================================================

// async function userDisablesDMATimerIT(context:CubeWorld)
// {
//     IDEtrace('DEBUG','Entering userDisablesDMATimerIT');

//     //await page.pause();

//      const selectorText='div[id="swcomposer-diagram_0"].sprotty >> svg.sprotty-graph >> g >> g.node.component';
    
//     const locatorList=context.page.locator(selectorText);
//     const locatorCount=await locatorList.count();

//     IDEtrace('DEBUG','Locator list width is ' + locatorCount);

//     for(let index=0;index<locatorCount;index++)
//     {
//         const currentItem = locatorList.nth(index);
//         const searchedNode=currentItem.locator('g.comp-header >> text.component-label'); // "STM32 HAL Code Gen:System Init"
//         if (searchedNode)
//         {
//             const currentText=await searchedNode.textContent();
//             if (currentText) { IDEtrace('DEBUG',currentText);}
//             if (currentText === "STM32 HAL Code Gen:System Init")
//             {
//                 IDEtrace('DEBUG','Found target node');

//                 //const newItem=currentItem.locator('g.comp.sprotty-comp >> g.comp-instances.instances >> g.sprotty-button.enabled.configuration');
//                 const newItem=currentItem.locator('g.comp.sprotty-comp >> g.comp-instances.instances >> g.sprotty-button.enabled >> rect'); 
//                 IDEtrace('DEBUG','search for button, width=' + await newItem.count());
     
//                 if (newItem) {

//                     const newBox = await newItem.boundingBox();
//                     if (newBox) { 
                        
//                         try {
//                                 IDEtrace('DEBUG','trying to disable DMA IT');
                                
//                                 await newItem.hover({force:true, trial:true,timeout:10000});

//                                 await newItem.click({force:true,timeout:10000});
//                                 await newItem.dispatchEvent('click', MouseEvent,{timeout:6000}); 

//                                 await new Promise( resolve => setTimeout(resolve, 6000) ); 
//                                 IDEtrace('DEBUG','click on button done');    
//                                 await context.page.frameLocator('iframe').frameLocator('#active-frame').locator('div[role="button"]:has-text("1MX")').click();
//                                 await context.page.frameLocator('iframe').frameLocator('#active-frame').locator('[aria-label="Enable DMA usage inside the HAL TIM"] input[type="checkbox"]').uncheck();                    
//                                 IDEtrace('DEBUG','DMA IT should be disabled');
//                                 await saveAllFiles();
//                         }
//                         catch
//                         {
//                             IDEtrace('ERROR','Failed to click');
//                         }                       
//                     }                   
//                     break;
//                 }
//             }
//         }
//     }
// }

// ================================================================================

async function userClosesEditor()
{
    // close editor
    await page.locator('[id="theia\\:menubar"] >> text=File').click();
    await page.locator('text=Close Editor').click();
    IDEtrace('DEBUG','Editor should be closed now');
}

// ================================================================================

async function userOpensProjectInSoftwareComposer(swProjectName:string)
{
    //await page.pause();

    //const locatorText='text=S' + swProjectName + ' >> [data-testid="show_contextual_menu"] span';
    //await page.locator(locatorText).click();

    await page.locator('[data-testid="show_contextual_menu"] span').click();
    await page.locator('[data-testid="sw_project_button_open"]').click();

}

// ================================================================================

async function userClosesTerminal(terminalTitle:string)
{
	// closing terminal
	IDEtrace('DEBUG','userClosesTerminal : before li.p-TabBar-tab.p-mod-closable.p-mod-current[title="Terminal"] >> div[title="Close"]');
	
	const listsLocator=await page.locator('li.p-TabBar-tab.p-mod-closable.p-mod-current');
	const childrenCounter = await listsLocator.count();
    IDEtrace('DEBUG','userClosesTerminal : found ' + childrenCounter + ' lists');

    for (let index = 0; index < childrenCounter; index++)
	{
		const listTitle = await listsLocator.nth(index).getAttribute('title');
        if (listTitle)
        {
            IDEtrace('DEBUG','userClosesTerminal : Found list title : ' + listTitle);
            
            if ( listTitle.includes(terminalTitle) )
            {
                await listsLocator.nth(index).locator('div[title="Close"]').click();
            }
        }
	}

	//try {await page.locator('li.p-TabBar-tab.p-mod-closable.p-mod-current[title="Terminal 0"] >> div[title="Close"]').first().click({timeout:6000});}
	//catch {IDEtrace('DEBUG','userClosesTerminal : Failed to close terminal');}
	//IDEtrace('DEBUG','userClosesTerminal : after li.p-TabBar-tab.p-mod-closable.p-mod-current >> div["title=Close"]');
}

// ================================================================================

async function userCopiesGpdscFiles(projectName:string,swProjectName:string)
{
  let openTerminalStatus=false // false means terminal not opened
  try
  {
    await page.locator('[id="theia\\:menubar"] >> text=Terminal').click();
    await page.locator('text=New Terminal').first().click();
    IDEtrace('DEBUG','userCopiesGpdscFiles : New Terminal opened with success');
    openTerminalStatus=true;
  }
  catch
  {
    IDEtrace('ERROR','userCopiesGpdscFiles : Failed to open New Terminal');
  }

  if (openTerminalStatus=== true)
  {
    IDEtrace('DEBUG','userCopiesGpdscFiles : moving files from ' + projectName + '/' + swProjectName + '/generated');
    IDEtrace('DEBUG','userCopiesGpdscFiles : moving files to ' + projectName + '/' + swProjectName + '/generated/STM32Cube_CodeGen');
	
    await page.locator('[aria-label="Terminal input"]').fill('mv ' + projectName + '/' + swProjectName + '/generated/*.gpdsc ' + projectName + '/' + swProjectName + '/generated/STM32Cube_CodeGen/.');
    await page.locator('[aria-label="Terminal input"]').press('Enter');
    await page.locator('[aria-label="Terminal input"]').fill('mv ' + projectName + '/' + swProjectName + '/generated/*.c ' + projectName + '/' + swProjectName + '/generated/STM32Cube_CodeGen/.');
    await page.locator('[aria-label="Terminal input"]').press('Enter');
    await page.locator('[aria-label="Terminal input"]').fill('mv ' + projectName + '/' + swProjectName + '/generated/*.h ' + projectName + '/' + swProjectName + '/generated/STM32Cube_CodeGen/.');
    await page.locator('[aria-label="Terminal input"]').press('Enter');

    await userClosesTerminal('Terminal');
  }
  return openTerminalStatus;
}

// ================================================================================

async function userClosesProject(projectName:string)
{
	//await page.pause();
	//await openExplorer();
	await page.locator('div.theia-TreeNodeSegment.theia-TreeNodeSegmentGrow:text-is("' + projectName + '")').first().click();
}

// ================================================================================

//async function userGetsBuildTerminalContent()
//{
    // This function can not be done with CS #199
    //await page.locator('text=Select All').click();
    //await page.locator('text=Copy').click();
//}

// ================================================================================

async function userClosesBuildTerminal()
{
	//await page.pause();

    try
    {
        await userClosesTerminal('Task: Cube build project');
        //await userClosesTerminal('Task: Cube build all');
    }
    catch
    {
        IDEtrace('ERROR','Failed to close build terminal');
    }
}

// ================================================================================

async function userSetsContext(projectName:string, swProjectName:string )
{
    let returned_value : boolean  = true ;
    IDEtrace('DEBUG', 'Entering userSetsContext with project ' + projectName) ;
    
    try
    {
      await openExplorer();
      await page.locator('[id="navigator\\.refresh"]').click();
      await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
      IDEtrace('DEBUG', 'userSetsContext : click on Refresh done');
    }
    catch
    {
      IDEtrace('ERROR', 'userSetsContext: failed to click on Refresh');	    
    }

    try {
	await page.locator('#files >> text=STM32_HAL_Driver_codegen.gpdsc').click();
	await page.locator('[id="theia\\:menubar"] >> text=File').click({timeout:2000});
        await page.locator('text=Close Editor').click({timeout:2000});
	IDEtrace('DEBUG', 'userSetsContext : click on File/Close Editor is ok');
    } 
    catch
    {
        IDEtrace('ERROR', 'File STM32_HAL_Driver_codegen.gpdsc was not found, certainly a problem at project creation !!');
        returned_value=false;
    }
    IDEtrace('DEBUG', 'Leaving userSetsContext') ;
    return returned_value ;
}

// ================================================================================

async function userBuildsCurrentProject()
{
    // Build current project
    await page.locator('select').selectOption('Project'); // All before
    await page.locator('button:has-text("Build")').click();
    await new Promise( resolve => setTimeout(resolve, + 30 * 1000) );
}

// ================================================================================

async function userChangesMainHeaderFile()
{
	 IDEtrace('DEBUG', 'Entering userChangesMainHeaderFile');
	//await page.pause();
	 IDEtrace('DEBUG', 'Leaving userChangesMainHeaderFile');
}
// ================================================================================

async function userStartsIDETests(  context:CubeWorld,
                                    products:string,  
                                    filter:string,  
                                    createProjectFlag:string,
                                    deleteProjectFlag:string,
                                    checkContextFlag:string,
                                    buildFlag:string, 
                                    displayPinoutViewFlag:string,
                                    displayClockViewFlag:string,
                                    numberOfTestsToRun:string) {

    IDEtrace('INFO','products=' + products);
    IDEtrace('INFO','filter=' + filter);
    IDEtrace('INFO','createProjectFlag=' + createProjectFlag);
    IDEtrace('INFO','deleteProjectFlag=' + deleteProjectFlag);
    IDEtrace('INFO','checkContextFlag=' + checkContextFlag);
    IDEtrace('INFO','buildFlag=' + buildFlag);
    IDEtrace('INFO','displayPinoutViewFlag=' + displayPinoutViewFlag);
    IDEtrace('INFO','displayClockViewFlag=' + displayClockViewFlag);
    IDEtrace('INFO','numberOfTestsToRun=' + numberOfTestsToRun);

    let textForTestReport="NO_TEXT_FOR_REPORT";

    let currentList: Array<Array<string>>=[];

    console.table(mcusList);

    if (products === 'Board')
    {
   	if (boardsList)
	{
    	    currentList=boardsList;
	}
    }
    if (products === 'MCU')
    {
        if (mcusList)
	{
	    currentList=mcusList;
	    if (filter !== 'none') {  currentList=mcusList.filter((data) => data[0].includes(filter) && ( data[5]==='Active') || (data[0].includes('Part Number'))); }
    		console.table(currentList);
	}
    }

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
	IDEtrace('DEBUG', 'filter=' + filter);
	IDEtrace('DEBUG', 'deviceName=' + deviceName);
	IDEtrace('DEBUG', 'deviceStatus=' + deviceStatus);

        if ( (filter !== "none") && (deviceName.includes(filter)) && ( deviceStatus === 'Active') )
        {
           const projectName='project_' + deviceName;
           const swProjectName='sw_' + projectName;

           tested_devices++;
           IDEtrace('INFO', 'Creating project ' + projectName + ' for device:' + deviceName + '[#' + tested_devices + ']');

	   let generatedProjectStatus=false;
	   let contextStatus=false;
           let projectStartedStatus = false;

           if (createProjectFlag === 'true')
           {
                projectStartedStatus = await userCreatesProjectForDevice(projectName, deviceName);
		if (projectStartedStatus === true)
		{
                  await userAddsANewSWProject(swProjectName);
                  await userAddsCompilerToCsolution(projectName);
                  await userOpensProjectInSoftwareComposer(swProjectName);

                  await userAddsComponent(context,'cube no os');

                  await userResolvesDependencies();
                  await userGeneratesCode();
                  await userClosesEditor();
		  generatedProjectStatus = await userCopiesGpdscFiles(projectName,swProjectName);
		  if (generatedProjectStatus === true) { await userChangesMainHeaderFile(); }
		}
           }

	    if (generatedProjectStatus === true)
            {
              contextStatus = false;
              if (buildFlag==='true')
              {
                contextStatus=await userSetsContext(projectName,swProjectName);
                if (contextStatus)
                {
                    if ( contextStatus === true ) // true means no error
                    {
                        await userBuildsCurrentProject();
			await userClosesProject(projectName);
                        await userClosesBuildTerminal();
                        await userClosesEditor();
                    }
                }
		else
		    IDEtrace('ERROR','Failed to switch to project context, bypassing build step since project is certainly not correctly generated');
              }
	    }

            await userClosesOpenedWindows(products,deviceName);

	    if (projectStartedStatus === true)
	    {
              if (deleteProjectFlag === 'true') { await deleteProjectFromWorkspace(projectName); }
              else
              { 
                if (contextStatus === false )
                { 
                    await userClosesProject(projectName);
                    await page.locator('[id="shell-tab-Cube\\:application-project\\:widget"] > .p-TabBar-tabCloseIcon').click();
                }
              }
            }

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

// ================================================================================

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

// ================================================================================

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

// ================================================================================

// This step is called when user wants to build a list of products available in the Finder :
// Boards, mcus, mpus, expansion boards, parts
Then('user builds list of {string}', { timeout: 180 * 1000 }, async function (this: CubeWorld, products:string) {
    await userBuildsListOfProducts(products);
});

// ================================================================================

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

// ================================================================================

// This step is called when user wants to add a list to test report
Then('user adds {string} list to test report', { timeout: 30 * 1000 }, async function (this: CubeWorld, listToReport: string) {
    const textToReport=await userAddsListToTestReport(listToReport);
    this.attach(textToReport,'text/plain');
});

// ================================================================================

async function userGetsCubeStudioVersion(context:CubeWorld) {
    const cubeStudioVersion = await context.page.locator('div.about-details').textContent();
    await context.attach('cubeStudio version :' + cubeStudioVersion,'text/plain');
}

// ================================================================================

Then('user gets cube studio version', async function (this: CubeWorld) {
    userGetsCubeStudioVersion(this);
});

// ================================================================================

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

// ================================================================================

// This step is used to report the version of each theia extension into the test report
Then('user gets theia extensions', async function (this: CubeWorld) {
    await userGetsTheiaExtensionsVersions(this);
});

// ================================================================================

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

// ================================================================================

// This step is used when user wants to get the list of notifications appeared during the step  passed as a parameter
Then('user gets notifications after {string}', { timeout: 20 * 1000 }, async function (this: CubeWorld, step:string) {
    await userGetsTheiaNotifications();
});

// ================================================================================

// This function is called in order to convert a project before it could be built
// The string parameter is the name of the project that should be in the explorer view
async function userConvertsProject(projectName:string) {
    clickText(`${projectName}: Convert`);
    await new Promise( resolve => setTimeout(resolve, + 4 * 1000) );
}

// ================================================================================

// This step is called to convert a project before it could be built
Then('user converts project {string}', async function (this: CubeWorld, projectName:string) {
    await userConvertsProject(projectName);
});

// ================================================================================

Then('user types text {string}', async function (this: CubeWorld, textToType:string) {
    await clickText(textToType);
});

// ================================================================================

async function userBuildsProject(projectName:string, swProjectName:string,releaseToBuild:string ) {
    clickText(`${projectName}: Build ${swProjectName} | main | ${releaseToBuild}`);
}

// ================================================================================

Then('user builds project {string} {string} {string}', async function (this: CubeWorld, projectName:string, swProjectName:string, releaseToBuild:string) {
    await userBuildsProject(projectName, swProjectName,releaseToBuild);
});

// ================================================================================

async function userCreatesProjectForDevice(projectName:string, deviceName:string)
{
    IDEtrace('DEBUG','Entering userCreatesProjectForDevice for device ' + deviceName + ' , project is ' + projectName);

    let projectStartedStatus:boolean = false; // false means project creation could not be started

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
    try
    {
      await clickButton('Start a project');
      IDEtrace('DEBUG','Click on Start a project button is ok');
      projectStartedStatus=true;
    }
    catch
    {
      IDEtrace('ERROR','Click on Start a project button failed, stopping current test');
    }
    if ( projectStartedStatus === true )
    {
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
    return projectStartedStatus;
}

// ================================================================================

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

// ================================================================================

async function userChoosesLaunchConfiguration(launchConfiguration:string) {
    await page.locator('text='+launchConfiguration).waitFor({state: "visible"});
    await page.locator('text='+launchConfiguration).click();
}

// ================================================================================

When('user selects launch configuration {string}', async function (this: CubeWorld,launchConfiguration:string) {
    await userChoosesLaunchConfiguration(launchConfiguration);
});

// ================================================================================

async function userAddsANewSWProject(projectName:string) {
    IDEtrace('DEBUG','Entering userAddsANewSWProject');
    try
    {
        //await clickText('Add a SW project');
        //await clickInputAtRightOfText('Software Project name:');
        //await typeText(projectName);
        //await clickButton('Create SW Project');
	    
	await page.locator('[data-testid="sw_project_button_add"]').click();
        await page.locator('[data-testid="sw_project_name"]').click();
        await page.locator('[data-testid="sw_project_name"]').fill(projectName);
        await page.locator('[data-testid="valid_popup_button"]').click();

        IDEtrace('DEBUG','SW project created');
    }
    catch
    {
        IDEtrace('ERROR','Failed to add a SW project');
    }
    IDEtrace('DEBUG','Leaving userAddsANewSWProject');
}

// ================================================================================

Given('user adds a new software project {string} in application project panel', async function (this: CubeWorld, projectName:string) {
    await userAddsANewSWProject(projectName);
});

// ================================================================================

Given('user adds a new software component to project {string} in application project panel', async function (this: CubeWorld, sw_proj:string) {
    await clickPencilIconAtRightOfText(sw_proj);
});

// ================================================================================

Then('user gets conversion log messages from console', async function (this: CubeWorld) {
    await this.attach("user gets conversion log messages from console: nothing possible until now",'text/plain');
});

// ================================================================================

Then('user gets build log messages from console', async function (this: CubeWorld) {
    await this.attach("user gets conversion log messages from console: nothing possible until now",'text/plain');
});

// ================================================================================

// This step is called after calling a conversion step , and should set to "conversion" verdict depending
// on the console traces (not available until now)
Then('user sets a conversion verdict', async function (this: CubeWorld) {
    await this.attach("user sets a conversion verdict : nothing done until now",'text/plain');
});

// ================================================================================

Then('user sets a build verdict from console traces', async function (this: CubeWorld) {
    await this.attach("user sets a build verdict from console traces: nothing done until now",'text/plain');
});

// ================================================================================

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

            expect.soft(iValue).toBe(index+1);
        }
        const image = await this.page?.screenshot();
        image && (this.attach(image, 'image/png'));
    }
});

// ================================================================================

async function userSelectsDebugContext(applicationName:string,swProjectName:string,versionType:string) {
    const locatorText=` text=[${applicationName} | ${swProjectName} | main | ${versionType}]`;

    await page.locator(locatorText).waitFor({state: "visible"});
    await page.locator(locatorText).click(); 
}

// ================================================================================

// This step is called when user selects a debug context
Then('user selects debug context for application {string}, sw project {string} and {string} version', async function (this: CubeWorld, application:string, swProject:string, version:string) {
    await userSelectsDebugContext(application,swProject, version);
});

// ================================================================================

// This test specific step is used to patch file main.c (add i++)
Then('testuser patches file main.c', async function (this: CubeWorld) {
    await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).waitFor({state: "visible"});
    await this.page.locator('div[role="code"] div:has-text("while(1) {")').nth(4).click();

    await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').press('Enter');
    await this.page.locator('[aria-label="Editor content\\;Press Alt\\+F1 for Accessibility Options\\."]').fill('#include "main.h"\nint main() {\n    int i=0;\n  while(1) {\n    i++;\n  }\n  return 0;\n}');
});

// ================================================================================

// this test specific step is called when test user want to add a breakpoint on line containing "i++" of file main.c
When('testuser clicks on line with incremented i', async function (this: CubeWorld) {
    await this.page.locator('text=i++;').waitFor({state: "visible"});
    await this.page.locator('text=i++;').click();
});

// ================================================================================

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

// ================================================================================

async function userRunsGitInitCommand()
{
    // record for build #188
    await page.locator('[id="theia\\:menubar"] >> text=View').click();
    await page.locator('text=Command Palette...').click();
    await page.locator('[aria-label="Type to narrow down results\\."]').click();
    await page.locator('[aria-label="Type to narrow down results\\."]').fill('>git:');
    await page.locator('text=Initialize Repository').click();
    await page.locator('.monaco-icon-name-container').first().click();
}

// ================================================================================

Then('user performs git init command', async function (this: CubeWorld) {

   await userRunsGitInitCommand();

});

// ================================================================================

Then('testuser checks that {string} files are in the staging area',async function (this: CubeWorld, numberOfCommits:string) {
    const locatorText='div.notification-count-container.scm-change-count >> span.notification-count';
    const staggedFiles = Number(await this.page.locator(locatorText).first().textContent());

    IDEtrace('DEBUG', 'expected changes in the staging area : ' + numberOfCommits);
    IDEtrace('DEBUG', 'found ' + staggedFiles + ' in the staging area');

    //expect.soft does not work with cucumber !!?? or I ddin't understand its way of working
    expect.soft(staggedFiles).toBe(Number(Number(numberOfCommits)));
});

// ================================================================================

const ActivateIDETraces=true;
const report_IDE_ERROR_traces=true;
const report_IDE_WARNING_traces=false;
const report_IDE_DEBUG_traces=true;
const report_IDE_INFO_traces=true;
//const report_IDE_DEBUG_tables=false;

// ================================================================================

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
}

// ================================================================================

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

// ================================================================================

async function userClonesRepository (context: CubeWorld,quick_command:string, repoUrl:string)
{
    const workspacePath=context.theiaApp.workspace['workspacePath'];
    IDEtrace('DEBUG','userClonesRepository : workspacePath='+ workspacePath);

	const quickCommandPalette = theiaApp.quickCommandPalette; 
    await quickCommandPalette.open();
    await quickCommandPalette.type(quick_command);

    await quickCommandPalette.trigger(quick_command);
    await quickCommandPalette.type(repoUrl); // https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY

    await context.page.locator('text=' + repoUrl).click();
    
    const listOfDirectories=workspacePath.split('\\');
    const numberOfDirectories=listOfDirectories.length;

    for (let index=3 ; index < numberOfDirectories ; index++)
    {
        IDEtrace('DEBUG','userClonesRepository : Processing directory ' + listOfDirectories[index]);
        
        let loopCounter=0;
        let clickIsOk=false;

        while ( (loopCounter<=20) && (clickIsOk == false) )
        {
            IDEtrace('DEBUG','userClonesRepository : loopCounter=' + loopCounter);
            const loc= await context.page.locator('div.theia-TreeNodeSegment.theia-TreeNodeSegmentGrow:text-is("' + listOfDirectories[index] + '")').first() ;
            
            if (loc)
            {
                try {
                        await loc.click({timeout:2000});
                        clickIsOk=true;
                        IDEtrace('DEBUG','userClonesRepository : click on item ' + listOfDirectories[index] + ' is OK');
                }
                catch
                {             
                    IDEtrace('DEBUG','userClonesRepository : Could not find item ' + listOfDirectories[index]);               
                    await context.page.keyboard.down('PageDown');
                    await new Promise( resolve => setTimeout(resolve, 2 * 1000) );
                }     
            }
            else
            {
                IDEtrace('DEBUG','userClonesRepository : locator is null');
            }

            loopCounter++;
        }
    }

    await context.page.locator('text=Select as Repository Destination').click();
    await context.page.locator('text=Add to Workspace').click();
}

// ================================================================================

When('user runs quick command {string} to clone repository {string}', { timeout: 180 * 1000 }, async function (this: CubeWorld,quick_command:string, repoUrl:string)
{
    await userClonesRepository(this,quick_command, repoUrl);
});

// ================================================================================

async function userUnstagesAllChanges()
{
    IDEtrace('DEBUG','Unstaging all staged changes');

    await page.locator('[id="__more__"]').first().click();
    await page.locator('text=Changes').nth(2).click();
    await page.locator('text=Unstage All Changes').click();

    IDEtrace('DEBUG','Unstaging all staged changes done');
}

// ================================================================================

When('user unstages all staged changes', { timeout: 60 * 1000 }, async () => {
    await userUnstagesAllChanges();
});

// ================================================================================

async function userChecksThatThereAreUnstagesChanges(expectedUnchanged:string)
{
    IDEtrace('DEBUG','user checks that there are a given number of unstaged changes');
    const locatorText='div.theia-scm-inline-actions-container >> div.status';
    const unstagedFiles=await page.locator(locatorText).count();
    IDEtrace('DEBUG','Found ' + unstagedFiles + ' unstaged changes');
    IDEtrace('DEBUG','Expected ' + expectedUnchanged + ' unstaged changes');

    expect.soft(unstagedFiles).toEqual(Number(expectedUnchanged));

    IDEtrace('DEBUG','user checks that there are a given number of unstaged changes done');
}

// ================================================================================

When('user checks that there are {string} unstaged changes', { timeout: 60 * 1000 }, async function (this: CubeWorld,expectedUnchanged:string) {
    await userChecksThatThereAreUnstagesChanges(expectedUnchanged);
});

// ================================================================================
async function userCreatesGitBranch(context: CubeWorld,gitBranchName:string)
{
    IDEtrace('DEBUG','Entering userCreatesGitBranch ' + gitBranchName);

    IDEtrace('DEBUG','userCreatesGitBranch : before span has text main');
    await page.locator('span:has-text("main")').first().click(); // click on main on bottom left part of screen
    IDEtrace('DEBUG','userCreatesGitBranch : after span has text main');

    await page.locator('text=Create new branch...').click();
    await page.locator('[placeholder="Branch name"]').fill(gitBranchName);
    await page.locator('[placeholder="Branch name"]').press('Enter');
    await new Promise( resolve => setTimeout(resolve, 4 * 1000) );
    IDEtrace('DEBUG','userCreatesGitBranch: git branch ' + gitBranchName + ' should be created now');

    // we check that the git branch name is reported in the status bar 
    try
    {
        await page.locator('text=' + gitBranchName + ' 0 0').click();
        IDEtrace('DEBUG','userCreatesGitBranch: git branch ' + gitBranchName + ' was found in theia status bar');
    }
    catch
    {
        IDEtrace('ERROR','userCreatesGitBranch: Failed to find branch ' + gitBranchName + ' in theia status bar');
    }
    await new Promise( resolve => setTimeout(resolve,+ 4 * 1000) );
    try // this to see if the branch appears in list of branches
    {
        IDEtrace('DEBUG','userCreatesGitBranch: searching branch in list of branches');

        await page.locator('span:has-text("' + gitBranchName + '")').click();

        IDEtrace('DEBUG','userCreatesGitBranch: click to get list of branches is OK');

        const image = await context.page?.screenshot();
        await context.attach(image, 'image/png');

        await page.locator('span:has-text("' + gitBranchName + '")').nth(1).click();
        IDEtrace('DEBUG','userCreatesGitBranch: click on branch ' + gitBranchName + ' is done');
        await new Promise( resolve => setTimeout(resolve, 4 * 1000) );  
    }
    catch
    {
        const image = await context.page?.screenshot();
        await context.attach(image, 'image/png');

        IDEtrace('ERROR','userCreatesGitBranch: failed to display list of branches');
    }

    IDEtrace('DEBUG','userCreatesGitBranch: git branch ' + gitBranchName + ' creation done');
}

// ================================================================================

async function userChangesFromGivenBranchToMainBranch(gitBranchName:string)
{
    IDEtrace('DEBUG','userCreatesGitBranch: we try to go back to main branch');
    try
    {
        await page.locator('[aria-label="\\$\\(git-branch\\) ' + gitBranchName + '\\, IDE_TESTS_FAKE_REPOSITORY \\(Git\\) - ' + gitBranchName + '\\, Checkout Branch\\/Tag\\.\\.\\."] >> text=' + gitBranchName).click();
        IDEtrace('DEBUG','user selects main branch: click to get list of branches is OK');

        await page.locator('span:has-text("main")').nth(1).click();       
        await new Promise( resolve => setTimeout(resolve, 4 * 1000) );  
        IDEtrace('DEBUG','user selects main branch: click on main branch is done');
    }
    catch
    {
        IDEtrace('ERROR', 'user selects main branch: Failed to go back on main branch');
        expect(1).toEqual(0);
    }
}

// ================================================================================

When('user changes from branch {string} to main branch',async function(this: CubeWorld,gitBranchName:string) {
    await userChangesFromGivenBranchToMainBranch(gitBranchName);
});

// ================================================================================

When('user creates git branch {string}', { timeout: 60 * 1000 }, async function(this: CubeWorld, gitBranchName:string) {
    await userCreatesGitBranch(this,gitBranchName);
});

// ================================================================================

async function userSearchesForCommitInGitHistory(commitToFind:string)
{
    const listOfCommits=await userGetsCommits();

    IDEtrace('DEBUG',listOfCommits);
    if (listOfCommits.includes(commitToFind))
    {
        IDEtrace('DEBUG','commit message ' + commitToFind + ' was found in git history');
    }
    else
    {
        IDEtrace('ERROR','commit message ' + commitToFind + ' was not found in git history');
    }
}

// ================================================================================

When('user searches for commit {string} in git history', { timeout: 120 * 1000 }, async function(this: CubeWorld, commitToFind:string) {
    await userSearchesForCommitInGitHistory(commitToFind);
});

// ================================================================================

async function userGetsCommits()
{
    IDEtrace('DEBUG','Entering userGetsCommits');

    const numberOfCommitsNodes=page.locator('div.history-container >> div.listContainer >> div[data-test-id="virtuoso-scroller"] >> div[data-viewport-type="element"] >> div[data-test-id="virtuoso-item-list"] >> div[data-index]'); 
    const counter : number= await numberOfCommitsNodes.count();

    IDEtrace('DEBUG','user found ' + counter + ' commit messages in History view');
    let foundCommitsMessage="List of commits found in git history window\n";
 
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
                IDEtrace('ERROR',except);
            }              
        }
    }
    IDEtrace('DEBUG','Leaving userGetsCommits');
    return foundCommitsMessage;
}

// ================================================================================

async function userGetsNotificationsText()
{
    const notificationsListLength=notificationsList.length;
    IDEtrace('DEBUG','found ' + notificationsListLength + ' notifications in list');

    let notificationsText="List of notifications\n";
    for (let index=0;index<notificationsListLength;index++)
    {
        const currentItem=notificationsList[index];
        notificationsText += currentItem + '\n';
    }
    return notificationsText;
}

// ================================================================================

When('user adds notifications list to test report', { timeout: 120 * 1000 }, async function(this: CubeWorld) {
 
    IDEtrace('DEBUG','Dumping notifications to test report');
    const notificationsText = await userGetsNotificationsText();
    IDEtrace('DEBUG','End of dumping notifications to test report');
    this.attach(notificationsText);
    
});

// ================================================================================

async function userAmendsCommit()
{
    IDEtrace('DEBUG','Entering userAmendsCommit');

    // await page.pause();

    await page.locator('[id="__more__"]').first().click();
    await page.locator('text=Commit').click();
    await page.locator('text=Commit Staged (Amend)').click();
    IDEtrace('DEBUG','userAmendsCommit : click on Commit Staged (Amend) done');
    
    try
    {
        await page.locator('div:has-text("STM32CubeSTUDIO")').nth(2).click({timeout:4000});
        await page.locator('text=Close').click();
        IDEtrace('DEBUG','userAmendsCommit : click on STM32CubeSTUDIO pop-up is ok');
    }
    catch
    {
        IDEtrace('DEBUG','userAmendsCommit : No STM32CubeSTUDIO pop-up found');
    }

    try
    {
        await page.locator('div:has-text("Eclipse Theia")').nth(2).click({timeout:4000});
        await page.locator('text=Close').click();
        IDEtrace('DEBUG','userAmendsCommit : click on Eclipse Theia pop-up is ok');
    }
    catch
    {
        IDEtrace('DEBUG','userAmendsCommit : No Eclipse Theia pop-up found');
    }

    await page.locator('[id="theia\\:menubar"] >> text=File').click();
    await page.locator('text=Save').nth(1).click();
    await page.locator('[id="theia\\:menubar"] >> text=File').click();
    await page.locator('text=Close Editor').click();

    IDEtrace('DEBUG','Leaving userAmendsCommit');
}
// ================================================================================

When('user amends commit', { timeout: 120 * 1000 }, async function(this: CubeWorld) { 
    await userAmendsCommit();
});

// ================================================================================

async function userSearchesForAmendedCommits(commitMessageToSearch:string)
{
    IDEtrace('DEBUG','searches for amended commit');
    try
    {
        await page.locator('#amendedCommits >> text=' + commitMessageToSearch).click({timeout:4000});
        IDEtrace('DEBUG','searches for amended commit ' + commitMessageToSearch + ' is OK ');
    }
    catch
    {
        IDEtrace('ERROR','Failed to find amended commit');
        expect(1).toBe(0);
    }
    IDEtrace('DEBUG','searches for amended commit done');
}

// ================================================================================

When('user searches for amended commit {string}', { timeout: 30 * 1000 }, async function(this: CubeWorld, commitMessageToSearch:string) {
    await userSearchesForAmendedCommits(commitMessageToSearch);
});

// ================================================================================

async function userClosesBoardPanel()
{
    try
    {
        await page.locator('[id="shell-tab-category\\:\\:hardware\\:\\:board"] > .p-TabBar-tabCloseIcon').click();
        await new Promise( resolve => setTimeout(resolve,+ 6000) );
        IDEtrace('DEBUG','Board panel should be closed now');
    }
    catch
    {
        IDEtrace('ERROR','Failed to close board panel');
    }
}
// ================================================================================

When('user closes board panel', { timeout: 10 * 1000 }, async function(this: CubeWorld) {
    await userClosesBoardPanel();
});

// ================================================================================

async function userClosesMcuPanel()
{
    try
    {
        await page.locator('[id="shell-tab-category\\:\\:hardware\\:\\:mcu"] > .p-TabBar-tabCloseIcon').click();
        await new Promise( resolve => setTimeout(resolve,+ 6000) );
        IDEtrace('DEBUG','MCU panel should be closed now');
    }
    catch
    {
        IDEtrace('ERROR','Failed to close mcu panel');
    }
}

// ================================================================================

When('user closes mcu panel', { timeout: 10 * 1000 }, async function(this: CubeWorld) {
    await userClosesMcuPanel();
});

// ================================================================================
