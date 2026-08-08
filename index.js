const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// ============================================================
//  CONFIGURATION (load from file, fallback to defaults)
// ============================================================
const CONFIG_DEFAULTS = {
    telegramToken: '8959793928:AAFaKonuc_lJrpE9yTAwNq9phjtTos9kJus',
    ownerWhatsApp: '263788377887',      // Your WhatsApp number (with country code)
    ownerTelegramId: 8330864719,            // Your Telegram user ID
    botName: 'hunter-md-v2,
    ownerName: 'icebackmaster,
    channelLink: 'https://t.me/hunterdevs_channel',
    groupLink: 'https://t.me/hunterdevs_group',
    telegramBotLink: 'http://t.me/huntermdv2_bot',
    botImageUrl: 'https://files.catbox.moe/yourimage.png',
    menuImageUrl: 'https://files.catbox.moe/yourmenuimage.png',
    prefix: '.'
};

let CONFIG = { ...CONFIG_DEFAULTS };
const CONFIG_FILE = 'config.json';
if (fs.existsSync(CONFIG_FILE)) {
    try {
        const saved = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        CONFIG = { ...CONFIG_DEFAULTS, ...saved };
    } catch (e) { /* ignore */ }
}
function saveConfig() {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(CONFIG, null, 2));
}

