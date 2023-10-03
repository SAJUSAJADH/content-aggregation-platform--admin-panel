import React, { useEffect } from 'react';

const TodayDateInput: React.FC = ({date, setDate}) => {
  useEffect(() => {
    // Get a reference to the input element
    const dateInput = document.getElementById('todayDateInput') as HTMLInputElement;

    if (dateInput) {
      // Create a new Date object representing the current date
      const today = new Date();

      // Format the date as "YYYY-MM-DD"
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(today.getDate()).padStart(2, '0');

      // Set the value of the input to today's date
      dateInput.value = `${year}-${month}-${day}`;
      setDate(`${year}-${month}-${day}`)

      // Disable the input to prevent user changes
      dateInput.disabled = true;
    }
  }, []);

  return (
    <input value={date} type="date" id="todayDateInput"
    className ='custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' />
  );
};

export default TodayDateInput;
