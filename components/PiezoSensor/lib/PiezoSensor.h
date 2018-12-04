#ifndef _PIEZO_SENSOR_
#define _PIEZO_SENSOR_

#include "AnalogReader.h"

class PiezoSensor : public AnalogReader
{
	public:
		PiezoSensor(const int pin);
};

#endif //_PIEZO_SENSOR_
