/** \addtogroup Pump
 *  @{
 */
#ifndef PUMP_H
#define PUMP_H

#include "Switchable.h"

//pump driver class:
class Pump : public Switchable {
    public:
        Pump(const int pin);
};

#endif //PUMP_H
 /** @}*/