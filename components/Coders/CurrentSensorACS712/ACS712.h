/** \addtogroup ACS712 
 *  @{
 */
 
#ifndef _ACS712_H_
#define _ACS712_H_

#include "AnalogReader.h"

#define FACTOR 0.026; //26.4mA per count
#define CALREADINGS 1000
#define CALFACTOR 513

class ACS712 : public AnalogReader {
	public:
		ACS712(const int pin);
    void calibrate(int calFactor = CALFACTOR);
    float getCurrent(int cals = CALREADINGS);
  private:
    int m_calFactor = 513;
};

#endif // _ACS712_H_
/** @}*/
