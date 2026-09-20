import {
  LivingStateInfo,
  CommandItem,
  WorkflowStep,
  ActionLoopPhase,
  FeatureItem,
  LanguageItem,
  DownloadInfo,
  DocArticle,
  FAQItem,
  ChangelogItem
} from '../types';

export const AIRA_DOWNLOAD_URL = "#";

export const assetUrls = {
  airaAvatar: 'https://i.ibb.co/23Mcvqj4/aira-avatar.png',
  airaAvatarLocal: '/assets/aira-avatar.png',
  airaDashboard: 'https://i.ibb.co/FkkwW2rq/aira-main-dashboard.png',
  airaDashboardLocal: '/assets/aira-main-dashboard.png',
  birenProfile: 'https://i.ibb.co/F4GrCbgQ/biren.png',
  birenProfileLocal: '/assets/biren-profile.png'
};

export const developerConfig = {
  name: 'Biren',
  badge: 'AI/ML Engineer',
  title: 'AI/ML Engineer & Creative Technologist',
  description: 'I build intelligent solutions with AI, turning ideas into useful products.',
  avatarUrl: assetUrls.birenProfile,
  localAvatarUrl: assetUrls.birenProfileLocal,
  portfolioUrl: 'https://biren-profile.vercel.app/',
  instagramUrl: 'https://www.instagram.com/ict_trading_co?stkn=d29wbmg5aDJic3A0',
  facebookUrl: 'https://www.facebook.com/share/18hknKVQPA/',
  whatsappUrl: 'https://wa.me/9779802649099',
  whatsappLabel: 'Message Bee Rain'
};

export const productConfig = {
  name: 'AIRA',
  badge: 'AI Responsive Assistant',
  subtitle: 'AI Responsive Assistant',
  positioning: 'AI Responsive Assistant',
  headline: 'Your AI. Your Assistant. Your Way.',
  supportingHeadline: 'Your AI. Your Assistant. Your Way.',
  description: 'AIRA is your intelligent personal assistant designed to understand, respond, create, and help you get things done.',
  voiceTagline: 'Just talk to AIRA.',
  voiceDescription: 'Designed around a continuous voice-to-voice interaction loop with Gemini Live streaming, natural conversational pauses, and proactive device response.',
  geminiStudioUrl: 'https://aistudio.google.com/',
  githubUrl: '',
  contactEmail: 'biren.business1@gmail.com',
  supportEmail: 'biren.business1@gmail.com',
  copyright: '© 2026 AIRA. All rights reserved.'
};

export const actionLoopPhases: ActionLoopPhase[] = [
  {
    phase: 'OBSERVE',
    title: 'Context Perception',
    subtitle: 'Device & Voice State',
    description: 'AIRA captures spoken audio and, when authorized, observes the current Android screen state or active app context.',
    iconName: 'Eye'
  },
  {
    phase: 'PLAN',
    title: 'Structured Reasoning',
    subtitle: 'Deterministic Planning',
    description: 'Transforms natural language intent into a verified execution sequence with explicit permission boundaries.',
    iconName: 'Compass'
  },
  {
    phase: 'ACT',
    title: 'Native Execution',
    subtitle: 'Android Intent Dispatch',
    description: 'Dispatches real Android system intents, opens target apps, adjusts toggles, or accesses local device APIs.',
    iconName: 'Zap'
  },
  {
    phase: 'VERIFY',
    title: 'State Confirmation',
    subtitle: 'Execution Check',
    description: 'Verifies whether the requested system change took effect before confirming completion to the user.',
    iconName: 'CheckCircle2'
  },
  {
    phase: 'RECOVER',
    title: 'Graceful Fallback',
    subtitle: 'Adaptive Recovery',
    description: 'If an action fails, requires elevated permission, or is blocked, AIRA guides the user with clear next steps.',
    iconName: 'RefreshCw'
  }
];