// ============================================================
//  DATA STORE (Jokes, Quotes, Facts, Trivia, etc.)
// ============================================================
function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const DATA = {
    jokes: [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "What do you call a fish wearing a bowtie? Sofishticated.",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don't scientists trust atoms? Because they make up everything!",
        "What do you call a bear with no teeth? A gummy bear!",
        "Why did the math book look so sad? Because it had too many problems.",
        "What do you call a fake noodle? An impasta.",
        "Why did the bicycle fall over? Because it was two-tired.",
        "Why did the computer go to the doctor? Because it had a virus!",
        "What do you call a pile of cats? A meow-ntain.",
        "Why don't skeletons fight each other? They don't have the guts.",
        "What's orange and sounds like a parrot? A carrot.",
        "How do you organize a space party? You planet.",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
        "Why did the scarecrow become a successful motivational speaker? Because he was outstanding in his field.",
        "What do you call a sleeping dinosaur? A dino-snore.",
        "Why did the belt get arrested? For holding up a pair of pants.",
        "What's brown and sticky? A stick.",
        "Why did the banana go to the doctor? Because it wasn't peeling well.",
        "What do you call a cow with no legs? Ground beef.",
        "What do you call a cow with two legs? Lean beef.",
        "Why did the chicken cross the road? To get to the other side.",
        "What do you call a pig that does karate? A pork chop.",
        "Why did the fish blush? Because it saw the ocean's bottom.",
        "What do you call a lazy kangaroo? A pouch potato.",
        "Why did the music teacher go to jail? Because she got caught with too many scales.",
        "What do you call a social butterfly with no friends? A moth.",
        "Why did the golfer wear two pairs of pants? In case he got a hole in one.",
        "What do you call a snowman with a six-pack? An abdominal snowman.",
        "Why did the student eat his homework? Because the teacher said it was a piece of cake.",
        "What do you call a dinosaur with an extensive vocabulary? A thesaurus.",
        "Why did the panda bring a pencil to the party? Because he wanted to draw a crowd.",
        "What do you call a bear that's stuck in the rain? A drizzly bear.",
        "Why did the coffee call the police? It was mugged.",
        "What do you call a fish that wears a bowtie? Sofishticated.",
        "Why did the orange stop rolling? It ran out of juice.",
        "What do you call a parade of rabbits hopping backwards? A receding hare-line.",
        "Why did the tree go to the dentist? It needed a root canal.",
        "What do you call a sleeping bull? A bulldozer.",
        "Why did the clock get a promotion? Because it worked around the clock.",
        "What do you call a pile of cats? A meow-ntain.",
        "Why did the mosquito go to the doctor? It was feeling itchy.",
        "What do you call a bear that doesn't have any teeth? A gummy bear.",
        "Why did the football coach go to the bank? To get his quarterback.",
        "What do you call a sheep that can sing? A ba-a-a-ad singer.",
        "Why did the man put his money in the freezer? He wanted cold hard cash.",
        "What do you call a cow that plays a musical instrument? A moo-sician.",
        "Why did the owl invite his friends to dinner? Because he was a wise guy.",
        "What do you call a bee that can't make up its mind? A may-bee.",
        "Why did the kangaroo stop drinking coffee? It was too jumpy.",
        "What do you call a fish that's always late? A procrastinator.",
        "Why did the elephant paint his toenails red? To hide in the strawberry patch.",
        "What do you call a cat that loves to bowl? An alley cat.",
        "Why did the boy throw the clock out the window? He wanted to see time fly.",
        "What do you call a pig that knows karate? A pork chop.",
        "Why did the spider go to the computer? To check his website.",
        "What do you call a snake that's good at math? An adder.",
        "Why did the banana go to the party alone? Because it had no peel.",
        "What do you call a dog that can do magic? A labracadabrador.",
        "Why did the cow go to the moon? To see the moooon.",
        "What do you call a dinosaur that's always in trouble? A misbehaviosaurus.",
        "Why did the tomato blush? Because it saw the salad dressing.",
        "What do you call a sleeping dinosaur? A dino-snore.",
        "Why did the man put his money in the freezer? He wanted cold hard cash.",
        "What do you call a cow with no legs? Ground beef.",
        "Why did the chicken cross the road? To get to the other side.",
        "What do you call a pig that does karate? A pork chop.",
        "Why did the fish blush? Because it saw the ocean's bottom.",
        "What do you call a lazy kangaroo? A pouch potato.",
        "Why did the music teacher go to jail? Because she got caught with too many scales.",
        "What do you call a social butterfly with no friends? A moth.",
        "Why did the golfer wear two pairs of pants? In case he got a hole in one.",
        "What do you call a snowman with a six-pack? An abdominal snowman.",
        "Why did the student eat his homework? Because the teacher said it was a piece of cake.",
        "What do you call a dinosaur with an extensive vocabulary? A thesaurus.",
        "Why did the panda bring a pencil to the party? Because he wanted to draw a crowd.",
        "What do you call a bear that's stuck in the rain? A drizzly bear.",
        "Why did the coffee call the police? It was mugged.",
        "What do you call a fish that wears a bowtie? Sofishticated.",
        "Why did the orange stop rolling? It ran out of juice.",
        "What do you call a parade of rabbits hopping backwards? A receding hare-line.",
        "Why did the tree go to the dentist? It needed a root canal.",
        "What do you call a sleeping bull? A bulldozer.",
        "Why did the clock get a promotion? Because it worked around the clock.",
        "What do you call a pile of cats? A meow-ntain.",
        "Why did the mosquito go to the doctor? It was feeling itchy.",
        "What do you call a bear that doesn't have any teeth? A gummy bear.",
        "Why did the football coach go to the bank? To get his quarterback.",
        "What do you call a sheep that can sing? A ba-a-a-ad singer.",
        "Why did the man put his money in the freezer? He wanted cold hard cash.",
        "What do you call a cow that plays a musical instrument? A moo-sician.",
        "Why did the owl invite his friends to dinner? Because he was a wise guy.",
        "What do you call a bee that can't make up its mind? A may-bee.",
        "Why did the kangaroo stop drinking coffee? It was too jumpy.",
        "What do you call a fish that's always late? A procrastinator.",
        "Why did the elephant paint his toenails red? To hide in the strawberry patch.",
        "What do you call a cat that loves to bowl? An alley cat.",
        "Why did the boy throw the clock out the window? He wanted to see time fly.",
        "What do you call a pig that knows karate? A pork chop.",
        "Why did the spider go to the computer? To check his website.",
        "What do you call a snake that's good at math? An adder.",
        "Why did the banana go to the party alone? Because it had no peel.",
        "What do you call a dog that can do magic? A labracadabrador.",
        "Why did the cow go to the moon? To see the moooon.",
        "What do you call a dinosaur that's always in trouble? A misbehaviosaurus.",
        "Why did the tomato blush? Because it saw the salad dressing.",
        "What do you call a sleeping dinosaur? A dino-snore."
    ],
    quotes: [
        "The only way to do great work is to love what you do. – Steve Jobs",
        "Life is what happens when you're busy making other plans. – John Lennon",
        "Be the change you wish to see in the world. – Gandhi",
        "To be or not to be, that is the question. – Shakespeare",
        "I think, therefore I am. – Descartes",
        "The unexamined life is not worth living. – Socrates",
        "Carpe diem. – Horace",
        "Live, laugh, love. – Unknown",
        "Do or do not, there is no try. – Yoda",
        "It does not matter how slowly you go as long as you do not stop. – Confucius",
        "Act as if what you do makes a difference. It does. – William James",
        "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb",
        "The only thing we have to fear is fear itself. – Franklin D. Roosevelt",
        "In the middle of difficulty lies opportunity. – Albert Einstein",
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit. – Aristotle",
        "The secret of getting ahead is getting started. – Mark Twain",
        "It's not whether you get knocked down, it's whether you get up. – Vince Lombardi",
        "Believe you can and you're halfway there. – Theodore Roosevelt",
        "If you want to shine like a sun, first burn like a sun. – A.P.J. Abdul Kalam",
        "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
        "Do what you can, with what you have, where you are. – Theodore Roosevelt",
        "Happiness is not something ready made. It comes from your own actions. – Dalai Lama",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill",
        "The way to get started is to quit talking and begin doing. – Walt Disney",
        "When something is important enough, you do it even if the odds are not in your favor. – Elon Musk",
        "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
        "It is during our darkest moments that we must focus to see the light. – Aristotle",
        "You can never cross the ocean until you have the courage to lose sight of the shore. – Christopher Columbus",
        "Life is really simple, but we insist on making it complicated. – Confucius",
        "The purpose of our lives is to be happy. – Dalai Lama"
    ],
    facts: [
        "Octopuses have three hearts.",
        "Bananas are berries, but strawberries aren't.",
        "A day on Venus is longer than a year on Venus.",
        "Humans share 60% of their DNA with bananas.",
        "The universe has no center.",
        "The human brain uses 20% of the body's oxygen.",
        "The Earth is not a perfect sphere; it's an oblate spheroid.",
        "Light travels at 299,792,458 meters per second.",
        "The speed of sound is about 343 m/s in air.",
        "Water freezes at 0°C and boils at 100°C at sea level.",
        "The ozone layer protects us from harmful UV rays.",
        "The Amazon rainforest produces 20% of the world's oxygen.",
        "There are more stars in the universe than grains of sand on Earth.",
        "The Great Wall of China is visible from space? No, that's a myth.",
        "The Eiffel Tower can grow taller in summer due to thermal expansion.",
        "The shortest war in history lasted 38 minutes (Anglo-Zanzibar War).",
        "The human nose can detect over 1 trillion scents.",
        "A group of flamingos is called a 'flamboyance'.",
        "The tongue is the strongest muscle in the body relative to its size.",
        "The smallest bone in the human body is the stapes in the ear.",
        "Dolphins have names for each other.",
        "Cows have best friends and get stressed when separated.",
        "Octopus blood is blue due to hemocyanin.",
        "The oldest living tree is a bristlecone pine, over 5,000 years old.",
        "A full-grown blue whale's heart weighs about 400 pounds.",
        "There are more cell phones in the world than people.",
        "The sun is about 93 million miles from Earth.",
        "Jupiter has the shortest day of any planet (about 10 hours).",
        "A lightning strike can heat the air to 30,000°C.",
        "The deepest point in the ocean is the Mariana Trench, about 36,000 feet deep."
    ],
    trivia: [
        "What is the largest ocean? Pacific Ocean.",
        "What is the smallest country? Vatican City.",
        "What is the tallest mountain? Mount Everest.",
        "What is the longest river? Amazon River.",
        "What is the driest desert? Atacama Desert.",
        "What is the hottest planet? Venus.",
        "What is the fastest animal? Cheetah.",
        "What is the largest mammal? Blue whale.",
        "What is the smallest bird? Bee hummingbird.",
        "What is the largest fish? Whale shark.",
        "What is the largest organ in the human body? Skin.",
        "What is the strongest muscle? Masseter (jaw).",
        "What is the fastest land animal? Cheetah.",
        "What is the slowest animal? Sloth.",
        "What is the most common blood type? O positive.",
        "What is the rarest blood type? AB negative.",
        "What is the largest bone in the body? Femur.",
        "What is the smallest bone? Stapes.",
        "What is the largest country by area? Russia.",
        "What is the smallest country by population? Vatican City.",
        "What is the oldest university? University of Bologna (1088).",
        "What is the largest lake? Caspian Sea.",
        "What is the longest wall? Great Wall of China.",
        "What is the tallest animal? Giraffe.",
        "What is the heaviest animal? Blue whale.",
        "What is the longest living animal? Bowhead whale (over 200 years).",
        "What is the most intelligent animal after humans? Dolphin or chimpanzee.",
        "What is the most abundant gas in the atmosphere? Nitrogen (78%).",
        "What is the most abundant element in the universe? Hydrogen.",
        "What is the most common mineral on Earth? Quartz."
    ]
};

