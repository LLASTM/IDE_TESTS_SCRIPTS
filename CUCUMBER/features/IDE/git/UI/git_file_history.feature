# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-215
Feature: After cloning repository :
            search for initial message commit 
            creates 3 commits 
            get each commit message using UI from History view

  Background:
    Given user opens CubeStudio workspace in "./features/resources"

  Scenario:
    Then user goes to SCM view
    Then user adds a screenshot to test report
    Then user uses palette command to clone repository "https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY"
    Then user adds a screenshot to test report
    
    Then user goes to explorer view
    Then user searches for "https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY"
    Then user adds a screenshot to test report

    Then user expands project directories
    Then user adds a screenshot to test report

    Then user goes to SCM view
    Then user adds a screenshot to test report
    Then user searches for commit "Initial commit"
    
    # commit #1
    Then user goes to explorer view
    Then user patches file textFile01.txt
    Then user saves all files
    Then user closes editor
    Then user adds a screenshot to test report

    Then user goes to SCM view
    Then user clicks on staging all changes button
    Then user clicks on commit signed off button
    Then user enters commit message "commit #1"
    Then user adds a screenshot to test report

    Then user goes to History view
    Then user adds a screenshot to test report
    

    # commit #2
    Then user goes to explorer view
    Then user expands project directories
    Then user patches file textFile01.txt
    Then user saves all files
    Then user closes editor
    Then user adds a screenshot to test report

    Then user goes to SCM view
    Then user clicks on staging all changes button
    Then user clicks on commit signed off button
    Then user enters commit message "commit #2"
    Then user adds a screenshot to test report

    Then user goes to History view
    Then user adds a screenshot to test report
    
    # commit #3
    Then user goes to explorer view
    Then user expands project directories
    Then user patches file textFile01.txt
    Then user saves all files
    Then user closes editor
    Then user adds a screenshot to test report

    Then user goes to SCM view
    Then user clicks on staging all changes button
    Then user clicks on commit signed off button
    Then user enters commit message "commit #3"
    Then user adds a screenshot to test report

    Then user goes to History view
    Then user adds a screenshot to test report

    # 3 commits + initial commit
    Then user expects to find "4" commits in History view