export const interactionSteps: WorkflowStep[] = [
  { step: 1, label: 'Listen', description: 'High-fidelity audio streaming captures continuous user voice without repetitive button clicks.', tag: 'Voice Stream' },
  { step: 2, label: 'Understand', description: 'Semantic parsing extracts user intent, parameters, context, and sentiment.', tag: 'Gemini Engine' },
  { step: 3, label: 'Plan', description: 'Constructs an operational strategy matching Android system capabilities and safety checks.', tag: 'Action Engine' },
  { step: 4, label: 'Act', description: 'Executes approved Android intents, queries memory store, or interacts with device controls.', tag: 'System Bridge' },
  { step: 5, label: 'Verify', description: 'Monitors Android OS feedback to ensure the intended outcome succeeded.', tag: 'Validation' },
  { step: 6, label: 'Respond', description: 'Synthesizes conversational spoken audio back to the user with expressive living avatar feedback.', tag: 'Speech Output' }
];

export const livingStatesConfig: LivingStateInfo[] = [
  { id: 'neutral', label: 'Neutral', description: 'Idle resting state, gently pulsating awaiting your voice or gesture.', accentColor: '#38BDF8', pulseSpeed: '4s', particleCount: 16 },
  { id: 'listening', label: 'Listening', description: 'Active microphone capture with real-time audio waveform resonance.', accentColor: '#00F2FE', pulseSpeed: '1.8s', particleCount: 32 },
  { id: 'thinking', label: 'Thinking', description: 'Processing prompt tokens and reasoning through execution steps.', accentColor: '#818CF8', pulseSpeed: '2.2s', particleCount: 24 },
  { id: 'speaking', label: 'Speaking', description: 'Synthesizing voice response with harmonic visual waveform oscillation.', accentColor: '#C084FC', pulseSpeed: '1.4s', particleCount: 36 },
  { id: 'smiling', label: 'Smiling', description: 'Acknowledging positive feedback, successful actions, and friendly remarks.', accentColor: '#34D399', pulseSpeed: '3s', particleCount: 20 },
  { id: 'curious', label: 'Curious', description: 'Prompting for necessary clarification or additional action parameters.', accentColor: '#FBBF24', pulseSpeed: '2.5s', particleCount: 20 },
  { id: 'concerned', label: 'Concerned', description: 'Flagging missing permissions, connectivity timeouts, or execution errors.', accentColor: '#F87171', pulseSpeed: '2s', particleCount: 22 },
  { id: 'excited', label: 'Excited', description: 'Celebrating completed workflow chains and creative generation tasks.', accentColor: '#E879F9', pulseSpeed: '1.2s', particleCount: 40 },
  { id: 'caring', label: 'Caring', description: 'Delivering reassuring reminders, health habits, and scheduled notes.', accentColor: '#67E8F9', pulseSpeed: '3.5s', particleCount: 18 }
];

