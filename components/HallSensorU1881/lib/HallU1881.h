/** \addtogroup HallU1881
 *  @{
 */
 
#ifndef _HALLU1881_H_
#define _HALLU1881_H_

#include "Button.h"
#include <Arduino.h>


class HallU1881 : public Button {
	public:
		HallU1881(const int pin);
};

#endif // _HALLU1881_H_
/** @}*/