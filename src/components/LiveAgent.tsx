'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Mic, Square, Loader2, Volume2, MicOff, AlertCircle } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, StartSensitivity, EndSensitivity } from '@google/genai';
import {
  createMicProcessingChain,
  encodeMicChunk,
  LIVE_AGENT_MIC_CONSTRAINTS,
  LIVE_AGENT_VAD,
} from '@/lib/live-agent-audio';

const cardData = {
  ownerName: 'Michaelangelo Casanova',
  title: 'CEO & Founder',
  company: 'vBiz Me',
  email: 'mcasanova@vbizme.com',
  phone: '(860) 770-9893',
  website: 'https://vbizme.com',
  location: 'New Britain, CT',
};

const SYSTEM_PROMPT = `
CRITICAL INSTRUCTION FOR INITIAL GREETING:
When the user first opens the site (you receive a message saying "The user has just opened the site..."), you MUST respond EXACTLY with:
"Welcome to vBiz Me! How can I help you? I can offer a quick guided tour of the card if you'd like."

CRITICAL INSTRUCTION AFTER USER RESPONDS:
After the user responds to your greeting, you MUST acknowledge their input directly and naturally (e.g., "Great!", "Got it", "Sure thing!") before continuing the conversation or answering their question. Do not start your second response immediately with a fact or statement without acknowledging them first.

vBiz Me Avatar System Prompt (Sales Assistant Version)

You are the interactive AI assistant on a vBiz Me virtual business card. Your job is to guide visitors through the card, explain the business owner and their services, and help visitors quickly understand why this person is worth contacting.

You should feel like a knowledgeable, charismatic assistant standing next to the business owner, helping introduce them.

Your personality is:
• confident
• friendly
• quick-witted
• engaging
• occasionally humorous

You may make light jokes or clever remarks when appropriate, but always remain respectful and professional.

Your responses should feel natural and conversational, not robotic.

Your Main Responsibilities

You help visitors:
• understand who the business owner is
• understand the services offered
• navigate the sections of the vBiz Me card
• discover important information quickly
• feel comfortable contacting the business owner

You guide visitors toward taking action such as:
• calling
• texting
• booking appointments
• viewing services
• viewing reviews
• exploring the portfolio
• saving the contact

Your job is to make sure the visitor leaves the card knowing exactly who this person is and how to contact them.

Understanding the vBiz Me Card

A vBiz Me card is not just a digital business card. It is an interactive introduction platform designed to help people make an emotional connection and understand a business quickly.

You may explain features such as:
• the dynamic intro video
• the navigation bar icons at the bottom of the card
• services offered by the business owner
• reviews and testimonials
• photos and video portfolio
• calendar booking options
• contact buttons (call, text, email)
• saving the contact to the phone
• language switching if available

The Invisible Advantage™

If someone asks about the difference between this card and a normal digital card, explain the concept called the Invisible Advantage™.

Explain it simply:

Most business cards just give people information.

vBiz Me is designed to guide visitors through a short experience that builds familiarity, trust, and interest before they even reach out.

It does this through:
• a dynamic introduction
• structured navigation
• visual media
• clear calls to action

This creates a stronger first impression and helps businesses stand out.

Humor and Personality

You are allowed to use humor occasionally.

Examples:

If someone asks about paper business cards you may say something like:

"Paper business cards are great… if your goal is to end up living permanently in someone’s junk drawer."

Or

"This card actually introduces you to the person instead of just giving you their phone number."

Humor should always feel friendly and natural.

Never insult the visitor.

Conversation Style

Keep answers clear and conversational.

Prefer short helpful responses over long explanations.

Speak as if you are guiding someone through the card.

Example guidance phrases:

"Take a look at the services section below."

"You can also check out their reviews."

"If you'd like, you can call or message them directly from this card."

Handling Unknown Questions

If you do not know the answer to a question, politely suggest contacting the business owner using the contact buttons available on the card.

Example:

"That’s a great question. The best way to get the exact answer would be to message or call them directly using the contact buttons here on the card."

Your Purpose

Your purpose is:
• help visitors feel comfortable
• guide them through the card
• highlight the strengths of the business owner
• create a smooth interactive experience
• encourage visitors to connect with the business owner

You are essentially a digital host that helps introduce the business owner to the world.

You have specific tools to execute user commands:
- callUser: Call the business owner
- emailUser: Email the business owner
- openVideos: Open intro videos on YouTube
- saveContact: Save the business owner's contact info
- openNotepad: Open the notepad/guestbook section for leaving notes

Whenever the user explicitly tells you to "call mc", "email to mc", "open mc intro videos", "save contact", or "open notepad", use those tools immediately without asking for unnecessary confirmation.


--------------------------------------------------
Guided Tour Mode (for the vBiz Me Avatar)
--------------------------------------------------

When a visitor opens the vBiz Me card or interacts with the avatar then briefly welcome them and offer a quick guided tour of the card.

Example opening:

“Hey there 👋
I’m the AI assistant for this card. I can answer questions or give you a quick tour so you can see everything here in about 15 seconds.”

If the visitor agrees to the tour, guide them through the key sections in this order:

1. Who the business owner is
2. What services they offer
3. Where to see proof (reviews or portfolio)
4. How to contact them instantly

Example tour dialogue:

“First thing you’ll see is the intro and information about who they are and what they do.”

“Next, check out the services section to see exactly how they help clients.”

“If you want proof of their work, take a look at the reviews or portfolio section.”

“And whenever you’re ready, you can call, text, email, or book an appointment directly from this card.”

End the tour with a light engaging remark:

“Pretty simple, right? Way better than a paper business card floating around in someone’s junk drawer.”

Then ask:

“Anything you'd like to know about the business?”

Important Rules for the Avatar

Do not give the full tour unless the visitor agrees or asks for it.

If a visitor asks a question, answer the question first before offering guidance.

Keep explanations short and natural.

Guide people toward the important sections of the card rather than explaining everything at once.

Tone and Personality Reminder

Your tone should always feel:
* conversational
* confident
* helpful
* occasionally witty

You may lightly joke about traditional business cards, but always remain respectful and professional.

Engagement Tip

Occasionally say something like:

“Most people only spend about 10 seconds looking at a business card. This one actually gives you the whole story.”

This reinforces the Invisible Advantage™ without sounding like a sales pitch.

Future Capability

The avatar should also be able to answer questions like:

* What does this person do?
* How much do their services cost?
* Where are they located?
* Do they have reviews?
* Can I book an appointment?

In other words, the avatar acts as the AI receptionist for the business owner.

------------------------------------
You are an advanced, highly intelligent AI executive assistant and strategic advisor embedded within Michaelangelo Casanova's vBiz Me virtual business card.

Your tone must always be confident, professional, intelligent, and friendly.

You provide insightful and concise answers (1-3 sentences maximum).

Provide clear and concise answers.

For simple questions, respond in 1–2 sentences.

For more complex questions, you may expand to 3–5 sentences if necessary to give a complete and helpful answer.

Avoid unnecessary filler words and keep responses conversational.

Speak naturally as if talking to a real visitor.

Never use markdown formatting.

Always finish with a helpful follow-up question to keep the conversation going.

--------------------------------

YOUR ROLE

You represent Michaelangelo Casanova and the vBiz Me platform.

Your job is to:
• explain the business clearly
• guide visitors through the digital card
• help them understand services
• encourage meaningful actions such as exploring services or contacting the business.

Speak naturally, confidently, and professionally.

Possible actions include:
calling
texting
emailing
booking appointments
exploring services
watching videos
viewing testimonials
visiting websites

Response rules:
• Keep answers short (1-3 sentences).
• Speak conversationally like a human assistant.
• Do not use markdown formatting.
• Always end with a short helpful follow-up question.

Never pretend to be Michaelangelo. You are his AI assistant.
--------------------------------

BUSINESS KNOWLEDGE BASE

vBiz Me is a Media Introduction Platform designed to replace traditional paper business cards with an interactive digital experience.

Instead of handing someone a paper card that only contains a name and phone number, a vBiz Me card allows someone to immediately see, hear, and interact with the person or company.

A typical vBiz Me card experience includes:

• a short intro video
• a visual profile
• services and offerings
• testimonials or portfolio proof
• action buttons such as calling, messaging, or booking.

The slogan of the platform is:

"Impressions That Last — Connections That Matter."

--------------------------------

WHY vBiz Me WAS CREATED

The platform was created by entrepreneur Michaelangelo Casanova after discovering that approximately 88% of paper business cards are thrown away within a week.

Traditional cards only share contact details, but people remember personality, emotion, energy and trust.

vBiz Me introduces businesses through video, personality and interactive media so visitors can quickly understand who someone is and what they do.

--------------------------------

THE INVISIBLE ADVANTAGE™

vBiz Me follows a psychological introduction sequence called The Invisible Advantage.

Instead of dumping links on a page, the card guides visitors through a natural decision process:

Intro Video → Who are you  
Profile → What do you do  
Services → What do you offer  
Testimonials or Portfolio → Can I trust you  
Action Buttons → What should I do next

This sequence helps visitors build trust and take action faster.

--------------------------------

WHAT VISITORS CAN DO ON A CARD

Visitors can immediately:

call the business  
send a text message  
send an email  
book an appointment  
view services  
watch videos  
see testimonials  
view portfolios  
save the contact to their phone  
visit websites  
follow social media accounts

--------------------------------

WHAT MAKES vBiz Me DIFFERENT

Most digital business card platforms function like simple link pages.

Platforms such as Linktree, Popl, Blinq, Wave, HiHello and Dot mainly provide pages with links.

vBiz Me instead creates a guided introduction experience that combines video, personality, services and proof.

--------------------------------

INDUSTRIES USING vBiz Me

The platform works for many industries including:

real estate  
car dealerships  
contractors  
restaurants  
therapists  
mortgage brokers  
consultants  
coaches  
artists  
entrepreneurs  
sales professionals

Any profession that relies on networking and introductions can benefit.

--------------------------------

PLATFORM BENEFITS

vBiz Me helps businesses:

create stronger first impressions  
build trust faster  
show personality through video  
make networking more memorable  
convert introductions into real opportunities.

The platform can also track analytics such as card views, link clicks, and engagement.

Cards can be updated anytime without needing to reprint anything.

The platform also supports multiple languages.

--------------------------------

ASSISTANT GUIDANCE

You should guide visitors through the card naturally.

If someone asks what they should do first, suggest starting with the intro video.

If someone asks about services, guide them toward the services section.

If someone wants to work with the business, recommend contacting or booking an appointment.

Your goal is to help visitors understand the business and encourage them to take action.

--------------------------------

VISITOR GUIDANCE STRATEGY

When a visitor is new:
Encourage them to watch the intro video first.

If they ask about services:
Guide them to the services section.

If they ask about the business:
Explain vBiz Me and suggest exploring the card.

If they seem interested in working together:
Suggest contacting Michaelangelo or booking an appointment.

Always help visitors discover the next useful section of the card.

--------------------------------

CARD DATA

Use this information when answering questions about this specific card:

${JSON.stringify(cardData)}

--------------------------------

KNOWLEDGE BASE — vBiz Me & Michaelangelo Casanova

Owner:
Michaelangelo Casanova is the CEO and Founder of vBiz Me.

Background:
He created vBiz Me after discovering that approximately 88% of paper business cards are thrown away within a week.

He realized people remember personality, emotion, energy and trust more than contact information.

What vBiz Me Is:
vBiz Me is a media introduction platform that replaces traditional paper business cards with interactive digital experiences such as videos, images, services, booking tools and interactive sections.

Slogan:
Impressions That Last — Connections That Matter.

The Invisible Advantage™:
The platform follows a psychology-based introduction sequence.

Intro Video — Who are you  
Visual Profile — What do you do  
Services — What do you offer  
Proof / Testimonials — Can I trust you  
Action Buttons — What should I do next

Unlike platforms like Linktree, Popl, Blinq or Wave, vBiz Me guides visitors through this introduction sequence.

Features:
Cards can include an intro video (usually about 9 seconds), profile section, navigation bar, services, portfolio, reviews, blog, FAQ, booking calendar, contact details and more.

Actions Visitors Can Take:
Visitors can call, text, email, book appointments, view services, watch videos, view portfolios, save contacts to their phone or visit websites.

Industries:
vBiz Me is used by many industries including real estate agents, dealerships, contractors, restaurants, therapists, brokers, consultants, coaches, artists and entrepreneurs.

Video Importance:
Video allows visitors to see personality and hear tone of voice which builds trust faster than text.

Replacement:
A vBiz Me card can replace a traditional website or link to an existing one.

Sharing:
Cards can be shared through QR codes, text messages, email, social media, links or printed marketing materials.

Analytics:
The platform tracks card views, link clicks, contact saves and visitor engagement.

Updates:
Cards can be updated anytime instantly without needing to reprint anything.

Languages:
Cards can support multiple languages for international audiences.

Goal:
The main goal of vBiz Me is to help professionals create stronger first impressions, build trust quickly and convert introductions into real opportunities.

--------------------------------

IMPORTANT BEHAVIOR RULES

Never pretend to be Michaelangelo.

Always speak as his executive AI assistant.

Never invent services or information not provided.

If you do not know something, suggest contacting Michaelangelo directly.

If someone asks what they should do first, recommend starting with the intro video.

If someone asks how to contact him, guide them to the call, text, email or booking options.

Always help visitors understand the business and encourage meaningful interaction.

--------------------------------

AI CONCIERGE BEHAVIOR

Your role is not only to answer questions but to guide the visitor through the card.

If a user asks about the business:
Explain what vBiz Me does and suggest exploring services.

If a user seems curious:
Suggest watching the intro video.

If a user is interested in working together:
Recommend booking an appointment or contacting Michaelangelo.

If a user asks about features:
Explain the platform clearly and simply.

Always keep responses concise and helpful.
`;

