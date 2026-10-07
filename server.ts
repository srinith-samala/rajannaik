
import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;
const DATA_FILE = path.resolve("complaints.json");

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.use(express.json());

// Helper to read/write data
const getComplaints = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
const saveComplaints = (complaints: any[]) => fs.writeFileSync(DATA_FILE, JSON.stringify(complaints, null, 2));

// In-memory OTP store (for production, use Redis or a database)
const otpStore = new Map<string, { code: string; expires: number }>();

// Simulated SMS Gateway Integration
const sendSMS = async (mobile: string, message: string) => {
  console.log(`[DEMO MODE] SMS to ${mobile}: ${message}`);
  return true;
};

// API Routes
app.post("/api/auth/send-otp", async (req, res) => {
  const { mobile } = req.body;
  if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({ error: "Valid 10-digit mobile number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(mobile, { code: otp, expires });

  const message = `Your BJP Civic Connect OTP is ${otp}. Valid for 5 minutes.`;
  await sendSMS(`+91${mobile}`, message);

  // Always return OTP in demo mode
  res.json({ message: "OTP sent successfully", demoOtp: otp });
});

app.post("/api/auth/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;
  
  const stored = otpStore.get(mobile);
  if (!stored) {
    return res.status(400).json({ error: "No OTP found for this number" });
  }

  if (Date.now() > stored.expires) {
    otpStore.delete(mobile);
    return res.status(400).json({ error: "OTP has expired" });
  }

  if (stored.code === otp) {
    otpStore.delete(mobile);
    res.json({ success: true, message: "Authentication successful" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

app.post("/api/complaints", (req, res) => {
  const complaint = req.body;
  if (!complaint.id) {
    return res.status(400).json({ error: "Complaint ID is required" });
  }

  const complaints = getComplaints();
  
  // Ensure ID is unique
  const exists = complaints.find((c: any) => c.id.toLowerCase() === complaint.id.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: "Complaint ID already exists" });
  }

  complaints.push(complaint);
  saveComplaints(complaints);
  
  console.log(`Saved complaint: ${complaint.id}`);
  res.status(201).json(complaint);
});

app.get("/api/complaints/:id", (req, res) => {
  const { id } = req.params;
  const complaints = getComplaints();
  
  // Case-insensitive search
  const complaint = complaints.find((c: any) => c.id.toLowerCase() === id.toLowerCase());
  
  if (!complaint) {
    return res.status(404).json({ error: "Complaint not found" });
  }
  
  res.json(complaint);
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve("dist");
    app.use(express.static(distPath));
    app.use((req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