export const featuresConfig: FeatureItem[] = [
  {
    id: 'natural-voice-conversation',
    title: 'Natural Voice Conversation',
    category: 'Real-Time Audio',
    description: 'Real-time voice powered by Gemini Live streaming. Continuous, fluid dialogue with natural pause detection and zero push-to-talk friction.',
    badge: 'Available Now',
    details: [
      'Low-latency bidirectional audio streaming',
      'Natural pause detection and barge-in interruption',
      'Hands-free, full-duplex conversational flow'
    ],
    icon: 'Mic'
  },
  {
    id: 'intelligent-vision-camera',
    title: 'Intelligent Vision & Camera',
    category: 'Multimodal Vision',
    description: 'Point your camera and ask anything in real time. AIRA analyzes physical objects, handwriting, documents, and real-world scenes.',
    badge: 'Available Now',
    details: [
      'Live camera frame analysis with Gemini Vision',
      'Real-world object & landmark identification',
      'Document and handwriting OCR comprehension'
    ],
    icon: 'Sparkles'
  },
  {
    id: 'smart-memory',
    title: 'Smart Memory',
    category: 'Context & Persistence',
    description: 'Remembers user preferences, facts, and ongoing context across sessions in an encrypted on-device local memory store.',
    badge: 'Available Now',
    details: [
      'Store notes, preferences, and important facts',
      'Transparent memory management with full user control',
      'Encrypted on-device storage with privacy protection'
    ],
    icon: 'Brain'
  },
  {
    id: 'device-actions',
    title: 'Phone Automation & Device Actions',
    category: 'Android Actions',
    description: 'Controls device functions, opens apps, triggers system toggles (WiFi, Bluetooth, volume), and executes daily device tasks.',
    badge: 'Available Now',
    details: [
      'Direct app launching & media playback control',
      'System settings toggles (WiFi, Bluetooth, Volume)',
      'Verified action pipeline with explicit permission gates'
    ],
    icon: 'Smartphone'
  },
  {
    id: 'multi-model-intelligence',
    title: 'Multi-Model Intelligence',
    category: 'Gemini Models',
    description: 'Flexibility across Gemini 2.5 Flash, Flash-Lite, Thinking Mode, and Pro for high-speed dialogue or complex reasoning.',
    badge: 'Available Now',
    details: [
      'Gemini 2.5 Flash for rapid low-latency response',
      'Gemini Thinking mode for multi-step reasoning',
      'Seamless model switching based on task complexity'
    ],
    icon: 'Orbit'
  },
  {
    id: 'byok-privacy',
    title: 'BYOK — Your Key, Your Privacy',
    category: 'Security & Control',
    description: 'Bring Your Own Key directly from Google AI Studio. Your private voice and data never pass through third-party intermediary servers.',
    badge: 'Available Now',
    details: [
      'Direct client-to-Gemini connection',
      'AES-encrypted key storage on your Android device',
      'Zero proxy data mining or third-party retention'
    ],
    icon: 'UserCheck'
  },
  {
    id: 'voice-profiles-customization',
    title: 'Voice Profiles & Customization',
    category: 'Personalization',
    description: 'Choose from multiple AI voices, customize speech tempo, pitch, conversation style, and preferred assistant address names.',
    badge: 'Available Now',
    details: [
      'Multiple expressive Gemini voice profiles (Puck, Charon, Aoede, Fenrir)',
      'Custom preferred name configuration & greetings',
      'Adjustable conciseness and conversational style'
    ],
    icon: 'Compass'
  },
  {
    id: 'custom-routines-shortcuts',
    title: 'Custom Routines & Shortcuts',
    category: 'Automation Workflows',
    description: 'Automate repetitive daily tasks with custom spoken trigger phrases, multi-step actions, and timed morning/night routines.',
    badge: 'In Development',
    details: [
      'Custom spoken trigger commands',
      'Chain multiple Android actions into one routine',
      'Scheduled morning briefing and sleep routines'
    ],
    icon: 'Code2'
  },
  {
    id: 'offline-edge-capabilities',
    title: 'Offline & Edge Capabilities',
    category: 'On-Device Edge',
    description: 'Local command processing, on-device memory indexing, and fast low-power wake-word detection even when offline.',
    badge: 'In Development',
    details: [
      'Local offline command parsing for basic phone tasks',
      'On-device SQLite encrypted memory store',
      'Fast offline wake-word detector integration'
    ],
    icon: 'Globe'
  }
];

export const languagesConfig: LanguageItem[] = [
  { name: 'English', nativeName: 'English (US / UK / Global)', code: 'en', status: 'Supported' },
  { name: 'Hindi', nativeName: 'हिन्दी', code: 'hi', status: 'Supported' },
  { name: 'Hinglish', nativeName: 'Hinglish (Hindi in Latin script)', code: 'hi-Latn', status: 'Supported' },
  { name: 'Nepali', nativeName: 'नेपाली', code: 'ne', status: 'Supported' },
  { name: 'NeEnglish', nativeName: 'NeEnglish (Nepali in Latin script)', code: 'ne-Latn', status: 'Supported' },
  { name: 'Japanese', nativeName: '日本語', code: 'ja', status: 'Supported' },
  { name: 'Korean', nativeName: '한국어', code: 'ko', status: 'Supported' },
  { name: 'French', nativeName: 'Français', code: 'fr', status: 'Supported' },
  { name: 'German', nativeName: 'Deutsch', code: 'de', status: 'Supported' }
];

