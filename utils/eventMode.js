let eventActive = false;

module.exports = {
  isEventActive: () => eventActive,
  toggleEventMode: (state) => eventActive = state
};
