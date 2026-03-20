"""
Pre-generate all narration MP3 files using Microsoft Edge TTS.
Uses AnaNeural voice (playful child-like voice).
"""
import os
import hashlib
import asyncio
import shutil
import edge_tts

VOICE = 'en-US-AnaNeural'
RATE = '-10%'
PITCH = '+5Hz'
AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio')
CACHE_DIR = os.path.join(AUDIO_DIR, 'cache')

async def gen_tts(text, output_path):
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
    await communicate.save(output_path)

import re as _re
def _tts_clean(t):
    """Match the JS ttsCleanText: St. -> Saint for pronunciation."""
    return _re.sub(r'\bSt\.\s', 'Saint ', t)

def gen(text, filename=None):
    text = _tts_clean(text.strip())
    if not text:
        return
    h = hashlib.md5(text.encode('utf-8')).hexdigest()
    cache_path = os.path.join(CACHE_DIR, f'{h}.mp3')
    named_path = os.path.join(AUDIO_DIR, f'{filename}.mp3') if filename else None
    label = filename or h[:8]
    print(f'  [gen] {label}: "{text[:55]}..."')
    try:
        asyncio.run(gen_tts(text, cache_path))
        if named_path:
            shutil.copy2(cache_path, named_path)
    except Exception as e:
        print(f'  [ERR] {label}: {e}')

# Ensure cache dir exists
os.makedirs(CACHE_DIR, exist_ok=True)

print('=== Storybook ===')
stories = [
    ("story-1", "Long ago, in 1828, a baby boy named Youssef was born in a tiny mountain village called Beka Kafra in Lebanon. The village was surrounded by beautiful cedar trees and snowy mountain peaks."),
    ("story-2", "Young Youssef loved spending time in nature. He would take the sheep to graze on the green hills, and while they ate, he would sit quietly and pray. Even as a child, he felt close to God."),
    ("story-3", "When Youssef grew up, he knew God was calling him to something special. He left his family and his village to join a monastery, where monks spent their lives praying and serving God."),
    ("story-4", "At the monastery, he was given the name Charbel, after an ancient saint. Brother Charbel spent his days praying, working in the fields, and helping others. He was kind, humble, and always joyful."),
    ("story-5", "Charbel loved God so much that he asked to live as a hermit. All alone in a small room, spending every moment in prayer and silence. For 23 years, he prayed, fasted, and lived simply."),
    ("story-6", "Even though Charbel lived quietly, people could feel his holiness. His simple, peaceful life inspired everyone who knew him. He showed that you don't need big things to be great. Just a loving heart."),
    ("story-7", "After St. Charbel passed away in 1898, something amazing happened. A bright light was seen glowing from his tomb! People who prayed to him began to be healed. Miracle after miracle was reported."),
    ("story-8", "Today, St. Charbel is loved by millions of people all around the world. He teaches us that prayer, kindness, and a simple heart can change the world. His light continues to shine for all of us!"),
]
for key, text in stories:
    gen(text, key)

print('\n=== St. Francis Story ===')
francis_stories = [
    ("francis-1", "Long ago, in a beautiful town called Assisi in Italy, a boy named Francis was born to a very rich family. His father sold fine cloth, and Francis had everything a boy could want!"),
    ("francis-2", "Young Francis loved parties and having fun with his friends. He wore the fanciest clothes and spent money like a prince! But deep inside, he felt something was missing."),
    ("francis-3", "One day, Francis was praying in a small, broken-down church when he heard God's voice say: Rebuild my church! Francis knew God was calling him to something amazing."),
    ("francis-4", "Francis gave away all his fancy clothes and his father's money to help the poor. He chose to live simply, just like Jesus, wearing only a plain brown robe."),
    ("francis-5", "Francis loved all of God's creatures! One day, he preached a sermon to the birds, and they all gathered around to listen. He called them his little brothers and sisters."),
    ("francis-6", "A scary wolf was frightening the people of a town called Gubbio. But Francis walked up to the wolf and spoke gently to it. The wolf became calm and never hurt anyone again!"),
    ("francis-7", "While praying on a mountaintop, Francis received a special gift from God. The marks of Jesus on his hands and feet, called the stigmata. He was filled with God's love."),
    ("francis-8", "St. Francis taught the whole world to love nature, care for animals, and live with a joyful, simple heart. He is the patron saint of animals and reminds us that peace starts with kindness!"),
]
for key, text in francis_stories:
    gen(text, key)

