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
    Given user opens CubeStudio workspace in '../../../initial_workspaces/wsp00'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clicks Source Control icon
    When user runs quick command 'Git: Clone...' to clone directory 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY'
    When user selects repository 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY' link
    When user pauses for '8' seconds

    When user clicks explorer icon
    
    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'
    When user clicks object containing text 'Files'
    When user clicks object containing text 'textFile01.txt'
   
    Then user adds a screenshot to test report

    Then user clicks Source Control icon
    Then user adds a screenshot to test report
    Then user searches for commit 'Initial commit' in History view
    
    # commit #1
    When user clicks explorer icon
    Then testuser patches file textFile01.txt

    When user selects menu 'File/Save All'

    Then user selects menu 'File/Close Editor'

    When user clicks object containing text 'Files'
    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'

    Then user adds a screenshot to test report

    Then user clicks Source Control icon
    Then user clicks on staging all changes button
    Then user clicks on commit signed off button
    Then user enters commit message 'commit #1'
    Then user adds a screenshot to test report

    Then user selects menu 'View/History'
    Then user adds a screenshot to test report
    
    # commit #2
    When user clicks explorer icon

    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'
    When user clicks object containing text 'Files'
    When user clicks object containing text 'textFile01.txt'

    Then testuser patches file textFile01.txt
    Then user selects menu 'File/Save All'
    When user pauses for 6 seconds
    Then user selects menu 'File/Close Editor'

    When user clicks object containing text 'Files'
    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'
    Then user adds a screenshot to test report

    Then user clicks Source Control icon
    Then user clicks on staging all changes button
    When user pauses for 6 seconds
    Then user clicks on commit signed off button
    #When user pauses for 6 seconds
    Then user enters commit message 'commit #2'
    Then user adds a screenshot to test report

    Then user selects menu 'View/History'
    Then user adds a screenshot to test report
    
    # commit #3
    When user clicks explorer icon

    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'
    When user clicks object containing text 'Files'
    When user clicks object containing text 'textFile01.txt'

    Then testuser patches file textFile01.txt
    Then user selects menu 'File/Save All'
    When user pauses for 6 seconds
    Then user selects menu 'File/Close Editor'

    When user clicks object containing text 'Files'
    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'
    Then user adds a screenshot to test report
    
    Then user clicks Source Control icon
    Then user clicks on staging all changes button
    When user pauses for 6 seconds
    Then user clicks on commit signed off button
    #When user pauses for 6 seconds
    Then user enters commit message 'commit #3'
    When user pauses for 6 seconds
    Then user adds a screenshot to test report

    Then user selects menu 'View/History'
    When user stops program for debug
    When user pauses for 6 seconds
    Then user adds a screenshot to test report
    
    # 3 commits + initial commit
    Then user expects to find '4' commits in History view