export const commandsConfig: CommandItem[] = [
  {
    id: 'cmd-1',
    command: '“Open YouTube.”',
    category: 'Apps',
    status: 'available',
    description: 'Launches target application via Android package manager intent.',
    observedAction: 'Identified installed package com.google.android.youtube',
    plannedExecution: 'Dispatch Intent.ACTION_MAIN with FLAG_ACTIVITY_NEW_TASK'
  },
  {
    id: 'cmd-2',
    command: '“Turn on Bluetooth.”',
    category: 'System',
    status: 'requires_permission',
    permissionRequired: 'BLUETOOTH_CONNECT / Write Settings',
    description: 'Checks Bluetooth adapter state and requests system toggle confirmation.',
    observedAction: 'Current Bluetooth state: DISABLED',
    plannedExecution: 'Trigger BluetoothAdapter enable intent or launch Settings sheet'
  },
  {
    id: 'cmd-3',
    command: '“Remember this for me.”',
    category: 'Memory',
    status: 'available',
    description: 'Stores designated fact or note into AIRA local memory table.',
    observedAction: 'Detected memory intent: store text with current timestamp',
    plannedExecution: 'Write entry into Room local database under UserMemory'
  },
  {
    id: 'cmd-4',
    command: '“Help me with this.”',
    category: 'Voice',
    status: 'available',
    description: 'Activates contextual multi-turn reasoning on current active query.',
    observedAction: 'Awaiting context description from user voice stream',
    plannedExecution: 'Stream prompt to Gemini Live reasoning engine'
  },
  {
    id: 'cmd-5',
    command: '“Search for something.”',
    category: 'Productivity',
    status: 'available',
    description: 'Queries knowledge engine or initiates web browser search.',
    observedAction: 'Extracted query keywords',
    plannedExecution: 'Dispatch search intent to default browser or fetch web summary'
  },
  {
    id: 'cmd-6',
    command: '“Send a message.”',
    category: 'Apps',
    status: 'requires_permission',
    permissionRequired: 'SEND_SMS / Accessibility',
    description: 'Drafts or dispatches communication after user confirmation.',
    observedAction: 'Identified contact and message body',
    plannedExecution: 'Draft in default SMS app or request permission confirmation before send'
  },
  {
    id: 'cmd-7',
    command: '“Summarize what is on my screen.”',
    category: 'Productivity',
    status: 'coming_soon',
    permissionRequired: 'MediaProjection / Accessibility API',
    description: 'Captures screen bitmap to analyze visual elements and document text.',
    observedAction: 'Screen projection service initialization (In Development)',
    plannedExecution: 'Multimodal vision prompt to Gemini for screen OCR summary'
  },
  {
    id: 'cmd-8',
    command: '“Set an alarm for 7:00 AM.”',
    category: 'System',
    status: 'requires_permission',
    permissionRequired: 'SET_ALARM',
    description: 'Configures Android clock alarm via AlarmClock intent provider.',
    observedAction: 'Parsed target time: 07:00:00 AM',
    plannedExecution: 'Dispatch AlarmClock.ACTION_SET_ALARM with skipUi: false'
  }
];

export const howItWorksSteps = [
  {
    number: '01',
    title: 'User Speaks',
    description: 'You speak naturally to AIRA in your preferred tongue without needing robotic trigger words.',
    badge: 'Audio Input'
  },
  {
    number: '02',
    title: 'AIRA Listens',
    description: 'Real-time audio buffer captures speech with dynamic gain control and voice activity detection.',
    badge: 'AudioRecord'
  },
  {
    number: '03',
    title: 'Language Is Detected',
    description: 'AIRA determines whether the speech is English, Hindi, Hinglish, Nepali, or other supported languages.',
    badge: 'Acoustic Classifier'
  },
  {
    number: '04',
    title: 'AI Understands Intent',
    description: 'The semantic engine analyzes the query, maps contextual references, and checks existing memories.',
    badge: 'Gemini Engine'
  },
  {
    number: '05',
    title: 'AIRA Plans the Action',
    description: 'Constructs an internal execution plan according to the OBSERVE-PLAN-ACT-VERIFY workflow.',
    badge: 'Action Planner'
  },
  {
    number: '06',
    title: 'Android Action Executed',
    description: 'Native Android bridge executes the system intent, application launch, or local data storage.',
    badge: 'OS Intent Bridge'
  },
  {
    number: '07',
    title: 'Result Is Verified',
    description: 'AIRA checks operating system feedback to confirm the action succeeded without errors.',
    badge: 'State Verifier'
  },
  {
    number: '08',
    title: 'AIRA Responds',
    description: 'AIRA provides a clear, natural voice response accompanied by the living interface animation.',
    badge: 'Audio Output'
  }
];

