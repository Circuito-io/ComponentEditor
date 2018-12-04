#ifndef _DWEET_H_
#define _DWEET_H_

#include "ESP8266.h"
#include <avr/pgmspace.h>

const int MAX_KEYS = 10;
const int MAX_EVENTS = 6;
#define MAX_BUFFER_SIZE  250
#define OUTPUT_URL_BUFFER_SIZE 150
#define EVENTNAME_BUFFER_SIZE 50


class Dweet
{
    public:
        Dweet( ESP8266 *con, char* const inputToken, char* const outputToken);
		
		// Set dweet pair (key,  value)
		void setDweet(const char* key, const char* value);
		void setDweet(const char* key, const String &value);
		//void setDweet(const char* key, int value);
		void setDweet(const char* key, float value);
		
		// Post all set dweets to inputToken
        void sendDweetKeys();

		// Get dweets from outputToken
        bool receiveDweetEvents();
		
		// Get value of key
		char* getValue();
		
    private:
	
		// Extract value of key from dweet answer
		bool extractValue(char* str, const char* key);
		
		
		char* const m_urlOutputHeader PROGMEM = "GET /get/latest/dweet/for/";    //length = 26
		char* const m_urlInputHeader PROGMEM = "POST /dweet/for/";  //length = 16
		char* const m_urlFooter PROGMEM = " HTTP/1.1\r\nHost: proxy.circuito.io\r\nUser-Agent: ESP8266-WiFi/1.0\r\nConnection: close\r\n\r\n";  //length = 88

		char m_buffer[MAX_BUFFER_SIZE] = {0};
		char m_lastReceivedDweetTime[EVENTNAME_BUFFER_SIZE];
		char m_eventVal[EVENTNAME_BUFFER_SIZE] = {0};
		//char m_inputURL[OUTPUT_URL_BUFFER_SIZE] = {0};

    const char* m_inputToken;
		const char* m_outputToken;
    	int m_keysCount = 0;
        
    	ESP8266 *m_con;
        
};



#endif

