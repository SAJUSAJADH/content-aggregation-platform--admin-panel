import React, { useEffect } from 'react';

const TodayDateInput = ({ date, setDate }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const dateInput = document.getElementById('todayDateInput');

    if (dateInput) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');

      dateInput.value = `${year}-${month}-${day}`;
      setDate(`${year}-${month}-${day}`);
      dateInput.disabled = true;
    }
  }, []);

  return (
    <input
      value={date}
      type="date"
      id="todayDateInput"
      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    />
  );
};

export default TodayDateInput;
