export const rooms = [
  {
    id: "1",
    name: "Quiet Corner Studio",
    description: "A peaceful corner room with natural light, perfect for solo study sessions and focused reading.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    floor: "Floor 2",
    capacity: 2,
    hourlyRate: 5,
    amenities: ["Wi-Fi", "Power Outlets", "Quiet Zone"],
    ownerId: "user1",
    bookingCount: 12,
  },
  {
    id: "2",
    name: "Collaborative Hub",
    description: "Spacious room designed for group projects with whiteboard walls and comfortable seating for up to six people.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop",
    floor: "Floor 3",
    capacity: 6,
    hourlyRate: 8,
    amenities: ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets"],
    ownerId: "user2",
    bookingCount: 28,
  },
  {
    id: "3",
    name: "Executive Study Suite",
    description: "Premium study space with ergonomic furniture, climate control, and soundproof walls for maximum concentration.",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=400&fit=crop",
    floor: "Floor 4",
    capacity: 4,
    hourlyRate: 10,
    amenities: ["Air Conditioning", "Wi-Fi", "Power Outlets", "Quiet Zone"],
    ownerId: "user1",
    bookingCount: 45,
  },
  {
    id: "4",
    name: "Tech Lab Room",
    description: "Fully equipped tech room with projector, multiple outlets, and high-speed internet for coding and presentations.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop",
    floor: "Floor 1",
    capacity: 8,
    hourlyRate: 12,
    amenities: ["Projector", "Wi-Fi", "Power Outlets", "Whiteboard"],
    ownerId: "user3",
    bookingCount: 19,
  },
  {
    id: "5",
    name: "Sunlit Reading Nook",
    description: "Bright and airy room with floor-to-ceiling windows, ideal for reading and light study work.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4fa1c2d0?w=600&h=400&fit=crop",
    floor: "Floor 2",
    capacity: 3,
    hourlyRate: 6,
    amenities: ["Wi-Fi", "Quiet Zone", "Air Conditioning"],
    ownerId: "user2",
    bookingCount: 8,
  },
  {
    id: "6",
    name: "Focus Pod Alpha",
    description: "Minimalist single-person pod with noise cancellation features and adjustable lighting for deep work.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    floor: "Floor 5",
    capacity: 1,
    hourlyRate: 4,
    amenities: ["Power Outlets", "Quiet Zone", "Wi-Fi"],
    ownerId: "user1",
    bookingCount: 33,
  },
  {
    id: "7",
    name: "Group Workshop Space",
    description: "Large workshop room with movable furniture, whiteboards on all walls, and presentation equipment.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    floor: "Floor 3",
    capacity: 10,
    hourlyRate: 15,
    amenities: ["Whiteboard", "Projector", "Wi-Fi", "Air Conditioning", "Power Outlets"],
    ownerId: "user3",
    bookingCount: 21,
  },
  {
    id: "8",
    name: "Midnight Study Lounge",
    description: "Cozy late-night study spot with warm lighting and comfortable chairs for extended sessions.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
    floor: "Floor 1",
    capacity: 4,
    hourlyRate: 7,
    amenities: ["Wi-Fi", "Power Outlets", "Air Conditioning"],
    ownerId: "user2",
    bookingCount: 16,
  },
];

export const bookings = [
  {
    id: "b1",
    userId: "user1",
    roomId: "1",
    date: "2026-08-15",
    startTime: "09:00",
    endTime: "12:00",
    totalCost: 15,
    specialNote: "Need extra whiteboard markers",
    status: "confirmed",
    room: rooms[0],
  },
  {
    id: "b2",
    userId: "user1",
    roomId: "3",
    date: "2026-08-20",
    startTime: "14:00",
    endTime: "17:00",
    totalCost: 30,
    specialNote: "",
    status: "confirmed",
    room: rooms[2],
  },
  {
    id: "b3",
    userId: "user1",
    roomId: "2",
    date: "2026-07-20",
    startTime: "10:00",
    endTime: "13:00",
    totalCost: 24,
    specialNote: "Group project meeting",
    status: "cancelled",
    room: rooms[1],
  },
];

export const AMENITIES = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

export const demoUser = {
  id: "user1",
  name: "Alex Morgan",
  email: "demo@studynook.com",
  photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
};

export function getRoomById(id) {
  return rooms.find((room) => room.id === id);
}

export function getUserListings(userId) {
  return rooms.filter((room) => room.ownerId === userId);
}

export function filterRooms({ search = "", amenities = [], minRate = 0, maxRate = 100, floor = "" }) {
  return rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
    const matchesAmenities =
      amenities.length === 0 || amenities.every((a) => room.amenities.includes(a));
    const matchesRate = room.hourlyRate >= minRate && room.hourlyRate <= maxRate;
    const matchesFloor = !floor || room.floor.toLowerCase().includes(floor.toLowerCase());
    return matchesSearch && matchesAmenities && matchesRate && matchesFloor;
  });
}

export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function formatCapacity(capacity) {
  if (capacity === 1) return "1 person";
  return `1–${capacity} people`;
}
