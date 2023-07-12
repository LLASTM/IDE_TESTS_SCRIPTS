#!/bin/bash

# This script was designed to:
#	1 - create some directories used as workspaces for tests
#	2 - launch IDE tests (by default, all available tests are launched)
#
# CubeSTudio is supposed to be already started (if not, run : yarn studio:browser start&)
#
# input parameter to this script : 	$1, the tag to use for tests
#					$2, the number of loops to perform

# The following variables store :
# the tag to be used for tests in tag_to_use
# the number of loops the tests are launched in numberOfLoops

tags_to_use=$1
numberOfLoops=$2

echo launch_test.bash : tags to use=${tags_to_use}
echo launch_test.bash : number of loops to run=${numberOfLoops}


echo ======================================== command : overwritting some files in test-tools/e2e
	cp ../test-tools/e2e/cucumber.js ../../../test-tools/e2e/.
	cp ../test-tools/e2e/features/support/steps.ts ../../../test-tools/e2e/features/support/steps.ts
	cp ../test-tools/e2e/features/models/theia-app.ts ../../../test-tools/e2e/features/models/theia-app.ts
echo ======================================== command : overwritting some files in test-tools/e2e done


echo ======================================== command : creating some directories used for tests as workspaces

	mkdir -p ../initial_workspaces/wsp00/directory1
	touch ../initial_workspaces/wsp00/directory1/file1.txt

	mkdir -p ../initial_workspaces/wsp00/directory2
	touch ../initial_workspaces/wsp00/directory1/file2.txt

	mkdir -p ../initial_workspaces/wsp01

echo  ======================================== command : creation of test directories done

cd ../../../.. # go to build directory

# to avoid to get the error : Address already in use, we must kill the process listening to the port
pid2=`netstat -ano | findstr :3000 | awk '{print $NF}' | awk '{print $1}'`
echo pid2=${pid2}
if [ "${pid2}" != "" ]; then
	taskkill //PID ${pid2} //F
fi

echo ======================================== command : starting cube studio
pid=`ps -a | grep -i node | awk '{print $1;}'`
echo pid=${pid}
echo ============== ps -a command
ps -a
echo ============================
ps -a | grep -i node | awk '{print $1;}'
echo ============================

if [ "${pid}" != "" ]; then
        echo killing pid ${pid}
        kill ${pid}
        echo node process should be killed now
else
        echo no pid to kill node process was found
fi
yarn studio:browser start &
yarn_start_status=$?
if [ ${yarn_start_status} -ne 0 ]; then
        echo command yarn studio:browser start failed, stopping script
        exit 110
fi
sleep 15


echo ======================================== command : starting cube studio done

echo ======================================== command : Starting IDE tests
loopCounter=0
while [ ${loopCounter} -lt ${numberOfLoops} ]; do

	echo Running loop $[$loopCounter + 1]/${numberOfLoops}

	echo Deleting directory traces from test-tools/e2e
	rm -rf repos/test-tools/e2e/traces
	echo Directory from repos/test-tools/e2e/traces deleted
	
	mkdir -p $HOME/tests_artifacts
	# launch all tests coming from cube-ide repo
	yarn e2e:tests:custom "${tags_to_use}" --remote-server localhost:3000

	traces_directory=$HOME/tests_artifacts/traces_`date | sed -e "s/ /_/g" -e "s/:/_/g"`
	cp -rf repos/test-tools/e2e/traces ${traces_directory}
	echo tests artifacts saved to directory ${traces_directory}

	loopCounter=$[ ${loopCounter} + 1]
done
echo ======================================== command : Starting IDE tests done

# tags available to customize IDE tests
#
#	@IDE:git:ui		: all IDE tests using UI
#	@T1IDE			: all T1IDE jira related tests
#	@IDE @IDE:git:ui @T1IDE-207 @T1IDE	../IDE/git/UI/T1IDE-207.feature
#	@IDE:git:ui @T1IDE-215 @T1IDE		../IDE/git/UI/T1IDE-215.feature
#	@IDE @IDE:git:ui @T1IDE-217 @T1IDE	../IDE/git/UI/T1IDE-217.feature
#	@IDE @IDE:git:ui @T1IDE-218 @T1IDE	../IDE/git/UI/T1IDE-218.feature
#	@IDE @IDE:git:ui @T1IDE-222 @T1IDE	../IDE/git/UI/T1IDE-222.feature
#	@IDE @IDE:git:ui @T1IDE-736 @T1IDE	../IDE/git/UI/T1IDE-736.feature

# other tags available for tests non directly linked to IDE
# @IDE:others				: other tests , both using board and no board
# @IDE:others:no_board	: other tests not using board ( build mcus,mpus,boards lists , get cube studio version,...)
# @IDE:others:with_board	: test creating,building,debugging with a board B-U585I-IOT02A

