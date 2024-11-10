export const shadows = {
  low: {
    shadowColor: 'hsl(286, 36%, 56%)', // Closest matching color
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.34,
    shadowRadius: 3, // Approximate radius for low elevation
    elevation: 2, // Android compatibility
  },
  medium: {
    shadowColor: 'hsl(286, 36%, 56%)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.36,
    shadowRadius: 6,
    elevation: 6,
  },
  high: {
    shadowColor: 'hsl(286, 36%, 56%)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.34,
    shadowRadius: 20,
    elevation: 12,
  },
};
