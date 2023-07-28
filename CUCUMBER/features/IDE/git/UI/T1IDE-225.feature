# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-225 @T1IDE
Feature: As an end-user, I want to tag my changes using CLI and GUI, so that I can remember my releases.

  Background:
    Given user opens CubeStudio workspace in '../../../test_workspace'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clicks Source Control icon
    When user runs quick command 'Git: Clone' to clone repository 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY'
    When user pauses for 8 seconds
    When user creates git branch 'git_branch_00'
    When user clicks explorer icon
    When user clicks object containing text 'IDE_TESTS_FAKE_REPOSITORY'
    When user clicks object containing text 'Files'

    When user clicks object containing text 'textFile01.txt'
    Then testuser patches file textFile01.txt
    Then user selects menu 'File/Save All'
    When user pauses for 6 seconds
    Then user selects menu 'File/Close Editor'
    Then user clicks Source Control icon
    Then user clicks on staging all changes button
    Then user clicks on commit signed off button 'commit #1'
    #Then user enters commit message 'commit #1'
    When user pauses for 6 seconds
    Then user adds git tag 'TAG#1'
    Then user displays git branch 'git_branch_00'
    Then user adds a screenshot to test report
    Then user deletes git tag 'TAG#1'
    Then user displays git branch 'git_branch_00'
    Then user adds a screenshot to test report

    Then user adds notifications list to test report
