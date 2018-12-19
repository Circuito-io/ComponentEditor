/** \addtogroup Thermistor
    @{
*/


#ifndef THERMISTOR_H
#define THERMISTOR_H

#include "AnalogReader.h"
#include <Arduino.h>

#define CAL_READINGS 5 // how many samples to take and average, more takes longer but is more 'smooth'
#define THERMISTOR_R_NOM 10000  // Ro: defined resistance at 25 degrees C    
#define THERMISTOR_T_NOM 25 // T0: temp. for nominal resistance (almost always 25 C)
#define THERMISTOR_B_COEF 3977 // B: The beta coefficient of the thermistor (usually 3000-4000)
#define THERMISTOR_S_RES 10000 // the value of the 'other' resistor


class Thermistor : public AnalogReader {
  public:
    Thermistor(const int pin);
    //Get avreaged temeprature measurement in Celsius
    float getTempC(byte calReadings = CAL_READINGS);
    //Get avreaged temeprature measurement in Fahrenheit
    float getTempF(byte calReadings = CAL_READINGS);
};

#endif //THERMISTOR
/** @}*/