print('\n=== St. Clare Story ===')
clare_stories = [
    ("clare-1", "In the town of Assisi, there lived a beautiful girl named Clare who came from a noble, wealthy family. She had a kind heart and always thought about how she could help others."),
    ("clare-2", "One day, Clare heard a young man named Francis preaching about God's love. His words touched her heart so deeply that she knew she wanted to give her life to God too!"),
    ("clare-3", "On a dark, quiet night, Clare secretly left her family's home. She ran through the fields to find Francis, carrying nothing but her faith and courage. She was ready for a new life!"),
    ("clare-4", "Clare started a group of sisters called the Poor Clares. They lived together in a simple convent, praying, singing, and helping the poor. They didn't need fancy things to be happy!"),
    ("clare-5", "Clare spent many hours every day praying before the Blessed Sacrament. Her love for Jesus was so strong that her face would glow with a beautiful, warm light!"),
    ("clare-6", "When enemy soldiers came to attack the convent, brave Clare held up the golden monstrance with the Blessed Sacrament. The soldiers were so amazed that they turned around and left!"),
    ("clare-7", "Clare and her sisters grew vegetables, made beautiful things, and cared for the sick. They showed everyone that true joy comes from loving God and living simply."),
    ("clare-8", "St. Clare's light shines for all of us today! She teaches us that you don't need riches to be happy. Just a heart full of love, prayer, and kindness toward others!"),
]
for key, text in clare_stories:
    gen(text, key)

print('\n=== St. Michael Story ===')
michael_stories = [
    ("michael-1", "In heaven, there is a mighty and powerful angel named Michael. He is the leader of all God's angels, and his name means Who is like God? He is brave, strong, and full of light!"),
    ("michael-2", "Long ago, a great battle took place in heaven. The evil angel Lucifer tried to fight against God. But Michael the Archangel stood up and said: No one is greater than God!"),
    ("michael-3", "With his mighty sword of light, Michael defeated the dragon and cast him down from heaven! All the good angels cheered, and heaven was filled with peace and joy."),
    ("michael-4", "St. Michael is always watching over God's people. Like a loving guardian, he protects families, children, and everyone who calls on his name. He is our heavenly shield!"),
    ("michael-5", "Whenever someone is in danger or feeling scared, St. Michael comes to help! He brings courage and strength to those who pray to him. You are never alone with Michael by your side."),
    ("michael-6", "St. Michael is the special guardian of the Church. He stands watch over all of God's people, keeping them safe from harm. He is the strongest of all the angels!"),
    ("michael-7", "Many people pray the Prayer to St. Michael every day for protection. When you say this prayer, you are asking the mightiest angel in heaven to be your protector!"),
    ("michael-8", "St. Michael the Archangel reminds us that God always wins over darkness. With faith, courage, and prayer, we can be brave just like Michael! He is always there to protect us."),
]
for key, text in michael_stories:
    gen(text, key)

print('\n=== Prayers ===')
prayers = [
    ("prayer-our-father", "Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen."),
    ("prayer-hail-mary", "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen."),
    ("prayer-glory-be", "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen."),
    ("prayer-st-michael", "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray. And do thou, O Prince of the heavenly host, by the power of God, cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen."),
    ("prayer-guardian-angel", "Angel of God, my guardian dear, to whom God's love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen."),
    ("prayer-st-francis", "Lord, make me an instrument of your peace. Where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith; where there is despair, hope; where there is darkness, light; where there is sadness, joy. O Divine Master, grant that I may not so much seek to be consoled as to console, to be understood as to understand, to be loved as to love. For it is in giving that we receive, it is in pardoning that we are pardoned, and it is in dying that we are born to eternal life. Amen."),
    ("prayer-st-clare", "Blessed be you, my Lord God, for creating me and giving me life. Blessed be you for loving me as your very own child. Help me to live in your light and follow your path with a simple and joyful heart. Amen."),
    ("prayer-memorare", "Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thine intercession was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my mother. To thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen."),
]
for key, text in prayers:
    gen(text, key)

