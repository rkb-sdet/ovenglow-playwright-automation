export const testData = {
  customer: {
    valid: {
      name: 'Rohit Quality Tester',
      phone: '9876543210',
      address: 'Suite 404, Cypress Heights, QA Sector 62',
    },
    invalid: {
      shortPhone: '123',
    },
  },
  products: {
    primary: 'Midnight Dark Chocolate Truffle Cake',
    croissant: 'Artisan Butter Croissant',
  },
  credentials: {
    staff: {
      email: process.env.STAFF_EMAIL || 'staff@ovenglow.com',
      password: process.env.STAFF_PASSWORD || 'OvenGlow@2026',
    },
    invalid: {
      email: 'staff@ovenglow.com',
      password: 'WrongPassword123',
    },
  },
};