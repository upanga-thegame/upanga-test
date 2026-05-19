# TODO - CH.1

Upanga: The Soul Blade - TODO + Dev Tracker


## Ch.1 Priorities (v0.1.0 Pre-Alpha)

- [ ] Design JungleBattleMaps
- [ ] Design PyramidBattleMaps
- [ ] Design SwampBattleMaps
- [ ] Design LaplassBattleMap (1) 
- [~] Paywall after completion of the Crypt. 



## Ch.1 Features (v0.1.0 Pre-Alpha)

- [X] Implement autosave functions. Display message "Saving..." whenever switching screens
      save the current game state.
- [ ] Create cinematic cutscene: Game launch
- [ ] Create cinematic cutscene: New game
- [ ] Create cinematic cutscene: After CryptBattleMap
- [ ] Create cinematic cutscene: After JungleBattleMap
- [ ] Create cinematic cutscene: After RuinsBattleMap
- [ ] Create cinematic cutscene: After PyramidBattleMap
- [ ] Create cinematic cutscene: After LaplassBattleMap
- [ ] Create Soul Blade graphic to display on TravelMap. Starts out
      transparent. Fills as parts of the blade are completed.
- [ ] Work on storyboards, hero origin stories
- [~] Implement flash encounter on TravelMap. Bandit attack. New NPCs: Bandit, Bandit Leader
- [X] Revamp how box frames are used, remove sprite frames use native godot systems will
      help improve performance.
- [X] Implement diagonal movement & attack.
- [X] Created Skeleton Witchdoctor replaces Skeleton Mage


## Ch.1 Fixes (v0.1.0 Pre-Alpha)

- [ ] After leaving Chief hut on Kraal map, cant click right in front of hut to move
- [ ] On TravelMap after leaving Kraal box confirming entry pops up, should not.
- [X] Pre&Post Crypt Dialogue boxes need text adjustments, runs into frame.
- [ ] Add Zombie profile picture to npc status bar
- [ ] Update thanks for playing box with more info.
- [ ] Adjust so anywhere in the map is clickable except regions like water, mountains
      remove the rigid path

## Ch.1 Polish (v0.1.0 Pre-Alpha)

- [ ] Redo Kishi voiceovers, don't like how they sound. Kishi werehyena is ok.
- [X] Do something with end button either skin it or make it bigger.
- [ ] Make sure game autosaves in between CryptBattle maps
- [ ] Create an indicator over region with status completion
- [X] Add a time based system for map completion, keep track of best time.
- [~] Refactoring the icon movement on the travelmap, adding animation movement.

## Ch.1 Testing (v0.1.0 Pre-Alpha)

- [~] Test core gameplay loop.
- [~] Test scene transitions.
- [~] Test save/load or persistence behavior, if applicable.
- [ ] Test export/build flow.
- [ ] Build & export first Android apk. Check how game looks & plays on mobile. 


## Ch.1 Ideas (v0.1.0 Pre-Alpha)

- [ ] Work on a web demo version of a BattleMap to showcase the gameplay.
- [ ] Create an indicator over region with status completion 
- [X] Add a day cycle 1hr real world 24 game time, cycle tints of the map
- [ ] Create new portrait pics for different emotions for story cards. 

