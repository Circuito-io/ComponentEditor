#ifndef _SOLENOID_LOCK_H_
#define _SOLENOID_LOCK_H_

#include "Switchable.h"

//solenoid driver class:
class SolenoidLock : public Switchable {
    public:
    SolenoidLock(const int pin) : Switchable(pin) {}
};

#endif // _SOLENOID_LOCK_H_
 