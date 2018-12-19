/** \addtogroup RelayModule 
 *  @{
 */

#ifndef RELAY_H
#define RELAY_H

#include "Switchable.h"

//solenoid driver class:
class Relay : public Switchable {
    public:
        Relay(const int pin);
};

#endif //RELAY_H

 /** @}*/