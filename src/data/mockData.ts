import { PledgeData } from '../types';

export const mockPledges: PledgeData[] = [
  {
    id: "PLD001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    mobile: "+1234567890",
    state: "California",
    profileType: "Student",
    commitments: ["Reduce plastic usage by 50% in daily life", "Use public transport or bike for short trips"],
    date: "2024-01-15",
    heartsRating: 2
  },
  {
    id: "PLD002",
    name: "Michael Chen",
    email: "michael@example.com",
    mobile: "+1234567891",
    state: "New York",
    profileType: "Working Professional",
    commitments: ["Switch to LED bulbs and energy-efficient appliances", "Participate in local tree planting drives", "Support eco-friendly businesses and products"],
    date: "2024-01-14",
    heartsRating: 3
  },
  {
    id: "PLD003",
    name: "Emma Rodriguez",
    email: "emma@example.com",
    mobile: "+1234567892",
    state: "Texas",
    profileType: "Student",
    commitments: ["Practice zero-waste cooking and meal planning"],
    date: "2024-01-13",
    heartsRating: 1
  },
  {
    id: "PLD004",
    name: "David Kim",
    email: "david@example.com",
    mobile: "+1234567893",
    state: "Florida",
    profileType: "Working Professional",
    commitments: ["Unplug electronics when not in use", "Educate 5 friends about climate change"],
    date: "2024-01-12",
    heartsRating: 2
  },
  {
    id: "PLD005",
    name: "Lisa Thompson",
    email: "lisa@example.com",
    mobile: "+1234567894",
    state: "Washington",
    profileType: "Other",
    commitments: ["Use renewable energy sources where possible", "Participate in local tree planting drives", "Support eco-friendly businesses and products"],
    date: "2024-01-11",
    heartsRating: 3
  }
];