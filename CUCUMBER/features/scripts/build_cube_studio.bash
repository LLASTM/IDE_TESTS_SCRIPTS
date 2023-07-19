#!/bin/bash

echo CUBE STUDIO BUILD SCRIPT

# The manifest branch to use
#BRANCH_TO_BUILD=m/main
BRANCH_TO_BUILD=prg-cube/main

# the cube-ide branch to use for build
IDE_BRANCH_TO_BUILD=main

# setting location for build directory
WORKSPACE=~/tmp/cube_studio
BUILD_PATH=${WORKSPACE}/CUBE_STUDIO_BUILD_DIRECTORY
TRACES_DIRECTORY=${WORKSPACE}/LOGFILES

rm -rf /tmp/cube_studio*

if [ -d ${WORKSPACE} ]; then
	old_directory=${WORKSPACE}_`date`
	old_directory=`echo ${old_directory} | sed -e "s/ /_/g" | sed -e "s/:/_/g"`
	echo found existing directory ${WORKSPACE} , moving it to ${old_directory}
	/bin/mv ${WORKSPACE} ${old_directory}
	move_status=$?
	if [ ${move_status} -ne 0 ]; then
        echo error when performing move command, searching for an existing running node process
	pid=`ps -a | grep node | awk '{print $1;}'`
	if [ "${pid}" != "" ]; then
		echo killing pid ${pid}
		kill ${pid}
		echo node process should be killed now, trying move command again
		/bin/mv ${WORKSPACE} ${old_directory}
		move_status=$?
		if [ ${move_status} -ne 0 ]; then
			echo move command failed again, stopping script on error
			exit 97
		else
			echo second move command succeeded, continuing script execution
		fi
	else
		echo no pid to kill node process was found, stopping script on error
        	exit 98
	fi
fi

fi

mkdir -p ${WORKSPACE}
echo created directory ${WORKSPACE}

mkdir -p ${TRACES_DIRECTORY}
echo directory ${TRACES_DIRECTORY} should be created
exec &> >(tee -a ${TRACES_DIRECTORY}/build_cube_studio.log)

echo WORKSPACE=${WORKSPACE}
echo BUILD_PATH=${BUILD_PATH}
echo TRACES_DIRECTORY=${TRACES_DIRECTORY}
echo BRANCH_TO_BUILD=${BRANCH_TO_BUILD}
echo IDE_BRANCH_TO_BUILD=${IDE_BRANCH_TO_BUILD}
echo CMSIS_PACK_ROOT=${CMSIS_PACK_ROOT}

echo Creating directory ${BUILD_PATH}
mkdir ${BUILD_PATH}

