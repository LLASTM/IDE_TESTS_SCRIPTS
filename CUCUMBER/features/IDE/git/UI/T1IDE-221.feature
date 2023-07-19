# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-221 @T1IDE @T1IDE-UI @T1IDE-robustness
Feature: As an end-user, I want to create new branches using CLI and GUI, so that I can work on my feature branch.

    After cloning repository :
    - create 1 branch git_branch_00
    - goes back to main branch
    - goes back to list of branches ans selects branch git_branch_00
    - if this last selection fails then an error is generated using an expect command
                      
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

    When user creates a set of '5' new files
    Then user clicks Source Control icon
    When user adds all files to staging area
    Then user checks that '5' files are in the staging area
    When user pauses for 6 seconds
    When user adds a screenshot to test report
    Then user clicks on commit signed off button
    Then user enters commit message 'commit 5 files'
    Then user adds a screenshot to test report

    Then user selects menu 'View/History'
    When user pauses for 6 seconds
    Then user adds a screenshot to test report
    Then user searches for commit 'commit 5 files' in git history
    Then user adds notifications list to test report
    
