/**
 * Posts ventilator settings to the simulation API and returns the simulation data.
 *
 * @param {object} settings - An object containing the ventilator settings to be simulated.
 * For example: { RR: 20, Vt: 500, PEEP: 5, ... }
 * @returns {Promise<object>} A promise that resolves to the JSON response from the server.
 * @throws {Error} Throws an error if the network request fails or the server responds with an error.
 */
const postVentilatorSettings = async ({stateId, rate, pressure, oxygen, supportPressure, volume, peep, condition, mode, weight}) => {
    const API_URL = 'http://localhost:8080/api/simulate/simulate';
    const settings = { 
        stateId: stateId,
        respiratoryRate: rate, 
        tidalVolume: volume, 
        peep: peep,
        supportPressure: supportPressure,
        fio2: oxygen,
        inspiratoryPressure: pressure,
        scenario: condition,
        mode: mode,
        weight: weight,  
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

export default postVentilatorSettings;