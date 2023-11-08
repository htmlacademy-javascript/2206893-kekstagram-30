const isMeetingINWorkday = (startWorkDay, endWorkDay, startMeeting, duration) => {
  const timeToPoint = (time) => Number(time.replace(/:/, '.'));
  const timeInMinutes = (number) => Number((Math.trunc(number) * 60 + (number % 1 * 100)).toFixed());
  startMeeting = timeInMinutes(timeToPoint(startMeeting));
  startWorkDay = timeToPoint(startWorkDay);
  endWorkDay = timeInMinutes(timeToPoint(endWorkDay));
  return ((startMeeting >= startWorkDay) && ((startMeeting + duration) <= endWorkDay));
};

isMeetingINWorkday('08:00', '17:30', '14:05', 90);
isMeetingINWorkday('8:0', '10:0', '8:0', 120);
isMeetingINWorkday('08:00', '14:30', '14:00', 90);
isMeetingINWorkday('14:00', '17:30', '08:0', 90);
isMeetingINWorkday('8:00', '17:30', '08:00', 900);
