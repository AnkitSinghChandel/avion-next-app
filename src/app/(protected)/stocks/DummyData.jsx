import moment from "moment";

const products = [
  "Laptop",
  "Wireless Mouse",
  "Keyboard",
  "Hard Disk 2TB",
  "SSD 1TB",
  "Monitor 24 Inch",
  "USB Cable",
  "Printer",
  "Router",
  "Graphics Card",
  "RAM 16GB",
  "Power Bank",
  "Webcam",
  "Speaker",
  "Microphone",
];

const categories = [
  "Electronics",
  "Storage",
  "Accessories",
  "Networking",
  "Office",
];

const suppliers = [
  "Dell Technologies",
  "HP India",
  "Seagate",
  "Samsung",
  "Logitech",
  "Kingston",
  "Asus",
  "Lenovo",
  "Canon",
  "TP-Link",
];

const users = [
  "Ankit Singh",
  "Rahul Sharma",
  "Aman Verma",
  "Priya Gupta",
  "Rohit Kumar",
  "Arun Kumar",
];

const activities = [
  {
    type: "Stock In",
    quantity: "+50",
    reference: "Purchase Order #PO1256",
    date: "29 Jun 2026, 10:30 AM",
    color: "green",
  },
  {
    type: "Stock Out",
    quantity: "-10",
    reference: "Sales Order #SO1123",
    date: "28 Jun 2026, 04:51 PM",
    color: "red",
  },
  {
    type: "Stock In",
    quantity: "+20",
    reference: "Purchase Order #PO1222",
    date: "27 Jun 2026, 11:20 AM",
    color: "green",
  },
  {
    type: "Stock Out",
    quantity: "-15",
    reference: "Sales Order #SO1108",
    date: "26 Jun 2026, 02:15 PM",
    color: "red",
  },
  {
    type: "Stock In",
    quantity: "+100",
    reference: "Purchase Order #PO1201",
    date: "25 Jun 2026, 09:45 AM",
    color: "green",
  },
];

const units = ["PCS", "BOX", "SET"];

const inventoryData = Array.from({ length: 100 }, (_, index) => {
  const stock = Math.floor(Math.random() * 200);
  const minimumStock = Math.floor(Math.random() * 20) + 10;
  const maximumStock = minimumStock + Math.floor(Math.random() * 200) + 100;

  return {
    key: String(index + 1),
    image: `https://picsum.photos/60?random=${index + 1}`,
    // image: `https://placehold.co/60x60?text=P${index + 1}`,
    product: products[Math.floor(Math.random() * products.length)],
    sku: `SKU${String(index + 1).padStart(4, "0")}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
    stock,
    unit: units[Math.floor(Math.random() * units.length)],
    status:
      stock === 0
        ? "Out Of Stock"
        : stock <= minimumStock
          ? "Low Stock"
          : "In Stock",

    // Stock Information
    minimumStock,
    maximumStock,
    lastUpdated: moment(
      new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ),
    ).format("DD MMM YYYY, hh:mm A"),
    updatedBy: users[Math.floor(Math.random() * users.length)],

    // Recent Activity
    activities: activities.sort(() => 0.5 - Math.random()).slice(0, 3),
  };
});

export default inventoryData;