export const downloadConfig: DownloadInfo = {
  latestVersion: 'v0.9.4-beta',
  releaseDate: 'September 2024',
  apkSize: '48.2 MB',
  androidRequirement: 'Android 10.0 (API Level 29) or higher',
  minRam: '4 GB RAM recommended',
  targetArchitecture: 'arm64-v8a, armeabi-v7a',
  sha256: '8f4e69b519c836a94f6f26487e44a42b10a1900d8cb276a71e8bfbdf8a14902c',
  downloadUrl: '', // Left empty by default to trigger the polished "Download Coming Soon" state as mandated
  isDownloadReady: false, // Set to true when public APK artifact is linked
  releaseNotes: [
    'Integrated Gemini Live bidirectional real-time audio pipeline',
    'Introduced continuous voice conversational mode',
    'Implemented OBSERVE → PLAN → ACT → VERIFY execution safety engine',
    'Added local memory retention database with privacy controls',
    'Expanded multilingual detection for Hindi, Hinglish, Nepali, and NeEnglish',
    'Living AIRA interface with 9 interactive visual response states'
  ],
  previousReleases: [
    {
      version: 'v0.9.0-alpha',
      date: 'August 2024',
      apkSize: '44.1 MB',
      notes: 'Initial developer preview of voice pipeline and basic Android intent launching.'
    }
  ]
};

export const installationSteps = [
  {
    step: 1,
    title: 'Download the latest AIRA APK',
    description: 'Download the official AIRA APK file directly from this download portal onto your Android phone.'
  },
  {
    step: 2,
    title: 'Open the downloaded APK',
    description: 'Locate the downloaded .apk file in your browser downloads or Files manager app and tap it.'
  },
  {
    step: 3,
    title: 'Allow installation when Android requests permission',
    description: 'If prompted by Android security, toggle “Allow from this source” for your browser or file manager.'
  },
  {
    step: 4,
    title: 'Install AIRA',
    description: 'Confirm the installation dialog and wait a few moments for package verification to complete.'
  },
  {
    step: 5,
    title: 'Open AIRA',
    description: 'Launch AIRA from your application launcher or tap "Open" directly from the installer.'
  },
  {
    step: 6,
    title: 'Configure required permissions',
    description: 'Grant necessary permissions such as Microphone so AIRA can capture your speech commands.'
  },
  {
    step: 7,
    title: 'Configure the Gemini API key',
    description: 'Enter your personal Google Gemini API key in AIRA Settings to power the intelligent voice engine.'
  },
  {
    step: 8,
    title: 'Start using AIRA',
    description: 'Tap the glowing voice bar, greet AIRA, and begin your natural voice companion experience!'
  }
];

export const geminiSetupSteps = [
  {
    step: 1,
    title: 'Get Your Free Gemini API Key',
    description: 'Visit the official Google AI Studio portal and generate an API key with your Google Account.'
  },
  {
    step: 2,
    title: 'Enter API Key in AIRA',
    description: 'Open AIRA on your phone, tap the Settings gear icon in the top-right corner, and paste your key into the API Key manager.'
  },
  {
    step: 3,
    title: 'Connect',
    description: 'AIRA securely stores the key in encrypted local Android Keystore preferences and establishes the handshake.'
  },
  {
    step: 4,
    title: 'Start Using AIRA',
    description: 'Once connected, the status indicator glows green ("Gemini Live Connected") and continuous voice is ready.'
  }
];

export const permissionsData = [
  {
    category: 'Microphone (RECORD_AUDIO)',
    required: true,
    description: 'Essential for capturing user voice during continuous voice conversations. Used only when voice capture is activated.'
  },
  {
    category: 'Notifications (POST_NOTIFICATIONS)',
    required: false,
    description: 'Enables foreground service status notifications, active voice indicators, and reminders.'
  },
  {
    category: 'Accessibility / Device Interaction',
    required: false,
    description: 'Required strictly for performing requested user actions such as pressing on-screen buttons or reading context when enabled.'
  },
  {
    category: 'Bluetooth (BLUETOOTH_CONNECT)',
    required: false,
    description: 'Used only when the user explicitly instructs AIRA to toggle or inspect Bluetooth status.'
  }
];

