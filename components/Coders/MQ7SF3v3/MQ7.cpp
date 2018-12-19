#include "MQ7.h"

/**
 * MQ7 constructor
 * pin - requires analog pin on arduino board
 */
MQ7::MQ7(const int pin) : AnalogReader(pin) {}
