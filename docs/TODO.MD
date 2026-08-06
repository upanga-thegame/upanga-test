# TODO - CH.1

Upanga: The Soul Blade - TODO + Dev Tracker


## Ch.1 Priorities (v0.4.0 Alpha)

- [~] Paywall after completion of the Crypt. 

## Ch.1 Features (v0.4.0 Alpha)

- [ ] Create cinematic cutscene: Game launch
- [ ] Create cinematic cutscene: New game
- [ ] Create cinematic cutscene: After CryptBattleMap
- [ ] Create cinematic cutscene: After JungleBattleMap
- [ ] Create cinematic cutscene: After RuinsBattleMap
- [ ] Create cinematic cutscene: After PyramidBattleMap
- [ ] Create cinematic cutscene: After FortressBattleMap
- [ ] Create game trailer, game play
- [ ] Work on storyboards, hero origin stories
- [ ] Add victory celebration scene for Kraal after defeat of Bida
- [X] Add Soul blade to travelmap that files as areas are completed

## Ch.1 Fixes (v0.4.0 Alpha)

- [~] Fix Kraal flames not on wood

## Ch.1 Polish (v0.4.0 Alpha)

- [X] Redo settings menu, add graphical UI for it fit on 1 page
- [~] Clean up Kraal scene, less people walking better pathing
- [ ] Bida death, make him sink in the ground earthquake effects rumble cloud sand 
- [X] Remove come back later on nodes not opened just have them do nothing

## Ch.1 Testing (v0.4.0 Alpha)

- [~] Test core gameplay loop.
- [~] Test scene transitions.
- [~] Test export/build flow. Continue to test on mobile after new builds. 

## Ch.1 Ideas (v0.4.0 Alpha)


## Ch.1 Notes (v0.4.0 Alpha)




## ####COMPLETED####

## Ch.1 Priorities (v0.3.0 Alpha)

## Ch.1 Features (v0.3.0 Alpha)

## Ch.1 Fixes (v0.3.0 Alpha)

- [X] When hero has order to attack target behind them they walk backwards, they should turn then walk then attack
- [X] Kishi and Nganga animations seem jerky, idle etc
- [X] Jungle map 1 npcs too bunched up adjust melee range
- [X] When boss dies any adds should also die
- [X] heros shouldnt walk backwards

## Ch.1 Polish (v0.3.0 Alpha)

- [X] Add some deeper intelligence to npc logic pathing targeting etc
- [X] Deep dive into difficulty systems, adjustments needed with new death system
- [X] Deep map dive cleanup, tuning, npc balancing.
- [X] Make sure all npcs have idle breathing. correct shadows anchored to ground matching sprite
- [X] Performance audit

## Ch.1 Testing (v0.3.0 Alpha)

## Ch.1 Ideas (v0.3.0 Alpha)

## Ch.1 Notes (v0.3.0 Alpha)

## Ch.1 Priorities (v0.2.1 Pre-Alpha)

- [X] Implement new continuous movement system
- [X] Design JungleBattleMaps
- [X] Design PyramidBattleMaps
- [X] Design SwampBattleMaps
- [X] Design Final Boss Map 
- [X] Bida Lair completion


## Ch.1 Features (v0.2.1 Pre-Alpha)

- [X] Implement a death system + resurrection shrine at the shamans hut
- [X] Add ambient sound effects to the maps, like jungle sounds
- [X] Add new scenes for shaman hut & chieftan instead of stale dialogue boxes
- [X] Add Griot hut
- [X] Flush out more Shaman abilities, buff before each battle of their choosing


## Ch.1 Fixes (v0.2.1 Pre-Alpha)

- [X] Kishi walk animation is not working


## Ch.1 Polish (v0.2.1 Pre-Alpha)

- [X] Re-do the Kraal Map, re-use the group icon from TravelMap
- [X] Completely Revamp the dialogue system, implement Griot with some decision tree logic


## Ch.1 Testing (v0.2.1 Pre-Alpha)

## Ch.1 Ideas (v0.2.1 Pre-Alpha)

- [X] Create new portrait pics for different emotions for story cards. 

## Ch.1 Notes (v0.2.1 Pre-Alpha)

## Ch.1 Priorities (v0.2.0 Pre-Alpha)

- [X] Priorities: Create turn based system no manual selection of heroes
- [X] Priorities: Balance out attack, hp, damage, scales
- [X] Priorities: Create Victory Scenario + place holder for cutscene cinematic..
- [X] Begin work on main menu framework. Continue, New Game, Settings, Credits
- [X] Rename BattleMap.gd to CryptBattleMap.gd & update all code references
- [X] Work on the main travel map. Design, create party member travel logo  
- [X] Design CryptBattleMaps (3). 
- [X] Design Kraal map (1)
- [X] Design 2nd & 3rd Map for CryptBattleMap. New NPC miniboss: Bess
- [X] Build & export first Android apk. Check how game looks & plays on mobile. 

## Ch.1 Features (v0.2.0 Pre-Alpha)

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
- [X] Using the portrait images create cut scenes of dialogue from each character about the starting encounter. box
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
- [X] Implement autosave functions. Display message "Saving..." whenever switching screens
      save the current game state.
