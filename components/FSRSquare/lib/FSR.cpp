#include "FSR.h"
#include <Arduino.h>

/**
 * FSR constructor.<BR>
 * pin- Analog pin required.
 */
FSR::FSR(const int pin) : AnalogReader(pin), Vcc(5), res(3300)
{
  pinMode(pin, INPUT);
}

/**
 * Get the resistance (in Ohms) of the sensor.
 */
float FSR::getResistance()
{
  float senVoltage = read() * Vcc / 1023;
  return res * (Vcc / senVoltage - 1);
}

/**
 * Converte resistance to force using curve from data sheet [in grams/cm^2].<BR>
 * Return value ranges 100g/cm^2 to 10Kg/cm^2.
 */
float FSR::getForce()
{
  float resistance = getResistance();
  //calculate force using curve broken into two parts of different slope
  if (resistance <= 600)
    return (1.0 / resistance - 0.00075) / 0.00000032639;
  else
    return (1.0 / resistance)  / 0.000000642857;
}
