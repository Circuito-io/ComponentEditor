#ifndef _SOLENOID_VALVE_H_
#define _SOLENOID_VALVE_H_

#include "Switchable.h"

//solenoid driver class:
class SolenoidValve : public Switchable {
    public:
    SolenoidValve(const int pin) : Switchable(pin) {}
};

#endif // _SOLENOID_VALVE_H_
 