- [X] Revamp how box frames are used, remove sprite frames use native godot systems will
      help improve performance.
- [X] Implement diagonal movement & attack.
- [X] Created Skeleton Witchdoctor replaces Skeleton Mage
- [X] Add a day cycle 1hr real world 24 game time, cycle tints of the map
- [X] Implement flash encounter on TravelMap. Bandit attack. New NPCs: Bandit, Bandit Leader
- [X] Add a spinning arrow quest icon for tip. 


## Ch.1 Testing (v0.2.0 Pre-Alpha)

- [X] Test save/load or persistence behavior, if applicable.

## Ch.1 Fixes (v0.2.0 Pre-Alpha)

- [X] After leaving Chief hut on Kraal map, cant click right in front of hut to move
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
- [X] On TravelMap after leaving Kraal box confirming entry pops up, should not.
- [X] Pre&Post Crypt dialogue boxes need text adjustments, runs into frame.
- [X] Add Zombie profile picture to npc status bar
- [X] Update thanks for playing box with more info.
- [X] Adjust so anywhere in the map is clickable except regions like water, mountains
      remove the rigid path
- [X] Movement dial cant be moved
- [X] Ruins should be locked at start of game until after chief dialogue
      make ghost smaller on 2nd cryptbattle when respawn

## Ch.1 Polish (v0.2.0 Pre-Alpha)

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
      - [X] Do something with end button either skin it or make it bigger.
- [X] Make sure game autosaves in between CryptBattle maps
- [X] Add a time based system for map completion, keep track of best time.
- [X] Redo Kishi voiceovers, don't like how they sound. Kishi werehyena is ok.
- [X] Create an indicator over region with status completion
- [X] Refactoring the icon movement on the travelmap, adding animation movement.


## Ch.1 Ideas (v0.2.0 Pre-Alpha)

## Ch.1 Notes (v0.2.1 Pre-Alpha)

### Upanga: The Soul Blade — The Broken Roads of Bomende

Chief Akende introduces himself as the ruler of Bomende and asks the heroes for help. The kingdoms are being divided by supernatural corruption: roads disappear, rivers refuse to cross old borders, forests attack travelers, and the dead guard paths once shared with the living. If this isolation continues, the kingdoms will collapse without Bida ever having to invade them.

Long ago, the kingdoms forged the Soul Blade as a symbol of their unity. Together, they used it to establish a covenant with Bida: the serpent would bring prosperity and protection, but the kingdoms would provide a terrible human tribute. When the people finally rejected the sacrifice, war erupted between Bida and the united kingdoms.

Unable to destroy Bida, the first bearer of the Soul Blade used it to imprison him. The act shattered the weapon into four pieces, which were entrusted to regional guardians and carried to the far ends of Bomende. Without the Soul Blade, the alliance between the kingdoms slowly weakened, and the four great roads connecting their people fell into neglect.

Now Bida has awakened and corrupted the guardians protecting the fragments. He uses their power to sever the roads completely, ensuring the kingdoms remain isolated and cannot unite against him again.

Each region restores one great road and recovers one piece of the Soul Blade:

- The Crypt holds the blade’s hilt and restores the Ancestral Road, reconnecting the living with the wisdom of those who fought Bida before.
- The Swamp holds part of the blade’s edge and restores the Water Road, allowing rivers, supplies, and travelers to move between kingdoms.
- The Jungle holds the second part of the blade’s edge and restores the Forest Road, reopening access to food, medicine, and distant communities.
- The Pyramid holds the blade’s core and restores the Royal Road, revealing the complete history of Bida, the tribute, and the Soul Blade’s first bearer.

Bess, Sobekus, Sasabonsam, and the Pyramid Keeper are not merely Bida’s servants. Each was entrusted with protecting a piece of the blade and the road surrounding it. Bida has twisted their duty into obsession, causing them to imprison the dead, hoard the water, close the forest, and bury the truth. The heroes must defeat or redeem them before recovering each fragment.

After the Swamp is liberated and the Jungle road opens, Bida sends frightened mercenaries to ambush the heroes. Their orders are to prevent the fragments from being joined and stop the kingdoms from discovering that resistance is possible.

As each fragment is recovered, the corresponding kingdom renews its alliance with Chief Akende. By the time the final piece is taken from the Pyramid, the four roads converge at the Kraal and representatives from every kingdom gather to reforge the Soul Blade.

The restored weapon does more than open Bida’s magical barrier. It proves that the kingdoms have become united again. The blade’s power comes from their shared purpose, meaning no single ruler or warrior can command it alone.

Armed with the reforged Soul Blade, the heroes enter Bida’s lair. Bida argues that the kingdoms betrayed him first and that their prosperity was built upon a covenant they willingly accepted. The heroes acknowledge the betrayal but reject any bargain maintained through the sacrifice of someone who had no choice.

The final battle determines whether the kingdoms will return to fear and division or build a new future together. When Bida is defeated, the Soul Blade remains as a symbol of unity rather than conquest: no kingdom will purchase its prosperity with another person’s suffering, and no guardian will ever stand alone over the roads of Bomende again.
