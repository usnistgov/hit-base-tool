"use strict";angular.module("commonServices",[]),angular.module("common",["ngResource","my.resource","default","xml","hl7v2-edi","hl7v2","edi"]),angular.module("cf",["common"]),angular.module("doc",["common"]),angular.module("cb",["common"]),angular.module("hit-tool-directives",[]),angular.module("hit-tool-services",["common"]);var app=angular.module("hit-tool",["ngRoute","ui.bootstrap","ngCookies","LocalStorageModule","ngResource","ngSanitize","ngAnimate","ui.bootstrap","angularBootstrapNavTree","QuickList","format","default","hl7v2-edi","xml","hl7v2","edi","cf","cb","ngTreetable","blueimp.fileupload","hit-tool-directives","hit-tool-services","commonServices","smart-table","hit-profile-viewer","hit-validation-result","hit-vocab-search","hit-report-viewer","hit-testcase-viewer","hit-testcase-tree","hit-doc","doc"]);app.config(["$routeProvider","$httpProvider","localStorageServiceProvider",function(a,b,c){c.setPrefix("hit-tool").setStorageType("sessionStorage"),a.when("/",{templateUrl:"views/home.html"}).when("/home",{templateUrl:"views/home.html"}).when("/testing",{templateUrl:"../views/templates.html"}).when("/doc",{templateUrl:"views/doc.html"}).when("/setting",{templateUrl:"views/setting.html"}).when("/about",{templateUrl:"views/about.html"}).when("/contact",{templateUrl:"views/contact.html"}).when("/cf",{templateUrl:"views/cf/testing.html"}).when("/cb",{templateUrl:"views/cb/testing.html"}).otherwise({redirectTo:"/"})}]),app.run(["$rootScope","$location","$modal","TestingSettings","AppInfo","StorageService","$route","$window",function(a,b,c,d,e,f,g,h){a.appInfo={},a.stackPosition=0,a.scrollbarWidth=null,(new e).then(function(b){a.appInfo=b}),a.$watch(function(){return b.path()},function(b,c){if(a.activePath===b){var d,e=h.history.state;d=!!(e&&e.position<=a.stackPosition),d?a.stackPosition--:a.stackPosition++}else g.current&&(h.history.replaceState({position:a.stackPosition},""),a.stackPosition++)}),a.isActive=function(b){return b===a.activePath},a.setActive=function(c){""===c||"/"===c?b.path("/home"):a.activePath=c},a.isSubActive=function(b){return b===a.subActivePath},a.setSubActive=function(b){a.subActivePath=b,f.set(f.ACTIVE_SUB_TAB_KEY,b)},a.showError=function(b){var d=c.open({templateUrl:"ErrorDlgDetails.html",controller:"ErrorDetailsCtrl",resolve:{error:function(){return b}}});d.result.then(function(b){a.error=b},function(){})},a.cutString=function(a){return a.length>20&&(a=a.substring(0,20)+"..."),a},a.tabs=new Array,a.selectTestingType=function(b){a.tabs[0]=!1,a.tabs[1]=!1,a.tabs[2]=!1,a.tabs[3]=!1,a.tabs[4]=!1,a.tabs[5]=!1,a.activeTab=b,a.tabs[a.activeTab]=!0,d.setActiveTab(a.activeTab)},a.downloadArtifact=function(a){var b=document.createElement("form");b.action="api/testartifact/download",b.method="POST",b.target="_target";var c=document.createElement("input");c.name="path",c.value=a,b.appendChild(c),b.style.display="none",document.body.appendChild(b),b.submit()},a.toHTML=function(a){return $sce.trustAsHtml(a)},a.compile=function(a){return $compile(a)},a.$on("$locationChangeSuccess",function(){a.setActive(b.path())}),a.getScrollbarWidth=function(){if(null==a.scrollbarWidth){var b=document.createElement("div");b.style.visibility="hidden",b.style.width="100px",b.style.msOverflowStyle="scrollbar",document.body.appendChild(b);var c=b.offsetWidth;b.style.overflow="scroll";var d=document.createElement("div");d.style.width="100%",b.appendChild(d);var e=d.offsetWidth;b.parentNode.removeChild(b),a.scrollbarWidth=c-e}return a.scrollbarWidth},a.openValidationResultInfo=function(){c.open({templateUrl:"ValidationResultInfoCtrl.html",windowClass:"profile-modal",controller:"ValidationResultInfoCtrl"})}}]),angular.module("ui.bootstrap.carousel",["ui.bootstrap.transition"]).controller("CarouselController",["$scope","$timeout","$transition","$q",function(a,b,c,d){}]).directive("carousel",[function(){return{}}]),angular.module("hit-tool-services").factory("TabSettings",["$rootScope",function(a){return{"new":function(a){return{key:a,activeTab:0,getActiveTab:function(){return this.activeTab},setActiveTab:function(a){this.activeTab=a,this.save()},save:function(){sessionStorage.setItem(this.key,this.activeTab)},restore:function(){this.activeTab=null!=sessionStorage.getItem(this.key)&&""!=sessionStorage.getItem(this.key)?parseInt(sessionStorage.getItem(this.key)):0}}}}}]),app.controller("ErrorDetailsCtrl",["$scope","$modalInstance","error",function(a,b,c){a.error=c,a.ok=function(){b.close(a.error)},a.cancel=function(){b.dismiss("cancel")}}]),app.directive("stRatio",function(){return{link:function(a,b,c){var d=+c.stRatio;b.css("width",d+"%")}}}),angular.module("hit-tool-services").factory("AppInfo",["$http","$q",function(a,b){return function(){var c=b.defer();return a.get("api/appInfo").then(function(a){c.resolve(angular.fromJson(a.data))},function(a){c.reject(a.data)}),c.promise}}]),app.controller("TableFoundCtrl",["$scope","$modalInstance","table",function(a,b,c){a.table=c,a.tmpTableElements=[].concat(null!=c?c.valueSetElements:[]),a.cancel=function(){b.dismiss("cancel")}}]),app.controller("ValidationResultInfoCtrl",["$scope","$modalInstance",function(a,b){a.close=function(){b.dismiss("cancel")}}]),angular.module("my.resource",["ngResource"]).factory("Resource",["$resource",function(a){return function(b,c,d){var e={update:{method:"put",isArray:!1},create:{method:"post"}};d=angular.extend(e,d);var f=a(b,c,d);return f.prototype.$save=function(a,b){return this.id?this.$update(a,b):this.$create(a,b)},f}}]),angular.module("hit-tool-services").factory("TestingSettings",["$rootScope",function(a){var b={activeTab:0,getActiveTab:function(){return b.activeTab},setActiveTab:function(a){b.activeTab=a,b.save()},save:function(){sessionStorage.TestingActiveTab=b.activeTab},restore:function(){b.activeTab=null!=sessionStorage.TestingActiveTab&&""!=sessionStorage.TestingActiveTab?parseInt(sessionStorage.TestingActiveTab):0}};return b}]),angular.module("commonServices").factory("TestContext",["$http","$q",function(a,b){var c=function(){this.id=null};return c.prototype.init=function(a){this.id=a.id},c.prototype.clear=function(){this.id=null},c}]),angular.module("commonServices").factory("Editor",["$http","$q",function(a,b){var c=function(){this.instance=null,this.updateIndicator="0",this.id=null,this.name=""};return c.prototype.notifyChange=function(){this.updateIndicator=(new Date).getTime()},c.prototype.init=function(a){void 0!=a&&(this.instance=a)},c.prototype.getContent=function(){return void 0!=this.instance?this.instance.doc.getValue():null},c.prototype.setContent=function(a){void 0!=this.instance&&(this.instance.doc.setValue(a),this.notifyChange())},c}]),angular.module("commonServices").factory("XmlEditor",["Editor",function(a){var b=function(){a.apply(this,arguments)};return b.prototype=Object.create(a.prototype),b.prototype.constructor=b,b.prototype.format=function(){this.instance.doc.setValue(this.instance.doc.getValue().replace(/\n/g,"").replace(/[\t ]+\</g,"<").replace(/\>[\t ]+\</g,"><").replace(/\>[\t ]+$/g,">"));var a=this.instance.lineCount(),b=this.instance.getTextArea().value.length;this.instance.autoFormatRange({line:0,ch:0},{line:a,ch:b})},b}]),angular.module("commonServices").factory("EDICursor",function(){var a=function(){this.line=1,this.startIndex=-1,this.endIndex=-1,this.index=-1,this.segment="",this.updateIndicator="0",this.triggerTree=void 0};return a.prototype.init=function(a,b,c,d,e){this.line=a,this.startIndex=b,this.endIndex=c,this.index=d,this.triggerTree=e,this.notify()},a.prototype.notify=function(){this.updateIndicator=(new Date).getTime()},a}),angular.module("commonServices").factory("XmlCursor",function(){var a=function(){this.line=-1,this.start={line:1,index:-1},this.end={line:1,index:-1},this.updateIndicator="0"};return a.prototype.setLine=function(a){this.line=a,this.notify()},a.prototype.toString=function(a){return this.line+","+this.start+","+this.end},a.prototype.notify=function(){this.updateIndicator=(new Date).getTime()},a}),angular.module("commonServices").factory("ValidationResultItem",function(){var a=function(){this.data=[],this.categories=[],this.categories.push({title:"All",data:[]}),this.show=!0,this.updateIndicator="0"};return a.prototype.init=function(a){this.data=a,this.categories=[],this.categories.push({title:"All",data:[]}),this.show=!0,this.notify()},a.prototype.notify=function(){this.updateIndicator=(new Date).getTime()},a}),angular.module("commonServices").factory("ValidationSettings",function(){var a=function(){this.errors=!0,this.affirmatives=!0,this.ignores=!0,this.alerts=!0,this.warnings=!0};return a}),angular.module("commonServices").factory("ValidationResult",["ValidationResultItem","$q",function(a,b){var c=function(b){this.key=b,this.xml="",this.errors=new a,this.affirmatives=new a,this.ignores=new a,this.alerts=new a,this.warnings=new a,this.informationals=new a,this.id=""};return c.prototype.updateId=function(){this.id=(new Date).getTime()},c.prototype.clear=function(){this.xml="",this.errors=new a,this.affirmatives=new a,this.ignores=new a,this.alerts=new a,this.warnings=new a,this.informationals=new a,this.updateId()},c.prototype.init=function(a){this.xml=a.xml,this.errors.init(a.errors),this.affirmatives.init(a.affirmatives),this.ignores.init(a.ignores),this.alerts.init(a.alerts),this.warnings.init(a.warnings),this.informationals.init(a.informationals),this.updateId()},c.prototype.saveState=function(){sessionStorage.setItem(this.key,this.content)},c.prototype.restoreState=function(){this.content=sessionStorage.getItem(this.key)},c.prototype.hasState=function(){return sessionStorage.getItem(this.key)!=={xml:""}&&null!=sessionStorage.getItem(this.key)},c.prototype.getState=function(){return sessionStorage.getItem(this.key)},c.prototype.getContent=function(){return this.content},c.prototype.setContent=function(a){this.content=a},c}]),angular.module("commonServices").factory("DQAValidationResult",function(){var a=function(a){this.errors=[],this.warnings=[];for(var b=0;b<a.issuesList.length;b++){var c=a.issuesList[b];"Error"===c.type?this.errors.push(c):this.warnings.push(c)}};return a}),angular.module("commonServices").factory("Profile",["$http","$q",function(a,b){var c=function(){this.id=null,this.xml="",this.json="",this.name=[],this.description=""};return c.prototype.notifyChange=function(){this.updateIndicator=(new Date).getTime()},c.prototype.init=function(a){this.id=a.id,this.xml=a.xml,this.json=null,this.name=a.name,this.description=a.description},c.prototype.clear=function(){this.id=null,this.xml=null,this.json=null,this.name=null,this.description=null},c}]),angular.module("commonServices").factory("Message",["$http","$q",function(a,b){var c=function(){this.id=null,this.name="",this.content="",this.description="",this.updateIndicator="0"};return c.prototype.notifyChange=function(){this.updateIndicator=(new Date).getTime()},c.prototype.setContent=function(a){this.content=void 0!=a?a:"",this.notifyChange()},c.prototype.init=function(a){this.id=a.id,this.name=a.name,this.description=a.description,this.setContent(a.content)},c.prototype.download=function(){var a=document.createElement("form");a.action="api/message/download",a.method="POST",a.target="_target";var b=document.createElement("textarea");b.name="content",b.value=this.content,a.appendChild(b),a.style.display="none",document.body.appendChild(a),a.submit()},c}]),angular.module("commonServices").factory("Tree",function(){var a=function(){this.id=null,this.root={}};return a}),angular.module("commonServices").factory("Report",["$http","$q",function(a,b){var c=function(){this.html=null};return c.prototype.generate=function(c,d){var e=b.defer();return a({url:c,data:$.param({xmlReport:d}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},method:"POST",timeout:6e4}).success(function(a){e.resolve(angular.fromJson(a))}).error(function(a){e.reject(a)}),e.promise},c.prototype.download=function(a,b){var c=document.createElement("form");c.action=a,c.method="POST",c.target="_target";var d=document.createElement("textarea");d.name="xmlReport",d.value=b,c.appendChild(d),c.style.display="none",document.body.appendChild(c),c.submit()},c}]),angular.module("commonServices").factory("DataInstanceReport",["$http","NewValidationReport",function(a,b){var c=function(){b.call(this,arguments)};return c.prototype=Object.create(b.prototype),c.prototype.constructor=c,c.prototype.generateByFormat=function(a,b){return this.generate("api/report/generateAs/"+b,a)},c.prototype.downloadByFormat=function(a,b){return this.generate("api/report/downloadAs/"+b,a)},c}]),angular.module("commonServices").factory("NewValidationReport",["$http","$q",function(a,b){var c=function(){this.content={metaData:{},result:{}}};return c.prototype.download=function(a){var b=document.createElement("form");b.action=a,b.method="POST",b.target="_target";var c=document.createElement("textarea");c.name="jsonReport",c.value=this.content,b.appendChild(c),b.style.display="none",document.body.appendChild(b),b.submit()},c.prototype.generate=function(c){var d=b.defer();return a({url:c,data:$.param({jsonReport:this.content}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},method:"POST",timeout:6e4}).success(function(a){d.resolve(angular.fromJson(a))}).error(function(a){d.reject(a)}),d.promise},c}]),angular.module("commonServices").factory("Logger",function(){var a=function(){this.content=""};return a.prototype.log=function(a){this.content=this.content+"\n"+this.getCurrentTime()+":"+a},a.prototype.clear=function(){this.content=""},a.prototype.init=function(){this.clear()},a.prototype.getCurrentTime=function(){var a=new Date;return(a.getMonth()+1<10?"0":"")+(a.getMonth()+1)+"/"+(a.getDate()<10?"0":"")+a.getDate()+"/"+a.getFullYear()+" - "+(a.getHours()<10?"0":"")+a.getHours()+":"+(a.getMinutes()<10?"0":"")+a.getMinutes()+":"+(a.getSeconds()<10?"0":"")+a.getSeconds()},a}),angular.module("commonServices").factory("Endpoint",function(){var a=function(){this.value=null},a=function(a){this.value=a};return a}),angular.module("commonServices").factory("SecurityFaultCredentials",["$q","$http",function(a,b){var c=function(){this.username=null,this.password=null};return c.prototype.init=function(a,b){this.username=a,this.password=b},c}]),angular.module("commonServices").factory("Clock",["$interval",function(a){var b=function(a){this.value=void 0,this.intervl=a};return b.prototype.start=function(b){angular.isDefined(this.value)&&this.stop(),this.value=a(b,this.intervl)},b.prototype.stop=function(){angular.isDefined(this.value)&&(a.cancel(this.value),this.value=void 0)},b}]),angular.module("commonServices").factory("TestCaseService",["$filter",function(a){var b=function(){};return b.prototype.findOneById=function(a,b){if(b){if(a===b.id)return b;if(b.children&&null!=b.children&&b.children.length>0)for(var c=0;c<b.children.length;c++){var d=this.findOneById(a,b.children[c]);if(null!=d)return d}}return null},b.prototype.findOneByIdAndType=function(a,b,c){if(c){if(a===c.id&&b===c.type)return c;if(c.children&&null!=c.children&&c.children.length>0)for(var d=0;d<c.children.length;d++){var e=this.findOneByIdAndType(a,b,c.children[d]);if(null!=e)return e}}return null},b.prototype.buildTree=function(b){"TestStep"===b.type?b.label=b.position+"."+b.name:b.label=b.name,b.nav||(b.nav={});var c=this;b.testCases&&(b.children?angular.forEach(b.testCases,function(a){b.children.push(a),a.nav={},a.nav.testStep=null,a.nav.testCase=a.name,a.nav.testPlan="TestPlan"===b.type?b.name:b.nav.testPlan,a.nav.testGroup="TestCaseGroup"===b.type?b.name:b.nav.testGroup,c.buildTree(a)}):(b.children=b.testCases,angular.forEach(b.children,function(a){a.nav={},a.nav.testStep=null,a.nav={},a.nav.testCase=a.name,a.nav.testPlan="TestPlan"===b.type?b.name:b.nav.testPlan,a.nav.testGroup="TestCaseGroup"===b.type?b.name:b.nav.testGroup,c.buildTree(a)})),b.children=a("orderBy")(b.children,"position"),delete b.testCases),b.testCaseGroups&&(b.children?angular.forEach(b.testCaseGroups,function(a){b.children.push(a),a.nav={},a.nav.testCase=null,a.nav.testStep=null,a.nav.testPlan="TestPlan"===b.type?b.name:b.nav.testPlan,a.nav.testGroup="TestCaseGroup"===b.type?b.name:b.nav.testGroup,c.buildTree(a)}):(b.children=b.testCaseGroups,angular.forEach(b.children,function(a){a.nav={},a.nav.testCase=null,a.nav.testStep=null,a.nav.testPlan="TestPlan"===b.type?b.name:b.nav.testPlan,a.nav.testGroup="TestCaseGroup"===b.type?b.name:b.nav.testGroup,c.buildTree(a)})),b.children=a("orderBy")(b.children,"position"),delete b.testCaseGroups),b.testSteps&&(b.children?angular.forEach(b.testSteps,function(a){b.children.push(a),a.nav={},a.nav.testCase=b.name,a.nav.testStep=a.position+"."+a.name,a.nav.testPlan=b.nav.testPlan,a.nav.testGroup=b.nav.testGroup,c.buildTree(a)}):(b.children=b.testSteps,angular.forEach(b.children,function(a){a.nav={},a.nav.testCase=b.name,a.nav.testStep=a.position+"."+a.name,a.nav.testPlan=b.nav.testPlan,a.nav.testGroup=b.nav.testGroup,c.buildTree(a)})),b.children=a("orderBy")(b.children,"position"),delete b.testSteps)},b.prototype.buildCFTestCases=function(b){if(b.label=b.children?b.name:b.position+"."+b.name,b.nav={},b.nav.testStep=b.label,b.nav.testCase=null,b.nav.testPlan=null,b.nav.testGroup=null,b.children){var c=this;b.children=a("orderBy")(b.children,"position"),angular.forEach(b.children,function(a){a.nav={},a.nav.testStep=a.label,a.nav.testCase=b.label,a.nav.testPlan=b.nav.testPlan,a.nav.testGroup=null,c.buildCFTestCases(a)})}},b.prototype.findNode=function(a,b,c,d){if(b.id===c&&(void 0!=d&&b.type===d||!d&&!b.type))return b;var e=a.get_children(b);if(e&&e.length>0)for(var f=0;f<e.length;f++){var g=this.findNode(a,e[f],c,d);if(null!=g)return g}return null},b.prototype.selectNodeByIdAndType=function(a,b,c){if(null!=b&&null!=a){var d=null,e=a.get_first_branch(),f=a.get_siblings(e);if(f&&f.length>0)for(var g=0;g<f.length;g++){var h=this.findNode(a,f[g],b,c);if(null!=h){d=h;break}}null!=d&&(a.collapse_all(),a.select_branch(d),a.expand_branch(d))}},b}]),angular.module("commonServices").factory("StorageService",["$rootScope","localStorageService",function(a,b){var c={CF_EDITOR_CONTENT_KEY:"CF_EDITOR_CONTENT",CF_LOADED_TESTCASE_ID_KEY:"CF_LOADED_TESTCASE_ID",CF_LOADED_TESTCASE_TYPE_KEY:"CF_LOADED_TESTCASE_TYPE",CB_EDITOR_CONTENT_KEY:"CB_EDITOR_CONTENT",CB_SELECTED_TESTCASE_ID_KEY:"CB_SELECTED_TESTCASE_ID",CB_SELECTED_TESTCASE_TYPE_KEY:"CB_SELECTED_TESTCASE_TYPE",CB_LOADED_TESTCASE_ID_KEY:"CB_LOADED_TESTCASE_ID",CB_LOADED_TESTCASE_TYPE_KEY:"CB_LOADED_TESTCASE_TYPE",ISOLATED_EDITOR_CONTENT_KEY:"ISOLATED_EDITOR_CONTENT",ISOLATED_SELECTED_TESTCASE_ID_KEY:"ISOLATED_SELECTED_TESTCASE_ID",ISOLATED_LOADED_TESTCASE_ID_KEY:"ISOLATED_LOADED_TESTCASE_ID",ISOLATED_LOADED_TESTSTEP_ID_KEY:"ISOLATED_LOADED_TESTSTEP_ID",ISOLATED_LOADED_TESTSTEP_TYPE_KEY:"ISOLATED_LOADED_TESTSTEP_TYPE",ISOLATED_SELECTED_TESTCASE_TYPE_KEY:"ISOLATED_SELECTED_TESTCASE_TYPE",ISOLATED_LOADED_TESTCASE_TYPE_KEY:"ISOLATED_LOADED_TESTCASE_TYPE",ACTIVE_SUB_TAB_KEY:"ACTIVE_SUB_TAB",remove:function(a){return b.remove(a)},removeList:function(a,c,d){return b.remove(a,c,d)},clearAll:function(){return b.clearAll()},set:function(a,c){return b.set(a,c)},get:function(a){return b.get(a)}};return c}]),angular.module("cf").factory("CF",["$rootScope","$http","$q","Editor","EDICursor","Message","Tree",function(a,b,c,d,e,f,g){var h={editor:new d,cursor:new e,tree:new g,testCase:null,selectedTestCase:null,message:new f,searchTableId:0};return h}]),angular.module("cf").factory("CFTestCaseListLoader",["$q","$http",function(a,b){return function(){var c=a.defer();return b.get("api/cf/testcases",{timeout:6e4}).then(function(a){c.resolve(angular.fromJson(a.data))},function(a){c.reject(a.data)}),c.promise}}]),angular.module("cb").factory("CB",["$http","$q","Editor","EDICursor","Message","ValidationSettings","Tree",function(a,b,c,d,e,f,g){var h={testCase:null,selectedTestCase:null,editor:new c,tree:new g,cursor:new d,message:new e,validationSettings:new f,setContent:function(a){h.message.content=a,h.editor.instance.doc.setValue(a),h.message.notifyChange()},getContent:function(){return h.message.content}};return h}]),angular.module("cb").factory("CBTestCaseListLoader",["$q","$http",function(a,b){return function(){var c=a.defer();return b.get("api/cb/testcases").then(function(a){c.resolve(angular.fromJson(a.data))},function(a){c.reject(a.data)}),c.promise}}]),angular.module("hit-tool").controller("ValidationResultDetailsCtrl",["$scope","$modalInstance","selectedElement",function(a,b,c){a.selectedElement=c,a.ok=function(){b.close(a.selectedElement)},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("cf").controller("CFTestingCtrl",["$scope","$http","CF","$window","$modal","$filter","$rootScope","CFTestCaseListLoader","$timeout","StorageService","TestCaseService",function(a,b,c,d,e,f,g,h,i,j,k){a.cf=c,a.loading=!1,a.loadingTC=!1,a.error=null,a.testCases=[],a.testCase=null,a.tree={},a.tabs=new Array,a.error=null;var l=new k;a.setActiveTab=function(b){a.tabs[0]=!1,a.tcLoadedTimer=null,a.tabs[1]=!1,a.tabs[2]=!1,a.tabs[3]=!1,a.activeTab=b,a.tabs[a.activeTab]=!0,0==a.activeTab&&a.$broadcast("cf:refreshEditor")},a.getTestCaseDisplayName=function(a){return a.parentName+" - "+a.label},a.selectTestCase=function(b){a.loadingTC=!0,i(function(){if(b.testContext&&null!=b.testContext){c.testCase=b,a.testCase=c.testCase;var d=j.get(j.CF_LOADED_TESTCASE_ID_KEY);d!=b.id&&(j.set(j.CF_LOADED_TESTCASE_ID_KEY,b.id),j.remove(j.CF_EDITOR_CONTENT_KEY)),g.$broadcast("cf:testCaseLoaded",a.testCase),g.$broadcast("cf:profileLoaded",a.testCase.testContext.profile),g.$broadcast("cf:valueSetLibraryLoaded",a.testCase.testContext.vocabularyLibrary)}a.loadingTC=!1})},a.init=function(){j.remove(j.ACTIVE_SUB_TAB_KEY),a.error=null,a.loading=!0,a.testCases=[];var b=new h;b.then(function(b){angular.forEach(b,function(a){l.buildCFTestCases(a)}),a.testCases=f("orderBy")(b,"position"),a.tree.build_all(a.testCases);var c=null,d=j.get(j.CF_LOADED_TESTCASE_ID_KEY);if(null!=d)for(var e=0;e<a.testCases.length;e++){var g=l.findOneById(d,a.testCases[e]);if(null!=g){c=g;break}}null!=c&&a.selectNode(c.id,c.type),a.loading=!1,a.error=null},function(b){a.error="Sorry,cannot load the profiles",a.loading=!1})},a.selectNode=function(b,c){i(function(){l.selectNodeByIdAndType(a.tree,b,c)},0)},a.openProfileInfo=function(){e.open({templateUrl:"CFProfileInfoCtrl.html",windowClass:"profile-modal",controller:"CFProfileInfoCtrl"})},a.isSelectable=function(a){return a.testContext&&null!=a.testContext}}]),angular.module("cf").controller("CFProfileInfoCtrl",["$scope","$modalInstance",function(a,b){a.close=function(){b.dismiss("cancel")}}]),angular.module("cf").controller("CFProfileViewerCtrl",["$scope","CF","$rootScope",function(a,b,c){a.cf=b}]),angular.module("cf").controller("CFValidatorCtrl",["$scope","$http","CF","$window","$timeout","$modal","NewValidationResult","$rootScope","ServiceDelegator","StorageService",function(a,b,c,d,e,f,g,h,i,j){a.validator=null,a.parser=null,a.editorService=null,a.treeService=null,a.cursorService=null,a.cf=c,a.testCase=c.testCase,a.message=c.message,a.selectedMessage={},a.loading=!0,a.error=null,a.vError=null,a.vLoading=!0,a.mError=null,a.mLoading=!0,a.counter=0,a.type="cf",a.loadRate=4e3,a.tokenPromise=null,a.editorInit=!1,a.nodelay=!1,a.resized=!1,a.selectedItem=null,a.activeTab=0,a.tError=null,a.tLoading=!1,a.hasContent=function(){return""!=a.cf.message.content&&null!=a.cf.message.content},a.refreshEditor=function(){e(function(){a.editor.refresh()},1e3)},a.options={paramName:"file",formAcceptCharset:"utf-8",autoUpload:!0,type:"POST"},a.$on("fileuploadadd",function(b,c){(c.autoUpload||c.autoUpload!==!1&&$(this).fileupload("option","autoUpload"))&&c.process().done(function(){var b=c.files[0].name;c.url="api/message/upload";c.submit().success(function(c,d,e){a.nodelay=!0;var f=angular.fromJson(c);a.cf.message.name=b,a.cf.editor.instance.doc.setValue(f.content),a.mError=null,a.execute()}).error(function(c,d,e){a.cf.message.name=b,a.mError="Sorry, Cannot upload file: "+b+", Error: "+e}).complete(function(a,b,c){})})}),a.loadMessage=function(){null!=a.cf.testCase.testContext.message&&(a.nodelay=!0,a.selectedMessage=a.cf.testCase.testContext.message,null!=a.selectedMessage&&null!=a.selectedMessage.content?a.editor.doc.setValue(a.selectedMessage.content):(a.editor.doc.setValue(""),a.cf.message.id=null,a.cf.message.name=""),a.execute())},a.setLoadRate=function(b){a.loadRate=b},a.initCodemirror=function(){a.editor=CodeMirror.fromTextArea(document.getElementById("cfTextArea"),{lineNumbers:!0,fixedGutter:!0,theme:"elegant",readOnly:!1,showCursorWhenSelecting:!0}),a.editor.setSize("100%",345),a.editor.on("keyup",function(){e(function(){var b=a.editor.doc.getValue();a.error=null,a.tokenPromise&&(e.cancel(a.tokenPromise),a.tokenPromise=void 0),c.message.name=null,""!==b.trim()?a.tokenPromise=e(function(){a.execute()},a.loadRate):a.execute()})}),a.editor.on("dblclick",function(b){e(function(){var b=a.cursorService.getCoordinate(a.editor,a.cf.tree);a.cf.cursor.init(b.line,b.startIndex,b.endIndex,b.index,!0),a.treeService.selectNodeByIndex(a.cf.tree.root,c.cursor,c.message.content)})}),a.cf.editor.instance=a.editor,a.refreshEditor()},a.validateMessage=function(){try{if(null!=a.cf.testCase&&null!=a.cf.testCase.testContext&&""!==a.cf.message.content)try{a.vLoading=!0,a.vError=null;var b=a.cf.testCase.testContext.id,c=a.cf.message.content,d=a.cf.testCase.nav,e=a.validator.validate(b,c,d,"Free");e.then(function(b){a.vLoading=!1,a.loadValidationResult(b)},function(b){a.vLoading=!1,a.vError=b,a.loadValidationResult(null)})}catch(f){a.vLoading=!1,a.vError=f,a.loadValidationResult(null)}else a.loadValidationResult(null),a.vLoading=!1,a.vError=null}catch(g){a.vLoading=!1,a.vError=null}},a.loadValidationResult=function(a){e(function(){h.$broadcast("cf:validationResultLoaded",a)})},a.select=function(b){if(void 0!=b&&null!=b.path&&-1!=b.line){var c=a.treeService.selectNodeByPath(a.cf.tree.root,b.line,b.path),d=null!=c?c.data:null;a.cf.cursor.init(null!=d?d.lineNumber:b.line,null!=d?d.startIndex-1:b.column-1,null!=d?d.endIndex-1:b.column-1,null!=d?d.startIndex-1:b.column-1,!1),a.editorService.select(a.editor,a.cf.cursor)}},a.clearMessage=function(){a.nodelay=!0,a.mError=null,a.editor&&(a.editor.doc.setValue(""),a.execute())},a.saveMessage=function(){a.cf.message.download()},a.parseMessage=function(){try{if(null!=a.cf.testCase&&null!=a.cf.testCase.testContext&&""!=a.cf.message.content){a.tLoading=!0;var b=a.parser.parse(a.cf.testCase.testContext.id,a.cf.message.content);b.then(function(b){a.tLoading=!1,a.cf.tree.root.build_all(b.elements),i.updateEditorMode(a.editor,b.delimeters,a.testCase.testContext.format),a.editorService.setEditor(a.editor),a.treeService.setEditor(a.editor)},function(b){a.tLoading=!1,a.tError=b})}else"function"==typeof a.cf.tree.root.build_all&&a.cf.tree.root.build_all([]),a.tError=null,a.tLoading=!1}catch(c){a.tError=null,a.tLoading=!1}},a.onNodeSelect=function(b){var c=a.treeService.getEndIndex(b,a.cf.message.content);a.cf.cursor.init(b.data.lineNumber,b.data.startIndex-1,c-1,b.data.startIndex-1,!1),a.editorService.select(a.editor,a.cf.cursor)},a.execute=function(){null!=a.cf.testCase&&(a.error=null,a.tError=null,a.mError=null,a.vError=null,a.cf.message.content=a.editor.doc.getValue(),j.set(j.CF_EDITOR_CONTENT_KEY,a.cf.message.content),a.validateMessage(),a.parseMessage())},a.init=function(){a.vLoading=!1,a.tLoading=!1,a.mLoading=!1,a.error=null,a.tError=null,a.mError=null,a.vError=null,a.initCodemirror(),a.$on("cf:refreshEditor",function(b){a.refreshEditor()}),h.$on("cf:testCaseLoaded",function(b,c){if(a.testCase=c,null!=a.testCase){var d=null==j.get(j.CF_EDITOR_CONTENT_KEY)?"":j.get(j.CF_EDITOR_CONTENT_KEY);a.nodelay=!0,a.mError=null;try{a.validator=i.getMessageValidator(a.testCase.testContext.format),a.parser=i.getMessageParser(a.testCase.testContext.format),a.editorService=i.getEditorService(a.testCase.testContext.format),a.treeService=i.getTreeService(a.testCase.testContext.format),a.cursorService=i.getCursorService(a.testCase.testContext.format),a.editor&&(a.editor.doc.setValue(d),a.execute())}catch(e){a.mError=e,a.vError=e}}a.refreshEditor()})}}]),angular.module("cf").controller("CFReportCtrl",["$scope","$sce","$http","CF",function(a,b,c,d){a.cf=d}]),angular.module("cf").controller("CFVocabularyCtrl",["$scope","CF",function(a,b){a.cf=b}]),angular.module("cb").controller("CBTestingCtrl",["$scope","$window","$rootScope","CB","StorageService",function(a,b,c,d,e){a.init=function(){var a=e.get(e.ACTIVE_SUB_TAB_KEY);(null==a||"/cb_execution"!=a)&&(a="/cb_testcase"),c.setSubActive(a)},a.getTestType=function(){return d.testCase.type},a.disabled=function(){return null==d.testCase||null===d.testCase.id}}]),angular.module("cb").controller("CBExecutionCtrl",["$scope","$window","$rootScope","$timeout",function(a,b,c,d){a.loading=!1,a.error=null,a.tabs=new Array,a.testCase=null,a.setActiveTab=function(b){a.tabs[0]=!1,a.tabs[1]=!1,a.tabs[2]=!1,a.tabs[3]=!1,a.activeTab=b,a.tabs[a.activeTab]=!0},a.getTestType=function(){return null!=a.testCase?a.testCase.type:""},a.init=function(){a.error=null,a.setActiveTab(0),c.$on("cb:testCaseLoaded",function(b,e,f){a.loading=!0,d(function(){c.setSubActive(f&&null!=f?f:"/cb_execution"),a.testCase=e,c.$broadcast("cb:profileLoaded",a.testCase.testContext.profile),c.$broadcast("cb:valueSetLibraryLoaded",a.testCase.testContext.vocabularyLibrary),a.loading=!1})})}}]),angular.module("cb").controller("CBTestCaseCtrl",["$scope","$window","$filter","$rootScope","CB","$timeout","CBTestCaseListLoader","$sce","StorageService","TestCaseService",function(a,b,c,d,e,f,g,h,i,j){a.selectedTestCase=e.selectedTestCase,a.testCase=e.testCase,a.testCases=[],a.tree={},a.loading=!0,a.loadingTC=!1,a.error=null;var k=new j;a.init=function(){a.error=null,a.loading=!0;var b=new g;b.then(function(b){a.error=null,angular.forEach(b,function(a){k.buildTree(a)}),a.testCases=b,a.tree.build_all(a.testCases);var c=null,d=i.get(i.CB_SELECTED_TESTCASE_ID_KEY),e=i.get(i.CB_SELECTED_TESTCASE_TYPE_KEY);if(null!=d&&null!=e){for(var f=0;f<a.testCases.length;f++){var g=k.findOneByIdAndType(d,e,a.testCases[f]);if(null!=g){c=g;break}}null!=c&&a.selectNode(d,e)}if(c=null,d=i.get(i.CB_LOADED_TESTCASE_ID_KEY),e=i.get(i.CB_LOADED_TESTCASE_TYPE_KEY),null!=d&&null!=e){for(var f=0;f<a.testCases.length;f++){var g=k.findOneByIdAndType(d,e,a.testCases[f]);if(null!=g){c=g;break}}if(null!=c){var h=i.get(i.ACTIVE_SUB_TAB_KEY);a.loadTestCase(c,h)}}a.loading=!1},function(b){a.loading=!1,a.error="Sorry,cannot load the test cases. Please refresh your page and try again."})},a.refreshEditor=function(){f(function(){a.editor&&a.editor.refresh()},1e3)},a.isSelectable=function(a){return!0},a.selectTestCase=function(b){a.loadingTC=!0,a.selectedTestCase=b,i.set(i.CB_SELECTED_TESTCASE_ID_KEY,b.id),i.set(i.CB_SELECTED_TESTCASE_TYPE_KEY,b.type),f(function(){d.$broadcast("cb:testCaseSelected",a.selectedTestCase),a.loadingTC=!1})},a.selectNode=function(b,c){f(function(){k.selectNodeByIdAndType(a.tree,b,c)},0)},a.selectTestPlan=function(b){(null==a.selectedTestCase||a.selectedTestCase.id!=b.id)&&(a.selectedTestCase=b)},a.loadTestCase=function(b,c){f(function(){if("TestStep"===b.type){e.testCase=b,a.testCase=e.testCase;var f=i.get(i.CB_LOADED_TESTCASE_ID_KEY),g=i.get(i.CB_LOADED_TESTCASE_TYPE_KEY);(f!=a.testCase.id||g!=a.testCase.type)&&(i.set(i.CB_LOADED_TESTCASE_ID_KEY,a.testCase.id),i.set(i.CB_LOADED_TESTCASE_TYPE_KEY,a.testCase.type),i.remove(i.CB_EDITOR_CONTENT_KEY)),d.$broadcast("cb:testCaseLoaded",a.testCase,c)}})},a.expand=function(a){}}]),angular.module("cb").controller("CBProfileViewerCtrl",["$scope","CB",function(a,b){a.cb=b}]),angular.module("cb").controller("CBValidatorCtrl",["$scope","$http","CB","$window","$timeout","$modal","NewValidationResult","$rootScope","ServiceDelegator","StorageService",function(a,b,c,d,e,f,g,h,i,j){a.cb=c,a.testCase=c.testCase,a.message=c.message,a.selectedMessage={},
a.loading=!0,a.error=null,a.vError=null,a.vLoading=!0,a.mError=null,a.mLoading=!0,a.validator=null,a.editorService=null,a.treeService=null,a.cursorService=null,a.parser=null,a.counter=0,a.type="cb",a.loadRate=4e3,a.tokenPromise=null,a.editorInit=!1,a.nodelay=!1,a.resized=!1,a.selectedItem=null,a.activeTab=0,a.messageObject=[],a.tError=null,a.tLoading=!1,a.hasContent=function(){return""!=a.cb.message.content&&null!=a.cb.message.content},a.refreshEditor=function(){e(function(){a.editor.refresh()},1e3)},a.options={paramName:"file",formAcceptCharset:"utf-8",autoUpload:!0,type:"POST"},a.$on("fileuploadadd",function(b,c){(c.autoUpload||c.autoUpload!==!1&&$(this).fileupload("option","autoUpload"))&&c.process().done(function(){var b=c.files[0].name;c.url="api/message/upload";c.submit().success(function(c,d,e){a.nodelay=!0;var f=angular.fromJson(c);a.cb.message.name=b,a.cb.editor.instance.doc.setValue(f.content),a.mError=null,a.execute()}).error(function(c,d,e){a.cb.message.name=b,a.mError="Sorry, Cannot upload file: "+b+", Error: "+e}).complete(function(a,b,c){})})}),a.loadMessage=function(){var b=a.cb.testCase,c=b.testContext,d=a.cb.testCase.testContext.message,e=d?d.content:null;null!=c.message&&null!=e&&""!=e&&(a.nodelay=!0,a.selectedMessage=a.cb.testCase.testContext.message,null!=a.selectedMessage&&null!=a.selectedMessage.content?a.editor.doc.setValue(a.selectedMessage.content):(a.editor.doc.setValue(""),a.cb.message.id=null,a.cb.message.name=""),a.execute())},a.setLoadRate=function(b){a.loadRate=b},a.initCodemirror=function(){a.editor=CodeMirror.fromTextArea(document.getElementById("cb-textarea"),{lineNumbers:!0,fixedGutter:!0,theme:"elegant",readOnly:!1,showCursorWhenSelecting:!0}),a.editor.setSize("100%",345),a.editor.on("keyup",function(){e(function(){var b=a.editor.doc.getValue();a.tokenPromise&&(e.cancel(a.tokenPromise),a.tokenPromise=void 0),c.message.name=null,""!==b.trim()?a.tokenPromise=e(function(){a.execute()},a.loadRate):a.execute()})}),a.editor.on("dblclick",function(b){e(function(){var b=a.cursorService.getCoordinate(a.editor,a.cb.tree);a.cb.cursor.init(b.line,b.startIndex,b.endIndex,b.index,!0),a.treeService.selectNodeByIndex(a.cb.tree.root,c.cursor,c.message.content)})}),a.cb.editor.instance=a.editor,a.refreshEditor()},a.validateMessage=function(){try{if(null!=a.cb.testCase&&null!=a.cb.testCase.testContext&&""!==a.cb.message.content){a.vLoading=!0,a.vError=null;var b=a.validator.validate(a.cb.testCase.testContext.id,a.cb.message.content,a.cb.testCase.nav,"Based");b.then(function(b){a.vLoading=!1,a.loadValidationResult(b)},function(b){a.vLoading=!1,a.vError=b.data,a.loadValidationResult(null)})}else a.loadValidationResult(null),a.vLoading=!1,a.vError=null}catch(c){a.vLoading=!1,a.vError=c.data,a.loadValidationResult(null)}},a.loadValidationResult=function(a){e(function(){h.$broadcast("cb:validationResultLoaded",a)})},a.select=function(b){if(void 0!=b&&null!=b.path&&-1!=b.line){var c=a.treeService.selectNodeByPath(a.cb.tree.root,b.line,b.path),d=null!=c?c.data:null;a.cb.cursor.init(null!=d?d.lineNumber:b.line,null!=d?d.startIndex-1:b.column-1,null!=d?d.endIndex-1:b.column-1,null!=d?d.startIndex-1:b.column-1,!1),a.editorService.select(a.editor,a.cb.cursor)}},a.clearMessage=function(){a.nodelay=!0,a.mError=null,a.editor&&(a.editor.doc.setValue(""),a.execute())},a.saveMessage=function(){a.cb.message.download()},a.parseMessage=function(){try{if(null!=a.cb.testCase&&null!=a.cb.testCase.testContext&&""!=a.cb.message.content){a.tLoading=!0;var b=a.parser.parse(a.cb.testCase.testContext.id,a.cb.message.content,a.cb.testCase.label);b.then(function(b){a.tLoading=!1,a.cb.tree.root.build_all(b.elements),i.updateEditorMode(a.editor,b.delimeters,a.testCase.testContext.format),a.editorService.setEditor(a.editor),a.treeService.setEditor(a.editor)},function(b){a.tLoading=!1,a.tError=b.data})}else"function"==typeof a.cb.tree.root.build_all&&a.cb.tree.root.build_all([]),a.tError=null,a.tLoading=!1}catch(c){a.tError=null,a.tLoading=!1}},a.onNodeSelect=function(b){var c=a.treeService.getEndIndex(b,a.cb.message.content);a.cb.cursor.init(b.data.lineNumber,b.data.startIndex-1,c-1,b.data.startIndex-1,!1),a.editorService.select(a.editor,a.cb.cursor)},a.execute=function(){a.error=null,a.tError=null,a.mError=null,a.vError=null,a.cb.message.content=a.editor.doc.getValue(),j.set(j.CB_EDITOR_CONTENT_KEY,a.cb.message.content),a.validateMessage(),a.parseMessage()},a.init=function(){a.vLoading=!1,a.tLoading=!1,a.mLoading=!1,a.error=null,a.tError=null,a.mError=null,a.vError=null,a.initCodemirror(),a.loadValidationResult(null),a.$on("cb:refreshEditor",function(b){a.refreshEditor()}),h.$on("cb:testCaseLoaded",function(b,c){if(a.refreshEditor(),a.testCase=c,null!=a.testCase){var d=null==j.get(j.CB_EDITOR_CONTENT_KEY)?"":j.get(j.CB_EDITOR_CONTENT_KEY);a.nodelay=!0,a.mError=null,a.validator=i.getMessageValidator(a.testCase.testContext.format),a.parser=i.getMessageParser(a.testCase.testContext.format),a.editorService=i.getEditorService(a.testCase.testContext.format),a.treeService=i.getTreeService(a.testCase.testContext.format),a.cursorService=i.getCursorService(a.testCase.testContext.format),a.editor&&(a.editor.doc.setValue(d),a.execute())}})}}]),angular.module("cb").controller("CBReportCtrl",["$scope","$sce","$http","CB",function(a,b,c,d){a.cb=d}]),angular.module("cb").controller("CBVocabularyCtrl",["$scope","CB",function(a,b){a.cb=b}]),angular.module("hit-tool").controller("ContactCtrl",["$scope","ContactLoader","ContactListLoader",function(a,b,c){a.init=function(){var b=new c;return b.then(function(b){a.contacts=b},function(b){a.error=b}),b}}]),angular.module("hit-tool").controller("AboutCtrl",["$scope","AppInfo",function(a,b){}]),angular.module("hit-tool-directives").directive("hl7editor",["$timeout",function(a){return{restrict:"A",link:function(a,b,c){a.editor=CodeMirror.fromTextArea(document.getElementById(c.id),{lineNumbers:!0,fixedGutter:!0,theme:"elegant",mode:"edi",readOnly:void 0!=c.readonly&&c.readonly,showCursorWhenSelecting:!0}),a.editor.setSize(null,300),a.editor.on("change",function(b){a.$emit(c.type+":editor:update")}),a.editor.on("dblclick",function(b){a.$emit(c.type+":editor:dblclick")}),a.editorInit=!0}}}]),angular.module("hit-tool-directives").directive("soapEditor",["$timeout",function(a){return{restrict:"A",link:function(a,b,c){a.editor=CodeMirror.fromTextArea(document.getElementById(c.id),{lineNumbers:!0,fixedGutter:!0,mode:"xml",readOnly:void 0!=c.readonly&&c.readonly,showCursorWhenSelecting:!0}),a.editor.setSize(null,300),a.editor.on("dblclick",function(b){a.$emit(c.type+":editor:dblclick")}),a.editorInit=!0}}}]),angular.module("hit-tool-directives").directive("mypopover",["$compile","$templateCache",function(a,b){return{restrict:"A",link:function(a,c,d){var e=b.get("profileInfo.html"),f={content:e,placement:"bottom",html:!0};$(c).popover(f)}}}]);