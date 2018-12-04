#include "DS18B20.h"

//constructor
DS18B20::DS18B20(const int pin) : m_pin(pin), oneWire(pin), sensor(&oneWire)
{
  sensor.begin(); // Start the temperature sensor
}

// get temperature in degrees celsius
float DS18B20::readTempC()
{
  //request data from device
  sensor.requestTemperatures();
  //get temperature in celsius, input 0 - for first device on bus
  return sensor.getTempCByIndex(0);

}

// get temperature in degrees fahrenheit
float DS18B20::readTempF()
{
  //request data from device
  sensor.requestTemperatures();
  //get temperature in fahrenheit, input 0 - for first device on bus
  return sensor.getTempFByIndex(0);

}
