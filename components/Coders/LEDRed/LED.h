#ifndef RGBLED_H
#define RGBLED_H

#include "Switchable.h"

class LED : public Switchable
{
	public:
		LED(const int pin);
};

#endif //__LED_H
