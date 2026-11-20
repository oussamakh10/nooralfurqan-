import sys;sys.path.insert(0,'../..')
from audiolib import *
music('calm',0,9.6);music('pulse',9.6,24.4);auto_cues('story.js')
add(0.05,whoosh(.5,False,.25),0)
branch(4);branch(9.6);add(9.0,thud(.4,50),0);tap(13.9);correct(14.4);add(14.5,whoosh(.6,True,.15),0)
midcta_cues(18.2);endcard_cues(24.4)
finish('a.wav')
