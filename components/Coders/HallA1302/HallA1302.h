/** \addtogroup HallA1302 
 *  @{
 */
 
#ifndef _HALLA1302_H_
#define _HALLA1302_H_

#include "AnalogReader.h"
#include <Arduino.h>

#define FILT_MARGIN 3
#define CAL_READINGS 10

class HallA1302 : public AnalogReader {
	public:
		HallA1302(const int pin);
        //call this func in setup for sensor calibration. you can specify the number of reading for calibration
        int calibrate(int cals = CAL_READINGS);
        //get measurement from sensor
		int getMeasurment();

  private:
    int m_calValue;
};

#endif // _HALLA1302_H_
/** @}*/