import { configureStore} from '@reduxjs/toolkit'
import patientReducer from './slices/PatientSlice'

const store = configureStore({
  reducer: {
    patient: patientReducer
  }
});

export default store;