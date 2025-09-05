const postInitVentilatorSettings = async ({rate, pressure, oxygen, supportPressure, volume, peep, condition}) => {
  const API_URL = 'http://localhost:8080/api/simulate/init';
    const settings = { 
        respiratoryRate: rate, 
        tidalVolume: volume, 
        peep: peep,
        supportPressure: supportPressure,
        fio2: oxygen,
        inspiratoryPressure: pressure,
        scenario: condition,
        mode: "volume Control",
        weight: 70,  
     }; // Example settings; replace with actual data as needed

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      // Gathers more info from the response body if available
      const errorBody = await response.text();
      throw new Error(`HTTP error ${response.status}: ${response.statusText}, Body: ${errorBody}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to post ventilator settings:', error);
    // Re-throw the error so the calling component can handle it (e.g., show an error message to the user)
    throw error;
  }
};

export default postInitVentilatorSettings;