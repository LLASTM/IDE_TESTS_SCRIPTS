#!/bin/bash

mkdir -p ${WORKSPACE}/LOGFILES
echo directory ${WORKSPACE}/LOGFILES should be created

exec &> >(tee -a ${WORKSPACE}/LOGFILES/build_and_launch_cube2.log)

export PATH=/c/Users/lavernhe/cube2-env/tools/git-repo-main:${PATH}
build_path=${WORKSPACE}/CUBE2_BUILD_DIRECTORY

printenv

export PATH=~/cube2-env/tools/node-12.22.7/node_modules/yarn/bin:${PATH}

#if [ -d ${build_path} ]; then
#	echo Directory ${build_path} was found, deleting it
#	/bin/rm -rf ${build_path}
#	echo Directory ${build_path} was deleted
#else
#	echo No directory ${build_path} was found
#fi

echo Creating directory ${build_path}
mkdir ${build_path}

echo Changing to directory ${build_path}
cd ${build_path}

cd_status=$?

# ======================================== repo init command
if [ $cd_status -eq 0 ]; then
	echo no error after cd command
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

# ======================================== repo sync command
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

# ======================================== yarn command
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

# ======================================== checkout for IDE branch
pushd ${WORKSPACE}/CUBE2_BUILD_DIRECTORY/repos/ide
	git checkout ${JOB_IDE_BRANCH_TO_BUILD}
	git_checkout_status=$?
	if [ ${git_checkout_status} -eq 0 ]; then
		echo git checkout ${JOB_IDE_BRANCH_TO_BUILD} succeeded
		git log -n 1
	else
		echo git checkout command failed, stopping script
		exit 4
	fi
popd

# ======================================== yarn studio:browser build command
if [ ${yarn_status} -eq 0 ]; then
	yarn_build_status=55
	yarn_build_counter=0
	echo running yarn studio:browser build command
	while [ ${yarn_build_status} != 0 ]; do
		sleep 1
		if [ ${yarn_build_counter} -lt 2 ]; then
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
	yarn studio:browser start &
	cd ..
else
	echo command yarn studio:browser build failed, not launching cube2
	exit 104
fi

echo Killing node process to be able to remove build directory that is locked
# example :      2988    2410    2988      19100  pty0     1246523 09:04:23 /c/Users/lavernhe/cube2-env/tools/node-16.18.1/node
sleep 10

pid=`ps -a | grep cube2-env | awk '{print $1;}'`
if [ "$pid" -ne "" ]; then
	echo killing pid $pid
	kill $pid
else
	echo no pid to kill node process was found
fi
echo node process should be killed now