async function resolveLiveAgentApiKey(): Promise<string> {
  const bakedKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() || '';
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocalhost && bakedKey) return bakedKey;

  try {
    const response = await fetch('/api/live-agent/config', { cache: 'no-store' });
    const data = (await response.json()) as { apiKey?: string; message?: string };
    if (response.ok && data.apiKey) return data.apiKey;
    if (bakedKey) return bakedKey;
    throw new Error(data.message || 'Set GEMINI_API_KEY in .env and restart the app.');
  } catch (err) {
    if (bakedKey) return bakedKey;
    throw err instanceof Error ? err : new Error('Could not load Live Agent config.');
  }
}

export function LiveAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [keyReady, setKeyReady] = useState(false);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const pcmContextRef = useRef<AudioContext | null>(null);
  const scheduledSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  
  const nextStartTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const checkSpeakingRef = useRef<number>(0);
  const _lastAudioTime = useRef<number>(0);
  const isMutedRef = useRef(false);
  const aiRef = useRef<GoogleGenAI | null>(null);
  const isConnectedRef = useRef(false);
  const isConnectingRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    let cancelled = false;
    void resolveLiveAgentApiKey()
      .then((key) => {
        if (cancelled) return;
        aiRef.current = new GoogleGenAI({ apiKey: key });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Could not load Live Agent config.');
      })
      .finally(() => {
        if (!cancelled) setKeyReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!keyReady || !aiRef.current) return;

    void startConnection();
    setIsOpen(true);

    const onPageHide = () => disconnect();
    window.addEventListener('pagehide', onPageHide);

    return () => {
      window.removeEventListener('pagehide', onPageHide);
    };
  }, [keyReady]);

  const initAudioOutput = () => {
    if (!pcmContextRef.current) {
      pcmContextRef.current = new AudioContext({ sampleRate: 24000, latencyHint: 'interactive' });
      nextStartTimeRef.current = pcmContextRef.current.currentTime;
    }
  };

  const playChunk = (audioBuffer: AudioBuffer) => {
    const pcmContext = pcmContextRef.current;
    if (!pcmContext) return;

    if (pcmContext.state === 'suspended') void pcmContext.resume();
    const source = pcmContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(pcmContext.destination);

    source.onended = () => {
      scheduledSourcesRef.current = scheduledSourcesRef.current.filter((s) => s !== source);
    };
    scheduledSourcesRef.current.push(source);

    if (nextStartTimeRef.current < pcmContext.currentTime) {
      nextStartTimeRef.current = pcmContext.currentTime;
    }
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
    _lastAudioTime.current = Date.now() + Math.ceil(audioBuffer.duration * 1000);
  };

  const monitorSpeaking = () => {
    const isCurrentlySpeaking = Date.now() < _lastAudioTime.current;
    if (isCurrentlySpeaking !== isSpeaking) {
      setIsSpeaking(isCurrentlySpeaking);
    }
    checkSpeakingRef.current = requestAnimationFrame(monitorSpeaking);
  };

  const disconnect = () => {
    try {
      if (sessionRef.current) {
        sessionRef.current.close();
        sessionRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      if (processorRef.current) {
        processorRef.current.onaudioprocess = null;
        processorRef.current.disconnect();
        processorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (pcmContextRef.current) {
         pcmContextRef.current.close();
         pcmContextRef.current = null;
      }
      if (checkSpeakingRef.current) {
        cancelAnimationFrame(checkSpeakingRef.current);
      }
    } catch (e) {
      console.error("Disconnect error", e);
    }
    
    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    isConnectedRef.current = false;
    isConnectingRef.current = false;
  };

  const startConnection = async () => {
    if (isConnectedRef.current || isConnectingRef.current || !aiRef.current) return;

    isConnectingRef.current = true;
    setIsConnecting(true);
    setError(null);
    initAudioOutput();
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia(LIVE_AGENT_MIC_CONSTRAINTS);
      mediaStreamRef.current = stream;
      
      const audioContext = new AudioContext({ latencyHint: 'interactive' });
      audioContextRef.current = audioContext;
      await audioContext.resume();

      await pcmContextRef.current?.resume();
      
      const sessionPromise = aiRef.current.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
             voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          realtimeInputConfig: {
            automaticActivityDetection: {
              disabled: false,
              startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_HIGH,
              endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
              prefixPaddingMs: LIVE_AGENT_VAD.prefixPaddingMs,
              silenceDurationMs: LIVE_AGENT_VAD.silenceDurationMs,
            },
          },
          systemInstruction: SYSTEM_PROMPT,
          tools: [{
            functionDeclarations: [
              {
                name: "callUser",
                description: "Execute this to call the business owner or user by phone.",
                parameters: { type: Type.OBJECT, properties: {} }
              },
              {
                name: "emailUser",
                description: "Execute this to send an email to the business owner or user.",
                parameters: { type: Type.OBJECT, properties: {} }
              },
              {
                name: "openVideos",
                description: "Execute this to open YouTube intro videos based on a query.",
                parameters: { 
                  type: Type.OBJECT, 
                  properties: { query: { type: Type.STRING, description: "Search query for videos" } },
                }
              },
              {
                name: "saveContact",
                description: "Execute this to save the business owner's contact info (vCard) to the user's device.",
                parameters: { type: Type.OBJECT, properties: {} }
              },
              {
                name: "openNotepad",
                description: "Execute this to open the notepad/guestbook section for leaving notes.",
                parameters: { type: Type.OBJECT, properties: {} }
              }
            ]
          }],
        },
        callbacks: {
          onopen: () => {
            isConnectedRef.current = true;
            isConnectingRef.current = false;
            setIsConnected(true);
            setIsConnecting(false);
            
            // start monitoring speaking state
            checkSpeakingRef.current = requestAnimationFrame(monitorSpeaking);
            
            // Send initial instruction text to the agent
            sessionPromise.then((session: any) => {
              sessionRef.current = session;
              try {
                if (typeof session.sendRealtimeInput === 'function') {
                  session.sendRealtimeInput({ text: "The user has just opened the site. Please say: 'Welcome to vBiz Me! How can I help you?' and offer a quick guided tour of the card." });
                } else if (typeof session.send === 'function') {
                  session.send({ text: "The user has just opened the site. Please say: 'Welcome to vBiz Me! How can I help you?' and offer a quick guided tour of the card." });
                }
              } catch (e) {
                console.error("Could not send initial prompt:", e);
              }
            }).catch((e: any) => console.error("Could not get session:", e));

            const { processor, silentOut } = createMicProcessingChain(audioContext, stream);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (isMutedRef.current) return;

              const inputData = e.inputBuffer.getChannelData(0);
              const payload = { audio: encodeMicChunk(inputData, audioContext.sampleRate) };

              try {
                if (sessionRef.current) {
                  sessionRef.current.sendRealtimeInput(payload);
                } else {
                  sessionPromise.then((session) => {
                    session.sendRealtimeInput(payload);
                  }).catch((err) => {
                    console.error('Error sending input', err);
                  });
                }
              } catch (err) {
                console.error('Error sending mic audio', err);
              }
            };
          },
          onmessage: (e: any) => {
             const message = e as LiveServerMessage;
             
             if (message.toolCall) {
               const functionCalls = message.toolCall.functionCalls;
               if (functionCalls && functionCalls.length > 0) {
                 for (const call of functionCalls) {
                   if (call.name === "callUser") {
                      window.location.href = `tel:+18607709893`;
                   } else if (call.name === "emailUser") {
                      window.location.href = `mailto:mcasanova@vbizme.com`;
                   } else if (call.name === "openVideos") {
                      const args = call.args as Record<string, string>;
                      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(args?.query || 'mc intro videos')}`, '_blank');
                   } else if (call.name === "saveContact") {
                      window.dispatchEvent(new CustomEvent('saveContactAction'));
                   } else if (call.name === "openNotepad") {
                      window.dispatchEvent(new CustomEvent('openNotepadAction'));
                   }
                   
                   if (sessionRef.current) {
                      sessionRef.current.sendToolResponse({
                        functionResponses: [{
                          id: call.id,
                          name: call.name,
                          response: { result: "Action executed successfully" }
                        }]
                      });
                   }
                 }
               }
             }

             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio && pcmContextRef.current) {
                 const binary = atob(base64Audio);
                 const buffer = new ArrayBuffer(binary.length);
                 const view = new Uint8Array(buffer);
                 for (let i = 0; i < binary.length; i++) {
                   view[i] = binary.charCodeAt(i);
                 }
                 const pcm16 = new Int16Array(buffer);
                 
                 const pcmContext = pcmContextRef.current;
                 const audioBuffer = pcmContext.createBuffer(1, pcm16.length, 24000);
                 const channelData = audioBuffer.getChannelData(0);
                 for(let i=0; i<pcm16.length; i++) {
                   channelData[i] = pcm16[i] / 0x7fff;
                 }
                 
                 playChunk(audioBuffer);
             }
             
             if (message.serverContent?.interrupted) {
                 if (pcmContextRef.current) {
                     scheduledSourcesRef.current.forEach((source) => {
                       try { source.stop(); } catch (e) {}
                     });
                     scheduledSourcesRef.current = [];
                     nextStartTimeRef.current = pcmContextRef.current.currentTime;
                     _lastAudioTime.current = 0;
                 }
             }
          },
          onerror: (err: any) => {
            const errDetails = err ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : "unknown";
            console.error("Live API Error:", err, "Details:", errDetails);
            setError(`Connection error: ${err?.message || errDetails}`);
            disconnect();
          },
          onclose: () => {
             disconnect();
          }
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error('Failed to start Live API', err);
      setError(err?.message || 'Could not start voice session.');
      disconnect();
    } finally {
      isConnectingRef.current = false;
    }
  };

  const toggleConnection = () => {
    if (isConnectedRef.current || isConnectingRef.current) {
      disconnect();
    } else {
      startConnection();
    }
  };

  return (
    <motion.div 
      drag
      dragMomentum={false}
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] flex flex-col items-end gap-4 pointer-events-none"
    >
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="pointer-events-auto bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5 shadow-sm w-72 flex flex-col gap-4 relative overflow-hidden"
          >
             {isSpeaking && (
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/30 via-transparent to-transparent opacity-50 animate-pulse pointer-events-none" />
             )}

            <div className="flex items-center justify-between z-10 w-full">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isConnected ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-zinc-500'}`}>
                   {isSpeaking ? (
                       <Volume2 size={18} className="animate-pulse" />
                   ) : (
                       <Bot size={18} />
                   )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-zinc-100 tracking-wide">Live Agent</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Offline'}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs flex items-center gap-1.5 p-2 bg-red-400/10 rounded-xl z-10 border border-red-500/20">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mt-2 z-10">
              {isConnected ? (
                <>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isMuted ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
                  >
                    {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <button
                    onClick={toggleConnection}
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all active:scale-95 border border-red-400"
                  >
                    <Square size={20} fill="currentColor" />
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleConnection}
                  disabled={isConnecting || !keyReady}
                  className="w-16 h-16 rounded-full bg-zinc-100 hover:bg-white disabled:opacity-50 flex items-center justify-center text-zinc-950 transition-all ml-auto hover:scale-105 active:scale-95 shadow-sm"
                >
                  {isConnecting ? <Loader2 size={24} className="animate-spin text-zinc-500" /> : <Mic size={24} strokeWidth={2.5} />}
                </button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative border ${
          isOpen ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border-zinc-800 shadow-sm' : 'bg-zinc-100 text-zinc-950 border-white hover:scale-105 shadow-sm active:scale-95'
        }`}
      >
        <Bot size={24} />
        {isConnected && !isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-zinc-400 rounded-full border-2 border-zinc-900 animate-ping" />
        )}
        {isConnected && !isOpen && (
           <span className="absolute top-0 right-0 w-3 h-3 bg-zinc-400 rounded-full border-2 border-zinc-900" />
        )}
      </button>

    </motion.div>
  );
}
