var _CacheMap_limit,module_,STATUS,configuration_table,lenfix,distfix,State,Special,ElementType,EntityLevel,DecodingMode,EncodingMode,DocumentPosition,FeedItemMediaMedium,FeedItemMediaExpression,_CTR_key,_CTR_state,_Mutex_untilUnlock,_PartStream_buffer,_PartStream_totalRead,_PartStream_part,_Queue_instances,_Queue_logger,_Queue_busy,_Queue_check,_ConnectionWebSocket_instances,_ConnectionWebSocket_webSocket,_ConnectionWebSocket_rMutex,_ConnectionWebSocket_wMutex,_ConnectionWebSocket_buffer,_ConnectionWebSocket_nextResolve,_ConnectionWebSocket_initWs,_ConnectionWebSocket_wasConnected,_ConnectionWebSocket_isConnecting,_ConnectionWebSocket_connectionError,_ConnectionWebSocket_assertConnected,_ConnectionWebSocket_rejectRead,ValueType,_StorageIndexedDB_instances,_StorageIndexedDB_name,_StorageIndexedDB_id,_StorageIndexedDB_supportsFiles,_StorageIndexedDB_fixKey,_StorageLocalStorage_prefix,_StorageMemory_instances,_StorageMemory_id,_StorageMemory_fixKey,_StorageMemory_getEntries,_StorageSessionStorage_prefix,_TransportAbridged_initialized,_TransportAbridged_connection,_TransportAbridged_obfuscated,_TransportIntermediate_connection,_TransportIntermediate_initialized,_TransportIntermediate_obfuscated,FileType,FileTypeClass,PhotoSourceType,_ClientAbstract_dc,_ClientEncrypted_instances,_ClientEncrypted_authKey,_ClientEncrypted_authKeyId,_ClientEncrypted_sessionId,_ClientEncrypted_state,_ClientEncrypted_toAcknowledge,_ClientEncrypted_recentAcks,_ClientEncrypted_promises,_ClientEncrypted_L,_ClientEncrypted_LreceiveLoop,_ClientEncrypted_Linvoke,_ClientEncrypted_nextMessageId,_ClientEncrypted_nextSeqNo,_ClientEncrypted_sendMessage,_ClientEncrypted_receiveLoop,_ClientPlain_publicKeys,_ClientPlain_lastMsgId,_AccountManager_instances,_AccountManager_c,_AccountManager_toggleUsername,_BotInfoManager_instances,_BotInfoManager_c,_BotInfoManager_setMyInfo,_BotInfoManager_getMyInfo,_BusinessConnectionManager_c,_Composer_handle,_Composer_prefixes,_FileManager_instances,_a,_FileManager_c,_FileManager_Lupload,_FileManager_UPLOAD_MAX_CHUNK_SIZE,_FileManager_DOWNLOAD_MAX_CHUNK_SIZE,_FileManager_BIG_FILE_THRESHOLD,_FileManager_UPLOAD_REQUEST_PER_CONNECTION,_FileManager_uploadStream,_FileManager_uploadBuffer,_FileManager_handleUploadError,_FileManager_getFileContents,_FileManager_CUSTOM_EMOJI_TTL,_NetworkStatisticsManager_c,_ReactionManager_c,_UpdateManager_instances,_a2,_UpdateManager_c,_UpdateManager_updateState,_UpdateManager_updateHandler,_UpdateManager_LrecoverUpdateGap,_UpdateManager_LrecoverChannelUpdateGap,_UpdateManager_L$handleUpdate,_UpdateManager_L$processUpdates,_UpdateManager_LfetchState,_UpdateManager_defaultDropPendingUpdates,_UpdateManager_mustDropPendingUpdates,_UpdateManager_state,_UpdateManager_getState,_UpdateManager_setState,_UpdateManager_handleUpdateQueues,_UpdateManager_nonFirst,_UpdateManager_getChannelPtsWithDropPendingUpdatesCheck,_UpdateManager_checkGap,_UpdateManager_checkGapQts,_UpdateManager_checkChannelGap,_UpdateManager_channelUpdateQueues,_UpdateManager_processChannelPtsUpdateInner,_UpdateManager_queueUpdate,_UpdateManager_processChannelPtsUpdate,_UpdateManager_processPtsUpdateInner,_UpdateManager_ptsUpdateQueue,_UpdateManager_processPtsUpdate,_UpdateManager_processQtsUpdateInner,_UpdateManager_qtsUpdateQueue,_UpdateManager_processQtsUpdate,_UpdateManager_processUpdatesQueue,_UpdateManager_processUpdates,_UpdateManager_setUpdateStateDate,_UpdateManager_setUpdatePts,_UpdateManager_setUpdateQts,_UpdateManager_getLocalState,_UpdateManager_recoverChannelUpdateGap,_UpdateManager_handleUpdatesSet,_UpdateManager_handleStoredUpdates,_UpdateManager_handleUpdate,_MessageManager_instances,_MessageManager_c,_MessageManager_LresolveFileId,_MessageManager_updatesToMessages,_MessageManager_constructReplyMarkup,_MessageManager_resolveSendAs,_MessageManager_constructReplyTo,_MessageManager_sendDocumentInner,_MessageManager_sendMedia,_MessageManager_resolveInputMediaInner,_MessageManager_resolveInputMedia,_MessageManager_sendReaction,_MessageManager_toggleJoinRequests,_CallbackQueryManager_instances,_a3,_CallbackQueryManager_c,_CallbackQueryManager_enc,_CallbackQueryManager_isExpired,_CallbackQueryManager_getPasswordCheck,_ChatListManager_instances,_ChatListManager_c,_ChatListManager_LgetChats,_ChatListManager_sendChatUpdate,_ChatListManager_chats,_ChatListManager_archivedChats,_ChatListManager_chatsLoadedFromStorage,_ChatListManager_tryGetChatId,_ChatListManager_getChatAnywhere,_ChatListManager_getChatList,_ChatListManager_loadChatsFromStorage,_ChatListManager_getLoadedChats,_ChatListManager_pinnedChats,_ChatListManager_pinnedArchiveChats,_ChatListManager_storageHadPinnedChats,_ChatListManager_pinnedChatsLoaded,_ChatListManager_loadPinnedChats,_ChatListManager_fetchPinnedChats,_ChatListManager_getPinnedChats,_ChatListManager_updateOrAddChat,_ChatListManager_removeChat,_ChatListManager_handleUpdateFolderPeers,_ChatListManager_handleUpdatePinnedDialogs,_ChatListManager_handleUpdateChannel,_ChatListManager_handleUpdateChat,_ChatListManager_handleUpdateUser,_ChatListManager_fetchChats,_ChatListManager_getFullChat,_a4,_InlineQueryManager_c,_InlineQueryManager_isExpired,_StoryManager_instances,_StoryManager_c,_StoryManager_updatesToStory,_StoryManager_togglePinned,_VideoChatManager_instances,_VideoChatManager_c,_VideoChatManager_createGroupCall,_VideoChatManager_getInputGroupCall,_VideoChatManager_getCall,_StorageOperations_instances,_StorageOperations_storage,_StorageOperations_supportsFiles,_StorageOperations_mustSerialize,_StorageOperations_authKeyId,_StorageOperations_resetAuthKeyId,_StorageOperations_accountId,_StorageOperations_accountType,_StorageOperations_getUpdateId,_Client_instances,_a5,_Client_client,_Client_guaranteeUpdateDelivery,_Client_updateManager,_Client_networkStatisticsManager,_Client_botInfoManager,_Client_fileManager,_Client_reactionManager,_Client_videoChatManager,_Client_businessConnectionManager,_Client_messageManager,_Client_storyManager,_Client_callbackQueryManager,_Client_inlineQueryManager,_Client_chatListManager,_Client_accountManager,_Client_storage_,_Client_messageStorage_,_Client_parseMode,_Client_apiId,_Client_apiHash,_Client_publicKeys,_Client_ignoreOutgoing,_Client_persistCache,_Client_LsignIn,_Client_LpingLoop,_Client_LhandleMigrationError,_Client_L$initConncetion,_Client_namespaceProxies,_Client_getApiId,_Client_getCdnConnectionPool,_Client_getCdnConnection,_Client_constructContext,_Client_propagateConnectionState,_Client_lastPropagatedConnectionState,_Client_stateChangeHandler,_Client_storageInited,_Client_initStorage,_Client_connectionInited,_Client_lastPropagatedAuthorizationState,_Client_propagateAuthorizationState,_Client_getSelfId,_Client_pingLoopStarted,_Client_pingLoopAbortController,_Client_pingInterval,_Client_lastUpdates,_Client_startPingLoop,_Client_pingLoop,_Client_invoke,_Client_handleInvokeError,_Client_getUserAccessHash,_Client_getChannelAccessHash,_Client_getInputPeerInner,_Client_handleCtxUpdate,_Client_queueHandleCtxUpdate,_Client_handleUpdate,_Client_lastGetMe,_Client_getMe,__defProp=Object.defineProperty,__export=(e,t)=>{for(var a in t)__defProp(e,a,{get:t[a],enumerable:!0})},MtkrutoError=class extends Error{},ConnectionError=class extends MtkrutoError{},AccessError=class extends MtkrutoError{},InputError=class extends MtkrutoError{},TransportError=class extends MtkrutoError{constructor(e){super(`Transport error: ${e}`),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:e})}};function modExp(e,t,a){let r=1n,i=e%=a;for(;t>0n;){let s=t%2n;t/=2n,1n==s&&(r*=i,r%=a),i*=i,i%=a}return r}function mod(e,t){return(e%t+t)%t}function bigIntFromBuffer(e,t=!0,a=!1){let r=e,i=r.length;t&&(r=r.reverse());let s=BigInt("0x"+[...r].map(e=>e.toString(16).padStart(2,"0")).join(""));return a&&Math.floor(s.toString(2).length/8)>=i&&(s-=2n**BigInt(8*i)),s}function getRandomBigInt(e,t,a){let r=new Uint8Array(e);return crypto.getRandomValues(r),bigIntFromBuffer(r,t,a)}function getRandomId(e){return e?Number(getRandomBigInt(4,!0,!0)):getRandomBigInt(8,!0,!0)}function gcd(e,t){if(0n==e)return t;for(;(1n&e)==0n;)e>>=1n;for(;;)if(e>t)for(e=e-t>>1n;(1n&e)==0n;)e>>=1n;else if(!(t>e))return e;else for(t=t-e>>1n;(1n&t)==0n;)t>>=1n}var bufferFromHexString=e=>Uint8Array.from(e.match(/.{1,2}/g).map(e=>parseInt(e,16)));function bufferFromBigInt(e,t,a=!0,r=!1){let i=Math.ceil(e.toString(2).length/8);if(t<i)throw Error("Int too big");if(4==t||2==t){let s=new Uint8Array(t),n=new DataView(s.buffer);return(2==t?r?n.setInt16:n.setUint16:r?n.setInt32:n.setUint32).call(n,0,Number(e),a),s}if(e=BigInt("number"==typeof e?Math.ceil(e):e),8==t){let o=new Uint8Array(t),l=new DataView(o.buffer);return(r?l.setBigInt64:l.setBigUint64).call(l,0,e,a),o}if(!r&&e<0n)throw Error("Got unexpected signed int");r&&e<0n&&(e=2n**BigInt(8*t)+e);let u=e.toString(16).padStart(2*t,"0"),c=bufferFromHexString(u);return a&&c.reverse(),c}var __classPrivateFieldSet=function(e,t,a,r,i){if("m"===r)throw TypeError("Private method is not writable");if("a"===r&&!i)throw TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!i:!t.has(e))throw TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?i.call(e,a):i?i.value=a:t.set(e,a),a},__classPrivateFieldGet=function(e,t,a,r){if("a"===a&&!r)throw TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!r:!t.has(e))throw TypeError("Cannot read private member from an object whose class did not declare it");return"m"===a?r:"a"===a?r.call(e):r?r.value:t.get(e)},CacheMap=class extends Map{constructor(e,t){if(super(t),_CacheMap_limit.set(this,void 0),!e||e<1)throw Error("Invalid size");__classPrivateFieldSet(this,_CacheMap_limit,e,"f")}set(e,t){return super.set(e,t),this.size>__classPrivateFieldGet(this,_CacheMap_limit,"f")&&this.delete(this.keys().next().value),this}};function getColorFromPeerId(e){return(e=Number(String(e).replaceAll("-100","-")))<0&&(e=-e),Math.floor(e%7)}function getColorName(e){switch(e){case 0:return"red";case 1:return"orange";case 2:return"violet";case 3:return"green";case 4:return"cyan";case 5:default:return"blue";case 6:return"pink";case 7:return"combination 1";case 8:return"combination 2";case 9:return"combination 3";case 10:return"combination 4";case 11:return"combination 5";case 12:return"combination 6";case 13:return"combination 7";case 14:return"combination 8";case 15:return"combination 9";case 16:return"combination 10";case 17:return"combination 11";case 18:return"combination 12";case 19:return"combination 13";case 20:return"combination 14"}}_CacheMap_limit=new WeakMap;var AssertionError=class extends Error{constructor(e){super(e),this.name="AssertionError"}};function isKeyedCollection(e){return[Symbol.iterator,"size"].every(t=>t in e)}function constructorsEqual(e,t){return e.constructor===t.constructor||e.constructor===Object&&!t.constructor||!e.constructor&&t.constructor===Object}function equal(e,t){let a=new Map;return function e(t,r){if(t&&r&&(t instanceof RegExp&&r instanceof RegExp||t instanceof URL&&r instanceof URL))return String(t)===String(r);if(t instanceof Date&&r instanceof Date){let i=t.getTime(),s=r.getTime();return!!(Number.isNaN(i)&&Number.isNaN(s))||i===s}if("number"==typeof t&&"number"==typeof r)return Number.isNaN(t)&&Number.isNaN(r)||t===r;if(Object.is(t,r))return!0;if(t&&"object"==typeof t&&r&&"object"==typeof r){if(t&&r&&!constructorsEqual(t,r))return!1;if(t instanceof WeakMap||r instanceof WeakMap){if(!(t instanceof WeakMap&&r instanceof WeakMap))return!1;throw TypeError("cannot compare WeakMap instances")}if(t instanceof WeakSet||r instanceof WeakSet){if(!(t instanceof WeakSet&&r instanceof WeakSet))return!1;throw TypeError("cannot compare WeakSet instances")}if(a.get(t)===r)return!0;if(Object.keys(t||{}).length!==Object.keys(r||{}).length)return!1;if(a.set(t,r),isKeyedCollection(t)&&isKeyedCollection(r)){if(t.size!==r.size)return!1;let n=t.size;for(let[o,l]of t.entries())for(let[u,c]of r.entries())if(o===l&&u===c&&e(o,u)||e(o,u)&&e(l,c)){n--;break}return 0===n}let d={...t,...r};for(let g of[...Object.getOwnPropertyNames(d),...Object.getOwnPropertySymbols(d)])if(!e(t&&t[g],r&&r[g])||g in t&&!(g in r)||g in r&&!(g in t))return!1;return!(t instanceof WeakRef||r instanceof WeakRef)||!!(t instanceof WeakRef&&r instanceof WeakRef)&&e(t.deref(),r.deref())}return!1}(e,t)}var dntGlobals={},dntGlobalThis=createMergeProxy(globalThis,dntGlobals);function createMergeProxy(e,t){return new Proxy(e,{get:(a,r,i)=>r in t?t[r]:e[r],set:(a,r,i)=>(r in t&&delete t[r],e[r]=i,!0),deleteProperty(a,r){let i=!1;return r in t&&(delete t[r],i=!0),r in e&&(delete e[r],i=!0),i},ownKeys(a){let r=Reflect.ownKeys(e),i=Reflect.ownKeys(t),s=new Set(i);return[...r.filter(e=>!s.has(e)),...i]},defineProperty:(a,r,i)=>(r in t&&delete t[r],Reflect.defineProperty(e,r,i),!0),getOwnPropertyDescriptor:(a,r)=>r in t?Reflect.getOwnPropertyDescriptor(t,r):Reflect.getOwnPropertyDescriptor(e,r),has:(a,r)=>r in t||r in e})}function format(e){let{Deno:t}=dntGlobalThis;return"function"==typeof t?.inspect?t.inspect(e,{depth:1/0,sorted:!0,trailingComma:!0,compact:!1,iterableLimit:1/0,getters:!0,strAbbreviateSize:1/0}):`"${String(e).replace(/(?=["\\])/g,"\\")}"`}var{Deno:Deno2}=dntGlobalThis,noColor="boolean"==typeof Deno2?.noColor&&Deno2.noColor,enabled=!noColor;function code(e,t){return{open:`\x1b[${e.join(";")}m`,close:`\x1b[${t}m`,regexp:RegExp(`\\x1b\\[${t}m`,"g")}}function run(e,t){return enabled?`${t.open}${e.replace(t.regexp,t.open)}${t.close}`:e}function bold(e){return run(e,code([1],22))}function red(e){return run(e,code([31],39))}function green(e){return run(e,code([32],39))}function white(e){return run(e,code([37],39))}function gray(e){return brightBlack(e)}function brightBlack(e){return run(e,code([90],39))}function bgRed(e){return run(e,code([41],49))}function bgGreen(e){return run(e,code([42],49))}var ANSI_PATTERN=RegExp("[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))","g"),DiffType={removed:"removed",common:"common",added:"added"},REMOVED=1,COMMON=2,ADDED=3;function createCommon(e,t,a){let r=[];if(0===e.length||0===t.length)return[];for(let i=0;i<Math.min(e.length,t.length);i+=1){let s=a?e[e.length-i-1]:e[i],n=a?t[t.length-i-1]:t[i];if(void 0!==s&&s===n)r.push(s);else break}return r}function ensureDefined(e){if(void 0===e)throw Error("Unexpected missing FarthestPoint");return e}function diff(e,t){let a=createCommon(e,t),r=createCommon(e.slice(a.length),t.slice(a.length),!0).reverse();e=r.length?e.slice(a.length,-r.length):e.slice(a.length),t=r.length?t.slice(a.length,-r.length):t.slice(a.length);let i=t.length>e.length;[e,t]=i?[t,e]:[e,t];let s=e.length,n=t.length;if(!s&&!n&&!r.length&&!a.length)return[];if(!n)return[...a.map(e=>({type:DiffType.common,value:e})),...e.map(e=>({type:i?DiffType.added:DiffType.removed,value:e})),...r.map(e=>({type:DiffType.common,value:e}))];let o=n,l=s-n,u=s+n+1,c=Array.from({length:u},()=>({y:-1,id:-1})),d=new Uint32Array((s*n+u+1)*2),g=d.length/2,p=0,m=-1;function $(e,t,a,r,i,s){let n=i.length,o=s.length;if(e<-o||n<e)return{y:-1,id:-1};let l=function e(t,a,r,i){if(t&&-1===t.y&&a&&-1===a.y)return{y:0,id:0};let s=a?.y===-1||r===i||(t?.y||0)>(a?.y||0)+1;if(t&&s){let n=t.id;return d[++p]=n,d[p+g]=ADDED,{y:t.y,id:p}}if(a&&!s){let o=a.id;return d[++p]=o,d[p+g]=REMOVED,{y:a.y+1,id:p}}throw Error("Unexpected missing FarthestPoint")}(t,a,e,n);for(;l.y+e<n&&l.y<o&&i[l.y+e]===s[l.y];){let u=l.id;p++,l.id=p,l.y+=1,d[p]=u,d[p+g]=COMMON}return l}let b=ensureDefined(c[l+o]);for(;b&&b.y<n;){m+=1;for(let f=-m;f<l;++f)c[f+o]=$(f,c[f-1+o],c[f+1+o],o,e,t);for(let v=l+m;v>l;--v)c[v+o]=$(v,c[v-1+o],c[v+1+o],o,e,t);c[l+o]=$(l,c[l-1+o],c[l+1+o],o,e,t),b=ensureDefined(c[l+o])}return[...a.map(e=>({type:DiffType.common,value:e})),...function e(t,a,r,i){let s=t.length,n=a.length,o=[],l=s-1,u=n-1,c=d[r.id],p=d[r.id+g];for(;c||p;){let m=c;p===REMOVED?(o.unshift({type:i?DiffType.removed:DiffType.added,value:a[u]}),u-=1):p===ADDED?(o.unshift({type:i?DiffType.added:DiffType.removed,value:t[l]}),l-=1):(o.unshift({type:DiffType.common,value:t[l]}),l-=1,u-=1),c=d[m],p=d[m+g]}return o}(e,t,b,i),...r.map(e=>({type:DiffType.common,value:e}))]}function diffstr(e,t){function a(e){return e.replaceAll("\b","\\b").replaceAll("\f","\\f").replaceAll("	","\\t").replaceAll("\v","\\v").replaceAll(/\r\n|\r|\n/g,e=>"\r"===e?"\\r":"\n"===e?"\\n\n":"\\r\\n\r\n")}function r(e,{wordDiff:t=!1}={}){if(t){let a=e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),r=/^[a-zA-Z\u{C0}-\u{FF}\u{D8}-\u{F6}\u{F8}-\u{2C6}\u{2C8}-\u{2D7}\u{2DE}-\u{2FF}\u{1E00}-\u{1EFF}]+$/u;for(let i=0;i<a.length-1;i++){let s=a[i],n=a[i+2];!a[i+1]&&s&&n&&r.test(s)&&r.test(n)&&(a[i]+=n,a.splice(i+1,2),i--)}return a.filter(e=>e)}{let o=[],l=e.split(/(\n|\r\n)/);for(let[u,c]of(l[l.length-1]||l.pop(),l.entries()))u%2?o[o.length-1]+=c:o.push(c);return o}}function i(e,t){return t.filter(({type:t})=>t===e.type||t===DiffType.common).map((e,t,a)=>{let r=a[t-1];return e.type===DiffType.common&&r&&r.type===a[t+1]?.type&&/\s+/.test(e.value)?{...e,type:r.type}:e})}let s=diff(r(`${a(e)}
`),r(`${a(t)}
`)),n=[],o=[];for(let l of s)l.type===DiffType.added&&n.push(l),l.type===DiffType.removed&&o.push(l);let u=n.length<o.length,c=u?o:n;for(let d of u?n:o){let g=[],p;for(;c.length;){p=c.shift();let m=[r(d.value,{wordDiff:!0}),r(p?.value??"",{wordDiff:!0})];if(u&&m.reverse(),(g=diff(m[0],m[1])).some(({type:e,value:t})=>e===DiffType.common&&t.trim().length))break}d.details=i(d,g),p&&(p.details=i(p,g))}return s}function createColor(e,{background:t=!1}={}){switch(t=!1,e){case DiffType.added:return e=>t?bgGreen(white(e)):green(bold(e));case DiffType.removed:return e=>t?bgRed(white(e)):red(bold(e));default:return white}}function createSign(e){switch(e){case DiffType.added:return"+   ";case DiffType.removed:return"-   ";default:return"    "}}function buildMessage(e,{stringDiff:t=!1}={}){let a=[],r=[];return a.push(""),a.push(""),a.push(`    ${gray(bold("[Diff]"))} ${red(bold("Actual"))} / ${green(bold("Expected"))}`),a.push(""),a.push(""),e.forEach(e=>{let t=createColor(e.type),a=e.details?.map(e=>e.type!==DiffType.common?createColor(e.type,{background:!0})(e.value):e.value).join("")??e.value;r.push(t(`${createSign(e.type)}${a}`))}),a.push(...t?[r.join("")]:r),a.push(""),a}var CAN_NOT_DISPLAY="[Cannot display]";function assertEquals(e,t,a,r={}){if(equal(e,t))return;let{formatter:i=format}=r,s=a?`: ${a}`:".",n=`Values are not equal${s}`,o=i(e),l=i(t);try{let u="string"==typeof e&&"string"==typeof t,c=u?diffstr(e,t):diff(o.split("\n"),l.split("\n")),d=buildMessage(c,{stringDiff:u}).join("\n");n=`${n}
${d}`}catch{n=`${n}
${red(CAN_NOT_DISPLAY)} + 
