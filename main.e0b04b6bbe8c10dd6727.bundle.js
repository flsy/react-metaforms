(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{116:function(module,__webpack_exports__,__webpack_require__){"use strict";var _components_Form__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(277);__webpack_require__.d(__webpack_exports__,"default",(function(){return _components_Form__WEBPACK_IMPORTED_MODULE_0__.a}));__webpack_require__(8)},277:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(40);var objectSpread2=__webpack_require__(117),react=__webpack_require__(0),lib=__webpack_require__(88),metaforms_lib=__webpack_require__(8);const Input=react.forwardRef((props,ref)=>{return react.createElement("div",null,props.label&&react.createElement(components_Label,{fieldId:props.name,label:props.label,isRequired:Object(metaforms_lib.isRequired)(props.validation)}),react.createElement("input",{ref:ref,id:props.name,type:props.type,name:props.name,placeholder:props.placeholder,value:(value=props.value,value instanceof Date?value.toISOString():"boolean"==typeof value?value?"true":"false":value||""),disabled:props.disabled,onChange:e=>props.update({name:props.name,value:e.target.value,groupName:props.groupName}),onBlur:()=>props.validate({name:props.name}),inputMode:props.inputMode}),props.errorMessage?react.createElement(components_ErrorMessage,{message:props.errorMessage}):null);var value});Input.__docgenInfo={description:"",methods:[],displayName:"Input"};var fields_Input=Input;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/fields/Input.tsx"]={name:"Input",docgenInfo:Input.__docgenInfo,path:"src/components/fields/Input.tsx"});const Textarea=react.forwardRef((props,ref)=>{const label=props.label,name=props.name,validation=props.validation,placeholder=props.placeholder,value=props.value,disabled=props.disabled,update=props.update,validate=props.validate,groupName=props.groupName,errorMessage=props.errorMessage;return react.createElement("div",null,label?react.createElement(components_Label,{fieldId:name,label:label,isRequired:Object(metaforms_lib.isRequired)(validation)}):null,react.createElement("textarea",{ref:ref,id:name,name:name,placeholder:placeholder,defaultValue:value,disabled:disabled,onChange:e=>update({name:name,value:e.target.value,groupName:groupName}),onBlur:()=>validate({name:name})}),errorMessage?react.createElement(components_ErrorMessage,{message:errorMessage}):null)});Textarea.__docgenInfo={description:"",methods:[],displayName:"Textarea"};var fields_Textarea=Textarea;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/fields/Textarea.tsx"]={name:"Textarea",docgenInfo:Textarea.__docgenInfo,path:"src/components/fields/Textarea.tsx"});const Checkbox=react.forwardRef((props,ref)=>react.createElement("div",null,props.label&&react.createElement(components_Label,{fieldId:props.name,label:props.label,isRequired:Object(metaforms_lib.isRequired)(props.validation)}),react.createElement("input",{ref:ref,id:props.name,name:props.name,type:"checkbox",disabled:props.disabled,defaultChecked:props.value||!1,onChange:event=>props.updateAndValidate({name:props.name,value:event.target.checked,groupName:props.groupName})}),props.errorMessage?react.createElement(components_ErrorMessage,{message:props.errorMessage}):null));Checkbox.__docgenInfo={description:"",methods:[],displayName:"Checkbox"};var fields_Checkbox=Checkbox;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/fields/Checkbox.tsx"]={name:"Checkbox",docgenInfo:Checkbox.__docgenInfo,path:"src/components/fields/Checkbox.tsx"});__webpack_require__(64);const Select=react.forwardRef((props,ref)=>react.createElement("div",null,props.label&&react.createElement(components_Label,{fieldId:props.name,label:props.label,isRequired:Object(metaforms_lib.isRequired)(props.validation)}),react.createElement("select",{ref:ref,id:props.name,name:props.name,disabled:props.disabled,defaultValue:props.value||"",onChange:event=>props.updateAndValidate({name:props.name,value:event.target.value,groupName:props.groupName})},props.placeholder?react.createElement("option",{value:""},props.placeholder):null,(props.options||[]).map(option=>react.createElement("option",{value:option.value,key:option.value},option.label||option.value))),props.errorMessage?react.createElement(components_ErrorMessage,{message:props.errorMessage}):null));Select.__docgenInfo={description:"",methods:[],displayName:"Select"};var fields_Select=Select;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/fields/Select.tsx"]={name:"Select",docgenInfo:Select.__docgenInfo,path:"src/components/fields/Select.tsx"});const Button=({label:label,name:name,disabled:disabled,onButtonClick:onButtonClick})=>react.createElement("button",{disabled:disabled,name:name,type:"button",onClick:onButtonClick},label);Button.displayName="Button",Button.__docgenInfo={description:"",methods:[],displayName:"Button"};var fields_Button=Button;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/fields/Button.tsx"]={name:"Button",docgenInfo:Button.__docgenInfo,path:"src/components/fields/Button.tsx"});const Submit=({label:label,name:name,disabled:disabled})=>react.createElement("button",{disabled:disabled,name:name,type:"submit"},label||"Submit");Submit.displayName="Submit",Submit.__docgenInfo={description:"",methods:[],displayName:"Submit"};var fields_Submit=Submit;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/fields/Submit.tsx"]={name:"Submit",docgenInfo:Submit.__docgenInfo,path:"src/components/fields/Submit.tsx"});const Group=({legend:legend,children:children})=>react.createElement("div",null,react.createElement("div",null,legend||null),children);Group.displayName="Group",Group.__docgenInfo={description:"",methods:[],displayName:"Group"};var fields_Group=Group;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/fields/Group.tsx"]={name:"Group",docgenInfo:Group.__docgenInfo,path:"src/components/fields/Group.tsx"});var _ref=react.createElement("abbr",{title:"This field is required","aria-hidden":"true"}," ","*");const Asterisk=()=>_ref;Asterisk.displayName="Asterisk";var _ref2=react.createElement(Asterisk,null);const Label=({fieldId:fieldId,label:label,isRequired:isRequired,children:children})=>react.createElement("label",{htmlFor:fieldId},label,isRequired&&_ref2,children);Label.displayName="Label",Label.__docgenInfo={description:"",methods:[],displayName:"Label",props:{fieldId:{required:!0,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},isRequired:{required:!0,tsType:{name:"boolean"},description:""},children:{required:!1,tsType:{name:"ReactReactChildren",raw:"React.ReactChildren"},description:""}}};var components_Label=Label;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Label.tsx"]={name:"Label",docgenInfo:Label.__docgenInfo,path:"src/components/Label.tsx"});const ErrorMessage=({message:message})=>react.createElement("div",{className:"error-message"},message);ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",methods:[],displayName:"ErrorMessage",props:{message:{required:!0,tsType:{name:"string"},description:""}}};var components_ErrorMessage=ErrorMessage;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ErrorMessage.tsx"]={name:"ErrorMessage",docgenInfo:ErrorMessage.__docgenInfo,path:"src/components/ErrorMessage.tsx"});const Form=({id:id,fields:fields=[],onButtonClick:onButtonClick,customComponents:customComponents,onFieldsChange:onFieldsChange,onSubmit:onSubmit})=>{const inputRefs={};react.useEffect(()=>{resolveFocusedField()},[]);const resolveFocusedField=()=>{const focused=Object(metaforms_lib.shouldComponentFocus)(fields);focused&&inputRefs[focused]&&inputRefs[focused].current&&inputRefs[focused].current.focus()},thisUpdate=({name:name,value:value,groupName:groupName})=>{onFieldsChange(Object(metaforms_lib.update)({name:name,value:value,groupName:groupName},fields))},thisValidate=({name:name})=>{onFieldsChange(Object(metaforms_lib.validate)({name:name},fields))},thisUpdateAndValidate=({name:name,value:value,groupName:groupName})=>{onFieldsChange(Object(metaforms_lib.updateAndValidate)({name:name,value:value,groupName:groupName},fields))},thisOnButtonClick=field=>{onButtonClick&&onButtonClick(field,fields)},getComponent=(field,groupName)=>{const component=customComponents&&customComponents[field.type];if(component){const props=Object(objectSpread2.a)({},field,{groupName:groupName,key:field.name,children:field.fields?Object(lib.map)(c=>getComponent(c,field.name),field.fields):[],update:thisUpdate,validate:thisValidate,onButtonClick:()=>thisOnButtonClick(field),updateAndValidate:thisUpdateAndValidate});return react.createElement(component,props)}switch(inputRefs[field.name]=react.createRef(),field.type){case"text":case"email":case"number":case"datetime-local":case"password":return react.createElement(fields_Input,Object.assign({key:field.name},field,{ref:inputRefs[field.name],groupName:groupName,update:thisUpdate,validate:thisValidate}));case"textarea":return react.createElement(fields_Textarea,Object.assign({key:field.name},field,{ref:inputRefs[field.name],groupName:groupName,update:thisUpdate,validate:thisValidate}));case"checkbox":return react.createElement(fields_Checkbox,Object.assign({key:field.name},field,{ref:inputRefs[field.name],groupName:groupName,updateAndValidate:thisUpdateAndValidate}));case"select":return react.createElement(fields_Select,Object.assign({key:field.name},field,{ref:inputRefs[field.name],groupName:groupName,updateAndValidate:thisUpdateAndValidate}));case"button":return react.createElement(fields_Button,Object.assign({key:field.name},field,{groupName:groupName,onButtonClick:()=>thisOnButtonClick(field)}));case"submit":return react.createElement(fields_Submit,Object.assign({key:field.name},field,{groupName:groupName}));case"group":return react.createElement(fields_Group,{key:field.name,name:field.name,type:"group",legend:field.legend},Object(lib.map)(c=>getComponent(c,field.name),field.fields));default:return null}};return react.createElement("form",{id:id,onSubmit:event=>{event.preventDefault();const validated=Object(metaforms_lib.validateForm)(fields);onFieldsChange(validated),Object(metaforms_lib.hasError)(validated)||onSubmit(validated)}},Object(lib.map)(getComponent,fields))};Form.displayName="Form",Form.__docgenInfo={description:"",methods:[],displayName:"Form",props:{fields:{defaultValue:{value:"[]",computed:!1},required:!1}}};__webpack_exports__.a=Form;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Form.tsx"]={name:"Form",docgenInfo:Form.__docgenInfo,path:"src/components/Form.tsx"})},278:function(module,exports,__webpack_require__){__webpack_require__(279),__webpack_require__(425),module.exports=__webpack_require__(426)},343:function(module,exports){},426:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(68);module._StorybookPreserveDecorators=!0,Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(619)],module)}.call(this,__webpack_require__(144)(module))},619:function(module,exports,__webpack_require__){var map={"./stories/Form.stories.tsx":620,"./stories/Wizard.stories.tsx":636};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=619},620:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"fields1",(function(){return fields1})),__webpack_require__.d(__webpack_exports__,"fields2",(function(){return fields2})),__webpack_require__.d(__webpack_exports__,"fields3",(function(){return fields3}));var _home_runner_work_react_metaforms_react_metaforms_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(70),_export__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(116),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(69),metaforms__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(8),_storybook_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(68);const fields1=[{name:"name",label:"Name",type:"text",validation:[{type:"required",rules:[{message:"This field is required."}]}]},{name:"button",label:"Button example",type:"button"},{name:"agree",type:"checkbox",label:"Agree ?"},{name:"my-textarea",type:"textarea",value:"Text area"},{type:"group",name:"first-group",legend:"Inline group",fields:[{name:"inline-button",label:"Inline Button",type:"button"},{type:"text",name:"inline-input",label:"Inline Input",validation:[{type:"required",rules:[{message:"Please choose a inline text value"}]}]}]},{name:"submit",type:"submit"}],fields2=[{name:"name",label:"Name",type:"text",value:"banana"},{name:"submit",type:"submit"}],fields3=[{name:"name",label:"Name",type:"text",value:"banana"},{name:"groups",type:"select",options:[{value:"first"},{value:2,label:"Second"}]},{name:"submit",type:"submit"}],submit=props=>react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button",{type:"submit",style:{margin:"10px 0"}},props.label," [OK] Custom button");submit.displayName="submit";const FormStory=({fieldsDefault:fieldsDefault})=>{const _React$useState=react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(fieldsDefault),_React$useState2=Object(_home_runner_work_react_metaforms_react_metaforms_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_React$useState,2),fields=_React$useState2[0],onFieldsChange=_React$useState2[1];return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_export__WEBPACK_IMPORTED_MODULE_1__.default,{id:"demo-form",fields:fields,onFieldsChange:state=>{Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_3__.action)("onFieldsChange")(Object(metaforms__WEBPACK_IMPORTED_MODULE_4__.getFormData)(fields)),onFieldsChange(state)},onSubmit:Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_3__.action)("submit"),onButtonClick:Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_3__.action)("button click"),customComponents:{submit:submit}})};FormStory.displayName="FormStory";var _ref=react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(FormStory,{fieldsDefault:fields1}),_ref2=react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(FormStory,{fieldsDefault:fields2}),_ref3=react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(FormStory,{fieldsDefault:fields3});Object(_storybook_react__WEBPACK_IMPORTED_MODULE_5__.storiesOf)("Form",module).add("example 1",()=>_ref).add("example 2",()=>_ref2).add("example 3",()=>_ref3)}.call(this,__webpack_require__(144)(module))},636:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"fieldConfig",(function(){return fieldConfig}));var _home_runner_work_react_metaforms_react_metaforms_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(117),_home_runner_work_react_metaforms_react_metaforms_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(70),_export__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(116),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(69),metaforms__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(8),_storybook_react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(68);const fieldConfig=[[{name:"name",label:"Name",type:"text",validation:[{type:"required",rules:[{message:"This field is required."}]}]},{name:"hasAddress",type:"checkbox",label:"I want to enter my address",value:!1},{name:"submit",label:"Continue",type:"submit"}],[{name:"street",label:"Street",type:"text"},{name:"city",label:"City",type:"text"},{name:"submit",label:"Continue",type:"submit"}],[{name:"companyName",label:"Company Name",type:"text",value:"banana"},{name:"submit",label:"Finish",type:"submit"}]],submit=props=>react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button",{type:"submit",style:{margin:"10px 0"}},props.label);submit.displayName="submit";var _ref=react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("strong",null,"values:");const WizardStory=()=>{const _React$useState=react__WEBPACK_IMPORTED_MODULE_3___default.a.useState([]),_React$useState2=Object(_home_runner_work_react_metaforms_react_metaforms_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__.a)(_React$useState,2),values=_React$useState2[0],setValues=_React$useState2[1],_React$useState3=react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(0),_React$useState4=Object(_home_runner_work_react_metaforms_react_metaforms_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__.a)(_React$useState3,2),step=_React$useState4[0],setStep=_React$useState4[1],_React$useState5=react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(fieldConfig[step]),_React$useState6=Object(_home_runner_work_react_metaforms_react_metaforms_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__.a)(_React$useState5,2),fields=_React$useState6[0],onFieldsChange=_React$useState6[1];return 2<step?react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div",null,_ref," ",JSON.stringify(values))):react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_export__WEBPACK_IMPORTED_MODULE_2__.default,{id:"demo-form",fields:fields,onFieldsChange:state=>{onFieldsChange(state)},onSubmit:f=>{let nextStep=step+1;!1===Object(metaforms__WEBPACK_IMPORTED_MODULE_5__.getFormData)(f).hasAddress&&(nextStep=2),setStep(nextStep),onFieldsChange(fieldConfig[nextStep]),setValues(Object(_home_runner_work_react_metaforms_react_metaforms_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({},values,{},Object(metaforms__WEBPACK_IMPORTED_MODULE_5__.getFormData)(f)))},onButtonClick:Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_4__.action)("button click"),customComponents:{submit:submit}})};WizardStory.displayName="WizardStory";var _ref2=react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(WizardStory,null);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_6__.storiesOf)("Wizard",module).add("basic usage",()=>_ref2)}.call(this,__webpack_require__(144)(module))}},[[278,1,2]]]);
//# sourceMappingURL=main.e0b04b6bbe8c10dd6727.bundle.js.map