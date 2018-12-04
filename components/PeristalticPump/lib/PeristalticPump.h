#ifndef _PERISTALTIC_PUMP_H_
#define _PERISTALTIC_PUMP_H_

#include "Switchable.h"

//Peristaltic Pump driver class:
class PeristalticPump : public Switchable {
    public:
    PeristalticPump(const int pin) : Switchable(pin) {}
};

#endif // _PERISTALTIC_PUMP_H_
 