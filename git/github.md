#git

* 安装
* 配置
	
	```
	git config --list 查看当前路径下的github配置
	
	--global 设置全局配置
		git config --global user.name HLoveMe
		git config --global user.emial 2436422656@qq.com
		
	--local当前路径配置
		git config --local user.name HLoveMe		
		
	alias 别名
		git config --global alias.ps push
		=> git ps === git push 
	```
* 创建仓库
	* 本地仓库
	
		```
			git init 
			
			git add . | git add xx.txt
			git commit -m "dec" 提交到本地仓库
		```
	* github仓库
		
		```
		创建github 仓库 在拉取到本地
			1：github已有仓库
			2：git clone url
			
		本地创建 然后在github创建对应的仓库
			1:github 创建“空”仓库
			2:本地仓库
				git remote add origin url（参考提示）
					> 远程的分支为origin
					> 本地主分支为master
				第一次提交
					git push -u origin master
				以后
					git push origin master
				
		```
* git概念
	
	* 暂缓区
		
		```
			git add a.txt
			git add . 
			添加到缓存区 并没提交
		```
		 
	* 工作区
		
		```
		当前在修改代码  但是没有提交到缓存区
		```
	* 提交
		* 先提交到缓存区 add
		* 在提交到本地库 commit（只是把当前缓存区的提交）
		* push 远程仓库 （可选）
		
	* Header
		* 指向当前分支的不同commit
		 
	* 撤销文件修改
		* 还没有提交到缓存区
			* git checkout -- readme.txt 	回到之前的一个版本
		* 已经add到缓冲区 又被修改
		  * 	git checkout -- readme.txt 回到add缓冲区的状态
		
	* 版本回退
		* git reset --hard HEAD^回到上一个版本
		* git reset --hard commitID
			* commitID 只要写前一部分就好
		* git reflog / log查看id
	
* 分支

	![A](0.png)

	```
		1:master 分支是稳定主分支 
			(拉取github仓库 本地的为master github的为origin)
			(本地仓库 就是master)
		2:dev 是项目开发分支 各个成员使用的就是dev
		3:bob 是ZZH电脑分支 修改之后之后合并到dev
		4:一个版本开发 并各个成员合并代码到dev; 
		 然后 master 代码打包发布发布APP
	```
	
	```
	master 默认为主分支
	git branch 查看当前所有分支
	
	git checkout -b bName 创建新的分支 并切换到分支
		git branch bName 创建分支
		git checkout bName 切换分支
		
	git merge bName 合并指定分支到当前分支
		》快速合并 合并的两个分支没有对同一文件进行修改
		》对同一文件进行修改 合并就会有冲突
			状态
				>Auto-merging A.js
				>CONFLICT (content): Merge conflict in A.js
				>Automatic merge failed; fix conflicts and then commit the result.
			解决
				》打开冲突文件手动解决
				》add | commit |push
			
	git branch -d <name> 删除分支
	git branch -D <name> 强制删除分支
	
	Bug临时分支
		1：你在做更新App新的功能
		2：突然原有版本出现一个问题 需要解决 
		3：但是你现在的代码还没有进行完成也无法进行提交
		
		》git stash 保留当前在开发的代码 现场
		》切换到需要解决问题的分支 (比如是master)
		》创建新的解决问题的分支 
		》回到(master) 合并代码 并删除分支 
		》回到stash现场
			》 git stash list 所有
				stash@{0}: WIP on dev: 79611ff ABCD
				...
			》 第一种
				git stash apply  恢复
				git stash drop  删除现场
			》 第二
				git stash pop 返回最后一个
			》 恢复指定
				git stash apply stash@{0}
				git stash drop stash@{0}
				
	
	
	```

* tag 
	
	```
	```
* 设置忽略文件

	```
		项目下 .gitignore 
		只能忽略还没有提交的文件 如果该文件已经被提交 那么配置是没有作用的
		
		https://github.com/github/gitignore 
		
		如果你添加a.class 但是他被忽略
		git add -f App.class 强制加入
		
		git check-ignore -v App.class 检查忽略条件
	```	

* 常见命令

	```
	git clone url 克隆git 项目 默认为master
		git clone -b branchNmae url 克隆分支
		
	git branch 查看当前分支
	
	git log 查看所有记录
		--pretty=oneline 简化输出
	git reflog 查看回退记录
	
	
	git tag 标签
	
	git rm a.txt 删除git版本库里面的文件 在commit
	
	git status 查看当前没commit的文件的状态
	
	git checkout 
		git checkout bName 切换分支
		git checkout -- a.txt （撤销|更新）工作区的某个文件修改 到 （缓存区 或者 上一个版本）或 
	
	提交代码
		git add .    | 代码修改 提交暂缓区
		git commit -m "desc" | 提交本地仓库
		git push origin master (origin 表示远程仓库分支   master你本地提交的分支) |提交代码
		
	stash 现场
		git stash 创建现场 可以创建多个现场
		git stash list 查看所有现场
		恢复
			1:git stash pop  恢复并删除 最后一个现场
			2 git stash apply恢复  git stash drop来删除
			
			
	```
	