## Ch.1 Notes (v0.1.0 Pre-Alpha)

 ~ TravelMap will have a name like Province Kinshasha. When the game begins players will
   only be allowed to travel to the Kraal in the center. Inside the Kraal will be 
   another map that has building locations the party can travel to. One location will
   be the Chief of the province. He will give out the quests for the party. First quest
   will have the party obtain a part of the soul blade from Bes the guardian of the Akan
   crypt of Ancients. Bess was once a good spirit but he has been corrupted by Bakor
   magical powers. After Bess is defeated the party must return to the Chief. At that
   point the game will say thank you for playing the tutorial free play portion of Upanga.
   If you wish to continue to the journey for .99 click here. otherwise the players can
   just exit the Kraal and go nowhere but to the crypt but will say already cleared.
   The second building in the Kraal will be a the village Griot, will have a dialogue
   scene where the party can ask questions about the game and lore. No sprites will be
   needed the Kraal will only be backgrounds and dialogue box screens. 

 ~ The mountain location, fortress, will be the home of The Laplass. He is a sub boss
   to Chapter 1. His path is only unlocked once a segment of the soul blade has
   been unlocked in each region of the map by defeating the mini-bosses. Once that
   is completed the chief will give the segments to the village shaman who will
   have the spirits unlock the magical barrier in the map. The barrier will be
   removed and the party will then be told to vanquish The Laplass and lift the
   curse Balkor has placed. After the Lapless is defeated that will end Chapter 1.
   Add a message thanks for playing Chapter 1. Stay tuned for updates for the release
   of Chapter 2. Add a final cinematic cutscene for the defeat sequence.
 
 ~ LapLassBattleMap: 1 map (for now) New NPC: The LapLass 2 ranged attacks
   one of them being an AOE. Some type of Royal throne room where the battle
   takes place. Strategic battle with environment attacks like falling boulders
   or something. Have cinematic cutscene of the fortress falling around from
   the weakened magical forces. 

 ~ Jungle Biome: 2 Maps. New NPCs: Bokors Zombies (melee cause disease), Cursed Soul
   may change this to some type of corrupted beasts since it is a Jungle Biome. The
   mini-boss can be some lion/half human corrupted soul of the jungle. Guardian of
   the jungle corrupted by Bokor. 

 ~ CryptBattleMap: 2 Maps. New NPCs: Wraith (ability: turns invis 1 turn, teleports melee)
   Rework the enemies considering replacing the skeletons with zombies as the
   default npc mob. Include a cursed Wraith to replace the Mage. Mini-Boss is Bess has
   a melee attack and a curse ability to stun a target and lose a turn.

 ~ PyramidBattleMap: 2 Maps. New NPCs: Mummies (ability: cause disease on target)
   This map will take place inside a pyramid with the second map having a mini-boss
   Need to flush out ideas for mini-boss and special attack. 

 ~ SwampBattleMap: 2 Maps. New NPCs: TBD This map will take place in a swamp
   of Wandering Souls. Add a mini-boss based on some Guardian of the dead lore TBD.

## ####COMPLETED####

## Ch.1 Priorities (v0.1.0 Pre-Alpha)

- [X] Priorities: Create turn based system no manual selection of heroes
- [X] Priorities: Balance out attack, hp, damage, scales
- [X] Priorities: Create Victory Scenario + place holder for cutscene cinematic..
- [X] Begin work on main menu framework. Continue, New Game, Settings, Credits
- [X] Rename BattleMap.gd to CryptBattleMap.gd & update all code references
- [X] Work on the main travel map. Design, create party member travel logo  
- [X] Design CryptBattleMaps (3). 
- [X] Design Kraal map (1)
- [X] Design 2nd & 3rd Map for CryptBattleMap. New NPC miniboss: Bess


## Ch.1 Features (v0.1.0 Pre-Alpha)

- [X] Create trap animation for Aziza and update code.
- [X] Create shield bash animation for Osa and update code.
- [X] Add skill button for Nganga.
- [X] Add skill button for Kishi.
- [X] Create animation for Nganga skill effects: disease and heal.
- [X] Implement Kishi shapeshifting skill.
- [X] Create animations for Kishi shapeshifting skill.
- [X] Implement idle animation system mixed with current breathing system.
- [X] Create attack animation for skeleton warrior.
- [X] Create attack animation for skeleton archer.
- [X] Create attack animation for skeleton mage.
- [X] Create projectile sprite and animation for skeleton archer.
- [X] Create background music for battle scene.
- [X] Add idle effect for Kishi in werehyena form, maybe breathing only
- [X] Create sound effects for damage taken
- [X] Add Defeat Scene
- [X] Update the buttons at the end of the Victory/Defeat Scenes. Victory: Replay Mission, Continue, Main Menu.
	  Continue (long term) will trigger autosave progress. Defeat: Replay Mission, Exit Map, Main Menu. Exit
	  map takes player back to party travel map (to be implemented)
