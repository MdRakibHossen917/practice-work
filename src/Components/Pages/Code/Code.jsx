import React, { useState } from 'react';

const Code = () => {
    const [activeTab, setActiveTab] = useState('typescript');
    const [copied, setCopied] = useState(false);

    const codeSnippets = {
        typescript: `# npm install @vapi-ai/server-sdk
import { VapiClient } from '@vapi-ai/server-sdk';

const vapi = new VapiClient({
    token: 'YOUR_PRIVATE_API_KEY' // Get your private api key from the dashboard
});

async function createCall() {
    const call = await vapi.calls.create({
        phoneNumberId: 'YOUR_PHONE_NUMBER_ID', // Create a free phone number in the dashboard
        customer: { number: '+1234567890' }, // Your customer's phone number
        assistant: {
            model: {
                provider: 'openai',
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant. Keep your responses concise and friendly.'
                    }
                ]
            }
        }
    });
}`,
        python: `# Python code snippet would go here
from vapi import VapiClient

vapi = VapiClient(token='YOUR_PRIVATE_API_KEY')

def create_call():
    call = vapi.calls.create({
        'phone_number_id': 'YOUR_PHONE_NUMBER_ID',
        'customer': {'number': '+1234567890'},
        'assistant': {
            'model': {
                'provider': 'openai',
                'model': 'gpt-4o'
            }
        }
    })
    return call`,
        curl: `# cURL code snippet would go here
curl -X POST https://api.vapi.ai/v1/calls \\
    -H "Authorization: Bearer YOUR_PRIVATE_API_KEY" \\
    -H "Content-Type: application/json" \\
    -d '{
        "phoneNumberId": "YOUR_PHONE_NUMBER_ID",
        "customer": {"number": "+1234567890"},
        "assistant": {
            "model": {
                "provider": "openai",
                "model": "gpt-4o"
            }
        }
    }'`,
        react: `// React (web SDK) code snippet would go here
import { useVapi } from '@vapi-ai/react-sdk';

function MyComponent() {
    const { call, startCall } = useVapi();
    
    const handleStartCall = () => {
        startCall({
            phoneNumberId: 'YOUR_PHONE_NUMBER_ID',
            customer: { number: '+1234567890' },
            assistant: {
                model: {
                    provider: 'openai',
                    model: 'gpt-4o'
                }
            }
        });
    };
    
    return <button onClick={handleStartCall}>Start Call</button>;
}`
    };

    const copyToClipboard = async () => {
        try {
            // Using document.execCommand('copy') for better compatibility in iframes
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = codeSnippets[activeTab];
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const TabButton = ({ language, label, color, icon }) => (
        <button
            onClick={() => setActiveTab(language)}
            className={`relative rounded-full font-medium transition flex items-center justify-center px-4 md:px-5 py-2 text-[.9375rem] gap-2 group ${
                activeTab === language 
                    ? 'text-white' 
                    : 'text-gray-300 hover:bg-gray-900'
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
        >
            {icon}
            <span className="absolute inset-0 z-10 bg-blue-600 mix-blend-difference rounded-full"
                    style={{ 
                        borderRadius: '9999px', 
                        opacity: activeTab === language ? 1 : 0 
                    }}></span>
            {label}
        </button>
    );

    return (
        <div className="border-gray-800 border pb-20 md:pb-30" 
              style={{
                background: '#111',
                backgroundImage: `
                    linear-gradient(35deg, hsla(0, 0%, 7%, 1), 80%, hsla(0, 0%, 7%, 0.6)),
                    linear-gradient(transparent calc(50% - 1px), #fff 1px, transparent calc(50% + 1px) 100%),
                    linear-gradient(to right, transparent calc(50% - 1px), #fff 1px, transparent calc(50% + 1px) 100%)
                `,
                backgroundSize: '10vw 10vw, 10vw 10vw, 10vw 10vw'
              }}>
            <div className="container px-2">
                <div className="bg-gray-900 border-gray-800 flex justify-between border-x">
                    <div className="flex">
                        <svg className="shrink-0 -rotate-45" fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="19.5" stroke="#27272A"></circle>
                            <rect height="2" stroke="#3F3F46" width="21" x="9.5" y="19.5"></rect>
                        </svg>
                        <svg className="shrink-0" fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="19.5" stroke="#27272A"></circle>
                            <rect height="2" stroke="#3F3F46" width="21" x="9.5" y="19.5"></rect>
                        </svg>
                    </div>
                    
                    <div className="border-gray-800 w-[10%] border-r md:w-[30%]"></div>
                    
                    <div className="flex flex-1">
                        <div className="flex flex-2 items-center gap-2 px-4 md:flex-3">
                            <div className="border-gray-800 h-3 flex-1 rounded-full border sm:w-[30%] sm:flex-none"></div>
                            <div className="border-gray-800 size-3 rounded-full border"></div>
                            <div className="border-gray-800 hidden size-3 rounded-full border sm:block"></div>
                        </div>
                        
                        <div className="border-gray-800 flex flex-1 items-center justify-between gap-2 border-x px-4">
                            <div className="flex gap-2">
                                <div className="border-gray-800 size-3 rounded-full border"></div>
                                <div className="border-gray-800 hidden size-3 rounded-full border sm:block"></div>
                                <div className="border-gray-800 hidden size-3 rounded-full border xl:block"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="border-gray-800 size-3 rounded-full border"></div>
                                <div className="border-gray-800 hidden size-3 rounded-full border sm:block"></div>
                                <div className="border-gray-800 hidden size-3 rounded-full border xl:block"></div>
                            </div>
                        </div>
                        
                        <div className="flex flex-1 items-center justify-between gap-2 px-4">
                            <div className="flex gap-2">
                                <div className="border-gray-800 size-3 rounded-full border"></div>
                                <div className="border-gray-800 hidden size-3 rounded-full border sm:block"></div>
                            </div>
                            <div className="border-gray-800 size-3 rounded-full border"></div>
                        </div>
                    </div>
                </div>

                <div className="border-gray-800 bg-gray-900 border p-2">
                    <div className="border-gray-800 border">
                        <div className="overflow-auto thin-scrollbar gap-2 border-gray-800 flex items-center md:gap-4 md:px-8 py-4 border-y-0 px-4">
                            <TabButton
                                language="typescript"
                                label="TypeScript"
                                color="#00d8ff"
                                icon={
                                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" role="presentation" xmlns="http://www.w3.org/2000/svg" 
                                        className={`size-6 ${activeTab === 'typescript' ? 'text-[#00d8ff]' : 'text-gray-500 group-hover:text-[#00d8ff]'}`}>
                                        <path d="M12.0028 21C11.7547 21 11.5232 20.9339 11.3082 20.8181L9.10887 19.5117C8.77814 19.3298 8.94351 19.2637 9.04273 19.2306C9.48921 19.0818 9.5719 19.0487 10.0349 18.7841C10.0845 18.751 10.1507 18.7676 10.2003 18.8006L11.887 19.8094C11.9532 19.8424 12.0358 19.8424 12.0854 19.8094L18.6835 15.9894C18.7497 15.9564 18.7827 15.8902 18.7827 15.8075V8.1842C18.7827 8.10152 18.7497 8.03537 18.6835 8.0023L12.0854 4.1989C12.0193 4.16582 11.9366 4.16582 11.887 4.1989L5.28894 8.0023C5.22279 8.03537 5.18972 8.11805 5.18972 8.1842V15.8075C5.18972 15.8737 5.22279 15.9564 5.28894 15.9894L7.09142 17.0312C8.06707 17.5273 8.67892 16.9486 8.67892 16.3698V8.84566C8.67892 8.74644 8.76161 8.64722 8.87736 8.64722H9.72072C9.81994 8.64722 9.91916 8.7299 9.91916 8.84566V16.3698C9.91916 17.6762 9.20809 18.4368 7.96785 18.4368C7.58751 18.4368 7.28986 18.4368 6.44649 18.0234L4.71016 17.0312C4.28021 16.7832 4.01562 16.3202 4.01562 15.8241V8.20074C4.01562 7.70464 4.28021 7.24162 4.71016 6.99357L11.3082 3.17363C11.7216 2.94212 12.2839 2.94212 12.6973 3.17363L19.2954 6.99357C19.7253 7.24162 19.9899 7.70464 19.9899 8.20074V15.8241C19.9899 16.3202 19.7253 16.7832 19.2954 17.0312L12.6973 20.8512C12.4823 20.9504 12.2343 21 12.0028 21ZM14.0368 15.7579C11.1429 15.7579 10.5476 14.435 10.5476 13.3105C10.5476 13.2113 10.6302 13.1121 10.746 13.1121H11.6059C11.7051 13.1121 11.7878 13.1782 11.7878 13.2774C11.9201 14.1539 12.3004 14.5838 14.0533 14.5838C15.4424 14.5838 16.0377 14.2696 16.0377 13.5255C16.0377 13.0955 15.8723 12.7814 13.706 12.5664C11.9035 12.3845 10.7791 11.9876 10.7791 10.5489C10.7791 9.20946 11.9035 8.41571 13.7887 8.41571C15.9054 8.41571 16.9472 9.14332 17.0795 10.7308C17.0795 10.7804 17.0629 10.83 17.0299 10.8797C16.9968 10.9127 16.9472 10.9458 16.8976 10.9458H16.0377C15.955 10.9458 15.8723 10.8797 15.8558 10.797C15.6573 9.88746 15.1447 9.5898 13.7887 9.5898C12.2673 9.5898 12.0854 10.119 12.0854 10.5158C12.0854 10.9954 12.3004 11.1442 14.3509 11.4088C16.3849 11.6734 17.3441 12.0537 17.3441 13.4759C17.3275 14.9311 16.1369 15.7579 14.0368 15.7579Z" fill="currentColor"></path>
                                    </svg>
                                }
                            />
                             <TabButton
                                language="python"
                                label="Python"
                                color="#3572a5"
                                icon={
                                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" role="presentation" xmlns="http://www.w3.org/2000/svg" 
                                        className={`size-6 ${activeTab === 'python' ? 'text-[#3572a5]' : 'text-gray-500 group-hover:text-[#3572a5]'}`}>
                                        <path d="M11.999 18.001C11.999 18.552 11.551 19.001 10.999 19.001H7.99902C6.91502 19.001 6.00002 18.106 6.00002 17.001V13.001H8.99902C9.55002 13.001 9.99902 12.552 9.99902 12.001V11.001H7.00002V9.00098H9.99902V8.00098C9.99902 7.44998 10.448 7.00098 10.999 7.00098H13.999C15.083 7.00098 15.998 7.89598 15.998 8.99998V12.001H12.999C12.448 12.001 11.999 12.45 11.999 13.001V18.001Z" fill="currentColor"></path>
                                        <path d="M15.999 7.00098C15.999 6.44998 15.551 5.99998 14.999 5.99998H11.999C10.915 5.99998 10.0001 6.89498 10.0001 7.99998V11.999H12.999C13.55 11.999 13.999 11.551 13.999 10.999V9.999H17V12.999H13.999V13.999C13.999 14.55 13.55 14.999 12.999 14.999H10.0001C8.91605 14.999 8.00105 14.104 8.00105 12.999V8.99998H5.00005V10.999H8.00105V12.999H5.00005V15.999C5.00005 17.083 5.89505 18.001 6.99905 18.001H15.999V7.00098Z" fill="currentColor"></path>
                                    </svg>
                                }
                            />
                             <TabButton
                                language="curl"
                                label="cURL"
                                color="#252525"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="none" role="presentation"
                                        className={`size-6 ${activeTab === 'curl' ? 'text-[#a1a1aa]' : 'text-gray-500 group-hover:text-[#a1a1aa]'}`}>
                                        <path d="M12 11C12.5523 11 13 10.5523 13 10V6.5C13 5.94772 12.5523 5.5 12 5.5H8.5C7.94772 5.5 7.5 5.94772 7.5 6.5V7C7.5 7.55228 7.94772 8 8.5 8H11.5V10C11.5 10.5523 11.9477 11 12 11ZM12 11C12.5523 11 13 11.4477 13 12V15.5C13 16.0523 12.5523 16.5 12 16.5H8.5C7.94772 16.5 7.5 16.0523 7.5 15.5V15C7.5 14.4477 7.94772 14 8.5 14H11.5V12C11.5 11.4477 11.9477 11 12 11ZM15 11C15.5523 11 16 10.5523 16 10V6.5C16 5.94772 15.5523 5.5 15 5.5H18.5C19.0523 5.5 19.5 5.94772 19.5 6.5V7C19.5 7.55228 19.0523 8 18.5 8H15.5V10C15.5 10.5523 15.9477 11 16 11H15ZM15 11C15.5523 11 16 11.4477 16 12V15.5C16 16.0523 15.5523 16.5 15 16.5H18.5C19.0523 16.5 19.5 16.0523 19.5 15.5V15C19.5 14.4477 19.0523 14 18.5 14H15.5V12C15.5 11.4477 15.9477 11 16 11H15ZM12 13C12.5523 13 13 13.4477 13 14V17.5C13 18.0523 12.5523 18.5 12 18.5H8.5C7.94772 18.5 7.5 18.0523 7.5 17.5V17C7.5 16.4477 7.94772 16 8.5 16H11.5V14C11.5 13.4477 11.9477 13 12 13ZM12 13C12.5523 13 13 13.4477 13 14V17.5C13 18.0523 12.5523 18.5 12 18.5H8.5C7.94772 18.5 7.5 18.0523 7.5 17.5V17C7.5 16.4477 7.94772 16 8.5 16H11.5V14C11.5 13.4477 11.9477 13 12 13Z" fill="currentColor"></path>
                                    </svg>
                                }
                            />
                            <TabButton
                                language="react"
                                label="React"
                                color="#61DBFB"
                                icon={
                                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" role="presentation" xmlns="http://www.w3.org/2000/svg" 
                                        className={`size-6 ${activeTab === 'react' ? 'text-[#61DBFB]' : 'text-gray-500 group-hover:text-[#61DBFB]'}`}>
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.4-.41-4.43-1.78-6.02-3.69l1.85-1.1c1.32 1.41 2.94 2.45 4.7 3.01v1.78zm4.49-1.28c1.39-2.02 2.2-4.43 2.2-7.15h-1.63c-.1 2.44-.94 4.54-2.3 6.3l1.73.85zM12 4.07V6c1.36.21 2.58.74 3.65 1.54l1.19-1.62C15.65 4.86 13.93 4.22 12 4.07zM4.09 12c0-2.61.8-5.01 2.19-7.05L7.91 6.5c-1.25 1.4-2.05 3.32-2.05 5.5s.8 4.1 2.05 5.5l-1.63 1.55C4.89 17.01 4.09 14.61 4.09 12zm2.3-4.15l1.73-.85c1.36 1.76 2.2 3.86 2.3 6.3h1.63c0-2.72-.81-5.13-2.2-7.15L6.39 7.85z" fill="currentColor"></path>
                                    </svg>
                                }
                            />
                        </div>

                        <section className="border-gray-800 max-h-[35lh] overflow-auto border-y p-4 md:p-8">
                            <div className="thin-scrollbar overflow-auto">
                                <pre className="bg-gray-900 p-0 m-0 text-xs leading-6">
                                    <code className="language-typescript whitespace-pre">
                                        {codeSnippets[activeTab].split('\n').map((line, index) => (
                                            <div key={index} className="flex">
                                                <span className="inline-block min-w-[2.0625rem] pr-0 text-left select-none sticky left-0 w-[2.0625rem] text-gray-500 bg-gray-900">
                                                    {index + 1}
                                                </span>
                                                <span>{line}</span>
                                            </div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                        </section>

                        <div className="flex flex-wrap justify-between gap-3 px-5 py-4 text-[.9375rem] leading-6 font-medium text-[#D9E6EF]">
                            <div className="flex flex-wrap items-center gap-2">
                                <button 
                                    onClick={copyToClipboard}
                                    className="group relative flex items-center gap-2 rounded-full px-4 py-1.5 text-[.8125rem] bg-white/[0.08] hover:bg-white/[0.12] transition-colors"
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Code;
