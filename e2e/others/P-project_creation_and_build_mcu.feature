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

    #When user starts IDE tests for 'MCU' '<device>' 'true' 'false' 'true' 'true' 'false' 'false' '1'

    When user starts IDE tests for 'MCU' '<filter>' 'true' 'false' 'true' 'true' 'false' 'false' '4'

    #When user starts IDE tests for 'MCU' 'STM32U585' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U595' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U5A5' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U599' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U5A9' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U5F7' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U5F9' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U5G9' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U535' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U545' 'true' 'false' 'true' 'true' 'false' 'false' '-1'
    #When user starts IDE tests for 'MCU' 'STM32U575' 'true' 'false' 'true' 'true' 'false' 'false' '-1'

Scenarios:
|filter|
|STM32U535|
|STM32U545|
|STM32U575|
|STM32U585|
|STM32U595|
|STM32U5A5|
|STM32U599|
|STM32U5A9|
|STM32U5F7|
|STM32U5F9|
|STM32U5G9|

#|device|
#|STM32U535CBT6|
#|STM32U535CBT6Q|
#|STM32U535CBU6|
#|STM32U535CBU6Q|
#|STM32U535CCT6|
#|STM32U535CCT6Q|
#|STM32U535CCU6|
#|STM32U535CCU6Q|
#|STM32U535CET6|
#|STM32U535CET6Q|
#|STM32U535CEU6|
#|STM32U535CEU6Q|
#|STM32U535JEY6QTR|
#|STM32U535NCY6QTR|
#|STM32U535NEY6QTR|
#|STM32U535RBI6|
#|STM32U535RBI6Q|
#|STM32U535RBT6|
#|STM32U535RBT6Q|
#|STM32U535RCI6|
#|STM32U535RCI6Q|
#|STM32U535RCT6|
#|STM32U535RCT6Q|
#|STM32U535REI6|
#|STM32U535REI6Q|
#|STM32U535RET6|
#|STM32U535RET6Q|
#|STM32U535VCI6|
#|STM32U535VCI6Q|
#|STM32U535VCT6|
#|STM32U535VCT6Q|
#|STM32U535VEI6|
#|STM32U535VEI6Q|
#|STM32U535VET6|
#|STM32U535VET6Q|
#|STM32U545CET6|
#|STM32U545CET6Q|
#|STM32U545CEU6|
#|STM32U545CEU6Q|
#|STM32U545JEY6QTR|
#|STM32U545NEY6QTR|
#|STM32U545REI6|
#|STM32U545REI6Q|
#|STM32U545RET6|
#|STM32U545RET6Q|
#|STM32U545VEI6|
#|STM32U545VEI6Q|
#|STM32U545VET6|
#|STM32U545VET6Q|
#|STM32U575AGI6|
#|STM32U575AGI6TR|
#|STM32U575AGI6Q|
#|STM32U575AII6|
#|STM32U575AII6Q|
#|STM32U575CGT6|
#|STM32U575CGT6Q|
#|STM32U575CGU6|
#|STM32U575CGU6TR|
#|STM32U575CGU6Q|
#|STM32U575CIT6|
#|STM32U575CIT6Q|
#|STM32U575CIU6|
#|STM32U575CIU6Q|
#|STM32U575OGY6QTR|
#|STM32U575OGY3QTR|
#|STM32U575OIY6QTR|
#|STM32U575QGI6|
#|STM32U575QGI3|
#|STM32U575QGI3TR|
#|STM32U575QGI6Q|
#|STM32U575QGI3Q|
#|STM32U575QII6|
#|STM32U575QII6Q|
#|STM32U575RGT6|
#|STM32U575RGT6TR|
#|STM32U575RGT6Q|
#|STM32U575RIT6|
#|STM32U575RIT6Q|
#|STM32U575VGT6|
#|STM32U575VGT6TR|
#|STM32U575VGT3|
#|STM32U575VGT3TR|
#|STM32U575VGT6Q|
#|STM32U575VIT6|
#|STM32U575VIT6TR|
#|STM32U575VIT6Q|
#|STM32U575ZGT6|
#|STM32U575ZGT3|
#|STM32U575ZGT6Q|
#|STM32U575ZIT6|
#|STM32U575ZIT6TR|
#|STM32U575ZIT6Q|
#|STM32U585AII6|
#|STM32U585AII6TR|
#|STM32U585AII3|
#|STM32U585AII6Q|
#|STM32U585AII6QTR|
#|STM32U585CIT6|
#|STM32U585CIT3|
#|STM32U585CIT3TR|
#|STM32U585CIT6Q|
#|STM32U585CIU6|
#|STM32U585CIU6Q|
#|STM32U585CIU3Q|
#|STM32U585OIY6QTR|
#|STM32U585QII3|
#|STM32U585QII3TR|
#|STM32U585QII6|
#|STM32U585QII6TR|
#|STM32U585QII6Q|
#|STM32U585QII6QTR|
#|STM32U585RIT6|
#|STM32U585RIT6TR|
#|STM32U585RIT6Q|
#|STM32U585RIT6QTR|
#|STM32U585VIT6|
#|STM32U585VIT6TR|
#|STM32U585VIT6Q|
#|STM32U585VIT3Q|
#|STM32U585VIT6QTR|
#|STM32U585ZIT6|
#|STM32U585ZIT6Q|
#|STM32U585ZIT3Q|
#|STM32U585ZIT3QTR|
#|STM32U595AIH6|
#|STM32U595AIH6Q|
#|STM32U595AJH6|
#|STM32U595AJH6Q|
#|STM32U595QII6|
#|STM32U595QII6Q|
#|STM32U595QJI6|
#|STM32U595QJI6Q|
#|STM32U595QJI6QTR|
#|STM32U595RIT6|
#|STM32U595RIT6Q|
#|STM32U595RJT6|
#|STM32U595RJT6Q|
#|STM32U595VIT6|
#|STM32U595VIT6Q|
#|STM32U595VJT6|
#|STM32U595VJT6Q|
#|STM32U595VJT3Q|
#|STM32U595ZIT6|
#|STM32U595ZIT6Q|
#|STM32U595ZIY6QTR|
#|STM32U595ZJT6|
#|STM32U595ZJT6Q|
#|STM32U595ZJY6QTR|
#|STM32U5A5AJH6|
#|STM32U5A5AJH6Q|
#|STM32U5A5QJI6|
#|STM32U5A5QJI6Q|
#|STM32U5A5RJT6|
#|STM32U5A5RJT6Q|
#|STM32U5A5VJT6|
#|STM32U5A5VJT6Q|
#|STM32U5A5ZJT6|
#|STM32U5A5ZJT6Q|
#|STM32U5A5ZJY6QTR|
#|STM32U599BJY6QTR|
#|STM32U599NIH6Q|
#|STM32U599NJH6Q|
#|STM32U599VIT6Q|
#|STM32U599VJT6|
#|STM32U599VJT6Q|
#|STM32U599ZIT6Q|
#|STM32U599ZIY6QTR|
#|STM32U599ZJT6Q|
#|STM32U599ZJY6QTR|
#|STM32U5A9BJY6QTR|
#|STM32U5A9NJH6Q|
#|STM32U5A9VJT6Q|
#|STM32U5A9ZJT6Q|
#|STM32U5A9ZJY6QTR|
#|STM32U535RET6TR|
#|STM32U535RET6QTR|
#|STM32U575OIY3QTR|
#|STM32U575QGI6TR|
#|STM32U575QII3|
#|STM32U575QII3TR|
#|STM32U575QII6TR|
#|STM32U575ZGT3Q|
#|STM32U575ZGT3QTR|
#|STM32U585CIU6TR|
#|STM32U585QII3Q|
#|STM32U585QII3QTR|
#|STM32U585RIT3|
#|STM32U585RIT3TR|
#|STM32U585VIT3|
#|STM32U595VIT6QTR|
#|STM32U5F7VIT6|
#|STM32U5F7VIT6Q|
#|STM32U5F7VJT6|
#|STM32U5F7VJT6Q|
#|STM32U5F9BJY6QTR|
#|STM32U5F9NJH6Q|
#|STM32U5F9VIT6Q|
#|STM32U5F9VJT6Q|
#|STM32U5F9ZIJ6QTR|
#|STM32U5F9ZIT6Q|
#|STM32U5F9ZJJ6QTR|
#|STM32U5F9ZJT6Q|
#|STM32U5G7VJT6|
#|STM32U5G7VJT6Q|
#|STM32U5G9BJY6QTR|
#|STM32U5G9NJH6Q|
#|STM32U5G9VJT6Q|
#|STM32U5G9ZJJ6QTR|
#|STM32U5G9ZJT6Q|
#