print('\n=== Body Tour (Food Journey Adventure) ===')
body = [
    ("body-tour-1", "Mouth. Chomp chomp chomp! Your teeth break the food into tiny little pieces! Your tongue and saliva start to melt it down. Great job chewing!"),
    ("body-tour-2", "Throat. Wheee, down it goes! A special tube called the esophagus squeezes the food down to your tummy, like a waterslide!"),
    ("body-tour-3", "Stomach. Splash! Your tummy is like a big mixing machine! It churns and squishes the food with special juices until it becomes a mushy soup!"),
    ("body-tour-4", "Small Intestine. This is where the magic happens! Your small intestine grabs all the good stuff, vitamins, energy, and protein, from the mushy food!"),
    ("body-tour-5", "Blood Stream. The nutrients hop onto your blood like passengers on a bus! They zoom off to your muscles, your bones, and your brain!"),
    ("body-tour-6", "Brain Power! Your brain lights up with power! Healthy food makes you think better, learn faster, and feel amazing! What an incredible journey!"),
]
for key, text in body:
    gen(text, key)

print('\n=== Food Groups ===')
foods = [
    ("food-protein", "Protein. Builds strong muscles and helps your body grow! Did you know? Your muscles are made mostly of protein! Every time you run, jump, or play, your proteins are hard at work."),
    ("food-carbs", "Carbs. Gives you energy to run, play, and think! Did you know? Carbs are like fuel for your body, just like petrol for a car. Without them, you would feel tired and sleepy!"),
    ("food-fruits", "Fruits. Full of vitamins that keep you healthy and strong! Did you know? Eating colourful fruits gives you different vitamins. Try to eat a rainbow every day!"),
    ("food-vegetables", "Vegetables. Superfoods that protect your body like a shield! Did you know? Carrots really do help your eyes! They have a vitamin called beta-carotene that keeps your vision sharp."),
    ("food-healthy-fats", "Healthy Fats. Helps your brain think clearly and learn new things! Did you know? Your brain is about 60% fat! Eating healthy fats like avocado and nuts makes your brain work better."),
    ("food-water", "Water. Your body's best friend, it keeps everything working! Did you know? Your body is made up of about 60% water. Drinking enough water helps you think, play, and stay healthy!"),
]
for key, text in foods:
    gen(text, key)

print('\n=== Faith Quizzes Q&A ===')

charbel_quiz = [
    ("Where was St. Charbel born?", ["Beka Kafra","Beirut","Jerusalem","Rome"]),
    ("What was St. Charbel's name before becoming a monk?", ["Youssef","Pierre","Antoine","Georges"]),
    ("Which country is St. Charbel from?", ["Lebanon","Egypt","Italy","France"]),
    ("What does a hermit do?", ["Lives alone in prayer","Travels the world","Builds houses","Cooks food"]),
    ("How many years did St. Charbel live as a hermit?", ["23 years","5 years","50 years","2 years"]),
    ("What tree is a symbol of Lebanon?", ["Cedar tree","Palm tree","Oak tree","Pine tree"]),
    ("What happened at St. Charbel's tomb?", ["A bright light was seen","It snowed","Flowers grew","A rainbow appeared"]),
    ("What did St. Charbel do as a young boy?", ["Tended sheep and prayed","Played video games","Sailed on boats","Built castles"]),
    ("What is a monastery?", ["Where monks live and pray","A school","A hospital","A park"]),
    ("What does St. Charbel teach us?", ["Prayer and kindness change the world","Money is most important","Be famous","Never be quiet"]),
]

