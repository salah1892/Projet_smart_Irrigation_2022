#if defined(ESP32)
  #include <WiFi.h>
#endif
#include <DHT.h> // capteur de temperature DHT11
#include <DHT_U.h> // capteur de temperature DHT11
#include <HTTPClient.h> // HTTP request
#include <ArduinoJson.h> //Parse une Fichier JSON
//---------------------------------------------------------------------//
//Fixer les paramétres de Time via serveur :pool.ntp.org               //
#include <NTPClient.h>                                                 //
#include <WiFiUdp.h>                                                   //
// Define NTP Client to get time                                       //
WiFiUDP ntpUDP;                                                        //
NTPClient timeClient(ntpUDP, "pool.ntp.org");                          //
//---------------------------------------------------------------------//



#define DHTPIN 23
#define SOILPIN 32
#define LDRPIN 33
#define LEDGREENPIN 15
#define LEDREDPIN 16
#define SOILPOWER 4

DHT dht(DHTPIN, DHT11);

const char* WIFI_SSID       = "HUAWEI nova 3i";
const char* WIFI_PASSWORD   = "2000-33224999";

//unsigned long epochTime; 
unsigned long dataMillis = 0;

/*------------------------------------*/
//const char* serverName = "http://us-east-1.aws.data.mongodb-api.com/app/smartfarm-jjwlk/endpoint/plantdata";

//const char* serverName="https://eu-west-3.aws.data.mongodb-api.com/app/smartfarm-jjwlk/endpoint/plantdata";

const char* serverName="https://eu-central-1.aws.data.mongodb-api.com/app/smartfarm-jjwlk/endpoint/plantdata";

//const char* serverName="https://data.mongodb-api.com/app/smartfarm-jjwlk/endpoint/plantdata";

StaticJsonDocument<500> doc;

void setup()
{
    Serial.begin(115200);
    dht.begin();
    pinMode(LEDGREENPIN, OUTPUT);
    pinMode(LEDREDPIN, OUTPUT);
    pinMode(SOILPOWER, OUTPUT);

    digitalWrite(LEDGREENPIN, LOW);
    digitalWrite(LEDREDPIN, LOW);
    digitalWrite(SOILPOWER, LOW);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();
    TimeConfig();
}

void loop()
{

   if (millis() - dataMillis > 15000 || dataMillis == 0)
   {
       dataMillis = millis();

      

       float temperature = dht.readTemperature();
       float humidity = dht.readHumidity();

       digitalWrite(SOILPOWER, HIGH);
       delay(10);
       float moisture = analogRead(SOILPIN);
       float moisturePercent = 100.00 - ( (moisture / 4095.00) * 100.00 );
       digitalWrite(SOILPOWER, LOW);

       float ldr = analogRead(LDRPIN);
       float ldrPercent = (ldr / 4095.00) * 100.00;

       Serial.print("Temperature: ");
       Serial.print(String(temperature));
       Serial.print(" C\nHumidity: ");
       Serial.print(String(humidity));
       Serial.print("\nMoisture: ");
       Serial.print(String(moisturePercent));
       Serial.print(" %");
       Serial.print("\nLight: ");
       Serial.print(String(ldrPercent));
       Serial.print(" %");
       Serial.println("\n");
       
        
       doc["sensors"]["temperature"] = temperature;
       doc["sensors"]["humidity"] = humidity;
       doc["sensors"]["moisture"] = moisturePercent;
       doc["sensors"]["light"] = ldrPercent;
       doc["sensors"]["Heure"] = getTimeandDay();
       Serial.println("Uploading data... "); 
       POSTData();
   }
}
/*-----------------------------------------------------------------------------*/
void POSTData()
{
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      http.begin(serverName);
      http.addHeader("Content-Type", "application/json");

      String json;
      serializeJson(doc, json);

      Serial.println(json);
      int httpResponseCode = http.POST(json);
      Serial.println(httpResponseCode);

      if (httpResponseCode == 200) {
        Serial.println("Data uploaded.");
        digitalWrite(LEDGREENPIN, HIGH);
        delay(200);
        digitalWrite(LEDGREENPIN, LOW);
      } else {
        Serial.println("ERROR: Couldn't upload data.");
        digitalWrite(LEDREDPIN, HIGH);
        delay(200);
        digitalWrite(LEDREDPIN, LOW);
      }

    }

}
/*-----------------------------------------------------------------------------*/
String getTimeandDay(){
timeClient.update();
//Week Days
String weekDays[7]={"Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"};

//Month names
String months[12]={"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "September", "October", "November", "December"};
  unsigned long epochTime = timeClient.getEpochTime();
  Serial.print("Epoch Time: ");
  Serial.println(epochTime);
  
  String formattedTime = timeClient.getFormattedTime();
 // Serial.print("Formatted Time: ");
 // Serial.println(formattedTime);  

  int currentHour = timeClient.getHours();
 // Serial.print("Hour: ");
 // Serial.println(currentHour);  

  int currentMinute = timeClient.getMinutes();
 // Serial.print("Minutes: ");
  //Serial.println(currentMinute); 
   
  int currentSecond = timeClient.getSeconds();
  //Serial.print("Seconds: ");
  //Serial.println(currentSecond);  

  String weekDay = weekDays[timeClient.getDay()];
  //Serial.print("Week Day: ");
  //Serial.println(weekDay);    

  //Get a time structure
  struct tm *ptm = gmtime ((time_t *)&epochTime); 

  int monthDay = ptm->tm_mday;
  //Serial.print("Month day: ");
  //Serial.println(monthDay);
  
  int currentMonth = ptm->tm_mon+1;
  //Serial.print("Month: ");
  //Serial.println(currentMonth);

  String currentMonthName = months[currentMonth-1];
  //Serial.print("Month name: ");
  //Serial.println(currentMonthName);

  int currentYear = ptm->tm_year+1900;
  //Serial.print("Year: ");
  //Serial.println(currentYear);

  //Print complete date:
  String currentDate =weekDay +" "+ String(monthDay) + "-" + currentMonthName + " " + "["+String(currentMonth)+"]" + " - " + String(currentYear)+ " ; " +String(formattedTime);
  //Serial.print("Current date: ");
  //Serial.println(currentDate);

  //Serial.println("");
  return currentDate;
}
/*-----------------------------------------------------------------------------*/
void TimeConfig(){
// Initialize a NTPClient to get time
  timeClient.begin();
  // Set offset time in seconds to adjust for your timezone, for example:
  // GMT +1 = 3600
  // GMT +8 = 28800
  // GMT -1 = -3600
  // GMT 0 = 0
  timeClient.setTimeOffset(3600);  //IST is UTC+5:30 Hrs
}
