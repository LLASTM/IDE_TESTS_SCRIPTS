# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-215 @T1IDE
Feature:  As an end-user, I want to see a history for a file using CLI and GUI, 
          so that I can see what has happened

          After cloning repository :
                      search for initial message commit 
                      creates 3 commits 
                      get each commit message using UI from History view

  Background:
    Given user opens CubeStudio workspace in "../../../initial_workspaces/wsp00"
    Given user sets viewport size to "4K"

  Scenario:
    Then user clicks Source Control icon
    Then user adds a screenshot to test report
    Then user uses palette command to clone repository "https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY"
    Then user adds a screenshot to test report
    
    Then user clicks explorer icon
    Then user searches for string "https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY" in current page
    Then user adds a screenshot to test report

    Then testuser expands fake repo project directories
    Then user adds a screenshot to test report

    Then user clicks Source Control icon
    Then user adds a screenshot to test report
    Then user searches for commit "Initial commit" in History view
    
    # commit #1
    Then user clicks explorer icon
    Then testuser patches file textFile01.txt
    Then user saves all files
    Then testuser closes editor
    Then testuser closes fake directory
    Then user adds a screenshot to test report

    Then user clicks Source Control icon
    Then user clicks on staging all changes button
    Then user clicks on commit signed off button
    Then user enters commit message "commit #1"
    Then user adds a screenshot to test report

    Then user goes to History view
    Then user adds a screenshot to test report
    
    # commit #2
    Then user clicks explorer icon
    Then testuser expands fake repo project directories
    Then testuser patches file textFile01.txt
    Then user saves all files
    Then testuser closes editor
    Then testuser closes fake directory
    Then user adds a screenshot to test report

    Then user clicks Source Control icon
    Then user clicks on staging all changes button
    Then user clicks on commit signed off button
    Then user enters commit message "commit #2"
    Then user adds a screenshot to test report

    Then user goes to History view
    Then user adds a screenshot to test report
    
    # commit #3
    Then user clicks explorer icon
    Then testuser expands fake repo project directories
    Then testuser patches file textFile01.txt
    Then user saves all files
    Then testuser closes editor
    Then testuser closes fake directory
    Then user adds a screenshot to test report

    Then user clicks Source Control icon
    Then user clicks on staging all changes button
    Then user clicks on commit signed off button
    Then user enters commit message "commit #3"
    Then user adds a screenshot to test report

    Then user goes to History view
    Then user adds a screenshot to test report

    # 3 commits + initial commit
    Then user expects to find "4" commits in History view
