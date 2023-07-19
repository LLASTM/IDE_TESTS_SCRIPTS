# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************
@IDE @IDE:git:ui @T1IDE-736 @T1IDE @T1IDE-UI @T1IDE-robustness
Feature:  As a squad leader, I want to get a running integration test on community GIT repo
          initialization feature so that I can support squad quality commitment

  Background:
    Given user opens CubeStudio workspace in '../../../test_workspace'
    Given user sets viewport size to 'FullHD'

  Scenario:
    When user clicks Source Control icon
    
    #When user clicks object containing text '+'
    When user performs git init command
    
    #When user clicks object containing text '...'
    #When user pauses for 2 seconds
    #When user selects menu 'Changes/Stage All Changes'
    #When user pauses for 2 seconds
    When user adds all files to staging area

    Then testuser checks that '2' files are in the staging area

    When user adds a screenshot to test report

   
