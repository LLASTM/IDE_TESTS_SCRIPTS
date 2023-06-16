# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-222 @T1IDE @T1IDE-UI @T1IDE-robustness
Feature: As an end-user, I want to create new branches using CLI and GUI, so that I can work on my feature branch.

    After cloning repository :
    - create 1 branch git_branch_00
    - goes back to main branch
    - goes back to list of branches ans selects branch git_branch_00
    - if this last selection fails then an error is generated using an expect command
                      
  Background:
    Given user opens CubeStudio workspace in '../../../initial_workspaces/wsp00'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clicks Source Control icon
    When user runs quick command 'Git: Clone...' to clone directory 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY'
    When user selects repository 'https://github.com/LLASTM/IDE_TESTS_FAKE_REPOSITORY' link
    When user pauses for 8 seconds

    When user creates git branch 'git_branch_00'
    
   
    
