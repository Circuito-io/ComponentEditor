/** \addtogroup Buzzer
 *  @{
 */
#ifndef BUZZER_H
#define BUZZER_H

#include "Switchable.h"

//solenoid driver class:
class Buzzer : public Switchable {
    public:
        Buzzer(const int pin);
};

#endif //BUZZER_H
 /** @}*/