#include "dweet.h"

Dweet::Dweet( ESP8266 *con, char* const inputToken, char* const outputToken) : m_inputToken(inputToken), m_outputToken(outputToken)
{
	m_con = con;
}

void Dweet::setDweet(const char* key, const String& value)
{
	// send the String's internal buffer to setDweet as char*
	setDweet(key, value.c_str());
}

void Dweet::setDweet(const char* key, const char* value)
{
	// set key value pair for upcoming dweet

	if (m_keysCount == MAX_KEYS)
	{
		return;
	}


	if (m_keysCount == 0)
	{
		int pos = 0;
		strncpy(m_buffer + pos, m_inputToken, strlen(m_inputToken));
		pos += strlen(m_inputToken);
		strncpy(m_buffer + pos, "?", 1);
		pos += 1;
		strncpy(m_buffer + pos, key, strlen(key));
		pos +=  strlen(key);
		strncpy(m_buffer + pos, "=", 1);
		pos += 1;
		strncpy(m_buffer + pos, value, strlen(value));
		pos += strlen(value);
		m_buffer[pos] = '\0';
		
	}
	else
	{
		 int pos = strlen(m_buffer);
		 strncpy(m_buffer + pos, "&", 1);
		 pos += 1;
		 strncpy(m_buffer + pos, key, strlen(key));
		 pos +=  strlen(key);
		 strncpy(m_buffer + pos, "=", 1);
		 pos += 1;
		 strncpy(m_buffer + pos, value, strlen(value));
		 pos += strlen(value);
		 m_buffer[pos] = '\0';
	}
	
	m_keysCount++;
	Serial.print(F("Set dweet: "));
	Serial.print(key);
	Serial.print(F(" , "));
	Serial.println(value);
}

/*
void Dweet::setDweet(const char* key, int value)
{
	char valueBuf[10];
	String(value).toCharArray(valueBuf, 10);
	
	setDweet(key, valueBuf);
	
}
*/

void Dweet::setDweet(const char* key, float value)
{
	char valueBuf[10];
	String(value).toCharArray(valueBuf, 10);
	
	setDweet(key, valueBuf);
}


void Dweet::sendDweetKeys()
{
	// send all key value pairs seen since last send into a single dweet to input thing name
	// https://dweet.io/dweet/for/my-thing-name?hello=world&foo=bar
	

	Serial.print(F("Posting Dweets to Server. Thing name: "));
	Serial.println(m_inputToken);
	
	// nothing to do
	if (m_keysCount == 0)
		return;

  m_con->httpGet(m_urlInputHeader, m_buffer, m_urlFooter, m_buffer, MAX_BUFFER_SIZE);

	// clear the send buffer
	m_keysCount = 0;	
}


bool Dweet::receiveDweetEvents()
{
	// get all dweets from output thing name
	// https://dweet.io/get/latest/dweet/for/my-thing-name
	Serial.print(F("Requesting Dweet: "));
	Serial.println(m_outputToken);	
	if(!m_con->httpGet(m_urlOutputHeader, m_outputToken, m_urlFooter, m_buffer, MAX_BUFFER_SIZE))
	{
		Serial.println(F(" - Didn't Receive Dweet."));
    m_eventVal[0] = '\0';
    return 0;
	}
 
  //make sure the received response is of "getting" not "dweeting" the button press
  if(extractValue( m_buffer, "by"))
  {
    //Serial.println(m_eventVal);
    //check if dweet is new (need to ignore)
    if (strcmp(m_eventVal, "getting" ) ) //strcmp return 0 if are equal
    {
      m_eventVal[0] = '\0';
      return 0;
    }
  }
  
	//get created time stamp out of the buffer, store it in m_eventVal
	if(!extractValue( m_buffer, "created"))
	{
		Serial.println(F("\nFailed to extract time stamp.\n"));
    m_eventVal[0] = '\0';
		return 0;
	}
 
 //In first run, save current time stamp and exit.
  if(strlen(m_lastReceivedDweetTime) == 0)
  {
    //the dweet is new, update time stamp
    strncpy (m_lastReceivedDweetTime, m_eventVal, strlen(m_eventVal));
    m_lastReceivedDweetTime[strlen(m_eventVal)] = '\0';
    return 0;
  }
  
	//check if the dweet is new 
	if (!strcmp(m_eventVal, m_lastReceivedDweetTime ) )	//strcmp return 0 if are equal
	{
		Serial.println(F("\nNo new dweet info.\n"));
		return 0;
	}
	
	//the dweet is new, update time stamp
	strncpy (m_lastReceivedDweetTime, m_eventVal, strlen(m_eventVal));
	m_lastReceivedDweetTime[strlen(m_eventVal)] = '\0';
	
	
	//get event value - which button was pressed, store it in m_eventVal
	if(!extractValue(m_buffer, "event"))
	{
		Serial.println(F("\nFailed to extract event value.\n"));
    m_eventVal[0] = '\0';
		return 0;
	}
	
	Serial.print(m_lastReceivedDweetTime);
	Serial.print(F(" , "));
	Serial.println(m_eventVal);
	Serial.println();
	
	return true;
}

/*
 * extract the value of 'key' in str
 */
bool Dweet::extractValue(char* str, const char* key)
{
	char* start = strstr(str, key) + strlen(key) + 3;       //pointer to where the value corresponding to key is in str
	if(!start)
	{
		return 0;
	}
	char* end = strchr(start, '"');
	if(!end)
	{
		return 0;
	}
	int valueLen = strlen(start) - strlen(end);
	//should be min(valueLen, m_eventVal buffer size left)
	strncpy ( m_eventVal, start, valueLen);
	m_eventVal[valueLen] =  '\0';
 
	return 1;
	
	
}


char* Dweet::getValue()
{	
	return m_eventVal;
}
