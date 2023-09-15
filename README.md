# lc-house-alarm

Leaving Cert project.
Created a house alarm system using a Microbit, coded in Python and Javascript in order to connect to a Firebase Database.

Warning - website log-in no longer works as the database on Firebase has been removed due to inactivity. I will attach a video of the working 


Description of system:
- basic first website with details on product and a log-in account system
- system was used for the user to be notified about an alarm going off (aka a door or window opening)
- microbit was programmed to react to magnetic changes which alerted a python program
- python program accessed the database and updated the alarm activity
- database contacted and updated the website

File descriptions:

microbit-magnet-alarm.hex :
- a program for the microbit that checks for change in magnetism
- was coded on 'makecode microbit' using partially python but mostly block coding
- if a change is detected, the microbit sends a signal to a USB connected device about the alarm activating (which runs a python program)
- the microbit then makes an alarm-like noise until it is deactivated by the user

serial_reader.py :
- python program that communicated with the Microbit
- if the 'alarm' was triggered, Python accesses and updated the Firebase database information on alarm status

the website:
- details product 'details'
- has a log-in system using the Firebase database
- communicates with the database and updates details displayed on the website accordingly
- I may go back and update and improve the visuals of the website in the future