francis_quiz = [
    ("Where was St. Francis born?", ["Assisi, Italy","Rome","Paris","London"]),
    ("What did young Francis love doing?", ["Going to parties","Reading books","Fishing","Sleeping"]),
    ("What did God say to Francis in the broken church?", ["Rebuild my church!","Go home!","Sing a song!","Build a castle!"]),
    ("What did Francis give away?", ["His fancy clothes","His pet dog","His house","His horse"]),
    ("Who did Francis preach to in the fields?", ["The birds","The fish","The clouds","The trees"]),
    ("What scary animal did Francis make friends with?", ["A wolf","A lion","A bear","A snake"]),
    ("What is St. Francis the patron saint of?", ["Animals","Cooking","Music","Sports"]),
    ("What color robe did Francis wear?", ["Brown","Red","Blue","White"]),
    ("What special marks did Francis receive on his hands?", ["The stigmata","A crown","Wings","A medal"]),
    ("What does St. Francis teach us?", ["Love all of God's creatures","Be rich","Stay home","Never share"]),
]

clare_quiz = [
    ("What kind of family was St. Clare born into?", ["A wealthy family","A poor family","A royal family","A farmer family"]),
    ("Who inspired Clare to give her life to God?", ["St. Francis","Her mother","A teacher","The king"]),
    ("How did Clare leave her home?", ["She ran away at night","She left at sunrise","Her family said goodbye","A carriage came for her"]),
    ("What was Clare's group of sisters called?", ["The Poor Clares","The Happy Sisters","The Bright Lights","The Kind Hearts"]),
    ("What did Clare spend many hours doing?", ["Praying","Painting","Cooking","Dancing"]),
    ("What did Clare hold up when soldiers came?", ["A golden monstrance","A sword","A shield","A flag"]),
    ("What happened when the soldiers saw Clare?", ["They turned around amazed","They laughed","They kept coming","They fell asleep"]),
    ("What did Clare grow in the garden?", ["Vegetables","Only roses","Nothing","Only trees"]),
    ("Who did Clare take special care of?", ["Sick people","Only animals","Only flowers","Only books"]),
    ("What does St. Clare teach us?", ["Richness comes from love","Money is everything","Stay alone","Never pray"]),
]

michael_quiz = [
    ("What is St. Michael?", ["An archangel","A king","A shepherd","A monk"]),
    ("What does Michael's name mean?", ["Who is like God?","Strong warrior","Bright light","God's helper"]),
    ("Who did Michael fight against in heaven?", ["Lucifer","A lion","A giant","A dragon king"]),
    ("What did Michael say during the battle?", ["No one is greater than God!","I am the strongest!","Run away!","Let me think!"]),
    ("What did Michael use to defeat the dragon?", ["A sword of light","A magic spell","A big rock","Thunder"]),
    ("What is Michael the special guardian of?", ["The Church","The ocean","The forest","The stars"]),
    ("What does Michael bring to people who pray?", ["Courage and strength","Money and gold","Food and water","Toys and games"]),
    ("What do many people pray for from St. Michael?", ["Protection","Homework help","Good weather","Snacks"]),
    ("Michael is called God's mighty...?", ["Warrior","Singer","Builder","Painter"]),
    ("What does Michael's story teach us?", ["With faith we can be brave","Fighting is always good","Angels don't help us","Be afraid of everything"]),
]

for quiz in [charbel_quiz, francis_quiz, clare_quiz, michael_quiz]:
    for q, answers in quiz:
        gen(q)
        for a in answers:
            gen(a)
        gen("Not quite! The answer is " + answers[0])
gen("Choose your answer!")
gen("Correct! Great job!")

