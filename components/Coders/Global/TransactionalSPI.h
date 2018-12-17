#ifndef _TRANSACTIONAL_SPI_H
#define _TRANSACTIONAL_SPI_H

#include <SPI.h>

class TransactionalSPI
{
    public:
        TransactionalSPI(const int csPin, uint32_t clock, uint8_t bitOrder, uint8_t dataMode);
        TransactionalSPI(const int csPin);
  
    	// Transfer functions on default pin BOARD_SPI_DEFAULT_SS
    	uint8_t transfer(uint8_t data);
    	uint16_t transfer16(uint16_t data);
    	void transfer(void *buf, size_t count);

    	void begin(void);
    	void end(void);
    
    private:
        static TransactionalSPI *activeTransaction;
        const int m_csPin;
        const SPISettings m_settings;
};


#endif //_TRANSACTIONAL_SPI_H