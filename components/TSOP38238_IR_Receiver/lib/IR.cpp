#include "IR.h"

IR::IR(const int pin) : m_pin(pin), m_receiver(pin)
{
}

void IR::init()
{
  m_receiver.enableIRIn(); // Start the receiver
}

long int IR::detect()
{  
  if (m_receiver.decode(&results)) 
  {
    m_receiver.resume();
    return results.value;
  }
  else{
    return 0;
    }

}