export const documentationArticles: DocArticle[] = [
  {
    id: 'getting-started-install',
    category: 'Getting Started',
    title: 'Installing AIRA on Android',
    readTime: '3 min read',
    content: [
      'AIRA is distributed as a standalone Android APK designed for Android 10 (API 29) and above.',
      'To install, download the official APK, allow installation from your browser if prompted, and complete the installation.',
      'Once installed, open the app and follow the onboarding screen to review safety practices and required permissions.'
    ]
  },
  {
    id: 'getting-started-api-key',
    category: 'Getting Started',
    title: 'Setting Up Your Gemini API Key',
    readTime: '4 min read',
    content: [
      'AIRA uses Google Gemini models for conversational reasoning and real-time voice intelligence.',
      'You can obtain an API key from Google AI Studio (aistudio.google.com).',
      'In AIRA, tap the Settings gear in the top-right corner, select "API Key Manager", and paste your personal key.',
      'Your key is saved locally in Android encrypted preferences and is never sent to any secondary third-party server.'
    ]
  },
  {
    id: 'using-aira-voice',
    category: 'Using AIRA',
    title: 'Continuous Voice Interaction',
    readTime: '3 min read',
    content: [
      'Tap the glowing mic button or the "Talk to AIRA..." search bar to initiate a conversation.',
      'AIRA streams audio continuously. You do not need to press a button for each follow-up sentence.',
      'To end the conversation, simply pause or tap the mic button to disconnect.'
    ]
  },
  {
    id: 'using-aira-memory',
    category: 'Using AIRA',
    title: 'How Memory Works',
    readTime: '4 min read',
    content: [
      'AIRA features an on-device memory store. You can tell AIRA facts like "Remember that my meeting is at 3 PM" or "Remember that I prefer short answers".',
      'Memories are stored locally in the app database and referenced to provide personalized answers.',
      'You can inspect, export, or delete individual memories at any time from the Memory tab.'
    ]
  },
  {
    id: 'using-aira-languages',
    category: 'Using AIRA',
    title: 'Supported Languages & Dialects',
    readTime: '3 min read',
    content: [
      'AIRA currently supports English, Hindi, Hinglish, Nepali, NeEnglish, Japanese, Korean, French, and German.',
      'Speech recognition automatically adapts to natural code-switching, making it ideal for bilingual users who speak Hindi/English or Nepali/English interchangeably.'
    ]
  },
  {
    id: 'device-actions-supported',
    category: 'Device Actions',
    title: 'Supported Android Actions',
    readTime: '5 min read',
    content: [
      'AIRA can launch installed applications via Android Intent filters.',
      'When given permission, AIRA can toggle system settings like Bluetooth and WiFi or open corresponding Settings screens.',
      'All actions follow the OBSERVE-PLAN-ACT-VERIFY workflow: AIRA never executes irreversible system commands without confirmation.'
    ]
  },
  {
    id: 'troubleshooting-voice',
    category: 'Troubleshooting',
    title: 'Voice or Microphone Not Working',
    readTime: '3 min read',
    content: [
      'Verify that Android Microphone permission is granted to AIRA in Android Settings > Apps > AIRA > Permissions.',
      'Ensure another application (like a phone call recorder or screen recorder) is not exclusively locking AudioRecord.',
      'Check that your phone volume is not muted so AIRA voice responses can be heard.'
    ]
  },
  {
    id: 'troubleshooting-gemini',
    category: 'Troubleshooting',
    title: 'Gemini Connection & Handshake Issues',
    readTime: '4 min read',
    content: [
      'Ensure your Gemini API key is valid and has active quota in Google AI Studio.',
      'Verify you have a working Internet connection (WiFi or mobile data).',
      'Check the top-right status pill in AIRA. If it displays "Disconnected" or "Error", tap it to view the exact diagnostic message.'
    ]
  },
  {
    id: 'updates-changelog',
    category: 'Updates',
    title: 'Version History & Release Notes',
    readTime: '2 min read',
    content: [
      'View detailed release notes and checksums for every build of AIRA in the official Changelog.',
      'We recommend keeping AIRA updated to benefit from improved voice latency and new supported Android actions.'
    ]
  }
];

