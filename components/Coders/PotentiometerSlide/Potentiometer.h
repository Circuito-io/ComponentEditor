/** \addtogroup Potentiometer
 *  @{
 */
 
#ifndef POTENTIOMETER_H
#define POTENTIOMETER_H

#include "AnalogReader.h"

class Potentiometer : public AnalogReader
{
	public:
		Potentiometer(int pin);

};
#endif //POTENTIOMETER
/** @}*/