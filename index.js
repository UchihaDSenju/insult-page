import * as htmlToImage from 'html-to-image';
import toastr from 'toastr';

const avatarImg = document.querySelector('.avatar');
var userName = document.querySelector('.nameInput');
const insultBtn = document.querySelector('.insultBtn');
const buttons = document.querySelector('.buttons');
var users = [];
if(localStorage.getItem('users')){
    users = localStorage.getItem('users').split(",");
}
let flag = 0;
console.log(users);


if(localStorage.getItem("date") != new Date().getDate()){
    localStorage.clear();
    localStorage.setItem("date", new Date().getDate());
}

// toaster options
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

const myAvatar = 'https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50&eyebrows=variant01&eyes=variant26&mouth=variant23&skinColor=ecad80&hairColor=0e0e0e&hair=short16&glasses=variant01&glassesProbability=100'

var inputName = "";
var gender;

var author = [
    'tariq',
    'mohamed tariq',
    'mohamed'
  ]

var urlExtra = 'https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50';
var seed = '';
var hair = '';
var num;

var url = "https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50";

const earring = parseInt(Math.random() * 6);
// url += "&earrings=variant0" + earring + "&earringsProbability=100"; // To add earrings to the avatar


// Adding event listener to the userNameInputTag that we ahve created
userName.addEventListener('keyup', () => {
    inputName = userName.value;
    console.log(inputName)
    var foundGender = "";
    fetch('https://api.genderize.io/?name=' + inputName)
    .then((res) => res.json())
    .then((data) => {
        foundGender = data.gender;
        gender = foundGender;
        if(author.includes(userName.value.toLowerCase().trim())){
            avatarImg.innerHTML = `
            <img class = 'avatarImg'
                src=${myAvatar}
                alt="avatar"
            />
            `
            flag = 1;
        }
        else if(inputName.length >= 3){
            insultBtn.style.display = 'inline';
            changeAvatar();
        }else{
            avatarImg.innerHTML = '';
            insultBtn.style.display = 'none';
        }
        // console.log(foundGender + gender);
    })
})

// Change the avatar
const changeAvatar = function(){
    seed = '&seed=' + userName.value;
    if(gender == 'male'){
        num = parseInt(Math.random() * 19);
        if(num==0) num=1;
        hair = '&hair=short' + ("0" + num).slice(-2);
    }
    if(gender == 'female'){
        num = parseInt(Math.random() * 26);
        if(num == 0) num = 1;
        hair = '&hair=long' + ("0" + num).slice(-2);
    }
    urlExtra = `${url}${seed}${hair}`
    avatarImg.innerHTML = `
    <img class = 'avatarImg'
        src=${urlExtra}
        alt="avatar"
    />
    `
}

// Dowmloading an image
const downloadBtn = document.querySelector('.downloadBtn');
downloadBtn.addEventListener('click', () => {
    console.log('clicked');
    const screenshotTarget = document.querySelector('.appContainer');
    buttons.style.display = 'none';
    htmlToImage.toPng(screenshotTarget)
    .then(function (dataUrl) {
        const link = document.createElement('a');
        link.href=dataUrl;
        link.download = "insult-avatar.png";
        link.click();
        link.remove();

    });
    buttons.style.display = 'flex';
})

// Insult the person 
insultBtn.addEventListener('click', insult)
window.addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        e.preventDefault()
        insult();
    }
})

// Calling the insult function
function insult(){
    if(!userName.value){
        toastr["error"]("Please enter a name");
        return;
    }
    if(flag){
        flag = 0;
        toastr["info"]("Sorry folks but you cannot insult the owner 😜")
        return;
    }
    const heading = document.querySelector('.heading h1');
    var insult = document.querySelector('.insult');
    var insultainer = document.querySelector('.insultainer')
    buttons.style.display = flag ? 'none' : 'flex' ;
    heading.innerHTML = userName.value;
    insultainer.style.display = 'block';
    userName.style.display = 'none';
    insultBtn.style.display = 'none';
    if(users.includes(userName.value.toLowerCase())){
        insult.innerHTML = "How many times in a day should i insult you ?";
    }
    else{
        const num = parseInt(Math.random() * insults.length);
        insult.innerHTML = insults[num];
        users.push(userName.value.toLowerCase());
        localStorage.setItem('users', users);
    }
}

