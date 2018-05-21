#Storybook
 是一款开发用于组件开发的工具
 
	组价开发
	
	测试 | 自动化测试
	
	Angular | Vue | React | React-native
	
	
	
* React-native
	
	```
		加入storybook,是一款独立的React-native界面
		storybook 是在当前react环境下一整套UI视图界面
			
		
		项目目录下
			npm -g i @storybook/cli 安装库
			运行命令 getstorybook 来初始化  
				1.自动安装依赖
				2.自动修改package.json
				3.自动在项目目录下创建getstorybook文件夹（整个应用）
		启动
			npm|yan run getstorybook 启动getstorybook
			(监听7007 浏览器访问该端口)
			(监听8081 getstorybook App端口)
		
		启动模拟器(react-native run-android)
		
		操作
			http://localhost:7007/ 浏览器
			android/ios App操作
			控制台答应	
		切换到自己App
			最笨
				1.关闭getstorybook命令
				2.npm start 
				3:再次刷新
	
	=====
		推荐启动方式
		便于切换 开发
		思路:APP UI 相互替换 getstorybook UI达到切换目的
		
		> npm start （监听8081）等待启动完成
		> 另起命令窗口 npm run getstorybook
			监听7007 （监听8081失败 不用管）
			
		> 开启App
		> 切换
			import { AppRegistry } from 'react-native';
			import setup from './src/setup';
			import StorybookUI from "./storybook";
			AppRegistry.registerComponent('com.ryp.rn.core', ()=>StorybookUI);
			AppRegistry.registerComponent('com.ryp.rn.core',()=>APPUI);

			
	=====目录结构解析
		storybook
			stories 
				Component_A
					Component_A.js
				Component_B
					Component_B.js
				Component_C
					Component_C.js
				index.js(组件的测试代码)
			index.js/.ios.js/.android.os
			storybook.js 启动文件
		
	======代码解析
	storybook/storybook.js
		//加载你有所的组件测试代码
		configure(() => {
		  	require('./stories');
		  	....
		}, module);
		
		
		const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });
		
		class StorybookUIHMRRoot extends Component {
		  render() {
		    return <StorybookUIRoot />;
		  }
		}
		
		AppRegistry.registerComponent('CompontDEV', () => StorybookUIHMRRoot);
		export default StorybookUIHMRRoot;
			
	
	
	storybook/stories/index.js 测试代码
		storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
		
		
	=====
	API
		import { storiesOf } from '@storybook/react-native';
		import { action } from '@storybook/addon-actions';
		import { linkTo } from '@storybook/addon-links';
	```	