print('\n=== Good Habits Q&A ===')
habits = [
    ("What should you do before eating?", ["Wash my hands with soap!","Jump on the table","Watch TV","Play with the dog"],
     "Always wash your hands with soap and water before eating to keep germs away!"),
    ("How should you sit at the dinner table?", ["Sit up straight like a king or queen!","Lie down on the floor","Stand on the chair","Sit under the table"],
     "Sitting up straight at the table is good for your tummy and shows respect!"),
    ("How should you eat your food?", ["Use my fork and knife properly","Use my hands for everything","Throw it in the air","Eat off the floor"],
     "Using utensils properly is a great habit! It shows you have good manners."),
    ("What kind words should you say at mealtimes?", ["Please and thank you!","Give me that now!","I want it all!","Nothing at all"],
     "Kind words like please and thank you make everyone at the table happier!"),
    ("What should you do while chewing food?", ["Keep my mouth closed","Talk with food in my mouth","Sing a song","Make funny faces"],
     "Chewing with your mouth closed is polite and helps you eat better!"),
    ("Should you use screens at the dinner table?", ["No! Mealtime is family time!","Yes, watch cartoons","Only if I am bored","Phones belong at the table"],
     "Mealtime is the perfect time to talk with your family and enjoy being together!"),
    ("How can you help at mealtime?", ["Help set the table!","Wait for someone else","Hide in my room","Complain about the food"],
     "Helping set and clear the table makes you a wonderful team player!"),
    ("What should you do when you see a new food?", ["Be a food explorer and try one bite!","Say yuck without trying","Throw it away","Cry about it"],
     "Being a food explorer is amazing! You might discover a new favourite food!"),
]
for q, choices, explanation in habits:
    gen(q)
    for i, ch in enumerate(choices):
        gen(f"Option {i+1}: {ch}")
    gen("That is correct! " + explanation)
    gen("Not quite. " + explanation)
gen("Pick the right answer!")

print('\n=== Nutrition Quiz Q&A ===')
nutri_quiz = [
    ("Which food is a protein?", ["Chicken","Bread","Apple","Rice"]),
    ("What does water help your body do?", ["Stay hydrated","Grow feathers","Turn purple","Fly"]),
    ("Which vegetable is orange and helps your eyes?", ["Carrot","Broccoli","Peas","Tomato"]),
    ("What food group gives you energy to run and play?", ["Carbs","Water","Healthy fats","Protein"]),
    ("Which is the healthiest drink?", ["Water","Soda","Energy drink","Milkshake"]),
    ("What should you do before eating?", ["Wash your hands","Run around","Watch TV","Take a nap"]),
    ("Which food helps build strong bones?", ["Milk","Candy","Chips","Ice cream"]),
    ("Avocado is a healthy what?", ["Fat","Protein","Carb","Vegetable"]),
    ("How many servings of fruits and veggies should you aim for each day?", ["5","1","20","100"]),
    ("What's polite to say when someone passes you food?", ["Thank you","Give me more","Whatever","Nothing"]),
]
for q, answers in nutri_quiz:
    gen(q)
    for a in answers:
        gen(a)
    gen("Not quite! The answer is " + answers[0])
gen("Correct! Well done!")

print('\n=== Memory Match Phrases ===')
match_phrases = ["Great match!", "Wonderful!", "You found a pair!", "Excellent!",
                 "Well done!", "Amazing!", "Brilliant!", "You're so smart!"]
miss_phrases = ["Whoops!", "Not quite!", "Try again!", "Almost!",
                "So close!", "Keep looking!", "Oops! Try another one!", "Don't give up!"]
symbols = ["Cross", "Cedar", "Church", "Candle", "Dove", "Rosary", "Prayer", "Star", "Bible", "Bell", "Heart", "Rose", "Mountain", "Sheep", "Moon"]
for p in match_phrases:
    for s in symbols:
        gen(f"{p} You matched the {s}!")
for p in miss_phrases:
    gen(p)

print('\n=== Word Search ===')
words = ['CHARBEL', 'PRAYER', 'FAITH', 'MONK', 'HERMIT', 'CROSS', 'LOVE', 'GOD']
for w in words:
    gen(f"You found {w}!")

