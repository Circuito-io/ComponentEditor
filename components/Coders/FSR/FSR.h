/** \addtogroup FSR
 *  @{
 */
 
#ifndef _FSR_H_
#define _FSR_H_

#include "AnalogReader.h"

class FSR : public AnalogReader {
  public:
    FSR(const int pin); 
    float getResistance();
    float getForce();
    float Vcc, res;

};

#endif // _FSR_H_
/** @}*/