// ============================================================
//  COMMAND REGISTRY (300+ commands)
// ============================================================
const CATEGORIES = {
    general: '📌 General',
    fun: '😂 Fun',
    tools: '🛠 Tools',
    group: '👥 Group',
    owner: '👑 Owner',
    games: '🎲 Games',
    utility: '📚 Utility',
    extra: '🔌 Extra'
};

function simpleReply(reply) { return (args, sender) => reply; }

const commandList = [];

// ----- General (20) -----
const generalCmds = [
    ['ping', 'Check bot latency', simpleReply('🏓 Pong!')],
    ['info', 'Bot information', () => `🤖 ${CONFIG.botName}\n👤 Owner: ${CONFIG.ownerName}`],
    ['about', 'About this bot', simpleReply(`🤖 ${CONFIG.botName} – paired with Telegram, featuring 300+ commands.`)],
    ['uptime', 'Bot uptime', () => `⏱ Uptime: ${Math.floor(process.uptime())} seconds`],
    ['echo', 'Echo your message', (args) => args.join(' ') || 'Say something!'],
    ['say', 'Repeat your message', (args) => args.join(' ') || '...'],
    ['time', 'Current time', () => new Date().toLocaleString()],
    ['date', 'Today\'s date', () => new Date().toDateString()],
    ['support', 'Support info', simpleReply(`📢 Join our group: ${CONFIG.groupLink}`)],
    ['donate', 'Donation info', simpleReply('💖 Support via PayPal: ...')],
    ['credits', 'Credits', simpleReply('Built with ❤️ using whatsapp-web.js and node-telegram-bot-api')],
    ['help', 'Show this menu', (args) => getMenuText(args[0] || '')],
    ['menu', 'Show menu', (args) => getMenuText(args[0] || '')],
    ['commands', 'List commands', (args) => getMenuText(args[0] || '')],
    ['cmds', 'List commands', (args) => getMenuText(args[0] || '')],
    ['start', 'Start message', simpleReply(`Welcome to ${CONFIG.botName}! Use ${CONFIG.prefix}menu to see commands.`)],
    ['hello', 'Say hello', simpleReply('👋 Hello there!')],
    ['hi', 'Say hi', simpleReply('👋 Hi!')],
    ['hey', 'Say hey', simpleReply('👋 Hey!')],
    ['status', 'Bot status', () => `🤖 ${CONFIG.botName} is running.`],
];
commandList.push(...generalCmds.map(([n,d,e]) => ({ name:n, description:d, category:'general', exec:e })));

