/** \addtogroup LM35
 *  @{
 */
 
#ifndef _LM35_H_
#define _LM35_H_

#include "AnalogReader.h"
#include <Arduino.h>

#define CAL_READINGS 5

class LM35 : public AnalogReader {
	public:
		LM35(const int pin);
        //Get avreaged temeprature measurement in Celsius
		float getTempC(byte calReadings = CAL_READINGS);
		//Get avreaged temeprature measurement in Fahrenheit
		float getTempF(byte calReadings = CAL_READINGS);


  private:
    int m_calValue;
};

#endif // _LM35_H_
/** @}*/