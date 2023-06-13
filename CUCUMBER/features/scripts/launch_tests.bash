#!/bin/bash

# This script was designed to:
#	1 - create some directories used as workspaces for tests
#	2 - launch IDE tests (by default, all available tests are launched)
#
# CubeSTudio is supposed to be already started (if not, run : yarn studio:browser start&)
#
# input parameter to this script : $1, the number of loops to perform

# The following variable stores the number of loops the tests are launched.
numberOfLoops=$1

echo 1 - launch_tests.bash : creating some directories used for tests

mkdir -p ../initial_workspaces/wsp00/directory1
touch ../initial_workspaces/wsp00/directory1/file1.txt

mkdir -p ../initial_workspaces/wsp00/directory2
touch ../initial_workspaces/wsp00/directory1/file2.txt

mkdir -p ../initial_workspaces/wsp01

echo 1 - launch_tests.bash : creation of test directories done

echo 2 - Starting IDE tests

cd ../../../.. # go to build directory

loopCounter=0
while [ ${loopCounter} -lt ${numberOfLoops} ]; do

	echo Running loop $[$loopCounter + 1]/${numberOfLoops}

	echo Deleting directory traces from test-tools/e2e
	rm -rf repos/test-tools/e2e/traces
	echo Directory from repos/test-tools/e2e/traces deleted
	
	mkdir -p $HOME/tests_artifacts
	# launch all tests coming from cube-ide repo
	yarn e2e:tests:custom @robustness --remote-server localhost:3000

	traces_directory=$HOME/tests_artifacts/traces_`date | sed -e "s/ /_/g" -e "s/:/_/g"`
	cp -rf repos/test-tools/e2e/traces ${traces_directory}
	echo tests artifacts saved to directory ${traces_directory}

	loopCounter=$[ ${loopCounter} + 1]
done

# other tags available to customize IDE tests
#
#	@IDE:git:ui		: all IDE tests using UI
#	@T1IDE			: all T1IDE jira related tests
#	@T1IDE-207		: jira #207 test
#	@T1IDE-215		: jira #215 test
#	@T1IDE-217		: jira #217 test
#	@T1IDE-736		: jira #736 test

# other tags available for tests non directly linked to IDE
# @IDE:others				: other tests , both using board and no board
# @IDE:others:no_board	: other tests not using board ( build mcus,mpus,boards lists , get cube studio version,...)
# @IDE:others:with_board	: test creating,building,debugging with a board B-U585I-IOT02A