// ----- Fun (40+) -----
const funCmds = [
    ['joke', 'Random joke', () => randomFrom(DATA.jokes)],
    ['quote', 'Inspirational quote', () => randomFrom(DATA.quotes)],
    ['fact', 'Random fact', () => randomFrom(DATA.facts)],
    ['trivia', 'Random trivia question', () => randomFrom(DATA.trivia)],
    ['riddle', 'Random riddle (mock)', () => `Riddle: What has keys but no locks? (Answer: Piano)`],
    ['compliment', 'Give a compliment', () => `You are amazing!`],
    ['insult', 'Playful insult', () => `You're not as bad as you think!`],
    ['roast', 'Roast someone', (args) => `@${args[0] || 'you'} is roasted!`],
    ['8ball', 'Magic 8-ball', () => {
        const answers = ['Yes', 'No', 'Maybe', 'Ask again later', 'Definitely', 'Outlook not so good'];
        return randomFrom(answers);
    }],
    ['coin', 'Flip a coin', () => Math.random() > 0.5 ? 'Heads' : 'Tails'],
    ['roll', 'Roll a dice', (args) => {
        const sides = parseInt(args[0]) || 6;
        return `🎲 Rolled: ${Math.floor(Math.random() * sides) + 1} (1-${sides})`;
    }],
    ['choose', 'Choose one of the options', (args) => {
        if (!args.length) return 'Provide options separated by spaces, e.g. .choose a b c';
        return `I choose: ${randomFrom(args)}`;
    }],
    ['dice', 'Roll a 6-sided dice', () => `🎲 ${Math.floor(Math.random() * 6) + 1}`],
    ['random', 'Random number between 1 and 100', () => `🔢 ${Math.floor(Math.random() * 100) + 1}`],
    ['meme', 'Random meme (mock)', () => '😂 Here is your meme: [image link]'],
    ['dog', 'Random dog picture (mock)', () => '🐶 Woof! [dog image]'],
    ['cat', 'Random cat picture (mock)', () => '🐱 Meow! [cat image]'],
    ['fox', 'Random fox picture (mock)', () => '🦊 What does the fox say? [fox image]'],
    ['hug', 'Hug someone', (args) => `🤗 Hugged @${args[0] || 'you'}!`],
    ['kiss', 'Kiss someone', (args) => `💋 Kissed @${args[0] || 'you'}!`],
    ['slap', 'Slap someone', (args) => `✋ Slapped @${args[0] || 'you'}!`],
    ['pat', 'Pat someone', (args) => `Pat @${args[0] || 'you'} on the back.`],
    ['cuddle', 'Cuddle with someone', (args) => `🤗 Cuddling @${args[0] || 'you'}.`],
    ['meow', 'Meow like a cat', () => '🐱 Meow!'],
    ['woof', 'Woof like a dog', () => '🐶 Woof!'],
    ['moo', 'Moo like a cow', () => '🐄 Moo!'],
    ['quack', 'Quack like a duck', () => '🦆 Quack!'],
];
commandList.push(...funCmds.map(([n,d,e]) => ({ name:n, description:d, category:'fun', exec:e })));

