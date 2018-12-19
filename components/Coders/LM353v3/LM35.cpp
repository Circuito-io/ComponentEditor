#include "LM35.h"

/**
 *Construct LM35 instance.<BR>
 * The output of the sensor is linearly proportional to the temperature.
 */
LM35::LM35(const int pin) : AnalogReader(pin)
{
  pinMode(pin, INPUT);
}


/**
 * Get averaged measurement from sensor.<BR>
 * Returns temperature values -55 <-> 150 in Celsius.
 */

float LM35::getTempC(byte calReadings)
{
  int val = 0;
  for (byte i =0 ; i < calReadings ; i++ )
    val += read();
  return (5.0 * val * 100.0) / 1024.0 / calReadings;
}

/**
 * Get averaged measurement from sensor.<BR>
 * Returns temperature values -67 <-> 302 in Fahrenheit.
 */
float LM35::getTempF(byte calReadings)
{
  return getTempC(calReadings) * 1.8 + 32;
}