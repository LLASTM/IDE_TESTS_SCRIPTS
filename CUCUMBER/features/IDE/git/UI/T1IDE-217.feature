# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-217 @T1IDE @T1IDE-UI @T1IDE-robustness

Feature:  As an end-user, I want to stage a file for commit using CLI and GUI, 
          so that I can work in the way I prefer.

  Background:
    Given user opens CubeStudio workspace in '../../../initial_workspaces/wsp00'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clicks Source Control icon
    When user runs quick command 'Git: Clone...' to clone directory 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY'
    When user selects repository 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY' link
    When user pauses for 8 seconds
    
    When user clicks explorer icon
    Then user searches for string 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY' in current page
    When user adds a screenshot to test report

    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'
    When user clicks object containing text 'Files'
    When user clicks object containing text 'textFile01.txt'
    #When user expands fake repo project directories

    When user adds a screenshot to test report

    # When user right clicks on text 'Files'
    # When user clicks object containing text 'New File'
    # When user pauses for 4 seconds
    # When user clicks object containing text 'Untitled.txt'
    # When user types text 'textFile1.txt'
    # When user pauses for 4 seconds
    # When user clicks button 'OK'
    When user creates a set of '5' new files
    
    When user adds a screenshot to test report
    
    When user clicks Source Control icon
    When user adds all files to staging area
    When user adds a screenshot to test report
    Then user checks that '5' files are in the staging area
    When user adds a screenshot to test report