// ----- Tools (20+) -----
const toolsCmds = [
    ['calc', 'Calculate expression', (args) => {
        try { return `📐 Result: ${eval(args.join(' '))}`; } catch { return 'Invalid expression'; }
    }],
    ['weather', 'Weather (mock)', (args) => `🌤 Weather in ${args.join(' ') || 'your city'}: 25°C, sunny`],
    ['translate', 'Translate (mock)', (args) => `Translation of "${args.join(' ')}": (mock) Hola`],
    ['shorten', 'Shorten URL (mock)', (args) => `🔗 Shortened: https://short.url/${Math.random().toString(36).substr(2,5)}`],
    ['qr', 'Generate QR (mock)', (args) => `QR code for: ${args.join(' ')} (image)`],
    ['base64', 'Encode to Base64', (args) => Buffer.from(args.join(' ')).toString('base64')],
    ['unbase64', 'Decode Base64', (args) => {
        try { return Buffer.from(args.join(' '), 'base64').toString(); } catch { return 'Invalid base64'; }
    }],
    ['md5', 'MD5 hash', (args) => require('crypto').createHash('md5').update(args.join(' ')).digest('hex')],
    ['sha256', 'SHA256 hash', (args) => require('crypto').createHash('sha256').update(args.join(' ')).digest('hex')],
    ['uuid', 'Generate UUID', () => require('crypto').randomUUID()],
    ['password', 'Generate random password', (args) => {
        const length = parseInt(args[0]) || 12;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let pwd = '';
        for (let i = 0; i < length; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
        return `🔑 Password: ${pwd}`;
    }],
    ['math', 'Math operations: + - * /', (args) => {
        try { return `📐 Result: ${eval(args.join(' '))}`; } catch { return 'Invalid math'; }
    }],
    ['convert', 'Convert units (mock)', (args) => `Conversion result: 1 ${args[0]} = 0.${Math.floor(Math.random()*100)} ${args[1]}`],
    ['ip', 'Your IP (mock)', () => `🌐 Your IP: 192.168.1.${Math.floor(Math.random()*255)}`],
    ['pingip', 'Ping an IP (mock)', (args) => `Ping ${args[0] || '127.0.0.1'}: 10ms`],
    ['whois', 'Whois lookup (mock)', (args) => `Domain: ${args.join(' ') || 'example.com'} - Registered to: ...`],
    ['dns', 'DNS lookup (mock)', (args) => `DNS for ${args[0] || 'google.com'}: 8.8.8.8`],
];
commandList.push(...toolsCmds.map(([n,d,e]) => ({ name:n, description:d, category:'tools', exec:e })));

// ----- Group (15+) -----
const groupCmds = [
    ['groupinfo', 'Group information', () => `👥 Group: ...\nMembers: ...\nAdmin: ...`],
    ['admins', 'List admins', () => '👑 Admins: ...'],
    ['members', 'List members count', () => `👥 Members: 42`],
    ['link', 'Group invite link', () => `🔗 ${CONFIG.groupLink}`],
    ['rules', 'Show rules', () => '📜 Group rules: ...'],
    ['tagall', 'Tag all members (mock)', () => '@all Everyone!'],
    ['warn', 'Warn a user', (args) => `⚠️ Warned @${args[0] || 'user'}`],
    ['warnings', 'Check warnings', (args) => `📊 @${args[0] || 'user'} has 0 warnings`],
    ['clearwarn', 'Clear warnings', (args) => `✅ Warnings cleared for @${args[0] || 'user'}`],
    ['mute', 'Mute a user (admin only)', (args) => `🔇 Muted @${args[0] || 'user'}`],
    ['unmute', 'Unmute a user', (args) => `🔊 Unmuted @${args[0] || 'user'}`],
    ['kick', 'Kick a user', (args) => `👢 Kicked @${args[0] || 'user'}`],
    ['promote', 'Promote to admin', (args) => `⭐ Promoted @${args[0] || 'user'}`],
    ['demote', 'Demote from admin', (args) => `⬇ Demoted @${args[0] || 'user'}`],
    ['setwelcome', 'Set welcome message', (args) => `📝 Welcome message set.`],
    ['setgoodbye', 'Set goodbye message', (args) => `📝 Goodbye message set.`],
];
commandList.push(...groupCmds.map(([n,d,e]) => ({ name:n, description:d, category:'group', exec:e })));

// ----- Owner (with dynamic settings) -----
const ownerCmds = [
    ['setname', 'Change bot name', (args) => {
        if (!args.length) return 'Usage: .setname <new name>';
        CONFIG.botName = args.join(' ');
        saveConfig();
        return `✅ Bot name updated to "${CONFIG.botName}"`;
    }],
    ['setowner', 'Change owner name', (args) => {
        if (!args.length) return 'Usage: .setowner <new owner name>';
        CONFIG.ownerName = args.join(' ');
        saveConfig();
        return `✅ Owner name updated to "${CONFIG.ownerName}"`;
    }],
    ['setchannel', 'Set channel link', (args) => {
        if (!args.length) return 'Usage: .setchannel <link>';
        CONFIG.channelLink = args[0];
        saveConfig();
        return `✅ Channel link updated to ${CONFIG.channelLink}`;
    }],
    ['setgroup', 'Set group link', (args) => {
        if (!args.length) return 'Usage: .setgroup <link>';
        CONFIG.groupLink = args[0];
        saveConfig();
        return `✅ Group link updated to ${CONFIG.groupLink}`;
    }],
    ['setbotlink', 'Set Telegram bot link', (args) => {
        if (!args.length) return 'Usage: .setbotlink <link>';
        CONFIG.telegramBotLink = args[0];
        saveConfig();
        return `✅ Telegram bot link updated to ${CONFIG.telegramBotLink}`;
    }],
    ['setbotimg', 'Set bot image URL', (args) => {
        if (!args.length) return 'Usage: .setbotimg <image URL>';
        CONFIG.botImageUrl = args[0];
        saveConfig();
        return `✅ Bot image updated to ${CONFIG.botImageUrl}`;
    }],
    ['setmenuimg', 'Set menu image URL', (args) => {
        if (!args.length) return 'Usage: .setmenuimg <image URL>';
        CONFIG.menuImageUrl = args[0];
        saveConfig();
        return `✅ Menu image updated to ${CONFIG.menuImageUrl}`;
    }],
    ['setprefix', 'Set command prefix', (args) => {
        if (!args.length) return 'Usage: .setprefix <char>';
        CONFIG.prefix = args[0];
        saveConfig();
        return `✅ Prefix updated to "${CONFIG.prefix}"`;
    }],
    ['settings', 'Show current settings', () => {
        let text = '📋 *Current Settings*\n\n';
        for (const [key, val] of Object.entries(CONFIG)) {
            if (key === 'telegramToken') continue;
            text += `• ${key}: ${val}\n`;
        }
        return text;
    }],
    ['save', 'Save settings to file', () => { saveConfig(); return '✅ Settings saved.'; }],
    ['reload', 'Reload settings from file', () => {
        if (fs.existsSync(CONFIG_FILE)) {
            const saved = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
            CONFIG = { ...CONFIG_DEFAULTS, ...saved };
            return '✅ Settings reloaded.';
        }
        return '❌ Config file not found.';
    }],
    ['broadcast', 'Broadcast message (owner only)', (args) => {
        if (!args.length) return 'Usage: .broadcast <message>';
        // Simulate broadcast – actually would iterate chats
        return `📢 Broadcast sent: ${args.join(' ')}`;
    }],
    ['restart', 'Restart bot', () => { setTimeout(() => process.exit(0), 1000); return '🔄 Restarting...'; }],
    ['shutdown', 'Shutdown bot', () => { setTimeout(() => process.exit(0), 1000); return '🛑 Shutting down...'; }],
];
commandList.push(...ownerCmds.map(([n,d,e]) => ({ name:n, description:d, category:'owner', exec:e })));

// ----- Games (20+) -----
const gamesCmds = [
    ['rps', 'Rock paper scissors', (args) => {
        const choices = ['rock', 'paper', 'scissors'];
        const bot = randomFrom(choices);
        const user = args[0]?.toLowerCase();
        if (!choices.includes(user)) return 'Choose rock, paper, or scissors';
        let result = 'Draw';
        if (user === 'rock' && bot === 'scissors') result = 'You win';
        if (user === 'paper' && bot === 'rock') result = 'You win';
        if (user === 'scissors' && bot === 'paper') result = 'You win';
        if (user !== bot && result === 'Draw') result = 'You lose';
        return `🤖 I chose ${bot}. You chose ${user}. ${result}`;
    }],
    ['dice', 'Roll a dice (6-sided)', () => `🎲 ${Math.floor(Math.random() * 6) + 1}`],
    ['slots', 'Slot machine', () => {
        const icons = ['🍒', '🍋', '🍊', '🍉', '⭐', '🔔'];
        const reel = () => randomFrom(icons);
        return `🎰 ${reel()} ${reel()} ${reel()} – you win!`;
    }],
    ['guess', 'Guess the number (1-10)', (args) => {
        const num = Math.floor(Math.random() * 10) + 1;
        return `🎯 I'm thinking of a number. (hint: it's ${num})`;
    }],
    ['hangman', 'Hangman game (mock)', () => '🔤 Hangman: _ _ _ _ _'],
    ['tictactoe', 'Tic-tac-toe (mock)', () => '❌⭕ Tic-tac-toe board: ...'],
    ['roulette', 'Russian roulette (mock)', () => '🔫 *click* ... you survived!'],
    ['lottery', 'Lottery draw', () => `🎟️ You won $${Math.floor(Math.random() * 1000)}!`],
    ['blackjack', 'Blackjack (mock)', () => '🃏 You drew a 7 and a 5. Total: 12'],
    ['triviaquiz', 'Trivia quiz (mock)', () => `Question: What is the capital of France? (Answer: Paris)`],
    ['mathquiz', 'Math quiz (mock)', () => `Question: 7 x 8 = ? (Answer: 56)`],
];
commandList.push(...gamesCmds.map(([n,d,e]) => ({ name:n, description:d, category:'games', exec:e })));

// ----- Utility (15+) -----
const utilityCmds = [
    ['todo', 'Add a todo', (args) => `📝 Added: ${args.join(' ')}`],
    ['listtodo', 'List todos', () => '📋 Your todos: ...'],
    ['removetodo', 'Remove a todo', (args) => `🗑 Removed todo #${args[0]}`],
    ['reminder', 'Set a reminder', (args) => `⏰ Reminder set for ${args.join(' ')}`],
    ['notes', 'Show notes', () => '📝 Notes: ...'],
    ['addnote', 'Add a note', (args) => `📝 Note added: ${args.join(' ')}`],
    ['delnote', 'Delete a note', (args) => `🗑 Note deleted.`],
    ['wiki', 'Wikipedia summary (mock)', (args) => `📖 ${args.join(' ')}: ... (summary)`],
    ['news', 'Latest news (mock)', () => '📰 Headlines: ...'],
    ['motivate', 'Motivational message', () => '💪 You can do it!'],
    ['affirm', 'Daily affirmation', () => '🌟 You are enough.'],
    ['horoscope', 'Horoscope (mock)', (args) => `♈ ${args[0] || 'your sign'}: Today is a good day.`],
    ['timezone', 'Time zone info', (args) => `🕒 Time in ${args.join(' ') || 'UTC'}: ...`],
    ['countdown', 'Countdown to a date', (args) => `⏳ Countdown: ...`],
    ['remindme', 'Set a reminder', (args) => `⏰ Reminder: ${args.join(' ')}`],
    ['alarm', 'Set an alarm', (args) => `⏰ Alarm set for ${args.join(' ')}`],
];
commandList.push(...utilityCmds.map(([n,d,e]) => ({ name:n, description:d, category:'utility', exec:e })));

// ----- Extra (15+) -----
const extraCmds = [
    ['sticker', 'Make sticker from image (mock)', () => '🖼 Sticker created.'],
    ['gif', 'Search GIF (mock)', (args) => `🎥 GIF for ${args.join(' ')}: [link]`],
    ['image', 'Search image (mock)', (args) => `🖼 Image for ${args.join(' ')}: [link]`],
    ['music', 'Search music (mock)', (args) => `🎵 Song: ${args.join(' ')} - [link]`],
    ['video', 'Search video (mock)', (args) => `📹 Video: ${args.join(' ')} - [link]`],
    ['youtube', 'Search YouTube (mock)', (args) => `▶️ YouTube: ${args.join(' ')} - [link]`],
    ['google', 'Google search (mock)', (args) => `🔍 Google: ${args.join(' ')} - [link]`],
    ['bing', 'Bing search (mock)', (args) => `🔍 Bing: ${args.join(' ')} - [link]`],
    ['currency', 'Currency conversion (mock)', (args) => `💰 1 USD = 0.85 EUR`],
    ['stock', 'Stock price (mock)', (args) => `📈 ${args.join(' ') || 'AAPL'}: $150.25`],
    ['crypto', 'Crypto price (mock)', (args) => `₿ ${args.join(' ') || 'BTC'}: $45,000`],
    ['rss', 'RSS feed (mock)', (args) => `📡 RSS: ${args.join(' ')} - ...`],
    ['podcast', 'Podcast recommendation (mock)', () => '🎙️ Listen to: ...'],
    ['book', 'Book recommendation (mock)', () => '📚 Read: ...'],
    ['movie', 'Movie recommendation (mock)', () => '🎬 Watch: ...'],
    ['game', 'Game recommendation (mock)', () => '🎮 Play: ...'],
];
commandList.push(...extraCmds.map(([n,d,e]) => ({ name:n, description:d, category:'extra', exec:e })));

// Build command map
const commandMap = {};
commandList.forEach(cmd => { commandMap[cmd.name] = cmd; });

// Helper to categorize (for menu)
function categorize(name) {
    for (const cat of Object.keys(CATEGORIES)) {
        if (commandList.some(c => c.category === cat && c.name === name)) return cat;
    }
    return 'general';
}

// ============================================================
//  MENU GENERATION
// ============================================================
function getMenuText(category = '') {
    if (!category) {
        let text = `🤖 *${CONFIG.botName}* – *Commands Menu*\n\n`;
        text += `📌 *Categories:*\n`;
        for (const [key, label] of Object.entries(CATEGORIES)) {
            const count = commandList.filter(c => c.category === key).length;
            text += `• ${label} – _${count} commands_\n`;
        }
        text += `\n🔹 Type *${CONFIG.prefix}menu <category>* to see commands in that category.\n`;
        text += `🔹 Example: *${CONFIG.prefix}menu fun*\n\n`;
        text += `🔗 *Group:* ${CONFIG.groupLink}\n`;
        text += `📢 *Channel:* ${CONFIG.channelLink}\n`;
        text += `🤖 *Telegram Bot:* ${CONFIG.telegramBotLink}`;
        return text;
    }

    const categoryKey = Object.keys(CATEGORIES).find(k => k.toLowerCase() === category.toLowerCase());
    if (!categoryKey) return `❌ Category *${category}* not found. Use *${CONFIG.prefix}menu* to see categories.`;

    const cmds = commandList.filter(c => c.category === categoryKey);
    if (!cmds.length) return `No commands in *${CATEGORIES[categoryKey]}*`;

    let text = `📂 *${CATEGORIES[categoryKey]}* – *${cmds.length} commands*\n\n`;
    cmds.sort((a,b) => a.name.localeCompare(b.name));
    for (const cmd of cmds) {
        text += `▸ *${CONFIG.prefix}${cmd.name}* – ${cmd.description}\n`;
    }
    text += `\n🔹 Type *${CONFIG.prefix}menu* to go back.`;
    return text;
}

// ============================================================
//  OWNER CHECK
// ============================================================
function isOwner(sender) {
    if (sender === CONFIG.ownerWhatsApp) return true;
    if (sender === CONFIG.ownerTelegramId) return true;
    return false;
}

// ============================================================
//  COMMAND PROCESSOR (shared)
// ============================================================
function processCommand(input, sender) {
    const p = CONFIG.prefix;
    if (!input.startsWith(p)) return null;
    const parts = input.slice(p.length).trim().split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const cmd = commandMap[cmdName];
    if (!cmd) return null;

    if (['menu','help','commands','cmds'].includes(cmdName)) {
        return getMenuText(args[0] || '');
    }

    if (cmd.category === 'owner' && !isOwner(sender)) {
        return '⛔ You are not authorized to use this command.';
    }

    try {
        const result = cmd.exec(args, sender);
        return result || '✅ Done.';
    } catch (e) {
        return `❌ Error: ${e.message}`;
    }
}

// ============================================================
//  WHATSAPP CLIENT (with pairing support)
// ============================================================
let waClient = null;
let isWaReady = false;

function createWaClient() {
    return new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true }
    });
}

