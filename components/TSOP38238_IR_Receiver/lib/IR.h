#ifndef _IR_H_
#define _IR_H_

#include "IRremote.h"

/* Receive and decode IR signals
*
*  This library is an envelop to Chris Young's library
*  which is available at https://github.com/cyborg5
*
*  Checkout Adafruit's great guide at 
*  https://learn.adafruit.com/using-an-infrared-library
*
*
*/

class IR : public decode_results
{
    public:
        IR(const int pin);
        
        // wait for IR signal. If a signal was correctly decoded return its value, otherwise return 0
        // this function blocks until some signal is received
        long int detect();
        void init();

        void Resume();
        
    private:
        
        // Receiver object
        IRrecv   m_receiver;
        
        // Decoder object
        decode_results results;
        
        // pin connected to sensor
        const int m_pin;

};

#endif 

