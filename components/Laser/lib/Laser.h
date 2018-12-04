/** \addtogroup LaserModule 
 *  @{
 */

#ifndef LASER_H
#define LASER_H

#include "Switchable.h"

//solenoid driver class:
class Laser : public Switchable {
    public:
        Laser(const int pin);
};

#endif //LASER_H

 /** @}*/