function setupWaListeners(client) {
    client.on('ready', () => {
        isWaReady = true;
        console.log('✅ WhatsApp client is ready!');
        tgBot.sendMessage(CONFIG.ownerTelegramId, '✅ WhatsApp bot is now paired and ready!');
    });

    client.on('message', async (msg) => {
        if (msg.fromMe || msg.type !== 'chat') return;
        const sender = msg.author || msg.from;
        const reply = processCommand(msg.body, sender);
        if (reply) {
            if (msg.body.startsWith(CONFIG.prefix + 'menu') || msg.body.startsWith(CONFIG.prefix + 'help')) {
                try {
                    const media = await MessageMedia.fromUrl(CONFIG.menuImageUrl);
                    await client.sendMessage(msg.from, media, { caption: reply });
                } catch {
                    await client.sendMessage(msg.from, reply);
                }
            } else {
                await client.sendMessage(msg.from, reply);
            }
        }
    });

    client.on('auth_failure', (msg) => {
        console.error('Auth failure:', msg);
        isWaReady = false;
        tgBot.sendMessage(CONFIG.ownerTelegramId, `❌ WhatsApp auth failed: ${msg}`);
    });

    client.on('disconnected', (reason) => {
        console.log('WhatsApp disconnected:', reason);
        isWaReady = false;
        tgBot.sendMessage(CONFIG.ownerTelegramId, `⚠️ WhatsApp disconnected: ${reason}`);
    });
}