export const faqConfig: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is AIRA?',
    answer: 'AIRA stands for AI Responsive Assistant. It is an intelligent personal AI assistant designed to understand spoken language, engage in fluid conversations, remember context, and execute real actions on your Android device.'
  },
  {
    id: 'faq-2',
    category: 'Compatibility',
    question: 'Which devices support AIRA?',
    answer: 'AIRA currently supports Android smartphones and tablets running Android 10.0 (API Level 29) or higher with at least 4 GB of RAM.'
  },
  {
    id: 'faq-3',
    category: 'Connectivity',
    question: 'Does AIRA require internet?',
    answer: 'Yes, an active internet connection (Wi-Fi or mobile data) is required for real-time speech recognition, natural language reasoning, and Gemini Live streaming. On-device local memory and settings can be viewed offline.'
  },
  {
    id: 'faq-4',
    category: 'Voice',
    question: 'Does AIRA support voice conversation?',
    answer: 'Yes! AIRA is engineered voice-first with continuous full-duplex speech streaming, natural conversational turn-taking, and hands-free interaction without needing to repeatedly tap a button.'
  },
  {
    id: 'faq-5',
    category: 'Languages',
    question: 'Which languages does AIRA support?',
    answer: 'AIRA supports multiple languages including English, Hindi, Hinglish, Nepali, NeEnglish, Japanese, Korean, French, and German, with seamless code-switching comprehension.'
  },
  {
    id: 'faq-6',
    category: 'Setup',
    question: 'How do I get a Gemini API key?',
    answer: 'You can generate a free Gemini API key from Google AI Studio (aistudio.google.com). Once created, simply paste the key into the AIRA app settings or your secure Android keystore to start.'
  },
  {
    id: 'faq-7',
    category: 'Permissions',
    question: 'What permissions does AIRA require?',
    answer: 'AIRA requires Microphone permission for voice conversation. Specific device actions (such as launching apps or system toggles) only request optional permissions when explicitly activated.'
  },
  {
    id: 'faq-8',
    category: 'Download',
    question: 'Where can I download AIRA?',
    answer: 'You can download the verified AIRA APK directly from the official Download section on this website or from the official release distribution portal.'
  },
  {
    id: 'faq-9',
    category: 'Platforms',
    question: 'Is AIRA available for Windows?',
    answer: 'AIRA is currently available exclusively for Android. A Windows desktop version and cross-device synchronization are on our official product roadmap and planned for future release.'
  }
];

export const changelogConfig: ChangelogItem[] = [
  {
    version: 'v0.9.4-beta',
    date: 'September 2024',
    badge: 'Latest Beta',
    highlights: [
      'Gemini Live streaming bidirectional voice connection',
      'Continuous voice conversational mode with adaptive silence detection',
      'Structured OBSERVE-PLAN-ACT-VERIFY action loop',
      'Local on-device memory store with privacy controls'
    ],
    sections: [
      {
        title: 'New Features',
        items: [
          'Full-duplex voice streaming without repetitive microphone tapping',
          'Living AIRA interface with 9 dynamic visual response states',
          'Support for Hinglish and NeEnglish natural code-switching',
          'Direct Android app launching and intent dispatch system'
        ]
      },
      {
        title: 'Improvements',
        items: [
          'Reduced audio latency during streaming handshake',
          'Enhanced memory recall matching for conversational follow-ups',
          'Polished dark holographic obsidian UI with animated status pills'
        ]
      },
      {
        title: 'Security & Privacy',
        items: [
          'All API keys now stored in Android EncryptedSharedPreferences',
          'Explicit permission confirmation dialogs before executing system intent actions'
        ]
      }
    ]
  },
  {
    version: 'v0.9.0-alpha',
    date: 'August 2024',
    badge: 'Alpha Preview',
    highlights: [
      'Initial prototype of AIRA voice-to-intent engine',
      'Basic Gemini API integration with text and audio transcription',
      'Foundational Android native intent bridge'
    ],
    sections: [
      {
        title: 'Foundations',
        items: [
          'AudioRecord and AudioTrack low-level buffer implementation',
          'Initial APK packaging and target SDK configuration for Android 10+'
        ]
      }
    ]
  }
];
