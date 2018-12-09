#ifndef SoilMoisture_H
#define SoilMoisture_H

#include "AnalogReader.h"

class SoilMoisture : public AnalogReader
{
	public:
		SoilMoisture(int pin);
};
#endif //SoilMoisture_H