let insults = [
    "If I throw a stick, will you leave?",
    "You’re a gray sprinkle on a rainbow cupcake.",
    "If your brain was dynamite, there wouldn’t be enough to blow your hat off.",
    "You are more disappointing than an unsalted pretzel.",
    "Light travels faster than sound, which is why you seemed bright until you spoke.",
    "We were happily married for one month, but unfortunately, we’ve been married for 10 years.",
    "Your kid is so annoying he makes his Happy Meal cry.",
    "You have so many gaps in your teeth it looks like your tongue is in jail.",
    "Your secrets are always safe with me. I never even listen when you tell me them.",
    "I’ll never forget the first time we met. But I’ll keep trying.",
    "I forgot the world revolves around you. My apologies! How silly of me.",
    "I only take you everywhere I go just so I don’t have to kiss you goodbye.",
    "Hold still. I’m trying to imagine you with a personality.",
    "Our kid must have gotten his brain from you! I still have mine.",
    "Your face makes onions cry.",
    "The only way my husband would ever get hurt during an activity is if the TV exploded.",
    "You look so pretty. Not at all gross today.",
    "It’s impossible to underestimate you.",
    "Her teeth were so bad she could eat an apple through a fence.",
    "I’m not insulting you; I’m describing you.",
    "I’m not a nerd; I’m just smarter than you.",
    "Don’t be ashamed of who you are. That’s your parents’ job.",
    "Your face is just fine, but we’ll have to put a bag over that personality.",
    "You bring everyone so much joy… when you leave the room.",
    "I thought of you today. It reminded me to take out the trash.",
    "Don’t worry about me. Worry about your eyebrows.",
    "You are the human version of period cramps.",
    "If you’re going to be two-faced, at least make one of them pretty.",
    "You are like a cloud. When you disappear, it’s a beautiful day.",
    "I’d rather treat my baby’s diaper rash than have lunch with you.",
    "Don’t worry — the first 40 years of childhood are always the hardest.",
    "I may love to shop, but I will never buy your bull.",
    "I love what you’ve done with your hair. How do you get it to come out of your nostrils like that?",
    "OH MY GOD! IT SPEAKS!",
    "“Check your lipstick before you come for me.” ",
    "“It looks like she went into Claire’s Boutique, fell on a sale rack, and said, ‘I’ll take it!’” ",
    "“Is your ass jealous of the amount of shit that comes out of your mouth?”",
    "“Go back to Party City, where you belong!”",
    "“Where’d you get your outfits, girl, American Apparently Not?” ",
    "“Impersonating Beyoncé is not your destiny, child.”",
    "“Don’t get bitter, just get better.”",
    "Child, I’ve forgotten more than you ever knew.",
    "You just might be why the middle finger was invented in the first place.",
    "I know you are, but what am I?",
    "I see no evil, and I definitely don’t hear your evil.",
    "You have miles to go before you reach mediocre.",
    "When you look in the mirror, say hi to the clown you see in there for me, would ya?",
    "Bye, hope to see you never.",
    "Complete this sentence for me: “I never want to see you ____!”",
    "Remember that time you were saying that thing I didn’t care about? Yeah… that is now.",
    "I was today years old when I realized I didn’t like you.",
    "N’Sync said it best: “BYE, BYE, BYE.”",
    "Wish I had a flip phone so I could slam it shut on this conversation.",
    "How many licks till I get to the interesting part of this conversation?",
    "Wow, your maker really didn’t waste time giving you a personality, huh?",
    "You’re cute. Like my dog. He also always chases his tail for entertainment.",
    "Someday you’ll go far… and I really hope you stay there.",
    "Oh, I’m sorry. Did the middle of my sentence interrupt the beginning of yours?",
    "You bring everyone so much joy! You know, when you leave the room. But, still.",
    "Oops, my bad. I could’ve sworn I was dealing with an adult.",
    "Did I invite you to the barbecue? Then why are you all up in my grill?",
    "I’m an acquired taste. If you don’t like me, acquire some taste.",
    "Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology.",
    "Yeah? Well, you smell like hot dog water.",
    "*Thumbs down*",
    "That sounds like a you problem.",
    "Beauty is only skin deep, but ugly goes clean to the bone.",
    "Oh, you don’t like being treated the way you treat me? That must suck.",
    "“I’ve been called worse things by better men.”",
    "Well, the jerk store called. They’re running out of you.",
    "What, like it’s hard?",
    "Sorry, not sorry.",
    "I’m busy right now; can I ignore you another time?",
    "If you have a problem with me, write the problem on a piece of paper, fold it, and shove it up your ass.",
    "You have an entire life to be an idiot. Why not take today off?",
    "No matter how much a snake sheds its skin, it’s still a snake.",
    "Some people are like slinkies — not really good for much, but they bring a smile to your face when pushed down the stairs.",
    "You’re the reason this country has to put directions on shampoo.",
    "Of course I’m talking like an idiot… how else could you understand me?",
    "Are you almost done with all of this drama? Because I need an intermission.",
    "I’d give you a nasty look, but you’ve already got one.",
    "If I wanted to hear from an asshole, I’d fart.",
    "Your birth certificate is an apology letter from the condom factory.",
    "Your family tree must be a cactus because everybody on it is a prick.",
    "Wow, I bet you even fart glitter!",
    "I guess if you actually ever spoke your mind, you’d really be speechless.",
    "Since you know it all, you should know when to shut up.",
    "Life is full of disappointments, and I just added you to the list.",
    "I treasure the time I don’t spend with you.",
    "I was going to make a joke about your life, but I see life beat me to the punch.",
    "The last time I saw something like you… I flushed.",
    "The only work-life balance I want is being away from you.",
    "When you start talking, I stop listening.",
    "Feed your own ego. I’m busy.",
    "You look like something that came out of a slow cooker.",
    "If laughter is the best medicine, your face must be curing the world.",
    "I think I’ve seen you before, but I’m pretty sure I had to pay admission last time.",
    "I’m jealous of people that don’t know you!",
    "If I had a face like yours, I’d sue my parents.",
    "You’re so ugly, you scared the crap out of the toilet.",
    "I wasn't born with enough middle fingers to let you know how I feel about you.",
    "You must have been born on a highway because that's where most accidents happen.",
    "I'm jealous of all the people that haven't met you.",
    "I bet your brain feels as good as new, seeing that you never use it.",
    "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
    "You bring everyone a lot of joy, when you leave the room.",
    "What's the difference between you and eggs? Eggs get laid and you don't.",
    "You're as bright as a black hole, and twice as dense.",
    "I tried to see things from your perspective, but I couldn't seem to shove my head that far up my ass.",
    "You're the reason the gene pool needs a lifeguard.",
    "I have neither the time nor the crayons to explain this to you.",
    "You have two brains cells, one is lost and the other is out looking for it.",
    "How many times do I have to flush to get rid of you?",
    "I don't exactly hate you, but if you were on fire and I had water, I'd drink it.",
    "You shouldn't play hide and seek, no one would look for you.",
    "Some drink from the fountain of knowledge; you only gargled.",
    "Roses are red violets are blue, God made me pretty, what happened to you?",
    "It's better to let someone think you are an Idiot than to open your mouth and prove it.",
    "Somewhere out there is a tree, tirelessly producing oxygen so you can breathe. I think you owe it an apology.",
    "The last time I saw a face like yours I fed it a banana.",
    "The only way you'll ever get laid is if you crawl up a chicken's ass and wait.",
    "If you really want to know about mistakes, you should ask your parents.",
    "At least when I do a handstand my stomach doesn't hit me in the face.",
    "If I gave you a penny for your thoughts, I'd get change.",
    "If I were to slap you, it would be considered animal abuse.",
    "What are you going to do for a face when the baboon wants his butt back?",
    "Well I could agree with you, but then we'd both be wrong.",
    "It looks like your face caught on fire and someone tried to put it out with a hammer.",
    "You're not funny, but your life, now that's a joke.",
    "Oh my God, look at you. Was anyone else hurt in the accident?",
    "What are you doing here? Did someone leave your cage open?",
    "You're so ugly, the only dates you get are on a calendar.",
    "I can explain it to you, but I can't understand it for you.",
    "You are proof that God has a sense of humor.",
    "If you spoke your mind, you'd be speechless.",
    "Why don't you check eBay and see if they have a life for sale.",
    "Do you still love nature, despite what it did to you?",
    "You are proof that evolution CAN go in reverse.",
    "I'll never forget the first time we met, although I'll keep trying.",
    "Don't feel sad, don't feel blue, Frankenstein was ugly too.",
    "It's kinda sad watching you attempt to fit your entire vocabulary into a sentence.",
    "You're a person of rare intelligence. It's rare when you show any.",
    "I heard you went to a haunted house and they offered you a job.",
    "You look like a before picture.",
    "If your brain was made of chocolate, it wouldn't fill an M&M.",
    "Aww, it's so cute when you try to talk about things you don't understand.",
    "I heard your parents took you to a dog show and you won.",
    "You stare at frozen juice cans because they say,concentrate",
    "You're so stupid you tried to wake a sleeping bag.",
    "Am I getting smart with you? How would you know?",
    "We all sprang from apes, but you didn't spring far enough.",
    "I'm no proctologist, but I know an asshole when I see one.",
    "When was the last time you could see your whole body in the mirror?",
    "You must have a very low opinion of people if you think they are your equals.",
    "So, a thought crossed your mind? Must have been a long and lonely journey.",
    "You're the best at all you do - and all you do is make people hate you.",
    "Looks like you fell off the ugly tree and hit every branch on the way down.",
    "Looks aren't everything; in your case, they aren't anything.",
    "Your hockey team made you goalie so you'd have to wear a mask.",
    "Ordinarily people live and learn. You just live.",
    "I heard you took an IQ test and they said your results were negative.",
    "I've seen people like you, but I had to pay admission!",
    "I hear the only place you're ever invited is outside.",
    "Keep talking, someday you'll say something intelligent!",
    "You couldn't pour water out of a boot if the instructions were on the heel.",
    "Even if you were twice as smart, you'd still be stupid!",
    "I was pro life before I met you.",
    "What's the difference between you and Hitler? Hitler knew when to kill himself.",
    "If ignorance is bliss, you must be the happiest person on earth.",
    "You're so stupid, it takes you an hour to cook minute rice.",
    "Is that your face? Or did your neck just throw up?",
    "I'd hit you but we don't hit girls around here.",
    "I'd give you a nasty look but you've already got one.",
    "Scientists say the universe is made up of neutrons, protons and electrons. They forgot to mention morons.",
    "Why is it acceptable for you to be an idiot but not for me to point it out?",
    "You're not stupid; you just have bad luck when thinking.",
    "I thought of you today. It reminded me to take the garbage out.",
    "I'm sorry I didn't get that - I don't speak idiot.",
    "I just stepped in something that was smarter than you.",
    "If you were any less intelligent we'd have to water you three times a week.",
    "If your IQ was 3 points higher, you'd be a rock.",
    "I would insult you but nature did a better job.",
    "Does your ass get jealous of all the shit that comes out of your mouth?",
    "If I ate a bowl of alphabet soup, I could shit out a smarter sentence than any of yours.",
    "You're not pretty enough to be this stupid.",
    "That little voice in the back of your head, telling you you'll never be good enough? It's right.",
    "May your day and future be as pleasant as you are.",
    "I would agree with you but then we would both be wrong.",
    "I bite my thumb at you, sir.",
    "I'd call you a tool, but that would imply you were useful in at least one way.",
    "I hope you outlive your children.",
    "Your birth certificate is an apology from the abortion clinic."
]

// TODO:
// localStorage
// share


// npm i --save-dev parcel-bundler
// npm init
