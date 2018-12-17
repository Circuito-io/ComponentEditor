#include "TransactionalSPI.h"

TransactionalSPI *TransactionalSPI::activeTransaction = NULL;


TransactionalSPI::TransactionalSPI(const int csPin, uint32_t clock, uint8_t bitOrder, uint8_t dataMode)
    : m_csPin(csPin), m_settings(clock, bitOrder, dataMode)
{
    SPI.begin();
    pinMode(m_csPin, OUTPUT);
    digitalWrite(m_csPin, HIGH);
}
 
TransactionalSPI::TransactionalSPI(const int csPin)
    : m_csPin(csPin), m_settings()
{
    pinMode(m_csPin, OUTPUT);
    digitalWrite(m_csPin, HIGH);
}

uint8_t TransactionalSPI::transfer(uint8_t data)
{
    begin();
    return SPI.transfer(data);
}

uint16_t TransactionalSPI::transfer16(uint16_t data)
{
    begin();
    return SPI.transfer(data);
}

void TransactionalSPI::transfer(void *buf, size_t count)
{
    begin();
    SPI.transfer(buf, count);
}

void TransactionalSPI::begin(void)
{
    if (activeTransaction != this)
    {
        if (activeTransaction != NULL)
            activeTransaction->end();
        
        SPI.beginTransaction(m_settings);
	    digitalWrite(m_csPin, LOW);	
	    activeTransaction = this;
    }
}

void TransactionalSPI::end(void)
{
    if (activeTransaction)
    {
        digitalWrite(m_csPin, HIGH);
	    SPI.endTransaction();
	    activeTransaction = NULL;
    }
}