print('\n=== Misc ===')
gen("Build a healthy plate! Pick your foods.")
gen("Sort the foods into the right groups!")

print('\n=== Music: Instrument Explorer ===')
music_explorer = [
    ("Tap an instrument to learn about it!"),
    ("This is a Piano! A piano has 88 keys and makes sound when little hammers hit strings inside!"),
    ("This is a Guitar! A guitar has 6 strings you pluck or strum to make beautiful music!"),
    ("This is a Violin! A violin is played with a bow that slides across its strings to make a singing sound!"),
    ("This is a Drum! Drums are one of the oldest instruments! You hit them with sticks to make a beat!"),
    ("This is a Tambourine! A tambourine has tiny metal discs that jingle when you shake or hit it!"),
    ("This is a Xylophone! A xylophone has colourful bars you hit with mallets to play different notes!"),
    ("This is a Trumpet! A trumpet is a shiny brass instrument you blow into to make a bright, loud sound!"),
    ("This is a Flute! A flute makes a soft, gentle sound when you blow air across a hole!"),
]
for text in music_explorer:
    gen(text)

print('\n=== Music: Sound Quiz ===')
gen("Listen carefully... which instrument makes this sound?")
for name in ["Piano", "Guitar", "Violin", "Drum", "Tambourine", "Xylophone", "Trumpet", "Flute"]:
    gen(f"Correct! That was the {name}!")
    gen(f"Not quite! That was the {name}!")

print('\n=== Music: Instrument Families ===')
gen("Sort each instrument into the right family!")
for name in ["Piano", "Guitar", "Violin", "Drum", "Tambourine", "Xylophone", "Trumpet", "Flute"]:
    gen(f"Correct! {name} is a strings instrument!")
    gen(f"Correct! {name} is a percussion instrument!")
    gen(f"Correct! {name} is a wind instrument!")
    gen(f"Not quite! {name} is a strings instrument!")
    gen(f"Not quite! {name} is a percussion instrument!")
    gen(f"Not quite! {name} is a wind instrument!")

print('\n=== Music: Play & Orchestra ===')
gen("Tap the keys to make music!")
gen("Tap the bars to play!")
gen("Hit the pads to drum!")
gen("Pluck the strings to play!")
gen("Tap an animal to hear its instrument!")
for animal, inst in [("Cat","Violin"),("Dog","Drums"),("Frog","Xylophone"),("Lion","Trumpet"),("Bird","Flute"),("Pig","Tambourine"),("Cow","Guitar"),("Monkey","Piano")]:
    gen(f"The {animal} played the {inst}!")
gen("You heard the whole Animal Orchestra!")
gen("Pick a level!")
gen("Level 1! Find all 6 pairs!")
gen("Level 2! Find all 8 pairs!")
gen("Level 3! Find all 10 pairs!")
gen("Level 4! Find all 12 pairs!")
gen("Level 5! Find all 15 pairs!")

print('\n=== Exercise Section ===')
# Exercise Timer announcements
exercise_list = [
    ("Do 10 Star Jumps!", "Jump up and spread your arms and legs like a star!"),
    ("Do 10 High Knees!", "Run on the spot lifting your knees high!"),
    ("Do 10 Arm Circles!", "Stretch your arms out and spin them in circles!"),
    ("Do 8 Frog Jumps!", "Squat low like a frog and jump forward!"),
    ("Do 10 Bunny Hops!", "Hop on both feet like a little bunny!"),
    ("Do 8 Toe Touches!", "Bend down and try to touch your toes!"),
    ("Run On The Spot!", "Run as fast as you can without moving!"),
    ("Bear Walk!", "Walk on your hands and feet like a bear!"),
    ("Crab Walk!", "Sit down, put hands behind, lift up and walk!"),
    ("Do 8 Windmills!", "Stand wide and touch opposite toes!"),
    ("Sit and Reach!", "Sit on the floor and reach for your toes!"),
    ("Do 10 Mountain Climbers!", "In push up position, run your knees to your chest!"),
    ("Superhero Pose!", "Stand tall with fists on hips like a superhero!"),
    ("Do 6 Tuck Jumps!", "Jump up and pull your knees to your chest!"),
    ("Side Shuffles!", "Shuffle side to side like a basketball player!"),
    ("Do 5 Burpees!", "Jump up, drop down, push up, jump back!"),
    ("Do 8 Squat Jumps!", "Squat down low and jump up high!"),
    ("Penguin Walk!", "Walk with feet together swaying side to side!"),
]
for announcement, desc in exercise_list:
    gen(announcement)
    gen(desc)

