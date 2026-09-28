export const SKILLS = {
  "Software Development": ["C#", "Java", "VB.NET", "PHP", "SQL"],
  "Frameworks & Backend": ["Laravel", "Android Studio", "Firebase"],
  "Systems & Database": ["MySQL", "PostgreSQL", "Relational Design"],
  "Networking & Hardware": ["Cisco CLI", "Packet Tracer", "Troubleshooting"],
  "Tools & Design": ["Figma", "Git/GitHub", "Visual Studio"],
};

export const PROJECTS = [
  {
    title: "Android CRUD App",
    tags: ["Java", "Volley", "PHP", "MySQL"],
    star: [
      ["Situation", "Needed a mobile app that could manage live records, not just display static data."],
      ["Task", "Build full CRUD functionality with secure login over a REST API."],
      ["Action", "Connected Java/Android to a PHP + MySQL backend via Volley, adding authentication and input validation."],
      ["Result", "A working real-time app performing create, read, update and delete operations against a live database."],
    ],
    github: "https://github.com/kevin-masangya",
  },
  {
    title: "Student Enrollment System",
    tags: ["OOP", "Java", "Access Control"],
    star: [
      ["Situation", "Enrollment logic often mixes student, course and admin data with no clear boundaries."],
      ["Task", "Design a modular system separating students, courses and enrollments."],
      ["Action", "Applied OOP principles to build independent modules with role-based access for admins and users."],
      ["Result", "A maintainable enrollment platform where each role sees only what it needs."],
    ],
    github: "https://github.com/kevin-masangya",
  },
  {
    title: "Car Rental System",
    tags: ["Java Swing", "NetBeans", "MySQL"],
    star: [
      ["Situation", "Rental tracking on paper leads to double-bookings and lost vehicle history."],
      ["Task", "Build a desktop app to manage bookings, users and vehicle status."],
      ["Action", "Built a Swing GUI wired to a MySQL backend for authentication and live vehicle tracking."],
      ["Result", "A single-source booking system replacing manual tracking end to end."],
    ],
    github: "https://github.com/kevin-masangya",
  },
  {
    title: "Network Configuration Labs",
    tags: ["Cisco CLI", "Packet Tracer"],
    star: [
      ["Situation", "Simulated office network needed reliable addressing and routing."],
      ["Task", "Configure DHCP, static routing and serial DTE/DCE links."],
      ["Action", "Set up and tested configurations via Cisco CLI, diagnosing connectivity failures."],
      ["Result", "A stable simulated network with resolved routing and link issues."],
    ],
    github: "https://github.com/kevin-masangya",
  },
];

export const TIMELINE = [
  {
    date: "2024 — 2028 (Expected)",
    title: "BS in Information Technology — University of Caloocan City",
    points: [
      "1st Place, C# Programming Competition (CSD FAIR) — Oct 2025",
      "1st Place, C Programming Competition (ITechtivity) — Mar 2025",
    ],
  },
  {
    date: "2022 — 2023",
    title: "IT Support — Work Immersion",
    points: [
      "Directed student queues for a school ID project covering 200+ students",
      "Operated and maintained digital imaging equipment for consistent capture quality",
      "Resolved hardware connectivity issues to keep the workstation running at peak hours",
    ],
  },
];