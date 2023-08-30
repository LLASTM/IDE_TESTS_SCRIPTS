# *****************************************************************************
# Copyright (C) 2023 STMicroelectronics.
#
# All rights reserved. This program and the accompanying materials
# is the property of STMicroelectronics and must not be
# reproduced, disclosed to any third party, or used in any
# unauthorized manner without written consent.
# *****************************************************************************

@IDE @IDE:others @IDE-BuildFewMCU
Feature: Creation and build of all projects for all MCU/Board

Background:
    Given user opens CubeStudio workspace in '../test_workspace'
    Given user clears notifications list
    Given user sets viewport size to 'FullHD'
    Given user clicks Finder icon
    
    Given user synchronizes database
    #When user clicks button 'Synchronize' 
    Given user pauses for 10 seconds

Scenario:

    When user builds list of 'MCU'
    # flags on line below : products, filter, create project, delete project at end of test , check context, build project,  open pinout view, open clock view, number of tests to run
    # -1 means all tests to be run


    When user starts IDE tests for 'MCU' 'STM32U535' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U545' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U575' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U585' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U595' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U5A5' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U599' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U5A9' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U5F7' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U5F9' 'true' 'false' 'true' 'true' 'false' 'false' '2'
    When user starts IDE tests for 'MCU' 'STM32U5G9' 'true' 'false' 'true' 'true' 'false' 'false' '2'