# Countdown and prompts
for n in ["3", "2", "1"]:
    gen(n)
gen("GO!")
gen("Rest! Catch your breath!")
gen("Keep going!")
gen("Great job!")
gen("Workout Complete!")

# Simon Says
gen("Simon says...")
for cmd in [
    "Jump!", "Clap your hands!", "Touch your toes!", "Spin around!",
    "Flap your arms!", "Wiggle your fingers!", "Stomp your feet!",
    "Hop on one foot!", "Touch your nose!", "Wave hello!",
    "Do a star jump!", "March on the spot!", "Pat your head!",
    "Rub your tummy!", "Reach for the sky!", "Do a squat!",
    "Shake your body!", "Balance on one foot!", "Do tiny jumps!",
    "Run on the spot!", "Blow a kiss!", "Give yourself a hug!",
    "Make a funny face!", "Pretend to fly!", "Roar like a lion!",
]:
    gen(f"Simon says... {cmd}")
    gen(cmd)

# Daily Workout
gen("Here's your daily workout! Let's go!")
gen("Workout complete! You earned a gold star!")

# Freeze Dance
gen("Dance! Move your body!")
gen("Freeze! Don't move!")

# Animal Moves
for animal, move in [
    ("Bear", "Walk on hands and feet!"),
    ("Frog", "Squat low and leap forward!"),
    ("Crab", "Walk sideways on hands and feet!"),
    ("Snake", "Slither on the floor!"),
    ("Penguin", "Waddle with arms at your sides!"),
    ("Lion", "Crawl and roar loudly!"),
    ("Bunny", "Hop hop hop on both feet!"),
    ("Eagle", "Spread your wings and soar!"),
    ("Monkey", "Swing your arms and jump!"),
    ("Flamingo", "Stand on one leg!"),
    ("Crocodile", "Snap your jaws and army crawl!"),
    ("Horse", "Gallop around the room!"),
]:
    gen(f"Move like a {animal}! {move}")

# Body Challenge
for q in [
    "Which body part helps you breathe?",
    "What makes your body move?",
    "What pumps blood around your body?",
    "How many bones do kids have? About...",
    "What part of your body controls everything?",
    "What do your legs help you do?",
    "Where does food go after you swallow?",
    "What helps you balance?",
    "What protects your brain?",
    "What do your hands help you do?",
]:
    gen(q)
for move in [
    "Take 5 deep breaths! Breathe in... and out!",
    "Flex your muscles! Do 5 arm curls!",
    "Get your heart pumping! 10 jumping jacks!",
    "Stretch those bones! Touch your toes 5 times!",
    "Brain break! Do 5 star jumps!",
    "Use those legs! Run on the spot for 10 seconds!",
    "Rub your tummy in circles 5 times!",
    "Test your balance! Stand on one foot for 10 seconds!",
    "Pat your head gently 10 times!",
    "Clap your hands 15 times as fast as you can!",
]:
    gen(move)

print('\n=== Done! ===')
cache_count = len([f for f in os.listdir(CACHE_DIR) if f.endswith('.mp3')])
named_count = len([f for f in os.listdir(AUDIO_DIR) if f.endswith('.mp3')])
print(f'Named narration files: {named_count}')
print(f'Cached TTS files: {cache_count}')
print(f'Voice: {VOICE} (playful child voice)')
print('All audio ready!')
