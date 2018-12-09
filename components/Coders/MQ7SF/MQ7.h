/** \addtogroup MQ7 
 *  @{
 */
#ifndef MQ7_H
#define MQ7_H

#include "AnalogReader.h"

class MQ7 : public AnalogReader
{
	public:
		MQ7(const int pin);

};
#endif //MQ7
/** @}*/