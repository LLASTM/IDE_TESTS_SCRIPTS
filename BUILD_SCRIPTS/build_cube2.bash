#!/bin/bash

echo CUBE STUDIO BUILD SCRIPT

echo ==================== Deleting various directories
rm -rf  ~/AppData/Local/Cube/packs/
rm -rf  ~/AppData/Local/Cube/bundles/*
rm -rf  ~/AppData/Roaming/Cube/logs
rm -rf  ~/AppData/Roaming/Finder
rm -rf  ~/.cache/clangd/index/*
echo ===================================================

export JENKINS_CUBESTUDIO_WORKSPACE=${WORKSPACE}/cubestudio_test_workspace
mkdir -p ${JENKINS_CUBESTUDIO_WORKSPACE}

echo ===================== JENKINS_CUBESTUDIO_WORKSPACE=${JENKINS_CUBESTUDIO_WORKSPACE}

mkdir -p ${WORKSPACE}/LOGFILES
echo directory ${WORKSPACE}/LOGFILES should be created

exec &> >(tee -a ${WORKSPACE}/LOGFILES/build_and_launch_cube2.log)

build_path=${WORKSPACE}/CUBE2_BUILD_DIRECTORY

printenv


echo ==================== displaying some tools versions
echo node path: `which node`
echo node version :`node --version`
echo npm path: `which npm`
echo npm version :`npm --version`
echo yarn path: `which yarn`
echo yarn version:`yarn --version`
echo ===================================================


echo Creating directory ${build_path}
mkdir ${build_path}

echo Changing to directory ${build_path}
cd ${build_path}

cd_status=$?

echo ======================================== repo init command
if [ $cd_status -eq 0 ]; then
	echo no error after cd command
	# Adding file settings.json for cucumber completion pluggin
	mkdir -p ${build_path}/.vscode
	cp ${WORKSPACE}/IDE_TESTS_SCRIPTS/JSON_FILES/CUCUMBER/settings.json ${build_path}/.vscode/.
	repo_init_status=33
	repo_init_counter=0
	echo running repo init command
	while [ ${repo_init_status} != 0 ]; do
		sleep 2
		if [ ${repo_init_counter} -lt 5 ]; then
			repo init -u https://github.com/PRG-Cube/cube-manifest.git -b main
			repo_init_status=$?
			echo repo_init_status=${repo_init_status}
			echo repo_init_counter=${repo_init_counter}
			repo_init_counter=$[ ${repo_init_counter} + 1 ]
		else
			echo repo init command failed, stopping script
			exit 1
		fi
	done
else
	echo error after cd command , stopping script
	exit 100
fi

echo ======================================== repo sync command
if [ ${repo_init_status} -eq 0 ]; then
	repo_sync_status=44
	repo_sync_counter=0
	echo running repo sync command
	while [ ${repo_sync_status} != 0 ]; do
		sleep 1
		if [ ${repo_sync_counter} -lt 2 ]; then
			repo sync
			repo_sync_status=$?
			repo_sync_counter=$[ ${repo_sync_counter} + 1 ]
		else
			echo repo sync command failed, stopping script
			exit 2
		fi
	done
else
	echo repo init command failed, stopping script
	exit 101
fi

echo ======================================== yarn command
if [ ${repo_sync_status} -eq 0 ]; then
	yarn_status=55
	yarn_counter=0
	echo running yarn command
	while [ ${yarn_status} != 0 ]; do
		sleep 1
		if [ ${yarn_counter} -lt 2 ]; then
			yarn
			yarn_status=$?
			yarn_counter=$[ $yarn_counter + 1 ]
		else
			echo yarn command failed, stopping script
			exit 3
		fi
	done
else
	echo command repo sync failed, stopping script
	exit 102
fi

echo ======================================== checkout for repos branch
pushd ${WORKSPACE}/CUBE2_BUILD_DIRECTORY/repos
git checkout ${JOB_BRANCH_TO_BUILD}
git log -n 1
popd

echo ======================================== cloning IDE repo
git_clone_status=`git clone https://github.com/PRG-Cube/cube-ide.git` ;
if [ ${git_clone_status} -eq 0]; then
	echo git clone https://github.com/PRG-Cube/cube-ide.git succeeded
else
	echo git clone https://github.com/PRG-Cube/cube-ide.git failed, stopping script
	exit 1003
fi

echo ======================================== checkout for IDE branch
pushd ${WORKSPACE}/CUBE2_BUILD_DIRECTORY/repos/cube-ide
	git checkout ${JOB_IDE_BRANCH_TO_BUILD}
	git_checkout_status=$?
	if [ ${git_checkout_status} -eq 0 ]; then
		echo git checkout ${JOB_IDE_BRANCH_TO_BUILD} succeeded
		git log -n 1
	else
		echo git checkout command failed, stopping script
		exit 1004
	fi
popd

echo =========================== get bundles
cube bundle --install studio-prototype
cube bundle --update
echo ======================================== yarn studio:browser build command
if [ ${yarn_status} -eq 0 ]; then
	yarn_build_status=55
	yarn_build_counter=0
	#while [ ${yarn_build_status} != 0 ]; do
	while [ ${yarn_build_counter} -lt 2 ]; do
		sleep 1
		if [ ${yarn_build_counter} -lt 2 ]; then
			cd ${WORKSPACE}/CUBE2_BUILD_DIRECTORY
			echo running yarn studio:browser build command , yarn_build_counter=${yarn_build_counter}
			yarn studio:browser build
			yarn_build_status=$?
			yarn_build_counter=$[ ${yarn_build_counter} + 1 ]
		else
			echo yarn studio:browser build command failed, stopping script
			exit 3
		fi
	done
else
	echo command yarn studio:browser build failed, stopping script
	exit 103
fi

if [ ${yarn_build_status} -eq 0 ]; then
	#exec &> >(tee -a ${WORKSPACE}/LOGFILES/launch_cube2.log)
	echo cube2 should be running at localhost:3000
	cd ${WORKSPACE}/CUBE2_BUILD_DIRECTORY
	yarn studio:browser start &
else
	echo command yarn studio:browser build failed, not launching cube2
	exit 104
fi

echo Killing node process to be able to remove build directory that is locked
# example :      2988    2410    2988      19100  pty0     1246523 09:04:23 /c/Users/lavernhe/cube2-env/tools/node-16.18.1/node
sleep 20

pid=`ps -a | grep node | awk '{print $1;}'`
echo pid=${pid}
echo ============== ps -a command
ps -a
echo ============================
ps -a | grep node | awk '{print $1;}'
echo ============================

if [ "${pid}" != "" ]; then
	echo killing pid ${pid}
	kill ${pid}
	echo node process should be killed now
else
	echo no pid to kill node process was found
fi

echo ==================== displaying some tools versions
echo node path: `which node`
echo node version :`node --version`
echo npm path: `which npm`
echo npm version :`npm --version`
echo yarn path: `which yarn`
echo yarn version:`yarn --version`
echo ===================================================

cd ${build_path}

echo Downloading CMSIS packs
echo CMSIS_PACK_ROOT=${CMSIS_PACK_ROOT}

cube bundle --update
cube bundle --install pack-manager
cube bundle --install cube-cmsis-scanner

cube pack-manager sync

cube pack-manager install STMicroelectronics.stm32u5xx_dfp
cube pack-manager install STMicroelectronics.b-u585i-iot02a_hw-board
cube pack-manager install STMicroelectronics.hts221_hw-part
cube pack-manager install STMicroelectronics.ism330dhcx_hw-part
cube pack-manager install STMicroelectronics.m24256-df_hw-part
cube pack-manager install STMicroelectronics.vl53l5cx_hw-part
cube pack-manager install STMicroelectronics.iis2mdc_hw-part
cube pack-manager install STMicroelectronics.lps22hh_hw-part
cube pack-manager install STMicroelectronics.stsafe-a110_hw-part
cube pack-manager install STMicroelectronics.aps6408l-3obmx_hw-part
cube pack-manager install STMicroelectronics.emw3080_hw-part
cube pack-manager install STMicroelectronics.mp23db01hp_hw-part
cube pack-manager install STMicroelectronics.mx25lm51245_hw-part
cube pack-manager install STMicroelectronics.stg3692_hw-part
cube pack-manager install STMicroelectronics.tcpp03-m20_hw-part
cube pack-manager install STMicroelectronics.veml6030_hw-part

cube pack-manager install STMicroelectronics.stm32u5xx_hal_drivers