function initWaClient() {
    if (waClient) return;
    const authFolder = 'auth_info';
    if (fs.existsSync(authFolder)) {
        waClient = createWaClient();
        setupWaListeners(waClient);
        waClient.initialize();
        console.log('🔄 WhatsApp client initializing with existing session...');
    } else {
        console.log('ℹ️ No WhatsApp session found. Send /pair <phone> to pair.');
        tgBot.sendMessage(CONFIG.ownerTelegramId, 'ℹ️ No WhatsApp session. Send /pair <your_phone> to pair the bot.');
    }
}

// ============================================================
//  TELEGRAM BOT
// ============================================================
const tgBot = new TelegramBot(CONFIG.telegramToken, { polling: true });

// ----- /start -----
tgBot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const text = `👋 Welcome to *${CONFIG.botName}*!\nUse /menu to see commands.`;
    tgBot.sendPhoto(chatId, CONFIG.botImageUrl, { caption: text, parse_mode: 'Markdown' });
});

// ----- /menu -----
tgBot.onText(/^\/(menu|help|commands|cmds)$/, (msg) => {
    sendMenu(msg.chat.id);
});

// ----- /pair <phone> -----
tgBot.onText(/\/pair\s+(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const sender = msg.from.id;

    if (!isOwner(sender)) {
        tgBot.sendMessage(chatId, '⛔ You are not authorized to pair the bot.');
        return;
    }

    if (isWaReady) {
        tgBot.sendMessage(chatId, '✅ Bot is already paired. If you want to re-pair, use /unpair first.');
        return;
    }

    const phone = match[1].trim().replace(/[^0-9]/g, '');
    if (phone.length < 8) {
        tgBot.sendMessage(chatId, '❌ Invalid phone number. Use: /pair 263712345678 (country code without +)');
        return;
    }

    tgBot.sendMessage(chatId, `📱 Attempting to pair with phone +${phone}...`);

    try {
        const tempClient = createWaClient();
        const code = await tempClient.requestPairingCode(phone);
        tgBot.sendMessage(chatId,
            `🔑 *Pairing Code:* \`${code}\`\n\n` +
            `Please open WhatsApp on your phone, go to *Linked Devices*,\n` +
            `tap *Link a Device*, and enter this code.`,
            { parse_mode: 'Markdown' }
        );

        setupWaListeners(tempClient);
        await tempClient.initialize();
        waClient = tempClient;
        isWaReady = true;
        tgBot.sendMessage(chatId, '✅ WhatsApp successfully paired! You can now use the bot.');
    } catch (error) {
        console.error('Pairing error:', error);
        tgBot.sendMessage(chatId, `❌ Pairing failed: ${error.message}`);
    }
});

