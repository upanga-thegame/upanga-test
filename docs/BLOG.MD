# Upanga DevBlog

## 2026-05-17 2:30 PM - First DevBlog Entry

This is the first development blog entry for Upanga: The Soul-Blade.

I should have added this earlier in the development process for those that
want to follow my progress. Better late than never! 

## 2026-05-17 3:00 PM - Current Game State

Development is on a steady & consistent pace. Chapter 1 will consist of 5 
regions to clear. Currently each region will have 2 maps + mini-boss fight. 
The first region has already been completed. The others are still in
development. The complete game will have 4 Chapters total. Development of
the other regions should be completed more rapidly as they will follow
a similar format for objectives, with a few wrinkles thrown in. Today I
added a day/night cycle system. Purely for aesthetics has no impact on
game mechanics. This only takes place on the Travel Map scene. 

## 2026-05-18 11:00 AM - Todays updates

Today I implemented a Battle time tracking system. It keeps track of how long
it takes to complete a mission battle & tracks their Best scored time. I am
also revamping how the message frame boxes look. My plan is to get rid of the
sprite images and use godot Layered PanelContainer / ColorRect nodes for the outer 
frame, inner groove, and inset content area. StyleBoxFlat borders for the thick 
pixel frame and dark interior. This should hopefully also improve performance
with less assets being loaded on the screen. 

## 2026-05-20 10:52 AM - Todays updates

I've made a lot of progress the last couple of days. After some trial & error
was able to export a working Android build to my mobile device. I discovered
immediately that the UI was way too small & the text was barely readable.
I addded a new settings menu feature to adjust the UI scale from normal-extra
large. I updated the dynamic dialogue boxes to reflect the increased font size
changes. I wrote a standalone build tool powershell script that executes a 
headless build without loading Godot. It uninstalls/re-installs the APK to my
mobile if it is connected. 

## 2026-07-28 4:00 PM - Long awaited update

Numerous updates since my last post. About 90% of the code is completed, I am
currently reworking some of the backend systems that handle dialog to make it
easier to make story line changes. I still have a lot of work to do for the
cinematic cut scenes and flushing out the story points. I am still ahead of 
schedule for the planned Fall release.