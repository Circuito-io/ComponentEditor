/** \addtogroup Fan
 *  @{
 */
#ifndef Fan_H
#define Fan_H

#include "Switchable.h"

//Fan driver class:
class Fan : public Switchable {
    public:
        Fan(const int pin);
};

#endif //Fan_H
 /** @}*/