echo ==================== Deleting various directories
rm -rf  ~/AppData/Local/Cube/packs/
rm -rf  ~/AppData/Local/Cube/bundles/*
rm -rf  ~/AppData/Roaming/Cube/logs
rm -rf  ~/AppData/Roaming/Finder
rm -rf  ~/.cache/clangd/index/*
echo ===================================================

printenv

echo ==================== displaying some tools versions
echo node path: `which node`
echo node version :`node --version`
echo npm path: `which npm`
echo npm version :`npm --version`
echo yarn path: `which yarn`
echo yarn version:`yarn --version`
echo 

echo ======================================== command : copy file settings.json to build directory
mkdir -p ${BUILD_PATH}/.vscode
cp ../cucumber/settings/settings.json ${BUILD_PATH}/.vscode/.
copy_status=$?
if [ ${copy_status} -ne 0 ]; then
        echo error when performing copy of file settings.json, stopping script
        exit 99
fi

echo ======================================== command : cd ${BUILD_PATH}
cd ${BUILD_PATH}
cd_status=$?

if [ ${cd_status} -ne 0 ]; then
	echo error after cd command , stopping script
	exit 100
fi

echo ======================================== command : repo init
repo_init_status=666
repo_init_counter=0
while [ ${repo_init_status} != 0 ]; do
	sleep 2
	if [ ${repo_init_counter} -lt 10 ]; then
		repo init -u https://github.com/PRG-Cube/cube-manifest.git -b main
		repo_init_status=$?
		echo repo_init_status=${repo_init_status}
		echo repo_init_counter=${repo_init_counter}
		repo_init_counter=$[ ${repo_init_counter} + 1 ]
	else
		echo repo init command failed, stopping script
		exit 103
	fi
done

echo  ======================================== command : repo sync
repo_sync_status=666
repo_sync_counter=0
while [ ${repo_sync_status} != 0 ]; do
	sleep 1
	if [ ${repo_sync_counter} -lt 2 ]; then
		repo sync
		repo_sync_status=$?
		repo_sync_counter=$[ ${repo_sync_counter} + 1 ]
	else
		echo repo sync command failed, stopping script
		exit 104
	fi
done

echo ======================================== command : checkout for repos branch
pushd ${BUILD_PATH}/repos
git checkout ${BRANCH_TO_BUILD}
checkout_status=$?
if [ ${checkout_status} -ne 0 ]; then
        echo error when performing git checkout command, stopping script
        exit 105
fi
git log -n 1
popd

echo ======================================== command : cloning IDE repo
pushd ${BUILD_PATH}/repos
git clone https://github.com/PRG-Cube/cube-ide.git
git_clone_status=$?
if [ ${git_clone_status} -ne 0 ]; then
	echo git clone https://github.com/PRG-Cube/cube-ide.git failed, stopping script
	exit 106
fi
popd

echo ======================================== command : checkout IDE branch
pushd ${BUILD_PATH}/repos/cube-ide
git checkout ${IDE_BRANCH_TO_BUILD}
git_checkout_status=$?
if [ ${git_checkout_status} -ne 0 ]; then
	echo git checkout command failed, stopping script
	exit 107
fi
popd

echo ======================================== command : yarn 
yarn_status=666
yarn_counter=0
while [ ${yarn_status} != 0 ]; do
	sleep 1
	if [ ${yarn_counter} -lt 2 ]; then
		yarn
		yarn_status=$?
		yarn_counter=$[ $yarn_counter + 1 ]
	else
		echo yarn command failed, stopping script
		exit 108
	fi
done

echo ======================================== command : yarn studio:browser build
yarn_build_status=666
yarn_build_counter=0
while [ ${yarn_build_counter} -lt 2 ]; do
	sleep 1
	if [ ${yarn_build_counter} -lt 2 ]; then
		cd ${BUILD_PATH}
		echo running yarn studio:browser build command , yarn_build_counter=${yarn_build_counter}
		yarn studio:browser build
		yarn_build_status=$?
		yarn_build_counter=$[ ${yarn_build_counter} + 1 ]
	else
		echo yarn studio:browser build command failed, stopping script
		exit 109
	fi
done

# The following steps are performed in order to get the startup traces

echo ======================================== command : yarn studio:browser start
cd ${BUILD_PATH}
yarn studio:browser start &
yarn_start_status=$?
sleep 20
if [ ${yarn_start_status} -ne 0 ]; then
	echo command yarn studio:browser start failed, stopping script
	exit 110
fi
echo cube2 should be running at localhost:3000

echo  ======================================== command : Killing node process to be able to remove build directory that is locked
# example :      2988    2410    2988      19100  pty0     1246523 09:04:23 /c/Users/lavernhe/cube2-env/tools/node-16.18.1/node

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
echo ============================

# to avoid to get the error : Address already in use, we must kill the process listening to the port
pidList=`netstat -ano | findstr :3000 | awk '{print $NF}'`
for pid in `echo ${pidList}`;do
        if [ "${pid}" != "0" ]; then
                echo taskkill //PID ${pid} //F
                taskkill //PID ${pid} //F
        fi
done

cd ${BUILD_PATH}

echo ======================================== command : cube bundle
cube bundle --update
cube bundle --install pack-manager
cube bundle --install cube-cmsis-scanner

echo ======================================== command : cube pack-manager sync
cube pack-manager sync

echo ======================================== command : cube pack-manager install
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

echo  ======================================== command : end of script
cd
