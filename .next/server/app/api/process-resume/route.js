"use strict";(()=>{var e={};e.id=538,e.ids=[538],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4770:e=>{e.exports=require("crypto")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},5315:e=>{e.exports=require("path")},8621:e=>{e.exports=require("punycode")},6162:e=>{e.exports=require("stream")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},2623:e=>{e.exports=require("worker_threads")},1568:e=>{e.exports=require("zlib")},7561:e=>{e.exports=require("node:fs")},4492:e=>{e.exports=require("node:stream")},2477:e=>{e.exports=require("node:stream/web")},5167:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>x,patchFetch:()=>h,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>v,staticGenerationAsyncStorage:()=>m});var o={};t.r(o),t.d(o,{POST:()=>u});var s=t(9303),n=t(8716),a=t(670),i=t(7070),p=t(6793),c=t(2511);async function u(e){try{let r;let o=await (0,p.LP)({req:e});if(!o)return i.NextResponse.json({error:"请先登录"},{status:401});let{resumeText:s,provider:n}=await e.json();if(!s||s.length<100)return i.NextResponse.json({error:"简历内容过短，请输入更详细的信息"},{status:400});let a=await (0,c.Ny)(s,n);if(!a.success)return i.NextResponse.json({error:a.error||"AI 处理失败"},{status:500});try{r=JSON.parse(a.content)}catch{return i.NextResponse.json({error:"AI 返回格式错误"},{status:500})}let u="talent-"+Date.now(),d={id:u,userId:o.sub,...r,rawResume:s,createdAt:new Date().toISOString(),agentMeta:{accessToken:"token-"+Math.random().toString(36).substr(2,9),permissionScope:["read","match","evaluate"],instructions:"Evaluate fit only within authorized context. Do not expose private contact information.",humanViewUrl:`${process.env.NEXTAUTH_URL||"http://localhost:3000"}/graph/${u}?view=human`,agentProfileUrl:`${process.env.NEXTAUTH_URL||"http://localhost:3000"}/graph/${u}?view=agent`,structuredJsonUrl:`${process.env.NEXTAUTH_URL||"http://localhost:3000"}/graph/${u}?view=json`},aiProvider:a.provider};{let{createClient:e}=await t.e(370).then(t.bind(t,7933)),r=e("https://your-project-id.supabase.co",process.env.SUPABASE_SERVICE_ROLE_KEY);await r.from("resumes").insert({user_id:o.sub,talent_data:d})}return i.NextResponse.json(d)}catch(e){return console.error("Process error:",e),i.NextResponse.json({error:"处理失败，请重试"},{status:500})}}let d=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/process-resume/route",pathname:"/api/process-resume",filename:"route",bundlePath:"app/api/process-resume/route"},resolvedPagePath:"C:\\Users\\AprilWu\\Documents\\trae_projects\\newboss\\app\\api\\process-resume\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:v}=d,x="/api/process-resume/route";function h(){return(0,a.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:m})}},2511:(e,r,t)=>{t.d(r,{Ny:()=>i,eC:()=>p,fW:()=>a});var o=t(4214);let s={openai:{provider:"openai",apiKey:process.env.OPENAI_API_KEY||"",baseURL:process.env.OPENAI_API_BASE_URL||"https://api.openai.com/v1",model:"gpt-4o-mini"},deepseek:{provider:"deepseek",apiKey:process.env.DEEPSEEK_API_KEY||"",baseURL:process.env.DEEPSEEK_API_BASE_URL||"https://api.deepseek.com/v1",model:"deepseek-chat"}},n=process.env.DEFAULT_AI_PROVIDER||"deepseek";async function a(e,r){let t=r||n,a=s[t];if(!a.apiKey)return{success:!1,content:"",provider:t,error:`${t} API Key 未配置`};try{let r=new o.ZP({apiKey:a.apiKey,baseURL:a.baseURL}),s=await r.chat.completions.create({model:a.model,messages:e,temperature:.7,max_tokens:4e3}),n=s.choices[0]?.message?.content||"";return{success:!0,content:n,provider:t}}catch(e){return{success:!1,content:"",provider:t,error:e instanceof Error?e.message:"未知错误"}}}async function i(e,r){return a([{role:"system",content:"你是一位专业的人才分析师，擅长将简历转换为结构化数据。"},{role:"user",content:`
你是一位专业的人才分析师，请将以下简历内容转换为结构化的人才图谱数据。

简历内容：
${e}

请输出严格的 JSON 格式，包含以下字段：
{
  "identity": {
    "name": "姓名",
    "role": "职位",
    "location": "城市",
    "availability": "looking|open|not-looking",
    "preferences": ["偏好1", "偏好2"]
  },
  "capabilities": [
    {
      "id": "cap-xxx",
      "name": "能力名称",
      "level": "expert|strong|moderate|basic",
      "category": "分类",
      "evidenceIds": ["evi-xxx"],
      "description": "描述"
    }
  ],
  "evidence": [
    {
      "id": "evi-xxx",
      "type": "company|project|education|certificate|portfolio",
      "title": "标题",
      "organization": "组织",
      "period": "时间",
      "description": "描述",
      "capabilities": ["相关能力名称"]
    }
  ],
  "boundaries": {
    "strong": ["强项1", "强项2"],
    "moderate": ["中等1", "中等2"],
    "weak": ["弱项1", "弱项2"],
    "collaboration": ["协作条件"]
  },
  "matching": {
    "idealProjects": ["理想项目1"],
    "avoidProjects": ["避免项目1"],
    "independenceLevel": "独立程度描述",
    "riskFactors": ["风险1"]
  }
}

注意：
1. 所有字段都必须填写，不能为空
2. 能力等级：expert（精通）、strong（熟练）、moderate（一般）、basic（基础）
3. availability：looking（积极求职）、open（开放机会）、not-looking（暂不考虑）
4. 输出必须是纯 JSON，不要包含其他文字
  `.trim()}],r)}async function p(e,r,t){return a([{role:"system",content:"你是一位专业的人才匹配分析师，擅长评估人才与项目的匹配度。"},{role:"user",content:`
你是一位专业的人才匹配分析师。请根据以下人才数据和项目需求，进行匹配分析。

人才数据：
${e}

项目需求：
${r}

请输出严格的 JSON 格式分析报告：
{
  "overallScore": 85,
  "strengths": [
    { "capability": "能力名称", "evidence": "证据说明" }
  ],
  "gaps": ["缺口1", "缺口2"],
  "risks": ["风险1", "风险2"],
  "recommendation": "highly-recommended|recommended|consider|not-recommended",
  "collaborationSuggestion": "合作建议",
  "detailedAnalysis": "详细分析"
}

评分标准：
- 80分以上：强烈推荐
- 60-79分：推荐
- 40-59分：考虑
- 40分以下：不推荐

输出必须是纯 JSON，不要包含其他文字。
  `.trim()}],t)}},6793:(e,r,t)=>{t.d(r,{LP:()=>o.LP});var o=t(9459)}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[276,972,214,459],()=>t(5167));module.exports=o})();