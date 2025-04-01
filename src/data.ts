import { DeviceOption, PeripheralOption, Product } from './types';

export const deviceOptions: DeviceOption[] = [
  {
    id: 'apple',
    name: 'Apple',
    models: [
      { id: 'iphone-15', name: 'iPhone 15 Series' },
      { id: 'iphone-14', name: 'iPhone 14 Series' },
      { id: 'ipad-pro', name: 'iPad Pro' },
      { id: 'macbook', name: 'MacBook' },
    ],
  },
  {
    id: 'samsung',
    name: 'Samsung',
    models: [
      { id: 's24', name: 'Galaxy S24 Series' },
      { id: 's23', name: 'Galaxy S23 Series' },
      { id: 'tab-s9', name: 'Galaxy Tab S9' },
    ],
  },
  {
    id: 'google',
    name: 'Google',
    models: [
      { id: 'pixel-8', name: 'Pixel 8 Series' },
      { id: 'pixel-7', name: 'Pixel 7 Series' },
    ],
  },
];

export const peripheralOptions: PeripheralOption[] = [
  {
    id: 'fast-charging',
    name: 'Fast Charging',
    description: 'High-speed charging for your device',
    icon: 'Zap',
  },
  {
    id: 'data-transfer',
    name: 'Data Transfer',
    description: 'Connect to computers and transfer files',
    icon: 'Database',
  },
  {
    id: 'display',
    name: 'External Display',
    description: 'Connect to monitors and TVs',
    icon: 'Monitor',
  },
];

export const recommendedProducts: Record<string, Product[]> = {
  'apple-iphone-15-fast-charging': [
    {
      id: '1',
      name: 'Apple 35W Dual USB-C Port Power Adapter',
      description: 'Official Apple charger with dual ports for fast charging multiple devices',
      price: '$59.99',
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1662947995689-ec5165848bac?auto=format&fit=crop&q=80&w=500',
      sellers: [
        { name: 'Amazon', url: 'https://amazon.com', price: '$59.99' },
        { name: 'Apple Store', url: 'https://apple.com', price: '$59.99' },
        { name: 'Best Buy', url: 'https://bestbuy.com', price: '$59.99' },
      ],
    },
    // Add more products as needed
  ],
  // Add more combinations
};