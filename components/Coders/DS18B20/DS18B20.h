#ifndef _DS18B20_H_
#define _DS18B20_H_


#include "DallasTemperature.h"
#include "OneWire.h"

class DS18B20 // : public DallasTemperature //- uncomment for inheritance
{
    public:
        DS18B20(const int pin);
        // These two function connect to the sensor over one wire communication and gets the current temperature in degrees celsius and fahrenheit
        float readTempC();
        float readTempF();
          
    private:    
        // Create OneWire bus object
        OneWire oneWire;

        // Create Temperature sensor object
        DallasTemperature sensor;
                
        // pin connected to sensor
        const int m_pin;

       

};

#endif //_DS18B20_H_

