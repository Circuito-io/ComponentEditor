#ifndef PiezoSpeaker_H
#define PiezoSpeaker_H

#include "Speaker.h"

class PiezoSpeaker : public Speaker  {
  public:
    PiezoSpeaker(const int pin);
};


#endif //PiezoSpeaker_H
