import sys;sys.path.insert(0,'../..')
from audiolib import *
music('calm',0,24.4)                      # calm | pulse | epic
add(0.05,whoosh(.5,False,.25),0)
for t in [2.6,6.3,10.4,14.3]:branch(t)    # one per scene change
midcta_cues(18.2);endcard_cues(24.4)
finish('a.wav')
