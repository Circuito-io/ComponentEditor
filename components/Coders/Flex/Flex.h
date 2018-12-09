/** \addtogroup Flex 
 *  @{
 */
 
#ifndef _FLEX_H_
#define _FLEX_H_

#include "AnalogReader.h"

class Flex : public AnalogReader {
	public:
		Flex(const int pin);
};

#endif // _FLEX_H_
/** @}*/