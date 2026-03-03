onmessage=function(s){var t=s.data
switch(t.action){case"test":postMessage({action:"test",result:t.data instanceof Uint8Array})
break
case"test-transfers":postMessage({action:"test-transfers",result:255===t.data[0]})
break
case"xhr":var e=new XMLHttpRequest,a="response"in e
try{e.responseType}catch(s){a=!1}postMessage({action:"xhr",result:a})}}
