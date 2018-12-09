#include "Thermistor.h"

/**
  Construct Thermistor instance.<BR>
   The output of the sensor is linearly proportional to the temperature.
*/
Thermistor::Thermistor(const int pin) : AnalogReader(pin)
{
  pinMode(pin, INPUT);
}


/**
   Get averaged measurement from sensor.<BR>
   Returns temperature values -40 <-> 150 in Celsius.
*/

float Thermistor::getTempC(byte calReadings)
{
  uint16_t thermistor_samples[calReadings];
  float average = 0;
  //float thermistorVal;
  uint8_t i;

  // 1. take N samples in a row, with a slight delay in between
  for (i = 0 ; i < calReadings ; i++ ) {
    thermistor_samples[i] = read();
    delay(10);
  }

  // 2. average all the samples out of the samples array
  for (i = 0 ; i < calReadings ; i++ ) {
    average += thermistor_samples[i];
  }
  average /= calReadings;

  // 3. convert the average analog reading value to resistance
  average = 1023 / average - 1;
  average = THERMISTOR_S_RES / average;
  //Serial.print("Thermistor resistance "); Serial.println(average);

  // 4. Calculate the temperature using the B parameter equation (simplified Steinhart-Hart equation)
  average = log(average / THERMISTOR_R_NOM) / THERMISTOR_B_COEF;  // 1/B * ln(R/Ro)
  average += 1.0 / (THERMISTOR_T_NOM + 273.15);                   // + (1/To)
  average = 1.0 / average;                                        // Invert
  average -= 273.15;                                              // convert to Celsius degrees
  //comment out the last line to get the calculation in Kelvin Degrees

  return average;

}

/**
   Get averaged measurement from sensor.<BR>
   Returns temperature values -40 <-> 302 in Fahrenheit.
*/
float Thermistor::getTempF(byte calReadings)
{
  return getTempC(calReadings) * 1.8 + 32;
}