- [X] Using the portrait images create cut scenes of dialog from each character about the starting encounter. box
      with portrait and text being printed across. maybe have their mouth moving like they are talking. 
- [X] Finished addding new attack/skill button features
- [X] Add new portrait image in player status for kishi in wolf form
- [X] Add music to cutscene dialogues.
- [X] Add music to main menu.
- [X] Add character turn sound effects for all characters
- [X] Create Skeleton Mage dmg effects animation on target
- [X] Create leg animation frames for movement.
- [X] Create audio dialogue for each characters action
- [X] Create character audio effects for failed actions
- [X] Create party icon for TravelMap
- [X] Create fading footprints effect for movement on TravelMap
- [X] Add choose icons menu pre-game. Import Sprite icon sheet create frames
- [X] Create walking animation for all NPCs
- [X] Add day cycles to the TravelMap, Day timer to game.
- [X] Improve combat mechanics. Maybe add an interupt system based off of avail AP.
- [X] Add Difficulty level to the game, add to settings. Easy, Med, Hard. Increase npc 
      HP to scale difficulty. 



## Ch.1 Fixes (v0.1.0 Pre-Alpha)

- [X] Fix bug: Nganga cannot cast disease twice on same target
- [X] Fix bug: Nganga Disease and Heal skill cost 2 AP 
- [X] Fix bug: When npc dies with disease effect, the cloud is green sprite and very large
- [X] Fix bug: when npc dies w/o disease effect, cloud effect is red from targeting shader
- [X] Fix bug: Disease green spell effect does not wear off after 2 turns
- [X] Fix bug: Out of bounds right side needs to be extended.
- [X] Fix bug: Apply to breathing to characters not selected. Only Nganga works.
- [X] Death animation cloud still too big
- [X] Victory sequence doesn't trigger
- [X] Add not in range targeting messages in window. So Player has feedback why no targeting selection. Check
      Other skills for missing messages.
- [X] Skeletonwarrior 2 name shows up, should just be displayed in target box as Skeleton Warrior     
- [X] Check Skip button mechanic
- [X] Aziza AP missing # for Trap skill
- [X] Turn before Kishi starts before his attack is finished. The next turn begins before Kishi Wolf is finished with animation.
- [X] Text on bottom of message display is truncated
- [X] Fix Aziza healthbar after sprite rescale for animation
- [X] Fix sprite shadow effect not showing again
- [X] Fix target boxes for npcs too low
- [X] Fix Nganga idle animation bounces around, pixel foot off


## Ch.1 Polish (v0.1.0 Pre-Alpha)

- [X] Add shadow effects under all character sprites.
- [X] Update character status field with a graphic or texture map.
- [X] Update the character profile pictures to match their new sprites.
- [X] Review all characters AP,HP, skill cost values
- [X] Adjust output box frame not even.
- [X] Rework healthbar meters replace red with green. change color based on %
- [X] Skeleton Archer scale needs to be increased
- [X] Re-do graphic animations in main menu, flames look unrealistic
- [X] Add eye glow animation to Main Menu background when player clicks Begin
- [X] Speed up Aziza projectile
- [X] Change Osa Shield bash sound
- [X] Refactor select animation for Aziza
- [X] Refactor select animation for Osa
- [X] Refactor select animation for Kishi
- [X] Refactor select animation for Kishi W form
- [X] Refactor select animation for Nganga
- [X] Revisit the entire combat system. Have it based on closeness to the
      the target instead of cell location. if the spites are close enough
      allow combat for melee.


## Ch.1 Ideas (v0.1.0 Pre-Alpha)

