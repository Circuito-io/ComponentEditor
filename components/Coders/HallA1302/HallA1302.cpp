#include "HallA1302.h"

/**
 *Construct hall sensor instance.<BR>
 * The output of the sensor is proportional to the magnetic field it senses depending on its polarity.
 */
HallA1302::HallA1302(const int pin) : AnalogReader(pin)
{
  
}

/**
 * Calibrate the sensor.
 * cals - (default = 10) number of readings for averaging. 
 */

int HallA1302::calibrate(int cals)
{
  for(int i=0 ; i< cals ; i++)
  {
    m_calValue += read();
    delay(20);
  }
  m_calValue = m_calValue/cals;
  return m_calValue;
}

/**
 * Get measurement from sensor.<BR>
 * Returns value of -511 <-> 512 depending on magnet polarity.
 */

int HallA1302::getMeasurment()
{
  //calibrate current read
  int measurment = read() - m_calValue;
  //filter noise arround calibration point
  if(measurment < FILT_MARGIN && measurment > -FILT_MARGIN)
    return 0;
  else
    return measurment;
}