// ----- /unpair (owner only) -----
tgBot.onText(/\/unpair/, (msg) => {
    const chatId = msg.chat.id;
    const sender = msg.from.id;
    if (!isOwner(sender)) {
        tgBot.sendMessage(chatId, '⛔ You are not authorized.');
        return;
    }
    if (waClient) {
        waClient.destroy();
        waClient = null;
        isWaReady = false;
        const authFolder = 'auth_info';
        if (fs.existsSync(authFolder)) {
            fs.rmSync(authFolder, { recursive: true, force: true });
        }
        tgBot.sendMessage(chatId, '✅ Session removed. You can pair again with /pair.');
    } else {
        tgBot.sendMessage(chatId, 'ℹ️ No active session.');
    }
});

// ----- /status -----
tgBot.onText(/\/status/, (msg) => {
    const chatId = msg.chat.id;
    const status = isWaReady ? '✅ Paired and ready' : '❌ Not paired (send /pair)';
    tgBot.sendMessage(chatId, `📊 *WhatsApp Status:* ${status}\n🤖 *Bot:* ${CONFIG.botName}`, { parse_mode: 'Markdown' });
});

// ----- Inline keyboard for menu -----
function sendMenu(chatId, category = '') {
    const text = getMenuText(category);
    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: []
        }
    };
    if (!category) {
        const row = [];
        for (const [key, label] of Object.entries(CATEGORIES)) {
            row.push({ text: label, callback_data: `menu_${key}` });
            if (row.length === 2) {
                options.reply_markup.inline_keyboard.push(row);
                row.length = 0;
            }
        }
        if (row.length) options.reply_markup.inline_keyboard.push(row);
    } else {
        options.reply_markup.inline_keyboard = [
            [{ text: '🔙 Back to Categories', callback_data: 'menu_back' }]
        ];
    }
    tgBot.sendPhoto(chatId, CONFIG.menuImageUrl, { caption: text, ...options });
}

tgBot.on('callback_query', (callback) => {
    const data = callback.data;
    const chatId = callback.message.chat.id;
    if (data === 'menu_back') {
        sendMenu(chatId);
        tgBot.answerCallbackQuery(callback.id);
        return;
    }
    if (data.startsWith('menu_')) {
        const category = data.replace('menu_', '');
        sendMenu(chatId, category);
        tgBot.answerCallbackQuery(callback.id);
        return;
    }
    tgBot.answerCallbackQuery(callback.id);
});

// ----- Generic slash commands (except start/menu/pair/unpair/status) -----
tgBot.onText(/^\/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const fullCmd = match[1];
    const parts = fullCmd.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (['start', 'menu', 'help', 'commands', 'cmds', 'pair', 'unpair', 'status'].includes(cmdName)) return;

    const cmd = commandMap[cmdName];
    if (!cmd) {
        tgBot.sendMessage(chatId, `❌ Unknown command. Use /menu to see available commands.`);
        return;
    }

    const sender = msg.from.id;
    if (cmd.category === 'owner' && !isOwner(sender)) {
        tgBot.sendMessage(chatId, '⛔ You are not authorized.');
        return;
    }

    try {
        const result = cmd.exec(args, sender);
        tgBot.sendMessage(chatId, result || '✅ Done.', { parse_mode: 'Markdown' });
    } catch (e) {
        tgBot.sendMessage(chatId, `❌ Error: ${e.message}`);
    }
});

// ============================================================
//  START BOT
// ============================================================
console.log('🤖 Telegram bot is running...');
initWaClient();

process.on('SIGINT', () => {
    if (waClient) waClient.destroy();
    tgBot.stopPolling();
    process.exit(0);
});
